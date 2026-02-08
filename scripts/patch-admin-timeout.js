// Patch the TinaCMS admin index.html timeout from 2s to 10s.
// tinacms build generates public/admin/index.html with a 2-second
// fallback that fires before slow serverless functions can respond.
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "public", "admin", "index.html");
const html = fs.readFileSync(file, "utf8");
const patched = html.replace("}, 2000)", "}, 10000)");

if (patched === html) {
  console.warn("warn: admin timeout pattern not found, skipping patch");
} else {
  fs.writeFileSync(file, patched);
  console.log("patched admin timeout: 2s -> 10s");
}
