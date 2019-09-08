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
} else { var jsFeaturesPresent, evalAllowed; }


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
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
		Object.defineProperty(module, "exports", {
			enumerable: true
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
/*! exports provided: CurrencyInput, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyInput", function() { return CurrencyInput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "./src/components/utilities.ts");


var CurrencyInput = function (_a) {
    var id = _a.id, className = _a.className, onChange = _a.onChange, placeholder = _a.placeholder, prefix = _a.prefix;
    var _b = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''), value = _b[0], setValue = _b[1];
    var processChange = function (event) {
        var eventVal = event.target.value;
        var stringValue = eventVal;
        if (prefix) {
            stringValue = stringValue.replace(prefix, '');
        }
        if (stringValue === '' || stringValue === null) {
            onChange(null);
            return setValue('');
        }
        var intValue = parseInt(Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeCommas"])(stringValue), 10);
        if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["checkIsValidNumber"])(intValue)) {
            var newValue = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addCommas"])(intValue);
            if (prefix) {
                newValue = "" + prefix + newValue;
            }
            setValue(newValue);
        }
        onChange(intValue);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", { type: "string", id: id, className: className, onChange: processChange, placeholder: placeholder, value: value }));
};
/* harmony default export */ __webpack_exports__["default"] = (CurrencyInput);


/***/ }),

/***/ "./src/components/utilities.ts":
/*!*************************************!*\
  !*** ./src/components/utilities.ts ***!
  \*************************************/
/*! exports provided: addCommas, removeCommas, checkIsValidNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCommas", function() { return addCommas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCommas", function() { return removeCommas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkIsValidNumber", function() { return checkIsValidNumber; });
var addCommas = function (value) { return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
var removeCommas = function (value) { return value.replace(/,/g, ''); };
var checkIsValidNumber = function (input) {
    if (input < 0 || isNaN(input)) {
        return false;
    }
    return true;
};


/***/ }),

/***/ "./src/example.tsx":
/*!*************************!*\
  !*** ./src/example.tsx ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _examples_Example1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./examples/Example1 */ "./src/examples/Example1.tsx");
/* harmony import */ var _examples_Example2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./examples/Example2 */ "./src/examples/Example2.tsx");




react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_examples_Example1__WEBPACK_IMPORTED_MODULE_2__["default"], null), document.getElementById('example-1'));
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_examples_Example2__WEBPACK_IMPORTED_MODULE_3__["default"], null), document.getElementById('example-2'));


/***/ }),

/***/ "./src/examples/Example1.tsx":
/*!***********************************!*\
  !*** ./src/examples/Example1.tsx ***!
  \***********************************/
/*! exports provided: Example1, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Example1", function() { return Example1; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_CurrencyInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/CurrencyInput */ "./src/components/CurrencyInput.tsx");


var Example1 = function () {
    var limit = 1000;
    var prefix = '£';
    var _a = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(), errorMessage = _a[0], setErrorMessage = _a[1];
    var _b = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(), className = _b[0], setClassName = _b[1];
    var validateValue = function (value) {
        if (value === null) {
            setClassName('');
        }
        else if (Number.isNaN(value)) {
            setErrorMessage('Please enter a valid number');
            setClassName('is-invalid');
        }
        else if (value > limit) {
            setErrorMessage("Max: " + prefix + limit);
            setClassName('is-invalid');
        }
        else {
            setClassName('is-valid');
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", { className: "needs-validation" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "form-row" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "col-sm-12" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", { htmlFor: "validationCustom01" }, "Please enter a value (max \u00A31,000)"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CurrencyInput__WEBPACK_IMPORTED_MODULE_1__["default"], { id: "validationCustom01", placeholder: "\u00A31,000", className: "form-control " + className, onChange: validateValue, prefix: prefix }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "invalid-feedback" }, errorMessage)))));
};
/* harmony default export */ __webpack_exports__["default"] = (Example1);


/***/ }),

/***/ "./src/examples/Example2.tsx":
/*!***********************************!*\
  !*** ./src/examples/Example2.tsx ***!
  \***********************************/
/*! exports provided: Example2, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Example2", function() { return Example2; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_CurrencyInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/CurrencyInput */ "./src/components/CurrencyInput.tsx");



var Example2 = function () {
    var _a = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(), errorMessage = _a[0], setErrorMessage = _a[1];
    var _b = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(), className = _b[0], setClassName = _b[1];
    var validateValue = function (value) {
        if (value === null) {
            setClassName('');
        }
        else if (Number.isNaN(value)) {
            setErrorMessage('Please enter a valid number');
            setClassName('is-invalid');
        }
        else {
            setClassName('is-valid');
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", { className: "needs-validation" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "form-row" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "col-sm-12" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", { htmlFor: "validationCustom01" }, "Please input a value:"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CurrencyInput__WEBPACK_IMPORTED_MODULE_2__["default"], { id: "validationCustom01", placeholder: "$1999", className: "form-control " + className, onChange: validateValue, prefix: '$' }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "invalid-feedback" }, errorMessage)))));
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Example2));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

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