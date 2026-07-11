import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Schema';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        await dbConnect();
        const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });

        if (!updatedBlog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(updatedBlog);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
