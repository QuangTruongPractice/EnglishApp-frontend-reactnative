import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { MyUserContext, MyDispatchContext } from '../../configs/Context';
import {
  fetchAvatarFrames,
  buyAvatarFrame,
  equipAvatarFrame,
  unequipAvatarFrame,
  fetchAchievements,
  claimAchievementReward,
  getUserGems,
  saveUserGems,
} from '../../configs/LoadData';
import ProfileCustomizationScreen from '../Screen/ProfileCustomizationScreen';
import {
  MOCK_FRAMES,
  MOCK_ACHIEVEMENTS,
  INITIAL_USER_GEMS,
} from '../Gamification/mockGamificationData';

export const ProfileCustomization = () => {
  const navigation = useNavigation();
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userGems, setUserGems] = useState(INITIAL_USER_GEMS);
  const [frames, setFrames] = useState(MOCK_FRAMES);
  const [achievements, setAchievements] = useState(MOCK_ACHIEVEMENTS);

  const loadData = useCallback(async () => {
    try {
      // 1. Load Gems from Backend / Storage
      const gems = await getUserGems();
      setUserGems(gems);

      // 2. Load Frames
      const framesData = await fetchAvatarFrames();
      const currentEquippedKey = user?.equippedFrame?.frameKey || user?.equippedFrameKey;
      
      let baseFrames = framesData && framesData.length > 0 ? framesData : MOCK_FRAMES;
      // Sync frame status with user's equipped frame, normalize status to lowercase & sort by gemCost ascending
      const synchronizedFrames = baseFrames
        .map((f) => {
          const rawStatus = (f.status || 'locked').toLowerCase();
          let status = rawStatus;
          if (currentEquippedKey && f.frameKey === currentEquippedKey) {
            status = 'equipped';
          } else if (rawStatus === 'equipped' && currentEquippedKey && f.frameKey !== currentEquippedKey) {
            status = 'unlocked';
          }
          const cost = Number(f.gemCost ?? f.gem_cost ?? 0);
          return {
            ...f,
            gemCost: cost,
            status,
          };
        })
        .sort((a, b) => a.gemCost - b.gemCost);
      setFrames(synchronizedFrames);

      // 3. Load Achievements & normalize status to lowercase
      const achData = await fetchAchievements();
      const baseAch = achData && achData.length > 0 ? achData : MOCK_ACHIEVEMENTS;
      const normalizedAch = baseAch.map((a) => ({
        ...a,
        status: (a.status || 'locked').toLowerCase(),
      }));
      setAchievements(normalizedAch);
    } catch (error) {
      console.warn('Error loading gamification data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.equippedFrame?.frameKey]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, [loadData]);

  // Handler: Trang Bị Khung
  const handleEquipFrame = async (frame) => {
    try {
      const updatedFrames = frames.map((f) => ({
        ...f,
        status: f.id === frame.id ? 'equipped' : f.status === 'equipped' ? 'unlocked' : f.status,
      }));
      setFrames(updatedFrames);

      // Cập nhật API / Storage
      await equipAvatarFrame(frame.frameKey, frame.id);

      // Cập nhật User Context
      if (dispatch) {
        const updatedUser = {
          ...user,
          equippedFrame: {
            id: frame.id,
            frameKey: frame.frameKey,
            name: frame.name,
            rarity: frame.rarity,
          },
        };
        dispatch({ type: 'login', payload: updatedUser });
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      }

      Toast.show({
        type: 'success',
        text1: 'Trang Bị Thành Công! 👑',
        text2: `Đã đổi sang khung "${frame.name}".`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi Trang Bị',
        text2: 'Vui lòng thử lại sau.',
      });
    }
  };

  // Handler: Tháo Khung (Gỡ khung đang trang bị)
  const handleUnequipFrame = async (frame) => {
    try {
      const updatedFrames = frames.map((f) => ({
        ...f,
        status: f.id === frame.id ? 'unlocked' : f.status,
      }));
      setFrames(updatedFrames);

      // Cập nhật API / Storage
      await unequipAvatarFrame();

      // Cập nhật User Context
      if (dispatch) {
        const updatedUser = {
          ...user,
          equippedFrame: null,
        };
        dispatch({ type: 'login', payload: updatedUser });
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      }

      Toast.show({
        type: 'success',
        text1: 'Đã tháo khung avatar! ✨',
        text2: 'Bạn đang dùng avatar mặc định.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Thao tác thất bại',
        text2: 'Vui lòng thử lại sau.',
      });
    }
  };

  // Handler: Mua / Mở Khóa Khung bằng Gem
  const handleUnlockFrame = async (frame) => {
    if (userGems < frame.gemCost) {
      Toast.show({
        type: 'error',
        text1: 'Không Đủ Đá Quý 💎',
        text2: `Bạn cần thêm ${(frame.gemCost - userGems).toLocaleString()} Gems để mở khóa khung này.`,
      });
      return;
    }

    try {
      const remainingGems = userGems - frame.gemCost;
      setUserGems(remainingGems);
      await saveUserGems(remainingGems);

      const updatedFrames = frames.map((f) =>
        f.id === frame.id ? { ...f, status: 'unlocked' } : f
      );
      setFrames(updatedFrames);

      await buyAvatarFrame(frame.frameKey, frame.id);

      // Cập nhật User Context
      if (dispatch) {
        const updatedUser = {
          ...user,
          gems: remainingGems,
        };
        dispatch({ type: 'login', payload: updatedUser });
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      }

      Toast.show({
        type: 'success',
        text1: 'Mở Khóa Thành Công! ✨',
        text2: `Đã mở khóa khung "${frame.name}".`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Giao dịch thất bại',
        text2: 'Vui lòng thử lại sau.',
      });
    }
  };

  // Handler: Nhận Thưởng Thành Tựu
  const handleClaimAchievement = async (achievement) => {
    try {
      const newGems = userGems + achievement.rewardGems;
      setUserGems(newGems);
      await saveUserGems(newGems);

      const updatedAchievements = achievements.map((a) =>
        a.id === achievement.id ? { ...a, status: 'claimed' } : a
      );
      setAchievements(updatedAchievements);

      await claimAchievementReward(achievement.code, achievement.id);

      // Cập nhật User Context
      if (dispatch) {
        const updatedUser = {
          ...user,
          gems: newGems,
        };
        dispatch({ type: 'login', payload: updatedUser });
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      }

      Toast.show({
        type: 'success',
        text1: 'Nhận Thưởng Thành Công! 🎁',
        text2: `+${achievement.rewardGems} Gems 💎 | +${achievement.rewardXp} XP ⚡`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Nhận thưởng thất bại',
        text2: 'Vui lòng thử lại sau.',
      });
    }
  };

  return (
    <ProfileCustomizationScreen
      user={user}
      learningProfile={user?.learningProfile}
      userGems={userGems}
      frames={frames}
      achievements={achievements}
      loading={loading}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      onEquipFrame={handleEquipFrame}
      onUnequipFrame={handleUnequipFrame}
      onUnlockFrame={handleUnlockFrame}
      onClaimAchievement={handleClaimAchievement}
      onGoBack={() => navigation.goBack()}
    />
  );
};

export default ProfileCustomization;
