({
    init: function(component, event, helper) {
      component.set("v.disableHandlers", true);
      helper.showSpinner(component, "loading");
      helper.getContext(component);
      helper.loadStateOptions(component);
      helper.loadCountryOptions(component);
      helper.initializeOrderData(component);
      window.setTimeout(
        $A.getCallback(() => {
          component.set("v.disableHandlers", false);
        }),
        2000
      );
    },
  
    noOp: function(component, event, helper) {},
  
    onRender: function(component, event, helper) {
      //run once
      if (component.get("v.rendered") == false) {
        component.set("v.rendered", true);
        helper.checkIfAddressValid(component);
      }
    },
  
    handleCloseClick: function(component, event, helper) {
      component.getEvent("wizardClose").fire();
    },
  
    handleNextClick: function(component, event, helper) {
      helper.processPayment(component);
    },
  
    handlePreviousClick: function(component, event, helper) {
      helper.saveContext(component);
      component.getEvent("wizardBack").fire();
    },
  
    handlePaymentMethodChange: function(component, event, helper) {
      helper.checkIfFormValid(component);
    },

    handleCardComplete: function(component, event, helper) {
      const cardData = event.getParam("value");
      component.set("v.cardValid", true);
      component.set("v.cardDetails", cardData);
      helper.checkIfFormValid(component);
    },
  
    handleCardIncomplete: function(component, event, helper) {
      component.set("v.cardValid", false);
      component.set("v.cardDetails", {});
      helper.checkIfFormValid(component);
    },
  
    handleAddressValid: function(component, event, helper) {
      const addressData = event.getParam("value");
      component.set("v.addressValid", true);
      var newAccount = component.get("v.newAccount");
      newAccount.BillingCountry = addressData.BillingCountry == "United States" ? "USA" : addressData.BillingCountry;
      newAccount.BillingCity = addressData.BillingCity;
      newAccount.BillingState = addressData.BillingState;
      newAccount.BillingPostalCode = addressData.BillingPostalCode;
      newAccount.BillingStreet = addressData.BillingStreet;
      component.set("v.newAccount", newAccount);
  
      console.log(JSON.stringify(newAccount));
  
      helper.checkIfFormValid(component);
    },
  
    handleAddressInvalid: function(component, event, helper) {
      component.set("v.addressValid", false);
      helper.checkIfFormValid(component);
    },
  
    handleCheckChange: function(component, event, helper) {
      var val = event.target.value;
      component.set("v.checkNumber", val);
      helper.checkIfFormValid(component);
    },
  
    handleGroupAccountChange: function(component, event, helper) {
      if (component.get("v.disableHandlers") == true) {
        return;
      }
      helper.checkIfFormValid(component);
    },
  
    handlePOChange: function(component, event, helper) {
      var val = event.target.value;
  
      if (!val) {
        document.getElementById("purchaseOrderError").classList.remove("slds-hide");
        document.getElementById("purchaseOrderForm").classList.add("slds-has-error");
      } else {
        document.getElementById("purchaseOrderError").classList.add("slds-hide");
        document.getElementById("purchaseOrderForm").classList.remove("slds-has-error");
      }
      component.set("v.poNumber", val);
      helper.checkIfFormValid(component);
    },
  
    displayError: function(component, event, helper) {
      var data = event.getParam("data");
      var errorTitle = data.errorTitle;
      var error = data.error;
      helper.notify(component, error, "error");
      console.log(errorTitle + " " + error);
    },
  
    displayNotification: function(component, event, helper) {
      var errorTitle = event.getParam("errorTitle");
      var error = event.getParam("error");
      $A.reportError(errorTitle, error);
      console.log(errorTitle + " " + error);
    }
  });