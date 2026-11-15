// @ts-nocheck
// Servidor estático mínimo (sin dependencias) para la interfaz y las pruebas E2E.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const puerto = Number(process.env.PORT ?? 4173);
const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

createServer(async (req, res) => {
  let ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (ruta === '/') { res.writeHead(302, { Location: '/public/index.html' }).end(); return; }
  const archivo = normalize(join(raiz, ruta));
  if (!archivo.startsWith(raiz)) { res.writeHead(403).end(); return; }
  try {
    const contenido = await readFile(archivo);
    res.writeHead(200, { 'Content-Type': tipos[extname(archivo)] ?? 'application/octet-stream' });
    res.end(contenido);
  } catch {
    res.writeHead(404).end('No encontrado');
  }
}).listen(puerto, () => console.log(`Servidor en http://localhost:${puerto}`));
