import { useEffect, useMemo, useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, radius, useTheme } from '../theme';
import { Product } from '../types';
import { formatPrice } from '../utils';

type Props = {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product, quantity: number) => void;
};

export function ProductModal({ product, onClose, onAdd }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  return (
    <Modal visible={product !== null} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      {product && (
        <View style={styles.sheet}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <Pressable style={styles.closeButton} onPress={onClose} hitSlop={8}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>

          <View style={styles.body}>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>

            <View style={styles.actions}>
              <View style={styles.stepper}>
                <Pressable
                  style={styles.stepButton}
                  onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Text style={styles.stepText}>−</Text>
                </Pressable>
                <Text style={styles.quantity}>{quantity}</Text>
                <Pressable style={styles.stepButton} onPress={() => setQuantity((q) => q + 1)}>
                  <Text style={styles.stepText}>+</Text>
                </Pressable>
              </View>
              <Pressable
                style={styles.addButton}
                onPress={() => {
                  onAdd(product, quantity);
                  onClose();
                }}
              >
                <Text style={styles.addText}>
                  Adicionar · {formatPrice(product.price * quantity)}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: colors.overlay },
    sheet: {
      backgroundColor: colors.background,
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      overflow: 'hidden',
      width: '100%',
      maxWidth: 600,
      alignSelf: 'center',
    },
    image: { width: '100%', height: 220, backgroundColor: colors.border },
    closeButton: {
      position: 'absolute',
      top: 12,
      right: 12,
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: 'rgba(0,0,0,0.55)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeText: { color: '#fff', fontSize: 16, fontWeight: '700' },
    body: { padding: 20, paddingBottom: 32, gap: 6 },
    category: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: 12,
      textTransform: 'uppercase',
    },
    name: { fontSize: 24, fontWeight: '800', color: colors.text },
    description: { fontSize: 15, color: colors.muted, lineHeight: 22 },
    price: { fontSize: 22, fontWeight: '800', color: colors.primary, marginTop: 6 },
    actions: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 14 },
    stepper: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    stepButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepText: { color: colors.text, fontSize: 20, fontWeight: '700', lineHeight: 22 },
    quantity: {
      fontSize: 17,
      fontWeight: '700',
      minWidth: 20,
      textAlign: 'center',
      color: colors.text,
    },
    addButton: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: radius.pill,
      alignItems: 'center',
    },
    addText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  });
