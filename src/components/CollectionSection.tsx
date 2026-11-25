import { Search, X } from 'lucide-react';
import {
  FRAGRANCE_FAMILIES,
  formatCurrency,
  type FragranceFamily,
  type PerfumeProduct,
  type SortOption,
} from '../utils/store';
import { ProductImage } from './ProductImage';

interface CollectionSectionProps {
  products: PerfumeProduct[];
  selectedCategory: 'All' | FragranceFamily;
  searchQuery: string;
  sortBy: SortOption;
  recentlyAddedId: string | null;
  onCategoryChange: (category: 'All' | FragranceFamily) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  onSelectProduct: (product: PerfumeProduct) => void;
  onQuickAdd: (product: PerfumeProduct) => void;
}

export function CollectionSection({
  products,
  selectedCategory,
  searchQuery,
  sortBy,
  recentlyAddedId,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onResetFilters,
  onSelectProduct,
  onQuickAdd,
}: CollectionSectionProps) {
  return (
    <section id="collection" className="border-b border-[#E5E0D8] bg-[#FAF9F6]">
      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-medium tracking-tight text-[#1C1A17] sm:text-4xl">
              The Fragrance Collection
            </h2>
            <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-[#5E5850]">
              Six signature compositions bottled at Eau de Parfum and Extrait concentration. Select any flacon to explore full olfactory notes and bottle sizes.
            </p>
          </div>
          <p className="text-xs font-medium text-[#5E5850] tabular-nums">
            Showing {products.length} {products.length === 1 ? 'composition' : 'compositions'}
          </p>
        </div>

        {/* Interactive Filter, Search, and Sort Toolbar */}
        <div className="mt-8 flex flex-col gap-4 border-y border-[#E5E0D8] py-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Filter fragrances by family"
            className="flex flex-wrap items-center gap-1.5"
          >
            {FRAGRANCE_FAMILIES.map((family) => {
              const active = selectedCategory === family;
              return (
                <button
                  key={family}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onCategoryChange(family)}
                  className={`min-h-[40px] cursor-pointer rounded-md px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A17] ${
                    active
                      ? 'bg-[#1C1A17] text-[#FAF9F6]'
                      : 'bg-transparent text-[#5E5850] hover:bg-[#F2EFEA] hover:text-[#1C1A17]'
                  }`}
                >
                  {family}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:w-64">
              <label htmlFor="fragrance-search" className="sr-only">
                Search fragrances by name or note
              </label>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5E5850]"
                aria-hidden="true"
              />
              <input
                id="fragrance-search"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search name or note..."
                className="h-10 w-full rounded-md border border-[#E5E0D8] bg-white pl-9 pr-9 text-sm text-[#1C1A17] placeholder:text-[#5E5850]/70 focus:border-[#1C1A17] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-[#5E5850] hover:text-[#1C1A17]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="fragrance-sort" className="text-xs font-medium text-[#5E5850] whitespace-nowrap">
                Sort by
              </label>
              <select
                id="fragrance-sort"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="h-10 cursor-pointer rounded-md border border-[#E5E0D8] bg-white px-3 text-xs font-medium text-[#1C1A17] focus:border-[#1C1A17] focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid or Empty Filter State */}
        {products.length === 0 ? (
          <div className="mt-12 rounded-lg border border-[#E5E0D8] bg-[#F2EFEA]/60 px-6 py-14 text-center">
            <p className="font-display text-2xl font-medium text-[#1C1A17]">
              No fragrances match your current filter
            </p>
            <p className="mt-2 text-sm text-[#5E5850]">
              Try searching for a botanical note like cedar, saffron, rose, or neroli, or reset your filters.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-6 inline-flex min-h-[40px] cursor-pointer items-center rounded-md bg-[#1C1A17] px-5 py-2 text-xs font-semibold text-[#FAF9F6] transition-colors duration-150 hover:bg-[#332F2A]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const isJustAdded = recentlyAddedId === product.id;
              return (
                <article
                  key={product.id}
                  data-testid={`product-card-${product.id}`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-[#E5E0D8] bg-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-16px_rgba(28,26,23,0.18)]"
                >
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    aria-label={`Inspect ${product.name}`}
                    className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-[#F2EFEA] text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1C1A17]"
                  >
                    <ProductImage
                      src={product.image}
                      alt={`${product.name} ${product.concentration} glass perfume bottle`}
                      title={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </button>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#5E5850]">
                      <div className="flex items-center gap-1.5 uppercase tracking-wider">
                        <span>{product.family}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.concentration}</span>
                      </div>
                      {product.editionNote && (
                        <span className="font-medium text-[#8B6B4A]">
                          {product.editionNote}
                        </span>
                      )}
                    </div>

                    <div className="mt-2.5 flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl font-semibold leading-tight text-[#1C1A17]">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="cursor-pointer text-left hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A17]"
                        >
                          {product.name}
                        </button>
                      </h3>
                      <p className="text-[15px] font-semibold text-[#1C1A17] tabular-nums whitespace-nowrap shrink-0">
                        {formatCurrency(product.basePrice50ml)}
                      </p>
                    </div>

                    <p className="mt-1.5 text-sm leading-relaxed text-[#5E5850]">
                      {product.accordSummary}
                    </p>

                    <div className="mt-auto flex items-center gap-3 pt-6">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        aria-label={`View details for ${product.name}`}
                        className="min-h-[40px] flex-1 cursor-pointer rounded-md border border-[#E5E0D8] bg-transparent px-4 py-2 text-xs font-semibold text-[#1C1A17] transition-colors duration-150 hover:border-[#1C1A17] hover:bg-[#FAF9F6] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A17]"
                      >
                        View Details
                      </button>

                      <button
                        type="button"
                        onClick={() => onQuickAdd(product)}
                        aria-label={`Add ${product.name} 50 ml to bag`}
                        className="min-h-[40px] flex-1 cursor-pointer rounded-md bg-[#1C1A17] px-4 py-2 text-xs font-semibold text-[#FAF9F6] transition-colors duration-150 hover:bg-[#332F2A] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A17]"
                      >
                        {isJustAdded ? 'Added to Bag' : 'Add to Bag'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
