import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  BookOpen,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import api, { fallbackStore } from '../services/api';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [courses, setCourses] = useState(fallbackStore.courses);
  const [categories, setCategories] = useState(fallbackStore.categories);
  const [loading, setLoading] = useState(false);

  // Filters State
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  // Pagination State (9 courses per page, 3x3 grid)
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;
  const gridTopRef = useRef(null);

  useEffect(() => {
    fetchCourses();
    setCurrentPage(1); // Reset page on filter change
  }, [selectedCategory, selectedLevel, sortBy, searchParams]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      let queryUrl = `/courses?sort=${sortBy}`;
      if (selectedCategory !== 'All') queryUrl += `&category=${encodeURIComponent(selectedCategory)}`;
      if (selectedLevel !== 'All') queryUrl += `&level=${selectedLevel}`;
      if (search) queryUrl += `&search=${encodeURIComponent(search)}`;

      const res = await api.get(queryUrl);
      if (res.data?.success && res.data.data.length > 0) {
        setCourses(res.data.data);
      } else {
        // Fallback filter
        let filtered = fallbackStore.courses;
        if (selectedCategory !== 'All') {
          filtered = filtered.filter(c => c.category?.toLowerCase() === selectedCategory.toLowerCase());
        }
        if (selectedLevel !== 'All') {
          filtered = filtered.filter(c => c.level === selectedLevel);
        }
        if (search) {
          filtered = filtered.filter(c =>
            c.title?.toLowerCase().includes(search.toLowerCase()) ||
            c.subtitle?.toLowerCase().includes(search.toLowerCase()) ||
            c.description?.toLowerCase().includes(search.toLowerCase())
          );
        }
        setCourses(filtered);
      }
    } catch (err) {
      let filtered = fallbackStore.courses;
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(c => c.category?.toLowerCase() === selectedCategory.toLowerCase());
      }
      setCourses(filtered);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCourses();
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSearch('');
    setSortBy('popular');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Pagination calculations
  const totalPages = Math.ceil(courses.length / coursesPerPage) || 1;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate page numbers array with ellipses
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" ref={gridTopRef}>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-navy-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Premium Course Catalogue
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Learning Lounge
          </h1>
          <p className="text-brand-100/80 text-sm leading-relaxed">
            Explore 50+ verified engineering, cloud, data science, ERP, and architecture masterclasses. All certifications include lifetime updates and placement support.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="md:col-span-6">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by course title or keyword (e.g. .NET, Azure, SAP, VLSI)..."
                className="w-full pl-11 pr-24 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition"
              >
                Search
              </button>
            </form>
          </div>

          {/* Level Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-700"
            >
              <option value="All">All Skill Levels</option>
              <option value="Beginner">Beginner Level</option>
              <option value="Intermediate">Intermediate Level</option>
              <option value="Advanced">Advanced Level</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-700"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newly Launched</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-slate-100 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
              selectedCategory === 'All'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Tracks ({courses.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
          {(selectedCategory !== 'All' || selectedLevel !== 'All' || search) && (
            <button
              onClick={clearAllFilters}
              className="ml-auto text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 shrink-0"
            >
              <X className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Results Header: Showing X–Y of Z */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>
          Showing <strong>{courses.length > 0 ? indexOfFirstCourse + 1 : 0}</strong>–
          <strong>{Math.min(indexOfLastCourse, courses.length)}</strong> of <strong>{courses.length}</strong> courses
        </span>
        <span>Page {currentPage} of {totalPages}</span>
      </div>

      {/* Paginated 3x3 Courses Grid */}
      {currentCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No courses match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing selected category filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs"
          >
            Show All Courses
          </button>
        </div>
      )}

      {/* Numerical Pagination Controls (1, 2, 3, 4 ... Next) */}
      {totalPages > 1 && (
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
          <div className="text-xs text-slate-500 font-medium">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({courses.length} Total Courses)
          </div>

          <div className="flex items-center gap-1.5">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            {/* Page Number Buttons */}
            {getPageNumbers().map((page, idx) => {
              if (page === '...') {
                return (
                  <span key={idx} className="px-2 text-slate-400 font-bold text-xs">
                    ...
                  </span>
                );
              }
              const isCurrent = currentPage === page;
              return (
                <button
                  key={idx}
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition flex items-center justify-center ${
                    isCurrent
                      ? 'bg-[#0052CC] text-white shadow-md'
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
