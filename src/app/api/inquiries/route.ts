import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Inquiry } from '@/models/Schema';

export async function GET() {
    try {
        await dbConnect();
        const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
        return NextResponse.json(inquiries);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 });
        }

        await dbConnect();
        const deletedInquiry = await Inquiry.findByIdAndDelete(id);

        if (!deletedInquiry) {
            return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
    }
}
