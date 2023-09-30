import {readFile} from "fs/promises";
import {computeHash} from "./hash.js";
import {parseMarkdown} from "./markdown.js";

export async function render(path: string): Promise<string> {
  const source = await readFile(path, "utf-8");
  const parseResult = parseMarkdown(source);
  return `<!DOCTYPE html>
<meta charset="utf-8">
<link rel="stylesheet" type="text/css" href="/_observablehq/style.css">
<script type="module">

import {open} from "/_observablehq/client.js";

open({hash: ${JSON.stringify(computeHash(source))}});

</script>
<script type="module">

import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/+esm";

const runtime = new Runtime();
const main = runtime.module();

function define({id, inline, inputs = [], outputs = [], body}) {
  const root = document.querySelector(\`#cell-$\{id}\`);
  const v = main.variable({pending: () => (root.innerHTML = ""), rejected: (error) => new Inspector(root).rejected(error)}, {shadow: {}});
  const display = inline
    ? (value) => (typeof value !== "string" && value?.[Symbol.iterator] ? root.append(...value) : root.append(value), value)
    : (value) => (new Inspector(root.appendChild(document.createElement("SPAN"))).fulfilled(value), value);
  v._shadow.set("display", new v.constructor(2, main).define([], () => display));
  v._shadow.set("view", new v.constructor(2, main).define(["Generators"], (Generators) => (value) => Generators.input(display(value))));
  v.define(outputs.length ? \`cell $\{id}\` : null, inputs, body);
  for (const o of outputs) main.define(o, [\`cell $\{id}\`], (exports) => exports[o]);
}

${parseResult.js}
</script>
${parseResult.html}`;
}
