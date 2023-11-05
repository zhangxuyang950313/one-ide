import fs from "node:fs";
import path from "node:path";

import xmljs from "xml-js";

const xmlContent = fs.readFileSync(path.resolve("./theme_values.xml"), "utf-8");
console.log(xmlContent);

fs.writeFileSync(
  path.resolve("./a.json"),
  JSON.stringify(xmljs.xml2js(xmlContent), null, 2),
);
