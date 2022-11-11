import path from 'path';
import fs from 'fs';
import pug from 'pug';
import puppeteer from 'puppeteer';

export function template(templateName: string, options: Record<string, any>) {
  const pugTemplate = fs.readFileSync(path.join(__dirname, '../views/', `${templateName}.pug`), 'utf-8');
  return pug.render(pugTemplate, options);
}

export async function render(html: string) {
  const time = Date.now();
 
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    timeout: 50000,
    defaultViewport: { width: 280, height: 500 }
  });

  html = html.replace(/<link rel="stylesheet" href="styles\/(.*?)\.css">/g, (...args) => {
    const styleName = args[1];
    const styleContent = fs.readFileSync(path.join(__dirname, `../views/styles/${styleName}.css`), 'utf-8');
    return `<style>${styleContent}</style>`;
  });

  console.log(html);

  try {
    const page = await browser.newPage();
    await page.setContent(html);
    await page.screenshot({
      path: path.join(__dirname, '../../../../assets/mihoyo/', `${time}.png`)
    });

    return time; 
  } finally{
    await browser.close();
  }
}