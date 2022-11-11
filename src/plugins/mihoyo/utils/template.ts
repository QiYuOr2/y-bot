import path from 'path';
import fs from 'fs';
import pug from 'pug';
import puppeteer from 'puppeteer';

export function template(templateName: string, options: Record<string, any>) {
  const pugTemplate = fs.readFileSync(path.join(__dirname, '../views/', `${templateName}.pug`), 'utf-8');
  return pug.render(pugTemplate, options);
}

export async function render(html: string) {
 
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    timeout: 50000,
    defaultViewport: null
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html);
    await page.screenshot({
      path: path.join(__dirname, '../../../../assets/mihoyo/', `${Date.now()}.png`)
    });
  } finally{
    await browser.close();
  }
}