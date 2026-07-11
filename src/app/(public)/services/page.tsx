import dbConnect from '@/lib/db';
import { Service } from '@/models/Schema';
import ServicesClient from './ServicesClient';

export const dynamic = 'force-dynamic';

async function getServices() {
    await dbConnect();
    // Fetch only active services
    const services = await Service.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(services));
}

export default async function ServicesListingPage() {
    const services = await getServices();

    return <ServicesClient services={services} />;
}
