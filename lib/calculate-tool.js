(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.calculateTool = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */


    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    // Data type enumeration
    var DataTypeEnum;
    (function (DataTypeEnum) {
        DataTypeEnum["NUMBER"] = "number";
        DataTypeEnum["STRING"] = "string";
        DataTypeEnum["BOOLEAN"] = "boolean";
        DataTypeEnum["OBJECT"] = "object";
        DataTypeEnum["UNDEFINED"] = "undefined";
        DataTypeEnum["NULL"] = "null";
        DataTypeEnum["SYMBOL"] = "symbol";
        DataTypeEnum["ARRAY"] = "array";
        DataTypeEnum["DATE"] = "date";
        DataTypeEnum["FUNCTION"] = "function";
    })(DataTypeEnum || (DataTypeEnum = {}));

    /**
     * @function get the type of data
     * @param {any} data
     * @returns {String}
     */
    function getDataType(data) {
        return Object.prototype.toString.call(data).slice(8, -1).toLocaleLowerCase();
    }
    /**
     * @function Check if the data is a object
     * @param {any} data
     * @returns {Boolean}
     */
    function isObject(data) {
        return getDataType(data) === DataTypeEnum.OBJECT;
    }
    function checkObject(params) {
        if (!isObject(params)) {
            throwError('params must be object');
        }
    }
    function validateParams(params, checkTypeRecord) {
        checkObject(params);
        checkObject(checkTypeRecord);
        return Object.keys(checkTypeRecord).every(function (key) {
            var type = checkTypeRecord[key];
            var valid = getDataType(params[key]) === type;
            if (!valid) {
                throwError("".concat(key, " must be ").concat(type));
            }
            return valid;
        });
    }
    function throwError(text) {
        throw Error(text);
    }
    var POW = Math.pow;
    var ABS = Math.abs;
    var toFixed = function (num, decimal) {
        return +num.toFixed(decimal);
    };
    function getSymbol(num) {
        return num > 0 ? '+' : num < 0 ? '-' : '';
    }
    function isNumber(num) {
        return /^(\+|-)?\d+(\.\d+)?$/.test(num);
    }

    var DECIMAL = 4;

    var defaultOpt = {
        isEnd: true,
        decimal: DECIMAL
    };
    var defaultCheckRecord$1 = {
        isEnd: DataTypeEnum.BOOLEAN,
        decimal: DataTypeEnum.NUMBER
    };
    /**
     * Discounted cash flow model: Get the future value of annuity
     * @param {DfcOption} opt
     * @param {number} opt.n Number of periods
     * @param {number} opt.pv The present value
     * @param {number} opt.pmt Payment per period
     * @param {number} opt.rate The interest rate per period
     * @param {number} opt.decimal not required
     * @param {boolean} opt.isEnd not required
     * @returns {number}
     */
    function fvInDfc(opt) {
        checkObject(opt);
        opt = __assign(__assign({}, defaultOpt), opt);
        var checkMap = __assign({ n: DataTypeEnum.NUMBER, pv: DataTypeEnum.NUMBER, pmt: DataTypeEnum.NUMBER, rate: DataTypeEnum.NUMBER }, defaultCheckRecord$1);
        var isValid = validateParams(opt, checkMap);
        if (!isValid) {
            return NaN;
        }
        var _a = opt, n = _a.n, pv = _a.pv, pmt = _a.pmt, rate = _a.rate, isEnd = _a.isEnd, decimal = _a.decimal;
        var curRate = 1 + rate / 100;
        var sum = -pv * POW(curRate, n);
        var i = 1;
        while (i <= n) {
            sum -= pmt * POW(curRate, isEnd ? n - i : n - i + 1);
            i++;
        }
        return +sum.toFixed(decimal);
    }
    /**
     * @function Discounted cash flow model: Get the payment per period
     * @param {DfcOption} opt
     * @param {number} opt.n Number of periods
     * @param {number} opt.pv The present value
     * @param {number} opt.fv The future value
     * @param {number} opt.rate Interest rate per period
     * @param {number} opt.decimal not required
     * @param {boolean} opt.isEnd default: true,
     * @returns {number}
     */
    function pmtInDfc(opt) {
        checkObject(opt);
        opt = __assign(__assign({}, defaultOpt), opt);
        var checkMap = __assign({ n: DataTypeEnum.NUMBER, pv: DataTypeEnum.NUMBER, fv: DataTypeEnum.NUMBER, rate: DataTypeEnum.NUMBER }, defaultCheckRecord$1);
        var isValid = validateParams(opt, checkMap);
        if (!isValid) {
            return NaN;
        }
        var _a = opt, n = _a.n, pv = _a.pv, fv = _a.fv, rate = _a.rate, isEnd = _a.isEnd, decimal = _a.decimal;
        var curRate = 1 + rate / 100;
        var sum = 0;
        var i = 1;
        while (i <= n) {
            sum += POW(curRate, isEnd ? n - i : n - i + 1);
            i++;
        }
        return -((pv * POW(curRate, n) + fv) / sum).toFixed(decimal);
    }
    /**
     * @function Discounted cash flow model: Get the present value of annuity
     * @param {DfcOption} opt
     * @param {number} opt.n Number of periods
     * @param {number} opt.fv The future value
     * @param {number} opt.pmt The payment per period
     * @param {number} opt.rate The interest rate per period
     * @param {number} opt.decimal not required
     * @param {boolean} opt.isEnd default: true,
     * @returns {number}
     */
    function pvInDfc(opt) {
        checkObject(opt);
        opt = __assign(__assign({}, defaultOpt), opt);
        var checkMap = __assign({ n: DataTypeEnum.NUMBER, pmt: DataTypeEnum.NUMBER, fv: DataTypeEnum.NUMBER, rate: DataTypeEnum.NUMBER }, defaultCheckRecord$1);
        var isValid = validateParams(opt, checkMap);
        if (!isValid) {
            return NaN;
        }
        var _a = opt, n = _a.n, pmt = _a.pmt, fv = _a.fv, rate = _a.rate, isEnd = _a.isEnd, decimal = _a.decimal;
        var curRate = 1 + rate / 100;
        var sum = -fv * POW(curRate, -n);
        var i = 1;
        while (i <= n) {
            sum -= pmt * POW(curRate, isEnd ? -i : 1 - i);
            i++;
        }
        return +sum.toFixed(decimal);
    }
    /**
     * @function Discounted cash flow model: Get the interest rate per period
     * @param {DfcOption} opt
     * @param {number} opt.n Number of periods
     * @param {number} opt.fv The future value
     * @param {number} opt.pv The present value
     * @param {number} opt.pmt The payment per period
     * @param {number} opt.decimal not required
     * @param {boolean} opt.isEnd default: true,
     * @returns {number}
     */
    function rateInDfc(opt) {
        checkObject(opt);
        opt = __assign(__assign({}, defaultOpt), opt);
        var checkMap = __assign({ n: DataTypeEnum.NUMBER, pmt: DataTypeEnum.NUMBER, fv: DataTypeEnum.NUMBER, pv: DataTypeEnum.NUMBER }, defaultCheckRecord$1);
        var isValid = validateParams(opt, checkMap);
        if (!isValid) {
            return NaN;
        }
        var _a = opt, n = _a.n, pmt = _a.pmt, fv = _a.fv, pv = _a.pv, isEnd = _a.isEnd, decimal = _a.decimal;
        var min = 0;
        var max = 100;
        var err = POW(10, 1 - decimal);
        var rate = +((min + max) / 2).toFixed(decimal);
        while (max > min) {
            var _fv = fvInDfc({ n: n, pv: pv, rate: rate, pmt: pmt, isEnd: isEnd, decimal: decimal });
            if (ABS(_fv - fv) <= err) {
                break;
            }
            if (ABS(_fv) > ABS(fv)) {
                max = rate;
            }
            else {
                min = rate;
            }
            rate = +((min + max) / 2).toFixed(decimal);
        }
        if (rate <= max && rate >= min)
            return rate;
        return NaN;
    }
    /**
     * @function Discounted cash flow model: Get the Net Present Value
     * @param {NpvOption} opt
     * @param {number} opt.initCf The initial cash flow
     * @param {number[]} opt.cfList Cash flow list
     * @param {number} opt.rate The interest rate per period
     * @param {number} opt.decimal not required
     * @returns {number}
     */
    function npv(opt) {
        opt = __assign({ decimal: DECIMAL }, opt);
        var _a = opt, initCf = _a.initCf, cfList = _a.cfList, rate = _a.rate, decimal = _a.decimal;
        var sum = initCf;
        cfList.forEach(function (cf, index) {
            sum += cf * POW(1 + rate / 100, -(index + 1));
        });
        return toFixed(sum, decimal);
    }
    /**
     * @function Discounted cash flow model: Get the Interest Rate of Return，there may be multiple return values
     * @param {NpvOption} opt
     * @param {number} opt.initCf The initial cash flow
     * @param {number[]} opt.cfListv Cash flow list
     * @param {number} opt.decimal not required
     * @returns {number}
     */
    function irr(opt) {
        opt = __assign({ decimal: DECIMAL }, opt);
        var _a = opt, initCf = _a.initCf, cfList = _a.cfList, decimal = _a.decimal;
        var initSymbol = getSymbol(initCf);
        var notValid = cfList.every(function (cf) { return getSymbol(cf) === initSymbol; });
        if (notValid)
            return NaN;
        var min = 0;
        var rate = min;
        var npvList = [];
        var rateList = [];
        while (rate <= 100) {
            var _npv = npv(__assign(__assign({}, opt), { rate: rate }));
            if (ABS(_npv) <= 1) {
                npvList.push(ABS(_npv));
                rateList.push(rate);
            }
            rate = toFixed(rate + 0.001, decimal);
        }
        if (npvList.length > 0) {
            var minNpv = Math.min.apply(Math, npvList);
            var index = npvList.indexOf(minNpv);
            return rateList[index];
        }
        return NaN;
    }

    var defaultOtp = { isEqualPayment: true, periodPerYear: 1, decimal: DECIMAL };
    var defaultCheckRecord = {
        decimal: DataTypeEnum.NUMBER
    };
    /**
     * @function payment per period
     */
    function pmtInloan(opt) {
        checkObject(opt);
        opt = __assign(__assign({}, defaultOtp), opt);
        var checkMap = __assign({ principal: DataTypeEnum.NUMBER, rate: DataTypeEnum.NUMBER, periods: DataTypeEnum.NUMBER, isEqualPayment: DataTypeEnum.BOOLEAN }, defaultCheckRecord);
        var isValid = validateParams(opt, checkMap);
        if (!isValid) {
            return NaN;
        }
        var _a = opt, periods = _a.periods, rate = _a.rate, decimal = _a.decimal;
        if (opt.isEqualPayment) {
            var pmt = pmtInDfc({
                n: periods,
                fv: 0,
                pv: opt.principal,
                rate: rate,
                decimal: decimal
            });
            return ABS(pmt);
        }
        else {
            return toFixed(interestInLoan(opt) + principalInLoan(opt), decimal);
        }
    }
    /**
     * @function principal per period
     */
    function principalInLoan(opt) {
        checkObject(opt);
        opt = __assign(__assign({}, defaultOtp), opt);
        var checkMap = __assign({ principal: DataTypeEnum.NUMBER, rate: DataTypeEnum.NUMBER, periods: DataTypeEnum.NUMBER, currentPeriod: DataTypeEnum.NUMBER, isEqualPayment: DataTypeEnum.BOOLEAN }, defaultCheckRecord);
        var isValid = validateParams(opt, checkMap);
        if (!isValid) {
            return NaN;
        }
        var _a = opt, periods = _a.periods, decimal = _a.decimal, isEqualPayment = _a.isEqualPayment;
        if (isEqualPayment) {
            return toFixed(pmtInloan(opt) - interestInLoan(opt), decimal);
        }
        else {
            return toFixed(opt.principal / periods, decimal);
        }
    }
    /**
     * @function interest per period
     */
    function interestInLoan(opt) {
        checkObject(opt);
        opt = __assign(__assign({}, defaultOtp), opt);
        var checkMap = __assign({ principal: DataTypeEnum.NUMBER, rate: DataTypeEnum.NUMBER, periods: DataTypeEnum.NUMBER, currentPeriod: DataTypeEnum.NUMBER, isEqualPayment: DataTypeEnum.BOOLEAN }, defaultCheckRecord);
        var isValid = validateParams(opt, checkMap);
        if (!isValid) {
            return NaN;
        }
        var _a = opt, periods = _a.periods, rate = _a.rate, decimal = _a.decimal, currentPeriod = _a.currentPeriod, isEqualPayment = _a.isEqualPayment;
        var _rate = rate / 100;
        if (isEqualPayment) {
            var temp = POW(1 + _rate, periods);
            return toFixed((opt.principal * _rate * (temp - POW(1 + _rate, currentPeriod - 1))) / (temp - 1), decimal);
        }
        else {
            return toFixed((opt.principal - (currentPeriod - 1) * principalInLoan(opt)) * _rate, decimal);
        }
    }
    /**
     * @function get total interest
     * @reutrn {number}
     */
    function totalInterestInLoan(opt) {
        opt = __assign(__assign({}, defaultOtp), opt);
        var checkMap = __assign({ principal: DataTypeEnum.NUMBER, rate: DataTypeEnum.NUMBER, periods: DataTypeEnum.NUMBER, isEqualPayment: DataTypeEnum.BOOLEAN }, defaultCheckRecord);
        var isValid = validateParams(opt, checkMap);
        if (!isValid) {
            return NaN;
        }
        var _a = opt, periods = _a.periods, rate = _a.rate, decimal = _a.decimal, isEqualPayment = _a.isEqualPayment, principal = _a.principal;
        var _rate = rate / 100;
        if (isEqualPayment) {
            return toFixed(periods * pmtInloan(opt) - principal, decimal);
        }
        else {
            return toFixed(((periods + 1) * principal * _rate) / 2, decimal);
        }
    }
    function repaymentScheduleInLoan(opt) {
        opt = __assign(__assign({}, defaultOtp), opt);
        var checkMap = __assign({ principal: DataTypeEnum.NUMBER, rate: DataTypeEnum.NUMBER, periods: DataTypeEnum.NUMBER, isEqualPayment: DataTypeEnum.BOOLEAN }, defaultCheckRecord);
        var isValid = validateParams(opt, checkMap);
        if (!isValid) {
            return [];
        }
        var _a = opt, periods = _a.periods, decimal = _a.decimal;
        var list = [];
        for (var i = 1; i <= periods; i++) {
            var _opt = __assign(__assign({}, opt), { currentPeriod: i });
            var principal = principalInLoan(_opt);
            var interest = interestInLoan(_opt);
            var pmt = toFixed(principal + interest, decimal);
            var item = {
                currentPeriod: i,
                principal: principal,
                interest: interest,
                repayment: pmt
            };
            list.push(item);
        }
        return list;
    }
    /**
     * @function banker's rounding
     * @doc https://docs.alipayplus.com/alipayplus/alipayplus/reconcile_mpp/bank_rounding?role=MPP&product=Payment1&version=1.5.5
     * */
    function bankersRounding(number, decimal) {
        if (decimal === void 0) { decimal = 2; }
        var m = Math.pow(10, decimal);
        var n = decimal ? +number * m : number;
        var i = Math.floor(n);
        var f = n - i;
        var e = Number.EPSILON;
        var r = f > 0.5 - e && f < 0.5 + e ? (i % 2 === 0 ? i : i + 1) : Math.round(n);
        return decimal ? r / m : r;
    }

    /**
     * @desc Standard Normal Distribution Table
     */
    var standardNormalDistributionTable = {
        '0.0': {
            '0.00': 0.5,
            '0.01': 0.50399,
            '0.02': 0.50798,
            '0.03': 0.51197,
            '0.04': 0.51595,
            '0.05': 0.51994,
            '0.06': 0.52392,
            '0.07': 0.5279,
            '0.08': 0.53188,
            '0.09': 0.53586
        },
        '0.1': {
            '0.00': 0.53983,
            '0.01': 0.5438,
            '0.02': 0.54776,
            '0.03': 0.55172,
            '0.04': 0.55567,
            '0.05': 0.55962,
            '0.06': 0.5636,
            '0.07': 0.56749,
            '0.08': 0.57142,
            '0.09': 0.57535
        },
        '0.2': {
            '0.00': 0.57926,
            '0.01': 0.58317,
            '0.02': 0.58706,
            '0.03': 0.59095,
            '0.04': 0.59483,
            '0.05': 0.59871,
            '0.06': 0.60257,
            '0.07': 0.60642,
            '0.08': 0.61026,
            '0.09': 0.61409
        },
        '0.3': {
            '0.00': 0.61791,
            '0.01': 0.62172,
            '0.02': 0.62552,
            '0.03': 0.6293,
            '0.04': 0.63307,
            '0.05': 0.63683,
            '0.06': 0.64058,
            '0.07': 0.64431,
            '0.08': 0.64803,
            '0.09': 0.65173
        },
        '0.4': {
            '0.00': 0.65542,
            '0.01': 0.6591,
            '0.02': 0.66276,
            '0.03': 0.6664,
            '0.04': 0.67003,
            '0.05': 0.67364,
            '0.06': 0.67724,
            '0.07': 0.68082,
            '0.08': 0.68439,
            '0.09': 0.68793
        },
        '0.5': {
            '0.00': 0.69146,
            '0.01': 0.69497,
            '0.02': 0.69847,
            '0.03': 0.70194,
            '0.04': 0.7054,
            '0.05': 0.70884,
            '0.06': 0.71226,
            '0.07': 0.71566,
            '0.08': 0.71904,
            '0.09': 0.7224
        },
        '0.6': {
            '0.00': 0.72575,
            '0.01': 0.72907,
            '0.02': 0.73237,
            '0.3': 0.73565,
            '0.04': 0.73891,
            '0.05': 0.74215,
            '0.06': 0.74537,
            '0.07': 0.74857,
            '0.08': 0.75175,
            '0.09': 0.7549
        },
        '0.7': {
            '0.00': 0.75804,
            '0.01': 0.76115,
            '0.02': 0.76424,
            '0.03': 0.7673,
            '0.04': 0.77035,
            '0.05': 0.77337,
            '0.06': 0.77637,
            '0.07': 0.77935,
            '0.08': 0.7823,
            '0.09': 0.78524
        },
        '0.8': {
            '0.00': 0.78814,
            '0.01': 0.79103,
            '0.02': 0.79389,
            '0.03': 0.79673,
            '0.04': 0.79955,
            '0.05': 0.80234,
            '0.6': 0.80511,
            '0.07': 0.80785,
            '0.08': 0.81057,
            '0.09': 0.81327
        },
        '0.9': {
            '0.00': 0.81594,
            '0.01': 0.81859,
            '0.02': 0.82121,
            '0.03': 0.82381,
            '0.04': 0.82639,
            '0.05': 0.82894,
            '0.06': 0.83147,
            '0.07': 0.83398,
            '0.08': 0.83646,
            '0.09': 0.83891
        },
        '1.0': {
            '0.00': 0.84134,
            '0.01': 0.84375,
            '0.02': 0.84614,
            '0.03': 0.84849,
            '0.04': 0.85083,
            '0.05': 0.85314,
            '0.06': 0.85543,
            '0.07': 0.85769,
            '0.08': 0.85993,
            '0.09': 0.86214
        },
        '1.1': {
            '0.00': 0.86433,
            '0.01': 0.8665,
            '0.02': 0.86864,
            '0.03': 0.87076,
            '0.04': 0.87286,
            '0.05': 0.87493,
            '0.06': 0.87698,
            '0.07': 0.879,
            '0.08': 0.881,
            '0.09': 0.88298
        },
        '1.2': {
            '0.00': 0.88493,
            '0.01': 0.88686,
            '0.02': 0.88877,
            '0.03': 0.89065,
            '0.04': 0.89251,
            '0.05': 0.89435,
            '0.06': 0.89617,
            '0.07': 0.89796,
            '0.08': 0.89973,
            '0.09': 0.90147
        },
        '1.3': {
            '0.00': 0.9032,
            '0.01': 0.9049,
            '0.02': 0.90658,
            '0.03': 0.90824,
            '0.04': 0.90988,
            '0.05': 0.91149,
            '0.06': 0.91308,
            '0.07': 0.91466,
            '0.08': 0.91621,
            '0.09': 0.91774
        },
        '1.4': {
            '0.00': 0.91924,
            '0.01': 0.92073,
            '0.02': 0.9222,
            '0.03': 0.92364,
            '0.04': 0.92507,
            '0.05': 0.92647,
            '0.06': 0.92785,
            '0.07': 0.92922,
            '0.08': 0.93056,
            '0.09': 0.93189
        },
        '1.5': {
            '0.00': 0.93319,
            '0.01': 0.93448,
            '0.02': 0.93574,
            '0.03': 0.93699,
            '0.04': 0.93822,
            '0.05': 0.93943,
            '0.06': 0.94062,
            '0.07': 0.94179,
            '0.08': 0.94295,
            '0.09': 0.94408
        },
        '1.6': {
            '0.00': 0.9452,
            '0.01': 0.9463,
            '0.02': 0.94738,
            '0.03': 0.94845,
            '0.04': 0.9495,
            '0.05': 0.95053,
            '0.06': 0.95154,
            '0.07': 0.95254,
            '0.08': 0.95352,
            '0.09': 0.95449
        },
        '1.7': {
            '0.00': 0.95543,
            '0.01': 0.95637,
            '0.02': 0.95728,
            '0.03': 0.95818,
            '0.04': 0.95907,
            '0.05': 0.95994,
            '0.06': 0.9608,
            '0.07': 0.96164,
            '0.08': 0.96246,
            '0.09': 0.96327
        },
        '1.8': {
            '0.00': 0.96407,
            '0.01': 0.96485,
            '0.02': 0.96562,
            '0.03': 0.96638,
            '0.04': 0.96712,
            '0.05': 0.96784,
            '0.06': 0.96856,
            '0.07': 0.96926,
            '0.08': 0.96995,
            '0.09': 0.97062
        },
        '1.9': {
            '0.00': 0.97128,
            '0.01': 0.97193,
            '0.02': 0.97257,
            '0.03': 0.9732,
            '0.04': 0.97381,
            '0.05': 0.97441,
            '0.06': 0.975,
            '0.07': 0.97558,
            '0.08': 0.97615,
            '0.09': 0.9767
        },
        '2.0': {
            '0.00': 0.97725,
            '0.01': 0.97778,
            '0.02': 0.97831,
            '0.03': 0.97882,
            '0.04': 0.97932,
            '0.05': 0.97982,
            '0.06': 0.9803,
            '0.07': 0.98077,
            '0.08': 0.98124,
            '0.09': 0.98169
        },
        '2.1': {
            '0.00': 0.98214,
            '0.01': 0.98257,
            '0.02': 0.983,
            '0.03': 0.98341,
            '0.04': 0.98382,
            '0.05': 0.98422,
            '0.06': 0.98461,
            '0.07': 0.985,
            '0.08': 0.98537,
            '0.09': 0.98574
        },
        '2.2': {
            '0.00': 0.9861,
            '0.01': 0.98645,
            '0.02': 0.98679,
            '0.03': 0.98713,
            '0.04': 0.98745,
            '0.05': 0.98778,
            '0.06': 0.98809,
            '0.07': 0.9884,
            '0.08': 0.9887,
            '0.09': 0.98899
        },
        '2.3': {
            '0.00': 0.98928,
            '0.01': 0.98956,
            '0.02': 0.98983,
            '0.03': 0.9901,
            '0.04': 0.99036,
            '0.05': 0.99061,
            '0.06': 0.99086,
            '0.07': 0.99111,
            '0.08': 0.99134,
            '0.09': 0.99158
        },
        '2.4': {
            '0.00': 0.9918,
            '0.01': 0.99202,
            '0.02': 0.99224,
            '0.03': 0.99245,
            '0.04': 0.99266,
            '0.05': 0.99286,
            '0.06': 0.99305,
            '0.07': 0.99324,
            '0.08': 0.99343,
            '0.09': 0.99361
        },
        '2.5': {
            '0.00': 0.99379,
            '0.01': 0.99396,
            '0.02': 0.99413,
            '0.03': 0.9943,
            '0.04': 0.99446,
            '0.05': 0.99461,
            '0.06': 0.99477,
            '0.07': 0.99506,
            '0.08': 0.99492,
            '0.09': 0.9952
        },
        '2.6': {
            '0.00': 0.99534,
            '0.01': 0.99547,
            '0.02': 0.9956,
            '0.03': 0.99573,
            '0.04': 0.99585,
            '0.05': 0.99598,
            '0.06': 0.99609,
            '0.07': 0.99621,
            '0.08': 0.99632,
            '0.09': 0.99643
        },
        '2.7': {
            '0.00': 0.99653,
            '0.01': 0.99664,
            '0.02': 0.99674,
            '0.03': 0.99683,
            '0.04': 0.99693,
            '0.05': 0.99702,
            '0.06': 0.99711,
            '0.07': 0.9972,
            '0.08': 0.99728,
            '0.09': 0.99736
        },
        '2.8': {
            '0.00': 0.99744,
            '0.01': 0.99752,
            '0.02': 0.9976,
            '0.03': 0.99767,
            '0.04': 0.99774,
            '0.05': 0.99781,
            '0.06': 0.99788,
            '0.07': 0.99795,
            '0.08': 0.99801,
            '0.09': 0.99807
        },
        '2.9': {
            '0.00': 0.99813,
            '0.01': 0.99819,
            '0.02': 0.99825,
            '0.03': 0.99831,
            '0.04': 0.99836,
            '0.05': 0.99841,
            '0.06': 0.99846,
            '0.07': 0.99851,
            '0.08': 0.99856,
            '0.09': 0.99861
        },
        '3.0': {
            '0.00': 0.99865,
            '0.01': 0.99869,
            '0.02': 0.99874,
            '0.03': 0.99878,
            '0.04': 0.99882,
            '0.05': 0.99886,
            '0.06': 0.99889,
            '0.07': 0.99893,
            '0.08': 0.99896,
            '0.09': 0.999
        },
        '3.1': {
            '0.00': 0.99903,
            '0.01': 0.99906,
            '0.02': 0.9991,
            '0.03': 0.99913,
            '0.04': 0.99916,
            '0.05': 0.99918,
            '0.06': 0.99921,
            '0.07': 0.99924,
            '0.08': 0.99926,
            '0.09': 0.99929
        },
        '3.2': {
            '0.00': 0.99931,
            '0.01': 0.99934,
            '0.02': 0.99936,
            '0.03': 0.99938,
            '0.04': 0.9994,
            '0.05': 0.99942,
            '0.06': 0.99944,
            '0.07': 0.99946,
            '0.08': 0.99948,
            '0.09': 0.9995
        },
        '3.3': {
            '0.00': 0.99952,
            '0.01': 0.99953,
            '0.02': 0.99955,
            '0.03': 0.99957,
            '0.04': 0.99958,
            '0.05': 0.9996,
            '0.06': 0.99961,
            '0.07': 0.99962,
            '0.08': 0.99964,
            '0.09': 0.99965
        },
        '3.4': {
            '0.00': 0.99966,
            '0.01': 0.99968,
            '0.02': 0.99969,
            '0.03': 0.9997,
            '0.04': 0.99971,
            '0.05': 0.99972,
            '0.06': 0.99973,
            '0.07': 0.99974,
            '0.08': 0.99975,
            '0.09': 0.99976
        },
        '3.5': {
            '0.00': 0.99977,
            '0.01': 0.99978,
            '0.02': 0.99978,
            '0.03': 0.99979,
            '0.04': 0.9998,
            '0.05': 0.99981,
            '0.06': 0.99981,
            '0.07': 0.99982,
            '0.08': 0.99983,
            '0.09': 0.99983
        },
        '3.6': {
            '0.00': 0.99984,
            '0.01': 0.99985,
            '0.02': 0.99985,
            '0.03': 0.99986,
            '0.04': 0.99986,
            '0.05': 0.99987,
            '0.06': 0.99987,
            '0.07': 0.99988,
            '0.08': 0.99988,
            '0.09': 0.99989
        },
        '3.7': {
            '0.00': 0.99989,
            '0.01': 0.9999,
            '0.02': 0.9999,
            '0.03': 0.9999,
            '0.04': 0.99991,
            '0.05': 0.99991,
            '0.06': 0.99992,
            '0.07': 0.99992,
            '0.08': 0.99992,
            '0.09': 0.99992
        },
        '3.8': {
            '0.00': 0.99993,
            '0.01': 0.99993,
            '0.02': 0.99993,
            '0.03': 0.99994,
            '0.04': 0.99994,
            '0.05': 0.99994,
            '0.06': 0.99994,
            '0.07': 0.99995,
            '0.08': 0.99995,
            '0.09': 0.99995
        },
        '3.9': {
            '0.00': 0.99995,
            '0.01': 0.99995,
            '0.02': 0.99996,
            '0.03': 0.99996,
            '0.04': 0.99996,
            '0.05': 0.99996,
            '0.06': 0.99996,
            '0.07': 0.99996,
            '0.08': 0.99997,
            '0.09': 0.99997
        },
        '4.0': {
            '0.00': 0.99997,
            '0.01': 0.99997,
            '0.02': 0.99997,
            '0.03': 0.99997,
            '0.04': 0.99997,
            '0.05': 0.99997,
            '0.06': 0.99998,
            '0.07': 0.99998,
            '0.08': 0.99998,
            '0.09': 0.99998
        }
    };

    /**
     * @desc statistics
     */
    /**
     * @function get mean
     * @param {number[]} data
     * @returns {number} mean
     */
    function mean(data, decimal) {
        if (decimal === void 0) { decimal = DECIMAL; }
        var sum = data.reduce(function (prev, curr) { return prev + +curr; }, 0);
        return toFixed(sum / data.length, decimal);
    }
    function _getSquareTotal(data, target) {
        target = target === undefined ? mean(data) : target;
        var sum = data.reduce(function (prev, curr) { return prev + Math.pow(+curr - Number(target), 2); }, 0);
        return sum;
    }
    /**
     * @function get variance of population
     * @param {number[]} data
     * @returns {number} variance
     */
    function variance(data, decimal) {
        if (decimal === void 0) { decimal = DECIMAL; }
        var sum = _getSquareTotal(data);
        return toFixed(sum / data.length, decimal);
    }
    /**
     * @function get standard deviation of population
     * @param {number[]} data
     * @returns {number} standard deviation
     */
    function stdDeviation(data, decimal) {
        if (decimal === void 0) { decimal = DECIMAL; }
        var sum = _getSquareTotal(data);
        return toFixed(Math.sqrt(sum / data.length), decimal);
    }
    /**
     * @function get variance of sample
     * @param {number[]} data
     * @returns {number} variance
     */
    function varianceOfSample(data, decimal) {
        if (decimal === void 0) { decimal = DECIMAL; }
        var sum = _getSquareTotal(data);
        return toFixed(sum / (data.length - 1), decimal);
    }
    /**
     * @function get standard deviation of sample
     * @param {number[]} data
     * @returns {number} standard deviation
     */
    function stdDeviationOfSample(data, decimal) {
        if (decimal === void 0) { decimal = DECIMAL; }
        var sum = _getSquareTotal(data);
        return toFixed(Math.sqrt(sum / (data.length - 1)), decimal);
    }
    /**
     * @function get target/down deviation/ semideviation
     * @param {number[]} data
     * @returns {number} standard deviation
     */
    function semiDeviation(data, target, decimal) {
        if (decimal === void 0) { decimal = DECIMAL; }
        var sum = _getSquareTotal(data, target);
        return toFixed(Math.sqrt(sum / (data.length - 1)), decimal);
    }
    /**
     * @function get the standard normal distribution value by z-score
     * @param {number | string} z: z-score or standard score
     * @return {number|undefined}
     */
    function stdNormalDistributionValue(z) {
        var _a;
        if (!isNumber(z))
            return NaN;
        var table = standardNormalDistributionTable;
        var maxZ = Object.keys(table).sort(function (a, b) { return +b - +a; })[0];
        var maxValue = +table[maxZ]['0.09'] + 0.00001;
        if (+z > +maxZ || +z < -maxZ)
            return toFixed(maxValue, 5);
        z = Number(z).toFixed(2);
        var arr = z.match(/([+|-]?\d+\.\d)(\d)/);
        if (arr) {
            var column = arr[1];
            var _column = Math.abs(+column);
            var row = "0.0".concat(arr[2]);
            var res = (_a = table[_column]) === null || _a === void 0 ? void 0 : _a[row];
            return Number(column) >= 0 ? res : toFixed(1 - res, 5);
        }
        return NaN;
    }

    exports.bankersRounding = bankersRounding;
    exports.fvInDfc = fvInDfc;
    exports.interestInLoan = interestInLoan;
    exports.irr = irr;
    exports.mean = mean;
    exports.npv = npv;
    exports.pmtInDfc = pmtInDfc;
    exports.pmtInloan = pmtInloan;
    exports.principalInLoan = principalInLoan;
    exports.pvInDfc = pvInDfc;
    exports.rateInDfc = rateInDfc;
    exports.repaymentScheduleInLoan = repaymentScheduleInLoan;
    exports.semiDeviation = semiDeviation;
    exports.stdDeviation = stdDeviation;
    exports.stdDeviationOfSample = stdDeviationOfSample;
    exports.stdNormalDistributionValue = stdNormalDistributionValue;
    exports.totalInterestInLoan = totalInterestInLoan;
    exports.variance = variance;
    exports.varianceOfSample = varianceOfSample;

}));
