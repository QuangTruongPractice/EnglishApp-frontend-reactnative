import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomSvgFrame } from '../Gamification/CustomSvgFrames';
import { AvatarFrameCard } from '../Gamification/AvatarFrameCard';
import { AchievementCard } from '../Gamification/AchievementCard';
import { RarityBadge } from '../Gamification/RarityBadge';
import { GemBadge } from '../Gamification/GemBadge';
import { DEFAULT_AVATAR_URL } from '../Gamification/mockGamificationData';

export const ProfileCustomizationScreen = ({
  user,
  learningProfile,
  userGems,
  frames = [],
  achievements = [],
  loading = false,
  refreshing = false,
  onRefresh,
  onEquipFrame,
  onUnequipFrame,
  onUnlockFrame,
  onClaimAchievement,
  onGoBack,
}) => {
  const [activeModule, setActiveModule] = useState('frames'); // 'frames' | 'achievements'
  const [rarityFilter, setRarityFilter] = useState('ALL'); // 'ALL' | 'Common' | 'Rare' | 'Legendary' | 'Mythic'
  const [achievementFilter, setAchievementFilter] = useState('ALL'); // 'ALL' | 'claimable' | 'locked' | 'claimed'
  const [selectedFrameModal, setSelectedFrameModal] = useState(null);

  const userAvatarUrl = user?.avatar || DEFAULT_AVATAR_URL;
  const equippedFrame = frames.find((f) => (f.status || '').toLowerCase() === 'equipped') || null;
  const unlockedCount = frames.filter((f) => (f.status || '').toLowerCase() !== 'locked').length;

  const claimableAchievementsCount = achievements.filter(
    (a) => (a.status || '').toLowerCase() === 'claimable'
  ).length;

  // Lọc khung & Sắp xếp theo Gem tăng dần
  const filteredFrames = frames
    .filter((f) => {
      if (rarityFilter === 'ALL') return true;
      return f.rarity === rarityFilter;
    })
    .slice()
    .sort((a, b) => Number(a.gemCost || 0) - Number(b.gemCost || 0));

  // Lọc thành tựu
  const filteredAchievements = achievements.filter((a) => {
    if (achievementFilter === 'ALL') return true;
    return (a.status || '').toLowerCase() === achievementFilter.toLowerCase();
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={onGoBack}>
          <Ionicons name="chevron-back" size={24} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.screenHeaderTitle}>Tùy Chỉnh Cá Nhân</Text>

        <View style={styles.headerRightInfo}>
          <GemBadge cost={userGems} size="medium" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#3B82F6"
              colors={['#3B82F6']}
            />
          ) : undefined
        }
      >
        {/* Showcase Hero Banner: Avatar Preview */}
        <LinearGradient
          colors={['#1E293B', '#0F172A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBanner}
        >
          <View style={styles.heroLeft}>
            <View style={styles.heroAvatarContainer}>
              <View style={styles.heroAvatarCircle}>
                <Image
                  source={{ uri: userAvatarUrl }}
                  style={styles.heroAvatarImage}
                />
              </View>
              {equippedFrame && (
                <CustomSvgFrame frameKey={equippedFrame.frameKey} size={90} />
              )}
            </View>
          </View>

          <View style={styles.heroRight}>
            <View style={[styles.heroEquippedTag, !equippedFrame && { borderColor: '#64748B', backgroundColor: 'rgba(100, 116, 139, 0.2)' }]}>
              <Text style={[styles.heroEquippedTagText, !equippedFrame && { color: '#94A3B8' }]}>
                {equippedFrame ? 'KHUNG ĐANG DÙNG' : 'CHƯA TRANG BỊ KHUNG'}
              </Text>
            </View>
            <Text style={styles.heroFrameTitle} numberOfLines={1}>
              {equippedFrame?.name || 'Ảnh Mặc Định'}
            </Text>
            <View style={styles.heroStatsRow}>
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatLabel}>Đã sở hữu:</Text>
                <Text style={styles.heroStatValue}>{unlockedCount}/{frames.length} Khung</Text>
              </View>
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatLabel}>Level:</Text>
                <Text style={styles.heroStatValue}>{learningProfile?.level || 'A1'}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Module Switcher (Khung Avatar vs Danh Hiệu) */}
        <View style={styles.moduleSwitcherContainer}>
          <TouchableOpacity
            style={[
              styles.moduleTab,
              activeModule === 'frames' && styles.activeModuleTab,
            ]}
            onPress={() => setActiveModule('frames')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="color-palette-outline"
              size={18}
              color={activeModule === 'frames' ? '#0F172A' : '#64748B'}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.moduleTabText,
                activeModule === 'frames' && styles.activeModuleTabText,
              ]}
            >
              Khung Avatar ({frames.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.moduleTab,
              activeModule === 'achievements' && styles.activeModuleTab,
            ]}
            onPress={() => setActiveModule('achievements')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="trophy-outline"
              size={18}
              color={activeModule === 'achievements' ? '#0F172A' : '#64748B'}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.moduleTabText,
                activeModule === 'achievements' && styles.activeModuleTabText,
              ]}
            >
              Danh Hiệu
            </Text>
            {claimableAchievementsCount > 0 && (
              <View style={styles.notificationDot}>
                <Text style={styles.notificationDotText}>
                  {claimableAchievementsCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* -------------------- TAB 1: KHUNG AVATAR -------------------- */}
        {activeModule === 'frames' && (
          <View>
            {/* Filter Rarity Horizontal Chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterChipScroll}
            >
              {[
                { id: 'ALL', label: 'Tất cả' },
                { id: 'Common', label: '🟢 Phổ biến' },
                { id: 'Rare', label: '🔵 Hiếm' },
                { id: 'Legendary', label: '🟣 Huyền thoại' },
                { id: 'Mythic', label: '🟡 Thần thoại' },
              ].map((chip) => (
                <TouchableOpacity
                  key={chip.id}
                  style={[
                    styles.filterChip,
                    rarityFilter === chip.id && styles.activeFilterChip,
                  ]}
                  onPress={() => setRarityFilter(chip.id)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      rarityFilter === chip.id && styles.activeFilterChipText,
                    ]}
                  >
                    {chip.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Grid Khung Avatar 3 Cột */}
            <View style={styles.gridContainer}>
              {filteredFrames.map((frame) => (
                <AvatarFrameCard
                  key={frame.id}
                  frame={frame}
                  userAvatar={userAvatarUrl}
                  onPress={(f) => setSelectedFrameModal(f)}
                />
              ))}
            </View>
          </View>
        )}

        {/* -------------------- TAB 2: DANH HIỆU / THÀNH TỰU -------------------- */}
        {activeModule === 'achievements' && (
          <View>
            {/* Achievement Summary Card */}
            <View style={styles.achievementSummaryCard}>
              <View style={styles.summaryLeft}>
                <Text style={styles.summaryMainText}>Thành Tựu & Phần Thưởng</Text>
                <Text style={styles.summarySubText}>
                  Hoàn thành nhiệm vụ để nhận thêm Đá Quý 💎 và Điểm XP ⚡
                </Text>
              </View>
              <View style={styles.summaryBadgeBox}>
                <Text style={styles.summaryBadgeIcon}>🏆</Text>
              </View>
            </View>

            {/* Filter Chips cho Thành Tựu */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterChipScroll}
            >
              {[
                { id: 'ALL', label: 'Tất cả' },
                { id: 'claimable', label: '🎁 Sẵn sàng nhận' },
                { id: 'locked', label: '🔒 Đang làm' },
                { id: 'claimed', label: '✓ Đã nhận' },
              ].map((chip) => (
                <TouchableOpacity
                  key={chip.id}
                  style={[
                    styles.filterChip,
                    achievementFilter === chip.id && styles.activeFilterChip,
                  ]}
                  onPress={() => setAchievementFilter(chip.id)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      achievementFilter === chip.id && styles.activeFilterChipText,
                    ]}
                  >
                    {chip.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* List Thành Tựu */}
            <View style={styles.achievementsList}>
              {filteredAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  onClaimReward={onClaimAchievement}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* -------------------- MODAL CHI TIẾT KHUNG -------------------- */}
      {selectedFrameModal && (
        <Modal
          visible={!!selectedFrameModal}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedFrameModal(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedFrameModal(null)}
              >
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>

              {/* Large Frame Preview in Modal */}
              <View style={styles.modalFramePreview}>
                <View
                  style={[
                    styles.modalAvatarCircle,
                    { backgroundColor: selectedFrameModal.avatarBg },
                  ]}
                >
                  <Image
                    source={{ uri: userAvatarUrl }}
                    style={styles.modalAvatarImg}
                  />
                </View>
                <CustomSvgFrame
                  frameKey={selectedFrameModal.frameKey}
                  size={130}
                />
              </View>

              <Text style={styles.modalTitle}>{selectedFrameModal.name}</Text>

              <RarityBadge rarity={selectedFrameModal.rarity} />

              <Text style={styles.modalDescription}>
                {selectedFrameModal.description}
              </Text>

              <View style={styles.modalActions}>
                {(selectedFrameModal.status || 'locked').toLowerCase() === 'equipped' && (
                  <View style={{ width: '100%', gap: 8 }}>
                    <View style={styles.modalStatusEquipped}>
                      <Text style={styles.modalEquippedText}>✓ Đang Trang Bị</Text>
                    </View>
                    {onUnequipFrame && (
                      <TouchableOpacity
                        style={[styles.modalEquipBtn, { backgroundColor: '#64748B' }]}
                        onPress={() => {
                          onUnequipFrame(selectedFrameModal);
                          setSelectedFrameModal(null);
                        }}
                      >
                        <Text style={styles.modalBtnText}>Tháo Khung Avatar</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                {(selectedFrameModal.status || 'locked').toLowerCase() === 'unlocked' && (
                  <TouchableOpacity
                    style={styles.modalEquipBtn}
                    onPress={() => {
                      onEquipFrame(selectedFrameModal);
                      setSelectedFrameModal(null);
                    }}
                  >
                    <Text style={styles.modalBtnText}>Trang Bị Khung Này</Text>
                  </TouchableOpacity>
                )}

                {(selectedFrameModal.status || 'locked').toLowerCase() === 'locked' && (
                  <TouchableOpacity
                    style={styles.modalUnlockBtn}
                    onPress={() => {
                      onUnlockFrame(selectedFrameModal);
                      setSelectedFrameModal(null);
                    }}
                  >
                    <Text style={styles.modalBtnText}>Mở khóa với</Text>
                    <View style={styles.modalGemRow}>
                      <GemBadge
                        cost={selectedFrameModal.gemCost}
                        size="medium"
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
  screenHeaderTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerRightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Hero Showcase Banner
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    marginTop: 12,
    marginBottom: 10,
    padding: 16,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  heroLeft: {
    marginRight: 16,
  },
  heroAvatarContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heroAvatarCircle: {
    position: 'absolute',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroAvatarImage: {
    width: '100%',
    height: '100%',
  },
  heroRight: {
    flex: 1,
  },
  heroEquippedTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderColor: '#F59E0B',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
  },
  heroEquippedTagText: {
    color: '#FBBF24',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  heroFrameTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  heroStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroStatItem: {
    marginRight: 16,
  },
  heroStatLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  heroStatValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#38BDF8',
  },

  // Module Switcher Tabs
  moduleSwitcherContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 16,
    marginHorizontal: 14,
    marginTop: 6,
    marginBottom: 8,
    padding: 3,
  },
  moduleTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  activeModuleTab: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  moduleTabText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#64748B',
  },
  activeModuleTabText: {
    color: '#0F172A',
  },
  notificationDot: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginLeft: 6,
  },
  notificationDotText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },

  // Filter Chips
  filterChipScroll: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#3B82F6',
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  activeFilterChipText: {
    color: '#FFFFFF',
  },

  // Grid
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 6,
  },

  // Achievement Summary Card
  achievementSummaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
    marginTop: 6,
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryLeft: {
    flex: 1,
    marginRight: 10,
  },
  summaryMainText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
  },
  summarySubText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 15,
  },
  summaryBadgeBox: {
    backgroundColor: '#FEF3C7',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryBadgeIcon: {
    fontSize: 22,
  },
  achievementsList: {
    paddingTop: 4,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFramePreview: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    position: 'relative',
  },
  modalAvatarCircle: {
    position: 'absolute',
    width: 94,
    height: 94,
    borderRadius: 47,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalAvatarImg: {
    width: '100%',
    height: '100%',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  modalDescription: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginVertical: 12,
    lineHeight: 18,
  },
  modalActions: {
    width: '100%',
    marginTop: 6,
  },
  modalStatusEquipped: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  modalEquippedText: {
    color: '#D97706',
    fontWeight: '900',
    fontSize: 13,
  },
  modalEquipBtn: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  modalUnlockBtn: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
    marginRight: 8,
  },
  modalGemRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});

export default ProfileCustomizationScreen;
