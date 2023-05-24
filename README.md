# Vue 3 + Vite + SSR

This was adjusted from the code in [this article](https://dev.to/akbarnafisa/my-first-time-implementing-ssr-using-vue-3-and-vite-e06). I stripped it down further and removed TypeScript (as there wasn't any TypeScript in the code anyway).

## Usage

### Setup
```bash
git clone vite-vue-ssr-starter
cd vite-vue-ssr-starter
npm ci
```

### Dev Server
```bash
npm run dev
```

The site should be available at http://localhost:8000.

### Production
```bash
npm run build
npm run start
```

The production site should also be available at http://localhost:8000.

## To-Dos
- [ ] Improve dealing with production index.html in `server.js`.
- [ ] Should Vite actually be a `devDependency` if it's required for actually running the app?
