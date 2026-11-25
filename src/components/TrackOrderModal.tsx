import { useEffect, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { formatCurrency, type OrderReceipt } from '../utils/store';

interface TrackOrderModalProps {
  isOpen: boolean;
  orders: OrderReceipt[];
  onClose: () => void;
}

export function TrackOrderModal({ isOpen, orders, onClose }: TrackOrderModalProps) {
  const [query, setQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderReceipt | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedOrder(orders[0] ?? null);
      setNotFound(false);
    }
  }, [isOpen, orders]);

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

  const handleLookup = (e: FormEvent) => {
    e.preventDefault();
    const normalized = query.trim().replace(/^#/, '').toUpperCase();
    if (!normalized) {
      setSelectedOrder(orders[0] ?? null);
      setNotFound(false);
      return;
    }

    const match = orders.find(
      (order) => order.orderNumber.toUpperCase() === normalized
    );
    if (match) {
      setSelectedOrder(match);
      setNotFound(false);
    } else {
      setSelectedOrder(null);
      setNotFound(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="track-order-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-lg border border-[#E5E0D8] bg-[#FAF9F6] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close order tracker"
          className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-[#E5E0D8] bg-white text-[#1C1A17] hover:bg-[#F2EFEA]"
        >
          <X className="h-4 w-4" />
        </button>

        <h2
          id="track-order-title"
          className="font-display text-3xl font-semibold text-[#1C1A17]"
        >
          Order Tracking
        </h2>
        <p className="mt-1 text-sm text-[#5E5850]">
          Enter your Maison Léon order reference (e.g., ML-1042) to view shipment preparation status.
        </p>

        <form onSubmit={handleLookup} className="mt-5 flex gap-2">
          <label htmlFor="order-lookup-input" className="sr-only">
            Order reference number
          </label>
          <input
            id="order-lookup-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ML-1042"
            className="h-10 flex-1 rounded-md border border-[#E5E0D8] bg-white px-3.5 text-sm text-[#1C1A17] focus:border-[#1C1A17] focus:outline-none"
          />
          <button
            type="submit"
            className="h-10 cursor-pointer rounded-md bg-[#1C1A17] px-4 text-xs font-semibold text-[#FAF9F6] hover:bg-[#332F2A]"
          >
            Look Up
          </button>
        </form>

        <div className="mt-6">
          {notFound ? (
            <p className="rounded-md border border-[#E5E0D8] bg-white p-4 text-sm text-[#5E5850]">
              No order matching <span className="font-semibold text-[#1C1A17]">{query}</span> was found in this browser session.
            </p>
          ) : selectedOrder ? (
            <div className="rounded-md border border-[#E5E0D8] bg-white p-5">
              <div className="flex items-baseline justify-between gap-2 border-b border-[#E5E0D8] pb-3">
                <p className="font-display text-xl font-semibold text-[#1C1A17]">
                  Order #{selectedOrder.orderNumber}
                </p>
                <span className="text-xs font-medium text-[#8B6B4A]">
                  {selectedOrder.status}
                </span>
              </div>
              <p className="mt-3 text-xs text-[#5E5850]">
                Recipient: {selectedOrder.customer.fullName} · {selectedOrder.customer.city}
              </p>
              <ul className="mt-3 divide-y divide-[#E5E0D8] text-sm">
                {selectedOrder.items.map((item) => (
                  <li
                    key={`${item.productId}-${item.size}`}
                    className="flex justify-between py-2"
                  >
                    <span>
                      {item.name} ({item.size} ml) × {item.quantity}
                    </span>
                    <span className="tabular-nums font-medium">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex justify-between border-t border-[#E5E0D8] pt-3 text-sm font-semibold text-[#1C1A17]">
                <span>Total</span>
                <span className="tabular-nums">
                  {formatCurrency(selectedOrder.totals.total)}
                </span>
              </div>
            </div>
          ) : (
            <p className="rounded-md border border-[#E5E0D8] bg-[#F2EFEA]/60 p-5 text-sm text-[#5E5850]">
              You have not placed any orders yet. Once you complete checkout, your receipt and preparation status will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
