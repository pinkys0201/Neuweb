import dbConnect from '@/lib/db';
import { Portfolio } from '@/models/Schema';
import PortfolioClient from './PortfolioClient';

export const dynamic = 'force-dynamic';

async function getProjects() {
    await dbConnect();
    // Fetch all portfolios sorted by date
    const projects = await Portfolio.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
}

export default async function PortfolioListingPage() {
    const projects = await getProjects();

    return <PortfolioClient projects={projects} />;
}
