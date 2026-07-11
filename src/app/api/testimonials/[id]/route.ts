import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Testimonial } from '@/models/Schema';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();
        const testimonial = await Testimonial.findById(id);
        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }
        return NextResponse.json(testimonial);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        await dbConnect();
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true });

        if (!updatedTestimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        return NextResponse.json(updatedTestimonial);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

        if (!deletedTestimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
