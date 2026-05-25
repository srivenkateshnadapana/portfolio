import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Navigating to reference site...');
  await page.goto('https://akhil-profolio.vercel.app/', {waitUntil: 'networkidle2'});
  
  console.log('Taking reference screenshot...');
  await page.screenshot({path: 'reference.png', fullPage: true});

  console.log('Navigating to localhost...');
  // Ensure localhost is running, handle failure gracefully
  try {
    await page.goto('http://localhost:5173', {waitUntil: 'networkidle2', timeout: 10000});
    console.log('Taking localhost screenshot...');
    await page.screenshot({path: 'local.png', fullPage: true});
  } catch (e) {
    console.log('Could not load localhost. Is the dev server running?', e.message);
  }
  
  await browser.close();
  console.log('Done.');
})();
