import React, { useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

interface CourseFilterProps {
  onFilterChange: (filters: { 
    search: string, 
    level: string[], 
    priceRange: [number, number] | null
  }) => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({ onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({ search: e.target.value, level, priceRange });
  };

  const handleLevelChange = (selectedLevel: string) => {
    const newLevel = level.includes(selectedLevel)
      ? level.filter(l => l !== selectedLevel)
      : [...level, selectedLevel];
    
    setLevel(newLevel);
    onFilterChange({ search, level: newLevel, priceRange });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    const newRange: [number, number] = [min, max];
    setPriceRange(newRange);
    onFilterChange({ search, level, priceRange: newRange });
  };

  const clearFilters = () => {
    setSearch('');
    setLevel([]);
    setPriceRange(null);
    onFilterChange({ search: '', level: [], priceRange: null });
  };

  const hasActiveFilters = search !== '' || level.length > 0 || priceRange !== null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search courses..."
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
          />
        </div>

        {/* Level Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLevelOpen(!isLevelOpen)}
            className="flex items-center justify-between w-full md:w-40 px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
          >
            <span className="text-gray-700">Level</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {isLevelOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="p-2">
                <div className="flex items-center px-3 py-2 hover:bg-gray-100 rounded">
                  <input
                    type="checkbox"
                    id="beginner"
                    checked={level.includes('Beginner')}
                    onChange={() => handleLevelChange('Beginner')}
                    className="h-4 w-4 text-burgundy-600 focus:ring-burgundy-500 border-gray-300 rounded"
                  />
                  <label htmlFor="beginner" className="ml-2 text-sm text-gray-700">Beginner</label>
                </div>
                <div className="flex items-center px-3 py-2 hover:bg-gray-100 rounded">
                  <input
                    type="checkbox"
                    id="intermediate"
                    checked={level.includes('Intermediate')}
                    onChange={() => handleLevelChange('Intermediate')}
                    className="h-4 w-4 text-burgundy-600 focus:ring-burgundy-500 border-gray-300 rounded"
                  />
                  <label htmlFor="intermediate" className="ml-2 text-sm text-gray-700">Intermediate</label>
                </div>
                <div className="flex items-center px-3 py-2 hover:bg-gray-100 rounded">
                  <input
                    type="checkbox"
                    id="advanced"
                    checked={level.includes('Advanced')}
                    onChange={() => handleLevelChange('Advanced')}
                    className="h-4 w-4 text-burgundy-600 focus:ring-burgundy-500 border-gray-300 rounded"
                  />
                  <label htmlFor="advanced" className="ml-2 text-sm text-gray-700">Advanced</label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="flex items-center justify-between w-full md:w-40 px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
          >
            <span className="text-gray-700">Price</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {isPriceOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="p-2">
                <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                     onClick={() => { handlePriceRangeChange(0, 50); setIsPriceOpen(false); }}>
                  <span className="text-sm text-gray-700">Under $50</span>
                </div>
                <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                     onClick={() => { handlePriceRangeChange(50, 100); setIsPriceOpen(false); }}>
                  <span className="text-sm text-gray-700">$50 - $100</span>
                </div>
                <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                     onClick={() => { handlePriceRangeChange(100, 150); setIsPriceOpen(false); }}>
                  <span className="text-sm text-gray-700">$100 - $150</span>
                </div>
                <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                     onClick={() => { handlePriceRangeChange(150, 1000); setIsPriceOpen(false); }}>
                  <span className="text-sm text-gray-700">$150+</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center text-burgundy-600 hover:text-burgundy-700 focus:outline-none"
          >
            <X className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Clear Filters</span>
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {level.map((l) => (
            <div key={l} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center">
              {l}
              <button
                type="button"
                onClick={() => handleLevelChange(l)}
                className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          
          {priceRange && (
            <div className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center">
              {`$${priceRange[0]} - $${priceRange[1] === 1000 ? priceRange[1]+"+" : priceRange[1]}`}
              <button
                type="button"
                onClick={() => {
                  setPriceRange(null);
                  onFilterChange({ search, level, priceRange: null });
                }}
                className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseFilter;