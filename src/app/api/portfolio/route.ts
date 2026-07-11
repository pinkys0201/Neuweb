import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Portfolio } from '@/models/Schema';

export async function GET() {
    try {
        await dbConnect();
        const items = await Portfolio.find({}).sort({ createdAt: -1 });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch portfolio items' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();

        const newItem = await Portfolio.create(body);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create portfolio item' }, { status: 500 });
    }
}
