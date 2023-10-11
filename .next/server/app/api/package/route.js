"use strict";
(() => {
var exports = {};
exports.id = 7426;
exports.ids = [7426];
exports.modules = {

/***/ 11185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 4295:
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

// NAMESPACE OBJECT: ./src/app/api/package/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  GET: () => (GET),
  POST: () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(42394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(69692);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(19513);
// EXTERNAL MODULE: ./src/utils/MongoConnection.ts
var MongoConnection = __webpack_require__(33375);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(89335);
// EXTERNAL MODULE: ./src/models/Package.ts
var Package = __webpack_require__(84414);
;// CONCATENATED MODULE: ./src/app/api/package/route.ts



async function POST(request) {
    await (0,MongoConnection/* default */.Z)();
    try {
        const packageData = await request.json();
        // Pass token form the frontend and verify user is exist or not
        // get user id from the token(decode the token)
        // const result = await User.findOne({ email: userData.email });
        const packageDetails = {
            name: packageData.name,
            imageurl: packageData.imageurl,
            description: packageData.description,
            price: packageData.price,
            levels: packageData.levels
        };
        const result = await Package/* default */.Z.create(packageDetails);
        return next_response/* default */.Z.json({
            message: "Package successfully created"
        }, {
            status: 200
        });
    } catch (err) {
        console.log("err: ", err);
        return next_response/* default */.Z.json({
            status: 500
        });
    }
}
async function GET(request) {
    await (0,MongoConnection/* default */.Z)();
    try {
        // const packageData = await request.json();
        // Pass token form the frontend and verify user is exist or not
        // get user id from the token(decode the token)
        // const result = await User.findOne({ email: userData.email });
        const result = await Package/* default */.Z.find({});
        return next_response/* default */.Z.json({
            result: result
        }, {
            status: 200
        });
    } catch (err) {
        console.log("err: ", err);
        return next_response/* default */.Z.json({
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fpackage%2Froute&name=app%2Fapi%2Fpackage%2Froute&pagePath=private-next-app-dir%2Fapi%2Fpackage%2Froute.ts&appDir=%2FUsers%2Fmac%2FDocuments%2Funtitled%20folder%2Fmlm%20user%20penal%2Fsrc%2Fapp&appPaths=%2Fapi%2Fpackage%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/package/route",
        pathname: "/api/package",
        filename: "route",
        bundlePath: "app/api/package/route"
    },
    resolvedPagePath: "/Users/mac/Documents/untitled folder/mlm user penal/src/app/api/package/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/package/route";


//# sourceMappingURL=app-route.js.map

/***/ }),

/***/ 84414:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const packageSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    name: {
        type: String,
        required: true
    },
    imageurl: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    levels: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Package || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Package", packageSchema));


/***/ }),

/***/ 33375:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const MongoConnection = async ()=>{
    const url = process.env.MONGO_URI;
    await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(url).then((res)=>{
        console.log("Mongodb connection successfully");
    }).catch((err)=>{
        console.log("Mongodb connection error");
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MongoConnection);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [8478,77,2778], () => (__webpack_exec__(4295)));
module.exports = __webpack_exports__;

})();