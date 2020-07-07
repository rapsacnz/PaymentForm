/* eslint-disable @lwc/lwc/no-async-operation */
/* eslint-disable no-console */
import { LightningElement, track, api } from "lwc";

export default class AddressInput extends LightningElement {
  @api
  get address() {
    return this.address_;
  }
  set address(value) {
    this.address_ = JSON.parse(JSON.stringify(value));
    if (this.address_.BillingCountry === "USA") {
      this.address_.BillingCountry = "United States";
    }
  }
  @api
  stateOptions;
  @api
  validity;
  @api
  variant = "label-inline";

  @track address_;
  timeout = {};
  touched = new Set();

  validateAddressImp() {
    const allValid = [...this.template.querySelectorAll(".address-required")].reduce(
      (validSoFar, inputCmp) => {
        if (this.touched.has(inputCmp.name)) {
          console.log(inputCmp.name);
          //if we have entered the field. If it's empty and has not been touched, don't show the error field
          inputCmp.reportValidity();
        }
        return validSoFar && inputCmp.checkValidity();
      },
      true
    );
    this.validity = allValid;
    if (allValid) {
      this.despatchValidEvent();
      console.log("All form entries look valid. Ready to submit!");
    } else {
      this.despatchInvalidEvent();
      console.log("Please update the invalid form entries and try again.");
    }
  }

  validateAddress() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.validateAddressImp();
    }, 50);
  }

  handleStreetChange(event) {
    this.touched.add("street");
    this.address_.BillingStreet = event.detail.value;
    this.validateAddress();
  }
  handleStreet2Change(event) {
    this.touched.add("street2");
    this.address_.BillingStreet2 = event.detail.value;
    this.validateAddress();
  }
  handleCityChange(event) {
    this.touched.add("city");
    this.address_.BillingCity = event.detail.value;
    this.validateAddress();
  }
  handlePostCodeChange(event) {
    this.touched.add("zip");
    this.address_.BillingPostalCode = event.detail.value;
    this.validateAddress();
  }
  handleStateChange(event) {
    this.touched.add("state");
    this.address_.BillingState = event.detail.value;
    this.validateAddress();
  }
  handleCountryChange(event) {
    this.touched.add("country");
    this.address_.BillingCountry = event.detail.value;
    this.validateAddress();
  }

  handleInternationalChange(event) {
    this.address_.internationalAddress = event.target.checked;
    if (this.address_.internationalAddress) {
      this.address_.BillingCountry = "";
    } else {
      this.address_.BillingCountry = "United States";
    }
    this.touched.clear();
    this.validateAddress();
  }

  despatchValidEvent() {
    var address = this.address_;

    const detail = {
      type: "addressvalid",
      value: {
        BillingCountry: address.BillingCountry,
        BillingStreet: address.BillingStreet,
        BillingStreet2: address.BillingStreet2,
        BillingCity: address.BillingCity,
        BillingPostalCode: address.BillingPostalCode,
        BillingState: address.BillingState,
        InternationalAddress: address.internationalAddress
      }
    };

    console.log(detail);
    const changeEvent = new CustomEvent("addressvalid", { detail: detail });
    this.dispatchEvent(changeEvent);
  }

  despatchInvalidEvent() {
    var address = this.address_;
    const detail = {
      type: "addressinvalid",
      value: {
        BillingCountry: address.BillingCountry,
        BillingStreet: address.BillingStreet,
        BillingStreet2: address.BillingStreet2,
        BillingCity: address.BillingCity,
        BillingPostalCode: address.BillingPostalCode,
        BillingState: address.BillingState,
        InternationalAddress: address.internationalAddress
      }
    };

    const changeEvent = new CustomEvent("addressinvalid", { detail: detail });
    this.dispatchEvent(changeEvent);
  }
  get countryOptions() {
    return this.countries;
  }

  countries = [
    {
      value: "",
      label: "Select a Country"
    },
    {
      value: "Afghanistan",
      key: "AF",
      label: "Afghanistan"
    },
    {
      value: "Åland Islands",
      key: "AX",
      label: "Åland Islands"
    },
    {
      value: "Albania",
      key: "AL",
      label: "Albania"
    },
    {
      value: "Algeria",
      key: "DZ",
      label: "Algeria"
    },
    {
      value: "American Samoa",
      key: "AS",
      label: "American Samoa"
    },
    {
      value: "Andorra",
      key: "AD",
      label: "Andorra"
    },
    {
      value: "Angola",
      key: "AO",
      label: "Angola"
    },
    {
      value: "Anguilla",
      key: "AI",
      label: "Anguilla"
    },
    {
      value: "Antarctica",
      key: "AQ",
      label: "Antarctica"
    },
    {
      value: "Antigua and Barbuda",
      key: "AG",
      label: "Antigua and Barbuda"
    },
    {
      value: "Argentina",
      key: "AR",
      label: "Argentina"
    },
    {
      value: "Armenia",
      key: "AM",
      label: "Armenia"
    },
    {
      value: "Aruba",
      key: "AW",
      label: "Aruba"
    },
    {
      value: "Australia",
      key: "AU",
      label: "Australia"
    },
    {
      value: "Austria",
      key: "AT",
      label: "Austria"
    },
    {
      value: "Azerbaijan",
      key: "AZ",
      label: "Azerbaijan"
    },
    {
      value: "Bahamas",
      key: "BS",
      label: "Bahamas"
    },
    {
      value: "Bahrain",
      key: "BH",
      label: "Bahrain"
    },
    {
      value: "Bangladesh",
      key: "BD",
      label: "Bangladesh"
    },
    {
      value: "Barbados",
      key: "BB",
      label: "Barbados"
    },
    {
      value: "Belarus",
      key: "BY",
      label: "Belarus"
    },
    {
      value: "Belgium",
      key: "BE",
      label: "Belgium"
    },
    {
      value: "Belize",
      key: "BZ",
      label: "Belize"
    },
    {
      value: "Benin",
      key: "BJ",
      label: "Benin"
    },
    {
      value: "Bermuda",
      key: "BM",
      label: "Bermuda"
    },
    {
      value: "Bhutan",
      key: "BT",
      label: "Bhutan"
    },
    {
      value: "Bolivia",
      key: "BO",
      label: "Bolivia"
    },
    {
      value: "Bosnia and Herzegovina",
      key: "BA",
      label: "Bosnia and Herzegovina"
    },
    {
      value: "Botswana",
      key: "BW",
      label: "Botswana"
    },
    {
      value: "Bouvet Island",
      key: "BV",
      label: "Bouvet Island"
    },
    {
      value: "Brazil",
      key: "BR",
      label: "Brazil"
    },
    {
      value: "British Indian Ocean Territory",
      key: "IO",
      label: "British Indian Ocean Territory"
    },
    {
      value: "Brunei Darussalam",
      key: "BN",
      label: "Brunei Darussalam"
    },
    {
      value: "Bulgaria",
      key: "BG",
      label: "Bulgaria"
    },
    {
      value: "Burkina Faso",
      key: "BF",
      label: "Burkina Faso"
    },
    {
      value: "Burundi",
      key: "BI",
      label: "Burundi"
    },
    {
      value: "Cambodia",
      key: "KH",
      label: "Cambodia"
    },
    {
      value: "Cameroon",
      key: "CM",
      label: "Cameroon"
    },
    {
      value: "Canada",
      key: "CA",
      label: "Canada"
    },
    {
      value: "Cape Verde",
      key: "CV",
      label: "Cape Verde"
    },
    {
      value: "Cayman Islands",
      key: "KY",
      label: "Cayman Islands"
    },
    {
      value: "Central African Republic",
      key: "CF",
      label: "Central African Republic"
    },
    {
      value: "Chad",
      key: "TD",
      label: "Chad"
    },
    {
      value: "Chile",
      key: "CL",
      label: "Chile"
    },
    {
      value: "China",
      key: "CN",
      label: "China"
    },
    {
      value: "Christmas Island",
      key: "CX",
      label: "Christmas Island"
    },
    {
      value: "Cocos (Keeling) Islands",
      key: "CC",
      label: "Cocos (Keeling) Islands"
    },
    {
      value: "Colombia",
      key: "CO",
      label: "Colombia"
    },
    {
      value: "Comoros",
      key: "KM",
      label: "Comoros"
    },
    {
      value: "Congo",
      key: "CG",
      label: "Congo"
    },
    {
      value: "Congo, The Democratic Republic of the",
      key: "CD",
      label: "Congo, The Democratic Republic of the"
    },
    {
      value: "Cook Islands",
      key: "CK",
      label: "Cook Islands"
    },
    {
      value: "Costa Rica",
      key: "CR",
      label: "Costa Rica"
    },
    {
      value: "Cote D'Ivoire",
      key: "CI",
      label: "Cote D'Ivoire"
    },
    {
      value: "Croatia",
      key: "HR",
      label: "Croatia"
    },
    {
      value: "Cuba",
      key: "CU",
      label: "Cuba"
    },
    {
      value: "Cyprus",
      key: "CY",
      label: "Cyprus"
    },
    {
      value: "Czech Republic",
      key: "CZ",
      label: "Czech Republic"
    },
    {
      value: "Denmark",
      key: "DK",
      label: "Denmark"
    },
    {
      value: "Djibouti",
      key: "DJ",
      label: "Djibouti"
    },
    {
      value: "Dominica",
      key: "DM",
      label: "Dominica"
    },
    {
      value: "Dominican Republic",
      key: "DO",
      label: "Dominican Republic"
    },
    {
      value: "Ecuador",
      key: "EC",
      label: "Ecuador"
    },
    {
      value: "Egypt",
      key: "EG",
      label: "Egypt"
    },
    {
      value: "El Salvador",
      key: "SV",
      label: "El Salvador"
    },
    {
      value: "Equatorial Guinea",
      key: "GQ",
      label: "Equatorial Guinea"
    },
    {
      value: "Eritrea",
      key: "ER",
      label: "Eritrea"
    },
    {
      value: "Estonia",
      key: "EE",
      label: "Estonia"
    },
    {
      value: "Ethiopia",
      key: "ET",
      label: "Ethiopia"
    },
    {
      value: "Falkland Islands (Malvinas)",
      key: "FK",
      label: "Falkland Islands (Malvinas)"
    },
    {
      value: "Faroe Islands",
      key: "FO",
      label: "Faroe Islands"
    },
    {
      value: "Fiji",
      key: "FJ",
      label: "Fiji"
    },
    {
      value: "Finland",
      key: "FI",
      label: "Finland"
    },
    {
      value: "France",
      key: "FR",
      label: "France"
    },
    {
      value: "French Guiana",
      key: "GF",
      label: "French Guiana"
    },
    {
      value: "French Polynesia",
      key: "PF",
      label: "French Polynesia"
    },
    {
      value: "French Southern Territories",
      key: "TF",
      label: "French Southern Territories"
    },
    {
      value: "Gabon",
      key: "GA",
      label: "Gabon"
    },
    {
      value: "Gambia",
      key: "GM",
      label: "Gambia"
    },
    {
      value: "Georgia",
      key: "GE",
      label: "Georgia"
    },
    {
      value: "Germany",
      key: "DE",
      label: "Germany"
    },
    {
      value: "Ghana",
      key: "GH",
      label: "Ghana"
    },
    {
      value: "Gibraltar",
      key: "GI",
      label: "Gibraltar"
    },
    {
      value: "Greece",
      key: "GR",
      label: "Greece"
    },
    {
      value: "Greenland",
      key: "GL",
      label: "Greenland"
    },
    {
      value: "Grenada",
      key: "GD",
      label: "Grenada"
    },
    {
      value: "Guadeloupe",
      key: "GP",
      label: "Guadeloupe"
    },
    {
      value: "Guam",
      key: "GU",
      label: "Guam"
    },
    {
      value: "Guatemala",
      key: "GT",
      label: "Guatemala"
    },
    {
      value: "Guernsey",
      key: "GG",
      label: "Guernsey"
    },
    {
      value: "Guinea",
      key: "GN",
      label: "Guinea"
    },
    {
      value: "Guinea-Bissau",
      key: "GW",
      label: "Guinea-Bissau"
    },
    {
      value: "Guyana",
      key: "GY",
      label: "Guyana"
    },
    {
      value: "Haiti",
      key: "HT",
      label: "Haiti"
    },
    {
      value: "Heard Island and Mcdonald Islands",
      key: "HM",
      label: "Heard Island and Mcdonald Islands"
    },
    {
      value: "Holy See (Vatican City State)",
      key: "VA",
      label: "Holy See (Vatican City State)"
    },
    {
      value: "Honduras",
      key: "HN",
      label: "Honduras"
    },
    {
      value: "Hong Kong",
      key: "HK",
      label: "Hong Kong"
    },
    {
      value: "Hungary",
      key: "HU",
      label: "Hungary"
    },
    {
      value: "Iceland",
      key: "IS",
      label: "Iceland"
    },
    {
      value: "India",
      key: "IN",
      label: "India"
    },
    {
      value: "Indonesia",
      key: "ID",
      label: "Indonesia"
    },
    {
      value: "Iran, Islamic Republic Of",
      key: "IR",
      label: "Iran, Islamic Republic Of"
    },
    {
      value: "Iraq",
      key: "IQ",
      label: "Iraq"
    },
    {
      value: "Ireland",
      key: "IE",
      label: "Ireland"
    },
    {
      value: "Isle of Man",
      key: "IM",
      label: "Isle of Man"
    },
    {
      value: "Israel",
      key: "IL",
      label: "Israel"
    },
    {
      value: "Italy",
      key: "IT",
      label: "Italy"
    },
    {
      value: "Jamaica",
      key: "JM",
      label: "Jamaica"
    },
    {
      value: "Japan",
      key: "JP",
      label: "Japan"
    },
    {
      value: "Jersey",
      key: "JE",
      label: "Jersey"
    },
    {
      value: "Jordan",
      key: "JO",
      label: "Jordan"
    },
    {
      value: "Kazakhstan",
      key: "KZ",
      label: "Kazakhstan"
    },
    {
      value: "Kenya",
      key: "KE",
      label: "Kenya"
    },
    {
      value: "Kiribati",
      key: "KI",
      label: "Kiribati"
    },
    {
      value: "Korea, Democratic People's Republic of",
      key: "KP",
      label: "Korea, Democratic People's Republic of"
    },
    {
      value: "Korea, Republic of",
      key: "KR",
      label: "Korea, Republic of"
    },
    {
      value: "Kuwait",
      key: "KW",
      label: "Kuwait"
    },
    {
      value: "Kyrgyzstan",
      key: "KG",
      label: "Kyrgyzstan"
    },
    {
      value: "Lao People's Democratic Republic",
      key: "LA",
      label: "Lao People's Democratic Republic"
    },
    {
      value: "Latvia",
      key: "LV",
      label: "Latvia"
    },
    {
      value: "Lebanon",
      key: "LB",
      label: "Lebanon"
    },
    {
      value: "Lesotho",
      key: "LS",
      label: "Lesotho"
    },
    {
      value: "Liberia",
      key: "LR",
      label: "Liberia"
    },
    {
      value: "Libyan Arab Jamahiriya",
      key: "LY",
      label: "Libyan Arab Jamahiriya"
    },
    {
      value: "Liechtenstein",
      key: "LI",
      label: "Liechtenstein"
    },
    {
      value: "Lithuania",
      key: "LT",
      label: "Lithuania"
    },
    {
      value: "Luxembourg",
      key: "LU",
      label: "Luxembourg"
    },
    {
      value: "Macao",
      key: "MO",
      label: "Macao"
    },
    {
      value: "Macedonia, The Former Yugoslav Republic of",
      key: "MK",
      label: "Macedonia, The Former Yugoslav Republic of"
    },
    {
      value: "Madagascar",
      key: "MG",
      label: "Madagascar"
    },
    {
      value: "Malawi",
      key: "MW",
      label: "Malawi"
    },
    {
      value: "Malaysia",
      key: "MY",
      label: "Malaysia"
    },
    {
      value: "Maldives",
      key: "MV",
      label: "Maldives"
    },
    {
      value: "Mali",
      key: "ML",
      label: "Mali"
    },
    {
      value: "Malta",
      key: "MT",
      label: "Malta"
    },
    {
      value: "Marshall Islands",
      key: "MH",
      label: "Marshall Islands"
    },
    {
      value: "Martinique",
      key: "MQ",
      label: "Martinique"
    },
    {
      value: "Mauritania",
      key: "MR",
      label: "Mauritania"
    },
    {
      value: "Mauritius",
      key: "MU",
      label: "Mauritius"
    },
    {
      value: "Mayotte",
      key: "YT",
      label: "Mayotte"
    },
    {
      value: "Mexico",
      key: "MX",
      label: "Mexico"
    },
    {
      value: "Micronesia, Federated States of",
      key: "FM",
      label: "Micronesia, Federated States of"
    },
    {
      value: "Moldova, Republic of",
      key: "MD",
      label: "Moldova, Republic of"
    },
    {
      value: "Monaco",
      key: "MC",
      label: "Monaco"
    },
    {
      value: "Mongolia",
      key: "MN",
      label: "Mongolia"
    },
    {
      value: "Montserrat",
      key: "MS",
      label: "Montserrat"
    },
    {
      value: "Morocco",
      key: "MA",
      label: "Morocco"
    },
    {
      value: "Mozambique",
      key: "MZ",
      label: "Mozambique"
    },
    {
      value: "Myanmar",
      key: "MM",
      label: "Myanmar"
    },
    {
      value: "Namibia",
      key: "NA",
      label: "Namibia"
    },
    {
      value: "Nauru",
      key: "NR",
      label: "Nauru"
    },
    {
      value: "Nepal",
      key: "NP",
      label: "Nepal"
    },
    {
      value: "Netherlands",
      key: "NL",
      label: "Netherlands"
    },
    {
      value: "Netherlands Antilles",
      key: "AN",
      label: "Netherlands Antilles"
    },
    {
      value: "New Caledonia",
      key: "NC",
      label: "New Caledonia"
    },
    {
      value: "New Zealand",
      key: "NZ",
      label: "New Zealand"
    },
    {
      value: "Nicaragua",
      key: "NI",
      label: "Nicaragua"
    },
    {
      value: "Niger",
      key: "NE",
      label: "Niger"
    },
    {
      value: "Nigeria",
      key: "NG",
      label: "Nigeria"
    },
    {
      value: "Niue",
      key: "NU",
      label: "Niue"
    },
    {
      value: "Norfolk Island",
      key: "NF",
      label: "Norfolk Island"
    },
    {
      value: "Northern Mariana Islands",
      key: "MP",
      label: "Northern Mariana Islands"
    },
    {
      value: "Norway",
      key: "NO",
      label: "Norway"
    },
    {
      value: "Oman",
      key: "OM",
      label: "Oman"
    },
    {
      value: "Pakistan",
      key: "PK",
      label: "Pakistan"
    },
    {
      value: "Palau",
      key: "PW",
      label: "Palau"
    },
    {
      value: "Palestinian Territory, Occupied",
      key: "PS",
      label: "Palestinian Territory, Occupied"
    },
    {
      value: "Panama",
      key: "PA",
      label: "Panama"
    },
    {
      value: "Papua New Guinea",
      key: "PG",
      label: "Papua New Guinea"
    },
    {
      value: "Paraguay",
      key: "PY",
      label: "Paraguay"
    },
    {
      value: "Peru",
      key: "PE",
      label: "Peru"
    },
    {
      value: "Philippines",
      key: "PH",
      label: "Philippines"
    },
    {
      value: "Pitcairn",
      key: "PN",
      label: "Pitcairn"
    },
    {
      value: "Poland",
      key: "PL",
      label: "Poland"
    },
    {
      value: "Portugal",
      key: "PT",
      label: "Portugal"
    },
    {
      value: "Puerto Rico",
      key: "PR",
      label: "Puerto Rico"
    },
    {
      value: "Qatar",
      key: "QA",
      label: "Qatar"
    },
    {
      value: "Reunion",
      key: "RE",
      label: "Reunion"
    },
    {
      value: "Romania",
      key: "RO",
      label: "Romania"
    },
    {
      value: "Russian Federation",
      key: "RU",
      label: "Russian Federation"
    },
    {
      value: "RWANDA",
      key: "RW",
      label: "RWANDA"
    },
    {
      value: "Saint Helena",
      key: "SH",
      label: "Saint Helena"
    },
    {
      value: "Saint Kitts and Nevis",
      key: "KN",
      label: "Saint Kitts and Nevis"
    },
    {
      value: "Saint Lucia",
      key: "LC",
      label: "Saint Lucia"
    },
    {
      value: "Saint Pierre and Miquelon",
      key: "PM",
      label: "Saint Pierre and Miquelon"
    },
    {
      value: "Saint Vincent and the Grenadines",
      key: "VC",
      label: "Saint Vincent and the Grenadines"
    },
    {
      value: "Samoa",
      key: "WS",
      label: "Samoa"
    },
    {
      value: "San Marino",
      key: "SM",
      label: "San Marino"
    },
    {
      value: "Sao Tome and Principe",
      key: "ST",
      label: "Sao Tome and Principe"
    },
    {
      value: "Saudi Arabia",
      key: "SA",
      label: "Saudi Arabia"
    },
    {
      value: "Senegal",
      key: "SN",
      label: "Senegal"
    },
    {
      value: "Serbia and Montenegro",
      key: "CS",
      label: "Serbia and Montenegro"
    },
    {
      value: "Seychelles",
      key: "SC",
      label: "Seychelles"
    },
    {
      value: "Sierra Leone",
      key: "SL",
      label: "Sierra Leone"
    },
    {
      value: "Singapore",
      key: "SG",
      label: "Singapore"
    },
    {
      value: "Slovakia",
      key: "SK",
      label: "Slovakia"
    },
    {
      value: "Slovenia",
      key: "SI",
      label: "Slovenia"
    },
    {
      value: "Solomon Islands",
      key: "SB",
      label: "Solomon Islands"
    },
    {
      value: "Somalia",
      key: "SO",
      label: "Somalia"
    },
    {
      value: "South Africa",
      key: "ZA",
      label: "South Africa"
    },
    {
      value: "South Georgia and the South Sandwich Islands",
      key: "GS",
      label: "South Georgia and the South Sandwich Islands"
    },
    {
      value: "Spain",
      key: "ES",
      label: "Spain"
    },
    {
      value: "Sri Lanka",
      key: "LK",
      label: "Sri Lanka"
    },
    {
      value: "Sudan",
      key: "SD",
      label: "Sudan"
    },
    {
      value: "Suriname",
      key: "SR",
      label: "Suriname"
    },
    {
      value: "Svalbard and Jan Mayen",
      key: "SJ",
      label: "Svalbard and Jan Mayen"
    },
    {
      value: "Swaziland",
      key: "SZ",
      label: "Swaziland"
    },
    {
      value: "Sweden",
      key: "SE",
      label: "Sweden"
    },
    {
      value: "Switzerland",
      key: "CH",
      label: "Switzerland"
    },
    {
      value: "Syrian Arab Republic",
      key: "SY",
      label: "Syrian Arab Republic"
    },
    {
      value: "Taiwan, Province of China",
      key: "TW",
      label: "Taiwan, Province of China"
    },
    {
      value: "Tajikistan",
      key: "TJ",
      label: "Tajikistan"
    },
    {
      value: "Tanzania, United Republic of",
      key: "TZ",
      label: "Tanzania, United Republic of"
    },
    {
      value: "Thailand",
      key: "TH",
      label: "Thailand"
    },
    {
      value: "Timor-Leste",
      key: "TL",
      label: "Timor-Leste"
    },
    {
      value: "Togo",
      key: "TG",
      label: "Togo"
    },
    {
      value: "Tokelau",
      key: "TK",
      label: "Tokelau"
    },
    {
      value: "Tonga",
      key: "TO",
      label: "Tonga"
    },
    {
      value: "Trinidad and Tobago",
      key: "TT",
      label: "Trinidad and Tobago"
    },
    {
      value: "Tunisia",
      key: "TN",
      label: "Tunisia"
    },
    {
      value: "Turkey",
      key: "TR",
      label: "Turkey"
    },
    {
      value: "Turkmenistan",
      key: "TM",
      label: "Turkmenistan"
    },
    {
      value: "Turks and Caicos Islands",
      key: "TC",
      label: "Turks and Caicos Islands"
    },
    {
      value: "Tuvalu",
      key: "TV",
      label: "Tuvalu"
    },
    {
      value: "Uganda",
      key: "UG",
      label: "Uganda"
    },
    {
      value: "Ukraine",
      key: "UA",
      label: "Ukraine"
    },
    {
      value: "United Arab Emirates",
      key: "AE",
      label: "United Arab Emirates"
    },
    {
      value: "United Kingdom",
      key: "GB",
      label: "United Kingdom"
    },
    {
      value: "United States",
      key: "US",
      label: "United States"
    },
    {
      value: "United States Minor Outlying Islands",
      key: "UM",
      label: "United States Minor Outlying Islands"
    },
    {
      value: "Uruguay",
      key: "UY",
      label: "Uruguay"
    },
    {
      value: "Uzbekistan",
      key: "UZ",
      label: "Uzbekistan"
    },
    {
      value: "Vanuatu",
      key: "VU",
      label: "Vanuatu"
    },
    {
      value: "Venezuela",
      key: "VE",
      label: "Venezuela"
    },
    {
      value: "Viet Nam",
      key: "VN",
      label: "Viet Nam"
    },
    {
      value: "Virgin Islands, British",
      key: "VG",
      label: "Virgin Islands, British"
    },
    {
      value: "Virgin Islands, U.S.",
      key: "VI",
      label: "Virgin Islands, U.S."
    },
    {
      value: "Wallis and Futuna",
      key: "WF",
      label: "Wallis and Futuna"
    },
    {
      value: "Western Sahara",
      key: "EH",
      label: "Western Sahara"
    },
    {
      value: "Yemen",
      key: "YE",
      label: "Yemen"
    },
    {
      value: "Zambia",
      key: "ZM",
      label: "Zambia"
    },
    {
      value: "Zimbabwe",
      key: "ZW",
      label: "Zimbabwe"
    }
  ];

}