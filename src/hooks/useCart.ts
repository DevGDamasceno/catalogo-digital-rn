import { useCallback, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';
import { loadJson, saveJson } from '../storage';
import { CartItem, Product } from '../types';
import { cartTotal } from '../utils';

const CART_KEY = 'cart';

type StoredItem = { id: string; quantity: number };

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Restaura o carrinho salvo; produtos que saíram do catálogo são ignorados.
  useEffect(() => {
    loadJson<StoredItem[]>(CART_KEY).then((stored) => {
      if (stored) {
        const restored = stored.flatMap(({ id, quantity }) => {
          const product = products.find((p) => p.id === id);
          return product && quantity > 0 ? [{ product, quantity }] : [];
        });
        setItems(restored);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveJson(
      CART_KEY,
      items.map((i): StoredItem => ({ id: i.product.id, quantity: i.quantity })),
    );
  }, [items, hydrated]);

  const add = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (!found) return [...prev, { product, quantity }];
      return prev.map((i) =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
      );
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const total = useMemo(() => cartTotal(items), [items]);

  return { items, add, remove, clear, count, total };
}
