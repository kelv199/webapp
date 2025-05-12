/**
 * Polyfill
 */
// Element.matches
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}

// Nodelist.forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// Node.scrollIntoView()
if (!Element.prototype.scrollIntoView) {
    var getOffset = function (element) {
        element = element.getBoundingClientRect();
        return {
            left: element.left + window.pageXOffset,
            top: element.top + window.pageYOffset
        }
    },
    pollyfillScroll = function (startEl, endEl, position) {
        var startPos = getOffset(startEl).top - startEl.getBoundingClientRect().top,
            endPos = getOffset(endEl).top,
            step = startPos > endPos ? -30 : 30,
            intervalPos = 0,
            space = window.innerHeight/2,
            int = setInterval(function () {
                window.scrollTo(0, startPos);
                startPos += step;
                intervalPos = endEl.getBoundingClientRect().top;
                if ((step > 0 && intervalPos < step) || (step < 0 && intervalPos > -step)) { clearInterval(int); }
            }, 10);
    }
}

/**
 * Smooth scroll: scroll to inner anchor smoothly
 *
 * Specialized:
 * - #SELF: if the URL is exactly '#SELF', page will be scrolled on top of itself
 * - data-prevent-scroll="true": if link element has this attribute, scroll will be stopped
 */
(function () {
    var smoothScrollHandler = function (ev) {
            if (!ev || !ev.target || ev.target.hasAttribute('data-show-window') || !(/^a$/i.test(ev.target.nodeName) && ev.target.hash && /^#/.test(ev.target.hash))) { return; }
            var target = ev.target,
            anchor = /^#SELF$/.test(ev.target.hash) ? target : document.getElementById(target.hash.substr(1));
            if (!anchor || target.getAttribute('data-prevent-scroll') == 'true') { return; }
            ev.preventDefault();
            if (/(\.net|edge)/i.test(navigator.userAgent)) {
                pollyfillScroll(target, anchor);
            } else {
                anchor.scrollIntoView({behavior: "smooth", block: "start"});
            }
        };
    document.addEventListener('click', smoothScrollHandler);
})();(function(meta) {
    "use strict";
    if (/android 5\.0\.2|iphone;|ipod;/i.test(navigator.userAgent)) {
        var resizeHandler = function() {
            window.setTimeout(function() {
                document.body.style.display = 'none';
                document.body.offsetWidth;
                document.body.style.display = '';
            }, 350);
        };
        window.addEventListener('orientationchange', resizeHandler);
    }
    // test requirement and neccessary prerequisite
    if (!/\bno-flex\b/.test(document.body.className) || !('matchMedia' in window)) { return; }
    var regex = /width=[^,]+(,?\s*)/,
        breakpoints = "980, 660, 340".split(', '),
    setViewport = function(width, bodyWidth) {
        width || (width = 'device-width');
        var content = meta.getAttribute('content');
        if (!regex.test(content)) {
            content = 'width=' + width + ', ' + content;
        } else {
            regex.lastIndex = 0;
            content = content.replace(regex, 'width=' + width + RegExp.$1);
        }
        if (bodyWidth) {
            content = content.replace(/initial-scale=[\d\.]+/, 'initial-scale=' + (bodyWidth / width).toFixed(2));
        }
        meta.setAttribute('content', content);
    },
    // true = device-width is set, false/undefined = other width, 1 = other width, don't resize!
    viewportDefault = /width=device-width/.test(meta.getAttribute('content')),
    viewportTimeout,
    viewportHandler = function() {
        if (viewportDefault === 1) { return; }
        if (!viewportDefault) {
            setViewport();
            viewportDefault = true;
            window.clearTimeout(viewportTimeout);
            viewportTimeout = window.setTimeout(viewportHandler, 150);
            return;
        }
        for (var width = document.body.offsetWidth, b = 0, l = breakpoints.length; b < l; b++) {
            // Fix for Samsung Galaxy Tab 3 with Android 4.4.2  - (/4\.4\.2.*?SM-T310\D/.test(navigator.userAgent) ? 60 : 0) - leads to zoomed effect
            if (width >= breakpoints[b] || b === breakpoints.length - 1) {
                setViewport(breakpoints[b], document.body.offsetWidth);
                // block resize for 150ms
                viewportDefault = 1;
                window.clearTimeout(viewportTimeout);
                window.setTimeout(function() { viewportDefault = false; }, 150);
                break;
            }
        }
    },
    resizeTimeout,
    abordResize = false,
    resizeHandler = function() {
        if (viewportDefault || abordResize) { return; }
        window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(viewportHandler, 150);
    },
    lastFocus = document,
    touchHandler = function(ev) {
        if (/input|textarea|select|label/i.test(ev.target.nodeName) || /input|textarea|select|label/i.test(lastFocus.nodeName)) {
            abordResize = true;
            lastFocus = ev.target;
        }
    };
    viewportHandler();
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('orientationchange', function() { abordResize = false; resizeHandler(); });
    document.addEventListener('touchstart', touchHandler);
})(document.getElementsByName('viewport')[0]);
if (/no-svg/.test(document.querySelector('body').className)) {
    var imgs = document.querySelectorAll('img[src$=".svg"]');
    for (var i = 0, len = imgs.length; i < len; i++) {
        imgs[i].src = imgs[i].src.replace(/\.svg$/, '.png');
    }
}
(function() {
    var touch = false,
    clickHandler = function(ev) {
        ev = ev || window.event;
        ev.target || (ev.target = ev.srcElement);
        if (!ev || !ev.target || !ev.target.getAttribute) { return; }

        if (ev.type === 'keypress' && (ev.which || ev.keyCode) != 13) { return; }
        if (ev.type === 'click' && (ev.which || ev.keyCode) > 1) { return; }
        if (ev.type === 'touchstart') {
            touch = true;
            return;
        }
        if (ev.type === 'touchmove') {
            touch = false;
            return;
        }
        if (ev.type === 'touchend') {
            if (!touch) { return; }
            touch = false;
        }

        var items = ['hide', 'toggle', 'show', 'set', 'unset'],
            node,
            selector,
            any;

        for (var i = 0, item; item = items[i]; i++) {
            selector = false;
            node = ev.target;

            while (node && node.getAttribute && !selector) {
                (selector = node.getAttribute('data-' + item + '-nodes')) || (node = node.parentNode);
            }
            /* alternative attribute value with same behavior but with cursor pointer: #empty-withpointer */
            if (!selector || selector === '#empty') { continue; }

            var parquery = node.getAttribute('data-' + item + '-parent') || node.getAttribute('data-nodes-parent'),
                parent = document;
            if (parquery) {
                var parents = document.querySelectorAll(parquery),
                    parent = node;
                findparent: while (parent) {
                    for (var p = parents.length; p >= 0; p--) {
                        if (parents[p] === parent) { break findparent; }
                    }
                    parent = parent.parentNode;
                }
            }

            selector.replace(/([^,\{]+)(?:\{(.*?)\}|)/g, function(full, query, name) {
                query = parent.querySelectorAll(query);
                name = name || 'hidden';
                any = any || 'href' in node;
                var re = new RegExp('(^|\\s)' + name + '(\\s|$)', 'g');

                for (var q = 0, l = query.length; q < l; q++) {
                    var cls = query[q].className.replace(re, '$2');
                    query[q].className = cls + ((item === 'hide' || item === 'set' || (item === 'toggle' && query[q].className === cls)) ? ' ' + name : '');
                    if ((query[q].hasAttribute('data-load-always') || query[q].offsetHeight) && query[q].getAttribute('data-load-url')) {
                        if (typeof document.createEvent === 'function') {
                            var load = document.createEvent('CustomEvent');
                            load.initCustomEvent('lazyload', true, true, null);
                            query[q].dispatchEvent(load);
                        } else {
                            typeof document.onlazyload === 'function' && document.onlazyload({ target: query[q] });
                        }
                    }
                    // fix reflow/redraw problem in "noflex" clients by applied DOM force
                    if (/(^|\s)no-flex\b/.test(document.body.className) && !/input|select|textarea/i.test(ev.target)) {
                        var text = document.createTextNode('');
                        if (!/input|select|textarea/i.test(node)) {
                            node.parentNode.replaceChild(text, node);
                            text.parentNode.replaceChild(node, text);
                        }
                        if (!/input|select|textarea/i.test(query[q])) {
                            query[q].parentNode.replaceChild(text, query[q]);
                            text.parentNode.replaceChild(query[q], text);
                        }
                    }
                }
            });
        }

        if (any && (ev.type === 'touchend' || ev.type === 'click')) {
            ev.preventDefault && ev.preventDefault();
        }
    }
    if (!document.addEventListener) {
        document.attachEvent('onclick', clickHandler);
        document.attachEvent('onkeypress', clickHandler);
    } else {
        document.addEventListener('keypress', clickHandler);
        if (/ip[ao]d|iphone/i.test(navigator.userAgent)) {
            document.addEventListener('touchstart', clickHandler);
            document.addEventListener('touchmove', clickHandler);
            document.addEventListener('touchend', clickHandler);
        } else {
            document.addEventListener('click', clickHandler);
        }
    }
})();
(function() {
    if (!document.addEventListener) { return; }
    var runEvent = function(name, target, opts) {
        var ev = document.createEvent('CustomEvent');
        ev.initCustomEvent(name, true, true, opts);
        return target.dispatchEvent(ev);
    },
    markSuggest = function(suggest, query) {
        if (!query) { return suggest; }
        var queryparts = [];
        (query || '').replace(/\S+/g, function(part) { part && queryparts.push(part); });
        var queryre = new RegExp('(' + queryparts.join('|') + ')', 'g');
        return suggest.replace(queryre, '<em>$1<\/em>');
    },
    fillSuggest = function(list, query, data) {
        if (!data) {
            list.innerHTML = '';
            return;
        }
        var template = /datalist/i.test(list.nodeName)
            ? '<option value="{value}"/>'
            : '<li data-suggest-value="{value}">{html}</li>',
            context = list.getAttribute('data-suggest-context') || '',
            endpoint = list.getAttribute('data-suggest-endpoint') || '',
            html = [],
            subline = list;
        while (subline && !/\bsuggest-subline\b/.test(subline.className || '')) {
            subline = subline.nextSibling;
        }
        context.replace(/[^\.]+/g, function(point) { data = data[point] || data; });
        for (var i = 0, l = data.length; i < l; i++) {
            var value = data[i];
            endpoint.replace(/[^\.]+/g, function(end) { value = value[end] || value || ''; });
            html.push(template.replace(/\{value\}/g, value).replace(/\{html\}/g, markSuggest(value, query || '').replace(/\"/g, '&quot;')));
        }
        list.innerHTML = html.join('\n');
        subline && list.appendChild(subline.cloneNode(true));
    },
    suggestTimeout,
    getSuggest = function(list, input) {
        if (typeof list.getAttribute !== 'function') { return; }
        var url = (list.getAttribute('data-suggest-url') || '').replace(/\{query\}/g, encodeURIComponent(input.value)),
            method = list.getAttribute('data-suggest-method') || 'jsonp',
            debounce = list.getAttribute('data-suggest-debounce') || 150,
            pattern = list.getAttribute('data-suggest-pattern') || '..';
        if (!url) { return; }
        if (/^controller:\/\/(.*)$/i.test(url)) {
            return runEvent(RegExp.$1, input, { list: list, input: input });
        }
        if (pattern && !(new RegExp(pattern)).test(input.value)) { return; }
        window.clearTimeout(suggestTimeout);
        suggestTimeout = window.setTimeout(function() {
            if (method === 'jsonp') {
                var script = document.createElement('script'),
                    callname = list.getAttribute('data-suggest-callback') || 'sg' + (1E8 * Math.random() | 0).toString(32);
                    script.src = url.replace(/\?$|\{callback\}/, callname);
                window[callname] = function(callname, list, script) { return function(data) {
                    if (runEvent('suggest.fill', list, { list: list, input: input, data: data })) {
                        fillSuggest(list, input.value, data);
                    }
                    script.parentNode && script.parentNode.removeChild(script);
                    window.setTimeout(function() { delete window[callname]; }, 0);
                }}(callname, list, script);
                document.body.appendChild(script);
            } else {
                var xhr = window.XDomainRequest ? new XDomainRequest() : new XMLHttpRequest(),
                    post = /post/i.test(method);
                xhr.open(post ? 'post' : 'get', url, true);
                xhr.onreadystatechange = function(xhr, list, input, method) { return function() {
                    if (xhr.readyState !== 4) { return; }
                    if (xhr.status != 200) {
                        if (runEvent('suggest.error', input, { list: list, input: input })) {
                            fillSuggest(list);
                        }
                    } else {
                        try {
                            var data = JSON.parse(xhr.responseText);
                        } catch (e) {
                            return runEvent('suggest.error', input, { list: list, input: input }), fillSuggest(list);
                        }
                        if (runEvent('suggest.fill', list, { list: list, input: input, data: data })) {
                            fillSuggest(list, input.value, data);
                        }
                    }
                }}(xhr, list, input, method);
                xhr.send();
            }
        }, debounce);
    },
    activateItem = function(item, input) {
        input.value = item.getAttribute('data-suggest-value') || item.value;
        // only submit directly if it's the only field in the form
        if (input.form.querySelectorAll('input:not([type="hidden"]), select, textarea').length === 1) {
            input.form.submit();
        }
    },
    getNextField = function(field) {
        var fields = field.form.querySelectorAll('input:not([type="submit"]):not([type="image"]), textarea, select'),
            i = 0;
        while (fields[i] && fields[i] !== field) { i++; }
        return fields[i+1];
    },
    stopEnter = function(target, key, ev) {
        var list = target.hasAttribute('list') && document.getElementById(target.getAttribute('list'));
        if (list && key === 13) {
            var nextField = getNextField(ev.target);
            if (nextField) {
                ev.preventDefault();
                ev.stopPropagation();
                ev.stopImmediatePropagation();
                return nextField;
            }
        }
    },
    preventSubmit = false,
    fieldHandler = function(ev) {
        var target = ev.target || ev.srcElement,
            key = ev.which || ev.keyCode || ev.key,
            reset = target;
        if (!ev || !target || !target.getAttribute) { return; }
        while (reset && reset.type !== 'reset') {
            reset = reset.parentNode;
        }
        if (reset) {
            if (ev.type === 'keyup' && key !== 13 && key !== 32) { return; }
            // find out if there's a suggest in this form and reset its content
            var input = reset.parentNode.querySelector('input[list]'), list;
            if (!input) { return; }
            list = document.getElementById(input.getAttribute('list'));
            if (!list) { return; }
            // fix for IE's lazy ass form validation
            input.value = null;
            window.setTimeout(function() { input.click && input.click(); }, 50);
            if (input && list && runEvent('suggest.reset', input, { list: list, input: input })) {
                list.innerHTML = '';
            }
        } else if (ev.type === 'blur') {
            var list = target.getAttribute && target.getAttribute('list');
            if (list) {
                list = document.getElementById(list);
                var singular = list && list.querySelector('li:only-of-type');
                if (target.hasAttribute('data-suggest-exclusive') && singular) {
                    activateItem(singular, target);
                }
            }
        } else if (ev.type === 'click' && key <= 1) {
            if (preventSubmit && target.form && target.type === 'submit') {
                preventSubmit = false;
                ev.preventDefault();
                ev.stopPropagation();
                ev.stopImmediatePropagation();
            }
            var list = target,
                item = target;
            while (list && (!list.className || !/\bsuggest\b/.test(list.className))) {
                list = list.parentNode;
            }
            while (item && !/option|li/i.test(item.nodeName)) {
                item = item.parentNode;
            }
            if (list && item) {
                // click on suggest item
                var input = document.querySelector('input[list="' + list.id + '"]');
                if (input && runEvent('suggest.activate', item, { list: list, input: input, origin: target })) {
                    activateItem(item, input);
                }
            }
        } else if ((ev.type === 'keydown' || ev.type === 'keypress') && target.form) {
            stopEnter(target, key, ev);
        } else if (ev.type === 'keyup' && target.form) {
            var list = target.hasAttribute('list') && document.getElementById(target.getAttribute('list')),
                active = list && list.querySelector && list.querySelector('.active') || target,
                current = 0;
            if (list) {
                var nextField = stopEnter(target, key, ev);
                if (nextField) {
                    // if there is only one item, select it on enter
                    var singular = list.querySelector('li:only-of-type');
                    preventSubmit = true;
                    window.setTimeout(function() { preventSubmit = false; }, 50);
                    if (target.hasAttribute('data-suggest-exclusive') && singular) {
                        activateItem(singular, target);
                    }
                    nextField.focus();
                    return;
                }
                if (key === 38 || key === 40) { // 38 - up, 40 - down
                    var items = [target];
                    for (var i = 0, l = list.childNodes.length; i < l; i++) {
                        list.childNodes[i].nodeType === 1 && items.push(list.childNodes[i]);
                        if (list.childNodes[i] === active) {
                            var current = items.length - 1;
                        }
                    }
                    // find current position
                    current = items[(current + items.length - 39 + key) % items.length];
                    if (runEvent('suggest.select', current, { list: list, input: target, active: active, current: current })) {
                        active.className = active.className.replace(/(^|\s)active\b/g, '');
                        if (current === target) {
                            target.value = target.getAttribute('data-original-value');
                        } else {
                            current.className += ' active';
                            target.value = current.value || current.getAttribute('data-suggest-value');
                        }
                    }
                } else if (key === 27) { // esc: remove active
                    active = list.querySelector('.active');
                    active && (active.className = active.className.replace(/(^|\s)active\b/g, ''));
                    target.value = target.originalValue || target.value;
                    target.blur();
                } else if (/\S+/.test(target.value)) {
                    if (runEvent('suggest.get', target, { list: list, input: target })) {
                        getSuggest(list, target);
                    }
                    target.setAttribute('data-original-value', target.value);
                } else {
                    if (runEvent('suggest.reset', target, { list: list, input: target })) {
                        list && (list.innerHTML = '');
                    }
                }
                var reset = target;
                while (reset && reset.type !== 'reset') {
                    reset = reset.nextSibling;
                }
                // fix for IE's stupid CSS cinderella sleep on :valid
                if (reset) {
                    window.setTimeout(function() {
                        var x = document.createTextNode('');
                        reset.parentNode.replaceChild(x, reset);
                        x.parentNode.replaceChild(reset, x);
                    }, 17);
                }
            }
        }
    };
    // set up events
    document.addEventListener('blur', fieldHandler, true);
    document.addEventListener('click', fieldHandler);
    document.addEventListener('keydown', fieldHandler);
    document.addEventListener('keypress', fieldHandler);
    document.addEventListener('keyup', fieldHandler);
})();(function(undef){
    var nativeSupport = 'open' in document.createElement('details'),
    akkordeonToggle = function(akkordeon, status) {
        var autoToggle = (status === undef),
            initialStatus = !!(akkordeon.getAttribute('open') || /(^|\s)open\b/.test(akkordeon.className));

        if (autoToggle) {
            status = !initialStatus;
        }

        // android 4.1-3 touts native support that doesn't work correctly
        if (!/details/i.test(akkordeon.nodeName) || !nativeSupport || /android 4\.[1-3]/i.test(navigator.userAgent)) {
            akkordeon[status ? 'setAttribute' : 'removeAttribute']('open', true);
            akkordeon.className = akkordeon.className.replace(/(^|\s)open(\s|$)/g, '') + (status ? ' open' : '');
        } else {
            akkordeon.className = akkordeon.className.replace(/(^|\s)open(\s|$)/g, '');
        }

        if (status) {
            if (akkordeon.hasAttribute('data-load-url')) {
                var ev = document.createEvent('CustomEvent');
                ev.initCustomEvent('lazyload', true, true, null);
                akkordeon.dispatch(ev);
            }
        }

        if (!nativeSupport && status != initialStatus) {
            var ev = document.createEvent('CustomEvent');
            ev.initCustomEvent('toggle', true, true, {});
            akkordeon.dispatchEvent(ev);
        }

        var ev = document.createEvent('CustomEvent');
        ev.initCustomEvent('accordion.toggle', true, true, {});
        akkordeon.dispatchEvent(ev);
    },
    akkordeonHandler = function(evt) {
        evt = evt || window.evt;
        var akkordeon = evt.target || evt.srcElement,
            locked = false,
            summary;
        if (!akkordeon) { return; }

        while (akkordeon && (!akkordeon.className || !/(^|\s)akkordeon(\s|$)/.test(akkordeon.className))) {
            summary = akkordeon.querySelector('.field.checkbox');
            if (summary && /(^|\s)(checkbox|error)(\b|$)/.test(summary.className) && !summary.getElementsByTagName('input')[0].checked) {
                locked = true;
            }
            summary = akkordeon;
            akkordeon = akkordeon.parentNode;
        }
        if (!akkordeon || akkordeon.classList.contains('disabled')) { return; }
        if (locked) {
            akkordeon.setAttribute('open', true);
            akkordeon.className = akkordeon.className.replace(/(^|\s)open(\s|$)/g, '') + (' open');
            return;
        }
        if (summary !== akkordeon.querySelector('*:first-child')) { return; }

        if (evt.type === 'keyup') {
            if (evt.keyCode === 13 || evt.keyCode === 32) { akkordeonToggle(akkordeon); }
            else if (evt.keyCode === 38) { akkordeonToggle(akkordeon, false); }
            else if (evt.keyCode === 40) { akkordeonToggle(akkordeon, true); }
        } else if ((evt.which || evt.keycode) <= 1) {
            akkordeonToggle(akkordeon);
        }
        return false;
    };

    if (!document.addEventListener) {
        document.attachEvent('onclick', akkordeonHandler, false);
        document.attachEvent('onkeyup', akkordeonHandler, false);
    } else {
        document.addEventListener('click', akkordeonHandler);
        document.addEventListener('keyup', akkordeonHandler);
    }
})();
/* Default-Funktion von aria-disabled-Buttons verhindern (Fehler in Android) */
(function(){
    // TODO: check if this is still relevant or is it fixed in current Android versions (very old code here)
	var buttonHandler = function(ev) {
		ev = ev || window.event;
		var button = ev.target || ev.srcElement;
		if (!button) { return; }
		if (ev.type === 'keyup' && ev.keyCode !== 13) { return; }
		if (button.getAttribute && button.getAttribute('aria-disabled')) {
			if (typeof ev.preventDefault === 'function') {
				ev.preventDefault();
			} else {
				return false;
			}
		}
	}
    if (!document.addEventListener) {
        document.attachEvent('onclick', buttonHandler);
        document.attachEvent('onkeyup', buttonHandler);
    } else {
        document.addEventListener('click', buttonHandler);
        document.addEventListener('keyup', buttonHandler);
    }
})();
/* Text for the app buttons is fix, same for all pages, that is why we extracted it in the following function, here in the button module. */
/* Primary motivation for this is integration of cat components in CMS (Hippo). This way it is possible to have a single configurable element for all buttons. */
/* See https://mam-confluence.1and1.com/x/7_HjB for further details. */
(function () {
    var addTextToAppStoreButtons = function() {
        var BUTTON_TEXT = {
                "apple": "Erhältlich im App Store",
                "google": "Jetzt bei Google Play" ,
                "windows": "Herunterladen von Microsoft"
            },
            appButtons = document.getElementsByClassName('button app store') || [];

            if ( appButtons.length < 1 ) { return; }

            for ( var i = 0; i < appButtons.length; i++ ) {
                if ( appButtons[i].className.indexOf('apple') > -1 ) {
                    appButtons[i].innerHTML =  BUTTON_TEXT['apple'];
                }
                if ( appButtons[i].className.indexOf('google') > -1 ) {
                    appButtons[i].innerHTML =  BUTTON_TEXT['google'];
                }
                if ( appButtons[i].className.indexOf('windows') > -1 ) {
                    appButtons[i].innerHTML =  BUTTON_TEXT['windows'];
                }
            }
        }

        document.addEventListener('DOMContentLoaded', addTextToAppStoreButtons);
})();
(function() {
    var layers = [],
        closedLayers = [],
        layerCache = {},
    triggerEvent = function(name, target) {
        var ev = document.createEvent('CustomEvent');
        ev.initCustomEvent(name, true, true, {});
        target.dispatchEvent(ev);
    },
    finishLayer = function(layer, part, html) {
        if (part) {
            var content = document.createElement('div');
            content.innerHTML = html;
            part = content.querySelector(part);
            layer.innerHTML = '';
            layer.appendChild(part);
        } else {
            layer.innerHTML = html;
        }
        window.scrollTo(0,0);
        triggerEvent('layer.loaded', layer);
        location.href = location.href.replace(/#.*$/, '') + '#layer' + layers.length;
        if (/\bno-flex\b/.test(document.body.className)) {
            var text = document.createTextNode('');
            layer.parentNode.replaceChild(text, layer);
            text.parentNode.replaceChild(layer, text);
        }
    },
    layerOpen = function(options) {
        var layer = document.getElementById('layer'),
            html;
        // next line only because of CI HOTFIX for GMX - body gets css class layer in order to show the fullwidth (normal pages are boxed)
        document.body.className += ' layer';
        if (!layer) {
            var layer = document.createElement('div');
            layer.id = 'layer';
            layer.className = 'layer';
            document.body.insertBefore(layer, document.body.firstChild);
        }
        layers.push(options);
        triggerEvent('layer.loading', layer);
        if (/^(#|\.[^./]|\[)/.test(options.content)) {
            var node = document.querySelector(options.content);
            layerCache[options.content] || (layerCache[options.content] = (node || {}).innerHTML || '');
            node && node.parentNode.removeChild(node);
            finishLayer(layer, options.part, layerCache[options.content]);
        } else if (options.nocache || !(html = layerCache[options.content])) {
            layer.className = layer.className.replace(/(^|\s)(?:loading|error)(\s|$)/g, '$2') + ' loading';
            if (/jsonp(?:=([^#]*)|)(?:#(.*)|)/.test(options.method)) {
                var callback = RegExp.$1 || 'layercb' + Math.abs((new Date()).getTime() + Math.random() * 1E5 | 0),
                    jsonpart = RegExp.$2 ? RegExp.$2.split('.') : [],
                    script = document.createElement('script');
                script.src = options.content.replace(/=\?/g, '=' + callback);
                window[callback] = function(html) {
                    var parts = jsonpart.slice();
                    while (parts.length) {
                        html = (html || {})[parts.shift()];
                    }
                    layer.className = layer.className.replace(/(^|\s)(?:loading|error)(\s|$)/g, '$2');
                    if (!html) {
                        layer.className += ' error';
                        window.setTimeout(layerClose, 500);
                    } else {
                        finishLayer(layer, options.part, (layerCache[options.content] = html));
                    }
                    delete window[callback];
                    document.body.removeChild(script);
                }
                document.body.appendChild(script);
            } else {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', options.content, true);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== 4) { return; }
                    layer.className = layer.className.replace(/(^|\s)(?:loading|error)(\s|$)/g, '$2');
                    if (xhr.status != 200) {
                        layer.className += ' error';
                        window.setTimeout(layerClose, 500);
                    } else {
                        finishLayer(layer, options.part, (layerCache[options.content] = xhr.responseText));
                    }
                };
                xhr.send();
            }
        } else {
            finishLayer(layer, options.part, html);
        }
    },
    layerClose = function() {
        var layer = document.getElementById('layer');
        if (!layer) { return false; }
        layer.innerHTML = '';
        if (/Edge|Trident|Android [2-4]/.test(navigator.userAgent)) {
            var layer = document.getElementById('layer');
            layer && layer.parentNode.removeChild(layer);
        }
        closedLayers.push(layers.pop());
        // open previous layer after closing this one, if exists
        if (layers.length) {
            layerOpen(layers[layers.length - 1]);
        } else if (/#layer\d+/.test(location.hash)) {
            history.back();
        }
        // next line only because of CI HOTFIX for GMX - body gets css class layer in order to show the fullwidth (normal pages are boxed)
        document.body.className = document.body.className.replace(/(^|\s)(?:layer)(\s|$)/g, '');
        return true;
    },
    clickHandler = function(ev) {
        if (!ev || !ev.target ||
            (ev.type === 'click' && (ev.keyCode || ev.which) > 1) ||
            (ev.type === 'keyup' && (ev.keyCode || ev.which) !== 13)) { return; }
        var trigger = ev.target,
            layerQuery;
        while (trigger && (!trigger.getAttribute
            || !(layerQuery = trigger.getAttribute('data-layer-open') || trigger.getAttribute('data-layer-content'))
            && !trigger.hasAttribute('data-layer-close'))) {
            trigger = trigger.parentNode;
        }
        if (!trigger) { return; }
        if (trigger.hasAttribute('data-layer-close')) {
            triggerEvent('layer.close', trigger);
            layerClose() && ev.preventDefault();
        } else if (layerQuery) {
            triggerEvent('layer.trigger', trigger);
            layerOpen({
                content: layerQuery || trigger.href,
                nocache: trigger.hasAttribute('data-layer-nocache'),
                part: trigger.getAttribute('data-layer-part'),
                method: trigger.getAttribute('data-layer-method')
            });
            ev.preventDefault();
        }
    },
    routeHandler = function() {
        if (document.querySelector('.layer.loading')) { return; }
        if (!/#layer\d+/.test(location.hash) && layers.length) {
            layerClose();
        } else if (/#layer\d+/.test(location.hash) && !layers.length && closedLayers.length) {
            layerOpen.apply(this, closedLayers.pop());
        }
    };
    document.addEventListener('click', clickHandler);
    document.addEventListener('keyup', clickHandler);
    setInterval(routeHandler, 250);
})();
(function() {
    // returns carousel node or undefined
    var getCarousel = function(node) {
        var found = node;
        while (found && !/\bcarousel\b/.test(found.className || "")) {
            found = found.parentNode;
        }
        return found;
    },
    getPosAttribute = function(node) {
        var parent = node,
            pos;
        while (parent && (!parent.getAttribute || !(pos = parent.getAttribute('data-carousel-pos')))) {
            parent = parent.parentNode;
        }
        return pos;
    },
    // find out which variant of the transform attribute can be used
    transformAttr = 'transform oTransform msTransform webkitTransform'.replace(/(\w+)\s?/g, function(full, attr) {
        return attr in document.body.style ? full : '';
    }).split(' ')[0],
    // and transition (to trigger simulated transition for IE9)
    transitionAttr = 'transition oTransition msTransition webkitTransition'.replace(/(\w+)\s?/g, function(full, attr) {
        return attr in document.body.style ? full : '';
    }).split(' ')[0],
    setTranslateX = !transitionAttr ? transformAttr ? function(node, pos, unanimated) {
        if (unanimated) {
            node.style[transformAttr] = 'translateX(' + pos + 'px)';
            return;
        }
        var step = ((/(\-?\d+)/.test(node.style[transformAttr]) ? +RegExp.$1 : 0) - pos) / 10,
            i = 0;
        (function go() {
            if (++i < 10) { window.setTimeout(go, 17); }
            node.style[transformAttr]  = 'translateX(' + (pos + (10 - i) * step | 0) + 'px)';
        })();
    } : function(node, pos, unanimated) {
        if (unanimated) {
            node.style.left = pos + 'px';
            return;
        }
        var step = ((/(\-?\d+)/.test(node.style.left) ? +RegExp.$1 : 0) - pos) / 10,
            i = 0;
        (function go() {
            if (++i < 10) { window.setTimeout(go, 17); }
            node.style.left = (pos + (10 - i) * step | 0) + 'px';
        })();
    } : transformAttr ? function(node, pos) {
        node.style[transformAttr] = 'translateX(' + pos + 'px)';
    } : function(node, pos) {
        node.style.left = pos + 'px';
    },
    // move our carousel to a certain position
    moveToPos = function(node, pos, ev) {
        var rail = node.querySelector('ol[role="row"]'),
            nav = node.querySelector('ol[role="navigation"]'),
            items = node.querySelectorAll('ol[role="row"] > li'),
            maxWidth = node.offsetWidth,
            item = node.querySelector('ol[role="row"] > li.hidden + li:not(.hidden)');
        // prepare previous containers
        if (item) {
            var hidden = node.querySelectorAll('ol[role="row"] > li.hidden');
            for (var h = 0, t = hidden.length; h < t; h++) {
                hidden[h].className = hidden[h].className.replace(/(^|\s)hidden\b/g, '');
            }
            setTranslateX(rail, -item.offsetLeft, true);
        }
        // switch items one by one
        if (/^[+-]/.test(pos)) {
            if (pos === '+i') {
                node.pos++;
            } else if (pos === '-i') {
                node.pos--;
            } else if (pos === '+1') {
                // find next item that is not 100% in viewport
                for (var width = 0, i = node.pos - 1, l = items.length; i < l; i++) {
                    if (items[i].offsetWidth > maxWidth) {
                        width += maxWidth;
                    } else {
                        width += items[i].offsetWidth;
                    }
                    node.pos = i + 1;
                    if (width > maxWidth) {
                        break;
                    }
                }
            } else if (pos === "-1") {
                // find previous item that will fit 100% in viewport
                var width = 0;
                do {
                    width += items[--node.pos] && items[node.pos].offsetWidth;
                } while (node.pos > 0 && width < maxWidth);
                if (node.pos < 1) { node.pos = 1; }
            }
        } else {
            node.pos = +pos;
        }
        item = items[node.pos - 1];
        pos = item.offsetLeft;
        // use modern CSS transorms if at all possible, otherwise use left
        rail.className = rail.className.replace(/(^|\s)animate\b/g, '') + (ev.type !== 'resize' ? ' animate' : '');
        setTranslateX(rail, -pos, ev.type === 'resize');
        rail.pos = pos;
        // enable/disable prev/next buttons, change active
        nav.querySelector('[rel="prev"]')[node.pos === 1 ? 'setAttribute' : 'removeAttribute']('aria-disabled', true);
        var preview = node.pos > 1 && items[node.pos - 2].getAttribute('data-preview');
        nav.querySelector('[rel="prev"]').innerHTML = preview ? '<img src="' + preview.replace(/\"/g, '&quot;') + '" width="72" height="72" alt=""/>' : '';
        var active = nav.querySelector('.active'),
            icon = active.querySelector('.icon');
        active.className = active.className.replace('active ', '');
        icon && (icon.className = icon.className.replace(/(^|\s)white/, '$1inactive hover-service'));
        active = nav.querySelectorAll('li')[node.pos];
        var activeOtherClasses = active.className;
        active.className =  'active ' + activeOtherClasses;
        icon = active.querySelector('.icon');
        icon && (icon.className = icon.className.replace(/(^|\s)inactive hover-service/, '$1white'));
        var bm = document.createEvent('CustomEvent');
        bm.initCustomEvent('carousel.beforemove', true, true, { originalEvent: ev });
        active.dispatchEvent(bm);
        // clean up afterwards
        window.setTimeout(function() {
            rail.className = rail.className.replace(/(^|\s)animate\b/g, '');
            for (var a = 0, x = items.length; a < x; a++) {
                items[a].className = items[a].className.replace(/(^|\s)hidden\b/g, '')
                    + ((a <= node.pos - 2) ? ' hidden': '');
            }
            rail.style[transformAttr || 'left'] = '';
            var mv = document.createEvent('CustomEvent');
            mv.initCustomEvent('carousel.move', true, true, {});
            active.dispatchEvent(mv);
            // we need to wait for clean up to detect the next preview
            if (node.pos < items.length) {
                var nextInvisible = node.pos;
                while (items[nextInvisible] && items[nextInvisible].getBoundingClientRect().left <= node.offsetWidth) {
                    nextInvisible++;
                }
                if (items[nextInvisible]) {
                    preview = items[nextInvisible].getAttribute('data-preview');
                    nav.querySelector('[rel="next"]').innerHTML = preview ? '<img src="' + preview.replace(/\"/g, '&quot;') + '" width="72" height="72" alt=""/>' : '';
                }
            }
            // find out if we're already on the last page, i.e. that all modules after our current are already visible
            nav.querySelector('[rel="next"]')[items[items.length - 1].offsetLeft < maxWidth ? 'setAttribute' : 'removeAttribute']('aria-disabled', true);
        }, 260);
    },
    autoswitchHandler = function(carousel) {
        if (!carousel) {
            for (var carousels = document.querySelectorAll('.carousel[data-autoswitch]'), c = 0, l = carousels.length; c < l; c++) {
                var opts = carousels[c].getAttribute('data-autoswitch');
                if (!opts) { continue; }
                carousels[c].autoswitchTimeout = window.setTimeout(function(node) { return function() {
                    autoswitchHandler(node);
                }}(carousels[c]), /^(\d+)/.test(opts) && +RegExp.$1 || 10000);
            }
            return;
        }
        var opts = carousel.getAttribute && carousel.getAttribute('data-autoswitch');
        if (!opts || /\btouch\b/.test(document.body.className) && (/mobile=off/.test(opts)
            || (/mobile=touchoff/.test(opts) && carousel.touched))) {
            var wait = /mobile=touchoff,(\d+)/.test(opts) && +RegExp.$1;
            if (wait) {
                carousel.autoswitchTimeout = window.setTimeout(function(node) { return function() {
                    node.touched = false;
                    autoswitchHandler(node);
                }}(carousel), wait);
            }
            return;
        } else if (/desktop=clickoff/.test(opts) && carousel.clicked) {
            var wait = /desktop=clickoff,(\d+)/.test(opts) && +RegExp.$1;
            if (wait) {
                carousel.autoswitchTimeout = window.setTimeout(function(node) { return function() {
                    node.clicked = false;
                    autoswitchHandler(node);
                }}(carousel), wait);
            }
            return;
        }
        window.clearTimeout(carousel.autoswitchTimeout);
        carousel.autoswitchTimeout = window.setTimeout(function(node) { return function() {
            autoswitchHandler(node);
        }}(carousel), /^(\d+)/.test(opts) && +RegExp.$1 || 10000);
        if ((carousel.currentStyle || window.getComputedStyle(carousel)).maxHeight === '10000px') { return; }
        var next = carousel.querySelector('[rel="next"]');
        if (next.hasAttribute('aria-disabled')) {
            moveToPos(carousel, 1, { type: 'autoswitch' });
        } else {
            clickHandler({ type: 'autoswitch', target: next });
        }
    },
    clickHandler = function(ev) {
        if (!ev || !ev.target) { return; }
        // is there a carousel button clicked
        var changepos = getPosAttribute(ev.target);
        if (!changepos) { return; }
        var carousel = getCarousel(ev.target);
        if (!carousel) { return; }
        if (!carousel.pos) { carousel.pos = 1; }
        if (ev.type === 'click') { carousel.clicked = true; }
        var effect = document.createEvent('CustomEvent');
        effect.initCustomEvent('carousel.effect', true, true, { change: changepos, carousel: carousel });
        if (carousel.dispatchEvent(effect)) {
            moveToPos(carousel, changepos, ev);
            ev.target.blur && ev.target.blur();
        }
    },
    tposx,
    tposy,
    tmoved,
    tnode,
    touchHandler = function(ev) {
        if (!ev) { return; }
        if (/start|down$/i.test(ev.type)) {
            tnode = getCarousel(ev.target);
            if (!tnode) { return; }
            // do not use touch events on disabled carousels
            var nav = tnode.querySelector('ol[role="navigation"]');
            if (nav && (window.getComputedStyle(nav) || nav.currentStyle).display === 'none') {
                tnode = false;
                return;
            }
            tposx = (ev.touches ? ev.touches[0] || ev.touches : ev).clientX;
            tposy = (ev.touches ? ev.touches[0] || ev.touches : ev).clientY;
            tmoved = false;
        } else {
            if (!tnode) { return; }
            var rail = tnode.querySelector('ol[role="row"]');
            if (/move$/i.test(ev.type)) {
                var dx = (ev.touches ? ev.touches[0] || ev.touches : ev).clientX - tposx,
                    dy = (ev.touches ? ev.touches[0] || ev.touches : ev).clientY - tposy;
                if (dx * dx <= 4 || dy * dy > dx * dx) { return; }
                tmoved = dx;
                if ((tmoved < 0 && tnode.querySelector('ol[role="navigation"] [rel="next"][aria-disabled]'))
                    || (tmoved > 0 && tnode.querySelector('ol[role="navigation"] [rel="prev"][aria-disabled]'))) {
                    tmoved = false;
                    tnode = false;
                    return;
                }
                setTranslateX(rail, dx);
                ev.preventDefault();
            } else {
                if (tmoved === false) {
                    tnode = false;
                    return;
                }
                var button = tmoved < 0
                    ? tnode.querySelector('ol[role="navigation"] [rel="next"]')
                    : tnode.querySelector('ol[role="navigation"] [rel="prev"]');
                if (button.hasAttribute('aria-disabled')) {
                    setTranslateX(rail, -rail.pos || 0);
                } else {
                    clickHandler({ type: 'touch', target: button });
                }
                tnode.touched = true;
                tnode = false;
                return false;
            }
        }
    },
    resizeTimeout = false,
    resizeFunction = function() {
        for (var carousels = document.querySelectorAll('.carousel'), c = 0, l = carousels.length; c < l; c++) {
            if ('pos' in carousels[c]) {
                // disabled in breakpoint
                var nav = carousels[c].querySelector('ol[role="navigation"]');
                if (!nav.offsetWidth) {
                    moveToPos(carousels[c], 1, { target: carousels[c], type: 'resize' });
                    carousels[c].setAttribute('previous-position', carousels[c].pos);
                    continue;
                }
                // re-enabled in breakpoint
                var previous;
                if (nav.offsetWidth && (previous = carousels[c].getAttribute('previous-position'))) {
                    moveToPos(carousels[c], previous, { target: carousels[c], type: 'resize' });
                    carousels[c].removeAttribute('previous-position');
                    continue;
                }
                // current navigation item is invisible - switch to the previous/next visible one
                var navItems = carousels[c].querySelectorAll('ol[role="navigation"] li'),
                    navItem = (navItems || [])[carousels[c].pos];
                if (navItem && /(s|m|l|xl)-0/.test(navItem.className) && !navItem.offsetWidth) {
                    var dist = 0;
                    while (dist++ < navItems.length) {
                        if (carousels[c].pos - dist > 1 && (navItems[carousels[c].pos - dist] || {}).offsetWidth) {
                            moveToPos(carousels[c], carousels[c].pos - dist, { target: carousels[c], type: 'resize' });
                            break;
                        }
                        if (carousels[c].pos + dist < navItems.length - 1 && (navItems[carousels[c].pos + dist] || {}).offsetWidth) {
                            moveToPos(carousels[c], carousels[c].pos + dist, { target: carousels[c], type: 'resize' });
                            break;
                        }
                    }
                }
                // DP-10556 Bugfix
                moveToPos(carousels[c], carousels[c].pos, { target: carousels[c], type: 'resize' });
            }
        }
    },
    resizeHandler = function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(resizeFunction, 100);
    };
    window.addEventListener('load', function() { autoswitchHandler(); });
    document.addEventListener('click', clickHandler);
    window.addEventListener('resize', resizeHandler);
    // touch handler
    var events = 'ontouchstart' in window ? 'touchstart touchmove touchend'
        : window.navigator.msPointerEnabled ? 'MSPointerDown MSPointerMove MSPointerUp'
        : window.navigator.pointerEnabled ? 'pointerdown pointermove pointerup'
        : '';
    events.replace(/\w+/g, function(name) { document.addEventListener(name, touchHandler); });
})();
(function() {
    'use strict';
    // check for prerequisites; otherwise we have to rely on server-side validation
    if (!document.addEventListener || !('validity' in document.createElement('input'))) { return; }
    /* validation messages depending on document language */
    var messages = {
            "de": {
                "valueMissing": "Bitte {{meaning}} eingeben",
                "typeMismatch": "Bitte {{meaning}} vollständig eingeben",
                "patternMismatch": "Vertippt? Bitte {{meaning}} prüfen",
                "tooLong": "Bitte höchstens {{maxlength}} Zeichen eingeben",
                "tooShort": "Bitte mindestens {{minlength}} Zeichen eingeben",
                "rangeUnderflow": "Bitte Betrag von mindestens {{min}} {{format}} eingeben",
                "rangeOverflow": "Bitte Betrag von höchstens {{max}} {{format}} eingeben",
                "stepMismatch": "Bitte Betrag in {{format}} eingeben: {{placeholder}}",
                "valueMissingNoMeaning": "Bitte Formularfeld ausfüllen",
                "valueMissingCheckbox": "Bitte {{meaning}} bestätigen, um fortfahren zu können",
                "atMissing": "Bitte @-Zeichen in der E-Mail-Adresse einfügen"
            },
            "en": {
                "valueMissing": "Please insert {{meaning}}",
                "typeMismatch": "Please insert {{meaning}} completely",
                "patternMismatch": "Mistyped? Please check the {{meaning}}",
                "tooLong": "Please insert at most {{maxlength}} characters",
                "tooShort": "Please insert at least {{minlength}} characters",
                "rangeUnderflow": "Please insert an amount of at least {{min}} {{format}}",
                "rangeOverflow": "Please insert an amount of at most {{max}} {{format}}",
                "stepMismatch": "Please insert amount in {{format}}: {{placeholder}}",
                "valueMissingNoMeaning": "Please fill in form field",
                "valueMissingCheckbox": "Please accept {{meaning}} to continue",
                "atMissing": "Please insert @-Sign in E-Mail-Address"
            },
            "es": {
                "valueMissing": "Por favor inserte {{meaning}}",
                "typeMismatch": "Por favor inserte {{meaning}} completamente",
                "patternMismatch": "Por favor inserte {{meaning}} en el siguiente formato: {{format}}",
                "tooLong": "Por favor inserte un máximo de {{maxlength}} caracteres",
                "tooShort": "Por favor inserte un mínimo de {{minlength}} caracteres",
                "rangeUnderflow": "Por favor inserte un monto de al menos {{min}} {{format}}",
                "rangeOverflow": "Por favor inserte un monto de máximo {{max}} {{format}}",
                "stepMismatch": "Por favor inserte el monto en {{format}}: {{placeholder}}",
                "valueMissingNoMeaning": "Por favor llene el campo del formulario ",
                "valueMissingCheckbox": "Por favor acepte {{meaning}} para continuar",
                "atMissing": "Por favor inserte el símbolo @ en la dirección de correo electrónico."
            },
            "fr": {
                "valueMissing": "Veuillez s'il vous plaît saisir {{meaning}}",
                "typeMismatch": "Veuillez s'il vous plaît saisir {{meaning}} complètement",
                "patternMismatch": "Veuillez s'il vous plaît saisir {{meaning}} au format suivant: {{format}}",
                "tooLong": "Veuillez s'il vous plaît saisir au maximum {{maxlength}} caractères",
                "tooShort": "Veuillez s'il vous plaît saisir au minimum {{minlength}} caractères",
                "rangeUnderflow": "Veuillez s'il vous plaît saisir un nombre d'au moins {{min}} {{format}}",
                "rangeOverflow": "Veuillez s'il vous plaît saisir un nombre maximum de {{max}} {{format}}",
                "stepMismatch": "Veuillez s'il vous plaît saisir la quantité en {{format}}: {{placeholder}}",
                "valueMissingNoMeaning": "Veuillez s'il vous plaît remplir dans le champ du formulaire",
                "valueMissingCheckbox": "Veuillez s'il vous plaît confirmer {{meaning}} pour continuer",
                "atMissing": "Veuillez s'il vous plaît saisir le symbol @ dans l'adresse e-mail"
            },
            "zh-cn": {
                "valueMissing": "请输入 {{meaning}}",
                "typeMismatch": "请输入完整的 {{meaning}}",
                "patternMismatch": "请检查 {{meaning}} 的输入",
                "tooLong": "最多只可输入 {{maxlength}} 个字符",
                "tooShort": "最少需要 {{minlength}} 个字符",
                "rangeUnderflow": "最少 {{min}} {{format}}",
                "rangeOverflow": "最多 {{max}} {{format}}",
                "stepMismatch": "默认增量 {{format}}: {{placeholder}}",
                "valueMissingNoMeaning": "请完整填写表格",
                "valueMissingCheckbox": "请接受 {{meaning}} 条款以便继续下一步操作",
                "atMissing": "电子邮件地址中缺少 @ 符号"
            }
        }[/(de|en|fr|es|zh-cn)/.test(document.documentElement.getAttribute('lang')) ? RegExp.$1 : 'de'],
        /* TODO: more languages */
        getMessage = function(field) {
            var text = field.validationMessage,
                textdata = {
                    meaning: field.getAttribute('aria-label') || (field.parentNode.querySelector('label') || {}).innerHTML,
                    format: field.getAttribute('data-field-format') || field.getAttribute('placeholder'),
                    placeholder: field.getAttribute('placeholder') || '',
                    minlength: field.getAttribute('minlength'),
                    maxlength: field.getAttribute('maxlength'),
                    min: field.getAttribute('min'),
                    max: field.getAttribute('max')
                };
            // custom message takes precedence over generic messages
            if (field.validity && field.validity.customError) { return text; }
            // get message by ValidityState
            for (var item in messages) {
                if (messages.hasOwnProperty(item) && field.validity[item]) {
                    // use typeMismatch message for pattern mismatch without format information
                    if (item === 'patternMismatch' && !field.hasAttribute('data-patternmismatch-message')
                        && !textdata.format) { item = 'typeMismatch'; }
                    // split up different cases of valueMissing messages
                    if (item === 'valueMissing' && !field.hasAttribute('data-valuemissing-message')) {
                        if (!textdata.meaning) { item = 'valueMissingNoMeaning'; }
                        else if (item === 'valueMissing' && field.type === 'checkbox') { item = 'valueMissingCheckbox'; }
                    }
                    // use data attributes before generic message
                    text = field.getAttribute('data-' + item.toLowerCase() + '-message') ||
                           field.getAttribute('data-invalid-message') || messages[item];
                    break;
                }
            }
            return text.replace(/\{\{(.*?)\}\}/g, function(_, part) { return textdata[part] || ''; });
        },
        addMessage = function(field) {
            var text = getMessage(field),
                message = document.getElementById(field.id + '-error'),
                container = field.parentNode;
            container.className = container.className.replace(/(^|\s)error\b/g, '') + ' error';
            if (container.parentNode && /fieldset/i.test(container.parentNode.nodeName)) {
                container = container.parentNode;
            }
            field.setAttribute('aria-invalid', true);
            // if message container is not already there, add it behind the next container (.field, fieldset)
            if (text === '\0') {
                message && message.parentNode.removeChild(message);
                return;
            }
            if (!message) {
                message = document.createElement('div');
                message.id = field.id + '-error';
                message.className = 'error message field';
                container.parentNode[container.nextSibling ? 'insertBefore' : 'appendChild'](message, container.nextSibling);
            }
            message.innerHTML = '<span class="m error icon"></span><span></span>';
            message.lastChild.appendChild(document.createTextNode(text));
            var val = document.createEvent('CustomEvent');
            val.initCustomEvent('validation.errormessage.added', true, true, {
            });
            field.dispatchEvent(val);
        },
        removeMessage = function(field) {
            var message = document.getElementById(field.id + '-error');
            message && message.parentNode.removeChild(message);
            field.removeAttribute('aria-invalid');
            var container = field;
            while (container && container !== field.form) {
                container.className = container.className.replace(/(^|\s)error\b/g, '');
                container = container.parentNode;
            }
            var val = document.createEvent('CustomEvent');
            val.initCustomEvent('validation.errormessage.removed', true, true, {
            });
            field.dispatchEvent(val);
        },
        invalidHandler = function(ev) {
            if (!ev.target || !ev.target.validity || ev.target.validity.valid ||
                 ev.target.getAttribute('data-novalidate') || ev.target.form.novalidate) { return; }
            addMessage(ev.target);
            ev.preventDefault();
        },
        blurHandler = function(ev) {
            if (!ev.target || !ev.target.form || ( ev.target.type && /checkbox/i.test(ev.target.type))) { return; }
            var noval = ev.target.getAttribute('data-novalidate') || ev.target.form.hasAttribute('novalidate') ||
                ev.target.form.hasAttribute('formnovalidate') || ev.target.form.getAttribute('data-novalidate'),
                custom;
            if (noval && (noval !== 'reqonly' || !ev.target.validity.valueMissing)) { return; }
            if ((custom = ev.target.getAttribute('data-custom-validation'))) {
                // send custom validation event (call ev.detail.done() when finished)
                var val = document.createEvent('CustomEvent'),
                    field = ev.target;
                val.initCustomEvent(custom, true, true, {
                    originalEvent: ev,
                    done: function(defer) {
                        (defer || field).checkValidity() && removeMessage(defer || field);
                        if (/android/i.test(navigator.userAgent)) {
                            ev.relatedTarget && ev.relatedTarget.focus && ev.relatedTarget.focus();
                        }
                    }
                });
                field.dispatchEvent(val);
            } else if (ev.target.reportValidity ? ev.target.reportValidity()
                : ev.target.checkValidity && ev.target.checkValidity()) {
                removeMessage(ev.target);
            }
            if (/android/i.test(navigator.userAgent)) {
                ev.relatedTarget && ev.relatedTarget.focus && ev.relatedTarget.focus();
            }
        },
        changeHandler = function(ev) {
            if (!ev.target || !ev.target.form || ( ev.target.type && !/checkbox/i.test(ev.target.type))) { return; }
            var noval = ev.target.getAttribute('data-novalidate') || ev.target.form.hasAttribute('novalidate') ||
                ev.target.form.hasAttribute('formnovalidate') || ev.target.form.getAttribute('data-novalidate'),
                custom;
            if (noval && (noval !== 'reqonly' || !ev.target.validity.valueMissing)) { return; }
            if ((custom = ev.target.getAttribute('data-custom-validation'))) {
                // send custom validation event (call ev.detail.done() when finished)
                var val = document.createEvent('CustomEvent'),
                    field = ev.target;
                val.initCustomEvent(custom, true, true, {
                    originalEvent: ev,
                    done: function(defer) {
                        (defer || field).checkValidity() && removeMessage(defer || field);
                    }
                });
                field.dispatchEvent(val);
            } else if (ev.target.reportValidity ? ev.target.reportValidity()
                : ev.target.checkValidity && ev.target.checkValidity()) {
                removeMessage(ev.target);
            }
        },
        loadHandler = function(ev) {
            var target = ev.target === window ? document : ev.target,
                firstError = target.querySelector('input[aria-invalid], select[aria-invalid], textarea[aria-invalid]');
            if (firstError) {
                firstError.focus();
                // fix: checkbox could not trigger browser scroll event
                /checkbox|radio/i.test(firstError.type) && firstError.parentNode.parentNode.scrollIntoView();
                if (/ip[ao]d|iphone/i.test(navigator.userAgent)) {
                    location.replace(location.href.replace(/#.*$/, '') + '#' + firstError.id);
                }
            }
        },
        resetHandler = function(ev) {
            var fields = ev.target.querySelectorAll('input[aria-invalid], select[aria-invalid], textarea[aria-invalid]');
            for (var f = 0, l = fields.length; f < l; f++) { removeMessage(fields[f]); }
        },
        submitHandler = function(ev) {
            if (ev.target.checkValidity() == false) {
                ev.preventDefault && ev.preventDefault();
                // Android 4.0.4 seems not to be satisfied with only using preventDefault...
                ev.stopImmediatePropagation && ev.stopImmediatePropagation();
                if (ev.target.reportValidity) {
                    ev.target.reportValidity();
                } else {
                    var fields = ev.target.querySelectorAll('input, textarea, select');
                    for (var f = fields.length; f--;) {
                        fields[f].checkValidity() || fields[f].dispatchEvent(new Event('invalid'));
                    }
                }
                return false;
            }
        },
        focusErrorField = function(form) { return function() {
            loadHandler({target: form});
        }},
        clickHandler = function(ev) {
            if (!ev.target) { return; }
            // clicked on a button that leads to form submit - focus first erroneous node
            if (ev.target.form && !ev.target.hasAttribute('novalidate') && !ev.target.hasAttribute('formnovalidate')
                && ((/button/i.test(ev.target.nodeName) && ev.target.type !== 'reset') ||
                    (/input/i.test(ev.target.nodeName) && /submit|image/.test(ev.target.type)))) {
                window.setTimeout(focusErrorField(ev.target.form), 100);
            }
        },
        keyHandler = function(ev) {
            if (!ev.target || !ev.target.form) { return; }
            if ((ev.which || ev.keyCode) == 13 && /input|select/i.test(ev.target.nodeName) ||
                (/textarea/i.test(ev.target.nodeName) && ev.ctrlKey)) {
                // inline form submit - focus first erroneous node
                window.setTimeout(focusErrorField(ev.target.form), 100);
            }
        };
    document.addEventListener('invalid', invalidHandler, true);
    document.addEventListener('blur', blurHandler, true);
    document.addEventListener('change', changeHandler, true);
    document.addEventListener('reset', resetHandler, true);
    document.addEventListener('reset.validation', resetHandler);
    document.addEventListener('click', clickHandler);
    document.addEventListener('keyup', keyHandler);
    window.addEventListener('load', loadHandler);
    document.addEventListener('lazyload.done', loadHandler);
    // fix for some mobile webkit engines which don't stop submit on missingValue errors
    if (/mac os|android 4\.(4\.[0-2]|[^4])/i.test(navigator.userAgent)) {
        document.addEventListener('submit', submitHandler, true);
    }
})();
(function() {
    var seoLinkHandler = function(ev) {
        if (ev.isTrusted === false) { return; }
        var key = ev.which || ev.key || 0,
            node = ev.target,
            teaser = node,
            url;
        // we need to check if a href attribute is present, because IE aliases img.src to href
        if (!node || (node.hasAttribute && node.hasAttribute('href')) || key > 2) { return; }
        while (teaser && !/\bteaser\b/.test(teaser.className || '')) {
            !url && (url = url || (teaser.hasAttribute && teaser.hasAttribute('href') && teaser.href)
                || teaser.getAttribute && teaser.getAttribute('data-link-url')) && (node = teaser);
            teaser = teaser.parentNode;
        }
        if (!teaser || !/\blinked\b/.test(teaser.className)) { return; }
        if (!url) {
            node = teaser.querySelector('h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, .visual a, p > a, [data-link-url]');
            url = node && (node.href || node.getAttribute && node.getAttribute('data-link-url'));
        }
        if (!url) { return; }
        if ('dispatchEvent' in node) {
            var clickEvent = document.createEvent('MouseEvent');
            clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, node);
            if (!node.dispatchEvent(clickEvent)) { return; }
        } else {
            node.click();
        }
        if ('href' in node) { return; }
        window.open(url, key === 2 ? '_blank' : '_self');
    };
    document.addEventListener('click', seoLinkHandler);
})();
(function() {
    var lastMatch = window.matchMedia('screen and (min-width: 980px)').matches,
        lastFocus = false,
        toggle = /(?:^|\s)(toggle-\w+)\b/g,
        focus = /(^|\s)form-focus\b/g;
    resizeHandler = function() {
        var currentMatch = window.matchMedia('screen and (min-width: 980px)').matches;
        if (currentMatch && !lastMatch && toggle.test(document.body.className)) {
            toggle.lastIndex = 0;
            document.body.className.replace(toggle, function(_, name) {
                if (!name) { return; }
                var click = document.createEvent('Event');
                click.initEvent('click', true, true, {});
                document.querySelector('[data-toggle-nodes*="' + name + '"]').dispatchEvent(click);
            });
        }
        lastMatch = currentMatch;
    },
    focusHandler = function(ev) {
        if (ev.target !== lastFocus) {
            lastFocus = ev.target;
            document.body.className = document.body.className.replace(focus, '') + (ev.target.form ? ' form-focus' : '');
        }
    };
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('click', focusHandler);
    window.addEventListener('keyup', focusHandler);
})();
(function(){
    var loadHandler = function(ev) {
        var tables = (ev.target === window ? document : ev.target).getElementsByTagName('table');
        for (var t = 0; t < tables.length; t++) {
            var data = [];
            var ths = tables[t].querySelectorAll('thead tr:first-child th');
            for (var h = 0; h < ths.length; h++) {
                data.push(ths[h].innerText || ths[h].textContent);
            }
            var trs = tables[t].querySelectorAll('tbody > tr');
            for (var r = 0; r < trs.length; r++) {
                var tds = trs[r].querySelectorAll('td, th');
                for (var d = 0; d < tds.length; d++) {
                    tds[d].setAttribute('data-table-headline', data[d % data.length]);
                }
            }
        }
    },
    openHandler = function(ev) {
        ev = ev || window.ev;
        var rowgroup = ev.target || ev.srcElement;
        if (!rowgroup) { return; }
        while (/^t/i.test(rowgroup.parentNode.nodeName) && rowgroup.getAttribute('scope') !== 'rowgroup') {
            rowgroup = rowgroup.parentNode;
        }
        if (!rowgroup || rowgroup.getAttribute('scope') !== 'rowgroup') { return; }
        for (var tbody = ev.target || ev.srcElement; !/t?(body|head)/i.test(tbody.nodeName); tbody = tbody.parentNode);
        var sans = tbody.className.replace(/(^|\s)collapsed\b/g, '');
        if (ev.type === 'keyup') {
            if (ev.keyCode === 13 || ev.keyCode === 32) { tbody.className = tbody.className === sans ? tbody.className + ' collapsed' : sans; }
            else if (ev.keyCode === 38) { tbody.className += ' collapsed'; }
            else if (ev.keyCode === 40) { tbody.className = sans; }
        } else {
            tbody.className = tbody.className === sans ? tbody.className + ' collapsed' : sans;
        }
        if (typeof ev.preventDefault === 'function') {
            ev.preventDefault();
        }
        return false;
    }
    window.addEventListener('load', loadHandler);
    document.addEventListener('lazyload.done', loadHandler);
    document.addEventListener('layer.loaded', loadHandler);
    document.addEventListener('click', openHandler);
    document.addEventListener('keyup', openHandler);
})();
/**
 * Singleton: URLHelper
 * - getQueryParams  // Array of Object: [{key:value}, {key:value}, ...]
 * - buildQueryString  // String of query: ?key=value&key2=value2...
 */
var UrlHelper = (function() {
    var getQueryParams = function(separator, string) {
        if (!separator) { separator = "?"; }
        if (!string) { string = window.location.href; }
        var match,
            pl = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function(s) { return decodeURIComponent(s.replace(pl, " ")); },
            query = (string.indexOf(separator) !== -1) ? string.substring(string.indexOf(separator) + 1) : "",
            queryParams = [];
        while (match = search.exec(query))
            queryParams.push({ key: decode(match[1]), value: decode(match[2]) });
        return queryParams;
    },
    buildQueryString = function(queryParams, separator, appendToString) {
        if (!separator) { separator = "?"; }
        if (!appendToString) { appendToString = ""; }
        var string = "";
        for (var i = 0; i < queryParams.length; i++) {
            string += "&" + encodeURIComponent(queryParams[i].key) + "=" + encodeURIComponent(queryParams[i].value);
        }
        if (string && getQueryParams(separator, appendToString).length == 0) {
            string = separator + string.substr(1);
        }
        return appendToString + string;
    };
    return {
        getQueryParams: getQueryParams,  // Array of Object: [{key:value}, {key:value}, ...]
        buildQueryString: buildQueryString  // String of query: ?key=value&key2=value2...
    };
})();

/* placeholder shim */
;(function() {
	if ('placeholder' in document.createElement('input')) { return; }
	var inputHandler = function(ev) {
		ev = ev || window.event;
		if (!ev) { return; }
		var target = ev.target || ev.srcElement;
		if (!target || !('value' in target) || !target.getAttribute || !target.getAttribute('placeholder')) { return; }
		if (/focus(in|)/.test(ev.type)) {
			if (/\bplaceholder\b/.test(target.className)) {
				target.value = '';
				target.className = target.className.replace(/\bplaceholder\b/g, '');
			}
		} else {
			if (!target.value) {
				target.value = target.getAttribute('placeholder');
				target.className += ' placeholder';
			}
		}
	}, loadHandler = function() {
        var inputs = document.querySelectorAll('input[placeholder]');
        for (var i = 0, l = inputs.length; i < l; i++) {
            inputHandler({ target: inputs[i], type: 'blur' });
        }
    },render = (window.Mustache || {}).render;
	if (render) {
	    Mustache.render = function(template, view, partials) {
	    	return render.call(Mustache, template.replace(/<input[^>]+placeholder=(["'])(.*?)\1[^>]*>/g, function(input, quot, placeholder) {
	    		if (/value=(["']).+?\1/.test(input)) {
	    			return input;
	    		}
    			return input.replace(/value(=""|=''|)/g, '').replace(/class=(["'])(.*?)(\1)|\/>/, 'class="$2 placeholder" value="' + placeholder + '"$4');
	    	}), view, partials);
	    };
	}
	if (!document.addEventListener) {
		document.attachEvent('onfocusin', inputHandler);
		document.attachEvent('onfocusout', inputHandler);
 		window.attachEvent('onload', loadHandler);
	} else {
		document.addEventListener('focus', inputHandler, true);
		document.addEventListener('blur', inputHandler, true);
		window.addEventListener('load', loadHandler);
	}
})();

// fields-toggle for form version 1.5+
(function () {
    var click = false,
        fields_activate = function (nodelist) {
            var fields = document.querySelectorAll(nodelist);
            for (var f = 0, l = fields.length; f < l; f++) {
                if (!/input|select|textarea/i.test(fields[f].nodeName)) {
                    fields[f].classList.contains('hidden') && fields[f].classList.remove('hidden');
                    continue;
                }
                fields[f].removeAttribute('disabled');
                if (!(/button/i.test(fields[f].className) || fields[f].hasAttribute('data-field-optional'))
                    && /input|select|textarea/i.test(fields[f].nodeName)) {
                    fields[f].setAttribute('required', 'required');
                }
                var error_message = document.querySelector('#' + fields[f].id + '-error');
                error_message && error_message.classList.contains('hidden') && error_message.classList.remove('hidden');
                var container = fields[f];
                while (container && !/\bfield\b/.test(container.className)) {
                    container = container.parentNode;
                }
                if (!container) { continue; }
                container.className = (container.className + '').replace(/(\s|^)hidden\b/g, '');
                if (/fieldset/i.test(container.parentNode.nodeName)) {
                    container.parentNode.className = (container.parentNode.className + '').replace(/(\s|^)hidden\b/g, '');
                }

                /* for checked radio buttons and selected select options, further trigger their activate/deactivate fields */
                var cascadeElements = [];
                if (/(radio|checkbox)/i.test(fields[f].type) && fields[f].checked) {
                    cascadeElements.push(fields[f]);
                } else if (/select/i.test(fields[f].type) && fields[f].options.length > 0) {
                    for (var i = 0, len = fields[f].options.length; i < len; i++) {
                        if (fields[f].options[i].selected) {
                            cascadeElements.push(fields[f].options[i]);
                            break;
                        }
                    }
                }
                for (var c = 0; c < cascadeElements.length; c++) {
                    if (cascadeElements[c].hasAttribute('data-deactivate-fields')) {
                        fields_deactivate(cascadeElements[c].getAttribute('data-deactivate-fields'));
                    }
                    if (cascadeElements[c].hasAttribute('data-activate-fields')) {
                        fields_activate(cascadeElements[c].getAttribute('data-activate-fields'));
                    }
                }
            }
        },
        fields_deactivate = function (nodelist) {
            var fields = document.querySelectorAll(nodelist);
            for (var f = 0, l = fields.length; f < l; f++) {
                if (/(radio|checkbox)/i.test(fields[f].type) && fields[f].hasAttribute('checked')) {
                    /* re-establish the (radio-)field's default value (from dom state at page load) and trigger activation/deactivation of attached fields accordingly */
                    fields[f].checked = true;
                    if (fields[f].hasAttribute('data-deactivate-fields')) {
                        fields_deactivate(fields[f].getAttribute('data-deactivate-fields'));
                    }
                    if (fields[f].hasAttribute('data-activate-fields')) {
                        fields_activate(fields[f].getAttribute('data-activate-fields'));
                    }
                }
                if (/select/i.test(fields[f].type) && fields[f].options.length > 0) {
                    /* same for select */
                    for (var i = 0, len = fields[f].options.length; i < len; i++) {
                        if (fields[f].options[i].hasAttribute('selected')) {
                            fields[f].value = fields[f].options[i].value;
                            if (fields[f].options[i].hasAttribute('data-deactivate-fields')) {
                                fields_deactivate(fields[f].options[i].getAttribute('data-deactivate-fields'));
                            }
                            if (fields[f].options[i].hasAttribute('data-activate-fields')) {
                                fields_activate(fields[f].options[i].getAttribute('data-activate-fields'));
                            }
                        }
                    }
                }
                var error_message = document.querySelector('#' + fields[f].id + '-error');
                error_message && !error_message.classList.contains('hidden') && error_message.classList.add('hidden');
                if (/input|select|textarea/i.test(fields[f].nodeName)) {
                    // fields[f].removeAttribute('aria-invalid');
                    fields[f].removeAttribute('required');
                    fields[f].setAttribute('disabled', 'disabled');
                    // if (!/(radio|checkbox|select)/.test(fields[f].type)) { fields[f].value = ''; }
                } else {
                    !fields[f].classList.contains('hidden') && fields[f].classList.add('hidden');
                    continue;
                }
                var container = fields[f];
                while (container && !/\bfield\b/.test(container.className)) {
                    container = container.parentNode;
                }
                if (!container) { continue; }
                container.className = container.className.replace(new RegExp('(^|\\s)' + 'hidden' + '\\b', 'g'), '') + ' hidden';
                var info_icon = container.querySelector('.info.service.icon'), info;
                if (info_icon) {
                    info = document.querySelector(info_icon.getAttribute('data-toggle-nodes'));
                    info.className = info.className.replace(new RegExp('(^|\\s)' + 'hidden' + '\\b', 'g'), '') + ' hidden';
                }
                while (container && !/\bfieldset\b/i.test(container.nodeName)) {
                    container = container.parentNode;
                }
                if (!container) { continue; }
                container.className = container.className.replace(new RegExp('(^|\\s)' + 'hidden' + '\\b', 'g'), '') + ' hidden';
                var info_icons = container.querySelectorAll('.info.service.icon');
                if (info_icons.length) {
                    for (var i = 0, len = info_icons.length; i < len; i++) {
                        info = document.querySelector(info_icons[i].getAttribute('data-toggle-nodes'));
                        info.className = info.className.replace(new RegExp('(^|\\s)' + 'hidden' + '\\b', 'g'), '') + ' hidden';
                    }
                }
            }
        },
        fields_toggle_handler = function (ev) {
            if (ev.type === 'keyup' && (ev.which || ev.keyCode) != 13 || (ev.which || ev.keyCode) > 1) { return; }
            if (ev.type === 'touchstart' || ev.type === 'mousedown') {
                click = true;
                return;
            }
            if (ev.type === 'touchmove' || ev.type === 'mousemove') {
                click = false;
                return;
            }
            if (ev.type === 'touchend' || ev.type === 'mouseup') {
                if (!click) { return; }
                click = false;
            }

            var target = ev.target || ev.srcElement,
                parent = target,
                enable,
                disable;

            while (parent) {
                if (parent.htmlFor) { parent = document.getElementById(parent.htmlFor); }
                enable || (parent.getAttribute && (enable = parent.getAttribute('data-activate-fields')));
                disable || (parent.getAttribute && (disable = parent.getAttribute('data-deactivate-fields')));
                parent = parent.parentNode;
            }
            if (!enable && !disable) { return; }
            disable && fields_deactivate(disable);
            enable && fields_activate(enable);
        },
        options_change_handler = function (ev) {
            var target = ev.target || ev.srcElement,
                enable,
                disable;
            if (/(select|option)/i.test(target.type)) {
                var options = target.options,
                    selOpt = options.selectedIndex;
                enable = options[selOpt].getAttribute('data-activate-fields');
                disable = options[selOpt].getAttribute('data-deactivate-fields');
            }
            if (!enable && !disable) { return; }
            disable && fields_deactivate(disable);
            enable && fields_activate(enable);
        },
        revolution_handler = function () {
            var inputs = document.querySelectorAll('input[checked="checked"]');
            if (!inputs || inputs.length < 0) { return; }
            for (var index = 0; index < inputs.length; index++) {
                if (inputs[index].hasAttribute('data-deactivate-fields') || inputs[index].hasAttribute('data-activate-fields')) {
                    inputs[index].click();
                }
            }
        },
        checkedHandler = function (ev) {
            if (!ev || !ev.target || !ev.target.form || !ev.target.type || !/radio/i.test(ev.target.type)) { return; }
            var target = ev.target,
            radios = target.form.querySelectorAll('input[name="' + target.name + '"]');
            for (var index = 0; index < radios.length; index++) {
                if (radios[index].checked) {
                    radios[index].setAttribute('checked', 'checked');
                } else {
                    radios[index].hasAttribute('checked') && radios[index].removeAttribute('checked');
                }
            }
        };
    document.addEventListener('click', fields_toggle_handler, true);
    document.addEventListener('keyup', fields_toggle_handler, true);
    if (/ip[ao]d|iphone/i.test(navigator.userAgent)) {
        document.addEventListener('touchstart', fields_toggle_handler);
        document.addEventListener('touchend', fields_toggle_handler);
        document.addEventListener('touchmove', fields_toggle_handler);
    }
    // check user selection by step-falling back
    document.addEventListener('DOMContentLoaded', revolution_handler);
    // handel the checked="checked" attribute by changing with radio input
    document.addEventListener('change', checkedHandler);
})();
/**
 * Plugin: Toggle input type between 'password' and 'text'
 * - by default/idle password-type input field, the eye-icon won't be shown
 * - the eye-icon will be shown as soon as an user filled some value, and the color of icon is default/inactive
 * - password will be shown, the type of input field will be text, as soon as an user clicked on the eye-icon, and the
 *   color of icon will be service/active
 */
(function() {
    var inputHandler = function(ev) {
        if (!ev || !ev.target || !ev.target.type || !/(?:password|text)/.test(ev.target.type)) { return; }
        var container = input = ev.target;
        while (container && !/password field/.test(container.className)) {
            container = container.parentNode;
        }
        if (!container) { return; }
        var icon = container.querySelector('.eye.icon');
        if (!icon) {
            var eye = document.createElement('span');
            eye.className = 'm inactive service-hover eye icon';
            eye.setAttribute('title', 'Passwort ein/ausblenden');
            eye.setAttribute('role', 'button');
            container.appendChild(eye);
        }
        if (!input.value) {
            input.type = 'password';
            container.removeChild(icon);
        }
    },
    clickHandler = function(ev) {
        if (!ev || !ev.target || !/eye icon/.test(ev.target.className)) { return; }
        var container = ev.target;
        while (container && !/password field/.test(container.className)) {
            container = container.parentNode;
        }
        if (!container) { return; }
        ev.target.className = /\binactive(?!-hover)\b/.test(ev.target.className)
        ? 'm service inactive-hover eye icon'
        : 'm inactive service-hover eye icon';
        var input = container.querySelector('input');
        input.type = /password/.test(input.type) && input.value ? 'text' : 'password';
    };
    document.addEventListener('input', inputHandler);
    document.addEventListener('click', clickHandler);
})();

/** Bestellstrecke: presentation info changer for Rufnummer-Mitname */
document.addEventListener('change', function(ev) {
    var target = ev.target;
    if (!target || (ev.which || ev.keyCode) > 1 || !/(radio|select)/i.test(target.type) || !document.querySelector('#mobile-supplier')) { return; }
    var infos = document.querySelectorAll('.presentation-info'),
    unknownSupplier = document.querySelector('#mobile-supplier').value,
    decisionTree = {
        '#change-no': 'presentation-info-no',
        '#keep-no': {
            '#prepaid-card': {
                '#contract-announcement-no': 'presentation-info-pk',
                '#contract-announcement-yes': 'presentation-info-pp'
            },
            '#contract': {
                '#change-quickly-contract': {
                    '#contract-announcement-no': 'presentation-info-pk',
                    '#contract-announcement-yes': 'presentation-info-vsa'
                },
                '#change-after-contract': 'presentation-info-vnz'
            },
            '#freedom': {
                '#change-quickly-rescission': {
                    '#contract-announcement-no': 'presentation-info-pk',
                    '#contract-announcement-yes': 'presentation-info-vsa'
                },
                '#change-after-rescission': 'presentation-info-vbz'
            }
        }
    },
    treeWalker = function(tree) {
        if (typeof tree === 'string') { showThisInfo(tree); return; }
        for (var item in tree) {
            if (!tree.hasOwnProperty(item)) { continue; }
            var field = document.querySelector(item);
            if (field && field.checked) {
                treeWalker(tree[item]);
                break;
            }
        }
    },
    showThisInfo = function(infoID) {
        for (var i = 0, len = infos.length; i < len; i++ ) {
            if (infoID === infos[i].id) {
                infos[i].className = (infos[i].className + '').replace(/(\s|^)hidden\b/g, '');
            } else {
                infos[i].className = infos[i].className.replace(new RegExp('(^|\\s)' + 'hidden' + '\\b', 'g'), '') + ' hidden';
            }
        }
    };
    treeWalker(decisionTree);
    if (unknownSupplier == '-2') {
        showThisInfo('presentation-info-unknown');
    }
});
/** Custom-Event: Validation for birthday */
document.addEventListener('validate.bdate', function(ev) {
    var form = (ev.target || {}).form;
    if (!form) { return; }
    var dayField = form.querySelector('#birthday'),
        monthField = form.querySelector('#birthmonth'),
        yearField = form.querySelector('#birthyear'),
        day = parseInt(dayField.value, 10),
        month = parseInt(monthField.value, 10),
        year = parseInt(yearField.value, 10),
        date = new Date(year | 0, (month | 0) - 1, day | 0),
        // check for inherent Date validity
        valid = date.getDate() == day && date.getMonth() + 1 == month && date.getFullYear() == year,
        // check for minimum age of 18
        now = new Date(),
        adult = date <= new Date(now.getFullYear() - 18, now.getMonth(), now.getDate()),
        future = date > now,
        old = new Date('01 01 1900'),
        toOld = date < old,
        msg = (isNaN(day) || isNaN(month) || isNaN(year)) ? null
            : !valid ? 'Vertippt? Bitte Geburtsdatum prüfen'
            : future ? 'Vertippt? Bitte Geburtsdatum prüfen'
            : !adult ? 'Ein Vertragsabschluss ist erst ab dem 18. Lebensjahr möglich. Bitte wenden Sie sich an unsere Hotline.'
            : toOld ? 'Bitte Geburtsdatum nach dem 01.01.1900 eingeben'
            : '';
    if (msg) {
        dayField.setCustomValidity(msg);
        monthField.setCustomValidity('\0');
        yearField.setCustomValidity('\0');
        dayField.reportValidity ? dayField.reportValidity() : dayField.checkValidity && dayField.checkValidity();
        monthField.reportValidity ? monthField.reportValidity() : monthField.checkValidity && monthField.checkValidity();
        yearField.reportValidity ? yearField.reportValidity() : yearField.checkValidity && yearField.checkValidity();
    } else if (!msg) {
        dayField.setCustomValidity('');
        monthField.setCustomValidity('');
        yearField.setCustomValidity('');
        if (msg === '') {
            var reset = document.createEvent('CustomEvent');
            reset.initCustomEvent('reset.validation', true, true, {});
            dayField.parentNode.parentNode.dispatchEvent(reset);
        } else {
            ev.detail.done(dayField);
        }
    }
    ev.detail.done();
});
/** Custom-Event: Validation for pass date */
document.addEventListener('validate.passdate', function(ev) {
    var form = (ev.target || {}).form;
    if (!form) { return; }
    var dayField = form.querySelector('#available-day'),
        monthField = form.querySelector('#available-month'),
        yearField = form.querySelector('#available-year'),
        day = parseInt(dayField.value, 10),
        month = parseInt(monthField.value, 10),
        year = parseInt(yearField.value, 10),
        date = new Date(year | 0, (month | 0) - 1, day | 0),
        // check for inherent Date validity
        valid = date.getDate() == day && date.getMonth() + 1 == month && date.getFullYear() == year,
        now = new Date(),
        past = date < now.setHours(0,0,0,0),
        available = date > now.setDate(now.getDate() + 10),
        msg = (isNaN(day) || isNaN(month) || isNaN(year)) ? null
            : !valid ? 'Vertippt? Bitte Gültigkeitsdatum prüfen'
            : past ? 'Der Ausweis muss mind. noch 10 Tage gültig sein'
            : !available ? 'Der Ausweis muss mind. noch 10 Tage gültig sein'
            : '';
    if (msg) {
        dayField.setCustomValidity(msg);
        monthField.setCustomValidity('\0');
        yearField.setCustomValidity('\0');
        dayField.reportValidity ? dayField.reportValidity() : dayField.checkValidity && dayField.checkValidity();
        monthField.reportValidity ? monthField.reportValidity() : monthField.checkValidity && monthField.checkValidity();
        yearField.reportValidity ? yearField.reportValidity() : yearField.checkValidity && yearField.checkValidity();
    } else if (!msg) {
        dayField.setCustomValidity('');
        monthField.setCustomValidity('');
        yearField.setCustomValidity('');
        if (msg === '') {
            var reset = document.createEvent('CustomEvent');
            reset.initCustomEvent('reset.validation', true, true, {});
            dayField.parentNode.parentNode.dispatchEvent(reset);
        } else {
            ev.detail.done(dayField);
        }
    }
    ev.detail.done();
});
/** Custom-Event: Validation for future date */
document.addEventListener('validate.future', function(ev) {
    var form = (ev.target || {}).form;
    if (!form) { return; }
    var dayField = form.querySelector('#contract-agreement-end-day'),
        monthField = form.querySelector('#contract-agreement-end-month'),
        yearField = form.querySelector('#contract-agreement-end-year'),
        day = parseInt(dayField.value, 10),
        month = parseInt(monthField.value, 10),
        year = parseInt(yearField.value, 10),
        date = new Date(year | 0, (month | 0) - 1, day | 0),
        // check for inherent Date validity
        valid = date.getDate() == day && date.getMonth() + 1 == month && date.getFullYear() == year,
        now = new Date(),
        future = date > now,
        msg = (isNaN(day) || isNaN(month) || isNaN(year)) ? null
            : !valid ? 'Vertippt? Bitte Datum prüfen'
            : !future ? 'Das Kündigungsdatum muss in der Zukunft liegen. Ist Ihr Vertrag bereits gekündigt, wählen Sie bitte diese Option oben aus.'
            : '';
    if (msg) {
        dayField.setCustomValidity(msg);
        monthField.setCustomValidity('\0');
        yearField.setCustomValidity('\0');
        dayField.reportValidity ? dayField.reportValidity() : dayField.checkValidity && dayField.checkValidity();
        monthField.reportValidity ? monthField.reportValidity() : monthField.checkValidity && monthField.checkValidity();
        yearField.reportValidity ? yearField.reportValidity() : yearField.checkValidity && yearField.checkValidity();
    } else if (!msg) {
        dayField.setCustomValidity('');
        monthField.setCustomValidity('');
        yearField.setCustomValidity('');
        if (msg === '') {
            var reset = document.createEvent('CustomEvent');
            reset.initCustomEvent('reset.validation', true, true, {});
            dayField.parentNode.parentNode.dispatchEvent(reset);
        } else {
            ev.detail.done(dayField);
        }
    }
    ev.detail.done();
});
/** Custom-Event: Validation for between date */
document.addEventListener('validate.between', function(ev) {
    var form = (ev.target || {}).form;
    if (!form) { return; }
    var dayField = form.querySelector('#freedom-agreement-end-day'),
        monthField = form.querySelector('#freedom-agreement-end-month'),
        yearField = form.querySelector('#freedom-agreement-end-year'),
        day = parseInt(dayField.value, 10),
        month = parseInt(monthField.value, 10),
        year = parseInt(yearField.value, 10),
        date = new Date(year | 0, (month | 0) - 1, day | 0),
        // check for inherent Date validity
        valid = date.getDate() == day && date.getMonth() + 1 == month && date.getFullYear() == year,
        // check for maximum of 80 days in the past OR  maximum 123 days into the future.
        now = new Date(),
        late = date < now.setDate(now.getDate() - 80),
        early = date > now.setDate(now.getDate() + 203),  // + 80 + 123
        msg = (isNaN(day) || isNaN(month) || isNaN(year)) ? null
            : !valid ? 'Vertippt? Bitte Datum prüfen'
            : late ? 'Das Kündigungsdatum darf höchstens 80 Tage in der Vergangenheit liegen. Bitte überprüfen Sie Ihre Eingabe oder wählen Sie oben "Nein, bitte neue Rufnummer zuweisen".'
            : early ? 'Das Kündigungsdatum darf höchstens 123 Tage in der Zukunft liegen. Bitte überprüfen Sie Ihre Eingabe oder wählen Sie oben "Nein, bitte neue Rufnummer zuweisen.'
            : '';
    if (msg) {
        dayField.setCustomValidity(msg);
        monthField.setCustomValidity('\0');
        yearField.setCustomValidity('\0');
        dayField.reportValidity ? dayField.reportValidity() : dayField.checkValidity && dayField.checkValidity();
        monthField.reportValidity ? monthField.reportValidity() : monthField.checkValidity && monthField.checkValidity();
        yearField.reportValidity ? yearField.reportValidity() : yearField.checkValidity && yearField.checkValidity();
    } else if (!msg) {
        dayField.setCustomValidity('');
        monthField.setCustomValidity('');
        yearField.setCustomValidity('');
        if (msg === '') {
            var reset = document.createEvent('CustomEvent');
            reset.initCustomEvent('reset.validation', true, true, {});
            dayField.parentNode.parentNode.dispatchEvent(reset);
        } else {
            ev.detail.done(dayField);
        }
    }
    ev.detail.done();
});
/** Custom-Event: Validation for past30 date */
document.addEventListener('validate.past30', function(ev) {
    var form = (ev.target || {}).form;
    if (!form) { return; }
    var dayField = form.querySelector('#handover-day'),
        monthField = form.querySelector('#handover-month'),
        yearField = form.querySelector('#handover-year'),
        day = parseInt(dayField.value, 10),
        month = parseInt(monthField.value, 10),
        year = parseInt(yearField.value, 10),
        date = new Date(year | 0, (month | 0) - 1, day | 0),
        // check for inherent Date validity
        valid = date.getDate() == day && date.getMonth() + 1 == month && date.getFullYear() == year,
        now = new Date(),
        future = date > now,
        // the time value of the compared date is 00:00 Uhr, but 'now/today' beginns normally after
        // 00:00 Uhr, so we need to delete one more day (or to say excludes the "today")
        past30 = date < now.setDate(now.getDate() - 30 - 1),
        msg = (isNaN(day) || isNaN(month) || isNaN(year)) ? null
            : !valid ? 'Vertippt? Bitte Datum prüfen'
            : past30 ? 'Das angegebene Datum darf nicht mehr als 30 Tage in der Vergangenheit liegen. Bitte wählen Sie "Nein, mein Anbieter wurde noch nicht informiert".'
            : future ? 'Bitte ein Datum angeben das in der Vergangenheit liegt.'
            : '';
    if (msg) {
        dayField.setCustomValidity(msg);
        monthField.setCustomValidity('\0');
        yearField.setCustomValidity('\0');
        dayField.reportValidity ? dayField.reportValidity() : dayField.checkValidity && dayField.checkValidity();
        monthField.reportValidity ? monthField.reportValidity() : monthField.checkValidity && monthField.checkValidity();
        yearField.reportValidity ? yearField.reportValidity() : yearField.checkValidity && yearField.checkValidity();
    } else if (!msg) {
        dayField.setCustomValidity('');
        monthField.setCustomValidity('');
        yearField.setCustomValidity('');
        if (msg === '') {
            var reset = document.createEvent('CustomEvent');
            reset.initCustomEvent('reset.validation', true, true, {});
            dayField.parentNode.parentNode.dispatchEvent(reset);
        } else {
            ev.detail.done(dayField);
        }
    }
    ev.detail.done();
});

/** Custom-Event: Validation for IBAN, account number and bank code */
(function() {
    var iBAN = function(b,a,n,i){i=parseInt;return n+('0'+(98-((((""+b)%97+(""+a))%97)+""+i(n[0],36)+i(n[1],36)+"00")%97)).slice(-2)+b+a},
        isiBAN = function(i,d){
            i = i.replace(/\s/g, '');
            return (d=/(\w)(\w)(..)(\d{8})(\d+)/.exec(i)) && (i=parseInt,(d[4]%97+d[5])%97+""+i(d[1],36)+i(d[2],36)+d[3])%97==1;
        },
        accountNoField = document.querySelector('#account-no'),
        bankCodeField = document.querySelector('#bank-code');

    /* on the fly input validation and formatting - start*/

    /* check if is native android browser */
    var nua = navigator.userAgent.toLowerCase(), splitIban, splitBlz,
        is_android = ((nua.indexOf('mozilla/5.0') > -1 && nua.indexOf('android ') > -1 &&  nua.indexOf('applewebkit') > -1) && !(nua.indexOf('chrome') > -1)),
        is_windowsphone = nua.indexOf('windows phone') > -1 || nua.indexOf('iemobile') > -1 || nua.indexOf('wpdesktop') > -1 ,
        is_android = is_android === true ? is_android && is_windowsphone === false : is_android,
        versionMatch = nua.match(/android\s([0-9\.]*)/),
        androidVersion = versionMatch ? versionMatch[1] : false,
        performOnTheFlyFormatting = (is_android === false && androidVersion === false) || parseInt(androidVersion,10) > 4 || is_windowsphone;

    /* ... for iban / account number */
    if(typeof accountNoField != "undefined" && accountNoField != null){

        splitIban = function (e) {
            e.target.value = e.target.value.toUpperCase();

            if(performOnTheFlyFormatting === true && e.target.value.length >= 1 && isNaN(e.target.value.charAt(0))){

                var inputTarget = e.target,
                    strLength = inputTarget.value.length,
                    trimmedValue = inputTarget.value.replace(/[^\dA-Za-z]/g, ''),
                    maxLength = inputTarget.getAttribute("maxlength") || 38;

                // allow input of empty space only after a block of 4 chars
                if(trimmedValue.length > 0 && trimmedValue.length % 4 == 0 && inputTarget.value.slice(-1) == ' '){
                    inputTarget.value = inputTarget.value.replace(/\s+/g, ' ');
                    return;
                }

                /* bundle result to blocks of 4 (... to improve typing performance only if ...) if ...
                *       - more than 0 signs are entered and division through 4 signs is 0 => blocks of 4 can be formatted
                *       - characters are inserted in the middle of the string and reformatting is needed
                *       - value has more or equal to 22 characters and no space is found (inserted by copy paste)
                *       - value has reached max allowed characters => input should be finished
                * */
                if(
                    (trimmedValue.length > 0 && (trimmedValue.length-1) % 4 == 0)
                    || inputTarget.selectionEnd != inputTarget.value.length
                    || (inputTarget.value.length >= 22 && inputTarget.value.indexOf(' ') < 0)
                    || (inputTarget.value.length >= 27)
                ){
                    var cursorIsOnEnd = inputTarget.value.length == inputTarget.selectionEnd,
                        cursorPosition = inputTarget.selectionEnd;
                    inputTarget.value = trimmedValue.replace(/(.{4})/g, '$1 ').trim();

                    /* cursor positioning */
                    /* - update cursor position to the end of input (+1 if last is a space that was inserted) */
                    inputTarget.selectionEnd += ((inputTarget.value.charAt(inputTarget.selectionEnd - 1) == ' ' && inputTarget.value.charAt(strLength - 1) == ' ' && strLength != inputTarget.value.length) ? 1 : 0);

                    /* cursor positioning */
                    /* - update cursor position if user corrects entry and cursor is in middle of string (+1 position if space was inserted) */
                    if(cursorIsOnEnd != true)
                        inputTarget.selectionEnd = cursorPosition + ((inputTarget.value.charAt(cursorPosition - 1) == ' ') ? 1 : 0);

                }

                /* in case iban was copy pasted in full length with lower case characters*/
                if(inputTarget.value.length == maxLength ){
                    inputTarget.value = e.target.value.toUpperCase();
                }

                // if more than 38 characters (31 IBAN + 7 whitespaces) - cut last entry/-ies
                if(inputTarget.value.length > maxLength ){
                    inputTarget.value = inputTarget.value.substring(0, maxLength).trim();
                }
            }
        };
        if (/(\b|^)touch(\b|$)/ig.test(document.getElementById('top').className)) {
            accountNoField.addEventListener('keyup', splitIban);
        } else {
            accountNoField.addEventListener('input', splitIban);
        }
    }

    /* ... for bank code */

    if(typeof bankCodeField != "undefined" && bankCodeField != null && performOnTheFlyFormatting){
        splitBlz = function (e) {

            /* execute to upper case only for input of first two characters or if input finished with maxlength */
            if(isNaN(e.target.value.charAt(0)))
                e.target.value = e.target.value.toUpperCase();

            var inputTarget = e.target,
                maxLength = inputTarget.getAttribute("maxlength") || 13;

            if(performOnTheFlyFormatting === true && e.target.value.length >= 1 && isNaN(e.target.value.charAt(0)) !== true) {

                var strLength = inputTarget.value.length,
                    trimmedValue = inputTarget.value.replace(/[^\dA-Za-z]/g, '');

                // allow input of empty space only after a block of 3 chars
                if (trimmedValue.length > 0 && trimmedValue.length % 3 == 0 && inputTarget.value.slice(-1) == ' ') {
                    inputTarget.value = inputTarget.value.replace(/\s+/g, ' ');
                    return;
                }

                // remove signs that are no digits or capital letters and bundle result to blocks of 3
                if (
                    (trimmedValue.length > 0 && (trimmedValue.length - 1) % 3 == 0)
                    || inputTarget.selectionEnd != inputTarget.value.length
                    || (inputTarget.value.length >= 8 && inputTarget.value.indexOf(' ') < 0)
                    || (inputTarget.value.length >= 10)
                ) {
                    var cursorIsOnEnd = inputTarget.value.length == inputTarget.selectionEnd,
                        cursorPosition = inputTarget.selectionEnd;
                    inputTarget.value = trimmedValue.replace(/(.{3})/g, '$1 ').trim();

                    /* cursor positioning */
                    /* - update cursor position to the end of input (+1 if last is a space that was inserted) */
                    inputTarget.selectionEnd += ((inputTarget.value.charAt(inputTarget.selectionEnd - 1) == ' ' && inputTarget.value.charAt(strLength - 1) == ' ' && strLength != inputTarget.value.length) ? 1 : 0);

                    /* cursor positioning */
                    /* - update cursor position if user corrects entry and cursor is in middle of string (+1 position if space was inserted) */
                    if (cursorIsOnEnd != true)
                        inputTarget.selectionEnd = cursorPosition + ((inputTarget.value.charAt(cursorPosition - 1) == ' ') ? 1 : 0);
                }
            }

            // if more than 13 characters (10 numbers + 3 whitespaces) - cut last entry/-ies
            if (inputTarget.value.length > maxLength) {
                inputTarget.value = inputTarget.value.substring(0, maxLength).trim();
            }
        };
        if (/(\b|^)touch(\b|$)/ig.test(document.getElementById('top').className)) {
            bankCodeField.addEventListener('keyup', splitBlz);
        } else {
            bankCodeField.addEventListener('input', splitBlz);
        }
    }

    /* on the fly input validation & formatting - end */

    document.addEventListener('validate.iban', function(ev) {
        var form = (ev.target || {}).form;
        if (!form) { return; }
        var ibanField = form.querySelector('#account-no'),
            bankCodeField = form.querySelector('#bank-code'),
            error_account = false,
            error_iban = false,
            error_bankcode = false,
            error_combi = false,
            msg = null;

        bankCodeField && bankCodeField.getAttribute('disabled') && bankCodeField.removeAttribute('disabled');
        if (ibanField && ibanField.value) {
            ibanField.value = ibanField.value.replace(/\s+/g, ' ');
            if (/^[a-zA-Z]/.test(ibanField.value)) {
                if (ibanField.value.replace(/\s+/g, '').length > 14 && ibanField.value.replace(/\s+/g, '').length < 32) {
                    bankCodeField.value = ibanField.value.replace(/\s/g, '').slice(4, 12);
                    bankCodeField.setAttribute('disabled', 'disabled');
                    var reset = document.createEvent('CustomEvent');
                    reset.initCustomEvent('reset.validation', true, true, {});
                    bankCodeField.parentNode.dispatchEvent(reset);
                } else {
                    error_iban = true;
                }
            } else{
                ibanField.value = ibanField.value.replace(/\s+/g, '');
                if (!/^[0-9]{0,10}$/.test(ibanField.value)) {
                    error_account = true;
                }
                if (bankCodeField && bankCodeField.value && !/^[0-9]{8}$/.test(bankCodeField.value.replace(/\s/g, '')) && !isiBAN(iBAN(bankCodeField.value, ibanField.value, 'DE'))) {
                    error_combi = true;
                }
            }
        }
        msg = (!ibanField.value) ? null
            : error_iban ? 'Länge von IBAN muss zwischen 15 bis 31 sein'
            : error_account ? 'Bitte gültige Konto-Nr. oder IBAN eingeben'
            : error_combi ? 'Bitte Kontonummer und Bankleitzahl prüfen'
            : '';
        if (msg) {
            ibanField.setCustomValidity(msg);
            (error_combi && ibanField.value && !error_iban && !error_account) ? bankCodeField.setCustomValidity(msg) : bankCodeField.setCustomValidity('');
            ibanField.reportValidity ? ibanField.reportValidity() : ibanField.checkValidity && ibanField.checkValidity();
            bankCodeField.reportValidity ? bankCodeField.reportValidity() : bankCodeField.checkValidity && bankCodeField.checkValidity();
        } else {
            ibanField.setCustomValidity('');
            bankCodeField.setCustomValidity('');
            if (msg === '') {
                var reset = document.createEvent('CustomEvent');
                reset.initCustomEvent('reset.validation', true, true, {});
                ibanField.parentNode.dispatchEvent(reset);
            } else {
                ev.detail.done(ibanField);
            }
        }
        ev.detail.done();
    });
})();

/* Validate account holder name and own name */
(function() {
    var toggleDirectDebitApprovalType = function() {
        var namefield = document.querySelector('#account-holder'),
            firstnamefield = document.querySelector('#name'),
            lastnamefield = document.querySelector('#surname');
        if (!namefield || !firstnamefield || !lastnamefield) { return; }
        var name = /\bplaceholder\b/.test(namefield.className) ? '' : namefield.value.trim(),
            firstname = /\bplaceholder\b/.test(firstnamefield.className) ? '' : firstnamefield.value.trim(),
            lastname = /\bplaceholder\b/.test(lastnamefield.className) ? '' : lastnamefield.value.trim(),
            same = name.toLowerCase() === (firstname + ' ' + lastname).toLowerCase();
        if (!name || !firstname || !lastname) { return; }
        // if names differ, show+enable extra fields, otherwise hide+disable them
        var self = document.querySelector('#approved-self-label'),
            other = document.querySelector('#approved-other-label');
        self.className = self.className.replace(/(^|\s)hidden\b/g, '') + (!same ? ' hidden' : '');
        other.className = other.className.replace(/(^|\s)hidden\b/g, '') + (same ? ' hidden' : '');
    };
    document.addEventListener('validate.name-defer', function(ev) {
        var form = ev.target.form,
            firstnamefield = form.querySelector('#name') || [],
            lastnamefield = form.querySelector('#surname') || [],
            firstname = /\bplaceholder\b/.test(firstnamefield.className) ? '' : firstnamefield.value.trim(),
            lastname = /\bplaceholder\b/.test(lastnamefield.className) ? '' : lastnamefield.value.trim(),
            account = form.querySelector('#account-holder'),
            addressee = form.querySelector('#receipt-addressee'),
            validate = document.createEvent('CustomEvent');
        if (!firstname || !lastname) {
            ev.target.reportValidity && ev.target.reportValidity();
            ev.detail.done();
            return;
        }
        validate.initCustomEvent('validate.account-holder', true, true, { done: ev.detail.done });
        account && account.value && account.dispatchEvent(validate);
        validate.initCustomEvent('validate.addressee', true, true, { done: ev.detail.done });
        addressee = form.querySelector('#bill-addressee') || [];
        addressee && addressee.value && addressee.dispatchEvent(validate);
        ev.target.value && ev.detail.done();
    });
    document.addEventListener('validate.address-defer', function(ev) {
        var form = ev.target.form,
            streetfield = form.querySelector('#street-name') || [],
            streetnofield = form.querySelector('#street-no') || [],
            zipcodefield = form.querySelector('#postcode') || [],
            cityfield = form.querySelector('#location') || [],
            street = /\bplaceholder\b/.test(streetfield.className) ? '' : streetfield.value.trim(),
            streetno = /\bplaceholder\b/.test(streetnofield.className) ? '' : streetnofield.value.trim();
        if (ev.target.id === 'street-name' && !street || ev.target.id === 'street-no' && !streetno) {
            ev.target.validity && ev.target.reportValidity && ev.target.reportValidity();
            ev.detail.done();
            return;
        }
        ev.target.value && ev.detail.done();
    });
    document.addEventListener('validate.account-holder', function(ev) {
        var form = ev.target.form,
            namefield = form.querySelector('#account-holder') || [],
            firstnamefield = form.querySelector('#name') || [],
            lastnamefield = form.querySelector('#surname') || [],
            name = /\bplaceholder\b/.test(namefield.className) ? '' : namefield.value.trim(),
            firstname = /\bplaceholder\b/.test(firstnamefield.className) ? '' : firstnamefield.value.trim(),
            lastname = /\bplaceholder\b/.test(lastnamefield.className) ? '' : lastnamefield.value.trim(),
            same = name.toLowerCase() === (firstname + ' ' + lastname).toLowerCase();
        // otherwise invalid, do not test further
        if (!name || !firstname || !lastname) {
            ev.target.reportValidity && ev.target.reportValidity();
            ev.detail.done();
            return;
        }
        // show appropriate approval section depending on values */
        toggleDirectDebitApprovalType();
        ev.detail.done();
    });
    document.addEventListener('validate.addressee', function(ev) {
        var name = ev.target.value.trim(),
            form = ev.target.form,
            firstnamefield = form.querySelector('#name') || [],
            lastnamefield = form.querySelector('#surname') || [],
            firstname = /\bplaceholder\b/.test(firstnamefield.className) ? '' : firstnamefield.value.trim(),
            lastname = /\bplaceholder\b/.test(lastnamefield.className) ? '' : lastnamefield.value.trim();
        // otherwise invalid, do not test further
        if (!name || /,/.test(name)) {
            ev.target.validity.patterMismatch && ev.target.reportValidity && ev.target.reportValidity();
            ev.detail.done();
            return;
        }
        // same name?
        ev.target.setCustomValidity(firstname && lastname && (name !== firstname + ' ' + lastname)
            ? 'Bitte den eigenen Vor- und Nachnamen eingeben'
            : '');
        ev.target.reportValidity && ev.target.reportValidity();
        ev.detail.done(ev.target);
    });
    /* make sure toggling of required sections and filling of read-onlys is also done correctly on page load depending on prefilled data */
    document.addEventListener('DOMContentLoaded', function(ev) {
        toggleDirectDebitApprovalType();
    });
})();
/* auto-fill account holder on name change */
(function() {
    document.addEventListener('change', function(ev) {
        var target = ev.target || ev.srcElement;
        if (target.id != "name" && target.id != "surname") { return; }
        var form = ev.target.form,
            firstnamefield = form.querySelector('#name'),
            lastnamefield = form.querySelector('#surname'),
            accountholderfield = form.querySelector('#account-holder');
        if (!firstnamefield || !lastnamefield || !accountholderfield) { return; }
        accountholderfield.value = firstnamefield.value.trim() + " " +  lastnamefield.value.trim();
    });
})();

/* set pattern, minlength and maxlength for passport number depending on passport type */
(function() {
    var passportPatternHandler = function(ev) {
        var target = ev.target || ev.srcElement;
        if (target.id != "passport-type" && target.id != "paper-no") { return; }
        var form = target.form,
            passporttypefield = form.querySelector('#passport-type'),
            papernofield = form.querySelector('#paper-no');
        if (!passporttypefield || !papernofield) { return; }
        /* detremine pattern and other attributes to set from data attributes referring to the current selection */
        var passporttype = passporttypefield.options[passporttypefield.selectedIndex].getAttribute("data-type").toLowerCase(),
            papernofieldSetPattern = (papernofield.getAttribute("data-pattern-"+passporttype) !== null) ? papernofield.getAttribute("data-pattern-"+passporttype) : papernofield.getAttribute("data-pattern-default"),
            papernofieldSetMinlength = (papernofield.getAttribute("data-minlength-"+passporttype) !== null) ? papernofield.getAttribute("data-minlength-"+passporttype) : papernofield.getAttribute("data-minlength-default"),
            papernofieldSetMaxlength = (papernofield.getAttribute("data-maxlength-"+passporttype) !== null) ? papernofield.getAttribute("data-maxlength-"+passporttype) : papernofield.getAttribute("data-maxlength-default");
        /* set (or remove) attributes */
        (papernofieldSetPattern) ? papernofield.setAttribute("pattern", papernofieldSetPattern) : papernofield.removeAttribute("pattern");
        (papernofieldSetMinlength) ? papernofield.setAttribute("minlength", papernofieldSetMinlength) : papernofield.removeAttribute("minlength");
        (papernofieldSetMaxlength) ? papernofield.setAttribute("maxlength", papernofieldSetMaxlength) : papernofield.removeAttribute("maxlength");
        /* directly trigger validation of the input by field blur? */
        if (target.id == "passport-type" && ev.type == "change" && papernofield.value != "") {
            var blur = document.createEvent('CustomEvent');
            blur.initCustomEvent('blur', true, true, {});
            papernofield.dispatchEvent(blur);
        }
        return;
    };
    document.addEventListener('change', passportPatternHandler);
    document.addEventListener('keypress', passportPatternHandler);
})();
/* basic street suggest */
document.addEventListener('suggest.get', function(ev) {
    var list = ev.detail.list,
        url;
    if (ev.target.value.length < 2 || !list || !list.getAttribute
        || !(url = list.getAttribute('data-street-suggest-url'))) { return; }
    var data = {
        value: ev.target.value,
        // replace umlaute to avoid encoding problems
        street: ev.target.value.replace(/[äöü]/gi, function(umlaut) {
            return ({'ä': 'ae', 'ö': 'oe', 'ü': 'ue'})[umlaut.toLowerCase()] || '';
        }),
        houseno: (ev.target.form.querySelector('#street-no') || {'value': ''}).value,
        zipcode: (ev.target.form.querySelector('#postcode') || {'value': ''}).value,
        city: (ev.target.form.querySelector('#location') || {'value': ''}).value
    };
    if (data.zipcode.length < 5) { return; }
    xhr = new XMLHttpRequest();
    xhr.open('GET', url.replace(/\[(\w+)\]/g, function(_, id) { return data[id] || ''; }), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4 || xhr.status != 200 || !xhr.responseText) { return; }
        var streets = xhr.responseText.slice(0, -1).split('|'),
            html = document.createDocumentFragment ? document.createDocumentFragment() : document.createElement('div');
        for (var s = 0, l = streets.length; s < l && s < 5; s++) {
            var li = document.createElement('li');
            li.setAttribute('data-suggest-value', streets[s]);
            li.appendChild(document.createTextNode(streets[s]));
            li.innerHTML = li.innerHTML.replace(new RegExp('(' + data.value.replace(/[^\w\.\-]+/g, '').replace(/\-/g, '\\-') + ')', 'i'), '<b>$1</b>');
            html.appendChild(li);
        }
        if (document.createDocumentFragment) {
            list.innerHTML = '';
            list.appendChild(html);
        } else {
            list.innerHTML = html.innerHTML;
        }
    }
    xhr.send();
    ev.preventDefault();
});
/** Custom-Event: Validation for invalid select options */
document.addEventListener('validate.selectoption', function(ev) {
    var form = (ev.target || {}).form;
    if (!form) { return; }
    if (!/select/i.test(ev.target.type)) { return; }
    if ("disabled" in ev.target && ev.target.disabled) { return; }
    var msg = "",
        msgMissingValue = (ev.target.hasAttribute("data-valueMissing-message")) ? ev.target.getAttribute("data-valueMissing-message") : "Bitte treffen Sie eine Auswahl";
    if (!ev.target.value || ev.target.value === "-1") {
        msg = msgMissingValue;
    }
    ev.target.setCustomValidity(msg);
    ev.detail.done();
});
/* append query-paremters specified in the original url with "#" separator to the hero button urls with standard "?" separator */
(function() {
    var domLoadHandler = function() {
        var appendQueryToElements = document.querySelectorAll(".continuation-link"),
            queryParams = UrlHelper.getQueryParams("#");
        queryParam = new Array();

        for (var i = queryParams.length - 1; i >= 0; i--) {
            if(queryParams[i].key == 'mc') {
                (queryParams[i]) ? queryParams[i].value = queryParams[i].value.split('?')[0] : null;
                queryParam[0] = queryParams[i];
            }
        }
        /* iterate over all further-going links and append extracted query parameters */
        for (var i = 0; i < appendQueryToElements.length; i++) {
            appendQueryToElements[i].setAttribute("href", UrlHelper.buildQueryString(queryParam, "?", appendQueryToElements[i].getAttribute("href")));
        }
    };
    document.addEventListener('DOMContentLoaded', domLoadHandler);
})();

// if the URL contains d-net, show all dnet offers and contents
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var secondaryTariff = document.querySelector("#tariff-slider > span:last-child");
        if (secondaryTariff && /allnet\/dnetz/i.test(window.location.href) && /^d-/i.test(secondaryTariff.textContent)) {
            secondaryTariff.click();
        }
    });
})();
/**
 * Checkkordeon - Twins
 */
(function() {
    var akkordeon, i,
    moveErrorTop = function(el) {
        if (!el || !/(^|\s)akkordeon(\s|$)/g.test(el.className)) { return; }
        var summary = el.querySelector('.summary'),
        checkbox = el.querySelector('.checkbox.field.error'),
        error = el.querySelector('.checkbox.field.error + .error.message');
        error && el.classList.add('error');
        summary && checkbox && error && summary.insertBefore(error, checkbox);
    },
    freeze = function() {
        if (!arguments.length) { return; }
        for (i = 0; i < arguments.length; i++) {
            akkordeon = arguments[i].parentNode;
            while (akkordeon && !/(^|\s)akkordeon(\s|$)/g.test(akkordeon.className)) {
                akkordeon = akkordeon.parentNode;
            }
            if (akkordeon && !/(^|\s)disabled(\s|$)/g.test(akkordeon.className)) {
                akkordeon.classList.add('disabled');
                akkordeon.classList.add('open');
                akkordeon.setAttribute('open', true);
                moveErrorTop(akkordeon);
            }
        }
    },
    thaw = function() {
        if (!arguments.length) { return; }
        for (i = 0; i < arguments.length; i++) {
            akkordeon = arguments[i].parentNode;
            while (akkordeon && !/(^|\s)akkordeon(\s|$)/g.test(akkordeon.className)) {
                akkordeon = akkordeon.parentNode;
            }
            if (akkordeon && /(^|\s)disabled(\s|$)/g.test(akkordeon.className)) {
                akkordeon.classList.remove('disabled');
                akkordeon.classList.remove('open');
                akkordeon.hasAttribute('open') && akkordeon.removeAttribute('open');
            }
        }
    },
    checkbox1, checkbox2,
    changeCheckkordeon = function(ev) {
        if (!ev || !ev.target || !ev.target.hasAttribute('data-twins')) { return; }
        checkbox1 = ev.target;
        checkbox2 = document.querySelector(checkbox1.getAttribute('data-twins'));
        if (checkbox1.checked) {
            !checkbox2.checked && checkbox2.click();
            thaw(checkbox1, checkbox2);
        } else {
            checkbox2.checked && checkbox2.click();
            freeze(checkbox1, checkbox2);
        }
        checkbox2.focus();
        ev.preventDefault && ev.preventDefault();
    },
    moveErrorMessage = function(ev) {
        if (!ev || !ev.target || !ev.target.form || !ev.target.hasAttribute('type')
            || !/(^|\s)submit(\s|$)/i.test(ev.target.getAttribute('type'))) { return; }
        var temp = ev.target.form.querySelector('.akkordeon.disabled');
        if (/ip[ao]d|iphone/i.test(navigator.userAgent)) {
            temp && setTimeout( function() { moveErrorTop(temp); temp.scrollIntoView();}, 100);
        } else {
            temp && setTimeout( function() { moveErrorTop(temp); temp.scrollIntoView();}, 1);
        }
    };
    document.addEventListener('change', changeCheckkordeon);
    document.addEventListener('click', moveErrorMessage);
})();
var Countdown = (function() {
    var splitTimeDiff = function(timeDiff) {
        return {
            days: (timeDiff / 86400 | 0), // 60sec * 60min * 24hrs
            hours: ((timeDiff / 3600 | 0) % 24), // 60sec * 60min * 24hrs
            minutes: ((timeDiff / 60 | 0) % 60), // 60sec % 60min
            seconds: (timeDiff % 60)
        };
    },
    // uncomment for debugging
    /**debugCurrentDate,*/
    toggleTimerTimeout,
    toggleTimer = function toggleTimer(interval, execution) {
        var interval = interval || 500,
            execution = execution || 0,
            now = new Date(),
            currentTime = now.getTime();
        // uncomment for debugging
        /**
        if (debugCurrentDate) {
            now = debugCurrentDate;
            currentTime = now.getTime();
            currentTime += interval * execution; // make sure the debug time keeps running as well
        }
        */
        toggleTimerTimeout = window.setTimeout(function() { toggleTimer(interval, execution+1); }, interval);
        var nodes = document.querySelectorAll('[data-countdown-toggle-target]'); // select all toggle containers
        for (var n = 0; n < nodes.length; n++) {
            var targetTime = new Date(nodes[n].getAttribute('data-countdown-toggle-target')).getTime(), // get target time and convert to timestamp
                currentTimeToTarget = targetTime - currentTime,
                currentTimeToTargetParts = splitTimeDiff(currentTimeToTarget / 1000 | 0);
            var toggles = nodes[n].querySelectorAll('[data-countdown-toggle-name]'); // get associated toggle elements
            /* iterate over associated toggles to decide which one to display */
            var defaultToggleIndex = null,
                showToggleIndex = null,
                showToggleIndexShowFromTime;
            for (var t = 0; t < toggles.length; t++) {
                var toggle = toggles[t];
                /* hide initially */
                toggle.className = toggle.className.replace(new RegExp('(^|\\s)' + 'hidden' + '\\b', 'g'), '') + ' hidden';
                /* calculate time differences and get default */
                var showFromTime = toggle.getAttribute('data-countdown-toggle-from') ? new Date(toggle.getAttribute('data-countdown-toggle-from')).getTime() : null,
                    //showFromTimeTogo = toggle.getAttribute('data-countdown-toggle-togo') ? new Date(toggle.getAttribute('data-countdown-toggle-togo')).getTime() : null,
                    timeToTargetTime = showFromTime !== null ? targetTime - showFromTime : null;
                if (toggle.getAttribute('data-countdown-toggle-default'))
                    defaultToggleIndex = t;
                /* if show-from is not specified as a fixed date but as time to the target time ("togo") - calculate showFromTime by subtracting */
                //if (showFromTime === null && showFromTimeTogo !== null) {
                    /* TODO */
                //}
                /* decide which one to show (closest start time to the target (i.e. latest time), <= start time) */
                if (showFromTime !== null && showFromTime <= currentTime && (showToggleIndex === null || showFromTime > showToggleIndexShowFromTime)) {
                    showToggleIndex = t;
                    showToggleIndexShowFromTime = showFromTime;
                }
            }
            /* show default by interval / fall back to default? */
            if (showToggleIndex !== null && toggles[showToggleIndex].getAttribute('data-countdown-toggle-interval')) {
                var intervalShowDefault = toggles[showToggleIndex].getAttribute('data-countdown-toggle-interval');
                if ((currentTime % (intervalShowDefault * 2)) >= (intervalShowDefault))
                    showToggleIndex = null;
            }
            if (showToggleIndex === null && defaultToggleIndex !== null)
                showToggleIndex = defaultToggleIndex;
            /* perform countdown actions on chosen element */
            if (showToggleIndex !== null) {
                var toggle = toggles[showToggleIndex];
                /* perform set actions: format countdown and set to to specified element */
                var setToElements = toggle.getAttribute('data-countdown-toggle-selector') ? toggle.querySelectorAll(toggle.getAttribute('data-countdown-toggle-selector')) : [],
                    setUnitToElements = toggle.getAttribute('data-countdown-toggle-unit-selector') ? toggle.querySelectorAll(toggle.getAttribute('data-countdown-toggle-unit-selector')) : [],
                    unit = toggle.getAttribute('data-countdown-toggle-unit') ? toggle.getAttribute('data-countdown-toggle-unit') : null,
                    unitSingular = toggle.getAttribute('data-countdown-toggle-unit-singular') ? toggle.getAttribute('data-countdown-toggle-unit-singular') : null,
                    format = toggle.getAttribute('data-countdown-toggle-format') ? toggle.getAttribute('data-countdown-toggle-format') : "HH:MM:SS";
                for (var ei = 0; ei < setToElements.length; ei++) {
                    var setToElement = setToElements[ei],
                        d = currentTimeToTargetParts.days.toString(),
                        h = currentTimeToTargetParts.hours.toString(),
                        m = currentTimeToTargetParts.minutes.toString(),
                        s = currentTimeToTargetParts.seconds.toString(),
                        countdownFormatted = format.replace('DD', d.length == 1 ? "0"+d : d).replace('D', d).replace('HH', h.length == 1 ? "0"+h : h).replace('H', h).replace('MM', m.length == 1 ? "0"+m : m).replace('M', m).replace('SS', s.length == 1 ? "0"+s : s).replace('S', s);
                    setToElement.innerHTML = countdownFormatted;
                }
                /* set and format unit? */
                for (var uei = 0; uei < setUnitToElements.length; uei++) {
                    var setUnitToElement = setUnitToElements[uei];
                    if ((format === "D" || format === "DD") && d === "1" && unitSingular !== null) {
                        setUnitToElement.innerHTML = unitSingular;
                    } else if (unit !== null) {
                        setUnitToElement.innerHTML = unit;
                    }
                }
                /* show it */
                toggle.className = toggle.className.replace(new RegExp('(^|\\s)' + 'hidden' + '\\b', 'g'), '');
            }
        }
    };
    toggleTimer(); // run
    return {
        // uncomment for debugging: allow setting of current date and start timer from there
        /**
        setDebugCurrentDate: function(date) {
            debugCurrentDate = date;
            window.clearTimeout(toggleTimerTimeout);
            toggleTimer();
        }
        */
    };
})();
// Clicked on a reset button in an accordion block-element, the accordion would be closed
(function () {
    var akkordeonResetHandler = function (ev) {
        if (!ev || !ev.target || !ev.target.type || !/reset/i.test(ev.target.type)) { return; }
        var akkordeon = ev.target;
        while (akkordeon && (!akkordeon.className || !/(^|\s)akkordeon(\s|$)/.test(akkordeon.className))) {
            akkordeon = akkordeon.parentNode;
        }
        if (!akkordeon) { return; }
        akkordeon.hasAttribute('open') && akkordeon.removeAttribute('open');
        /(^|\s)open(\s|$)/.test(akkordeon.className) && akkordeon.classList.remove('open');
    };
    document.addEventListener('click', akkordeonResetHandler);
})();
/**
 * Update the image of phones by selecting an option
 */
(function() {
    var selectHandler = function (ev) {
        if (!ev || !ev.target || !ev.target.form || !ev.target.value || !ev.target.nodeName
            || !/^select$/i.test(ev.target.nodeName)) { return; }
        var container = ev.target,
            select = ev.target,
            targetsIMG = [];

        while (!container.classList.contains('teaser') && !/html/i.test(container.nodeName)) {
            container = container.parentNode;
        }
        if (!container || /html/i.test(container.nodeName)) { return; }

        targetsIMG = container.querySelectorAll('.visual img.primary');
        if (targetsIMG.length < 1) { return; }

        var imgSubpath = select.value || '',
            prefix = hrdwrImgPathPrefix || '',
            suffix = hrdwrImgPathSuffix || '';
        for (var i = 0; i < targetsIMG.length; i++) {
            targetsIMG[i].hasAttribute('src') && targetsIMG[i].setAttribute('src', prefix + imgSubpath + suffix);
        }
    };
    document.addEventListener('change', selectHandler, true);
})();

/**
 * Selecting color by default
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        if (!document.querySelector('form select[name="order.accessHardwareItem.articleId"]')) { return; }
        var selects = document.querySelectorAll('form select[name="order.accessHardwareItem.articleId"]'),
            i = 0, len = selects.length;
        while (i < len) {
            for (var j = 0, olen = selects[i].options.length; j < olen; j++) {
                if (/(schwarz|spacegrau)$/i.test(selects[i].options[j].textContent)) {
                    selects[i].selectedIndex = j;
                    if ("createEvent" in document) {
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent("change", false, true);
                        selects[i].dispatchEvent(evt);
                    } else {
                        selects[i].fireEvent("onchange");
                    }
                    break;
                }
            }
            i++;
        }
    });
})();

/**
 * Copy Media Codes for 3cols
 */
(function () {
    var origMediaButtons = document.querySelectorAll('p > a.button[href*="execution"]') || [],
        targetButtons = document.querySelectorAll('.wireframe > .teaser > .content > p > a.button[href$="mediaCodes"]') || [],
        fmHWLinks = document.querySelectorAll('a[href$="netzhwa"]') || [],
        pmHWLinks = document.querySelectorAll('a[href$="netzhwa?pm"]') || [],
        ltePostpaidLink = document.getElementById('lte-postpaid'),
        searchParam = '',
        getParam = function (href, param, def) {
            if (!href || !/\?/g.test(href)) { return; }
            var params = (href.split('?')[1] || '').split('&'), url = { "params": {} };
            for (var i = 0, len = params.length; i < len; i++) {
                var pair = params[i].split('=');
                url.params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }
            return url.params[param] || def || '';
        },
        mediaCodesHandler = function () {
            if (!origMediaButtons || !targetButtons || origMediaButtons.length === 0 || targetButtons.length === 0) { return; }
            searchParam = getParam(origMediaButtons[0].href, 'mc');
            for (var i = 0, len = origMediaButtons.length; i < len; i++) {
                // one original hidden button defines two new buttons with complete href value per column
                targetButtons[i * 2].href = origMediaButtons[i].href;
                targetButtons[i * 2 + 1].href = origMediaButtons[i].href;
                origMediaButtons[i].parentNode.style.display = 'none';
            }
            // add mc to special button, which leads to hardware page
            if (!searchParam) { return; }
            for (var i = 0, len = fmHWLinks.length; i < len; i++) {
                fmHWLinks[i].href = fmHWLinks[i].href + '?mc=' + searchParam;
            }
            for (var i = 0, len = pmHWLinks.length; i < len; i++) {
                pmHWLinks[i].href = pmHWLinks[i].href + '&mc=' + searchParam;
            }
            // add mc to LTE-Tarife button on the special D-Netz page that leads to again special Postpaid page, see DPC-1286
            if (ltePostpaidLink) {
                ltePostpaidLink.href = ltePostpaidLink.href + '?mc=' + searchParam;
            }
        };
    document.addEventListener('DOMContentLoaded', mediaCodesHandler);
})();

// for component switch-3.json highlight clicked, currently selected button; technicaly - toggle css class .ghost
(function () {
    var highlightSelectedSwitchButton = function (ev) {
        if (!ev || !ev.target || !ev.type || !/click/i.test(ev.type)) { return; }
        var switchButton = (/(^|\s)button(\s|$)/.test(ev.target.className)) ? ev.target : ev.target.parentNode;
        if (!switchButton || !switchButton.parentNode || !switchButton.parentNode.parentNode || (switchButton.parentNode.parentNode.id !== "tariff-switcher") || !/(^|\s)button(\s|$)/.test(switchButton.className)) { return }
        var switchButtonsGroup = document.getElementById("tariff-switcher"),
            switchButtons = switchButtonsGroup.getElementsByClassName("button");

        if (!switchButtons) { return };

        for (var i = 0; i < switchButtons.length; i++) {
            if (!/(^|\s)ghost(\s|$)/.test(switchButtons[i].className)) {
                switchButtons[i].classList.add("ghost");
            }
        }
        /(^|\s)ghost(\s|$)/.test(switchButton.className) && switchButton.classList.remove("ghost");
    },
    selectNetColumn = function () {
        var urlParams = document.location.search;
        if (!urlParams || !(urlParams.indexOf("tariff") > -1)) { return; }

        var params = urlParams.split("&"),
            tariffParam;

        for (var i = 0; i < params.length; i++) {
            if (params[i].indexOf("tariff") > -1) {
                tariffParam = params[i];
            }
        }
        if (!tariffParam) { return; }

        tariffParam = tariffParam.split("=")[1];

        if (document.getElementById(tariffParam + "-button")) {
            document.getElementById(tariffParam + "-button").click();
        }
    };

    // not in use currently, look in DPC-1084
    // document.addEventListener('DOMContentLoaded', selectNetColumn);
    document.addEventListener('click', highlightSelectedSwitchButton);

})();


; (function() {
    // Singleton
    var ShopManager = new function() {
        var self = this,
            Checkpoint_M3 = false,
            tariffInfo,
            // NOTE: If the structure of HTML block has been changed, the following configurations need to be updated
            config = {
                offerIdEl: '[data-hws-hidden-field="offer-id"]',
                productDataAttr: 'data-hws-device',
                tariffDataAttr: 'data-hws-tariff',
                product: {
                    colorAttr: 'data-hws-device-property-color',
                    memoryAttr: 'data-hws-device-property-memory',
                    imageEl: '.container.l-12.fix .container.l-4.fix:nth-of-type(2) img',
                    colorTextEl: '.container.l-12.fix .container.l-4.fix:nth-of-type(2) img + p',
                    techEl: '.akkordeon.unborder > .akkordeon-content'
                },
                tariff: {
                    netProviderAttr: 'data-hws-tariff-provider',
                    bulletEl: 'ul.check.list',
                    imageEl: '.container.l-12.fix .container.l-4.fix:nth-of-type(3) img',
                },
                price: {
                    monthlyAttr: 'data-hws-tariff-price-monthly',
                    onetimeAttr: 'data-hws-tariff-price-onetime'
                },
                ctaEl: 'a.key.button'
            },
            // Bonus: ideal structure, begins with net provider e.g.:
            iData = {};

        this.init = function() {
            if (!document.querySelector('[' + config.tariffDataAttr + ']') || !document.querySelector('[' + config.productDataAttr + ']')) { return; }
            var tariffAttr = document.querySelector('[' + config.tariffDataAttr + ']').getAttribute(config.tariffDataAttr),  // init tariff details
                products = document.querySelectorAll('[' + config.productDataAttr + ']');  // init product information for each hardware block
            tariffInfo = getTariffInfo(tariffAttr);
            if (!tariffInfo) { return; }
            // INIT
            Checkpoint_M3 = true;
            for (var i = 0, l = products.length; i < l; i++) {
                manipulateProduct(products[i]);
            }
            console.log('Tariffs: ', tariffInfo);
        };
        this.changeNetprovider = function() {
            if (!Checkpoint_M3) { return; }
            var products = document.querySelectorAll('form[' + config.productDataAttr + ']');
            for (var i = 0, l = products.length; i < l; i++) {
                self.changeSingleHardware(products[i]);
            }
        };
        this.changeSingleHardware = function(option) {
            if (!Checkpoint_M3) { return; }
            var form = option.form || option, productInfo;
            try {
                productInfo = JSON.parse(form.getAttribute(config.productDataAttr));
            } catch (error) {
                document.write('ERROR: by getting this product information\n', option.outerHTML);
                console.log(error);
                return null;
            }
            // change color
            if (option.hasAttribute(config.product.colorAttr)) { updateHardwareInfo(option, form, productInfo); }
            // change tariff
            if (option.hasAttribute(config.productDataAttr)) { updateNetInfo(form, productInfo); }
            // update general combined block information based on TARIFF, COLOR and MEMORY
            updateBusinessInformation(form, productInfo);
        };

        function getTariffInfo(tariffAttr) {
            var data;
            try {
                data = JSON.parse(decodeURIComponent(tariffAttr)).tariffs || undefined;
            } catch (error) {
                document.write('ERROR: by getting tariff information');
                console.log(error);
                return null;
            }
            if (!data || !Array.isArray(data) || data.length < 1) { return false; }
            document.querySelector('body > .grid').setAttribute(config.tariffDataAttr, JSON.stringify(data));
            return data;
        }
        /**
         * GET and Manipulate Objects
         *
         * Based on the official data structure, the relations will bound in to property "combinations" of hardware object:
         * - relations/dependences between color and memory of one hardware
         * - relations/dependences between one variant of hardware (defined by one color&memory pair) and corresponding tariff information
         * @param {HTMLObjectElement} root HTML block of one hardware
         */
        function manipulateProduct(root) {
            // var hardware = DEVICEDATA;
            var hardware;
            try {
                hardware = JSON.parse(decodeURIComponent(root.getAttribute(config.productDataAttr)));
            } catch (error) {
                document.write('ERROR: by getting this product information\n', root.outerHTML);
                console.log(error);
                return null;
            }
            if (typeof hardware !== 'object' || !hardware.variants) { return; }
            var combi = {
                color: {},
                memory: {},
                net_provider: {}
            };
            // Iterating variants of a hardware
            for (var i = 0, l = hardware.variants.length; i < l; i++) {
                // for combination of color and memory
                if (!hardware.variants[i].properties) { continue; }
                var objProperties = hardware.variants[i].properties, keys = Object.keys(objProperties);
                // Iterating variable properties of one concrete variant
                for (var prop in objProperties) {
                    if (!combi[prop]) { combi[prop] = {}; }
                    // save all other variable properties in an array to the founded property
                    keys.forEach(function(key) {
                        if (key != prop) {
                            if (!combi[prop].hasOwnProperty(objProperties[prop].id)) {
                                combi[prop][objProperties[prop].id] = {};
                            }
                            if (!combi[prop][objProperties[prop].id].hasOwnProperty(key)) {
                                combi[prop][objProperties[prop].id][key] = [];
                            }
                            combi[prop][objProperties[prop].id][key].push(objProperties[key].id);
                        }
                    });
                }
            }
            // Insert Tariff information
            if (!tariffInfo) { console.log('\n404 - Not Found: general information of tariffs.\n\n'); return; }
            // Iterating variants of a hardware
            for (var x = 0, y = hardware.variants.length; x < y; x++) {
                var tariffCombis = hardware.variants[x].tariff_combinations || [];
                if (!Array.isArray(tariffCombis) || tariffCombis.length < 1) { console.log('\n404 - Not Found: Combined Information of tariff and hardware.\n\n'); return; }
                for (var i = 0, l = tariffCombis.length; i < l; i++) {
                    for (var j = 0, len = tariffInfo.length; j < len; j++) {
                        if (tariffCombis[i].tariff_group_id == tariffInfo[j].id) {
                            for (var k = 0, leng = tariffInfo[j].surcharge_variants.length; k < leng; k++) {
                                if (!tariffInfo[j].surcharge_variants[k].sim_only && tariffCombis[i].surcharge_variant_id == tariffInfo[j].surcharge_variants[k].id) {
                                    // Insert tariff conbination detail (e.g. monthly price) to each hardware based on the general tariff object
                                    if (tariffInfo[j].surcharge_variants[k].paymailer_goodie) {
                                        tariffCombis[i].paymailer_goodie = {
                                            id: tariffInfo[j].surcharge_variants[k].paymailer_goodie.id,
                                            starting_balance: tariffInfo[j].surcharge_variants[k].paymailer_goodie.starting_balance,
                                            headline_label: tariffInfo[j].surcharge_variants[k].paymailer_goodie.headline_label,
                                            subline_label: tariffInfo[j].surcharge_variants[k].paymailer_goodie.subline_label,
                                        };
                                    }
                                    if(tariffInfo[j].surcharge_variants[k].monthly_price != undefined) {
                                        tariffCombis[i].monthly_price = tariffInfo[j].surcharge_variants[k].monthly_price;
                                    }
                                    tariffCombis[i].net_provider = tariffInfo[j].net_provider;
                                    tariffCombis[i].net_label = tariffInfo[j].label;
                                    tariffCombis[i].net_id = tariffInfo[j].id;

                                    // Record the availabilities of net provider/capacity for each hardware (in the level of one hardware, not the different variants of one hardware)
                                    // - by changing net provider, the property will be checked for rendering the net capacity/label
                                    if (!combi.net_provider.hasOwnProperty(tariffInfo[j].net_provider)) { combi.net_provider[tariffInfo[j].net_provider] = {}; }
                                    if (!combi.net_provider[tariffInfo[j].net_provider].hasOwnProperty(tariffInfo[j].id)) {
                                        combi.net_provider[tariffInfo[j].net_provider][tariffInfo[j].id] = tariffInfo[j].label;
                                    }

                                    // Bonus:
                                    // Record the availabilities of hardware for each tariff group (in the level of one hardware, not the differnt variants of one hardware)
                                    // - identify all available hardwares for each net provider
                                    if (!tariffInfo[j].hasOwnProperty('hardwares')) { tariffInfo[j]['hardwares'] = []; }
                                    if (tariffInfo[j].hardwares.indexOf(hardware.id) < 0) {
                                        tariffInfo[j].hardwares.push(hardware.id);
                                    }

                                    // Bonus x More: iData
                                    // Record the availabilities of net provider/capacity for each variant of each hardware
                                    if (!iData.hasOwnProperty(tariffInfo[j].net_provider)) { iData[tariffInfo[j].net_provider] = {}; }
                                    if (!iData[tariffInfo[j].net_provider].hasOwnProperty(hardware.id)) { iData[tariffInfo[j].net_provider][hardware.id] = {}; }
                                    var xId = hardware.variants[x].id.replace(/(\s|-)/g, '_');
                                    if (!iData[tariffInfo[j].net_provider][hardware.id].hasOwnProperty(xId)) { iData[tariffInfo[j].net_provider][hardware.id][xId] = {}; }
                                    if (!iData[tariffInfo[j].net_provider][hardware.id][xId].hasOwnProperty(tariffInfo[j].id)) {
                                        iData[tariffInfo[j].net_provider][hardware.id][xId][tariffInfo[j].id] = tariffInfo[j].label;
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
            }
            hardware["combinations"] = combi;
            console.log("Hardware: ", hardware);
            console.log("iData: ", iData);
            root.setAttribute(config.productDataAttr, JSON.stringify(hardware));
        }
        function getCurrentTariffProvider() {
            return document.querySelector('[' + config.tariff.netProviderAttr + ']:not(.ghost)').getAttribute(config.tariff.netProviderAttr);
        }
        function getCurrentTariffOption(form) {
            return form.querySelector('select').value;
        }
        /**
         * Changing Color: will change memory options, hardware image, color text (and tariffs if necessary)
         * @param {HTMLObjectElement} option the HTML element of color
         * @param {HTMLObjectElement} form the HTML element of current product, which contains its HTML structure
         * @param {Object} productInfo the object of current product, which contains its JSON-Info structure
         */
        function updateHardwareInfo(option, form, productInfo) {
            var property = option.getAttribute(config.product.colorAttr),  // clicked color
                posibles = form.querySelectorAll('.field input[' + config.product.memoryAttr + ']'),  // normal feasible memories
                availables = productInfo.combinations.color[property].memory;  // color-corresponded feasible memories
            // DISABLE unexisting memory
            for (var i = 0, l = posibles.length; i < l; i++) {
                !posibles[i].hasAttribute('disabled') && posibles[i].setAttribute('disabled', 'disabled');
                for (var j = 0, len = availables.length; j < len; j++) {
                    if (posibles[i].getAttribute(config.product.memoryAttr) == availables[j]) {
                        posibles[i].hasAttribute('disabled') && posibles[i].removeAttribute('disabled');
                        availables.splice(j, 1);
                        break;
                    }
                }
            }
            // Automatical sellecting when memory not allowed according to color
            var checkedRadioInHiddenField = form.querySelector('.fieldset.memory .field input[' + config.product.memoryAttr + '][disabled]:checked');
            if (checkedRadioInHiddenField) {
                checkedRadioInHiddenField.removeAttribute('checked');
                form.querySelector('.fieldset.memory .field input[' + config.product.memoryAttr + ']:not([disabled])').checked = true;
                form.querySelector('.fieldset.memory .field input[' + config.product.memoryAttr + ']:not([disabled])').setAttribute('checked', 'checked');
            }
        }
        /**
         * Update label of net capacity for one hardwares after changed net provider
         * - NOTE: the data needs be herefore garanteed from BoSu, that all variants of one hardware has to be available for all same tariff (e.g. available for Allnet LTE 1/2/3GB & D-Net 1/2GB & E-Net 2/3GB)
         * @param {HTMLObjectElement} form
         * @param {Object} productInfo
         */
        function updateNetInfo(form, productInfo) {
            var currentTariffProvider = getCurrentTariffProvider(),
                tariffOptions = productInfo.combinations.net_provider[currentTariffProvider],
                selEl = form.querySelector('select'),
                div = document.createElement('div'),
                newOption;
            // static select element
            for (var prop in tariffOptions) {
                newOption = document.createElement('option');
                newOption.value = prop;
                newOption.textContent = '+ ' + tariffOptions[prop];
                div.appendChild(newOption);
            }
            selEl.innerHTML = div.innerHTML;

            // // pure text for one option & select element for more options
            // if (tariffLabels.length < 2) {
            //     newOption = document.createElement('h3');
            //     newOption.className = 'tariff-capacity script size-4';
            //     newOption.textContent = '+ ' + tariffLabels[0];
            //     selEl.parentNode.insertBefore(newOption, selEl);
            //     selEl.outerHTML = '';
            // } else {
            //     newOption = form.querySelector('.tariff-capacity.script');
            //     if (newOption) { newOption.outerHTML = ''; }
            //     for (var i = 0, l = tariffLabels.length; i < l; i++) {
            //         newOption = document.createElement('option');
            //         newOption.textContent = '+ ' + tariffLabels[i];
            //         div.appendChild(newOption);
            //     }
            //     selEl.innerHTML = div.innerHTML;
            // }
        }
        /**
         * Based on all selected options, whole concreate information of one product block will be updated
         * @param {HTMLObjectElement} form the HTML element of current product, which contains its HTML structure
         * @param {Object} productInfo the object of current product, which contains its JSON-Info structure
         */
        function updateBusinessInformation(form, productInfo) {
            // preparing
            var checkedColor = form.querySelector('.fieldset.color input:checked'),
                checkedMemo = form.querySelector('.fieldset.memory input:checked'),
                targetEl = {
                    imageEl: form.querySelector(config.product.imageEl) || {},
                    colorEl: form.querySelector(config.product.colorTextEl) || {},
                    techEl: form.querySelector(config.product.techEl) || {},
                },
                goodie = {
                    id: '',
                    starting_balance: '',
                    headline_label: '',
                    subline_label: ''
                },
                currentTariffProvider = getCurrentTariffProvider(),
                currentTariffId = getCurrentTariffOption(form);
            // Update the hardware image, color text, price, CTA and product details
            for (var i = 0, l = productInfo.variants.length; i < l; i++) {
                if (checkedColor && productInfo.variants[i].properties.color.id == checkedColor.getAttribute(config.product.colorAttr)
                    && checkedMemo && productInfo.variants[i].properties.memory.id == checkedMemo.getAttribute(config.product.memoryAttr)) {
                    // hardware image
                    targetEl.imageEl.setAttribute('src', productInfo.variants[i].image_urls.portal_default220w);
                    // color text
                    targetEl.colorEl.textContent = productInfo.variants[i].properties.color.label;
                    // product details
                    var techDetails = productInfo.variants[i].product_details ? productInfo.variants[i].product_details.technical_details || null : null,
                        newDiv = document.createElement('div');
                    if (!techDetails) { console.log('\n404 - NOT FOUND: Product details.\n\n'); return; }
                    for (var j = 0, len = techDetails.length; j < len; j++) {
                        var newH4 = document.createElement('h4'),
                            newUl = document.createElement('ul'),
                            newFn = document.createElement('p');
                        newFn.className = 'note text';
                        newUl.className = 'list s';
                        if (techDetails[j].id) { newH4.id = techDetails[j].id; }
                        if (techDetails[j].label) { newH4.textContent = techDetails[j].label; newDiv.appendChild(newH4); }
                        if (techDetails[j].values && techDetails[j].values.length > 0) {
                            techDetails[j].values.forEach(function(value) {
                                var newLi = document.createElement('li');
                                newLi.textContent = value;
                                newUl.appendChild(newLi);
                            });
                            newDiv.appendChild(newUl);
                        }
                        if (techDetails[j].footnote) { newFn.textContent = techDetails[j].footnote; newDiv.appendChild(newFn); }
                    }
                    targetEl.techEl.innerHTML = newDiv.innerHTML;
                    // monthly price, one time price & url of CTA (List item for Paymail Goodie comes here)
                    var tariffCombiniations = productInfo.variants[i].tariff_combinations,
                        j = 0, len = 0;
                    if (!tariffCombiniations) { console.log('\n404 - NOT FOUND: Tariff combinations.\n\n'); return; }
                    for (j = 0, len = tariffCombiniations.length; j < len; j++) {
                        if (tariffCombiniations[j].tariff_group_id == currentTariffId) {
                            var priceEl = {};
                            // monthly
                            if (!tariffCombiniations[j].monthly_price) { console.log('\n404 - Not Found: Monthly Price. (sim only?)'); return; }
                            tariffCombiniations[j].monthly_price.replace(/^(\d+)\.(\d+)$/, function(match, prefix, suffix) {
                                priceEl = form.querySelector('[' + config.price.monthlyAttr + ']');
                                priceEl.setAttribute(config.price.monthlyAttr, match);
                                priceEl.querySelector('span').textContent = prefix;
                                priceEl.querySelector('sup').textContent = suffix;
                            });
                            // one time
                            priceEl = form.querySelector('[' + config.price.onetimeAttr + ']');
                            priceEl.setAttribute(config.price.onetimeAttr, tariffCombiniations[j].one_time_price);
                            priceEl.textContent = tariffCombiniations[j].one_time_price.replace('.', ',');
                            // CTA
                            form.querySelector(config.ctaEl).setAttribute('href', tariffCombiniations[j].shop_checkout_url);
                            // SET offer_id
                            form.querySelector(config.offerIdEl).value = tariffCombiniations[j].offer_id || '';
                            // Paymailer Goodie
                            if (tariffCombiniations[j].paymailer_goodie) {
                                goodie.id = tariffCombiniations[j].paymailer_goodie.id || '';
                                goodie.starting_balance = tariffCombiniations[j].paymailer_goodie.starting_balance || '';
                                goodie.headline_label = tariffCombiniations[j].paymailer_goodie.headline_label || '';
                                goodie.subline_label = tariffCombiniations[j].paymailer_goodie.subline_label || '';
                            }
                            break;
                        }
                    }
                    break;
                }
            }
            // Tariff info
            for (var i = 0, l = tariffInfo.length; i < l; i++) {
                if (tariffInfo[i].net_provider != currentTariffProvider || tariffInfo[i].id != currentTariffId) { continue; }
                if (!tariffInfo[i].bullet_points || !tariffInfo[i].tariff_details_page_url || !tariffInfo[i].product_information_sheet_url) {
                    console.log('\n404 - NOT FOUND: tariff information\n\n'); return;
                }
                // Net image
                form.querySelector(config.tariff.imageEl).setAttribute('src', tariffInfo[i].sim_image_url);
                // Bullets (Paymail item comes before by checking the price)
                if (tariffInfo[i].bullet_points.length > 0) {
                    var div = document.createElement('div'), newLi, newP, newA;
                    for (var j = 0, len = tariffInfo[i].bullet_points.length; j < len; j++) {
                        newLi = document.createElement('li');
                        newP = document.createElement('p');
                        newP.textContent = tariffInfo[i].bullet_points[j].subline_label;
                        newLi.textContent = tariffInfo[i].bullet_points[j].headline_label;
                        newLi.className = 'size-3';
                        newLi.appendChild(newP);
                        div.appendChild(newLi);
                    }
                    if (goodie.id) {
                        console.log(tariffInfo[i].id);
                        newLi = document.createElement('li');
                        newLi.setAttribute('data-qa', tariffInfo[i].id + '-goodie');
                        newP = document.createElement('p');
                        newP.textContent = goodie.subline_label;
                        newLi.textContent = goodie.starting_balance + ' ' + goodie.headline_label;
                        newLi.className = 'size-3';
                        newLi.appendChild(newP);
                        div.appendChild(newLi);
                    }
                    // Link: tariff detail
                    newP = document.createElement('p');
                    newA = document.createElement('a');
                    newA.textContent = 'Tarifdetails';
                    newA.setAttribute('href', tariffInfo[i].tariff_details_page_url);
                    newA.setAttribute('target', '_blank');
                    newP.appendChild(newA);
                    newP.className = 'vspace-xl s-vspace-xs';
                    div.lastElementChild.appendChild(newP);
                    // Link: Product information page
                    newP = document.createElement('p');
                    newA = document.createElement('a');
                    newA.textContent = 'Produktinformationsblatt';
                    newA.setAttribute('href', tariffInfo[i].product_information_sheet_url);
                    newA.setAttribute('target', '_blank');
                    newP.appendChild(newA);
                    div.lastElementChild.appendChild(newP);
                    // Link: Product news
                    if (/(http|https|ftp)/ig.test(productInfo.press_report_url)) {
                        newP = document.createElement('p');
                        newA = document.createElement('a');
                        newA.textContent = 'Pressebericht';
                        newA.setAttribute('href', productInfo.press_report_url);
                        newA.setAttribute('target', '_blank');
                        newP.appendChild(newA);
                        div.lastElementChild.appendChild(newP);
                    }
                }
                form.querySelector(config.tariff.bulletEl).innerHTML = div.innerHTML;
            }
        }
    };
    document.addEventListener('DOMContentLoaded', function() {
        // console.log('INIT');
        ShopManager.init();
    });
    document.addEventListener('change', function(ev) {
        if (!ev || !ev.target || !ev.target.form || !ev.target.form.hasAttribute('data-hws-device')) { return; }
        // console.log('CHANGE ONE BLOCK');
        ShopManager.changeSingleHardware(ev.target);
    });
    // changing net-provider -> update business information for all hardwares
    document.addEventListener('click', function(ev) {
        if (!ev || !ev.target || /html/i.test(ev.target.nodeName)
            || !document.querySelector('.grid[data-hws-tariff]') || !document.querySelector('form[data-hws-device]')) { return; }
        var target = ev.target.hasAttribute('data-hws-tariff-provider') ? ev.target : ev.target.parentNode;
        if (!target.hasAttribute('data-hws-tariff-provider')) { return; }
        ShopManager.changeNetprovider();
    });
})();

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

// Browsers on Windows 7 lead the "tel:" to 404
if (/Windows NT 6.1/.test(navigator.userAgent)) {
    document.addEventListener('click', function(ev) {
        var target = ev.target;
        if (!target || !target.protocol || target.protocol !== 'tel:') { return; }
        ev.preventDefault && ev.preventDefault();
    });
}

// Hotfix: BUG-3457
(function () {
    document.addEventListener('click', function (ev) {
        if (!ev || !ev.target || !ev.target.hasAttribute('href')) { return; }
        var target = ev.target,
            labels = document.querySelectorAll('.checkbox.field label[data-toggle-nodes]');
        if (labels.length < 1) { return; }
        for (var i = 0, len = labels.length; i < len; i++) {
            if (!labels[i].querySelector('[href="' + target.href + '"]')) { continue; }
            var input = document.getElementById(labels[i].htmlFor);
            input.checked ? (input.checked = false) : (input.checked = true);
        }
    });
})();

var CAT_MODULES_VERSIONS = CAT_MODULES_VERSIONS || {"project":"allnet - DPC-1736","catModules":[{"akkordeon":"1.4.5"},{"backdrop":"1.1.4"},{"button":"2.0.1"},{"carousel":"2.0.0"},{"font":"3.0.0"},{"footer":"1.0.2"},{"freehtml":"1.0.2"},{"grid":"3.0.1"},{"header":"3.0.1"},{"icon":"3.0.1"},{"image":"1.0.1"},{"label":"1.0.2"},{"layer":"1.1.1"},{"list":"2.0.1"},{"message":"2.0.0"},{"navigation":"4.0.0"},{"page":"2.0.0"},{"paragraph":"1.1.1"},{"progress":"1.1.0"},{"showhidetoggle":"1.0.4"},{"spacer":"1.0.1"},{"spoiler":"3.0.0"},{"suggest":"1.1.2"},{"theme":"4.0.2"},{"vspace":"1.0.1"},{"form":"(LOCAL)"},{"headline":"(LOCAL)"},{"table":"(LOCAL)"},{"teaser":"(LOCAL)"},{"urlhelper":"(LOCAL)"}]};
