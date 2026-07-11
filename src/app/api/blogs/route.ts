import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Schema';

export async function GET() {
    try {
        await dbConnect();
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        return NextResponse.json(blogs);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();

        const newBlog = await Blog.create(body);
        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
