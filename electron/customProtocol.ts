import { protocol, net, Session } from "electron";
import url from "node:url";
import fs from "node:fs";

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
    throw new Error(`Unknown host: ${reqUrl.host}`);
  });
};
