import { Product } from '../types';

const img = (seed: string) => `https://picsum.photos/seed/${seed}/400/300`;

export const products: Product[] = [
  {
    id: '1',
    name: 'X-Burger Clássico',
    description: 'Pão brioche, hambúrguer 150g, queijo, alface e tomate.',
    price: 24.9,
    category: 'Lanches',
    image: img('xburger'),
  },
  {
    id: '2',
    name: 'X-Bacon',
    description: 'Hambúrguer 150g, bacon crocante, queijo cheddar e maionese da casa.',
    price: 29.9,
    category: 'Lanches',
    image: img('xbacon'),
  },
  {
    id: '3',
    name: 'Frango Crispy',
    description: 'Peito de frango empanado, picles e molho especial.',
    price: 26.5,
    category: 'Lanches',
    image: img('frango'),
  },
  {
    id: '4',
    name: 'Batata Frita',
    description: 'Porção de 300g com sal e orégano.',
    price: 18,
    category: 'Porções',
    image: img('batata'),
  },
  {
    id: '5',
    name: 'Onion Rings',
    description: 'Anéis de cebola empanados, 12 unidades.',
    price: 20,
    category: 'Porções',
    image: img('onion'),
  },
  {
    id: '6',
    name: 'Refrigerante Lata',
    description: '350ml. Coca-Cola, Guaraná ou Sprite.',
    price: 6,
    category: 'Bebidas',
    image: img('refri'),
  },
  {
    id: '7',
    name: 'Suco Natural',
    description: '400ml. Laranja, limão ou maracujá.',
    price: 9.5,
    category: 'Bebidas',
    image: img('suco'),
  },
  {
    id: '8',
    name: 'Brownie com Sorvete',
    description: 'Brownie quente com bola de sorvete de creme.',
    price: 16,
    category: 'Sobremesas',
    image: img('brownie'),
  },
];
