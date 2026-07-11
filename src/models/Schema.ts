
import mongoose, { Schema, model, models } from 'mongoose';

// --- User Schema ---
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
    image: { type: String },
}, { timestamps: true });

export const User = models.User || model('User', UserSchema);

// --- Service Schema ---
const ServiceSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String }, // HTML or Markdown
    icon: { type: String }, // Icon class or URL
    image: { type: String }, // Featured Image
    features: [{ type: String }],
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Service = models.Service || model('Service', ServiceSchema);

// --- Portfolio Project Schema ---
const PortfolioSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true }, // Main Image
    gallery: [{ type: String }], // Additional Images
    client: { type: String },
    completionDate: { type: Date },
    description: { type: String },
    technologies: [{ type: String }],
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
}, { timestamps: true });

export const Portfolio = models.Portfolio || model('Portfolio', PortfolioSchema);

// --- Blog Schema ---
const BlogSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true }, // Rich Text
    excerpt: { type: String },
    image: { type: String },
    author: { type: String }, // Could reference User
    category: { type: String },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
}, { timestamps: true });

export const Blog = models.Blog || model('Blog', BlogSchema);

// --- Inquiry / Lead Schema ---
const InquirySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    serviceInterest: { type: String },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true });

export const Inquiry = models.Inquiry || model('Inquiry', InquirySchema);

// --- Testimonial Schema ---
const TestimonialSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String },
    company: { type: String },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    image: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Testimonial = models.Testimonial || model('Testimonial', TestimonialSchema);

// --- Website Settings Schema ---
const SettingsSchema = new Schema({
    siteName: { type: String, default: 'NeuApex' },
    logoConfig: {
        text: { type: String },
        image: { type: String },
    },
    contactInfo: {
        email: { type: String },
        phone: { type: String },
        address: { type: String },
    },
    socialLinks: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        linkedin: { type: String },
    },
    seoDefaults: {
        title: { type: String },
        description: { type: String },
        keywords: { type: String },
    },
}, { timestamps: true });

export const Settings = models.Settings || model('Settings', SettingsSchema);

// --- Hero Section Schema ---
const HeroSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    bgImage: { type: String }, // URL
    ctaText: { type: String },
    ctaLink: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Hero = models.Hero || model('Hero', HeroSchema);

// --- About Section Schema ---
const AboutSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // Rich Text / HTML
    image: { type: String },
    stats: [{
        label: { type: String },
        value: { type: String },
    }],
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const About = models.About || model('About', AboutSchema);

// --- CTA Section Schema ---
const CtaSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    bgImage: { type: String },
    buttonText: { type: String },
    buttonLink: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const CTA = models.CTA || model('CTA', CtaSchema);
