import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Testimonial } from '@/models/Schema';

export async function GET() {
    try {
        await dbConnect();
        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();

        const newTestimonial = await Testimonial.create(body);
        return NextResponse.json(newTestimonial, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}
