// server.js
const { createServer } = require('https');
const fs = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./certs/localhost-key.pem'),
  cert: fs.readFileSync('./certs/localhost.pem'),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {

    // Usa WHATWG URL API
    const urlObj = new URL(req.url, `https://${req.headers.host}`);

    // Converte para o formato que o Next exige
    const parsedUrl = {
      pathname: urlObj.pathname,
      query: Object.fromEntries(urlObj.searchParams),
    };

    handle(req, res, parsedUrl);

  }).listen(3000, () => {
    console.log('🚀 Server HTTPS rodando em https://localhost:3000');
  });
});
