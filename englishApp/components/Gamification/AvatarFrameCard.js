import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { RarityBadge } from './RarityBadge';
import { GemBadge } from './GemBadge';
import { CustomSvgFrame } from './CustomSvgFrames';
import { DEFAULT_AVATAR_URL } from './mockGamificationData';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_MARGIN = 4;
const CONTAINER_PADDING = 12;
const CARD_WIDTH = (SCREEN_WIDTH - (CONTAINER_PADDING * 2) - (CARD_MARGIN * 6)) / 3;

export const AvatarFrameCard = ({ frame, userAvatar, onPress }) => {
  const currentStatus = (frame.status || 'locked').toLowerCase();
  const isEquipped = currentStatus === 'equipped';
  const isUnlocked = currentStatus === 'unlocked';
  const isLocked = currentStatus === 'locked';
  const avatarSource = userAvatar ? { uri: userAvatar } : { uri: DEFAULT_AVATAR_URL };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(frame)}
      style={[
        styles.cardContainer,
        { width: CARD_WIDTH },
        isEquipped && styles.equippedCard,
        isUnlocked && styles.unlockedCard,
      ]}
    >
      {/* Top Rarity Badge */}
      <RarityBadge rarity={frame.rarity} />

      {/* Frame Graphic Container with 100% Unique SVG Vector Artwork */}
      <View style={styles.frameWrapper}>
        {/* Base Character Avatar Image */}
        <View style={[styles.avatarCircle, { backgroundColor: frame.avatarBg }]}>
          <Image
            source={avatarSource}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>

        {/* Dedicated SVG Artwork for this specific frameKey */}
        <CustomSvgFrame frameKey={frame.frameKey} size={86} />

        {/* Lock Overlay */}
        {isLocked && (
          <View style={styles.lockOverlay}>
            <View style={styles.lockBadge}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          </View>
        )}
      </View>

      {/* Frame Title */}
      <Text style={styles.frameName} numberOfLines={1}>
        {frame.name}
      </Text>

      {/* Status / Gem Cost Footer */}
      <View style={styles.footerContainer}>
        {isEquipped && (
          <View style={styles.equippedBadge}>
            <Text style={styles.equippedText}>ĐANG DÙNG</Text>
          </View>
        )}

        {isUnlocked && !isEquipped && (
          <View style={styles.unlockBadge}>
            <Text style={styles.unlockText}>TRANG BỊ</Text>
          </View>
        )}

        {isLocked && <GemBadge cost={frame.gemCost} size="small" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginHorizontal: CARD_MARGIN,
    marginVertical: 6,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    elevation: 3,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  equippedCard: {
    borderColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
    borderWidth: 2,
    shadowColor: '#F59E0B',
    shadowOpacity: 0.25,
  },
  unlockedCard: {
    borderColor: '#CBD5E1',
  },

  // Avatar & SVG Structure Container
  frameWrapper: {
    width: 86,
    height: 86,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    position: 'relative',
  },
  avatarCircle: {
    position: 'absolute',
    width: 62,
    height: 62,
    borderRadius: 31,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },

  // Lock Overlay
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    borderRadius: 43,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  lockBadge: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 12,
  },

  // Text
  frameName: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 4,
  },

  // Footer Status
  footerContainer: {
    marginTop: 2,
    minHeight: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  equippedBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  equippedText: {
    fontSize: 8.5,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  unlockBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  unlockText: {
    fontSize: 8.5,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});

export default AvatarFrameCard;
