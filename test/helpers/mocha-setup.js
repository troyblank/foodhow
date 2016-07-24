import { jsdom } from 'jsdom';
import LocalStorage from 'node-localstorage';
import styles from './style-fakes';

// JSDOM
const doc = jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(win).forEach((k) => {
    if (!win.hasOwnProperty(k)) return;
    if (k in global) return;

    global[k] = window[k];
});

global.navigator = {
    userAgent: 'node.js'
};

// LOCALSTORAGE
global.localStorage = new LocalStorage.LocalStorage('./scratch');
global.window.localStorage = global.localStorage;

// STYLES
function css(module) {
    const fake = module;

    fake.exports = styles;

    return fake;
}

require.extensions['.scss'] = css;
