import { protocol, net, Session } from "electron";
import dirTree from "directory-tree";
import url from "node:url";
import fs, { constants } from "node:fs";
import { jsonBodyReader } from "./utils/bodyReader";

protocol.registerSchemesAsPrivileged([
  {
    scheme: "one",
    privileges: {
      stream: true,
      bypassCSP: true,
      secure: true,
      standard: true,
      supportFetchAPI: true,
    },
  },
]);

export const registerCustomProtocol = (session?: Session) => {
  (session?.protocol || protocol).handle("one", async (request) => {
    const reqUrl = new url.URL(request.url);
    // 获取文件数据
    if (reqUrl.host === "file") {
      const p = reqUrl.searchParams.get("p") as string;
      return net.fetch(url.pathToFileURL(decodeURIComponent(p)).toString());
    }
    // 拷贝文件
    if (reqUrl.host === "copy-file") {
      const from = reqUrl.searchParams.get("from") as string;
      const to = reqUrl.searchParams.get("to") as string;
      await new Promise<null>((resolve, reject) => {
        fs.copyFile(from, to, (err) => {
          if (err) reject(err);
          else resolve(null);
        });
      });
      return new Response(JSON.stringify({ code: 0 }));
    }
    // 删除文件
    if (reqUrl.host === "delete-file") {
      const p = reqUrl.searchParams.get("p") as string;
      await new Promise<null>((resolve, reject) => {
        fs.unlink(p, (err) => {
          if (err) reject(err);
          else resolve(null);
        });
      });
      return new Response(JSON.stringify({ code: 0 }));
    }
    // 写入文件
    if (reqUrl.host === "write-file") {
      const response = await new Promise<string>((resolve) => {
        if (!request.body) return new Response(JSON.stringify({ code: -1 }));
        const reader = request.body.getReader();
        const result: number[] = [];
        reader.read().then(function read({ done, value }) {
          if (done) {
            const decoder = new TextDecoder();
            const res = JSON.parse(decoder.decode(new Uint8Array(result))) as {
              content: string;
              to: string;
            };
            fs.writeFile(decodeURIComponent(res.to), res.content, (err) => {
              if (err) {
                resolve(JSON.stringify({ code: -1, err: err.message }));
              } else {
                resolve(JSON.stringify({ code: 0, content: res.content }));
              }
            });
            return;
          }
          result.push(...value);
          reader.read().then(read);
        });
      });
      return new Response(response, {
        headers: [["content-type", "application/json"]],
      });
    }
    // 获取目录结构
    if (reqUrl.host === "dir-tree") {
      const dir = reqUrl.searchParams.get("p") as string;
      return new Response(JSON.stringify(dirTree(dir)), {
        headers: [["content-type", "application/json"]],
      });
    }
    // 检查文件是否存在
    if (reqUrl.host === "check-file-exists") {
      const p = reqUrl.searchParams.get("p") as string;
      return new Response(JSON.stringify({ code: 0, data: fs.accessSync(p) }));
    }
    // 提供一个文件地址列表，直到文件存在则输出文件
    if (reqUrl.host === "files-alternative") {
      const paths = reqUrl.searchParams.getAll("paths") as string[];
      for (const p of paths) {
        if (fs.existsSync(p)) {
          return net.fetch(url.pathToFileURL(decodeURIComponent(p)).toString());
        }
      }
    }
    throw new Error(`Unknown host: ${reqUrl.host}`);
  });
};
