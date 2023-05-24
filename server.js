import express from "express"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, p)
const isProduction = process.env.NODE_ENV === "production"

async function initServer() {
  const app = express()

  let vite
  if (!isProduction) {
    vite = await (await import("vite")).createServer({
      server: {
        middlewareMode: true,
        hmr: {
          port: 8001
        }
      },
      appType: "custom",
    })
    app.use(vite.middlewares)
  } else {
    // Serve static files from dist/client
    app.use((await import("serve-static")).default(resolve("dist/client"), {
      index: false,
    }))
  }

  app.use("*", async (req, res) => {
    // TODO: Reading production file can be done only once
    const templateFile = isProduction ? "dist/client/index.html" : "index.html"
    let template = fs.readFileSync(path.resolve(__dirname, templateFile), "utf-8")

    if (!isProduction) {
      template = await vite.transformIndexHtml(req.originalUrl, template)
    }

    const { render } = isProduction
      ? (await import("./dist/server/entry-server.js"))
      : (await vite.ssrLoadModule("./src/entry-server.js"))

    const { html: appHtml } = await render()
    const html = template.replace("<!--main-app-->", appHtml)

    res.set({ "Content-Type": "text/html" }).end(html)
  })

  return app
}

initServer().then((app) =>
  app.listen(8000, () => {
    console.log("ready")
  })
)
