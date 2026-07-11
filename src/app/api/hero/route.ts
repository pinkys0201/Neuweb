import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Hero } from '@/models/Schema';

export async function GET() {
    try {
        await dbConnect();
        const hero = await Hero.findOne({});
        return NextResponse.json(hero || {});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch Hero data' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();

        let hero = await Hero.findOne({});
        if (hero) {
            hero = await Hero.findByIdAndUpdate(hero._id, body, { new: true });
        } else {
            hero = await Hero.create(body);
        }

        return NextResponse.json(hero);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update Hero data' }, { status: 500 });
    }
}
