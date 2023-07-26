import { setupConfig } from "@ngify/http";
import { HttpWxBackend } from "@ngify/http/wx";
/* 在node_MODULES中找到@ngify,里面有针对微信小程序的http服务器的配置，导入http/wx就好
 * 然后在app.ts中调用这个函数
 */
export function setupNgifyConfig() {
  setupConfig({
    backend: new HttpWxBackend(),
  });
}
