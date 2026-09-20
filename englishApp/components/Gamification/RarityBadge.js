import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RARITY_COLORS = {
  Common: { bg: '#F3F4F6', text: '#4B5563', border: '#E5E7EB' },
  Rare: { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' },
  Legendary: { bg: '#F3E8FF', text: '#7C3AED', border: '#DDD6FE' },
  Mythic: { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A' },
};

export const RarityBadge = ({ rarity }) => {
  const colors = RARITY_COLORS[rarity] || RARITY_COLORS.Common;

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      <Text style={[styles.text, { color: colors.text }]}>{rarity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'center',
    marginVertical: 4,
  },
  text: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
});

export default RarityBadge;
