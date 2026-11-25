import { useEffect } from 'react';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import {
  FREE_SHIPPING_THRESHOLD,
  formatCurrency,
  type BottleSize,
  type CartItem,
  type CartTotals,
} from '../utils/store';
import { ProductImage } from './ProductImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  totals: CartTotals;
  onClose: () => void;
  onUpdateQty: (productId: string, size: BottleSize, delta: number) => void;
  onRemoveItem: (productId: string, size: BottleSize) => void;
  onProceedToCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  totals,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col border-l border-[#E5E0D8] bg-[#FAF9F6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E5E0D8] px-6 py-5">
          <div>
            <h2
              id="cart-drawer-title"
              className="font-display text-2xl font-semibold text-[#1C1A17]"
            >
              Your Bag
            </h2>
            <p className="text-xs text-[#5E5850] tabular-nums">
              {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-[#E5E0D8] text-[#1C1A17] transition-colors duration-150 hover:bg-[#F2EFEA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A17]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {items.length > 0 && (
          <div className="border-b border-[#E5E0D8] bg-[#F2EFEA]/70 px-6 py-3.5">
            <p className="text-xs font-medium text-[#1C1A17]">
              {totals.freeShippingRemaining === 0
                ? 'You have unlocked complimentary express shipping.'
                : `Add ${formatCurrency(totals.freeShippingRemaining)} more for complimentary express shipping.`}
            </p>
            <progress
              value={Math.min(totals.subtotal, FREE_SHIPPING_THRESHOLD)}
              max={FREE_SHIPPING_THRESHOLD}
              aria-label="Complimentary express shipping progress"
              className="mt-2 block h-1.5 w-full overflow-hidden rounded-full [&::-moz-progress-bar]:bg-[#8B6B4A] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[#E5E0D8] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[#8B6B4A]"
            />
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <p className="font-display text-2xl font-medium text-[#1C1A17]">
                Your bag is currently empty
              </p>
              <p className="mt-2 max-w-[30ch] text-sm text-[#5E5850]">
                Explore our Grasse compositions and select a 30 ml, 50 ml, or 100 ml flacon.
              </p>
              <a
                href="#collection"
                onClick={onClose}
                className="mt-6 inline-flex min-h-[42px] items-center rounded-md bg-[#1C1A17] px-5 py-2.5 text-xs font-semibold text-[#FAF9F6] transition-colors duration-150 hover:bg-[#332F2A]"
              >
                Explore Collection
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-[#E5E0D8]">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4 py-5 first:pt-0 last:pb-0"
                >
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded border border-[#E5E0D8] bg-[#F2EFEA]">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      title={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-lg font-semibold leading-snug text-[#1C1A17]">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#5E5850] tabular-nums">
                          {item.size} ml · {item.concentration}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#1C1A17] tabular-nums">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center rounded-md border border-[#E5E0D8] bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.productId, item.size, -1)}
                          aria-label={`Decrease quantity of ${item.name} ${item.size} ml`}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center text-[#1C1A17] hover:bg-[#F2EFEA]"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span
                          aria-label={`Quantity of ${item.name} ${item.size} ml`}
                          className="min-w-[28px] text-center text-xs font-semibold text-[#1C1A17] tabular-nums"
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.productId, item.size, 1)}
                          aria-label={`Increase quantity of ${item.name} ${item.size} ml`}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center text-[#1C1A17] hover:bg-[#F2EFEA]"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.productId, item.size)}
                        aria-label={`Remove ${item.name} ${item.size} ml from bag`}
                        className="inline-flex h-8 cursor-pointer items-center gap-1 px-2 text-xs text-[#5E5850] transition-colors hover:text-[#1C1A17]"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#E5E0D8] bg-white px-6 py-5">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#5E5850]">
                <span>Subtotal</span>
                <span data-testid="cart-subtotal" className="font-medium text-[#1C1A17] tabular-nums">
                  {formatCurrency(totals.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#5E5850]">
                <span>Express Shipping</span>
                <span className="font-medium text-[#1C1A17] tabular-nums">
                  {totals.shippingFee === 0 ? 'Complimentary' : formatCurrency(totals.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#E5E0D8] pt-2.5 text-base font-semibold text-[#1C1A17]">
                <span>Estimated Total</span>
                <span data-testid="cart-total" className="tabular-nums">
                  {formatCurrency(totals.total)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="mt-5 min-h-[46px] w-full cursor-pointer rounded-md bg-[#1C1A17] px-6 py-3 text-sm font-semibold text-[#FAF9F6] transition-colors duration-150 hover:bg-[#332F2A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A17]"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
