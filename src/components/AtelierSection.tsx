export function AtelierSection() {
  return (
    <section id="atelier" className="border-b border-[#E5E0D8] bg-[#F2EFEA]/65">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div id="notes" className="lg:col-span-6">
          <p className="text-xs font-medium tracking-[0.14em] text-[#8B6B4A]">
            Olfactory Architecture
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-[#1C1A17] sm:text-4xl text-balance">
            Composed in three movements, never rushed in steel.
          </h2>
          <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-[#5E5850]">
            Every Maison Léon formula rests for six full weeks in temperature-controlled stoneware before hand-filtration. This slow marriage softens sharp alcohol edges and deepens natural botanical resins on warm skin.
          </p>

          <dl className="mt-8 divide-y divide-[#E5E0D8] border-y border-[#E5E0D8]">
            <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:gap-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-[#1C1A17]">
                Top Notes
              </dt>
              <dd className="text-sm text-[#5E5850] sm:col-span-2">
                Cold-pressed Calabrian bergamot, Tunisian neroli, crushed pink peppercorn, and wild cypress needles.
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:gap-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-[#1C1A17]">
                Heart Notes
              </dt>
              <dd className="text-sm text-[#5E5850] sm:col-span-2">
                Centifolia rose from Grasse, smoked Atlas cedar, Florentine iris butter, and Somali frankincense tears.
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:gap-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-[#1C1A17]">
                Base Notes
              </dt>
              <dd className="text-sm text-[#5E5850] sm:col-span-2">
                Haitian vetiver root, aged Spanish labdanum, Madagascar vanilla pod, and Mysore sandalwood.
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col justify-between gap-8 lg:col-span-6 lg:pl-6">
          <div className="grid grid-cols-1 gap-6 border border-[#E5E0D8] bg-[#FAF9F6] p-8 sm:grid-cols-3">
            <div>
              <p className="font-display text-3xl font-semibold text-[#1C1A17] tabular-nums">
                42 Days
              </p>
              <p className="mt-1 text-xs text-[#5E5850]">
                Cold stoneware maceration per batch
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-[#1C1A17] tabular-nums">
                24–30%
              </p>
              <p className="mt-1 text-xs text-[#5E5850]">
                Pure aromatic oil concentration
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-[#1C1A17] tabular-nums">
                100%
              </p>
              <p className="mt-1 text-xs text-[#5E5850]">
                Refillable heavy French crystal flacons
              </p>
            </div>
          </div>

          <blockquote className="border border-[#E5E0D8] bg-[#FAF9F6] p-8">
            <p className="font-display text-xl italic leading-relaxed text-[#1C1A17]">
              “After switching my winter wardrobe to Cedar &amp; Smoke, a single morning application still clings softly to wool coat lapels twelve hours later without ever overwhelming a room.”
            </p>
            <footer className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#5E5850]">
              <span className="font-semibold text-[#1C1A17]">Henri Delacroix</span>
              <span aria-hidden="true">·</span>
              <span>Architectural Curator, Lyon · Verified 100 ml Collector</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
