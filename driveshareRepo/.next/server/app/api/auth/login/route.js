/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "argon2":
/*!*************************!*\
  !*** external "argon2" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("argon2");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_josephcornell_Desktop_476GithubRepo_driveshareRepo_app_api_auth_login_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/login/route.js */ \"(rsc)/./app/api/auth/login/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"/Users/josephcornell/Desktop/476GithubRepo/driveshareRepo/app/api/auth/login/route.js\",\n    nextConfigOutput,\n    userland: _Users_josephcornell_Desktop_476GithubRepo_driveshareRepo_app_api_auth_login_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRmpvc2VwaGNvcm5lbGwlMkZEZXNrdG9wJTJGNDc2R2l0aHViUmVwbyUyRmRyaXZlc2hhcmVSZXBvJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmpvc2VwaGNvcm5lbGwlMkZEZXNrdG9wJTJGNDc2R2l0aHViUmVwbyUyRmRyaXZlc2hhcmVSZXBvJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNxQztBQUNsSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2pvc2VwaGNvcm5lbGwvRGVza3RvcC80NzZHaXRodWJSZXBvL2RyaXZlc2hhcmVSZXBvL2FwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9sb2dpbi9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvbG9naW5cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvbG9naW4vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvam9zZXBoY29ybmVsbC9EZXNrdG9wLzQ3NkdpdGh1YlJlcG8vZHJpdmVzaGFyZVJlcG8vYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/auth/login/route.js":
/*!*************************************!*\
  !*** ./app/api/auth/login/route.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.js\");\n/* harmony import */ var argon2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! argon2 */ \"argon2\");\n/* harmony import */ var argon2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(argon2__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_sessionManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/sessionManager */ \"(rsc)/./lib/sessionManager.js\");\n\n\n\n\nasync function POST(req) {\n    const body = await req.json();\n    const { email, password } = body;\n    try {\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.findUnique({\n            where: {\n                email\n            }\n        });\n        if (!user) {\n            return new Response(JSON.stringify({\n                error: 'User not found'\n            }), {\n                status: 404\n            });\n        }\n        const isMatch = await argon2__WEBPACK_IMPORTED_MODULE_1___default().verify(user.password, password);\n        if (!isMatch) {\n            return new Response(JSON.stringify({\n                error: 'Invalid password'\n            }), {\n                status: 401\n            });\n        }\n        const token = crypto__WEBPACK_IMPORTED_MODULE_2___default().randomBytes(16).toString('hex');\n        _lib_sessionManager__WEBPACK_IMPORTED_MODULE_3__[\"default\"].createSession(parseInt(user.id), {\n            token\n        });\n        return new Response(JSON.stringify({\n            token,\n            userId: user.id,\n            email: user.email\n        }), {\n            status: 200\n        });\n    } catch (error) {\n        return new Response(JSON.stringify({\n            error: error.message\n        }), {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvbG9naW4vcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFpQztBQUNOO0FBQ0E7QUFDc0I7QUFFMUMsZUFBZUksS0FBS0MsR0FBRztJQUM1QixNQUFNQyxPQUFPLE1BQU1ELElBQUlFLElBQUk7SUFDM0IsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHSDtJQUU1QixJQUFJO1FBQ0YsTUFBTUksT0FBTyxNQUFNVixtREFBTUEsQ0FBQ1UsSUFBSSxDQUFDQyxVQUFVLENBQUM7WUFBRUMsT0FBTztnQkFBRUo7WUFBTTtRQUFFO1FBRTdELElBQUksQ0FBQ0UsTUFBTTtZQUNULE9BQU8sSUFBSUcsU0FBU0MsS0FBS0MsU0FBUyxDQUFDO2dCQUFFQyxPQUFPO1lBQWlCLElBQUk7Z0JBQUVDLFFBQVE7WUFBSTtRQUNqRjtRQUVBLE1BQU1DLFVBQVUsTUFBTWpCLG9EQUFhLENBQUNTLEtBQUtELFFBQVEsRUFBRUE7UUFDbkQsSUFBSSxDQUFDUyxTQUFTO1lBQ1osT0FBTyxJQUFJTCxTQUFTQyxLQUFLQyxTQUFTLENBQUM7Z0JBQUVDLE9BQU87WUFBbUIsSUFBSTtnQkFBRUMsUUFBUTtZQUFJO1FBQ25GO1FBRUEsTUFBTUcsUUFBUWxCLHlEQUFrQixDQUFDLElBQUlvQixRQUFRLENBQUM7UUFDOUNuQiwyREFBY0EsQ0FBQ29CLGFBQWEsQ0FBQ0MsU0FBU2QsS0FBS2UsRUFBRSxHQUFHO1lBQUVMO1FBQU07UUFFeEQsT0FBTyxJQUFJUCxTQUFTQyxLQUFLQyxTQUFTLENBQUM7WUFBRUs7WUFBT00sUUFBUWhCLEtBQUtlLEVBQUU7WUFBRWpCLE9BQU9FLEtBQUtGLEtBQUs7UUFBQyxJQUFJO1lBQUVTLFFBQVE7UUFBSTtJQUNuRyxFQUFFLE9BQU9ELE9BQU87UUFDZCxPQUFPLElBQUlILFNBQVNDLEtBQUtDLFNBQVMsQ0FBQztZQUFFQyxPQUFPQSxNQUFNVyxPQUFPO1FBQUMsSUFBSTtZQUFFVixRQUFRO1FBQUk7SUFDOUU7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2pvc2VwaGNvcm5lbGwvRGVza3RvcC80NzZHaXRodWJSZXBvL2RyaXZlc2hhcmVSZXBvL2FwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJpc21hIGZyb20gJ0AvbGliL3ByaXNtYSdcbmltcG9ydCBhcmdvbjIgZnJvbSAnYXJnb24yJ1xuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nXG5pbXBvcnQgc2Vzc2lvbk1hbmFnZXIgZnJvbSAnQC9saWIvc2Vzc2lvbk1hbmFnZXInXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcSkge1xuICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKVxuICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gYm9keVxuXG4gIHRyeSB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBlbWFpbCB9IH0pXG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ1VzZXIgbm90IGZvdW5kJyB9KSwgeyBzdGF0dXM6IDQwNCB9KVxuICAgIH1cblxuICAgIGNvbnN0IGlzTWF0Y2ggPSBhd2FpdCBhcmdvbjIudmVyaWZ5KHVzZXIucGFzc3dvcmQsIHBhc3N3b3JkKVxuICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnSW52YWxpZCBwYXNzd29yZCcgfSksIHsgc3RhdHVzOiA0MDEgfSlcbiAgICB9XG5cbiAgICBjb25zdCB0b2tlbiA9IGNyeXB0by5yYW5kb21CeXRlcygxNikudG9TdHJpbmcoJ2hleCcpXG4gICAgc2Vzc2lvbk1hbmFnZXIuY3JlYXRlU2Vzc2lvbihwYXJzZUludCh1c2VyLmlkKSwgeyB0b2tlbiB9KVxuICAgIFxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyB0b2tlbiwgdXNlcklkOiB1c2VyLmlkLCBlbWFpbDogdXNlci5lbWFpbCB9KSwgeyBzdGF0dXM6IDIwMCB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9KSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG4iXSwibmFtZXMiOlsicHJpc21hIiwiYXJnb24yIiwiY3J5cHRvIiwic2Vzc2lvbk1hbmFnZXIiLCJQT1NUIiwicmVxIiwiYm9keSIsImpzb24iLCJlbWFpbCIsInBhc3N3b3JkIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsIlJlc3BvbnNlIiwiSlNPTiIsInN0cmluZ2lmeSIsImVycm9yIiwic3RhdHVzIiwiaXNNYXRjaCIsInZlcmlmeSIsInRva2VuIiwicmFuZG9tQnl0ZXMiLCJ0b1N0cmluZyIsImNyZWF0ZVNlc3Npb24iLCJwYXJzZUludCIsImlkIiwidXNlcklkIiwibWVzc2FnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/login/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// lib/prisma.js\n\nlet globalWithPrisma = global;\nif (!globalWithPrisma.prisma) {\n    globalWithPrisma.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n}\nconst prisma = globalWithPrisma.prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdCQUFnQjtBQUM2QjtBQUU3QyxJQUFJQyxtQkFBbUJDO0FBQ3ZCLElBQUksQ0FBQ0QsaUJBQWlCRSxNQUFNLEVBQUU7SUFDNUJGLGlCQUFpQkUsTUFBTSxHQUFHLElBQUlILHdEQUFZQTtBQUM1QztBQUNBLE1BQU1HLFNBQVNGLGlCQUFpQkUsTUFBTTtBQUV0QyxpRUFBZUEsTUFBTUEsRUFBQSIsInNvdXJjZXMiOlsiL1VzZXJzL2pvc2VwaGNvcm5lbGwvRGVza3RvcC80NzZHaXRodWJSZXBvL2RyaXZlc2hhcmVSZXBvL2xpYi9wcmlzbWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3ByaXNtYS5qc1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmxldCBnbG9iYWxXaXRoUHJpc21hID0gZ2xvYmFsXG5pZiAoIWdsb2JhbFdpdGhQcmlzbWEucHJpc21hKSB7XG4gIGdsb2JhbFdpdGhQcmlzbWEucHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXG59XG5jb25zdCBwcmlzbWEgPSBnbG9iYWxXaXRoUHJpc21hLnByaXNtYVxuXG5leHBvcnQgZGVmYXVsdCBwcmlzbWFcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxXaXRoUHJpc21hIiwiZ2xvYmFsIiwicHJpc21hIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.js\n");

/***/ }),

/***/ "(rsc)/./lib/sessionManager.js":
/*!*******************************!*\
  !*** ./lib/sessionManager.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// lib/sessionManager.js\nclass SessionManager {\n    constructor(){\n        this.sessions = new Map();\n        this.timeouts = new Map();\n    }\n    createSession(userId, data) {\n        console.log('🧠 [SessionManager] Creating session:', userId, data);\n        this.sessions.set(Number(userId), data);\n        this.setSessionTimeout(userId);\n    }\n    setSessionTimeout(userId) {\n        const id = Number(userId);\n        if (this.timeouts.has(id)) clearTimeout(this.timeouts.get(id));\n        const timeout = setTimeout(()=>this.removeSession(id), 30 * 60 * 1000);\n        this.timeouts.set(id, timeout);\n    }\n    hasSession(userId) {\n        return this.sessions.has(Number(userId));\n    }\n    getSession(userId) {\n        const id = Number(userId);\n        if (this.sessions.has(id)) {\n            this.setSessionTimeout(id);\n            return this.sessions.get(id);\n        }\n        return null;\n    }\n    removeSession(userId) {\n        const id = Number(userId);\n        this.sessions.delete(id);\n        if (this.timeouts.has(id)) {\n            clearTimeout(this.timeouts.get(id));\n            this.timeouts.delete(id);\n        }\n    }\n}\n// 👇 THIS is the real fix — use global to persist across requests\nconst globalForSession = globalThis;\nif (!globalForSession.sessionManager) {\n    globalForSession.sessionManager = new SessionManager();\n}\nconst sessionManager = globalForSession.sessionManager;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sessionManager);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc2Vzc2lvbk1hbmFnZXIuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHdCQUF3QjtBQUV4QixNQUFNQTtJQUNKQyxhQUFjO1FBQ1osSUFBSSxDQUFDQyxRQUFRLEdBQUcsSUFBSUM7UUFDcEIsSUFBSSxDQUFDQyxRQUFRLEdBQUcsSUFBSUQ7SUFDdEI7SUFFQUUsY0FBY0MsTUFBTSxFQUFFQyxJQUFJLEVBQUU7UUFDMUJDLFFBQVFDLEdBQUcsQ0FBQyx5Q0FBeUNILFFBQVFDO1FBQzdELElBQUksQ0FBQ0wsUUFBUSxDQUFDUSxHQUFHLENBQUNDLE9BQU9MLFNBQVNDO1FBQ2xDLElBQUksQ0FBQ0ssaUJBQWlCLENBQUNOO0lBQ3pCO0lBRUFNLGtCQUFrQk4sTUFBTSxFQUFFO1FBQ3hCLE1BQU1PLEtBQUtGLE9BQU9MO1FBQ2xCLElBQUksSUFBSSxDQUFDRixRQUFRLENBQUNVLEdBQUcsQ0FBQ0QsS0FBS0UsYUFBYSxJQUFJLENBQUNYLFFBQVEsQ0FBQ1ksR0FBRyxDQUFDSDtRQUMxRCxNQUFNSSxVQUFVQyxXQUFXLElBQU0sSUFBSSxDQUFDQyxhQUFhLENBQUNOLEtBQUssS0FBSyxLQUFLO1FBQ25FLElBQUksQ0FBQ1QsUUFBUSxDQUFDTSxHQUFHLENBQUNHLElBQUlJO0lBQ3hCO0lBRUFHLFdBQVdkLE1BQU0sRUFBRTtRQUNqQixPQUFPLElBQUksQ0FBQ0osUUFBUSxDQUFDWSxHQUFHLENBQUNILE9BQU9MO0lBQ2xDO0lBRUFlLFdBQVdmLE1BQU0sRUFBRTtRQUNqQixNQUFNTyxLQUFLRixPQUFPTDtRQUNsQixJQUFJLElBQUksQ0FBQ0osUUFBUSxDQUFDWSxHQUFHLENBQUNELEtBQUs7WUFDekIsSUFBSSxDQUFDRCxpQkFBaUIsQ0FBQ0M7WUFDdkIsT0FBTyxJQUFJLENBQUNYLFFBQVEsQ0FBQ2MsR0FBRyxDQUFDSDtRQUMzQjtRQUNBLE9BQU87SUFDVDtJQUVBTSxjQUFjYixNQUFNLEVBQUU7UUFDcEIsTUFBTU8sS0FBS0YsT0FBT0w7UUFDbEIsSUFBSSxDQUFDSixRQUFRLENBQUNvQixNQUFNLENBQUNUO1FBQ3JCLElBQUksSUFBSSxDQUFDVCxRQUFRLENBQUNVLEdBQUcsQ0FBQ0QsS0FBSztZQUN6QkUsYUFBYSxJQUFJLENBQUNYLFFBQVEsQ0FBQ1ksR0FBRyxDQUFDSDtZQUMvQixJQUFJLENBQUNULFFBQVEsQ0FBQ2tCLE1BQU0sQ0FBQ1Q7UUFDdkI7SUFDRjtBQUNGO0FBRUEsa0VBQWtFO0FBQ2xFLE1BQU1VLG1CQUFtQkM7QUFFekIsSUFBSSxDQUFDRCxpQkFBaUJFLGNBQWMsRUFBRTtJQUNwQ0YsaUJBQWlCRSxjQUFjLEdBQUcsSUFBSXpCO0FBQ3hDO0FBRUEsTUFBTXlCLGlCQUFpQkYsaUJBQWlCRSxjQUFjO0FBQ3RELGlFQUFlQSxjQUFjQSxFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvam9zZXBoY29ybmVsbC9EZXNrdG9wLzQ3NkdpdGh1YlJlcG8vZHJpdmVzaGFyZVJlcG8vbGliL3Nlc3Npb25NYW5hZ2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGxpYi9zZXNzaW9uTWFuYWdlci5qc1xuXG5jbGFzcyBTZXNzaW9uTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2Vzc2lvbnMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy50aW1lb3V0cyA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIGNyZWF0ZVNlc3Npb24odXNlcklkLCBkYXRhKSB7XG4gICAgY29uc29sZS5sb2coJ/Cfp6AgW1Nlc3Npb25NYW5hZ2VyXSBDcmVhdGluZyBzZXNzaW9uOicsIHVzZXJJZCwgZGF0YSk7XG4gICAgdGhpcy5zZXNzaW9ucy5zZXQoTnVtYmVyKHVzZXJJZCksIGRhdGEpO1xuICAgIHRoaXMuc2V0U2Vzc2lvblRpbWVvdXQodXNlcklkKTtcbiAgfVxuXG4gIHNldFNlc3Npb25UaW1lb3V0KHVzZXJJZCkge1xuICAgIGNvbnN0IGlkID0gTnVtYmVyKHVzZXJJZCk7XG4gICAgaWYgKHRoaXMudGltZW91dHMuaGFzKGlkKSkgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dHMuZ2V0KGlkKSk7XG4gICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZW1vdmVTZXNzaW9uKGlkKSwgMzAgKiA2MCAqIDEwMDApO1xuICAgIHRoaXMudGltZW91dHMuc2V0KGlkLCB0aW1lb3V0KTtcbiAgfVxuXG4gIGhhc1Nlc3Npb24odXNlcklkKSB7XG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnMuaGFzKE51bWJlcih1c2VySWQpKTtcbiAgfVxuXG4gIGdldFNlc3Npb24odXNlcklkKSB7XG4gICAgY29uc3QgaWQgPSBOdW1iZXIodXNlcklkKTtcbiAgICBpZiAodGhpcy5zZXNzaW9ucy5oYXMoaWQpKSB7XG4gICAgICB0aGlzLnNldFNlc3Npb25UaW1lb3V0KGlkKTtcbiAgICAgIHJldHVybiB0aGlzLnNlc3Npb25zLmdldChpZCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmVtb3ZlU2Vzc2lvbih1c2VySWQpIHtcbiAgICBjb25zdCBpZCA9IE51bWJlcih1c2VySWQpO1xuICAgIHRoaXMuc2Vzc2lvbnMuZGVsZXRlKGlkKTtcbiAgICBpZiAodGhpcy50aW1lb3V0cy5oYXMoaWQpKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0cy5nZXQoaWQpKTtcbiAgICAgIHRoaXMudGltZW91dHMuZGVsZXRlKGlkKTtcbiAgICB9XG4gIH1cbn1cblxuLy8g8J+RhyBUSElTIGlzIHRoZSByZWFsIGZpeCDigJQgdXNlIGdsb2JhbCB0byBwZXJzaXN0IGFjcm9zcyByZXF1ZXN0c1xuY29uc3QgZ2xvYmFsRm9yU2Vzc2lvbiA9IGdsb2JhbFRoaXM7XG5cbmlmICghZ2xvYmFsRm9yU2Vzc2lvbi5zZXNzaW9uTWFuYWdlcikge1xuICBnbG9iYWxGb3JTZXNzaW9uLnNlc3Npb25NYW5hZ2VyID0gbmV3IFNlc3Npb25NYW5hZ2VyKCk7XG59XG5cbmNvbnN0IHNlc3Npb25NYW5hZ2VyID0gZ2xvYmFsRm9yU2Vzc2lvbi5zZXNzaW9uTWFuYWdlcjtcbmV4cG9ydCBkZWZhdWx0IHNlc3Npb25NYW5hZ2VyO1xuIl0sIm5hbWVzIjpbIlNlc3Npb25NYW5hZ2VyIiwiY29uc3RydWN0b3IiLCJzZXNzaW9ucyIsIk1hcCIsInRpbWVvdXRzIiwiY3JlYXRlU2Vzc2lvbiIsInVzZXJJZCIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwic2V0IiwiTnVtYmVyIiwic2V0U2Vzc2lvblRpbWVvdXQiLCJpZCIsImhhcyIsImNsZWFyVGltZW91dCIsImdldCIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlU2Vzc2lvbiIsImhhc1Nlc3Npb24iLCJnZXRTZXNzaW9uIiwiZGVsZXRlIiwiZ2xvYmFsRm9yU2Vzc2lvbiIsImdsb2JhbFRoaXMiLCJzZXNzaW9uTWFuYWdlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/sessionManager.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();