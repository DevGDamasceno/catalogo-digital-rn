import { CartItem } from './types';

export const formatPrice = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

export const buildOrderMessage = (storeName: string, items: CartItem[], note: string) => {
  const lines = items.map(
    (i) => `• ${i.quantity}x ${i.product.name} — ${formatPrice(i.product.price * i.quantity)}`,
  );
  const parts = [
    `Olá, ${storeName}! Gostaria de fazer um pedido:`,
    '',
    ...lines,
    '',
    `*Total: ${formatPrice(cartTotal(items))}*`,
  ];
  if (note.trim()) parts.push('', `Observações: ${note.trim()}`);
  return parts.join('\n');
};

export const whatsappUrl = (phone: string, message: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
