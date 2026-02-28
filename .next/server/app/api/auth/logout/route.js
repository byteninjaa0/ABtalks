"use strict";
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
exports.id = "app/api/auth/logout/route";
exports.ids = ["app/api/auth/logout/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "./action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogout%2Froute&page=%2Fapi%2Fauth%2Flogout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogout%2Froute.ts&appDir=D%3A%5CABtalks%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CABtalks&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogout%2Froute&page=%2Fapi%2Fauth%2Flogout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogout%2Froute.ts&appDir=D%3A%5CABtalks%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CABtalks&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_ABtalks_app_api_auth_logout_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/logout/route.ts */ \"(rsc)/./app/api/auth/logout/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/logout/route\",\n        pathname: \"/api/auth/logout\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/logout/route\"\n    },\n    resolvedPagePath: \"D:\\\\ABtalks\\\\app\\\\api\\\\auth\\\\logout\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_ABtalks_app_api_auth_logout_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/logout/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9nb3V0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGbG9nb3V0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXV0aCUyRmxvZ291dCUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDQUJ0YWxrcyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9RCUzQSU1Q0FCdGFsa3MmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ0g7QUFDMUU7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hYnRhbGtzLz9iMzhhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXEFCdGFsa3NcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXGxvZ291dFxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9sb2dvdXQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL2xvZ291dFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9sb2dvdXQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJEOlxcXFxBQnRhbGtzXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxsb2dvdXRcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvbG9nb3V0L3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogout%2Froute&page=%2Fapi%2Fauth%2Flogout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogout%2Froute.ts&appDir=D%3A%5CABtalks%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CABtalks&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/logout/route.ts":
/*!**************************************!*\
  !*** ./app/api/auth/logout/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nasync function POST() {\n    await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.clearSession)();\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        ok: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvbG9nb3V0L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNEO0FBRW5DLGVBQWVFO0lBQ3BCLE1BQU1ELHVEQUFZQTtJQUNsQixPQUFPRCxxREFBWUEsQ0FBQ0csSUFBSSxDQUFDO1FBQUVDLElBQUk7SUFBSztBQUN0QyIsInNvdXJjZXMiOlsid2VicGFjazovL2FidGFsa3MvLi9hcHAvYXBpL2F1dGgvbG9nb3V0L3JvdXRlLnRzPzliOTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IGNsZWFyU2Vzc2lvbiB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVCgpIHtcclxuICBhd2FpdCBjbGVhclNlc3Npb24oKTtcclxuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBvazogdHJ1ZSB9KTtcclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiY2xlYXJTZXNzaW9uIiwiUE9TVCIsImpzb24iLCJvayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/logout/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearSession: () => (/* binding */ clearSession),\n/* harmony export */   createToken: () => (/* binding */ createToken),\n/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),\n/* harmony export */   getSession: () => (/* binding */ getSession),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   setSession: () => (/* binding */ setSession),\n/* harmony export */   verifyPassword: () => (/* binding */ verifyPassword),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./db */ \"(rsc)/./lib/db.ts\");\n\n\n\n\nconst JWT_SECRET = process.env.JWT_SECRET || \"default-secret-change-me\";\nconst COOKIE_NAME = \"abtalks-token\";\n// JWT expiry: 1 hour in seconds; override with JWT_EXPIRY env (e.g. 3600 or 604800 for 7d)\nconst JWT_EXPIRY_SECONDS = process.env.JWT_EXPIRY ? Number(process.env.JWT_EXPIRY) : 60 * 60; // 1h default\nconst MAX_AGE = 60 * 60; // 1 hour cookie; refresh token flow can extend session\nasync function hashPassword(password) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().hash(password, 12);\n}\nasync function verifyPassword(password, hashed) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(password, hashed);\n}\nfunction createToken(payload) {\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, JWT_SECRET, {\n        expiresIn: JWT_EXPIRY_SECONDS\n    });\n}\nfunction verifyToken(token) {\n    try {\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, JWT_SECRET);\n        return {\n            userId: decoded.userId,\n            email: decoded.email,\n            role: decoded.role\n        };\n    } catch  {\n        return null;\n    }\n}\nasync function getSession() {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    const token = cookieStore.get(COOKIE_NAME)?.value;\n    if (!token) return null;\n    return verifyToken(token);\n}\nasync function setSession(token) {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    cookieStore.set(COOKIE_NAME, token, {\n        httpOnly: true,\n        secure: \"development\" === \"production\",\n        sameSite: \"lax\",\n        maxAge: MAX_AGE,\n        path: \"/\"\n    });\n}\nasync function clearSession() {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    cookieStore.delete(COOKIE_NAME);\n}\nasync function getCurrentUser() {\n    const session = await getSession();\n    if (!session) return null;\n    return _db__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n        where: {\n            id: session.userId\n        },\n        select: {\n            id: true,\n            name: true,\n            email: true,\n            selectedDomain: true,\n            joinedAt: true,\n            role: true\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUErQjtBQUNRO0FBQ1Q7QUFDQTtBQUU5QixNQUFNSSxhQUFhQyxRQUFRQyxHQUFHLENBQUNGLFVBQVUsSUFBSTtBQUM3QyxNQUFNRyxjQUFjO0FBQ3BCLDJGQUEyRjtBQUMzRixNQUFNQyxxQkFBcUJILFFBQVFDLEdBQUcsQ0FBQ0csVUFBVSxHQUFHQyxPQUFPTCxRQUFRQyxHQUFHLENBQUNHLFVBQVUsSUFBSSxLQUFLLElBQUksYUFBYTtBQUMzRyxNQUFNRSxVQUFVLEtBQUssSUFBSSx1REFBdUQ7QUFFekUsZUFBZUMsYUFBYUMsUUFBZ0I7SUFDakQsT0FBT1gsb0RBQVcsQ0FBQ1csVUFBVTtBQUMvQjtBQUVPLGVBQWVFLGVBQ3BCRixRQUFnQixFQUNoQkcsTUFBYztJQUVkLE9BQU9kLHVEQUFjLENBQUNXLFVBQVVHO0FBQ2xDO0FBUU8sU0FBU0UsWUFBWUMsT0FBbUI7SUFDN0MsT0FBT25CLHdEQUFRLENBQUNtQixTQUFTZixZQUFZO1FBQUVpQixXQUFXYjtJQUFtQjtBQUN2RTtBQUVPLFNBQVNjLFlBQVlDLEtBQWE7SUFDdkMsSUFBSTtRQUNGLE1BQU1DLFVBQVV4QiwwREFBVSxDQUFDdUIsT0FBT25CO1FBQ2xDLE9BQU87WUFDTHNCLFFBQVFGLFFBQVFFLE1BQU07WUFDdEJDLE9BQU9ILFFBQVFHLEtBQUs7WUFDcEJDLE1BQU1KLFFBQVFJLElBQUk7UUFDcEI7SUFDRixFQUFFLE9BQU07UUFDTixPQUFPO0lBQ1Q7QUFDRjtBQUVPLGVBQWVDO0lBQ3BCLE1BQU1DLGNBQWMsTUFBTTdCLHFEQUFPQTtJQUNqQyxNQUFNc0IsUUFBUU8sWUFBWUMsR0FBRyxDQUFDeEIsY0FBY3lCO0lBQzVDLElBQUksQ0FBQ1QsT0FBTyxPQUFPO0lBQ25CLE9BQU9ELFlBQVlDO0FBQ3JCO0FBRU8sZUFBZVUsV0FBV1YsS0FBYTtJQUM1QyxNQUFNTyxjQUFjLE1BQU03QixxREFBT0E7SUFDakM2QixZQUFZSSxHQUFHLENBQUMzQixhQUFhZ0IsT0FBTztRQUNsQ1ksVUFBVTtRQUNWQyxRQUFRL0Isa0JBQXlCO1FBQ2pDZ0MsVUFBVTtRQUNWQyxRQUFRM0I7UUFDUjRCLE1BQU07SUFDUjtBQUNGO0FBRU8sZUFBZUM7SUFDcEIsTUFBTVYsY0FBYyxNQUFNN0IscURBQU9BO0lBQ2pDNkIsWUFBWVcsTUFBTSxDQUFDbEM7QUFDckI7QUFFTyxlQUFlbUM7SUFDcEIsTUFBTUMsVUFBVSxNQUFNZDtJQUN0QixJQUFJLENBQUNjLFNBQVMsT0FBTztJQUNyQixPQUFPeEMsdUNBQU1BLENBQUN5QyxJQUFJLENBQUNDLFVBQVUsQ0FBQztRQUM1QkMsT0FBTztZQUFFQyxJQUFJSixRQUFRakIsTUFBTTtRQUFDO1FBQzVCc0IsUUFBUTtZQUNORCxJQUFJO1lBQ0pFLE1BQU07WUFDTnRCLE9BQU87WUFDUHVCLGdCQUFnQjtZQUNoQkMsVUFBVTtZQUNWdkIsTUFBTTtRQUNSO0lBQ0Y7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2FidGFsa3MvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xyXG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiLi9kYlwiO1xyXG5cclxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgXCJkZWZhdWx0LXNlY3JldC1jaGFuZ2UtbWVcIjtcclxuY29uc3QgQ09PS0lFX05BTUUgPSBcImFidGFsa3MtdG9rZW5cIjtcclxuLy8gSldUIGV4cGlyeTogMSBob3VyIGluIHNlY29uZHM7IG92ZXJyaWRlIHdpdGggSldUX0VYUElSWSBlbnYgKGUuZy4gMzYwMCBvciA2MDQ4MDAgZm9yIDdkKVxyXG5jb25zdCBKV1RfRVhQSVJZX1NFQ09ORFMgPSBwcm9jZXNzLmVudi5KV1RfRVhQSVJZID8gTnVtYmVyKHByb2Nlc3MuZW52LkpXVF9FWFBJUlkpIDogNjAgKiA2MDsgLy8gMWggZGVmYXVsdFxyXG5jb25zdCBNQVhfQUdFID0gNjAgKiA2MDsgLy8gMSBob3VyIGNvb2tpZTsgcmVmcmVzaCB0b2tlbiBmbG93IGNhbiBleHRlbmQgc2Vzc2lvblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhc2hQYXNzd29yZChwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICByZXR1cm4gYmNyeXB0Lmhhc2gocGFzc3dvcmQsIDEyKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeVBhc3N3b3JkKFxyXG4gIHBhc3N3b3JkOiBzdHJpbmcsXHJcbiAgaGFzaGVkOiBzdHJpbmdcclxuKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCBoYXNoZWQpO1xyXG59XHJcblxyXG50eXBlIEp3dFBheWxvYWQgPSB7XHJcbiAgdXNlcklkOiBzdHJpbmc7XHJcbiAgZW1haWw6IHN0cmluZztcclxuICByb2xlOiBcIlVTRVJcIiB8IFwiQURNSU5cIjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUb2tlbihwYXlsb2FkOiBKd3RQYXlsb2FkKTogc3RyaW5nIHtcclxuICByZXR1cm4gand0LnNpZ24ocGF5bG9hZCwgSldUX1NFQ1JFVCwgeyBleHBpcmVzSW46IEpXVF9FWFBJUllfU0VDT05EUyB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeVRva2VuKHRva2VuOiBzdHJpbmcpOiBKd3RQYXlsb2FkIHwgbnVsbCB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBKV1RfU0VDUkVUKSBhcyBKd3RQYXlsb2FkO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdXNlcklkOiBkZWNvZGVkLnVzZXJJZCxcclxuICAgICAgZW1haWw6IGRlY29kZWQuZW1haWwsXHJcbiAgICAgIHJvbGU6IGRlY29kZWQucm9sZSxcclxuICAgIH07XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXNzaW9uKCk6IFByb21pc2U8Snd0UGF5bG9hZCB8IG51bGw+IHtcclxuICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKTtcclxuICBjb25zdCB0b2tlbiA9IGNvb2tpZVN0b3JlLmdldChDT09LSUVfTkFNRSk/LnZhbHVlO1xyXG4gIGlmICghdG9rZW4pIHJldHVybiBudWxsO1xyXG4gIHJldHVybiB2ZXJpZnlUb2tlbih0b2tlbik7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRTZXNzaW9uKHRva2VuOiBzdHJpbmcpIHtcclxuICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKTtcclxuICBjb29raWVTdG9yZS5zZXQoQ09PS0lFX05BTUUsIHRva2VuLCB7XHJcbiAgICBodHRwT25seTogdHJ1ZSxcclxuICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiLFxyXG4gICAgc2FtZVNpdGU6IFwibGF4XCIsXHJcbiAgICBtYXhBZ2U6IE1BWF9BR0UsXHJcbiAgICBwYXRoOiBcIi9cIixcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsZWFyU2Vzc2lvbigpIHtcclxuICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKTtcclxuICBjb29raWVTdG9yZS5kZWxldGUoQ09PS0lFX05BTUUpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIoKSB7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKTtcclxuICBpZiAoIXNlc3Npb24pIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXJJZCB9LFxyXG4gICAgc2VsZWN0OiB7XHJcbiAgICAgIGlkOiB0cnVlLFxyXG4gICAgICBuYW1lOiB0cnVlLFxyXG4gICAgICBlbWFpbDogdHJ1ZSxcclxuICAgICAgc2VsZWN0ZWREb21haW46IHRydWUsXHJcbiAgICAgIGpvaW5lZEF0OiB0cnVlLFxyXG4gICAgICByb2xlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG4iXSwibmFtZXMiOlsiand0IiwiY29va2llcyIsImJjcnlwdCIsInByaXNtYSIsIkpXVF9TRUNSRVQiLCJwcm9jZXNzIiwiZW52IiwiQ09PS0lFX05BTUUiLCJKV1RfRVhQSVJZX1NFQ09ORFMiLCJKV1RfRVhQSVJZIiwiTnVtYmVyIiwiTUFYX0FHRSIsImhhc2hQYXNzd29yZCIsInBhc3N3b3JkIiwiaGFzaCIsInZlcmlmeVBhc3N3b3JkIiwiaGFzaGVkIiwiY29tcGFyZSIsImNyZWF0ZVRva2VuIiwicGF5bG9hZCIsInNpZ24iLCJleHBpcmVzSW4iLCJ2ZXJpZnlUb2tlbiIsInRva2VuIiwiZGVjb2RlZCIsInZlcmlmeSIsInVzZXJJZCIsImVtYWlsIiwicm9sZSIsImdldFNlc3Npb24iLCJjb29raWVTdG9yZSIsImdldCIsInZhbHVlIiwic2V0U2Vzc2lvbiIsInNldCIsImh0dHBPbmx5Iiwic2VjdXJlIiwic2FtZVNpdGUiLCJtYXhBZ2UiLCJwYXRoIiwiY2xlYXJTZXNzaW9uIiwiZGVsZXRlIiwiZ2V0Q3VycmVudFVzZXIiLCJzZXNzaW9uIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlkIiwic2VsZWN0IiwibmFtZSIsInNlbGVjdGVkRG9tYWluIiwiam9pbmVkQXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBRTlDLE1BQU1DLGtCQUFrQkM7QUFFakIsTUFBTUMsU0FDWEYsZ0JBQWdCRSxNQUFNLElBQ3RCLElBQUlILHdEQUFZQSxHQUFHO0FBRXJCLElBQUlJLElBQXFDLEVBQUVILGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FidGFsa3MvLi9saWIvZGIudHM/MWRmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcclxuXHJcbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7IHByaXNtYTogUHJpc21hQ2xpZW50IH07XHJcblxyXG5leHBvcnQgY29uc3QgcHJpc21hID1cclxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hIHx8XHJcbiAgbmV3IFByaXNtYUNsaWVudCgpO1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcclxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/bcryptjs","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogout%2Froute&page=%2Fapi%2Fauth%2Flogout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogout%2Froute.ts&appDir=D%3A%5CABtalks%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CABtalks&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();