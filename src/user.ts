import data from "./json_file/comuni.json";
import data2 from "./json_file/countries.json";
import pare from "./json_file/pare_value.json";
import spare from "./json_file/spare_value.json";
import rest from "./json_file/rest_value.json";

type gender = "male" | "female";

export class User {   

    private name: string;
    private surname: string;
    private sex: gender;
    private birthday: number;
    private month: number;
    private year: string;
    private birthPlace: string;
    private consonantArr: string[];
    private vocalArr: string[];
    private mounthChar: string[];
    private comuni;
    private countries;
    private pareValueArr;
    private spareValueArr;
    private restArr;
    
    constructor(name: string, surname: string, sex: gender, birthday: number, month: number, year: string, birthPlace: string) {
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.birthday = birthday;
        this.month = month;
        this.year = year;
        this.birthPlace = birthPlace;
        this.consonantArr = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
        this.vocalArr = ["A", "E", "I", "O", "U"];
        this.mounthChar = ["A","B","C", "D", "E", "H", "L", "M", "P", "R", "S", "T"];
        this.comuni = data;
        this.countries = data2;
        this.pareValueArr = pare;
        this.spareValueArr = spare;
        this.restArr = rest;
    }

    private getSurnameChar = (str: string): string => {
        if (str.length === 2) return str.toUpperCase() + "X";
        var splitArray: string[] = str.split("");
        var validChars: string[] = splitArray.filter((item) => {
            return this.consonantArr.some((char) => {
                return item.toLowerCase() === char.toLowerCase();
            })
        });
        var notValidChars: string[] = splitArray.filter((item) => {
            return this.vocalArr.some((char) => {
                return item.toLowerCase() === char.toLowerCase();
            })
        });
        if (validChars.length < 3) validChars = validChars.concat(notValidChars);
        while (validChars.length > 3) validChars.pop();
        return validChars.join("").toUpperCase();
    }

    private getNameChar = (str: string): string => {
        if (str.length === 2) return str.toUpperCase() + "X";
        var splitArray: string[] = str.split("");
        var validChars: string[] = splitArray.filter((item, ) => {
            return this.consonantArr.some((char) => {
                return item.toLowerCase() === char.toLowerCase();
            })
        })
        var notValidChars: string[] = splitArray.filter((item) => {
            return this.vocalArr.some((char) => {
                return item.toLowerCase() === char.toLowerCase();
            })
        });
        var temp: string[] = validChars.filter((_, index) => {
            if (validChars.length > 4 ) return index === 0 || index === 2  || index === 3;
            else return validChars;
        });
        (temp.length < 3) && (temp = temp.concat(notValidChars));
        while (temp.length > 3) temp.pop();
        return temp.join("").toUpperCase();
    }

    private getYearCode = (str: string): string => {
        var splitDate: string[] = str.split("");
        splitDate.splice(0, 2);
        return splitDate.join("");
    }

    private getMounthCode = (n: number): string => {
        return this.mounthChar[n-1];
    }
    
    private getBirthCode = (n: number, str: gender): string => {
        var birthCode: string = "";
        if (str === "male") {
            if (n > 10) birthCode = n.toString();
            else birthCode = 0 + "" + n.toString();
        }
        if (str === "female") {
            if (n > 10) birthCode = (n + 40).toString();
            else birthCode = (n + 40).toString();
        }
        return birthCode;
    }

    private getBirthPlaceCode= (str: string): string => {
        var filtredCity = this.comuni.filter((item) => {
            return item.nome.toLowerCase() === str.toLowerCase();   
        })
        var foreignCity = this.countries.filter((item) => {
            return item.display.toLowerCase() === str.toLowerCase();
        })
        if (foreignCity.length === 0) return filtredCity[0].codiceCatastale.toUpperCase();
        else return foreignCity[0].property![2].valueCode!.toUpperCase();
    }
    
    private getCode = (): string => {
        return this.getSurnameChar(this.surname) +
               this.getNameChar(this.name) + 
               this.getYearCode(this.year) + 
               this.getMounthCode(this.month) +
               this.getBirthCode(this.birthday, this.sex) +
               this.getBirthPlaceCode(this.birthPlace);
    }

    private getSpecialChar = (): string => {
        var code: string = this.getCode();
        var splitArr: string[] = code.split("");
        var parePositionArr: string[] = splitArr.filter((_, index) => ((index % 2) !== 0));
        var sparePositionArr: string[] = splitArr.filter((_, index) => ((index % 2) === 0));
        var pareValues: number[] = [];
        var spareValues: number[] = [];
        for (let i = 0; i < parePositionArr.length; i++) {
            for (let j = 0; j < this.pareValueArr.length; j++) {
                if (parePositionArr[i] === this.pareValueArr[j].key) pareValues.push(this.pareValueArr[j].value)
            };
        };
        for (let i = 0; i < sparePositionArr.length; i++) {
            for (let j = 0; j < this.spareValueArr.length; j++) {
                if (sparePositionArr[i] === this.spareValueArr[j].key) spareValues.push(this.spareValueArr[j].value)
            };
        };
        var pareValueSum: number = pareValues.reduce((acc, item) => acc + item);
        var spareValueSum: number = spareValues.reduce((acc, item) => acc + item);
        var finalSum: number = (pareValueSum + spareValueSum) % 26;
        var specialChar: string = "";
        for (let i = 0; i < this.restArr.length; i++) {
            if (this.restArr[i].key === finalSum) specialChar += this.restArr[i].value;
        }
        return specialChar;
    }

    public getFiscalCode = (): string => this.getCode() + this.getSpecialChar();


}
