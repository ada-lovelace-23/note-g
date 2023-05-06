
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-js": preferDefault(require("/Users/jpozivil/Sites/tests/note-g/apps/frontend/src/pages/404.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/jpozivil/Sites/tests/note-g/apps/frontend/src/pages/index.js"))
}

