"use strict";
(() => {
var exports = {};
exports.id = 8118;
exports.ids = [8118];
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

/***/ 32389:
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

// NAMESPACE OBJECT: ./src/app/api/package/[id]/route.ts
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
// EXTERNAL MODULE: ./node_modules/jsonwebtoken/index.js
var jsonwebtoken = __webpack_require__(69877);
var jsonwebtoken_default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken);
// EXTERNAL MODULE: ./src/models/User.ts
var User = __webpack_require__(66155);
// EXTERNAL MODULE: ./src/models/PackageHistory.ts
var PackageHistory = __webpack_require__(26234);
;// CONCATENATED MODULE: ./src/app/api/package/[id]/route.ts






async function GET(request, { params }) {
    await (0,MongoConnection/* default */.Z)();
    // Id from the Params
    const id = params.id;
    try {
        const result = await Package/* default */.Z.findById({
            _id: id
        });
        return next_response/* default */.Z.json({
            result: result
        }, {
            status: 200
        });
    } catch (err) {
        return next_response/* default */.Z.json({
            status: 500
        });
    }
}
async function POST(request, { params }) {
    await (0,MongoConnection/* default */.Z)();
    // Get Token From the Header
    const accessToken = request.headers.get("cookie")?.substring(6);
    const secrat = "mlm123";
    // Decode the Token from the token
    const decoded = jsonwebtoken_default().verify(accessToken, secrat);
    const userId = decoded.id; // Get User Id From the Params
    // This is Package Id
    const id = params.id;
    try {
        // Find the Package If Exist
        const result = await Package/* default */.Z.findById({
            _id: id
        });
        if (result) {
            const packagePrice = result.price;
            // Find the current Users Balance 
            const user = await User/* default */.Z.findOne({
                _id: userId
            });
            // Balance is Always grater then 0
            if (user.userWallet > 0) {
                // Package Perches
                const updatedWallet = user.userWallet - packagePrice;
                // Updated Wallet balance is >= 0
                if (updatedWallet >= 0) {
                    // Find Referral code From Package  userfrom referral code === referralcode
                    const findReferral = await PackageHistory/* default */.Z.findOne({
                        referralcode: user.referralFrom
                    });
                    let levels;
                    if (packagePrice === 50) {
                        levels = 1;
                    } else if (packagePrice === 100) {
                        levels = 5;
                    } else if (packagePrice === 500) {
                        levels = 10;
                    }
                    const totalLevel = user.levels + levels;
                    // If User is Not Buy a Referral user Package commission is not applying them
                    if (findReferral) {
                        // if (findReferral?.packagePrice === packagePrice) {
                        // Add Commission to referral user
                        const packageUser = await User/* default */.Z.findOne({
                            _id: findReferral.userId
                        });
                        let commission;
                        if (packagePrice === 50 || packagePrice === 100) {
                            // Wallet value + commission
                            commission = packageUser.userWallet + packagePrice * 5 / 100;
                        } else {
                            commission = packageUser.userWallet + packagePrice * 25 / 100;
                        }
                        // Update Wallet Value and their value
                        await User/* default */.Z.findByIdAndUpdate({
                            _id: userId
                        }, {
                            userWallet: updatedWallet,
                            levels: totalLevel
                        });
                        // ADD Commission to referral user
                        await User/* default */.Z.findByIdAndUpdate({
                            _id: findReferral.userId
                        }, {
                            userWallet: commission
                        });
                        // Save the Package History
                        const SavePackageHistory = {
                            name: result.name,
                            packageId: id,
                            packagePrice: result.price,
                            userId: userId,
                            levels: result?.levels,
                            referralcode: user.referralcode
                        };
                        const packageHis = await PackageHistory/* default */.Z.create(SavePackageHistory);
                        return next_response/* default */.Z.json({
                            result: result
                        }, {
                            status: 200
                        });
                    // } else {
                    //     // Save the Package History
                    //     const SavePackageHistory = {
                    //         name: result.name,
                    //         packageId: id,
                    //         packagePrice: result.price,
                    //         userId: userId,
                    //         levels: result?.levels,
                    //         referralcode: user.referralcode,
                    //         numberofUsers: []
                    //     }
                    //     await User.findByIdAndUpdate({ _id: userId }, { userWallet: updatedWallet, levels: totalLevel });
                    //     await PackageHistory.create(SavePackageHistory);
                    //     return NextResponse.json({ result: result }, { status: 200 });
                    // }
                    } else {
                        // Save the Package History
                        const SavePackageHistory = {
                            name: result.name,
                            packageId: id,
                            packagePrice: result.price,
                            userId: userId,
                            levels: result?.levels,
                            referralcode: user.referralcode
                        };
                        await User/* default */.Z.findByIdAndUpdate({
                            _id: userId
                        }, {
                            userWallet: updatedWallet,
                            levels: totalLevel
                        });
                        await PackageHistory/* default */.Z.create(SavePackageHistory);
                        return next_response/* default */.Z.json({
                            result: result
                        }, {
                            status: 200
                        });
                    }
                } else {
                    return next_response/* default */.Z.json({
                        status: 409
                    });
                }
            } else {
                return next_response/* default */.Z.json({
                    status: 409
                });
            }
        } else {
            return next_response/* default */.Z.json({
                status: 500
            });
        }
    } catch (err) {
        return next_response/* default */.Z.json({
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fpackage%2F%5Bid%5D%2Froute&name=app%2Fapi%2Fpackage%2F%5Bid%5D%2Froute&pagePath=private-next-app-dir%2Fapi%2Fpackage%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2Fmac%2FDocuments%2Funtitled%20folder%2Fmlm%20user%20penal%2Fsrc%2Fapp&appPaths=%2Fapi%2Fpackage%2F%5Bid%5D%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/package/[id]/route",
        pathname: "/api/package/[id]",
        filename: "route",
        bundlePath: "app/api/package/[id]/route"
    },
    resolvedPagePath: "/Users/mac/Documents/untitled folder/mlm user penal/src/app/api/package/[id]/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/package/[id]/route";


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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [8478,77,2778,6034,9877,6155], () => (__webpack_exec__(32389)));
module.exports = __webpack_exports__;

})();