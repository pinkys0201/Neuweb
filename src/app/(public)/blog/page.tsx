
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Schema';
import BlogClient from './BlogClient';

export const dynamic = 'force-dynamic'; // Ensure fresh data on every request

async function getBlogs() {
    await dbConnect();
    // Fetch only published blogs, sort by newest first
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).lean();

    // Convert _id and dates to serializable format if needed, though simple objects work often.
    // .lean() returns POJOs.
    return JSON.parse(JSON.stringify(blogs));
}

export default async function BlogListingPage() {
    const blogs = await getBlogs();

    return <BlogClient blogs={blogs} />;
}
