import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { join } from 'path';
import { renderApplication } from '@angular/platform-server';
import bootstrap from './main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/salon-management/browser');
  const indexHtml = join(process.cwd(), 'dist/salon-management/browser/index.html');

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    renderApplication(bootstrap, {
      document: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      platformProviders: [
        { provide: APP_BASE_HREF, useValue: baseUrl }
      ]
    }).then(html => {
      res.send(html);
    }).catch(err => {
      console.error('Error:', err);
      res.status(500).send('Server Error');
    });
  });

  return server;
}

// Start up the Node server
const port = process.env['PORT'] || 4000;
const server = app();
server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
