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
