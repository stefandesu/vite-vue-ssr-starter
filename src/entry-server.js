import { renderToString } from "vue/server-renderer"
import { createApp } from "./main.js"

export const render = async () => {
  const { app } = createApp()
  const html = await renderToString(app)

  return {
    html,
  }
}
