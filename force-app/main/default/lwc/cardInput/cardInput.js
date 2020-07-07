/* eslint-disable no-debugger */
/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, track, api } from "lwc";
import { Card } from "./card";
import { Payment } from "./payment";

export default class CardInput extends LightningElement {
  @api paymentMethod = "Credit Card";
  @track paymentOptions = [
    { label: "Credit Card", value: "Credit Card", selected: true },
    { label: "Purchase Order", value: "Purchase Order" },
    { label: "Check", value: "Check" }
  ];

  @track card;

  @track valid = false;
  @track cardNumberValid = false;
  @track cardHolderNameValid = false;
  @track cardExpiryValid = false;
  @track cardCVCValid = false;

  @track cardNumberTouched = false;
  @track cardHolderNameTouched = false;
  @track cardExpiryTouched = false;
  @track cardCVCTouched = false;

  @track cardNumber = "";
  @track cardHolderName = "";
  @track cardExpiry = "";
  @track cardCVC = "";

  connectedCallback() {
    //copy public attributes to private ones
    var self = this;
    //debugger;
    window.setTimeout(() => {
      self.card = new Card({
        //reference to this object so will work with web components
        context: self,

        // a selector or DOM element for the form where users will
        // be entering their information
        form: self.template.querySelector(".cc-input"),
        // a selector or DOM element for the container
        // where you want the card to appear
        container: ".cc-wrapper", // *required*

        width: 250, // optional — default 350px
        formatting: true, // optional - default true

        // Strings for translation - optional
        messages: {
          validDate: "valid\ndate", // optional - default 'valid\nthru'
          monthYear: "mm/yyyy" // optional - default 'month/year'
        },

        // Default placeholders for rendered fields - optional
        placeholders: {
          number: "•••• •••• •••• ••••",
          name: "Full Name",
          expiry: "••/••",
          cvc: "•••"
        },

        masks: {
          cardNumber: "•" // optional - mask card number
        },

        // if true, will log helpful messages for setting up Card
        debug: true // optional - default false
      });
    }, 50);
  }

  handleCCInput(event) {
    this.cardNumber = event.target.value;
    this.cardNumberValid = this.getIsValid(this.cardNumber, "cardNumber");
    this.cardNumberTouched = true;
    this.showFeedback();
    this.checkIfComplete();
  }

  handleNameInput(event) {
    this.cardHolderName = event.target.value;
    this.cardHolderNameValid = this.getIsValid(this.cardHolderName, "cardHolderName");
    this.cardHolderNameTouched = true;
    this.showFeedback();
    this.checkIfComplete();
  }
  handleExpiryInput(event) {
    this.cardExpiry = event.target.value;
    this.cardExpiryValid = this.getIsValid(this.cardExpiry, "cardExpiry");
    this.cardExpiryTouched = true;
    this.showFeedback();
    this.checkIfComplete();
  }
  handleCVVInput(event) {
    this.cardCVC = event.target.value;
    this.cardCVCValid = this.getIsValid(this.cardCVC, "cardCVC");
    this.cardCVCTouched = true;
    this.showFeedback();
    this.checkIfComplete();
  }

  showFeedback() {
    if (!this.cardNumberValid && this.cardNumberTouched) {
      //show error label
      this.template.querySelectorAll(".cardNumberError")[0].classList.remove("slds-hide");
      this.template.querySelectorAll(".cardNumberFormElement")[0].classList.add("slds-has-error");
    } else {
      this.template.querySelectorAll(".cardNumberError")[0].classList.add("slds-hide");
      this.template
        .querySelectorAll(".cardNumberFormElement")[0]
        .classList.remove("slds-has-error");
    }

    if (!this.cardHolderNameValid && this.cardHolderNameTouched) {
      //show error label
      this.template.querySelectorAll(".cardNameError")[0].classList.remove("slds-hide");
      this.template.querySelectorAll(".cardNameFormElement")[0].classList.add("slds-has-error");
    } else {
      this.template.querySelectorAll(".cardNameError")[0].classList.add("slds-hide");
      this.template.querySelectorAll(".cardNameFormElement")[0].classList.remove("slds-has-error");
    }

    if (!this.cardExpiryValid && this.cardExpiryTouched) {
      //show error label
      this.template.querySelectorAll(".cardExpiryError")[0].classList.remove("slds-hide");
      this.template.querySelectorAll(".cardExpiryFormElement")[0].classList.add("slds-has-error");
    } else {
      this.template.querySelectorAll(".cardExpiryError")[0].classList.add("slds-hide");
      this.template
        .querySelectorAll(".cardExpiryFormElement")[0]
        .classList.remove("slds-has-error");
    }

    if (!this.cardCVCValid && this.cardCVCTouched) {
      //show error label
      this.template.querySelectorAll(".cardCVVError")[0].classList.remove("slds-hide");
      this.template.querySelectorAll(".cardCVVFormElement")[0].classList.add("slds-has-error");
    } else {
      this.template.querySelectorAll(".cardCVVError")[0].classList.add("slds-hide");
      this.template.querySelectorAll(".cardCVVFormElement")[0].classList.remove("slds-has-error");
    }
  }

  //this syntax means we should be able to leave off 'this'
  checkIfComplete = () => {
    if (
      this.cardNumberValid &&
      this.cardHolderNameValid &&
      this.cardExpiryValid &&
      this.cardCVCValid
    ) {
      //send a message
      const detail = {
        type: "cardComplete",
        value: {
          cardNumber: this.cardNumber,
          cardHolderName: this.cardHolderName,
          cardCVV: this.cardCVC,
          cardExpiry: this.cardExpiry,
          cardType: this.card.cardType
        }
      };
      this.despatchCompleteEvent(detail);
    } else {
      // LCC.sendMessage({ type: 'cardIncomplete' });
      this.despatchIncompleteEvent();
    }
  };

  despatchCompleteEvent(cardData) {
    const changeEvent = new CustomEvent("cardComplete", { detail: cardData });
    this.dispatchEvent(changeEvent);
  }

  despatchIncompleteEvent() {
    const changeEvent = new CustomEvent("cardIncomplete", { detail: {} });
    this.dispatchEvent(changeEvent);
  }

  handlePaymentMethodChange(event) {
    const selectedMethod = event.detail.value;
    const changeEvent = new CustomEvent("paymentMethodChange", {
      detail: { paymentMethod: selectedMethod }
    });
    this.dispatchEvent(changeEvent);
  }

  //this syntax means we should be able to leave off 'this'
  getIsValid = (val, validatorName) => {
    var isValid, objVal;
    if (validatorName === "cardExpiry") {
      objVal = Payment.fns.cardExpiryVal(val);
      isValid = Payment.fns.validateCardExpiry(objVal.month, objVal.year);
    } else if (validatorName === "cardCVC") {
      isValid = Payment.fns.validateCardCVC(val, this.card.cardType);
    } else if (validatorName === "cardNumber") {
      isValid = Payment.fns.validateCardNumber(val);
    } else if (validatorName === "cardHolderName") {
      isValid = val !== "";
    }
    return isValid;
  };
}