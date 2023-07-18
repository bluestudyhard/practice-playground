"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("Hello World!");
const url = "./data.json";
const button = document.querySelector("button");
const table = document.querySelector("table");
const deleteTd = document.querySelector(".delete");
class Cat {
    constructor(id, url, height, width) {
        this.id = id;
        this.url = url;
        this.height = height;
        this.width = width;
    }
}
// "?"可以在变量后面加上，表示这个变量可能不存在，如果不存在就不会执行，不会报错，返回值还是要严格点写上
class WebContent {
    static addData(data) {
        const cat = new Cat(data.id, data.url, data.height, data.width);
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>id:${cat.id}</td>
            <td><img src="${cat.url}"/></td>
            <td>height:${cat.height.toString()}</td>
            <td>width:${cat.width.toString()}</td>
            <td>url:${cat.url}</td>
            <td><a href="#" class="delete">X</td>
        `;
        table === null || table === void 0 ? void 0 : table.appendChild(tableRow);
    }
    static removeData(deleButton) {
        const td = deleButton.parentElement;
        const tr = td === null || td === void 0 ? void 0 : td.parentElement;
        console.log(tr);
        tr === null || tr === void 0 ? void 0 : tr.remove();
    }
}
function getJSON(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const json = yield response.json();
        return json;
    });
}
// 数组里常确认好类型，比如数字数组就 let arr:number[]=[1,2,3],字符串数组就 let arr:string[]=["1","2","3"]对象就 let objArr:object[]=[{name:"1"},{name:"2"}]
function getData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const json = yield getJSON(url);
            const data = json[0];
            WebContent === null || WebContent === void 0 ? void 0 : WebContent.addData(data);
        }
        catch (error) {
            let message;
            if (error instanceof Error) {
                message = error.message;
            }
            else {
                message = String(error);
                console.log(message);
            }
            console.log(error);
        }
    });
}
// <click> 谨防大小写，大项目的时候最好加上
button === null || button === void 0 ? void 0 : button.addEventListener("click", () => {
    getData(url);
});
table === null || table === void 0 ? void 0 : table.addEventListener("click", (e) => {
    WebContent.removeData(e.target);
});
