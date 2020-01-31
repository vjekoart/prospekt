/**
 * Capital M.
 *
 * Minimal JS library with shorthands for common functions and with custom
 * functions for faster development.
 */
'use strict';


class CapitalM
{
    constructor ()
    {
        this.storage = {};

        /* Logs */
        this.log = console.log;
        this.warn = console.warn;
        this.error = console.error;
    }


    /* DOM */
    id (elementId)
    {
        return document.getElementById(elementId);
    }

    query (selector)
    {
        return document.querySelector(selector);
    }

    queryAll (selector)
    {
        return document.querySelectorAll(selector);
    }

    create (tagName, options)
    {
        return document.createElement(tagName, options);
    }


    /* Events */
    listen (element, event, listener)
    {
        element.addEventListener(event, listener);
    }

    run (bootstrapFn)
    {
        document.addEventListener('DOMContentLoaded', bootstrapFn);
    }


    /* In-memory storage */
    setValue (key, value)
    {
        if (!key)
        {
            return false;
        }

        this.storage[key] = value;
        return true;
    }

    getValue (key)
    {
        if (!key)
        {
            return null;
        }

        return this.storage[key];
    }

    unsetValue (key)
    {
        if (typeof this.storage[key] !== 'undefined')
        {
            delete this.storage[key];
        }
    }
}


/* Bootstrap */
window.M = new CapitalM();

/**
 * Hash-based router for web applications which loads and renders HTML
 * templates based on the URL location.
 *
 * This router relys on index.html file with <router></router> element, folder
 * where templates, i.e. screens, are stored, and on folder where partials,
 * i.e. components like navigation and footer are stored.
 *
 * This file should be read from bottom up.
 */
'use strict';


/* Globals */
const _templates = 'templates/';
const _partials = 'partials/';


/* Functions */
async function loadPath (path)
{
    return await (await fetch(path)).text();
}


async function loadPartial (src)
{
    const path = _partials + src + '.html';

    return await loadPath(path);
}


async function renderView (response)
{
    const outlet = M.getValue('outlet');

    while (outlet.hasChildNodes())
    {
        outlet.removeChild(outlet.firstChild);
    }


    /* Parse view */
    const temporary = M.create('div');

    temporary.innerHTML = response;

    /* View: template */
    const template = temporary.querySelector('template');

    if (!template)
    {
        return M.error('There is no <template> element inside the view!');
    }

    const content = document.importNode(template.content, true);

    /* View: style */
    const style = temporary.querySelector('style');

    /* View: script */
    const script = temporary.querySelector('script');
    const code = script ? script.innerText : null;


    /* Partials */
    const partials = content.querySelectorAll('partial');

    for (const partial of partials)
    {
        const src = partial.getAttribute('src');

        if (src)
        {
            partial.innerHTML = await loadPartial(src);
        }
        else
        {
            M.warn('Partial element doesn\'t have "src" attribute.');
            continue;
        }
    }


    /* View composition */
    outlet.appendChild(content);

    if (style)
    {
        outlet.appendChild(style);
    }

    if (code)
    {
        const script = M.create('script');

        script.appendChild(document.createTextNode(code));
        outlet.appendChild(script);
    }
}


function getPath ()
{
    const elements = location.hash.split('/').filter(segment => segment && segment !== '#' ? segment : null);

    if (elements.length)
    {
        return _templates + elements.join('/') + '.html';
    }
    else
    {
        return _templates + 'index.html';
    }
}


async function loadRoute ()
{
    const path = getPath();
    const response = await loadPath(path);

    await renderView(response);
}


async function main ()
{
    const outlet = M.query('router');

    if (!outlet)
    {
        M.error('Could not find <router></router> element in index.html file!');
        return;
    }

    M.setValue('outlet', outlet);

    await loadRoute();
    M.listen(window, 'hashchange', loadRoute);
}


M.run(main);
