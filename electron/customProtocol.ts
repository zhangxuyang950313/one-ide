import { protocol, net, Session } from "electron";
import url from "node:url";
import fs, { read } from "node:fs";

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
    if (reqUrl.host === "file") {
      const p = reqUrl.searchParams.get("p") as string;
      return net.fetch(url.pathToFileURL(decodeURIComponent(p)).toString());
    }
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
    throw new Error(`Unknown host: ${reqUrl.host}`);
  });
};
