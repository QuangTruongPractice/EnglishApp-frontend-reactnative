import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Common keys used for caching
 */
export const CACHE_KEYS = {
  MAIN_TOPICS: "cache_main_topics",
  RECOMMENDED_TOPICS: "cache_recommended_topics",
  USER_PROFILE: "cache_user_profile",
  VIDEO: "cache_video",
  SUMMARY: "cache_summary",
};

/**
 * Saves data to AsyncStorage with a timestamp
 * @param {string} key - Cache key
 * @param {any} data - Data to store
 */
export const setCache = async (key, data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    // Lỗi lưu cache, bỏ qua
  }
};

/**
 * Retrieves data from AsyncStorage
 * @param {string} key - Cache key
 * @returns {any|null} - Cached data or null
 */
export const getCache = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue != null) {
      const cacheData = JSON.parse(jsonValue);
      return cacheData.data;
    }
  } catch (error) {
    // Lỗi đọc cache, bỏ qua
  }
  return null;
};

/**
 * Removes a specific cache key
 */
export const removeCache = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Lỗi xóa cache, bỏ qua
  }
};
