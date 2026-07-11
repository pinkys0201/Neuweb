import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Inquiry } from '@/models/Schema';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();

        // Validate required fields (optional, as Schema also handles it)
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json({ error: 'Name, Email and Message are required' }, { status: 400 });
        }

        const newInquiry = await Inquiry.create(body);
        return NextResponse.json(newInquiry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
    }
}
