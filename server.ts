

import express, { Router } from "express";
import path from "path";
import { renderToString } from "@vue/server-renderer";
import serialize from "serialize-javascript";
import  manifest from "./dist/ssr-manifest.json";
import fs from "fs";
import dotenv from "dotenv";
import { App } from "vue";
import { Store } from "vuex";

dotenv.config()

const server = express();


const appPath = path.join(process.cwd(), "dist", manifest["app.js"]);

let createApp: { default: (url: string) => { app: App<Element>, store: Store<any>, router: Router }};

server.use("/assets", express.static(path.join(process.cwd(), "dist", "assets")));
server.use("/js", express.static(path.join(process.cwd(), "dist", "js")));
server.use("/css", express.static(path.join(process.cwd(), "dist", "css")));
server.use("/", express.static(path.join(process.cwd(), "dist")));
server.get("*", async (req, res) => {
    console.log(req.path)
    if(createApp === undefined) createApp = await import(appPath);
  
    
    const { app, store} = await createApp.default(req.path)

    const renderedApp = await renderToString(app)
    const renderState = `
    <script>
      window.INITIAL_DATA = ${serialize(store.state)}
    </script>`;
    fs.readFile(path.join(__dirname, "/dist/static/index.html"), (err, html) => {
        if (err) {
          throw err
        }
          // 
        const appContent = `<div id="app">${renderState}${renderedApp}</div>`
   
        const outputHtml = html.toString().replace("<div id='app'></div>", `${appContent}`)
        res.setHeader("Content-Type", "text/html")
        res.send(outputHtml)
      })
});

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port: ${process.env.PORT || 3000}`);
});