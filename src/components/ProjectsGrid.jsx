/**
 * PROJECTS GRID DASHBOARD
 * The heavy-duty interface for the main /projects page. Features:
 * 1. Search: Fuzzy search across titles, descriptions, and stacks.
 * 2. Sort: Dynamic sorting by name and technology depth.
 * 3. Results Management: Real-time filtering with no-results fallback.
 */
import React, { useState, useMemo } from 'react';

export default function ProjectsGrid({ projects }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  // Filter projects by search term
  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.stack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [projects, searchTerm]);

  // Sort projects
  const sortedProjects = useMemo(() => {
    const sorted = [...filteredProjects];
    switch (sortBy) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredProjects, sortBy]);

  return (
    <div className="space-y-8">
      {/* Search and Sort Controls */}
      <div className="flex flex-col gap-4">
        {/* Search Input - Large */}
        <div className="relative">
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Sort Dropdown - Small */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="title">A-Z</option>
            <option value="title-desc">Z-A</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        {sortedProjects.length} of {projects.length} project{projects.length !== 1 ? 's' : ''}
      </div>

      {/* Projects Grid */}
      {sortedProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {sortedProjects.map((project) => (
            <a
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative flex flex-col h-full bg-gradient-to-br from-white/80 to-slate-50/60 dark:from-slate-900/80 dark:to-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/50 dark:border-slate-800 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 overflow-hidden hover:-translate-y-2"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Image or Dynamic Fallback */}
              <div className="h-48 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/50 mb-6">
                {project.heroImage ? (
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <span className="text-5xl drop-shadow-md">🚀</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Category & Title */}
                <div className="flex flex-col mb-4">
                  {project.category && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-2">
                      {project.category} Project
                    </span>
                  )}
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-base text-slate-600 dark:text-slate-400 mb-4 flex-grow line-clamp-3">
                  {project.description}
                </p>

                {/* Stack Tags */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-bold bg-white/50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 rounded-lg border border-white/60 dark:border-slate-700/50 group-hover:border-cyan-500/30 transition-colors shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {(project.repoUrl || project.liveUrl) && (
                  <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-cyan-600 transition-colors text-center"
                      >
                        Live
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 px-4 py-2 text-sm font-semibold border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center"
                      >
                        Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400 mb-4 text-lg">No projects found matching your search.</p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-primary hover:underline font-semibold"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
