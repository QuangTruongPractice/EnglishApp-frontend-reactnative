import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const AchievementCard = ({ achievement, onClaimReward }) => {
  const percent = Math.min(
    Math.round((achievement.progressCurrent / achievement.progressTarget) * 100),
    100
  );
  const currentStatus = (achievement.status || 'locked').toLowerCase();
  const isClaimable = currentStatus === 'claimable';
  const isClaimed = currentStatus === 'claimed';
  const isLocked = currentStatus === 'locked';

  return (
    <View
      style={[
        styles.cardContainer,
        isClaimable && styles.claimableCard,
        isClaimed && styles.claimedCard,
      ]}
    >
      {/* Top Banner: Badge Icon + Title + Status Pill */}
      <View style={styles.topRow}>
        <View style={styles.badgeWrapper}>
          <View style={[styles.glowRing, { backgroundColor: achievement.badgeGlowColor }]} />
          <View
            style={[
              styles.badgeOuterRing,
              {
                borderColor: achievement.badgeBorderColor,
                backgroundColor: achievement.badgeColor,
              },
            ]}
          >
            <Text style={styles.badgeIconText}>{achievement.badgeIcon}</Text>
          </View>
        </View>

        <View style={styles.headerInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>{achievement.title}</Text>
            {isClaimed && (
              <View style={styles.claimedPill}>
                <Text style={styles.claimedPillText}>Đã Nhận ✓</Text>
              </View>
            )}
            {isClaimable && (
              <View style={styles.claimablePill}>
                <Text style={styles.claimablePillText}>Sẵn Sàng!</Text>
              </View>
            )}
          </View>
          <Text style={styles.descriptionText}>{achievement.description}</Text>
        </View>
      </View>

      {/* Requirement Info Box (HƯỚNG DẪN CÁCH ĐẠT) */}
      <View style={styles.requirementBox}>
        <Text style={styles.requirementText}>{achievement.requirementText}</Text>
      </View>

      {/* Progress Bar Row */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeaderRow}>
          <Text style={styles.progressTitle}>Tiến độ</Text>
          <Text style={styles.progressValueText}>
            {achievement.progressCurrent}/{achievement.progressTarget} ({percent}%)
          </Text>
        </View>
        <View style={styles.progressBarTrack}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${percent}%`,
                backgroundColor: isClaimed
                  ? '#10B981'
                  : isClaimable
                  ? '#F59E0B'
                  : '#3B82F6',
              },
            ]}
          />
        </View>
      </View>

      {/* Bottom Reward & Claim Action Bar */}
      <View style={styles.bottomRow}>
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardLabel}>Phần thưởng:</Text>
          <View style={styles.rewardPillsRow}>
            <View style={styles.gemPill}>
              <Text style={styles.pillText}>💎 +{achievement.rewardGems}</Text>
            </View>
            <View style={styles.xpPill}>
              <Text style={styles.pillText}>⚡ +{achievement.rewardXp} XP</Text>
            </View>
          </View>
        </View>

        {isClaimable && (
          <TouchableOpacity
            style={styles.claimButton}
            activeOpacity={0.8}
            onPress={() => onClaimReward(achievement)}
          >
            <Text style={styles.claimButtonText}>Nhận Thưởng!</Text>
          </TouchableOpacity>
        )}

        {isClaimed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>Hoàn Thành</Text>
          </View>
        )}

        {isLocked && (
          <View style={styles.lockedBadge}>
            <Text style={styles.lockedText}>🔒 Đang Thực Hiện</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 14,
    marginVertical: 8,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  claimableCard: {
    borderColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
    borderWidth: 2,
    shadowColor: '#F59E0B',
    shadowOpacity: 0.2,
  },
  claimedCard: {
    borderColor: '#E2E8F0',
    backgroundColor: '#FAFAFA',
    opacity: 0.9,
  },

  // Header Row
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeWrapper: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  glowRing: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  badgeOuterRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeIconText: {
    fontSize: 22,
  },
  headerInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
    flex: 1,
  },
  descriptionText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  claimedPill: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 6,
  },
  claimedPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  claimablePill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 6,
  },
  claimablePillText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#D97706',
  },

  // Requirement Box (Cách đạt)
  requirementBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  requirementText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#334155',
    lineHeight: 17,
  },

  // Progress Section
  progressSection: {
    marginBottom: 12,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  progressValueText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },

  // Bottom Actions & Rewards
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginRight: 6,
  },
  rewardPillsRow: {
    flexDirection: 'row',
  },
  gemPill: {
    backgroundColor: '#F5F3FF',
    borderColor: '#DDD6FE',
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 4,
  },
  xpPill: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#5B21B6',
  },

  // Buttons & Badges
  claimButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 3,
  },
  claimButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
  },
  completedBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  completedText: {
    color: '#64748B',
    fontWeight: '800',
    fontSize: 11,
  },
  lockedBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  lockedText: {
    color: '#64748B',
    fontWeight: '700',
    fontSize: 11,
  },
});

export default AchievementCard;
