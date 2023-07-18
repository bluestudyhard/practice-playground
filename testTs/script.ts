console.log("Hello World!");

const url: string = "./data.json";

const button: HTMLButtonElement | null = document.querySelector("button");

const table: HTMLTableElement | null = document.querySelector("table");

const deleteTd: HTMLTableRowElement | null = document.querySelector(".delete");
// 不能将类型“HTMLButtonElement | null”分配给类型“HTMLButtonElement”。 ts会报错可能不存在的类型，所以可以用断言或者非空断言，最好是用ts 联合类型

// 接口的用途是为变量类型命名，然后在类,函数里用的时候可以调用，而且如果你后续加了一个变量的话，后面都会报错类“Cat”错误实现接口“CatType”。类型 "Cat" 中缺少属性 "test"，但类型 "CatType" 中需要该属性。ts(2420)，可以用?来表示我不一定会用

interface CatType {
  id: string;
  url: string;
  height: number;
  width: number;
  test?: boolean;
}

class Cat implements CatType {
  id: string;
  url: string;
  height: number;
  width: number;

  constructor(id: string, url: string, height: number, width: number) {
    this.id = id;
    this.url = url;
    this.height = height;
    this.width = width;
  }
}

// "?"可以在变量后面加上，表示这个变量可能不存在，如果不存在就不会执行，不会报错，返回值还是要严格点写上

class WebContent {
  public static addData(data: CatType): void {
    const cat: Cat = new Cat(data.id, data.url, data.height, data.width);
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
            <td>id:${cat.id}</td>
            <td><img src="${cat.url}"/></td>
            <td>height:${cat.height.toString()}</td>
            <td>width:${cat.width.toString()}</td>
            <td>url:${cat.url}</td>
            <td><a href="#" class="delete">X</td>
        `;
    table?.appendChild(tableRow);
  }
  public static removeData(deleButton: HTMLAnchorElement): void {
    const td = deleButton.parentElement as HTMLTableCellElement;
    const tr = td?.parentElement as HTMLTableRowElement;
    console.log(tr);
    tr?.remove();
  }
}

async function getJSON<T>(url: string): Promise<T> {
  const response: Response = await fetch(url);
  const json: Promise<T> = await response.json();
  return json;
}

// 数组里常确认好类型，比如数字数组就 let arr:number[]=[1,2,3],字符串数组就 let arr:string[]=["1","2","3"]对象就 let objArr:object[]=[{name:"1"},{name:"2"}]

async function getData(url: string) {
  try {
    const json: CatType[] = await getJSON<CatType[]>(url);
    const data: CatType = json[0];
    WebContent?.addData(data);
  } catch (error: unknown | Error) {
    let message: string;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
      console.log(message);
    }
    console.log(error);
  }
}
// <click> 谨防大小写，大项目的时候最好加上
button?.addEventListener<"click">("click", () => {
  getData(url);
});

table?.addEventListener<"click">("click", (e: MouseEvent) => {
  WebContent.removeData(<HTMLAnchorElement>e.target);
});
