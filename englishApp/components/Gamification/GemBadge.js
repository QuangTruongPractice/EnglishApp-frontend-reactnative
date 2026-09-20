import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const GemBadge = ({ cost = 0, size = 'small' }) => {
  const isLarge = size === 'large';
  const isMedium = size === 'medium';
  
  return (
    <View style={[
      styles.container,
      isMedium && styles.mediumContainer,
      isLarge && styles.largeContainer
    ]}>
      <Text style={[
        styles.gemIcon,
        isMedium && styles.mediumGemIcon,
        isLarge && styles.largeGemIcon
      ]}>💎</Text>
      <Text style={[
        styles.costText,
        isMedium && styles.mediumCostText,
        isLarge && styles.largeCostText
      ]}>
        {Number(cost || 0).toLocaleString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  mediumContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: '#FAF5FF',
    borderColor: '#C4B5FD',
  },
  largeContainer: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#FAF5FF',
    borderColor: '#C4B5FD',
  },
  gemIcon: {
    fontSize: 11,
    marginRight: 3,
  },
  mediumGemIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  largeGemIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  costText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6D28D9',
  },
  mediumCostText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6D28D9',
  },
  largeCostText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#5B21B6',
  },
});

export default GemBadge;
