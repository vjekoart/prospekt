'use strict'


let M = {}


/* DOM */
window.ID = document.getElementById.bind(document)
window.Query = document.querySelector.bind(document)
window.QueryAll = document.querySelectorAll.bind(document)

window.Create = document.createElement.bind(document)


/* Storage */
window.windowStorage = {}

window.Set = (key, value) => window.windowStorage[key] = value
window.Get = key => window.windowStorage[key]
window.Unset = key => delete window.windowStorage[key]


/* Events */
window.Listen = (el, ev, fn) => el.addEventListener(ev, fn)

window.Run = fn => document.addEventListener('DOMContentLoaded', fn)


/* Developer */
window.Log = console.log
window.Warn = console.warn
window.Error = console.error
