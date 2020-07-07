/* eslint-disable no-cond-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-empty */
/* eslint-disable no-sequences */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-expressions */
/* eslint-disable @lwc/lwc/no-async-operation */
/* eslint-disable consistent-return */
/* eslint-disable vars-on-top */
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
 * DS103: Rewrite code to no longer use __guard__
 * DS104: Avoid inline assignments
 * DS204: Change includes calls to have a more natural evaluation order
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
//const QJ = require('qj');
import { QJ } from "./qj";

const defaultFormat = /(\d{1,4})/g;

let cards = [
  {
    type: "amex",
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [4],
    luhn: true
  },
  {
    type: "dankort",
    pattern: /^5019/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "hipercard",
    pattern: /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
    format: defaultFormat,
    length: [14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "dinersclub",
    pattern: /^(36|38|30[0-5])/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    length: [14],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "discover",
    pattern: /^(6011|65|64[4-9]|622)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "jcb",
    pattern: /^35/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "laser",
    pattern: /^(6706|6771|6709)/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "maestro",
    pattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
    format: defaultFormat,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "mastercard",
    pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "unionpay",
    pattern: /^62/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: false
  },
  {
    type: "visaelectron",
    pattern: /^4(026|17500|405|508|844|91[37])/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "elo",
    pattern: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "visa",
    pattern: /^4/,
    format: defaultFormat,
    length: [13, 16, 19],
    cvcLength: [3],
    luhn: true
  }
];

const cardFromNumber = function(num) {
  num = (num + "").replace(/\D/g, "");
  for (let card of Array.from(cards)) {
    if (card.pattern.test(num)) {
      return card;
    }
  }
};

const cardFromType = function(type) {
  for (let card of Array.from(cards)) {
    if (card.type === type) {
      return card;
    }
  }
};

const luhnCheck = function(num) {
  let odd = true;
  let sum = 0;

  const digits = (num + "").split("").reverse();

  for (let digit of Array.from(digits)) {
    digit = parseInt(digit, 10);
    if ((odd = !odd)) {
      digit *= 2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }

  return sum % 10 === 0;
};

const hasTextSelected = function(target) {
  try {
    // If some text is selected
    if (target.selectionStart != null && target.selectionStart !== target.selectionEnd) {
      return true;
    }

    // If some text is selected in IE
    if (
      __guard__(
        typeof document !== "undefined" && document !== null ? document.selection : undefined,
        x => x.createRange
      ) != null
    ) {
      if (document.selection.createRange().text) {
        return true;
      }
    }
  } catch (e) {}

  return false;
};

// Private

// Format Card Number

const reFormatCardNumber = e =>
  setTimeout(() => {
    const { target } = e;
    let value = QJ.val(target);
    value = Payment.fns.formatCardNumber(value);
    QJ.val(target, value);
    return QJ.trigger(target, "change");
  });
const formatCardNumber = maxLength =>
  function(e) {
    // Only format if input is a number
    let re;
    const digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }

    const { target } = e;
    const value = QJ.val(target);
    const card = cardFromNumber(value + digit);
    const { length } = value.replace(/\D/g, "") + digit;

    let upperLengths = [16];
    if (card) {
      upperLengths = card.length;
    }
    if (maxLength) {
      upperLengths = upperLengths.filter(x => x <= maxLength);
    }

    // Return if an upper length has been reached
    for (let i = 0; i < upperLengths.length; i++) {
      const upperLength = upperLengths[i];
      if (length >= upperLength && upperLengths[i + 1]) {
        continue;
      }
      if (length >= upperLength) {
        return;
      }
    }

    // Return if focus isn't at the end of the text
    if (hasTextSelected(target)) {
      return;
    }

    if (card && card.type === "amex") {
      // Amex cards are formatted differently
      re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
      re = /(?:^|\s)(\d{4})$/;
    }

    // If '4242' + 4
    if (re.test(value)) {
      e.preventDefault();
      QJ.val(target, value + " " + digit);
      return QJ.trigger(target, "change");
    }
  };

const formatBackCardNumber = function(e) {
  const { target } = e;
  const value = QJ.val(target);

  if (e.meta) {
    return;
  }

  // Return unless backspacing
  if (e.which !== 8) {
    return;
  }

  // Return if focus isn't at the end of the text
  if (hasTextSelected(target)) {
    return;
  }

  // Remove the trailing space
  if (/\d\s$/.test(value)) {
    e.preventDefault();
    QJ.val(target, value.replace(/\d\s$/, ""));
    return QJ.trigger(target, "change");
  } else if (/\s\d?$/.test(value)) {
    e.preventDefault();
    QJ.val(target, value.replace(/\s\d?$/, ""));
    return QJ.trigger(target, "change");
  }
};

// Format Expiry

const formatExpiry = function(e) {
  // Only format if input is a number
  const digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }

  const { target } = e;
  const val = QJ.val(target) + digit;

  if (/^\d$/.test(val) && !["0", "1"].includes(val)) {
    e.preventDefault();
    QJ.val(target, `0${val} / `);
    return QJ.trigger(target, "change");
  } else if (/^\d\d$/.test(val)) {
    e.preventDefault();
    QJ.val(target, `${val} / `);
    return QJ.trigger(target, "change");
  }
};

const formatMonthExpiry = function(e) {
  const digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }

  const { target } = e;
  const val = QJ.val(target) + digit;

  if (/^\d$/.test(val) && !["0", "1"].includes(val)) {
    e.preventDefault();
    QJ.val(target, `0${val}`);
    return QJ.trigger(target, "change");
  } else if (/^\d\d$/.test(val)) {
    e.preventDefault();
    QJ.val(target, `${val}`);
    return QJ.trigger(target, "change");
  }
};

const formatForwardExpiry = function(e) {
  const digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }

  const { target } = e;
  const val = QJ.val(target);

  if (/^\d\d$/.test(val)) {
    QJ.val(target, `${val} / `);
    return QJ.trigger(target, "change");
  }
};

const formatForwardSlash = function(e) {
  const slash = String.fromCharCode(e.which);
  if (slash !== "/") {
    return;
  }

  const { target } = e;
  const val = QJ.val(target);

  if (/^\d$/.test(val) && val !== "0") {
    QJ.val(target, `0${val} / `);
    return QJ.trigger(target, "change");
  }
};

const formatBackExpiry = function(e) {
  // If shift+backspace is pressed
  if (e.metaKey) {
    return;
  }

  const { target } = e;
  const value = QJ.val(target);

  // Return unless backspacing
  if (e.which !== 8) {
    return;
  }

  // Return if focus isn't at the end of the text
  if (hasTextSelected(target)) {
    return;
  }

  // Remove the trailing space
  if (/\d(\s|\/)+$/.test(value)) {
    e.preventDefault();
    QJ.val(target, value.replace(/\d(\s|\/)*$/, ""));
    return QJ.trigger(target, "change");
  } else if (/\s\/\s?\d?$/.test(value)) {
    e.preventDefault();
    QJ.val(target, value.replace(/\s\/\s?\d?$/, ""));
    return QJ.trigger(target, "change");
  }
};

//  Restrictions

const restrictNumeric = function(e) {
  // Key event is for a browser shortcut
  if (e.metaKey || e.ctrlKey) {
    return true;
  }

  // If keycode is a space
  if (e.which === 32) {
    return e.preventDefault();
  }

  // If keycode is a special char (WebKit)
  if (e.which === 0) {
    return true;
  }

  // If char is a special char (Firefox)
  if (e.which < 33) {
    return true;
  }

  const input = String.fromCharCode(e.which);

  // Char is a number or a space
  if (!/[\d\s]/.test(input)) {
    return e.preventDefault();
  }
};

const restrictCardNumber = maxLength =>
  function(e) {
    const { target } = e;
    const digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }

    if (hasTextSelected(target)) {
      return;
    }

    // Restrict number of digits
    const value = (QJ.val(target) + digit).replace(/\D/g, "");
    const card = cardFromNumber(value);

    let length = 16;
    if (card) {
      length = card.length[card.length.length - 1];
    }
    if (maxLength) {
      length = Math.min(length, maxLength);
    }

    if (!(value.length <= length)) {
      return e.preventDefault();
    }
  };

const restrictExpiry = function(e, length) {
  const { target } = e;
  const digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }

  if (hasTextSelected(target)) {
    return;
  }

  let value = QJ.val(target) + digit;
  value = value.replace(/\D/g, "");

  if (value.length > length) {
    return e.preventDefault();
  }
};

const restrictCombinedExpiry = e => restrictExpiry(e, 6);

const restrictMonthExpiry = e => restrictExpiry(e, 2);

const restrictYearExpiry = e => restrictExpiry(e, 4);

const restrictCVC = function(e) {
  const { target } = e;
  const digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }

  if (hasTextSelected(target)) {
    return;
  }

  const val = QJ.val(target) + digit;
  if (!(val.length <= 4)) {
    return e.preventDefault();
  }
};

const setCardType = function(e) {
  const { target } = e;
  const val = QJ.val(target);
  const cardType = Payment.fns.cardType(val) || "unknown";

  if (!QJ.hasClass(target, cardType)) {
    const allTypes = Array.from(cards).map(card => card.type);

    QJ.removeClass(target, "unknown");
    QJ.removeClass(target, allTypes.join(" "));

    QJ.addClass(target, cardType);
    QJ.toggleClass(target, "identified", cardType !== "unknown");
    return QJ.trigger(target, "payment.cardType", cardType);
  }
};

// Public

class Payment {
  static initClass() {
    this.fns = {
      cardExpiryVal(value) {
        value = value.replace(/\s/g, "");
        let [month, year] = Array.from(value.split("/", 2));

        // Allow for year shortcut
        if ((year != null ? year.length : undefined) === 2 && /^\d+$/.test(year)) {
          let prefix = new Date().getFullYear();
          prefix = prefix.toString().slice(0, 2);
          year = prefix + year;
        }

        month = parseInt(month, 10);
        year = parseInt(year, 10);

        return { month, year };
      },
      validateCardNumber(num) {
        num = (num + "").replace(/\s+|-/g, "");
        if (!/^\d+$/.test(num)) {
          return false;
        }

        const card = cardFromNumber(num);
        if (!card) {
          return false;
        }

        return (
          Array.from(card.length).includes(num.length) && (card.luhn === false || luhnCheck(num))
        );
      },
      validateCardExpiry(month, year) {
        // Allow passing an object
        if (typeof month === "object" && "month" in month) {
          ({ month, year } = month);
        } else if (typeof month === "string" && Array.from(month).includes("/")) {
          ({ month, year } = Payment.fns.cardExpiryVal(month));
        }

        if (!month || !year) {
          return false;
        }

        month = QJ.trim(month);
        year = QJ.trim(year);

        if (!/^\d+$/.test(month)) {
          return false;
        }
        if (!/^\d+$/.test(year)) {
          return false;
        }

        month = parseInt(month, 10);

        if (!month || !(month <= 12)) {
          return false;
        }

        if (year.length === 2) {
          let prefix = new Date().getFullYear();
          prefix = prefix.toString().slice(0, 2);
          year = prefix + year;
        }

        const expiry = new Date(year, month);
        const currentTime = new Date();

        // Months start from 0 in JavaScript
        expiry.setMonth(expiry.getMonth() - 1);

        // The cc expires at the end of the month,
        // so we need to make the expiry the first day
        // of the month after
        expiry.setMonth(expiry.getMonth() + 1, 1);

        return expiry > currentTime;
      },
      validateCardCVC(cvc, type) {
        cvc = QJ.trim(cvc);
        if (!/^\d+$/.test(cvc)) {
          return false;
        }

        if (type && cardFromType(type)) {
          // Check against a explicit card type
          let needle;
          return (
            (needle = cvc.length),
            Array.from(__guard__(cardFromType(type), x => x.cvcLength)).includes(needle)
          );
        } else {
          // Check against all types
          return cvc.length >= 3 && cvc.length <= 4;
        }
      },
      cardType(num) {
        if (!num) {
          return null;
        }
        return __guard__(cardFromNumber(num), x => x.type) || null;
      },
      formatCardNumber(num) {
        const card = cardFromNumber(num);
        if (!card) {
          return num;
        }

        const upperLength = card.length[card.length.length - 1];

        num = num.replace(/\D/g, "");
        num = num.slice(0, upperLength);

        if (card.format.global) {
          return __guard__(num.match(card.format), x => x.join(" "));
        } else {
          let groups = card.format.exec(num);
          if (groups == null) {
            return;
          }
          groups.shift();
          groups = groups.filter(n => n); // Filter empty groups
          return groups.join(" ");
        }
      }
    };
  }
  static restrictNumeric(el) {
    return QJ.on(el, "keypress", restrictNumeric);
  }
  static cardExpiryVal(el) {
    return Payment.fns.cardExpiryVal(QJ.val(el));
  }
  static formatCardCVC(el) {
    Payment.restrictNumeric(el);
    QJ.on(el, "keypress", restrictCVC);
    return el;
  }
  static formatCardExpiry(el) {
    Payment.restrictNumeric(el);
    if (el.length && el.length === 2) {
      const [month, year] = Array.from(el);
      this.formatCardExpiryMultiple(month, year);
    } else {
      QJ.on(el, "keypress", restrictCombinedExpiry);
      QJ.on(el, "keypress", formatExpiry);
      QJ.on(el, "keypress", formatForwardSlash);
      QJ.on(el, "keypress", formatForwardExpiry);
      QJ.on(el, "keydown", formatBackExpiry);
    }
    return el;
  }
  static formatCardExpiryMultiple(month, year) {
    QJ.on(month, "keypress", restrictMonthExpiry);
    QJ.on(month, "keypress", formatMonthExpiry);
    return QJ.on(year, "keypress", restrictYearExpiry);
  }
  static formatCardNumber(el, maxLength) {
    Payment.restrictNumeric(el);
    QJ.on(el, "keypress", restrictCardNumber(maxLength));
    QJ.on(el, "keypress", formatCardNumber(maxLength));
    QJ.on(el, "keydown", formatBackCardNumber);
    QJ.on(el, "keyup blur", setCardType);
    QJ.on(el, "paste", reFormatCardNumber);
    QJ.on(el, "input", reFormatCardNumber);
    return el;
  }
  static getCardArray() {
    return cards;
  }
  static setCardArray(cardArray) {
    cards = cardArray;
    return true;
  }
  static addToCardArray(cardObject) {
    return cards.push(cardObject);
  }
  static removeFromCardArray(type) {
    for (let key in cards) {
      const value = cards[key];
      if (value.type === type) {
        cards.splice(key, 1);
      }
    }
    return true;
  }
}
Payment.initClass();

// module.exports = Payment;
// global.Payment = Payment;
export { Payment };

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null ? transform(value) : undefined;
}