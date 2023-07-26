import { map } from "rxjs/operators";
import { from } from "rxjs";
import { HttpClient } from "@ngify/http";

const http = new HttpClient();
const url: string = "https://api.thecatapi.com/v1/images/search?limit=1";
const getImgUrl = function () {
  return from(http.get(url)).pipe(map((res: any) => res[0].url));
};
export default getImgUrl;
