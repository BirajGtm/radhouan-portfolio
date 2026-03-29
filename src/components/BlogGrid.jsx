/**
 * BLOG GRID DASHBOARD
 * Powers the main /blog index. Features:
 * 1. Search Bar: Instant filtering by post titles and descriptions.
 * 2. Tag Filter: Dynamic categorization by article tags.
 * 3. Feature Post: Automatically highlights the latest post with a larger layout.
 */
import React, { useState, useMemo } from 'react';

export default function BlogGrid({ posts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');

    // Extract all unique tags
    const allTags = useMemo(() => {
        const tags = new Set(['All']);
        posts.forEach(post => {
            post.tags?.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [posts]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesTag = selectedTag === 'All' || post.tags?.includes(selectedTag);

            return matchesSearch && matchesTag;
        });
    }, [posts, searchTerm, selectedTag]);

    return (
        <div className="space-y-8">
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                {/* Search */}
                <div className="relative w-full md:w-96">
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                </div>

                {/* Tags Filter */}
                <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTag === tag
                                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                    <div key={post.id} className={`${index === 0 && searchTerm === '' && selectedTag === 'All' ? 'md:col-span-2' : ''} group`}>
                        <a 
                            href={post.isExternal ? `/blog/devto/${post.slug}/` : `/blog/${post.id}/`} 
                            className="block h-full"
                        >
                            <article className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-300">
                                {post.heroImage && (
                                    <div className={`overflow-hidden ${index === 0 && searchTerm === '' && selectedTag === 'All' ? 'h-64 md:h-96' : 'h-56'}`}>
                                        <img
                                            src={post.heroImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 mb-4 text-xs font-medium">
                                        <span className="font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                            {new Date(post.pubDate).toLocaleDateString('en-us', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                        <span className="text-slate-300 dark:text-slate-600">•</span>
                                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {post.readingTime}
                                        </span>
                                    </div>

                                    <h2 className={`font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors ${index === 0 && searchTerm === '' && selectedTag === 'All' ? 'text-3xl' : 'text-xl'}`}>
                                        {post.title}
                                    </h2>

                                    {post.description && (
                                        <p className="text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 flex-grow">
                                            {post.description}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex gap-2">
                                            {post.tags?.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="text-primary font-bold text-sm flex items-center">
                                            Read Article <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </a>
                    </div>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No articles found</h3>
                    <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filter to find what you're looking for.</p>
                    <button
                        onClick={() => { setSearchTerm(''); setSelectedTag('All'); }}
                        className="mt-6 text-primary font-medium hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}
