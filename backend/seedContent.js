const PageContent = require('./models/PageContent');

async function seedContent() {
  const count = await PageContent.countDocuments();
  if (count > 0) return console.log('📄 Content already seeded.');

  const pages = [
    {
      pageSlug: 'home', title: 'Home', isPublished: true,
      metaDescription: 'WeyBee - Your Trusted IT Services & Technology Partner',
      sections: [
        {
          sectionId: 'hero', order: 0, bgColor: '#5670FB',
          heading: 'Growing Smarter\nLeading Greater',
          text: 'At WeyBee Solutions Pvt. Ltd., we help businesses thrive by delivering innovative and dependable IT solutions tailored for the modern digital landscape.',
          image: '/assets/Weybee-Growing-Smarter-Leading.webp',
          items: [{ title: 'Get in Touch Now', link: '/contact-us' }]
        },
        {
          sectionId: 'hero-2', order: 1, bgColor: '#5670FB',
          heading: 'Your Trusted IT Services & Technology Partner',
          text: 'At WeyBee Solutions Pvt. Ltd., we empower businesses through cutting-edge and reliable IT services tailored to meet today\'s digital demands.',
          image: '/assets/Weybee-Empowering.webp',
          items: [
            { title: 'Get in Touch Now', link: '/contact-us' },
            { title: 'View Services', link: '/services' }
          ]
        },
        {
          sectionId: 'services', order: 2, bgColor: '#fff',
          heading: 'Our Core Services',
          items: [
            { title: 'IT Staff Augmentation', description: 'Leverage our expertise to build efficient, future-ready systems that scale with your business.', image: '/assets/WeyBee-IT-Staff-Augmentation.webp', link: '/it-staff-augmentation' },
            { title: 'Software Development Services', description: 'Custom software solutions designed to drive growth and streamline operations.', image: '/assets/WeyBee-Software-Development.webp', link: '/software-development-services' },
            { title: 'IT Services for Startups', description: 'End-to-end MVP development and tech support tailored for startups.', image: '/assets/WeyBee-IT-Services-Startups.webp', link: '/it-services-for-startups' },
            { title: 'Data Engineering', description: 'Data scraping, AI-ML Engineering and smart technology solutions.', image: '/assets/DataEngineering-Weybee-Services-1.webp', link: '/data-engineering' }
          ]
        },
        {
          sectionId: 'about', order: 3, bgColor: '#f4f6fa',
          heading: 'WeyBee', subheading: 'About',
          text: 'At WeyBee, we believe in the power of technology to transform businesses and shape the future. Our mission is to deliver world-class IT and software solutions that drive success for organizations globally. We offer a comprehensive range of services, including IT Staff Augmentation, Software Development, Data Engineering and Digital Marketing.',
          image: '/assets/About-WeyBee-2.jpg',
          items: [
            { title: '145+', description: 'Projects Completed' },
            { title: '113+', description: 'Satisfied Clients' },
            { title: '50+', description: 'Employees' },
            { title: '90%', description: "Employee's Retention" }
          ]
        },
        {
          sectionId: 'why-weybee', order: 4, bgColor: '#fff',
          heading: 'Why WeyBee', subheading: 'Building Long-Term Relationships',
          text: 'Choosing the right technology partner is crucial for your success. At WeyBee, we combine expertise, innovation and commitment. Here\'s why you should choose us:',
          items: [
            { title: 'Dedicated Vetted Developers', description: 'Our experienced developers ensure exceptional results for your projects.', icon: '🎓' },
            { title: 'Transparent Operations', description: 'We maintain open communication, keeping you informed throughout the process.', icon: '🔍' },
            { title: 'Diverse Expertise', description: 'Our team specializes in IT staff augmentation, software development, digital marketing, and data engineering.', icon: '🧩' },
            { title: 'Long-Term Partnership', description: 'Average partnership of 3.5 years – we grow alongside your business.', icon: '🤝' },
            { title: 'Client Satisfaction', description: '95% client satisfaction rate – delivering what we promise, consistently.', icon: '😊' },
            { title: 'Proven Growth', description: '30% average profitability increase for our clients through optimized technology.', icon: '📈' },
            { title: 'Innovative Approach', description: 'We stay ahead of trends, integrating the latest tech to keep you competitive.', icon: '💡' },
            { title: 'Expert vetted Skilled Talent', description: 'Access a deep pool of certified professionals across all technology stacks.', icon: '👨‍💻' },
            { title: 'Strategic Partnership', description: 'We align with your business goals to deliver maximum ROI and strategic value.', icon: '🎯' }
          ]
        },
        {
          sectionId: 'engagement-models', order: 5, bgColor: '#f4f6fa',
          heading: 'Flexible Business', subheading: 'Engagement Models',
          items: [
            { title: 'Dedicated Team Model', description: 'Integrate our offshore team members as a seamless extension of your in-house staff.', image: '/assets/WeyBee-Dedicated-Team-Model.jpg' },
            { title: 'Pay as you Go Model', description: 'Get flexibility to scale up or down as needed, paying only for the hours worked.', image: '/assets/WeyBee-Pay-as-you-Go-Model.jpg' },
            { title: 'Fixed Price Model', description: 'Predictable costs and timelines—ideal for well-defined projects with clear deliverables.', image: '/assets/WeyBee-Fixed-Price-Model.jpg' }
          ]
        },
        {
          sectionId: 'technology', order: 6, bgColor: '#fff',
          heading: 'Technology Expertise',
          items: [
            { title: 'React', image: '/assets/WeyBee-Technology-React.jpg' },
            { title: 'Vue', image: '/assets/WeyBee-Technology-Vue.jpg' },
            { title: 'Next', image: '/assets/WeyBee-Technology-Next.jpg' },
            { title: 'Angular', image: '/assets/WeyBee-Technology-Angular.jpg' },
            { title: 'AWS', image: '/assets/WeyBee-Technology-AWS.jpg' },
            { title: 'Azure', image: '/assets/WeyBee-Technology-Azure.jpg' },
            { title: 'Python', image: '/assets/WeyBee-TechnologyPython.jpg' },
            { title: '.NET Core', image: '/assets/WeyBee-Technology-NET-Core.jpg' },
            { title: 'IOT', image: '/assets/WeyBee-Technology-IOT.jpg' },
            { title: 'Laravel', image: '/assets/WeyBee-Technology-Laravel.jpg' },
            { title: 'AI', image: '/assets/WeyBee-Technology-AI.jpg' }
          ]
        },
        {
          sectionId: 'newsletter', order: 7, bgColor: '#f4f6fa',
          heading: 'Stay Updated',
          text: 'Stay connected with WeyBee and receive occasional updates filled with valuable insights. We promise no spam or irrelevant emails—just pure excellence!',
          image: '/assets/Weybee-Stay-Update-Newsletter.webp'
        }
      ]
    },
    {
      pageSlug: 'about-us', title: 'About Us', isPublished: true,
      metaDescription: 'Learn about WeyBee - Our mission, values, and team',
      sections: [
        {
          sectionId: 'hero', order: 0, bgColor: '#5670FB',
          heading: 'About Us',
          text: 'At WeyBee, we believe in the power of technology to transform businesses and shape the future.'
        },
        {
          sectionId: 'about', order: 1, bgColor: '#fff',
          heading: 'WeyBee', subheading: 'About',
          text: 'At WeyBee, we believe in the power of technology to transform businesses and shape the future. Our mission is to deliver world-class IT and software solutions that drive success for organizations globally. We offer a comprehensive range of services, including IT Staff Augmentation, Software Development, Data Engineering and Digital Marketing.',
          image: '/assets/About-WeyBee-2.jpg'
        },
        {
          sectionId: 'stats', order: 2, bgColor: '#5670FB',
          items: [
            { title: '145+', description: 'Projects Completed' },
            { title: '113+', description: 'Satisfied Clients' },
            { title: '50+', description: 'Employees' },
            { title: '90%', description: "Employee's Retention" }
          ]
        },
        {
          sectionId: 'core-values', order: 3, bgColor: '#f4f6fa',
          heading: 'Our Core Values',
          items: [
            { title: 'W - Work', description: 'Culture of Excellence. Foster Creativity, Teamwork & Innovation for Outstanding Results.' },
            { title: 'E - Educate', description: 'Continuous Learning to Empower Both the Team and Clients in the Fast-Paced IT Industry.' },
            { title: 'Y - You-Focused', description: 'Centered on understanding and Delivering Personalised Solution for Clients, Employees, and Partners.' },
            { title: 'B - Betterment', description: 'Focus on improvement through every project and interaction to create a better future.' },
            { title: 'E - Efforts', description: 'Dedication and hard work drive long-lasting success.' },
            { title: 'E - Ethics', description: 'Uphold integrity, transparency, and fairness in every partnership.' }
          ]
        }
      ]
    },
    {
      pageSlug: 'contact-us', title: 'Contact Us', isPublished: true,
      metaDescription: 'Contact WeyBee for IT solutions and technology partnerships',
      sections: [
        {
          sectionId: 'hero', order: 0, bgColor: '#5670FB',
          heading: 'Contact Us',
          text: 'Reach out today, and let\'s discuss how we can accelerate your business growth with innovative technology solutions.'
        },
        {
          sectionId: 'offices', order: 1, bgColor: '#fff',
          heading: 'Our Offices',
          items: [
            { title: 'Rajkot, India', description: '303, Nakshatra Heights, 150 Feet Ring Road, Rajkot, Gujarat', icon: '+91 88660 08860' },
            { title: 'Ahmedabad, India', description: '1012, Aaron Spectra, Rajpath Rangoli Rd, Ahmedabad, Gujarat', icon: '+91 88660 08860' },
            { title: 'Sydney, Australia', description: 'WOTSO Pyrmont, 3/55 Pyrmont Bridge Rd, Pyrmont NSW 2009', icon: '+61 2 8024 5936' }
          ]
        }
      ]
    },
    {
      pageSlug: 'careers', title: 'Careers', isPublished: true,
      metaDescription: 'Join WeyBee - Explore career opportunities in IT',
      sections: [
        {
          sectionId: 'hero', order: 0, bgColor: '#5670FB',
          heading: 'Careers at WeyBee',
          text: 'We are more than just an IT services company — we are a community of thinkers, creators, and innovators.'
        },
        {
          sectionId: 'culture', order: 1, bgColor: '#f4f6fa',
          heading: 'Our Culture',
          items: [
            { title: 'Fun', description: 'We never miss a chance to come together and Celebrate. We celebrate Indian/Global Events & Festivals, organize Team Lunch, Outings, and play challenging indoor-games.', icon: '🎉' },
            { title: 'Learn', description: 'Our business growth inevitably gives opportunities to learn. Training Program, External Courses, LLM (Learn – Leverage – Master) to fast-track learning.', icon: '📚' },
            { title: 'Growth', description: 'We take responsibility of individual growth. We chart Career Growth for each achiever, coach life skills to navigate better in personal life.', icon: '🚀' }
          ]
        },
        {
          sectionId: 'positions', order: 2, bgColor: '#fff',
          heading: 'Open Positions',
          items: [
            { title: 'Full Stack Developer (Vue.js / Python)' },
            { title: 'AI-First Full Stack Developer (.NET)' },
            { title: 'Sr. Python Backend Developer (Tech Lead)' },
            { title: 'Data Analyst Lead' },
            { title: 'Associate Software Architect' },
            { title: 'Fullstack .Net Developer' },
            { title: 'Digital Marketing Manager' },
            { title: 'Senior Python Backend Engineer (AI/ML, Scalable Systems)' },
            { title: 'Internship' }
          ]
        }
      ]
    },
    {
      pageSlug: 'services', title: 'Services', isPublished: true,
      metaDescription: 'Explore WeyBee Services - IT Staff Augmentation, Software Development, Data Engineering, and Startups IT Services',
      sections: [
        {
          sectionId: 'hero', order: 0, bgColor: '#5670FB',
          heading: 'Our Services',
          text: 'We specialize in end-to-end development, from ideation and design to deployment and maintenance. Our solutions are built to scale, innovate, and deliver results.'
        },
        {
          sectionId: 'services-list', order: 1, bgColor: '#fff',
          items: [
            {
              title: 'IT Staff Augmentation',
              image: 'WeyBee-IT-Staff-Augmentation.webp',
              description: 'Access to highly skilled IT professionals. Flexible, scalable solutions for all project sizes.',
              icon: 'Hire Developers, Hire QA Engineers, Hire Managed Team',
              link: '/it-staff-augmentation'
            },
            {
              title: 'Software Development Services',
              image: 'WeyBee-Software-Development.webp',
              description: 'Transform ideas into reality with our expert Software Development Services.',
              icon: 'Web Development, eCommerce, Mobile App, Platform Engineering',
              link: '/software-development-services'
            },
            {
              title: 'IT Services for Startups',
              image: 'WeyBee-IT-Services-Startups.webp',
              description: 'End-to-end MVP development and tech support tailored for startups.',
              icon: 'MVP Development, End-to-End Tech Support, Cloud Solutions',
              link: '/it-services-for-startups'
            },
            {
              title: 'Data Engineering',
              image: 'DataEngineering-Weybee-Services-1.webp',
              description: 'Data scraping, AI-ML Engineering and reliable, scalable platforms.',
              icon: 'Data Scraping, AI-ML Engineering, Data Warehousing',
              link: '/data-engineering'
            }
          ]
        },
        {
          sectionId: 'cta', order: 2, bgColor: '#5670FB',
          heading: 'Ready to get started?',
          text: 'Let\'s discuss how our services can help you achieve your goals.'
        }
      ]
    },
    {
      pageSlug: 'success-stories', title: 'Success Stories', isPublished: true,
      metaDescription: 'Read about WeyBee success stories and client experiences',
      sections: [
        {
          sectionId: 'featured', order: 0, bgColor: 'transparent',
          heading: 'Smart Health Monitoring System',
          text: 'Developed a comprehensive remote patient monitoring platform that increased doctor efficiency by 40%.',
          link: 'https://example.com/case-study-health'
        },
        {
          sectionId: 'hero', order: 1, bgColor: '#fff',
          heading: 'Transforming Ideas into Digital Reality',
          text: 'Discover how we\'ve helped businesses across various industries achieve their goals through innovative technology solutions and dedicated partnership.'
        },
        {
          sectionId: 'stats', order: 2, bgColor: '#5670FB',
          items: [
            { title: '145+', label: 'Projects Delivered' },
            { title: '95%', label: 'Client Retention' },
            { title: '30%', label: 'Avg. ROI Increase' },
            { title: '15+', label: 'Industries Served' }
          ]
        }
      ]
    }
  ];

  for (const page of pages) {
    const exists = await PageContent.findOne({ pageSlug: page.pageSlug });
    if (!exists) {
      await PageContent.create(page);
    }
  }
  console.log('📄 Seeded pages checked and created if missing.');
}

module.exports = seedContent;
