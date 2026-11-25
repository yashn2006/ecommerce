import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE_PATH } from '../utils/store';
import { ProductImage } from './ProductImage';

export function Hero() {
  return (
    <section id="top" className="border-b border-[#E5E0D8] bg-[#FAF9F6]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-stretch gap-8 px-6 py-10 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center lg:col-span-6 lg:pr-4">
          <p className="text-xs font-medium tracking-[0.14em] text-[#8B6B4A]">
            Grasse Extrait Atelier · Small-Batch Parfum
          </p>

          <h1 className="mt-4 font-display text-[clamp(2.5rem,4.5vw,3.9rem)] font-medium leading-[1.06] tracking-[-0.015em] text-[#1C1A17] text-balance">
            Botanical extracts aged in stone for an enduring skin trail.
          </h1>

          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-[#5E5850]">
            Maison Léon composes architectural fragrances using cold-macerated woods,
            sun-cured resins, and first-harvest florals bottled in refillable French glass.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#collection"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#1C1A17] px-6 py-3 text-sm font-semibold text-[#FAF9F6] transition-colors duration-150 hover:bg-[#332F2A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A17]"
            >
              <span>Explore Collection</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href="#notes"
              className="inline-flex min-h-[44px] items-center px-2 py-2 text-sm font-medium text-[#1C1A17] underline decoration-[#8B6B4A]/60 underline-offset-4 transition-colors duration-150 hover:decoration-[#1C1A17] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A17]"
            >
              Olfactory Architecture
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#E5E0D8] pt-6 text-xs text-[#5E5850]">
            <span>42-day cold maceration</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">24%–30% parfum oil</span>
            <span aria-hidden="true">·</span>
            <span>Complimentary shipping over $200</span>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative h-full min-h-[300px] overflow-hidden rounded-lg border border-[#E5E0D8] bg-[#F2EFEA] lg:min-h-[480px]">
            <ProductImage
              src={HERO_IMAGE_PATH}
              alt="Sculptural amber crystal perfume bottle resting on travertine stone beside cedar bark and natural resin"
              title="Aurea Reserve — Cedar & Amber"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-6 py-5">
              <p className="text-xs font-medium tracking-wide text-[#FAF9F6]/90">
                House Reserve · Hand-poured in Grasse, France
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
