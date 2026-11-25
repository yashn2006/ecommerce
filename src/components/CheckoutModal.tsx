import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import {
  formatCurrency,
  validateCheckoutForm,
  type CartItem,
  type CartTotals,
  type CheckoutForm,
  type OrderReceipt,
  type PaymentMethod,
  type ValidationErrors,
} from '../utils/store';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  totals: CartTotals;
  confirmedOrder: OrderReceipt | null;
  onClose: () => void;
  onSubmitOrder: (form: CheckoutForm) => void;
}

const INITIAL_FORM: CheckoutForm = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  paymentMethod: 'card',
};

export function CheckoutModal({
  isOpen,
  items,
  totals,
  confirmedOrder,
  onClose,
  onSubmitOrder,
}: CheckoutModalProps) {
  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<ValidationErrors>({});

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

  useEffect(() => {
    if (isOpen && !confirmedOrder) {
      setErrors({});
    }
  }, [isOpen, confirmedOrder]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateCheckoutForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    onSubmitOrder(form);
    setForm(INITIAL_FORM);
    setErrors({});
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-[#E5E0D8] bg-[#FAF9F6] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-[#E5E0D8] bg-white text-[#1C1A17] hover:bg-[#F2EFEA]"
        >
          <X className="h-4 w-4" />
        </button>

        {confirmedOrder ? (
          <div className="py-2">
            <div className="flex items-center gap-3 text-[#1C1A17]">
              <CheckCircle2 className="h-6 w-6 text-[#8B6B4A]" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8B6B4A]">
                Order Confirmed
              </p>
            </div>

            <h2
              id="checkout-title"
              className="mt-3 font-display text-3xl font-semibold text-[#1C1A17] text-balance"
            >
              Order #{confirmedOrder.orderNumber} Confirmed
            </h2>

            <p className="mt-2 text-sm text-[#5E5850]">
              Status: <span className="font-medium text-[#1C1A17]">{confirmedOrder.status}</span>. A dispatch confirmation for <span className="font-medium text-[#1C1A17]">{confirmedOrder.customer.email}</span> has been recorded, including a complimentary 2 ml test vial.
            </p>

            <div className="mt-6 rounded-md border border-[#E5E0D8] bg-white p-5">
              <div className="grid grid-cols-1 gap-4 border-b border-[#E5E0D8] pb-4 text-xs sm:grid-cols-2">
                <div>
                  <p className="font-semibold uppercase tracking-wider text-[#5E5850]">
                    Shipping To
                  </p>
                  <p className="mt-1 font-medium text-[#1C1A17]">
                    {confirmedOrder.customer.fullName}
                  </p>
                  <p className="text-[#5E5850]">
                    {confirmedOrder.customer.address}, {confirmedOrder.customer.city}{' '}
                    {confirmedOrder.customer.postalCode}
                  </p>
                </div>
                <div>
                  <p className="font-semibold uppercase tracking-wider text-[#5E5850]">
                    Payment Terms
                  </p>
                  <p className="mt-1 font-medium text-[#1C1A17]">
                    {confirmedOrder.customer.paymentMethod === 'cod'
                      ? 'Cash on Delivery (Pay upon arrival)'
                      : 'Card Settlement'}
                  </p>
                </div>
              </div>

              <ul className="divide-y divide-[#E5E0D8] py-3 text-sm">
                {confirmedOrder.items.map((item) => (
                  <li
                    key={`${item.productId}-${item.size}`}
                    className="flex justify-between py-2"
                  >
                    <span className="text-[#1C1A17]">
                      {item.name} ({item.size} ml) × {item.quantity}
                    </span>
                    <span className="font-medium text-[#1C1A17] tabular-nums">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between border-t border-[#E5E0D8] pt-3 text-base font-semibold text-[#1C1A17]">
                <span>Total Paid / Due</span>
                <span className="tabular-nums">
                  {formatCurrency(confirmedOrder.totals.total)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 min-h-[44px] w-full cursor-pointer rounded-md bg-[#1C1A17] px-6 py-3 text-sm font-semibold text-[#FAF9F6] transition-colors hover:bg-[#332F2A]"
            >
              Return to Storefront
            </button>
          </div>
        ) : (
          <div>
            <h2
              id="checkout-title"
              className="font-display text-3xl font-semibold text-[#1C1A17]"
            >
              Checkout
            </h2>
            <p className="mt-1 text-sm text-[#5E5850]">
              Enter your delivery details. Complimentary express shipping applies automatically on orders over $200.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#1C1A17]"
                  >
                    Full Name
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Claire Moreau"
                    aria-invalid={Boolean(errors.fullName)}
                    className="mt-1.5 h-11 w-full rounded-md border border-[#E5E0D8] bg-white px-3.5 text-sm text-[#1C1A17] focus:border-[#1C1A17] focus:outline-none"
                  />
                  {errors.fullName && (
                    <p role="alert" className="mt-1 text-xs text-red-700">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="checkout-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#1C1A17]"
                  >
                    Email Address
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="claire@example.com"
                    aria-invalid={Boolean(errors.email)}
                    className="mt-1.5 h-11 w-full rounded-md border border-[#E5E0D8] bg-white px-3.5 text-sm text-[#1C1A17] focus:border-[#1C1A17] focus:outline-none"
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1 text-xs text-red-700">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#1C1A17]"
                >
                  Street Address
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="18 Rue Jean Ossola"
                  aria-invalid={Boolean(errors.address)}
                  className="mt-1.5 h-11 w-full rounded-md border border-[#E5E0D8] bg-white px-3.5 text-sm text-[#1C1A17] focus:border-[#1C1A17] focus:outline-none"
                />
                {errors.address && (
                  <p role="alert" className="mt-1 text-xs text-red-700">
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="checkout-city"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#1C1A17]"
                  >
                    City
                  </label>
                  <input
                    id="checkout-city"
                    type="text"
                    value={form.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="Grasse"
                    aria-invalid={Boolean(errors.city)}
                    className="mt-1.5 h-11 w-full rounded-md border border-[#E5E0D8] bg-white px-3.5 text-sm text-[#1C1A17] focus:border-[#1C1A17] focus:outline-none"
                  />
                  {errors.city && (
                    <p role="alert" className="mt-1 text-xs text-red-700">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="checkout-postal"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#1C1A17]"
                  >
                    Postal Code
                  </label>
                  <input
                    id="checkout-postal"
                    type="text"
                    value={form.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    placeholder="06130"
                    aria-invalid={Boolean(errors.postalCode)}
                    className="mt-1.5 h-11 w-full rounded-md border border-[#E5E0D8] bg-white px-3.5 text-sm text-[#1C1A17] focus:border-[#1C1A17] focus:outline-none"
                  />
                  {errors.postalCode && (
                    <p role="alert" className="mt-1 text-xs text-red-700">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1C1A17]">
                  Payment Method
                </p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {(['card', 'cod'] as PaymentMethod[]).map((method) => {
                    const active = form.paymentMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => handleChange('paymentMethod', method)}
                        aria-pressed={active}
                        className={`min-h-[44px] cursor-pointer rounded-md border px-4 py-2.5 text-left text-xs font-semibold transition-colors ${
                          active
                            ? 'border-[#1C1A17] bg-[#1C1A17] text-[#FAF9F6]'
                            : 'border-[#E5E0D8] bg-white text-[#1C1A17] hover:border-[#1C1A17]/50'
                        }`}
                      >
                        {method === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-md border border-[#E5E0D8] bg-white p-4 text-sm">
                <div className="flex justify-between text-[#5E5850]">
                  <span>Items ({totals.itemCount})</span>
                  <span className="tabular-nums">{formatCurrency(totals.subtotal)}</span>
                </div>
                <div className="mt-1 flex justify-between text-[#5E5850]">
                  <span>Shipping</span>
                  <span className="tabular-nums">
                    {totals.shippingFee === 0
                      ? 'Complimentary'
                      : formatCurrency(totals.shippingFee)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between border-t border-[#E5E0D8] pt-2 font-semibold text-[#1C1A17]">
                  <span>Order Total</span>
                  <span className="tabular-nums">{formatCurrency(totals.total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={items.length === 0}
                className="min-h-[46px] w-full cursor-pointer rounded-md bg-[#1C1A17] px-6 py-3 text-sm font-semibold text-[#FAF9F6] transition-colors hover:bg-[#332F2A] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Place Order — {formatCurrency(totals.total)}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
