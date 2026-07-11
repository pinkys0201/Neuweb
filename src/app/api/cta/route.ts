import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { CTA } from '@/models/Schema';

export async function GET() {
    try {
        await dbConnect();
        const cta = await CTA.findOne({});
        return NextResponse.json(cta || {});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch CTA data' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();

        let cta = await CTA.findOne({});
        if (cta) {
            cta = await CTA.findByIdAndUpdate(cta._id, body, { new: true });
        } else {
            cta = await CTA.create(body);
        }

        return NextResponse.json(cta);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update CTA data' }, { status: 500 });
    }
}
