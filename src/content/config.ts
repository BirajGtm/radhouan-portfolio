/**
 * CONTENT SCHEMA CONFIGURATION
 * Defines the data structure (Zod validation) for all Blog and Project entries.
 * Crucial Fields:
 * - 'visible': Hides items site-wide if false.
 * - 'featured': Promotes items to the homepage if true.
 * - 'category': Drives automated routing and suggestions (Coding vs. IT).
 */
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// This ensures every blog post has these fields
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
        tags: z.array(z.string()).optional()
	}),
});

const projects = defineCollection({
    type: 'content',
    // This ensures every project has these fields
    schema: z.object({
        title: z.string(),
        description: z.string(),
        stack: z.array(z.string()), // e.g. ["Python", "React"]
        heroImage: z.string().optional(),
        image: z.string().optional(),
        fallbackIcon: z.string().optional(),
        repoUrl: z.string().optional(),
        liveUrl: z.string().optional(),
        role: z.string().optional(),
        timeline: z.string().optional(),
        visible: z.boolean().default(true),
        featured: z.boolean().default(false),
        category: z.string().optional(), // "Coding" or "IT"
        order: z.number().optional(),
    })
});

// Export collections so Astro knows they exist
export const collections = { blog, projects };