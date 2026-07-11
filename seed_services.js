const axios = require('axios');

const services = [
    {
        title: "Website Designing",
        slug: "website-designing",
        shortDescription: "We create visually stunning and responsive websites that not only look great but also provide a seamless user experience, ensuring visitors stay longer and engage with your brand.",
        icon: "FaPaintBrush"
    },
    {
        title: "Web Development",
        slug: "web-development",
        shortDescription: "Our team builds high-performance, scalable websites with clean code and modern technologies, tailored to meet your unique business requirements.",
        icon: "FaCode"
    },
    {
        title: "UI/UX Design",
        slug: "ui-ux-design",
        shortDescription: "We design intuitive interfaces and smooth user experiences that make your website or app easy to navigate and highly engaging.",
        icon: "FaLayerGroup"
    },
    {
        title: "App Development",
        slug: "app-development",
        shortDescription: "From concept to deployment, we develop mobile and web applications that drive growth, improve efficiency, and enhance user engagement.",
        icon: "FaMobileAlt"
    },
    {
        title: "Digital Marketing",
        slug: "digital-marketing",
        shortDescription: "Boost your online presence with comprehensive digital marketing strategies including SEO, social media, paid ads, and content marketing to reach the right audience.",
        icon: "FaBullhorn"
    },
    {
        title: "Search Engine Optimization",
        slug: "seo",
        shortDescription: "Improve your website’s visibility and rank higher on search engines with result-driven SEO strategies that attract quality traffic and boost conversions.",
        icon: "FaSearch"
    },
    {
        title: "Social Media Marketing",
        slug: "social-media-marketing",
        shortDescription: "Grow your brand visibility with targeted social media strategies that engage your audience, drive conversions, and build lasting online relationships.",
        icon: "FaShareAlt"
    },
    {
        title: "Graphic Designing",
        slug: "graphic-designing",
        shortDescription: "Our creative designers craft visuals, logos, and brand elements that communicate your message clearly and leave a lasting impression.",
        icon: "FaPalette"
    }
];

async function seed() {
    console.log('Starting seed process...');
    try {
        // Optional: Get existing services and delete them to avoid duplicates (or just assume fresh start)
        // For now, we'll just add. If duplicates exist by slug, the API/DB might handle or error.
        // But relying on API is safer.

        for (const service of services) {
            try {
                // Check if exists (simple check via slug if API listing allows, or just POST and ignore duplicate error if unique constraint exists)
                // We'll just POST. 
                await axios.post('http://localhost:3000/api/services', service);
                console.log(`Added: ${service.title}`);
            } catch (err) {
                console.error(`Failed to add ${service.title}:`, err.message);
            }
        }
        console.log('Seeding complete.');
    } catch (error) {
        console.error('Seeding critical failure:', error);
    }
}

seed();
