const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log("Navigating to WeyBee...");
  await page.goto('https://weybee.com/', { waitUntil: 'networkidle2' });

  console.log("Extracting accurate layout and style data...");
  const styleData = await page.evaluate(() => {
    const getStyles = (element) => {
      const compStyles = window.getComputedStyle(element);
      return {
        width: compStyles.width,
        height: compStyles.height,
        padding: compStyles.padding,
        margin: compStyles.margin,
        backgroundColor: compStyles.backgroundColor,
        color: compStyles.color,
        fontSize: compStyles.fontSize,
        fontWeight: compStyles.fontWeight,
        fontFamily: compStyles.fontFamily,
        borderRadius: compStyles.borderRadius,
        display: compStyles.display,
        justifyContent: compStyles.justifyContent,
        alignItems: compStyles.alignItems,
        transition: compStyles.transition,
        animation: compStyles.animation,
        boxShadow: compStyles.boxShadow,
        border: compStyles.border,
      };
    };

    const data = {
      buttons: [],
      heroSection: null,
      navbar: null
    };

    // Navbar
    const nav = document.querySelector('header') || document.querySelector('nav');
    if (nav) {
      data.navbar = {
        tag: nav.tagName,
        classes: nav.className,
        styles: getStyles(nav),
        rect: nav.getBoundingClientRect()
      };
    }

    // Hero Section
    const hero = document.querySelector('section') || document.querySelector('.hero') || document.querySelector('main > div');
    if (hero) {
      data.heroSection = {
        classes: hero.className,
        styles: getStyles(hero),
        rect: hero.getBoundingClientRect()
      };
    }

    // Buttons & CTAs
    const buttons = document.querySelectorAll('a, button, .btn');
    const seenClasses = new Set();
    buttons.forEach(btn => {
        // filter out hidden or empty buttons
        if(btn.innerText.trim() === '') return;
        
        // try to get only primary buttons to avoid too much noise
        const comp = window.getComputedStyle(btn);
        if (comp.display === 'none') return;
        
        // Let's capture if it has a background color or border
        if (comp.backgroundColor !== 'rgba(0, 0, 0, 0)' || comp.border !== '0px none rgb(0, 0, 0)') {
            const classList = Array.from(btn.classList).join('.');
            if (!seenClasses.has(classList) && data.buttons.length < 20) {
                seenClasses.add(classList);
                data.buttons.push({
                    text: btn.innerText.trim().substring(0, 30),
                    tag: btn.tagName,
                    classes: btn.className,
                    styles: getStyles(btn),
                    rect: btn.getBoundingClientRect()
                });
            }
        }
    });

    return data;
  });

  fs.writeFileSync('layout_metrics.json', JSON.stringify(styleData, null, 2));
  console.log("Saved layout and style data to layout_metrics.json");
  await browser.close();
})();
