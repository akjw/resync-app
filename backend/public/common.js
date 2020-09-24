(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "8V2O":
/*!*********************************************!*\
  !*** ./src/app/departments/dept.service.ts ***!
  \*********************************************/
/*! exports provided: DeptService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeptService", function() { return DeptService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class DeptService {
    constructor(http) {
        this.http = http;
        this.token = localStorage.getItem('token');
    }
    getDepartments() {
        return this.http.get(`api/departments`, { headers: {
                "x-auth-token": this.token,
            } });
    }
    getMonthDepts() {
        return this.http.get(`api/departments/month`, { headers: {
                "x-auth-token": this.token,
            } });
    }
    getYearDepts() {
        return this.http.get(`api/departments/year`, { headers: {
                "x-auth-token": this.token,
            } });
    }
    getOrgDepts(id) {
        return this.http.get(`api/departments/organization/${id}`, { headers: {
                "x-auth-token": this.token,
            } });
    }
    addDept(info) {
        return this.http
            .post(`api/departments/new`, info, { headers: {
                "x-auth-token": this.token,
            } });
    }
    getDept(id) {
        return this.http.get(`api/departments/${id}`, { headers: {
                "x-auth-token": this.token,
            } });
    }
    editDept(id, info) {
        return this.http
            .put(`api/departments/${id}`, info, { headers: {
                "x-auth-token": this.token,
            } });
    }
    deleteDept(id) {
        return this.http.delete(`api/departments/${id}`, { headers: {
                "x-auth-token": this.token,
            } });
    }
}
DeptService.ɵfac = function DeptService_Factory(t) { return new (t || DeptService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
DeptService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: DeptService, factory: DeptService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DeptService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "aZXg":
/*!**********************************************!*\
  !*** ./src/app/organizations/org.service.ts ***!
  \**********************************************/
/*! exports provided: OrgService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrgService", function() { return OrgService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class OrgService {
    constructor(http) {
        this.http = http;
        this.token = localStorage.getItem('token');
    }
    getOrganizations() {
        return this.http.get(`api/organizations`, { headers: {
                "x-auth-token": this.token,
            } });
    }
    getMonthOrgs() {
        return this.http.get(`api/organizations/month`, { headers: {
                "x-auth-token": this.token,
            } });
    }
    getYearOrgs() {
        return this.http.get(`api/organizations/year`, { headers: {
                "x-auth-token": this.token,
            } });
    }
    addOrg(info) {
        return this.http
            .post(`api/organizations/new`, info, { headers: {
                "x-auth-token": this.token,
            } });
    }
    getOrg(id) {
        return this.http.get(`api/organizations/${id}`, { headers: {
                "x-auth-token": this.token,
            } });
    }
    editOrg(id, info) {
        return this.http
            .put(`api/organizations/${id}`, info, { headers: {
                "x-auth-token": this.token,
            } });
    }
    deleteOrg(id) {
        return this.http.delete(`api/organizations/${id}`, { headers: {
                "x-auth-token": this.token,
            } });
    }
}
OrgService.ɵfac = function OrgService_Factory(t) { return new (t || OrgService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
OrgService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: OrgService, factory: OrgService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OrgService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "niJ3":
/*!******************************************!*\
  !*** ./src/app/employees/emp.service.ts ***!
  \******************************************/
/*! exports provided: EmpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmpService", function() { return EmpService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class EmpService {
    constructor(http) {
        this.http = http;
        this.token = localStorage.getItem('token');
    }
    getEmployees() {
        return this.http.get(`api/employees`, { headers: {
                "x-auth-token": this.token,
            } });
    }
    getMonthEmps() {
        return this.http.get(`api/employees/month`, { headers: {
                "x-auth-token": this.token,
            } });
    }
    getYearEmps() {
        return this.http.get(`api/employees/year`, { headers: {
                "x-auth-token": this.token,
            } });
    }
    addEmp(info) {
        return this.http
            .post(`api/employees/new`, info, { headers: {
                "x-auth-token": this.token,
            } });
    }
    getEmp(id) {
        return this.http.get(`api/employees/${id}`, { headers: {
                "x-auth-token": this.token,
            } });
    }
    editEmp(id, info) {
        return this.http
            .put(`api/employees/${id}`, info, { headers: {
                "x-auth-token": this.token,
            } });
    }
    deleteEmp(id) {
        return this.http.delete(`api/employees/${id}`, { headers: {
                "x-auth-token": this.token,
            } });
    }
}
EmpService.ɵfac = function EmpService_Factory(t) { return new (t || EmpService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
EmpService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: EmpService, factory: EmpService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EmpService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=common.js.map