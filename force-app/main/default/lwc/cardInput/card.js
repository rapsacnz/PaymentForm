/* eslint-disable radix */
/* eslint-disable no-loop-func */
/* eslint-disable no-console */
/* eslint-disable no-undef-init */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable guard-for-in */
/* eslint-disable no-useless-concat */
/* eslint-disable dot-notation */
/* eslint-disable no-self-compare */
/* eslint-disable no-sequences */
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
/* eslint-disable vars-on-top */

import { QJ } from "./qj";
import { Payment } from "./payment";
import { extend } from "./extend";

/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
//require('../scss/card.scss');

//const QJ = require('qj');
//const payment = require('payment');
//const extend = require('node.extend');

var Card = (function() {
  let bindVal = undefined;
  Card = class Card {
    static initClass() {
      this.prototype.initializedDataAttr = "data-jp-card-initialized";
      this.prototype.cardTemplate =
        "" +
        '<div class="jp-card-container" c-cardinput_cardinput="">' +
        '<div class="jp-card" c-cardinput_cardinput="">' +
        '<div class="jp-card-front" c-cardinput_cardinput="">' +
        '<div class="jp-card-logo jp-card-elo" c-cardinput_cardinput="">' +
        '<div class="e" c-cardinput_cardinput="">e</div>' +
        '<div class="l" c-cardinput_cardinput="">l</div>' +
        '<div class="o" c-cardinput_cardinput="">o</div>' +
        "</div>" +
        '<div class="jp-card-logo jp-card-visa" c-cardinput_cardinput="">Visa</div>' +
        '<div class="jp-card-logo jp-card-visaelectron" c-cardinput_cardinput="">Visa<div class="elec">Electron</div></div>' +
        '<div class="jp-card-logo jp-card-mastercard" c-cardinput_cardinput="">Mastercard</div>' +
        '<div class="jp-card-logo jp-card-maestro" c-cardinput_cardinput="">Maestro</div>' +
        '<div class="jp-card-logo jp-card-amex" c-cardinput_cardinput=""></div>' +
        '<div class="jp-card-logo jp-card-discover" c-cardinput_cardinput="">discover</div>' +
        '<div class="jp-card-logo jp-card-dinersclub" c-cardinput_cardinput=""></div>' +
        '<div class="jp-card-logo jp-card-dankort" c-cardinput_cardinput=""><div class="dk" c-cardinput_cardinput=""><div class="d" c-cardinput_cardinput=""></div><div class="k" c-cardinput_cardinput=""></div></div></div>' +
        '<div class="jp-card-logo jp-card-jcb" c-cardinput_cardinput="">' +
        '<div class="j" c-cardinput_cardinput="">J</div>' +
        '<div class="c" c-cardinput_cardinput="">C</div>' +
        '<div class="b" c-cardinput_cardinput="">B</div>' +
        "</div>" +
        '<div class="jp-card-lower" c-cardinput_cardinput="">' +
        '<div class="jp-card-shiny" c-cardinput_cardinput=""></div>' +
        '<div class="jp-card-cvc jp-card-display" c-cardinput_cardinput="">{{cvc}}</div>' +
        '<div class="jp-card-number jp-card-display" c-cardinput_cardinput="">{{number}}</div>' +
        '<div class="jp-card-name jp-card-display" c-cardinput_cardinput="">{{name}}</div>' +
        '<div class="jp-card-expiry jp-card-display" data-before="{{monthYear}}" data-after="{{validDate}}" c-cardinput_cardinput="">{{expiry}}</div>' +
        "</div>" +
        "</div>" +
        '<div class="jp-card-back" c-cardinput_cardinput="">' +
        '<div class="jp-card-bar" c-cardinput_cardinput=""></div>' +
        '<div class="jp-card-cvc jp-card-display" c-cardinput_cardinput="">{{cvc}}</div>' +
        '<div class="jp-card-shiny" c-cardinput_cardinput=""></div>' +
        "</div>" +
        "</div>" +
        "</div>";
      this.prototype.cardTypes = [
        "jp-card-amex",
        "jp-card-dankort",
        "jp-card-dinersclub",
        "jp-card-discover",
        "jp-card-jcb",
        "jp-card-laser",
        "jp-card-maestro",
        "jp-card-mastercard",
        "jp-card-unionpay",
        "jp-card-visa",
        "jp-card-visaelectron",
        "jp-card-elo"
      ];
      this.prototype.defaults = {
        formatting: true,
        formSelectors: {
          numberInput: 'input[name="number"]',
          expiryInput: 'input[name="expiry"]',
          cvcInput: 'input[name="cvc"]',
          nameInput: 'input[name="name"]'
        },
        cardSelectors: {
          cardContainer: ".jp-card-container",
          card: ".jp-card",
          numberDisplay: ".jp-card-number",
          expiryDisplay: ".jp-card-expiry",
          cvcDisplay: ".jp-card-cvc",
          nameDisplay: ".jp-card-name"
        },
        messages: {
          validDate: "valid\nthru",
          monthYear: "month/year"
        },
        placeholders: {
          number:
            "&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;",
          cvc: "&bull;&bull;&bull;",
          expiry: "&bull;&bull;/&bull;&bull;",
          name: "Full Name"
        },
        masks: {
          cardNumber: false
        },
        classes: {
          valid: "jp-card-valid",
          invalid: "jp-card-invalid"
        },
        debug: false,
        context: document
      };

      this.prototype.handlers = {
        setCardType($el, e) {
          const cardType = e.data;
          if (!QJ.hasClass(this.$card, cardType)) {
            QJ.removeClass(this.$card, "jp-card-unknown");
            QJ.removeClass(this.$card, this.cardTypes.join(" "));
            QJ.addClass(this.$card, `jp-card-${cardType}`);
            QJ.toggleClass(this.$card, "jp-card-identified", cardType !== "unknown");
            return (this.cardType = cardType);
          }
        },
        flipCard() {
          return QJ.addClass(this.$card, "jp-card-flipped");
        },
        unflipCard() {
          return QJ.removeClass(this.$card, "jp-card-flipped");
        }
      };

      bindVal = function(el, out, opts) {
        if (opts == null) {
          opts = {};
        }
        opts.fill = opts.fill || false;
        opts.filters = opts.filters || [];
        if (!(opts.filters instanceof Array)) {
          opts.filters = [opts.filters];
        }

        opts.join = opts.join || "";
        if (!(typeof opts.join === "function")) {
          const joiner = opts.join;
          opts.join = () => joiner;
        }

        const outDefaults = Array.from(out).map(o => o.textContent);

        QJ.on(el, "focus", () => QJ.addClass(out, "jp-card-focused"));

        QJ.on(el, "blur", () => QJ.removeClass(out, "jp-card-focused"));

        QJ.on(el, "keyup change paste", function(e) {
          let val = Array.from(el).map(elem => QJ.val(elem));

          const join = opts.join(val);

          val = val.join(join);
          if (val === join) {
            val = "";
          }

          for (let filter of Array.from(opts.filters)) {
            val = filter(val, el, out);
          }

          return (() => {
            const result = [];
            for (let i = 0; i < out.length; i++) {
              var outVal;
              const outEl = out[i];
              if (opts.fill) {
                outVal = val + outDefaults[i].substring(val.length);
              } else {
                outVal = val || outDefaults[i];
              }

              result.push((outEl.textContent = outVal));
            }
            return result;
          })();
        });

        return el;
      };
    }
    template(tpl, data) {
      return tpl.replace(/\{\{(.*?)\}\}/g, (match, key, str) => data[key]);
      //return tpl.replace(/\[\[(.*?)\]\]/g, (match, key, str) => data[key]);
    }

    constructor(opts) {
      this.maskCardNumber = this.maskCardNumber.bind(this);
      this.options = extend(true, this.defaults, opts);

      if (!this.options.form) {
        console.log("Please provide a form");
        return;
      }

      this.$el = QJ(this.options.form, this.options.context);

      if (!this.options.container) {
        console.log("Please provide a container");
        return;
      }

      this.$container = QJ(this.options.container, this.options.context);

      // set a data attribute to ensure that card is only ever initialized
      // once on a given container
      const toInitialize = QJ.isDOMElement(this.$container) ? this.$container : this.$container[0];
      if (toInitialize.getAttribute(this.initializedDataAttr)) {
        return;
      }
      toInitialize.setAttribute(this.initializedDataAttr, true);

      this.render();
      this.attachHandlers();
      this.handleInitialPlaceholders();
    }

    render() {
      let name, selector;
      QJ.append(
        this.$container,
        this.template(
          this.cardTemplate,
          extend({}, this.options.messages, this.options.placeholders)
        )
      );

      for (name in this.options.cardSelectors) {
        selector = this.options.cardSelectors[name];
        //CASPAR commented for web components
        //this[`$${name}`] = QJ.find(this.$container, selector);
        this[`$${name}`] = QJ.find(this.options.context.template, selector);
      }

      for (name in this.options.formSelectors) {
        selector = this.options.formSelectors[name];
        selector = this.options[name] ? this.options[name] : selector;
        //CASPAR commented for web components
        //const obj = QJ.find(this.$el, selector);
        const obj = QJ.find(this.options.context.template, selector);

        if (!obj.length && this.options.debug) {
          console.error(`Card can't find a ${name} in your form.`);
        }
        this[`$${name}`] = obj;
      }

      if (this.options.formatting) {
        Payment.formatCardNumber(this.$numberInput);
        Payment.formatCardCVC(this.$cvcInput);
        Payment.formatCardExpiry(this.$expiryInput);
      }

      if (this.options.width) {
        const $cardContainer = QJ(
          this.options.cardSelectors.cardContainer,
          this.options.context
        )[0];
        //const baseWidth = parseInt($cardContainer.clientWidth || window.getComputedStyle($cardContainer).width );

        //const ratio = 350/this.options.width;
        $cardContainer.style.transform = `scale(${this.options.width / 350})`;
        //$cardContainer.style.transform = `scale(${this.options.width / baseWidth})`;
        $cardContainer.style.transformOrigin = "top center ";
      }

      // if (this.options.width) {
      //   const $cardContainer = QJ(this.options.cardSelectors.cardContainer,this.options.context)[0];
      //   const ratio = 1.75;
      //   const height = this.options.width/ratio;

      //   $cardContainer.style.height = height + "px";
      //   $cardContainer.style.width = this.options.width + "px";
      // }
      // else if (this.options.height) {
      //   const $cardContainer = QJ(this.options.cardSelectors.cardContainer,this.options.context)[0];
      //   const ratio = 1.75;
      //   const width = this.options.height*ratio;

      //   $cardContainer.style.height = this.options.height + "px";
      //   $cardContainer.style.width = width + "px";
      // }
      // //default
      // else {
      //   const $cardContainer = QJ(this.options.cardSelectors.cardContainer,this.options.context)[0];
      //   $cardContainer.style.height = "200px";
      //   $cardContainer.style.width = "350px";
      // }

      // safari can't handle transparent radial gradient right now
      if (
        typeof navigator !== "undefined" && navigator !== null ? navigator.userAgent : undefined
      ) {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1) {
          QJ.addClass(this.$card, "jp-card-safari");
        }
      }
      if (/MSIE 10\./i.test(navigator.userAgent)) {
        QJ.addClass(this.$card, "jp-card-ie-10");
      }
      // ie 11 does not support conditional compilation, use user agent instead
      if (/rv:11.0/i.test(navigator.userAgent)) {
        return QJ.addClass(this.$card, "jp-card-ie-11");
      }
    }

    attachHandlers() {
      const numberInputFilters = [this.validToggler("cardNumber")];
      if (this.options.masks.cardNumber) {
        numberInputFilters.push(this.maskCardNumber);
      }

      bindVal(this.$numberInput, this.$numberDisplay, {
        fill: false,
        filters: numberInputFilters
      });
      QJ.on(this.$numberInput, "payment.cardType", this.handle("setCardType"));

      const expiryFilters = [val => val.replace(/(\s+)/g, "")];
      expiryFilters.push(this.validToggler("cardExpiry"));

      bindVal(this.$expiryInput, this.$expiryDisplay, {
        join(text) {
          if (text[0].length === 2 || text[1]) {
            return "/";
          } else {
            return "";
          }
        },
        filters: expiryFilters
      });

      bindVal(this.$cvcInput, this.$cvcDisplay, {
        filters: this.validToggler("cardCVC")
      });
      QJ.on(this.$cvcInput, "focus", this.handle("flipCard"));
      QJ.on(this.$cvcInput, "blur", this.handle("unflipCard"));

      return bindVal(this.$nameInput, this.$nameDisplay, {
        fill: false,
        filters: this.validToggler("cardHolderName"),
        join: " "
      });
    }

    handleInitialPlaceholders() {
      return (() => {
        const result = [];
        for (let name in this.options.formSelectors) {
          const selector = this.options.formSelectors[name];
          var el = this[`$${name}`];
          if (QJ.val(el)) {
            // if the input has a value, we want to trigger a refresh
            QJ.trigger(el, "paste");
            // set a timeout because `jquery.payment` does the reset of the val
            // in a timeout
            result.push(setTimeout(() => QJ.trigger(el, "keyup")));
          } else {
            result.push(undefined);
          }
        }
        return result;
      })();
    }

    handle(fn) {
      return function(e) {
        const args = Array.prototype.slice.call(arguments);
        args.unshift(e.target);
        return this.handlers[fn].apply(this, args);
      }.bind(this);
    }

    validToggler(validatorName) {
      let isValid;
      if (validatorName === "cardExpiry") {
        isValid = function(val) {
          const objVal = Payment.fns.cardExpiryVal(val);
          return Payment.fns.validateCardExpiry(objVal.month, objVal.year);
        };
      } else if (validatorName === "cardCVC") {
        isValid = val => Payment.fns.validateCardCVC(val, this.cardType);
      } else if (validatorName === "cardNumber") {
        isValid = val => Payment.fns.validateCardNumber(val);
      } else if (validatorName === "cardHolderName") {
        isValid = val => val !== "";
      }

      return (val, $in, $out) => {
        const result = isValid(val);
        this.toggleValidClass($in, result);
        this.toggleValidClass($out, result);
        return val;
      };
    }
    toggleValidClass(el, test) {
      QJ.toggleClass(el, this.options.classes.valid, test);
      return QJ.toggleClass(el, this.options.classes.invalid, !test);
    }

    maskCardNumber(val, el, out) {
      const mask = this.options.masks.cardNumber;
      const numbers = val.split(" ");

      if (numbers.length >= 3) {
        numbers.forEach(function(item, idx) {
          if (idx !== numbers.length - 1) {
            return (numbers[idx] = numbers[idx].replace(/\d/g, mask));
          }
        });
        return numbers.join(" ");
      } else {
        return val.replace(/\d/g, mask);
      }
    }
  };
  Card.initClass();
  return Card;
})();

export { Card };