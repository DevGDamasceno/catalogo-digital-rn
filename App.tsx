import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CartModal } from './src/components/CartModal';
import { CategoryChips } from './src/components/CategoryChips';
import { ProductCard } from './src/components/ProductCard';
import { ProductModal } from './src/components/ProductModal';
import { STORE } from './src/config';
import { products } from './src/data/products';
import { useCart } from './src/hooks/useCart';
import { Colors, radius, ThemeProvider, useTheme } from './src/theme';
import { Product } from './src/types';
import { formatPrice, normalize } from './src/utils';

const ALL = 'Todos';
const categories = [ALL, ...Array.from(new Set(products.map((p) => p.category)))];

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Catalog />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function Catalog() {
  const { mode, colors, toggle } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const cart = useCart();

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return products.filter(
      (p) =>
        (category === ALL || p.category === category) &&
        (q === '' || normalize(p.name + ' ' + p.description).includes(q)),
    );
  }, [query, category]);

  const quantityOf = (id: string) => cart.items.find((i) => i.product.id === id)?.quantity ?? 0;
  const productById = (id: string) => products.find((p) => p.id === id)!;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.storeName}>{STORE.name}</Text>
            <Text style={styles.tagline}>{STORE.tagline}</Text>
          </View>
          <Pressable
            style={styles.themeButton}
            onPress={toggle}
            accessibilityLabel={mode === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            <Text style={styles.themeIcon}>{mode === 'dark' ? '☀️' : '🌙'}</Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.search}
          placeholder="Buscar no cardápio..."
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
        />
      </View>

      <CategoryChips categories={categories} selected={category} onSelect={setCategory} />

      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum produto encontrado.</Text>}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            quantity={quantityOf(item.id)}
            onPress={() => setSelected(item)}
            onAdd={() => cart.add(item)}
            onRemove={() => cart.remove(item.id)}
          />
        )}
      />

      {cart.count > 0 && (
        <Pressable style={styles.cartBar} onPress={() => setCartOpen(true)}>
          <Text style={styles.cartText}>
            Ver pedido ({cart.count} {cart.count === 1 ? 'item' : 'itens'})
          </Text>
          <Text style={styles.cartText}>{formatPrice(cart.total)}</Text>
        </Pressable>
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={cart.add} />

      <CartModal
        visible={cartOpen}
        items={cart.items}
        total={cart.total}
        onClose={() => setCartOpen(false)}
        onAdd={(id) => cart.add(productById(id))}
        onRemove={cart.remove}
        onClear={cart.clear}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    header: { padding: 16, gap: 4 },
    titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    storeName: { fontSize: 26, fontWeight: '800', color: colors.text },
    tagline: { fontSize: 14, color: colors.muted, marginBottom: 10 },
    themeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    themeIcon: { fontSize: 18 },
    search: {
      backgroundColor: colors.surface,
      borderRadius: radius.pill,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
      paddingVertical: 10,
      fontSize: 15,
      color: colors.text,
    },
    list: { padding: 16, paddingBottom: 100 },
    empty: { textAlign: 'center', color: colors.muted, marginTop: 40 },
    cartBar: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 24,
      backgroundColor: colors.primary,
      borderRadius: radius.pill,
      paddingVertical: 14,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
    },
    cartText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  });
