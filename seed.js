// Run with: npm run seed
// Populates the database with sample opportunities so the UI has data to show.
// Safe to re-run — it clears existing opportunities first.

const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Opportunity = require('./models/Opportunity');

dotenv.config();

const sampleOpportunities = [
  {
    title: 'Frontend Developer Intern',
    company: 'Brightloop Technologies',
    domain: 'Web Development',
    location: 'Bangalore (Hybrid)',
    experience: 'Fresher',
    description:
      'Work with the product team to build and improve customer-facing React interfaces. Great opportunity to learn component design, state management, and REST API integration in a real production codebase.',
    applicationLink: '',
  },
  {
    title: 'Backend Engineer Intern (Node.js)',
    company: 'DataForge Labs',
    domain: 'Web Development',
    location: 'Remote',
    experience: '0-1 years',
    description:
      'Help design and build REST APIs using Node.js and Express, work with MongoDB, and contribute to backend architecture decisions alongside senior engineers.',
    applicationLink: '',
  },
  {
    title: 'Data Analyst Intern',
    company: 'InsightWorks Analytics',
    domain: 'Data Science',
    location: 'Pune',
    experience: 'Fresher',
    description:
      'Analyze business datasets, build dashboards, and support the data science team with data cleaning and exploratory analysis using Python and SQL.',
    applicationLink: '',
  },
  {
    title: 'Machine Learning Intern',
    company: 'NimbusAI',
    domain: 'Data Science',
    location: 'Hyderabad (Hybrid)',
    experience: '0-1 years',
    description:
      'Assist in training and evaluating ML models for recommendation systems. Exposure to real-world datasets and model deployment pipelines.',
    applicationLink: '',
  },
  {
    title: 'Android Developer Intern',
    company: 'Pocketwave Apps',
    domain: 'Mobile Development',
    location: 'Remote',
    experience: 'Fresher',
    description:
      'Build features for a consumer Android app used by thousands of users. Work with Kotlin, Jetpack libraries, and modern Android architecture patterns.',
    applicationLink: '',
  },
  {
    title: 'Digital Marketing Intern',
    company: 'Northstar Media',
    domain: 'Marketing',
    location: 'Mumbai',
    experience: 'Fresher',
    description:
      'Support campaign planning across social media and email channels, analyze performance metrics, and assist with content calendars.',
    applicationLink: '',
  },
  {
    title: 'UI/UX Design Intern',
    company: 'Formcraft Studio',
    domain: 'Design',
    location: 'Remote',
    experience: 'Fresher',
    description:
      'Collaborate with product and engineering to design clean, usable interfaces. Work in Figma, contribute to the design system, and run basic usability checks.',
    applicationLink: '',
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'Vertex Software',
    domain: 'Web Development',
    location: 'Chennai (Hybrid)',
    experience: '0-1 years',
    description:
      'Work across the stack on a MERN-based internal tool — from database schema design to building React components and Express APIs.',
    applicationLink: '',
  },
];

const seed = async () => {
  try {
    await connectDB();
    await Opportunity.deleteMany({});
    console.log('Cleared existing opportunities.');

    const created = await Opportunity.insertMany(sampleOpportunities);
    console.log(`Inserted ${created.length} sample opportunities.`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();
