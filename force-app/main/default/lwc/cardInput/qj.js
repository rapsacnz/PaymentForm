/* eslint-disable no-unused-vars */
/* eslint-disable @lwc/lwc/no-inner-html */
/* eslint-disable no-shadow */
/* eslint-disable no-void */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-else-return */
/* eslint-disable @lwc/lwc/no-document-query */
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var QJ = function(selector, context) {
  if (QJ.isDOMElement(selector)) {
    return selector;
  }
  return context.template.querySelectorAll(selector);
  //return document.querySelectorAll(selector);
};

QJ.isDOMElement = el => el && el.nodeName != null;

const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
QJ.trim = function(text) {
  if (text === null) {
    return "";
  } else {
    return (text + "").replace(rtrim, "");
  }
};
const rreturn = /\r/g;
QJ.val = function(el, val) {
  if (arguments.length > 1) {
    return (el.value = val);
  } else {
    const ret = el.value;
    if (typeof ret === "string") {
      return ret.replace(rreturn, "");
    } else {
      if (ret === null) {
        return "";
      } else {
        return ret;
      }
    }
  }
};

QJ.preventDefault = function(eventObject) {
  if (typeof eventObject.preventDefault === "function") {
    eventObject.preventDefault();
    return;
  }
  eventObject.returnValue = false;
  return false;
};

QJ.normalizeEvent = function(e) {
  const original = e;
  e = {
    which: original.which != null ? original.which : undefined,
    // Fallback to srcElement for ie8 support
    target: original.target || original.srcElement,
    preventDefault() {
      return QJ.preventDefault(original);
    },
    originalEvent: original,
    data: original.data || original.detail
  };

  if (e.which == null) {
    e.which = original.charCode != null ? original.charCode : original.keyCode;
  }
  return e;
};

QJ.on = function(element, eventName, callback) {
  if (element.length) {
    // handle multiple elements
    for (let el of Array.from(element)) {
      QJ.on(el, eventName, callback);
    }
    return;
  }

  if (eventName.match(" ")) {
    // handle multiple event attachment
    for (let multEventName of Array.from(eventName.split(" "))) {
      QJ.on(element, multEventName, callback);
    }
    return;
  }

  const originalCallback = callback;
  callback = function(e) {
    e = QJ.normalizeEvent(e);
    return originalCallback(e);
  };

  if (element.addEventListener) {
    return element.addEventListener(eventName, callback, false);
  }

  if (element.attachEvent) {
    eventName = `on${eventName}`;
    return element.attachEvent(eventName, callback);
  }

  element[`on${eventName}`] = callback;
};

QJ.addClass = function(el, className) {
  if (el.length) {
    return Array.from(el).map(e => QJ.addClass(e, className));
  }

  if (el.classList) {
    return el.classList.add(className);
  } else {
    return (el.className += ` ${className}`);
  }
};
QJ.hasClass = function(el, className) {
  if (el.length) {
    let hasClass = true;
    for (let e of Array.from(el)) {
      hasClass = hasClass && QJ.hasClass(e, className);
    }
    return hasClass;
  }

  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp(`(^| )${className}( |$)`, "gi").test(el.className);
  }
};
QJ.removeClass = function(el, className) {
  if (el.length) {
    return Array.from(el).map(e => QJ.removeClass(e, className));
  }

  if (el.classList) {
    return Array.from(className.split(" ")).map(cls => el.classList.remove(cls));
  } else {
    return (el.className = el.className.replace(
      new RegExp(`(^|\\b)${className.split(" ").join("|")}(\\b|$)`, "gi"),
      " "
    ));
  }
};
QJ.toggleClass = function(el, className, bool) {
  if (el.length) {
    return Array.from(el).map(e => QJ.toggleClass(e, className, bool));
  }

  if (bool) {
    if (!QJ.hasClass(el, className)) {
      return QJ.addClass(el, className);
    }
  } else {
    return QJ.removeClass(el, className);
  }
};

QJ.append = function(el, toAppend) {
  if (el.length) {
    return Array.from(el).map(e => QJ.append(e, toAppend));
  }

  return el.insertAdjacentHTML("beforeend", toAppend);
};

QJ.find = function(el, selector) {
  // can only have one scope
  if (el instanceof NodeList || el instanceof Array) {
    el = el[0];
  }
  return el.querySelectorAll(selector);
};

QJ.trigger = function(el, name, data) {
  let ev;
  try {
    ev = new CustomEvent(name, { detail: data });
  } catch (e) {
    ev = document.createEvent("CustomEvent");
    // jsdom doesn't have initCustomEvent, so we need this check for
    // testing
    if (ev.initCustomEvent) {
      ev.initCustomEvent(name, true, true, data);
    } else {
      ev.initEvent(name, true, true, data);
    }
  }

  return el.dispatchEvent(ev);
};

export { QJ };