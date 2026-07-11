import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Portfolio } from '@/models/Schema';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();
        const item = await Portfolio.findById(id);
        if (!item) {
            return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
        }
        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch portfolio item' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        await dbConnect();
        const updatedItem = await Portfolio.findByIdAndUpdate(id, body, { new: true });

        if (!updatedItem) {
            return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
        }

        return NextResponse.json(updatedItem);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();
        const deletedItem = await Portfolio.findByIdAndDelete(id);

        if (!deletedItem) {
            return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Portfolio item deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 });
    }
}
