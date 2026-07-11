import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { About } from '@/models/Schema';

export async function GET() {
    try {
        await dbConnect();
        const about = await About.findOne({});
        return NextResponse.json(about || {});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch About data' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();

        let about = await About.findOne({});
        if (about) {
            about = await About.findByIdAndUpdate(about._id, body, { new: true });
        } else {
            about = await About.create(body);
        }

        return NextResponse.json(about);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update About data' }, { status: 500 });
    }
}
