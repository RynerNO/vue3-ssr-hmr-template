

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



server.use("/assets", express.static(path.join(process.cwd(), "dist", "assets")));
server.use("/js", express.static(path.join(process.cwd(), "dist", "js")));
server.use("/css", express.static(path.join(process.cwd(), "dist", "css")));
server.use("/", express.static(path.join(process.cwd(), "dist")));
server.get("*", async (req, res) => {
    let { createApp } = await import(appPath);
  
    
    const { app, store} = await createApp(req.path)

    const renderedApp = await renderToString(app)
    const renderState = `
    <script>
      window.INITIAL_DATA = ${serialize(store.state)}
    </script>`;
    fs.readFile(path.join(__dirname, "/dist/static/index.html"), (err, html) => {
        if (err) {
          throw err
        }
    
        const outputHtml = html.toString().replace("<!--SSR-CONTENT-PLACEHOLDER-->", `${renderState}${renderedApp}`)
        res.setHeader("Content-Type", "text/html")
      console.log(outputHtml)
        res.send(outputHtml)
      })
});

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port: ${process.env.PORT || 3000}`);
});