import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Service } from '@/models/Schema';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();
        const service = await Service.findById(id);
        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }
        return NextResponse.json(service);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        await dbConnect();
        const updatedService = await Service.findByIdAndUpdate(id, body, { new: true });

        if (!updatedService) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(updatedService);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();
        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
