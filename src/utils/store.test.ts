import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PERFUME_CATALOG,
  getPriceForSize,
  filterAndSortPerfumes,
  addToCart,
  updateCartItemQty,
  removeCartItem,
  calculateCartTotals,
  validateCheckoutForm,
  createOrderReceipt,
  type CheckoutForm,
} from './store';

test('getPriceForSize scales 30ml and 100ml variants cleanly from 50ml base price', () => {
  assert.equal(getPriceForSize(185, 50), 185);
  assert.equal(getPriceForSize(185, 30), 135);
  assert.equal(getPriceForSize(185, 100), 275);
});

test('filterAndSortPerfumes filters by category and olfactory notes', () => {
  const woody = filterAndSortPerfumes(PERFUME_CATALOG, {
    category: 'Woody',
    query: '',
    sort: 'featured',
  });
  assert.equal(woody.length, 2);
  assert.ok(woody.every((item) => item.family === 'Woody'));

  const saffronSearch = filterAndSortPerfumes(PERFUME_CATALOG, {
    category: 'All',
    query: 'saffron',
    sort: 'featured',
  });
  assert.equal(saffronSearch.length, 1);
  assert.equal(saffronSearch[0].id, 'ambre-noir');

  const emptySearch = filterAndSortPerfumes(PERFUME_CATALOG, {
    category: 'All',
    query: 'nonexistent-note-xyz',
    sort: 'featured',
  });
  assert.equal(emptySearch.length, 0);
});

test('filterAndSortPerfumes sorts by ascending and descending price', () => {
  const asc = filterAndSortPerfumes(PERFUME_CATALOG, {
    category: 'All',
    query: '',
    sort: 'price-asc',
  });
  assert.equal(asc[0].basePrice50ml, 165);
  assert.equal(asc[asc.length - 1].basePrice50ml, 225);

  const desc = filterAndSortPerfumes(PERFUME_CATALOG, {
    category: 'All',
    query: '',
    sort: 'price-desc',
  });
  assert.equal(desc[0].basePrice50ml, 225);
  assert.equal(desc[desc.length - 1].basePrice50ml, 165);
});

test('cart operations merge matching variants, step quantities, and calculate shipping threshold', () => {
  const product = PERFUME_CATALOG[0]; // Cedar & Smoke ($185 for 50ml)
  let cart = addToCart([], product, 50, 1);
  assert.equal(cart.length, 1);

  let totals = calculateCartTotals(cart);
  assert.equal(totals.itemCount, 1);
  assert.equal(totals.subtotal, 185);
  assert.equal(totals.shippingFee, 15);
  assert.equal(totals.freeShippingRemaining, 15);
  assert.equal(totals.total, 200);

  // Adding same product + size increments quantity
  cart = addToCart(cart, product, 50, 1);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 2);

  totals = calculateCartTotals(cart);
  assert.equal(totals.itemCount, 2);
  assert.equal(totals.subtotal, 370);
  assert.equal(totals.shippingFee, 0);
  assert.equal(totals.freeShippingRemaining, 0);
  assert.equal(totals.total, 370);

  // Adding different size creates separate line item
  cart = addToCart(cart, product, 100, 1);
  assert.equal(cart.length, 2);

  // Decrementing below 1 removes line item
  cart = updateCartItemQty(cart, product.id, 100, -1);
  assert.equal(cart.length, 1);

  // Removing remaining line item resets totals to zero
  cart = removeCartItem(cart, product.id, 50);
  totals = calculateCartTotals(cart);
  assert.equal(totals.itemCount, 0);
  assert.equal(totals.total, 0);
});

test('validateCheckoutForm rejects empty fields and accepts valid customer details', () => {
  const invalid = validateCheckoutForm({
    fullName: '',
    email: 'not-an-email',
    address: '12',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.address);
  assert.ok(invalid.errors.city);
  assert.ok(invalid.errors.postalCode);

  const validForm: CheckoutForm = {
    fullName: 'Claire Moreau',
    email: 'claire@example.com',
    address: '18 Rue Jean Ossola',
    city: 'Grasse',
    postalCode: '06130',
    paymentMethod: 'cod',
  };
  const valid = validateCheckoutForm(validForm);
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});

  const cart = addToCart([], PERFUME_CATALOG[2], 50, 1);
  const receipt = createOrderReceipt(cart, validForm, 3);
  assert.equal(receipt.orderNumber, 'ML-1045');
  assert.equal(receipt.status, 'Confirmed — Preparing Shipment');
  assert.equal(receipt.totals.subtotal, 210);
  assert.equal(receipt.totals.shippingFee, 0);
});
