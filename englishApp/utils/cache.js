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
  MAIN_TOPIC_DETAIL: "cache_main_topic_detail_",
  SUB_TOPIC_DETAIL: "cache_sub_topic_detail_",
};

/**
 * Saves data to AsyncStorage with a timestamp and optional TTL
 * @param {string} key - Cache key
 * @param {any} data - Data to store
 * @param {number|null} ttl - Time to live in seconds (optional)
 */
export const setCache = async (key, data, ttl = null) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl: ttl,
    };
    await AsyncStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    // Lỗi lưu cache, bỏ qua
  }
};

/**
 * Retrieves data from AsyncStorage, checking for TTL expiration
 * @param {string} key - Cache key
 * @returns {any|null} - Cached data or null
 */
export const getCache = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue != null) {
      const cacheData = JSON.parse(jsonValue);
      const { data, timestamp, ttl } = cacheData;

      if (ttl) {
        const now = Date.now();
        const expiry = timestamp + ttl * 1000;
        if (now > expiry) {
          await AsyncStorage.removeItem(key);
          return null;
        }
      }
      return data;
    }
  } catch (error) {
    // Lỗi đọc cache, bỏ qua
  }
  return null;
};

/**
 * Clears multiple cache keys at once (typically for logout or refresh)
 * @param {string[]} keys - Array of keys to remove
 */
export const clearMultipleCache = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    // Lỗi xóa cache, bỏ qua
  }
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
/**
 * Clears all application caches
 */
export const clearAllCache = async () => {
  try {
    const keys = Object.values(CACHE_KEYS);
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    // Lỗi xóa cache, bỏ qua
  }
};
