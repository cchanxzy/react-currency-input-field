/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/example.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/react-hot-loader/dist/react-hot-loader.production.min.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-hot-loader/dist/react-hot-loader.production.min.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var React=_interopDefault(__webpack_require__(/*! react */ "react"));function AppContainer(e){return AppContainer.warnAboutHMRDisabled&&(AppContainer.warnAboutHMRDisabled=!0,console.error("React-Hot-Loader: misconfiguration detected, using production version in non-production environment."),console.error("React-Hot-Loader: Hot Module Replacement is not enabled.")),React.Children.only(e.children)}AppContainer.warnAboutHMRDisabled=!1;var hot=function e(){return e.shouldWrapWithAppContainer?function(e){return function(n){return React.createElement(AppContainer,null,React.createElement(e,n))}}:function(e){return e}};hot.shouldWrapWithAppContainer=!1;var areComponentsEqual=function(e,n){return e===n},setConfig=function(){},cold=function(e){return e},configureComponent=function(){};exports.AppContainer=AppContainer,exports.hot=hot,exports.areComponentsEqual=areComponentsEqual,exports.setConfig=setConfig,exports.cold=cold,exports.configureComponent=configureComponent;


/***/ }),

/***/ "./node_modules/react-hot-loader/index.js":
/*!************************************************!*\
  !*** ./node_modules/react-hot-loader/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else if (false) {} else if (typeof window === 'undefined') {
  // this is just server environment
  module.exports = __webpack_require__(/*! ./dist/react-hot-loader.production.min.js */ "./node_modules/react-hot-loader/dist/react-hot-loader.production.min.js");
} else if (true) {
  module.exports = __webpack_require__(/*! ./dist/react-hot-loader.production.min.js */ "./node_modules/react-hot-loader/dist/react-hot-loader.production.min.js");
  module.exports.AppContainer.warnAboutHMRDisabled = true;
  module.exports.hot.shouldWrapWithAppContainer = true;
} else { var jsFeaturesPresent, evalError, evalAllowed; }


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/components/CurrencyInput.tsx":
/*!******************************************!*\
  !*** ./src/components/CurrencyInput.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyInput = void 0;
var react_1 = __importStar(__webpack_require__(/*! react */ "react"));
var utils_1 = __webpack_require__(/*! ./utils */ "./src/components/utils/index.ts");
exports.CurrencyInput = function (_a) {
    var _b = _a.allowDecimals, allowDecimals = _b === void 0 ? true : _b, _c = _a.allowNegativeValue, allowNegativeValue = _c === void 0 ? true : _c, id = _a.id, name = _a.name, className = _a.className, decimalsLimit = _a.decimalsLimit, defaultValue = _a.defaultValue, _d = _a.disabled, disabled = _d === void 0 ? false : _d, userMaxLength = _a.maxLength, value = _a.value, onChange = _a.onChange, onBlurValue = _a.onBlurValue, fixedDecimalLength = _a.fixedDecimalLength, placeholder = _a.placeholder, precision = _a.precision, prefix = _a.prefix, _e = _a.decimalSeparator, decimalSeparator = _e === void 0 ? '.' : _e, _f = _a.groupSeparator, groupSeparator = _f === void 0 ? ',' : _f, _g = _a.turnOffSeparators, turnOffSeparators = _g === void 0 ? false : _g, props = __rest(_a, ["allowDecimals", "allowNegativeValue", "id", "name", "className", "decimalsLimit", "defaultValue", "disabled", "maxLength", "value", "onChange", "onBlurValue", "fixedDecimalLength", "placeholder", "precision", "prefix", "decimalSeparator", "groupSeparator", "turnOffSeparators"]);
    if (decimalSeparator === groupSeparator) {
        throw new Error('decimalSeparator cannot be the same as groupSeparator');
    }
    if (utils_1.isNumber(decimalSeparator)) {
        throw new Error('decimalSeparator cannot be a number');
    }
    if (utils_1.isNumber(groupSeparator)) {
        throw new Error('groupSeparator cannot be a number');
    }
    var formatValueOptions = {
        decimalSeparator: decimalSeparator,
        groupSeparator: groupSeparator,
        turnOffSeparators: turnOffSeparators,
        prefix: prefix,
    };
    var cleanValueOptions = {
        decimalSeparator: decimalSeparator,
        groupSeparator: groupSeparator,
        allowDecimals: allowDecimals,
        decimalsLimit: decimalsLimit || fixedDecimalLength || 2,
        allowNegativeValue: allowNegativeValue,
        prefix: prefix,
    };
    var _defaultValue = defaultValue !== undefined
        ? utils_1.formatValue(__assign({ value: String(defaultValue) }, formatValueOptions))
        : '';
    var _h = react_1.useState(_defaultValue), stateValue = _h[0], setStateValue = _h[1];
    var _j = react_1.useState(0), cursor = _j[0], setCursor = _j[1];
    var inputRef = react_1.useRef(null);
    var onFocus = function () { return (stateValue ? stateValue.length : 0); };
    var processChange = function (_a) {
        var _b = _a.target, value = _b.value, selectionStart = _b.selectionStart;
        var valueOnly = utils_1.cleanValue(__assign({ value: String(value) }, cleanValueOptions));
        if (!valueOnly) {
            onChange && onChange(undefined, name);
            setStateValue('');
            return;
        }
        if (userMaxLength && valueOnly.length > userMaxLength) {
            return;
        }
        if (valueOnly === '-') {
            onChange && onChange(undefined, name);
            setStateValue(value);
            return;
        }
        var formattedValue = utils_1.formatValue(__assign({ value: valueOnly }, formatValueOptions));
        /* istanbul ignore next */
        if (selectionStart) {
            var cursor_1 = selectionStart + (formattedValue.length - value.length) || 1;
            setCursor(cursor_1);
        }
        setStateValue(formattedValue);
        onChange && onChange(valueOnly, name);
    };
    var handleOnBlur = function (_a) {
        var value = _a.target.value;
        var valueOnly = utils_1.cleanValue(__assign({ value: value }, cleanValueOptions));
        if (valueOnly === '-' || !valueOnly) {
            onBlurValue && onBlurValue(undefined, name);
            setStateValue('');
            return;
        }
        var fixedDecimals = utils_1.fixedDecimalValue(valueOnly, decimalSeparator, fixedDecimalLength);
        // Add padding or trim value to precision
        var newValue = utils_1.padTrimValue(fixedDecimals, decimalSeparator, precision || fixedDecimalLength);
        onBlurValue && onBlurValue(newValue, name);
        var formattedValue = utils_1.formatValue(__assign({ value: newValue }, formatValueOptions));
        setStateValue(formattedValue);
    };
    /* istanbul ignore next */
    react_1.useEffect(function () {
        if (inputRef && inputRef.current) {
            inputRef.current.setSelectionRange(cursor, cursor);
        }
    }, [cursor, inputRef]);
    var formattedPropsValue = value !== undefined ? utils_1.formatValue(__assign({ value: String(value) }, formatValueOptions)) : undefined;
    return (react_1.default.createElement("input", __assign({ type: "text", inputMode: "decimal", id: id, name: name, className: className, onChange: processChange, onBlur: handleOnBlur, onFocus: onFocus, placeholder: placeholder, disabled: disabled, value: formattedPropsValue !== undefined && stateValue !== '-' ? formattedPropsValue : stateValue, ref: inputRef }, props)));
};
exports.default = exports.CurrencyInput;


/***/ }),

/***/ "./src/components/utils/addSeparators.ts":
/*!***********************************************!*\
  !*** ./src/components/utils/addSeparators.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.addSeparators = void 0;
/**
 * Add group separator to value eg. 1000 > 1,000
 */
exports.addSeparators = function (value, separator) {
    if (separator === void 0) { separator = ','; }
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};


/***/ }),

/***/ "./src/components/utils/cleanValue.ts":
/*!********************************************!*\
  !*** ./src/components/utils/cleanValue.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanValue = void 0;
var parseAbbrValue_1 = __webpack_require__(/*! ./parseAbbrValue */ "./src/components/utils/parseAbbrValue.ts");
var removeSeparators_1 = __webpack_require__(/*! ./removeSeparators */ "./src/components/utils/removeSeparators.ts");
var removeInvalidChars_1 = __webpack_require__(/*! ./removeInvalidChars */ "./src/components/utils/removeInvalidChars.ts");
var escapeRegExp_1 = __webpack_require__(/*! ./escapeRegExp */ "./src/components/utils/escapeRegExp.ts");
/**
 * Remove prefix, separators and extra decimals from value
 */
exports.cleanValue = function (_a) {
    var value = _a.value, _b = _a.groupSeparator, groupSeparator = _b === void 0 ? ',' : _b, _c = _a.decimalSeparator, decimalSeparator = _c === void 0 ? '.' : _c, _d = _a.allowDecimals, allowDecimals = _d === void 0 ? true : _d, _e = _a.decimalsLimit, decimalsLimit = _e === void 0 ? 2 : _e, _f = _a.allowNegativeValue, allowNegativeValue = _f === void 0 ? true : _f, _g = _a.prefix, prefix = _g === void 0 ? '' : _g;
    var isNegative = value.includes('-');
    var _h = RegExp("(\\d+)-?" + escapeRegExp_1.escapeRegExp(prefix)).exec(value) || [], prefixWithValue = _h[0], preValue = _h[1];
    var withoutPrefix = prefix ? value.replace(prefixWithValue, '').concat(preValue) : value;
    var withoutSeparators = removeSeparators_1.removeSeparators(withoutPrefix, groupSeparator);
    var withoutInvalidChars = removeInvalidChars_1.removeInvalidChars(withoutSeparators, [
        groupSeparator,
        decimalSeparator,
        'k',
        'm',
        'b',
    ]);
    var parsed = parseAbbrValue_1.parseAbbrValue(withoutInvalidChars, decimalSeparator) || withoutInvalidChars;
    var includeNegative = isNegative && allowNegativeValue ? '-' : '';
    if (String(parsed).includes(decimalSeparator)) {
        var _j = withoutInvalidChars.split(decimalSeparator), int = _j[0], decimals = _j[1];
        var trimmedDecimals = decimalsLimit ? decimals.slice(0, decimalsLimit) : decimals;
        var includeDecimals = allowDecimals ? "" + decimalSeparator + trimmedDecimals : '';
        return "" + includeNegative + int + includeDecimals;
    }
    return "" + includeNegative + parsed;
};


/***/ }),

/***/ "./src/components/utils/escapeRegExp.ts":
/*!**********************************************!*\
  !*** ./src/components/utils/escapeRegExp.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeRegExp = void 0;
/**
 * Escape regex char
 *
 * See: https://stackoverflow.com/questions/17885855/use-dynamic-variable-string-as-regex-pattern-in-javascript
 */
exports.escapeRegExp = function (stringToGoIntoTheRegex) {
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};


/***/ }),

/***/ "./src/components/utils/fixedDecimalValue.ts":
/*!***************************************************!*\
  !*** ./src/components/utils/fixedDecimalValue.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.fixedDecimalValue = void 0;
exports.fixedDecimalValue = function (value, decimalSeparator, fixedDecimalLength) {
    if (fixedDecimalLength && value.length > 1) {
        if (value.includes(decimalSeparator)) {
            var _a = value.split(decimalSeparator), int = _a[0], decimals = _a[1];
            if (decimals.length > fixedDecimalLength) {
                return "" + int + decimalSeparator + decimals.slice(0, fixedDecimalLength);
            }
        }
        var reg = value.length > fixedDecimalLength
            ? new RegExp("(\\d+)(\\d{" + fixedDecimalLength + "})")
            : new RegExp("(\\d)(\\d+)");
        var match = value.match(reg);
        if (match) {
            var int = match[1], decimals = match[2];
            return "" + int + decimalSeparator + decimals;
        }
    }
    return value;
};


/***/ }),

/***/ "./src/components/utils/formatValue.ts":
/*!*********************************************!*\
  !*** ./src/components/utils/formatValue.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.formatValue = void 0;
var addSeparators_1 = __webpack_require__(/*! ./addSeparators */ "./src/components/utils/addSeparators.ts");
/**
 * Format value with commas and prefix
 */
exports.formatValue = function (_a) {
    var _value = _a.value, _b = _a.decimalSeparator, decimalSeparator = _b === void 0 ? '.' : _b, _c = _a.groupSeparator, groupSeparator = _c === void 0 ? ',' : _c, _d = _a.turnOffSeparators, turnOffSeparators = _d === void 0 ? false : _d, prefix = _a.prefix;
    if (_value === '' || _value === undefined) {
        return '';
    }
    var value = String(_value);
    if (value === '-') {
        return '-';
    }
    var isNegative = value.includes('-');
    var _e = value.split(decimalSeparator), int = _e[0], decimals = _e[1];
    var valueOnlyInt = isNegative ? int.replace('-', '') : int;
    var formattedInt = turnOffSeparators
        ? valueOnlyInt
        : addSeparators_1.addSeparators(valueOnlyInt, groupSeparator);
    var includePrefix = prefix ? prefix : '';
    var includeNegative = isNegative ? '-' : '';
    var includeDecimals = value.includes(decimalSeparator) ? "" + decimalSeparator + decimals : '';
    return "" + includeNegative + includePrefix + formattedInt + includeDecimals;
};


/***/ }),

/***/ "./src/components/utils/index.ts":
/*!***************************************!*\
  !*** ./src/components/utils/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./cleanValue */ "./src/components/utils/cleanValue.ts"), exports);
__exportStar(__webpack_require__(/*! ./fixedDecimalValue */ "./src/components/utils/fixedDecimalValue.ts"), exports);
__exportStar(__webpack_require__(/*! ./formatValue */ "./src/components/utils/formatValue.ts"), exports);
__exportStar(__webpack_require__(/*! ./isNumber */ "./src/components/utils/isNumber.ts"), exports);
__exportStar(__webpack_require__(/*! ./padTrimValue */ "./src/components/utils/padTrimValue.ts"), exports);


/***/ }),

/***/ "./src/components/utils/isNumber.ts":
/*!******************************************!*\
  !*** ./src/components/utils/isNumber.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
exports.isNumber = function (input) { return RegExp(/\d/, 'gi').test(input); };


/***/ }),

/***/ "./src/components/utils/padTrimValue.ts":
/*!**********************************************!*\
  !*** ./src/components/utils/padTrimValue.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.padTrimValue = void 0;
exports.padTrimValue = function (value, decimalSeparator, precision) {
    if (decimalSeparator === void 0) { decimalSeparator = '.'; }
    if (!precision || value === '' || value === undefined) {
        return value;
    }
    if (!value.match(/\d/g)) {
        return '';
    }
    var _a = value.split(decimalSeparator), int = _a[0], decimals = _a[1];
    var newValue = decimals || '';
    if (newValue.length < precision) {
        while (newValue.length < precision) {
            newValue += '0';
        }
    }
    else {
        newValue = newValue.slice(0, precision);
    }
    return "" + int + decimalSeparator + newValue;
};


/***/ }),

/***/ "./src/components/utils/parseAbbrValue.ts":
/*!************************************************!*\
  !*** ./src/components/utils/parseAbbrValue.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAbbrValue = exports.abbrValue = void 0;
var escapeRegExp_1 = __webpack_require__(/*! ./escapeRegExp */ "./src/components/utils/escapeRegExp.ts");
/**
 * Abbreviate number eg. 1000 = 1k
 *
 * Source: https://stackoverflow.com/a/9345181
 */
exports.abbrValue = function (value, decimalSeparator, _decimalPlaces) {
    if (decimalSeparator === void 0) { decimalSeparator = '.'; }
    if (_decimalPlaces === void 0) { _decimalPlaces = 10; }
    if (value > 999) {
        var valueLength = ('' + value).length;
        var p = Math.pow;
        var d = p(10, _decimalPlaces);
        valueLength -= valueLength % 3;
        var abbrValue_1 = Math.round((value * d) / p(10, valueLength)) / d + ' kMGTPE'[valueLength / 3];
        return abbrValue_1.replace('.', decimalSeparator);
    }
    return String(value);
};
var abbrMap = { k: 1000, m: 1000000, b: 1000000000 };
/**
 * Parse a value with abbreviation e.g 1k = 1000
 */
exports.parseAbbrValue = function (value, decimalSeparator) {
    if (decimalSeparator === void 0) { decimalSeparator = '.'; }
    var reg = new RegExp("(\\d+(" + escapeRegExp_1.escapeRegExp(decimalSeparator) + "\\d+)?)([kmb])$", 'i');
    var match = value.match(reg);
    if (match) {
        var digits = match[1], abbr = match[3];
        var multiplier = abbr ? abbrMap[abbr.toLowerCase()] : null;
        if (digits && multiplier) {
            return Number(digits.replace(decimalSeparator, '.')) * multiplier;
        }
    }
    return undefined;
};


/***/ }),

/***/ "./src/components/utils/removeInvalidChars.ts":
/*!****************************************************!*\
  !*** ./src/components/utils/removeInvalidChars.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.removeInvalidChars = void 0;
var escapeRegExp_1 = __webpack_require__(/*! ./escapeRegExp */ "./src/components/utils/escapeRegExp.ts");
/**
 * Remove invalid characters
 */
exports.removeInvalidChars = function (value, validChars) {
    var chars = escapeRegExp_1.escapeRegExp(validChars.join(''));
    var reg = new RegExp("[^\\d" + chars + "]", 'gi');
    return value.replace(reg, '');
};


/***/ }),

/***/ "./src/components/utils/removeSeparators.ts":
/*!**************************************************!*\
  !*** ./src/components/utils/removeSeparators.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSeparators = void 0;
var escapeRegExp_1 = __webpack_require__(/*! ./escapeRegExp */ "./src/components/utils/escapeRegExp.ts");
/**
 * Remove group separator from value eg. 1,000 > 1000
 */
exports.removeSeparators = function (value, separator) {
    if (separator === void 0) { separator = ','; }
    var reg = new RegExp(escapeRegExp_1.escapeRegExp(separator), 'g');
    return value.replace(reg, '');
};


/***/ }),

/***/ "./src/example.tsx":
/*!*************************!*\
  !*** ./src/example.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
var react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "react-dom"));
var Example1_1 = __importDefault(__webpack_require__(/*! ./examples/Example1 */ "./src/examples/Example1.tsx"));
var Example2_1 = __importDefault(__webpack_require__(/*! ./examples/Example2 */ "./src/examples/Example2.tsx"));
var Example3_1 = __importDefault(__webpack_require__(/*! ./examples/Example3 */ "./src/examples/Example3.tsx"));
react_dom_1.default.render(react_1.default.createElement(Example1_1.default, null), document.getElementById('example-1'));
react_dom_1.default.render(react_1.default.createElement(Example2_1.default, null), document.getElementById('example-2'));
react_dom_1.default.render(react_1.default.createElement(Example3_1.default, null), document.getElementById('example-3'));


/***/ }),

/***/ "./src/examples/Example1.tsx":
/*!***********************************!*\
  !*** ./src/examples/Example1.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example1 = void 0;
var react_1 = __importStar(__webpack_require__(/*! react */ "react"));
var CurrencyInput_1 = __importDefault(__webpack_require__(/*! ../components/CurrencyInput */ "./src/components/CurrencyInput.tsx"));
exports.Example1 = function () {
    var limit = 1000;
    var prefix = '£';
    var _a = react_1.useState(''), errorMessage = _a[0], setErrorMessage = _a[1];
    var _b = react_1.useState(''), className = _b[0], setClassName = _b[1];
    var _c = react_1.useState(999.99), value = _c[0], setValue = _c[1];
    var _d = react_1.useState(' '), rawValue = _d[0], setRawValue = _d[1];
    var _e = react_1.useState(' '), rawBlurValue = _e[0], setRawBlurValue = _e[1];
    /**
     * Handle validation
     */
    var validateValue = function (value) {
        var rawValue = value === undefined ? 'undefined' : value;
        setRawValue(rawValue || ' ');
        if (!value) {
            setClassName('');
            setValue('');
            return;
        }
        if (Number.isNaN(Number(value))) {
            setErrorMessage('Please enter a valid number');
            setClassName('is-invalid');
            return;
        }
        if (Number(value) > limit) {
            setErrorMessage("Max: " + prefix + limit);
            setClassName('is-invalid');
            setValue(value);
            return;
        }
        setClassName('is-valid');
        setValue(value);
    };
    var handleOnBlurValue = function (value) {
        var rawBlurValue = value === undefined ? 'undefined' : value;
        setRawBlurValue(rawBlurValue || ' ');
    };
    return (react_1.default.createElement("div", { className: "row" },
        react_1.default.createElement("div", { className: "col-12 mb-4" },
            react_1.default.createElement("a", { href: "https://github.com/cchanxzy/react-currency-input-field/blob/master/src/examples/Example1.tsx" },
                react_1.default.createElement("h2", null, "Example 1")),
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null, "'\u00A3'",
                    " prefix"),
                react_1.default.createElement("li", null, "Allows decimals (up to 2 decimal places)"),
                react_1.default.createElement("li", null, "Has default value (999.99)"),
                react_1.default.createElement("li", null, "Value is set programmatically (passed in via props)")),
            react_1.default.createElement("form", { className: "needs-validation" },
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement("div", { className: "form-group col" },
                        react_1.default.createElement("label", { htmlFor: "validationCustom01" }, "Please enter a value (max \u00A31,000)"),
                        react_1.default.createElement(CurrencyInput_1.default, { id: "validationCustom01", name: "input-1", defaultValue: 999.99, className: "form-control " + className, value: value, onChange: validateValue, onBlurValue: handleOnBlurValue, prefix: prefix, precision: 2 }),
                        react_1.default.createElement("div", { className: "invalid-feedback" }, errorMessage)),
                    react_1.default.createElement("div", { className: "form-group col" },
                        react_1.default.createElement("pre", { className: "h-100 p-3 bg-dark text-white" },
                            react_1.default.createElement("div", { className: "row" },
                                react_1.default.createElement("div", { className: "col-6" },
                                    react_1.default.createElement("div", { className: "text-muted mr-3" }, "onChange:"),
                                    rawValue),
                                react_1.default.createElement("div", { className: "col-6" },
                                    react_1.default.createElement("div", { className: "text-muted mr-3" }, "onBlurValue:"),
                                    rawBlurValue)))))))));
};
exports.default = exports.Example1;


/***/ }),

/***/ "./src/examples/Example2.tsx":
/*!***********************************!*\
  !*** ./src/examples/Example2.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example2 = void 0;
var react_1 = __importStar(__webpack_require__(/*! react */ "react"));
var react_hot_loader_1 = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
var CurrencyInput_1 = __importDefault(__webpack_require__(/*! ../components/CurrencyInput */ "./src/components/CurrencyInput.tsx"));
exports.Example2 = function () {
    var _a = react_1.useState(''), errorMessage = _a[0], setErrorMessage = _a[1];
    var _b = react_1.useState(''), className = _b[0], setClassName = _b[1];
    var _c = react_1.useState(' '), rawValue = _c[0], setRawValue = _c[1];
    var _d = react_1.useState(' '), rawBlurValue = _d[0], setRawBlurValue = _d[1];
    var validateValue = function (value) {
        var rawValue = value === undefined ? 'undefined' : value;
        setRawValue(rawValue || ' ');
        if (!value) {
            setClassName('');
        }
        else if (Number.isNaN(Number(value))) {
            setErrorMessage('Please enter a valid number');
            setClassName('is-invalid');
        }
        else {
            setClassName('is-valid');
        }
    };
    var handleOnBlurValue = function (value) {
        var rawBlurValue = value === undefined ? 'undefined' : value;
        setRawBlurValue(rawBlurValue || ' ');
    };
    return (react_1.default.createElement("div", { className: "row" },
        react_1.default.createElement("div", { className: "col-12 mb-4" },
            react_1.default.createElement("a", { href: "https://github.com/cchanxzy/react-currency-input-field/blob/master/src/examples/Example2.tsx" },
                react_1.default.createElement("h2", null, "Example 2")),
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null, "'$'",
                    " prefix"),
                react_1.default.createElement("li", null, "Has placeholder"),
                react_1.default.createElement("li", null, "Does not allow decimals"),
                react_1.default.createElement("li", null, "Value is stored via component state")),
            react_1.default.createElement("form", { className: "needs-validation" },
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement("div", { className: "col" },
                        react_1.default.createElement("label", { htmlFor: "validation-example-2-field" }, "Please enter a value:"),
                        react_1.default.createElement(CurrencyInput_1.default, { id: "validation-example-2-field", placeholder: "$1,234,567", allowDecimals: false, className: "form-control " + className, onChange: validateValue, onBlurValue: handleOnBlurValue, prefix: '$' }),
                        react_1.default.createElement("div", { className: "invalid-feedback" }, errorMessage)),
                    react_1.default.createElement("div", { className: "form-group col" },
                        react_1.default.createElement("pre", { className: "h-100 p-3 bg-dark text-white" },
                            react_1.default.createElement("div", { className: "row" },
                                react_1.default.createElement("div", { className: "col-6" },
                                    react_1.default.createElement("div", { className: "text-muted mr-3" }, "onChange:"),
                                    rawValue),
                                react_1.default.createElement("div", { className: "col-6" },
                                    react_1.default.createElement("div", { className: "text-muted mr-3" }, "onBlurValue:"),
                                    rawBlurValue)))))))));
};
exports.default = react_hot_loader_1.hot(module)(exports.Example2);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/examples/Example3.tsx":
/*!***********************************!*\
  !*** ./src/examples/Example3.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example3 = void 0;
var react_1 = __importStar(__webpack_require__(/*! react */ "react"));
var __1 = __importStar(__webpack_require__(/*! ../ */ "./src/index.ts"));
function reducer(state, _a) {
    var _b;
    var fieldName = _a.fieldName, value = _a.value;
    return __assign(__assign({}, state), (_b = {}, _b[fieldName] = value, _b));
}
var initialState = {
    field1: {
        value: 100,
        validationClass: '',
        errorMessage: '',
    },
    field2: {
        value: 200,
        validationClass: '',
        errorMessage: '',
    },
};
exports.Example3 = function () {
    var prefix = '£';
    var _a = react_1.useReducer(reducer, initialState), state = _a[0], dispatch = _a[1];
    var handleOnChange = function (_value, fieldName) {
        if (!fieldName) {
            return;
        }
        if (!_value) {
            return dispatch({
                fieldName: fieldName,
                value: {
                    value: undefined,
                    validationClass: '',
                    errorMessage: '',
                },
            });
        }
        var value = Number(_value);
        if (!Number.isNaN(value)) {
            dispatch({
                fieldName: fieldName,
                value: {
                    value: value,
                    validationClass: 'is-valid',
                    errorMessage: '',
                },
            });
        }
        else {
            dispatch({
                fieldName: fieldName,
                value: {
                    value: value,
                    validationClass: 'is-invalid',
                    errorMessage: 'Please enter a valid number',
                },
            });
        }
    };
    var total = (state.field1.value || 0) + (state.field2.value || 0);
    return (react_1.default.createElement("div", { className: "row" },
        react_1.default.createElement("div", { className: "col-12 mb-4" },
            react_1.default.createElement("a", { href: "https://github.com/cchanxzy/react-currency-input-field/blob/master/src/examples/Example3.tsx" },
                react_1.default.createElement("h2", null, "Example 3")),
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null, "Add two values together"),
                react_1.default.createElement("li", null, "Format the total value")),
            react_1.default.createElement("form", { className: "needs-validation" },
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement("div", { className: "col" },
                        react_1.default.createElement("label", { htmlFor: "validation-example-3-field1" }, "Value 1"),
                        react_1.default.createElement(__1.default, { id: "validation-example-3-field1", name: "field1", className: "form-control " + state.field1.validationClass, value: state.field1.value, onChange: handleOnChange, prefix: prefix }),
                        react_1.default.createElement("div", { className: "invalid-feedback" }, state.field1.errorMessage)),
                    react_1.default.createElement("div", { className: "col" },
                        react_1.default.createElement("label", { htmlFor: "validation-example-3-field2" }, "Value 2"),
                        react_1.default.createElement(__1.default, { id: "validation-example-3-field2", name: "field2", className: "form-control " + state.field2.validationClass, value: state.field2.value, onChange: handleOnChange, prefix: prefix }),
                        react_1.default.createElement("div", { className: "invalid-feedback" }, state.field1.errorMessage)),
                    react_1.default.createElement("div", { className: "col" },
                        react_1.default.createElement("div", { className: "" },
                            react_1.default.createElement("label", null, "Total:"),
                            react_1.default.createElement("div", { className: "h3" }, __1.formatValue({ prefix: prefix, value: total })))))))));
};
exports.default = exports.Example3;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CurrencyInput_1 = __importDefault(__webpack_require__(/*! ./components/CurrencyInput */ "./src/components/CurrencyInput.tsx"));
exports.default = CurrencyInput_1.default;
var formatValue_1 = __webpack_require__(/*! ./components/utils/formatValue */ "./src/components/utils/formatValue.ts");
Object.defineProperty(exports, "formatValue", { enumerable: true, get: function () { return formatValue_1.formatValue; } });


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=index.js.map