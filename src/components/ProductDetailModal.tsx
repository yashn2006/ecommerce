import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import {
  BOTTLE_SIZES,
  formatCurrency,
  getPriceForSize,
  type BottleSize,
  type PerfumeProduct,
} from '../utils/store';
import { ProductImage } from './ProductImage';

interface ProductDetailModalProps {
  product: PerfumeProduct | null;
  onClose: () => void;
  onAddToBag: (product: PerfumeProduct, size: BottleSize) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToBag,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<BottleSize>(50);

  useEffect(() => {
    setSelectedSize(50);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  if (!product) {
    return null;
  }

  const activePrice = getPriceForSize(product.basePrice50ml, selectedSize);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-[#E5E0D8] bg-[#FAF9F6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${product.name} details`}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-[#E5E0D8] bg-[#FAF9F6]/90 text-[#1C1A17] transition-colors duration-150 hover:bg-[#F2EFEA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A17]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="bg-[#F2EFEA] md:col-span-6">
            <ProductImage
              src={product.image}
              alt={`${product.name} ${product.concentration} bottle`}
              title={product.name}
              className="h-72 w-full object-cover md:h-full md:min-h-[480px]"
            />
          </div>

          <div className="flex flex-col p-6 sm:p-8 md:col-span-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#5E5850]">
              <span>{product.family}</span>
              <span aria-hidden="true">·</span>
              <span>{product.concentration}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{product.oilPercentage} Oil</span>
            </div>

            <h2
              id="pdp-title"
              className="mt-2 font-display text-3xl font-semibold text-[#1C1A17]"
            >
              {product.name}
            </h2>

            <p
              data-testid="pdp-price"
              className="mt-2 text-2xl font-semibold text-[#1C1A17] tabular-nums"
            >
              {formatCurrency(activePrice)}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[#5E5850]">
              {product.description}
            </p>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1C1A17]">
                Select Flacon Volume
              </p>
              <div
                role="radiogroup"
                aria-label="Bottle volume"
                className="mt-2.5 grid grid-cols-3 gap-2.5"
              >
                {BOTTLE_SIZES.map((size) => {
                  const isSelected = selectedSize === size;
                  const sizePrice = getPriceForSize(product.basePrice50ml, size);
                  return (
                    <button
                      key={size}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedSize(size)}
                      className={`flex min-h-[52px] cursor-pointer flex-col items-center justify-center rounded-md border px-3 py-2 text-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A17] ${
                        isSelected
                          ? 'border-[#1C1A17] bg-[#1C1A17] text-[#FAF9F6]'
                          : 'border-[#E5E0D8] bg-white text-[#1C1A17] hover:border-[#1C1A17]/50'
                      }`}
                    >
                      <span className="text-xs font-semibold tabular-nums">{size} ml</span>
                      <span
                        className={`text-[11px] tabular-nums ${
                          isSelected ? 'text-[#FAF9F6]/80' : 'text-[#5E5850]'
                        }`}
                      >
                        {formatCurrency(sizePrice)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <dl className="mt-6 divide-y divide-[#E5E0D8] border-y border-[#E5E0D8] text-xs">
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="font-semibold uppercase tracking-wider text-[#1C1A17]">
                  Top
                </dt>
                <dd className="text-right text-[#5E5850]">
                  {product.pyramid.top.join(' · ')}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="font-semibold uppercase tracking-wider text-[#1C1A17]">
                  Heart
                </dt>
                <dd className="text-right text-[#5E5850]">
                  {product.pyramid.heart.join(' · ')}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="font-semibold uppercase tracking-wider text-[#1C1A17]">
                  Base
                </dt>
                <dd className="text-right text-[#5E5850]">
                  {product.pyramid.base.join(' · ')}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="font-semibold uppercase tracking-wider text-[#1C1A17]">
                  Wear
                </dt>
                <dd className="text-right text-[#5E5850]">
                  {product.longevity} · {product.sillage}
                </dd>
              </div>
            </dl>

            <div className="mt-6 pt-2">
              <button
                type="button"
                onClick={() => onAddToBag(product, selectedSize)}
                className="min-h-[46px] w-full cursor-pointer rounded-md bg-[#1C1A17] px-6 py-3 text-sm font-semibold text-[#FAF9F6] transition-colors duration-150 hover:bg-[#332F2A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A17]"
              >
                Add to Bag — {formatCurrency(activePrice)}
              </button>
              <p className="mt-2.5 text-center text-xs text-[#5E5850]">
                In stock · Ships in 24 hours with a complimentary 2 ml vial to test first
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
