interface FooterProps {
  onOpenTrackOrder: () => void;
}

export function Footer({ onOpenTrackOrder }: FooterProps) {
  return (
    <footer className="bg-[#FAF9F6]">
      <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-8">
        <div className="flex flex-col justify-between gap-8 border-b border-[#E5E0D8] pb-10 md:flex-row md:items-start">
          <div>
            <p className="font-display text-2xl font-semibold text-[#1C1A17]">
              Maison Léon
            </p>
            <p className="mt-2 max-w-[38ch] text-xs leading-relaxed text-[#5E5850]">
              14 Place aux Aires, 06130 Grasse, France · Open Tuesday to Saturday, 10:00–18:30
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#5E5850]">
            <a href="#collection" className="hover:text-[#1C1A17] hover:underline hover:underline-offset-4">
              Fragrance Collection
            </a>
            <a href="#notes" className="hover:text-[#1C1A17] hover:underline hover:underline-offset-4">
              Olfactory Notes
            </a>
            <a href="#atelier" className="hover:text-[#1C1A17] hover:underline hover:underline-offset-4">
              Grasse Atelier
            </a>
            <button
              type="button"
              onClick={onOpenTrackOrder}
              className="cursor-pointer hover:text-[#1C1A17] hover:underline hover:underline-offset-4"
            >
              Track Order
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-[#5E5850] sm:flex-row sm:items-center">
          <p>© 2026 Maison Léon Parfums. All rights reserved.</p>
          <p>Complimentary express delivery on orders over $200 · 30-day unopened returns</p>
        </div>
      </div>
    </footer>
  );
}
