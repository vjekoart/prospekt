/* This file should be read from bottom up */
'use strict'


/* Globals */
const _templates = 'templates/'
const _partials = 'partials/'


/* Functions */
async function loadPath (path)
{
    return await (await fetch(path)).text()
}


async function loadPartial (src)
{
    const path = _partials + src + '.html'

    return await loadPath(path)
}


async function renderView (response)
{
    const outlet = Get('outlet')

    while (outlet.hasChildNodes())
    {
        outlet.removeChild(outlet.firstChild)
    }


    /* Parse view */
    const temporary = Create('div')

    temporary.innerHTML = response

    /* View: template */
    const template = temporary.querySelector('template')

    if (!template)
    {
        return Error('There is no <template> element inside the view!')
    }

    const content = document.importNode(template.content, true)

    /* View: style */
    const style = temporary.querySelector('style')

    /* View: script */
    const script = temporary.querySelector('script')
    const code = script ? script.innerText : null


    /* Partials */
    const partials = content.querySelectorAll('partial')

    for (const partial of partials)
    {
        const src = partial.getAttribute('src')

        if (src)
        {
            partial.innerHTML = await loadPartial(src)
        }
        else
        {
            Warn('Partial element doesn\'t have "src" attribute.')
            continue
        }
    }


    /* View composition */
    outlet.appendChild(content)

    if (style)
    {
        outlet.appendChild(style)
    }

    if (code)
    {
        const script = Create('script')

        script.appendChild(document.createTextNode(code))
        outlet.appendChild(script)
    }
}


function getPath ()
{
    const elements = location.hash.split('/').filter(segment => segment && segment !== '#' ? segment : null)

    if (elements.length)
    {
        return _templates + elements.join('/') + '.html'
    }
    else
    {
        return _templates + 'index.html'
    }
}


async function loadRoute ()
{
    const path = getPath()
    const response = await loadPath(path)

    await renderView(response)
}


async function main ()
{
    const outlet = Query('router')

    if (!outlet)
    {
        return Error('Could not find <router></router> element in index.html file!')
    }

    Set('outlet', outlet)

    await loadRoute()
    Listen(window, 'hashchange', loadRoute)
}


Run(main)
