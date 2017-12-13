"use strict";
var codes

var registeredLocales = {};

/*
 * All codes map to ISO 3166-1 alpha-2
 */
var alpha2 = {},
  alpha3 = {},
  numeric = {},
  invertedNumeric = {};
  
 $.ajaxSetup({
async: false
});
  
function initializeCodes(){
	$.getJSON("country-codes/codes.json", function(json) {
		codes = json; // this will show the info it in firebug console
	});
	$.getJSON("country-codes/en.json", function(json) {
		 registerLocale(json); // this will show the info it in firebug console
	});
	codes.forEach(function(codeInformation) {
		  var s = codeInformation;
		  alpha2[s[0]] = s[1];
		  alpha3[s[1]] = s[0];
		  numeric[s[2]] = s[0];
		  invertedNumeric[s[0]] = s[2];
		});
}

function formatNumericCode(code) {
  return String(code).padStart(3, "0");
}

function registerLocale(localeData) {
  if (!localeData.locale) {
    throw new TypeError('Missing localeData.locale');
  }

  if (!localeData.countries) {
    throw new TypeError('Missing localeData.countries');
  }

  registeredLocales[localeData.locale] = localeData.countries;
}


/*
 * @param code Alpha-3 code
 * @return Alpha-2 code or undefined
 */
function alpha3ToAlpha2(code) {
  return alpha3[code];
}


/*
 * @param code Alpha-2 code
 * @return Alpha-3 code or undefined
 */
function alpha2ToAlpha3(code) {
  return alpha2[code];
}


/*
 * @param code Alpha-3 code
 * @return Numeric code or undefined
 */
function alpha3ToNumeric(code) {
  return invertedNumeric[alpha3ToAlpha2(code)];
}


/*
 * @param code Alpha-2 code
 * @return Numeric code or undefined
 */
function alpha2ToNumeric(code) {
  return invertedNumeric[code];
}


/*
 * @param code Numeric code
 * @return Alpha-3 code or undefined
 */
function numericToAlpha3(code) {
  var padded = formatNumericCode(code);
  return alpha2ToAlpha3(numeric[padded]);
}

/*
 * @param code Numeric code
 * @return Alpha-2 code or undefined
 */
function numericToAlpha2(code) {
  var padded = formatNumericCode(code);
  return numeric[padded];
}


/*
 * @param code ISO 3166-1 alpha-2, alpha-3 or numeric code
 * @return ISO 3166-1 alpha-3
 */
function toAlpha3(code) {
  if (typeof code === "string") {
    if (/^[0-9]*$/.test(code)) {
      return numericToAlpha3(code);
    }
    if(code.length === 2) {
      return alpha2ToAlpha3(code.toUpperCase());
    }
    if (code.length === 3) {
      return code.toUpperCase();
    }
  }
  if (typeof code === "number") {
    return numericToAlpha3(code);
  }
  return undefined;
}


/*
 * @param code ISO 3166-1 alpha-2, alpha-3 or numeric code
 * @return ISO 3166-1 alpha-2
 */
function toAlpha2(code) {
  if (typeof code === "string") {
    if (/^[0-9]*$/.test(code)) {
      return numericToAlpha2(code);
    }
    if (code.length === 2) {
      return code.toUpperCase();
    }
    if(code.length === 3) {
      return alpha3ToAlpha2(code.toUpperCase());
    }
  }
  if (typeof code === "number") {
    return numericToAlpha2(code);
  }
  return undefined;
}


/*
 * @param code ISO 3166-1 alpha-2, alpha-3 or numeric code
 * @param lang language for country name
 * @return name or undefined
 */
function getName (code, lang) {
  try {
    var d = registeredLocales[lang.toLowerCase()];
    return d[toAlpha2(code)];
  } catch (err) {
    return undefined;
  }
};

/*
 * @param lang language for country names
 * @return Object of country code mapped to county name
 */
function getNames(lang) {
  var d = registeredLocales[lang.toLowerCase()];
  if (d === undefined) {
    return {};
  }
  return d;
};

/*
 * @param name name
 * @param lang language for country name
 * @return ISO 3166-1 alpha-2 or undefined
 */
function getAlpha2Code(name, lang) {
  try {
    var p, codenames = registeredLocales[lang.toLowerCase()];
    for (p in codenames) {
      if (codenames.hasOwnProperty(p)) {
        if (codenames[p].toLowerCase() === name.toLowerCase()) {
          return p;
        }
      }
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
};

/*
 * @return Object of alpha-2 codes mapped to alpha-3 codes
 */
function getAlpha2Codes() {
  return alpha2;
};

/*
 * @param name name
 * @param lang language for country name
 * @return ISO 3166-1 alpha-3 or undefined
 */
function getAlpha3Code(name, lang) {
  var alpha2 = getAlpha2Code(name, lang);
  if (alpha2) {
    return toAlpha3(alpha2);
  } else {
    return undefined;
  }
};

/*
 * @return Object of alpha-3 codes mapped to alpha-2 codes
 */
function getAlpha3Codes() {
  return alpha3;
};

/*
 * @return Object of numeric codes mapped to alpha-2 codes
 */
function getNumericCodes() {
  return numeric;
};

/*
 * @return Array of supported languages
 */
function langs() {
  return Object.keys(registeredLocales);
};
