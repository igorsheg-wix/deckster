let lineReader = require("readline").createInterface({ input: process.stdin });

lineReader.on("line", (line) => {
  let data = JSON.parse(line);

  let html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="static/bundle.css" />
    <link
      rel="stylesheet"
      href="https://static.parastorage.com/unpkg/@wix/wix-fonts@1.11.0/madefor.min.css"
    />
    <title>DeckSter</title>
  </head>
  <body>
    <div id="root"></div>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script type="module" src="static/bundle.js"></script>
  </body>
  `;
  // html += "<h1>Path: " + data.Path + "</h1>\n";
  // html += "<small>PID: " + process.pid + "</small>\n";

  process.stdout.write(JSON.stringify(html) + "\n");
});
