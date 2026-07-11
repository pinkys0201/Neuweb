import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Service } from '@/models/Schema';


export async function GET() {
    try {
        await dbConnect();
        const services = await Service.find({}).sort({ createdAt: -1 });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch services', details: (error as Error).message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        // const session = await getServerSession(authOptions);
        // if (!session) {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const body = await req.json();
        await dbConnect();

        const newService = await Service.create(body);
        return NextResponse.json(newService, { status: 201 });
    } catch (error) {
        console.error("Error creating service:", error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
