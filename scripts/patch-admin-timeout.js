// Post-build patches for TinaCMS admin panel.
// Runs after `tinacms build` and before `next build`.
const fs = require("fs");
const path = require("path");
const adminDir = path.join(__dirname, "..", "public", "admin");

// 1. Patch the fallback timeout from 2s to 10s.
// tinacms build generates index.html with a 2-second timeout that fires
// before slow serverless functions (cold start) can respond.
const htmlFile = path.join(adminDir, "index.html");
let html = fs.readFileSync(htmlFile, "utf8");
const htmlPatched = html.replace("}, 2000)", "}, 10000)");
if (htmlPatched !== html) {
  fs.writeFileSync(htmlFile, htmlPatched);
  console.log("patched admin timeout: 2s -> 10s");
} else {
  console.warn("warn: admin timeout pattern not found, skipping");
}

// 2. Fix React version mismatch in the admin JS bundle.
// tinacms build (Vite) bundles React 18 for the TinaCMS core but resolves
// react/jsx-runtime from the project's React 19. React 19 uses
// Symbol.for("react.transitional.element") as $$typeof, which React 18's
// reconciler doesn't recognize — causing error #31 (Objects are not valid
// as a React child). Patch the symbol to React 18's "react.element".
// Find the main bundle by reading the script src from index.html
const srcMatch = html.match(/src="\/admin\/assets\/(index-[a-f0-9]+\.js)"/);
const mainBundle = srcMatch ? srcMatch[1] : null;
if (mainBundle) {
  const bundlePath = path.join(adminDir, "assets", mainBundle);
  let js = fs.readFileSync(bundlePath, "utf8");
  const count = (js.match(/react\.transitional\.element/g) || []).length;
  if (count > 0) {
    js = js.replace(/react\.transitional\.element/g, "react.element");
    fs.writeFileSync(bundlePath, js);
    console.log(`patched ${count} React 19 element type(s) -> React 18 in ${mainBundle}`);
  } else {
    console.log("no React 19 element types found in bundle (already React 18)");
  }
} else {
  console.warn("warn: admin bundle not found, skipping React patch");
}
