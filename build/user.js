"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var comuni_json_1 = __importDefault(require("./json_file/comuni.json"));
var countries_json_1 = __importDefault(require("./json_file/countries.json"));
var pare_value_json_1 = __importDefault(require("./json_file/pare_value.json"));
var spare_value_json_1 = __importDefault(require("./json_file/spare_value.json"));
var rest_value_json_1 = __importDefault(require("./json_file/rest_value.json"));
var User = /** @class */ (function () {
    function User(name, surname, sex, birthday, month, year, birthPlace) {
        var _this = this;
        this.getSurnameChar = function (str) {
            if (str.length === 2)
                return str.toUpperCase() + "X";
            var splitArray = str.split("");
            var validChars = splitArray.filter(function (item) {
                return _this.consonantArr.some(function (char) {
                    return item.toLowerCase() === char.toLowerCase();
                });
            });
            var notValidChars = splitArray.filter(function (item) {
                return _this.vocalArr.some(function (char) {
                    return item.toLowerCase() === char.toLowerCase();
                });
            });
            if (validChars.length < 3)
                validChars = validChars.concat(notValidChars);
            while (validChars.length > 3)
                validChars.pop();
            return validChars.join("").toUpperCase();
        };
        this.getNameChar = function (str) {
            if (str.length === 2)
                return str.toUpperCase() + "X";
            var splitArray = str.split("");
            var validChars = splitArray.filter(function (item) {
                return _this.consonantArr.some(function (char) {
                    return item.toLowerCase() === char.toLowerCase();
                });
            });
            var notValidChars = splitArray.filter(function (item) {
                return _this.vocalArr.some(function (char) {
                    return item.toLowerCase() === char.toLowerCase();
                });
            });
            var temp = validChars.filter(function (_, index) {
                if (validChars.length > 4)
                    return index === 0 || index === 2 || index === 3;
                else
                    return validChars;
            });
            (temp.length < 3) && (temp = temp.concat(notValidChars));
            while (temp.length > 3)
                temp.pop();
            return temp.join("").toUpperCase();
        };
        this.getYearCode = function (str) {
            var splitDate = str.split("");
            splitDate.splice(0, 2);
            return splitDate.join("");
        };
        this.getMounthCode = function (n) {
            return _this.mounthChar[n - 1];
        };
        this.getBirthCode = function (n, str) {
            var birthCode = "";
            if (str === "male") {
                if (n > 10)
                    birthCode = n.toString();
                else
                    birthCode = 0 + "" + n.toString();
            }
            if (str === "female") {
                if (n > 10)
                    birthCode = (n + 40).toString();
                else
                    birthCode = (n + 40).toString();
            }
            return birthCode;
        };
        this.getBirthPlaceCode = function (str) {
            var filtredCity = _this.comuni.filter(function (item) {
                return item.nome.toLowerCase() === str.toLowerCase();
            });
            var foreignCity = _this.countries.filter(function (item) {
                return item.display.toLowerCase() === str.toLowerCase();
            });
            if (foreignCity.length === 0)
                return filtredCity[0].codiceCatastale.toUpperCase();
            else
                return foreignCity[0].property[2].valueCode.toUpperCase();
        };
        this.getCode = function () {
            return _this.getSurnameChar(_this.surname) +
                _this.getNameChar(_this.name) +
                _this.getYearCode(_this.year) +
                _this.getMounthCode(_this.month) +
                _this.getBirthCode(_this.birthday, _this.sex) +
                _this.getBirthPlaceCode(_this.birthPlace);
        };
        this.getSpecialChar = function () {
            var code = _this.getCode();
            var splitArr = code.split("");
            var parePositionArr = splitArr.filter(function (_, index) { return ((index % 2) !== 0); });
            var sparePositionArr = splitArr.filter(function (_, index) { return ((index % 2) === 0); });
            var pareValues = [];
            var spareValues = [];
            for (var i = 0; i < parePositionArr.length; i++) {
                for (var j = 0; j < _this.pareValueArr.length; j++) {
                    if (parePositionArr[i] === _this.pareValueArr[j].key)
                        pareValues.push(_this.pareValueArr[j].value);
                }
                ;
            }
            ;
            for (var i = 0; i < sparePositionArr.length; i++) {
                for (var j = 0; j < _this.spareValueArr.length; j++) {
                    if (sparePositionArr[i] === _this.spareValueArr[j].key)
                        spareValues.push(_this.spareValueArr[j].value);
                }
                ;
            }
            ;
            var pareValueSum = pareValues.reduce(function (acc, item) { return acc + item; });
            var spareValueSum = spareValues.reduce(function (acc, item) { return acc + item; });
            var finalSum = (pareValueSum + spareValueSum) % 26;
            var specialChar = "";
            for (var i = 0; i < _this.restArr.length; i++) {
                if (_this.restArr[i].key === finalSum)
                    specialChar += _this.restArr[i].value;
            }
            return specialChar;
        };
        this.getFiscalCode = function () { return _this.getCode() + _this.getSpecialChar(); };
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.birthday = birthday;
        this.month = month;
        this.year = year;
        this.birthPlace = birthPlace;
        this.consonantArr = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
        this.vocalArr = ["A", "E", "I", "O", "U"];
        this.mounthChar = ["A", "B", "C", "D", "E", "H", "L", "M", "P", "R", "S", "T"];
        this.comuni = comuni_json_1.default;
        this.countries = countries_json_1.default;
        this.pareValueArr = pare_value_json_1.default;
        this.spareValueArr = spare_value_json_1.default;
        this.restArr = rest_value_json_1.default;
    }
    return User;
}());
exports.User = User;
