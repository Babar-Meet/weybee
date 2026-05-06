// Static content index — imports individual page JSON files
// Prebuild script auto-updates these JSON files from MongoDB on each deploy
import home from './pages/home.json';
import aboutUs from './pages/about-us.json';
import contactUs from './pages/contact-us.json';
import careers from './pages/careers.json';
import successStories from './pages/success-stories.json';
import services from './pages/services.json';

const staticContent = {
  'home': home,
  'about-us': aboutUs,
  'contact-us': contactUs,
  'careers': careers,
  'success-stories': successStories,
  'services': services
};

export default staticContent;
