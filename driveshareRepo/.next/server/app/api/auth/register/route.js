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
exports.id = "app/api/auth/register/route";
exports.ids = ["app/api/auth/register/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.js&appDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.js&appDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_josephcornell_Desktop_476GithubRepo_driveshareRepo_app_api_auth_register_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/register/route.js */ \"(rsc)/./app/api/auth/register/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/register/route\",\n        pathname: \"/api/auth/register\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/register/route\"\n    },\n    resolvedPagePath: \"/Users/josephcornell/Desktop/476GithubRepo/driveshareRepo/app/api/auth/register/route.js\",\n    nextConfigOutput,\n    userland: _Users_josephcornell_Desktop_476GithubRepo_driveshareRepo_app_api_auth_register_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGcmVnaXN0ZXIlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZyZWdpc3RlciUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZyZWdpc3RlciUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRmpvc2VwaGNvcm5lbGwlMkZEZXNrdG9wJTJGNDc2R2l0aHViUmVwbyUyRmRyaXZlc2hhcmVSZXBvJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmpvc2VwaGNvcm5lbGwlMkZEZXNrdG9wJTJGNDc2R2l0aHViUmVwbyUyRmRyaXZlc2hhcmVSZXBvJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN3QztBQUNySDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2pvc2VwaGNvcm5lbGwvRGVza3RvcC80NzZHaXRodWJSZXBvL2RyaXZlc2hhcmVSZXBvL2FwcC9hcGkvYXV0aC9yZWdpc3Rlci9yb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9yZWdpc3Rlci9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvcmVnaXN0ZXJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvcmVnaXN0ZXIvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvam9zZXBoY29ybmVsbC9EZXNrdG9wLzQ3NkdpdGh1YlJlcG8vZHJpdmVzaGFyZVJlcG8vYXBwL2FwaS9hdXRoL3JlZ2lzdGVyL3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.js&appDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "(rsc)/./app/api/auth/register/route.js":
/*!****************************************!*\
  !*** ./app/api/auth/register/route.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.js\");\n/* harmony import */ var argon2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! argon2 */ \"argon2\");\n/* harmony import */ var argon2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(argon2__WEBPACK_IMPORTED_MODULE_1__);\n\n\nasync function POST(req) {\n    const body = await req.json();\n    const { email, password, username, questions } = body;\n    const hashedPassword = await argon2__WEBPACK_IMPORTED_MODULE_1___default().hash(password);\n    try {\n        //Create the user\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.create({\n            data: {\n                email,\n                password: hashedPassword,\n                username\n            }\n        });\n        //Insert security questions with prompt + answer + userId\n        if (Array.isArray(questions)) {\n            const formattedQuestions = questions.map((q)=>({\n                    prompt: q.prompt,\n                    answer: q.answer,\n                    userId: user.id\n                }));\n            await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].securityQuestion.createMany({\n                data: formattedQuestions\n            });\n        }\n        return new Response(JSON.stringify({\n            id: user.id,\n            email: user.email\n        }), {\n            status: 201\n        });\n    } catch (err) {\n        console.error(err);\n        return new Response(JSON.stringify({\n            error: err.message\n        }), {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvcmVnaXN0ZXIvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFpQztBQUNOO0FBRXBCLGVBQWVFLEtBQUtDLEdBQUc7SUFDNUIsTUFBTUMsT0FBTyxNQUFNRCxJQUFJRSxJQUFJO0lBQzNCLE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxRQUFRLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFLEdBQUdMO0lBRWpELE1BQU1NLGlCQUFpQixNQUFNVCxrREFBVyxDQUFDTTtJQUV6QyxJQUFJO1FBQ0YsaUJBQWlCO1FBQ2pCLE1BQU1LLE9BQU8sTUFBTVosbURBQU1BLENBQUNZLElBQUksQ0FBQ0MsTUFBTSxDQUFDO1lBQ3BDQyxNQUFNO2dCQUNKUjtnQkFDQUMsVUFBVUc7Z0JBQ1ZGO1lBQ0Y7UUFDRjtRQUVBLHlEQUF5RDtRQUN6RCxJQUFJTyxNQUFNQyxPQUFPLENBQUNQLFlBQVk7WUFDNUIsTUFBTVEscUJBQXFCUixVQUFVUyxHQUFHLENBQUMsQ0FBQ0MsSUFBTztvQkFDL0NDLFFBQVFELEVBQUVDLE1BQU07b0JBQ2hCQyxRQUFRRixFQUFFRSxNQUFNO29CQUNoQkMsUUFBUVYsS0FBS1csRUFBRTtnQkFDakI7WUFFQSxNQUFNdkIsbURBQU1BLENBQUN3QixnQkFBZ0IsQ0FBQ0MsVUFBVSxDQUFDO2dCQUN2Q1gsTUFBTUc7WUFDUjtRQUNGO1FBRUEsT0FBTyxJQUFJUyxTQUFTQyxLQUFLQyxTQUFTLENBQUM7WUFBRUwsSUFBSVgsS0FBS1csRUFBRTtZQUFFakIsT0FBT00sS0FBS04sS0FBSztRQUFDLElBQUk7WUFBRXVCLFFBQVE7UUFBSTtJQUN4RixFQUFFLE9BQU9DLEtBQUs7UUFDWkMsUUFBUUMsS0FBSyxDQUFDRjtRQUNkLE9BQU8sSUFBSUosU0FBU0MsS0FBS0MsU0FBUyxDQUFDO1lBQUVJLE9BQU9GLElBQUlHLE9BQU87UUFBQyxJQUFJO1lBQUVKLFFBQVE7UUFBSTtJQUM1RTtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvam9zZXBoY29ybmVsbC9EZXNrdG9wLzQ3NkdpdGh1YlJlcG8vZHJpdmVzaGFyZVJlcG8vYXBwL2FwaS9hdXRoL3JlZ2lzdGVyL3JvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcmlzbWEgZnJvbSAnQC9saWIvcHJpc21hJ1xuaW1wb3J0IGFyZ29uMiBmcm9tICdhcmdvbjInXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcSkge1xuICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKVxuICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCwgdXNlcm5hbWUsIHF1ZXN0aW9ucyB9ID0gYm9keVxuXG4gIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgYXJnb24yLmhhc2gocGFzc3dvcmQpXG5cbiAgdHJ5IHtcbiAgICAvL0NyZWF0ZSB0aGUgdXNlclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBlbWFpbCxcbiAgICAgICAgcGFzc3dvcmQ6IGhhc2hlZFBhc3N3b3JkLFxuICAgICAgICB1c2VybmFtZSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIC8vSW5zZXJ0IHNlY3VyaXR5IHF1ZXN0aW9ucyB3aXRoIHByb21wdCArIGFuc3dlciArIHVzZXJJZFxuICAgIGlmIChBcnJheS5pc0FycmF5KHF1ZXN0aW9ucykpIHtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFF1ZXN0aW9ucyA9IHF1ZXN0aW9ucy5tYXAoKHEpID0+ICh7XG4gICAgICAgIHByb21wdDogcS5wcm9tcHQsXG4gICAgICAgIGFuc3dlcjogcS5hbnN3ZXIsXG4gICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgIH0pKVxuXG4gICAgICBhd2FpdCBwcmlzbWEuc2VjdXJpdHlRdWVzdGlvbi5jcmVhdGVNYW55KHtcbiAgICAgICAgZGF0YTogZm9ybWF0dGVkUXVlc3Rpb25zLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgaWQ6IHVzZXIuaWQsIGVtYWlsOiB1c2VyLmVtYWlsIH0pLCB7IHN0YXR1czogMjAxIH0pXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogZXJyLm1lc3NhZ2UgfSksIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbInByaXNtYSIsImFyZ29uMiIsIlBPU1QiLCJyZXEiLCJib2R5IiwianNvbiIsImVtYWlsIiwicGFzc3dvcmQiLCJ1c2VybmFtZSIsInF1ZXN0aW9ucyIsImhhc2hlZFBhc3N3b3JkIiwiaGFzaCIsInVzZXIiLCJjcmVhdGUiLCJkYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9ybWF0dGVkUXVlc3Rpb25zIiwibWFwIiwicSIsInByb21wdCIsImFuc3dlciIsInVzZXJJZCIsImlkIiwic2VjdXJpdHlRdWVzdGlvbiIsImNyZWF0ZU1hbnkiLCJSZXNwb25zZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdGF0dXMiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/register/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// lib/prisma.js\n\nlet globalWithPrisma = global;\nif (!globalWithPrisma.prisma) {\n    globalWithPrisma.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n}\nconst prisma = globalWithPrisma.prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdCQUFnQjtBQUM2QjtBQUU3QyxJQUFJQyxtQkFBbUJDO0FBQ3ZCLElBQUksQ0FBQ0QsaUJBQWlCRSxNQUFNLEVBQUU7SUFDNUJGLGlCQUFpQkUsTUFBTSxHQUFHLElBQUlILHdEQUFZQTtBQUM1QztBQUNBLE1BQU1HLFNBQVNGLGlCQUFpQkUsTUFBTTtBQUV0QyxpRUFBZUEsTUFBTUEsRUFBQSIsInNvdXJjZXMiOlsiL1VzZXJzL2pvc2VwaGNvcm5lbGwvRGVza3RvcC80NzZHaXRodWJSZXBvL2RyaXZlc2hhcmVSZXBvL2xpYi9wcmlzbWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3ByaXNtYS5qc1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmxldCBnbG9iYWxXaXRoUHJpc21hID0gZ2xvYmFsXG5pZiAoIWdsb2JhbFdpdGhQcmlzbWEucHJpc21hKSB7XG4gIGdsb2JhbFdpdGhQcmlzbWEucHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXG59XG5jb25zdCBwcmlzbWEgPSBnbG9iYWxXaXRoUHJpc21hLnByaXNtYVxuXG5leHBvcnQgZGVmYXVsdCBwcmlzbWFcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxXaXRoUHJpc21hIiwiZ2xvYmFsIiwicHJpc21hIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.js&appDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjosephcornell%2FDesktop%2F476GithubRepo%2FdriveshareRepo&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();