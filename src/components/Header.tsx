import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';

interface HeaderProps {
  bagCount: number;
  onOpenBag: () => void;
  onOpenTrackOrder: () => void;
}

export function Header({ bagCount, onOpenBag, onOpenTrackOrder }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#E5E0D8] bg-[#FAF9F6]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-6 lg:px-8">
        <a
          href="#top"
          className="font-display text-2xl font-semibold tracking-tight text-[#1C1A17] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1C1A17]"
        >
          Maison Léon
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5E5850]"
        >
          <a
            href="#collection"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#1C1A17] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1C1A17]"
          >
            Collection
          </a>
          <a
            href="#notes"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#1C1A17] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1C1A17]"
          >
            Notes
          </a>
          <a
            href="#atelier"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#1C1A17] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1C1A17]"
          >
            Atelier
          </a>
          <button
            type="button"
            onClick={onOpenTrackOrder}
            className="cursor-pointer whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#1C1A17] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1C1A17]"
          >
            Track Order
          </button>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E5E0D8] text-[#1C1A17] transition-colors duration-150 hover:bg-[#F2EFEA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A17] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Shopping bag, ${bagCount} ${bagCount === 1 ? 'item' : 'items'}`}
            className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-md bg-[#1C1A17] px-4 py-2 text-xs font-semibold tracking-wide text-[#FAF9F6] transition-colors duration-150 hover:bg-[#332F2A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A17]"
          >
            <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="tabular-nums">Bag ({bagCount})</span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#E5E0D8] bg-[#FAF9F6] px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center text-sm font-medium text-[#1C1A17]"
            >
              Collection
            </a>
            <a
              href="#notes"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center text-sm font-medium text-[#1C1A17]"
            >
              Notes
            </a>
            <a
              href="#atelier"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center text-sm font-medium text-[#1C1A17]"
            >
              Atelier
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackOrder();
              }}
              className="min-h-[44px] flex items-center text-left text-sm font-medium text-[#1C1A17]"
            >
              Track Order
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
