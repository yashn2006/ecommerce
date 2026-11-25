import { useEffect, useMemo, useState } from 'react';
import { AtelierSection } from './components/AtelierSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CollectionSection } from './components/CollectionSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import {
  PERFUME_CATALOG,
  addToCart,
  calculateCartTotals,
  createOrderReceipt,
  filterAndSortPerfumes,
  removeCartItem,
  updateCartItemQty,
  type BottleSize,
  type CartItem,
  type CheckoutForm,
  type FragranceFamily,
  type OrderReceipt,
  type PerfumeProduct,
  type SortOption,
} from './utils/store';

const CART_STORAGE_KEY = 'maison-leon-cart-v1';
const ORDERS_STORAGE_KEY = 'maison-leon-orders-v1';

function loadStoredJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    loadStoredJson<CartItem[]>(CART_STORAGE_KEY, [])
  );
  const [orders, setOrders] = useState<OrderReceipt[]>(() =>
    loadStoredJson<OrderReceipt[]>(ORDERS_STORAGE_KEY, [])
  );

  const [selectedCategory, setSelectedCategory] = useState<'All' | FragranceFamily>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const [activeProduct, setActiveProduct] = useState<PerfumeProduct | null>(null);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderReceipt | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage quota errors
    }
  }, [orders]);

  const filteredProducts = useMemo(
    () =>
      filterAndSortPerfumes(PERFUME_CATALOG, {
        category: selectedCategory,
        query: searchQuery,
        sort: sortBy,
      }),
    [selectedCategory, searchQuery, sortBy]
  );

  const cartTotals = useMemo(() => calculateCartTotals(cartItems), [cartItems]);

  const handleAddToBag = (product: PerfumeProduct, size: BottleSize, openDrawer = true) => {
    setCartItems((prev) => addToCart(prev, product, size, 1));
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((current) => (current === product.id ? null : current));
    }, 1400);

    if (openDrawer) {
      setActiveProduct(null);
      setIsBagOpen(true);
    }
  };

  const handleUpdateQty = (productId: string, size: BottleSize, delta: number) => {
    setCartItems((prev) => updateCartItemQty(prev, productId, size, delta));
  };

  const handleRemoveItem = (productId: string, size: BottleSize) => {
    setCartItems((prev) => removeCartItem(prev, productId, size));
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  const handleProceedToCheckout = () => {
    setConfirmedOrder(null);
    setIsBagOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleSubmitOrder = (form: CheckoutForm) => {
    const receipt = createOrderReceipt(cartItems, form, orders.length);
    setOrders((prev) => [receipt, ...prev]);
    setCartItems([]);
    setConfirmedOrder(receipt);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1A17]">
      <Header
        bagCount={cartTotals.itemCount}
        onOpenBag={() => setIsBagOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
      />

      <main>
        <Hero />

        <CollectionSection
          products={filteredProducts}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          sortBy={sortBy}
          recentlyAddedId={recentlyAddedId}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
          onSelectProduct={(product) => setActiveProduct(product)}
          onQuickAdd={(product) => handleAddToBag(product, 50, true)}
        />

        <AtelierSection />
      </main>

      <Footer onOpenTrackOrder={() => setIsTrackOrderOpen(true)} />

      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToBag={(product, size) => handleAddToBag(product, size, true)}
      />

      <CartDrawer
        isOpen={isBagOpen}
        items={cartItems}
        totals={cartTotals}
        onClose={() => setIsBagOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cartItems}
        totals={cartTotals}
        confirmedOrder={confirmedOrder}
        onClose={() => {
          setIsCheckoutOpen(false);
          setConfirmedOrder(null);
        }}
        onSubmitOrder={handleSubmitOrder}
      />

      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        orders={orders}
        onClose={() => setIsTrackOrderOpen(false)}
      />
    </div>
  );
}
