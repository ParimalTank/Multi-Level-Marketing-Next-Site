"use strict";
exports.id = 6668;
exports.ids = [6668];
exports.modules = {

/***/ 63983:
/***/ ((__unused_webpack_module, exports) => {

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

exports.parse = parse;
exports.serialize = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {}
  var opt = options || {};
  var pairs = str.split(';')
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var index = pair.indexOf('=')

    // skip things that don't look like key=value
    if (index < 0) {
      continue;
    }

    var key = pair.substring(0, index).trim()

    // only assign once
    if (undefined == obj[key]) {
      var val = pair.substring(index + 1, pair.length).trim()

      // quoted values
      if (val[0] === '"') {
        val = val.slice(1, -1)
      }

      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;

    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError('option maxAge is invalid')
    }

    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}


/***/ }),

/***/ 66668:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasCookie = exports.deleteCookie = exports.setCookie = exports.getCookie = exports.getCookies = void 0;
var cookie_1 = __webpack_require__(63983);
var isClientSide = function () { return typeof window !== 'undefined'; };
var stringify = function (value) {
    if (value === void 0) { value = ''; }
    try {
        var result = JSON.stringify(value);
        return (/^[\{\[]/.test(result)) ? result : value;
    }
    catch (e) {
        return value;
    }
};
var decode = function (str) {
    if (!str)
        return str;
    return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
};
var getCookies = function (options) {
    var req;
    if (options)
        req = options.req;
    if (!isClientSide()) {
        // if cookie-parser is used in project get cookies from ctx.req.cookies
        // if cookie-parser isn't used in project get cookies from ctx.req.headers.cookie
        if (req && req.cookies)
            return req.cookies;
        if (req && req.headers && req.headers.cookie)
            return (0, cookie_1.parse)(req.headers.cookie);
        return {};
    }
    var _cookies = {};
    var documentCookies = document.cookie ? document.cookie.split('; ') : [];
    for (var i = 0, len = documentCookies.length; i < len; i++) {
        var cookieParts = documentCookies[i].split('=');
        var _cookie = cookieParts.slice(1).join('=');
        var name_1 = cookieParts[0];
        _cookies[name_1] = _cookie;
    }
    return _cookies;
};
exports.getCookies = getCookies;
var getCookie = function (key, options) {
    var _cookies = (0, exports.getCookies)(options);
    var value = _cookies[key];
    if (value === undefined)
        return undefined;
    return decode(value);
};
exports.getCookie = getCookie;
var setCookie = function (key, data, options) {
    var _cookieOptions;
    var _req;
    var _res;
    if (options) {
        var req = options.req, res = options.res, _options = __rest(options, ["req", "res"]);
        _req = req;
        _res = res;
        _cookieOptions = _options;
    }
    var cookieStr = (0, cookie_1.serialize)(key, stringify(data), __assign({ path: '/' }, _cookieOptions));
    if (!isClientSide()) {
        if (_res && _req) {
            var currentCookies = _res.getHeader('Set-Cookie');
            if (!Array.isArray(currentCookies)) {
                currentCookies = !currentCookies ? [] : [String(currentCookies)];
            }
            _res.setHeader('Set-Cookie', currentCookies.concat(cookieStr));
            if (_req && _req.cookies) {
                var _cookies = _req.cookies;
                data === '' ? delete _cookies[key] : _cookies[key] = stringify(data);
            }
            if (_req && _req.headers && _req.headers.cookie) {
                var _cookies = (0, cookie_1.parse)(_req.headers.cookie);
                data === '' ? delete _cookies[key] : _cookies[key] = stringify(data);
                _req.headers.cookie = Object.entries(_cookies).reduce(function (accum, item) {
                    return accum.concat("".concat(item[0], "=").concat(item[1], ";"));
                }, '');
            }
        }
    }
    else {
        document.cookie = cookieStr;
    }
};
exports.setCookie = setCookie;
var deleteCookie = function (key, options) {
    return (0, exports.setCookie)(key, '', __assign(__assign({}, options), { maxAge: -1 }));
};
exports.deleteCookie = deleteCookie;
var hasCookie = function (key, options) {
    if (!key)
        return false;
    var cookie = (0, exports.getCookies)(options);
    return cookie.hasOwnProperty(key);
};
exports.hasCookie = hasCookie;


/***/ })

};
;