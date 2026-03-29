const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const startServer = async (port) => {
  try {
    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)
    })
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is in use. Detecting if another port is used and skipping...`)
        startServer(port + 1)
      } else {
        console.error(err)
        process.exit(1)
      }
    })

    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

app.prepare().then(() => {
  startServer(3000)
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
