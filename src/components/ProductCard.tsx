import { useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, radius, useTheme } from '../theme';
import { Product } from '../types';
import { formatPrice } from '../utils';

type Props = {
  product: Product;
  quantity: number;
  onPress: () => void;
  onAdd: () => void;
  onRemove: () => void;
};

export function ProductCard({ product, quantity, onPress, onAdd, onRemove }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {quantity === 0 ? (
            <Pressable style={styles.addButton} onPress={onAdd}>
              <Text style={styles.addText}>Adicionar</Text>
            </Pressable>
          ) : (
            <View style={styles.stepper}>
              <Pressable style={styles.stepButton} onPress={onRemove} hitSlop={8}>
                <Text style={styles.stepText}>−</Text>
              </Pressable>
              <Text style={styles.quantity}>{quantity}</Text>
              <Pressable style={styles.stepButton} onPress={onAdd} hitSlop={8}>
                <Text style={styles.stepText}>+</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
      marginBottom: 12,
    },
    image: { width: 110, height: '100%', minHeight: 110, backgroundColor: colors.border },
    info: { flex: 1, padding: 12, justifyContent: 'space-between' },
    name: { fontSize: 16, fontWeight: '700', color: colors.text },
    description: { fontSize: 13, color: colors.muted, marginTop: 2 },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    price: { fontSize: 16, fontWeight: '700', color: colors.primary },
    addButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: radius.pill,
    },
    addText: { color: '#fff', fontWeight: '600', fontSize: 13 },
    stepper: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    stepButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepText: { color: '#fff', fontSize: 18, fontWeight: '700', lineHeight: 20 },
    quantity: {
      fontSize: 15,
      fontWeight: '700',
      minWidth: 16,
      textAlign: 'center',
      color: colors.text,
    },
  });
