"use strict";
(() => {
var exports = {};
exports.id = 6976;
exports.ids = [6976];
exports.modules = {

/***/ 11185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 14300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 54934:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./src/app/api/verify/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(42394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(69692);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(19513);
// EXTERNAL MODULE: ./src/models/PackageHistory.ts
var PackageHistory = __webpack_require__(26234);
// EXTERNAL MODULE: ./src/models/User.ts
var User = __webpack_require__(66155);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(89335);
// EXTERNAL MODULE: ./node_modules/jsonwebtoken/index.js
var jsonwebtoken = __webpack_require__(69877);
var jsonwebtoken_default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken);
;// CONCATENATED MODULE: ./src/app/api/verify/route.ts




async function POST(request) {
    try {
        const userData = await request.json();
        // After Reset Password
        if (userData.token) {
            const secret = "mlm123";
            const decoded = jsonwebtoken_default().verify(userData.token, secret);
            const userEmail = decoded.email;
            const user = await User/* default */.Z.findOne({
                email: userEmail
            });
            if (user) {
                if (Number(user.verificationCode) === Number(userData.otp)) {
                    return next_response/* default */.Z.json({
                        status: 200
                    });
                } else {
                    return next_response/* default */.Z.json({
                        message: "Invalid OTP"
                    }, {
                        status: 500
                    });
                }
            } else {
                return next_response/* default */.Z.json({
                    message: "Something went wrong"
                }, {
                    status: 500
                });
            }
        }
        // After Registration
        if (userData.id) {
            const user = await User/* default */.Z.findOne({
                _id: userData.id
            });
            if (user) {
                if (Number(user.verificationCode) === Number(userData.otp)) {
                    await User/* default */.Z.findOneAndUpdate({
                        _id: userData.id
                    }, {
                        verify: true,
                        isActive: true
                    });
                    // New User comes from the referral and add that user to this purchase package
                    // const findPackage = await PackageHistory.findOne({ referralcode: user.referralFrom });
                    // Add new User into a Package
                    // const referralUser = [...findPackage.numberofUsers, user.email];
                    await PackageHistory/* default */.Z.findOneAndUpdate({
                        referralcode: user.referralFrom
                    });
                    return next_response/* default */.Z.json({
                        status: 200
                    });
                } else {
                    return next_response/* default */.Z.json({
                        message: "Invalid OTP"
                    }, {
                        status: 500
                    });
                }
            } else {
                return next_response/* default */.Z.json({
                    message: "Something went wrong"
                }, {
                    status: 500
                });
            }
        }
    } catch (error) {
        console.log("error: ", error);
        return next_response/* default */.Z.json({
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fverify%2Froute&name=app%2Fapi%2Fverify%2Froute&pagePath=private-next-app-dir%2Fapi%2Fverify%2Froute.ts&appDir=%2FUsers%2Fmac%2FDocuments%2Funtitled%20folder%2Fmlm%20user%20penal%2Fsrc%2Fapp&appPaths=%2Fapi%2Fverify%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/verify/route",
        pathname: "/api/verify",
        filename: "route",
        bundlePath: "app/api/verify/route"
    },
    resolvedPagePath: "/Users/mac/Documents/untitled folder/mlm user penal/src/app/api/verify/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/verify/route";


//# sourceMappingURL=app-route.js.map

/***/ }),

/***/ 26234:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const packageHistorySchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    name: {
        type: String,
        required: true
    },
    packageId: {
        type: String,
        required: true
    },
    packagePrice: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    levels: {
        type: Number,
        required: true
    },
    referralcode: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).PackageHistory || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("PackageHistory", packageHistorySchema));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [8478,77,2778,6034,9877,6155], () => (__webpack_exec__(54934)));
module.exports = __webpack_exports__;

})();