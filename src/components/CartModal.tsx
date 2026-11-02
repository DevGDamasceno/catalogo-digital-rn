import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { STORE } from '../config';
import { Colors, radius, useTheme } from '../theme';
import { CartItem } from '../types';
import { buildOrderMessage, formatPrice, whatsappUrl } from '../utils';

type Props = {
  visible: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

export function CartModal({ visible, items, total, onClose, onAdd, onRemove, onClear }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [note, setNote] = useState('');

  const sendOrder = async () => {
    const url = whatsappUrl(STORE.whatsapp, buildOrderMessage(STORE.name, items, note));
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Não foi possível abrir o WhatsApp', 'Verifique se o aplicativo está instalado.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Seu pedido</Text>
          <Pressable onPress={onClose} hitSlop={8}>
            <Text style={styles.close}>Fechar</Text>
          </Pressable>
        </View>

        {items.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              keyExtractor={(i) => i.product.id}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>{item.product.name}</Text>
                    <Text style={styles.itemPrice}>
                      {formatPrice(item.product.price * item.quantity)}
                    </Text>
                  </View>
                  <View style={styles.stepper}>
                    <Pressable style={styles.stepButton} onPress={() => onRemove(item.product.id)}>
                      <Text style={styles.stepText}>−</Text>
                    </Pressable>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <Pressable style={styles.stepButton} onPress={() => onAdd(item.product.id)}>
                      <Text style={styles.stepText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              )}
              ListFooterComponent={
                <TextInput
                  style={styles.note}
                  placeholder="Observações (ex.: sem cebola, troco para R$ 50)"
                  placeholderTextColor={colors.muted}
                  value={note}
                  onChangeText={setNote}
                  multiline
                />
              }
            />
            <View style={styles.footer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatPrice(total)}</Text>
              </View>
              <Pressable style={styles.whatsButton} onPress={sendOrder}>
                <Text style={styles.whatsText}>Pedir pelo WhatsApp</Text>
              </Pressable>
              <Pressable onPress={onClear} style={{ alignSelf: 'center', marginTop: 12 }}>
                <Text style={styles.clear}>Limpar carrinho</Text>
              </Pressable>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 56,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: { fontSize: 22, fontWeight: '800', color: colors.text },
    close: { color: colors.primary, fontWeight: '700', fontSize: 15 },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    emptyText: { color: colors.muted, fontSize: 16 },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      padding: 12,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 10,
    },
    itemName: { fontSize: 15, fontWeight: '600', color: colors.text },
    itemPrice: { fontSize: 14, color: colors.primary, marginTop: 2, fontWeight: '600' },
    stepper: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    stepButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepText: { color: '#fff', fontSize: 18, fontWeight: '700', lineHeight: 20 },
    quantity: {
      fontSize: 15,
      fontWeight: '700',
      minWidth: 18,
      textAlign: 'center',
      color: colors.text,
    },
    note: {
      marginTop: 6,
      minHeight: 80,
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 12,
      textAlignVertical: 'top',
      color: colors.text,
    },
    footer: {
      padding: 16,
      paddingBottom: 28,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    totalLabel: { fontSize: 16, color: colors.muted },
    totalValue: { fontSize: 20, fontWeight: '800', color: colors.text },
    whatsButton: {
      backgroundColor: colors.whatsapp,
      paddingVertical: 14,
      borderRadius: radius.pill,
      alignItems: 'center',
    },
    whatsText: { color: '#fff', fontWeight: '800', fontSize: 16 },
    clear: { color: colors.muted, textDecorationLine: 'underline' },
  });
