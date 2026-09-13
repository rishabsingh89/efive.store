import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function productsSyncPlugin() {
  return {
    name: 'products-sync-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-cms-codebase', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { products, categories, heroCMS } = JSON.parse(body);
              const filePath = path.resolve(process.cwd(), 'src/data/products.js');
              let fileContent = fs.readFileSync(filePath, 'utf-8');

              if (categories) {
                const catCode = `// --- CATEGORIES DATA START ---\nexport const categories = ${JSON.stringify(categories, null, 2)};\n// --- CATEGORIES DATA END ---`;
                const catRegex = /\/\/\s*--- CATEGORIES DATA START ---[\s\S]*?\/\/\s*--- CATEGORIES DATA END ---/;
                if (catRegex.test(fileContent)) {
                  fileContent = fileContent.replace(catRegex, catCode);
                } else {
                  const legacyCat = /export const categories = \[\s*[\s\S]*?\n\];/;
                  fileContent = fileContent.replace(legacyCat, `export const categories = ${JSON.stringify(categories, null, 2)};`);
                }
              }

              if (products) {
                const productsCode = `// --- PRODUCTS DATA START ---\nexport const products = ${JSON.stringify(products, null, 2)};\n// --- PRODUCTS DATA END ---`;
                const prodRegex = /\/\/\s*--- PRODUCTS DATA START ---[\s\S]*?\/\/\s*--- PRODUCTS DATA END ---/;
                if (prodRegex.test(fileContent)) {
                  fileContent = fileContent.replace(prodRegex, productsCode);
                } else {
                  const legacyProd = /export const products = \[\s*[\s\S]*?\n\];/;
                  fileContent = fileContent.replace(legacyProd, `export const products = ${JSON.stringify(products, null, 2)};`);
                }
              }

              if (heroCMS) {
                const heroCode = `// --- HERO DATA START ---\nexport const initialHeroCMS = ${JSON.stringify(heroCMS, null, 2)};\n// --- HERO DATA END ---`;
                const heroRegex = /\/\/\s*--- HERO DATA START ---[\s\S]*?\/\/\s*--- HERO DATA END ---/;
                if (heroRegex.test(fileContent)) {
                  fileContent = fileContent.replace(heroRegex, heroCode);
                }
              }

              fs.writeFileSync(filePath, fileContent, 'utf-8');
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: 'CMS data synced to codebase products.js' }));
            } catch (err) {
              console.error('Error saving CMS to codebase:', err);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          next();
        }
      });

      server.middlewares.use('/api/save-products-codebase', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const updatedProducts = JSON.parse(body);
              const filePath = path.resolve(process.cwd(), 'src/data/products.js');
              let fileContent = fs.readFileSync(filePath, 'utf-8');

              const productsCode = `// --- PRODUCTS DATA START ---\nexport const products = ${JSON.stringify(updatedProducts, null, 2)};\n// --- PRODUCTS DATA END ---`;

              const regex = /\/\/\s*--- PRODUCTS DATA START ---[\s\S]*?\/\/\s*--- PRODUCTS DATA END ---/;
              if (regex.test(fileContent)) {
                fileContent = fileContent.replace(regex, productsCode);
              } else {
                const legacyRegex = /export const products = \[\s*[\s\S]*?\n\];/;
                fileContent = fileContent.replace(legacyRegex, `export const products = ${JSON.stringify(updatedProducts, null, 2)};`);
              }

              fs.writeFileSync(filePath, fileContent, 'utf-8');
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: 'Products synced to codebase products.js' }));
            } catch (err) {
              console.error('Error saving to codebase:', err);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), productsSyncPlugin()],
});
