import { useState, useEffect, useRef, useCallback } from "react";
import VideoDetailScreen from "../Screen/VideoDetailScreen";
import { updateVideoProgress, fetchVideoDetail } from "../../configs/LoadData";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

const VideoDetail = ({ route }) => {
  const { videoId: initialVideoId } = route.params;
  const [selectedSubtitle, setSelectedSubtitle] = useState(null);
  const [translatedTexts, setTranslatedTexts] = useState({});
  const [translatingIds, setTranslatingIds] = useState(new Set());
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);
  const lastSaveTimeRef = useRef(0);
  const nav = useNavigation();
  const queryClient = useQueryClient();

  // Robust YouTube ID extraction
  const extractYouTubeId = (input) => {
    if (input === undefined || input === null) return null;
    const strInput = String(input);
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = strInput.match(regex);
    return match ? match[1] : strInput;
  };

  const videoId = extractYouTubeId(initialVideoId);

  const { data, isLoading: loading, error: queryError, refetch: loadData } = useQuery({
    queryKey: ['videoDetail', videoId],
    queryFn: () => fetchVideoDetail(videoId),
    enabled: !!videoId
  });

  const video = data?.result?.video || null;
  const subtitles = data?.result?.subtitles || [];
  const error = queryError ? "Không thể tải video. Vui lòng thử lại." : null;

  const saveProgress = useCallback(async (progress, immediate = false) => {
    const now = Date.now();
    if (!immediate && now - lastSaveTimeRef.current < 5000) return;

    lastSaveTimeRef.current = now;

    try {
      await updateVideoProgress(progress, videoId);
      // Cập nhật lại cache cho summary và tiến trình học video
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      queryClient.invalidateQueries({ queryKey: ['videoProgress'] });
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    } catch (error) {
      // Lỗi lưu tiến độ video, bỏ qua
    }
  }, [videoId, queryClient]);

  const handleGoBack = () => {
    nav.goBack();
  };

  const handleStateChange = useCallback(
    async (state) => {
      if (state === "playing") {
        setPlaying(true);
      } else if (state === "paused" || state === "ended") {
        setPlaying(false);
        const currentTime = await playerRef.current?.getCurrentTime();
        const duration = await playerRef.current?.getDuration();
        if (currentTime !== undefined) {
          saveProgress({ currentTime, duration, isPlaying: false }, true);
        }
      }
    },
    [saveProgress]
  );

  // Periodic progress saving during playback
  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(async () => {
        const currentTime = await playerRef.current?.getCurrentTime();
        const duration = await playerRef.current?.getDuration();
        if (currentTime !== undefined) {
          saveProgress({ currentTime, duration, isPlaying: true });
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [playing, saveProgress]);

  const handleSubtitleClick = useCallback((subtitle) => {
    setSelectedSubtitle(subtitle);

    if (playerRef.current && subtitle.startTime !== undefined) {
        const seekTime = typeof subtitle.startTime === 'string'
          ? parseFloat(subtitle.startTime)
          : subtitle.startTime;
  
        playerRef.current.seekTo(seekTime, true);
    }
  }, []);

  const translateText = useCallback(
    async (subtitle) => {
      const { segmentId, originalText } = subtitle;

      if (translatedTexts[segmentId] || translatingIds.has(segmentId)) return;

      setTranslatingIds((prev) => new Set(prev).add(segmentId));

      try {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            originalText
          )}&langpair=en|vi`
        );
        const data = await response.json();

        if (data.responseStatus === 200 && data.responseData?.translatedText) {
          setTranslatedTexts((prev) => ({
            ...prev,
            [segmentId]: data.responseData.translatedText,
          }));
        }
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể dịch phụ đề.' });
      } finally {
        setTranslatingIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(segmentId);
          return newSet;
        });
      }
    },
    [translatedTexts, translatingIds]
  );

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);


  const screenProps = {
    video,
    subtitles,
    error,
    loading,
    selectedSubtitle,
    translatedTexts,
    translatingIds,
    playing,

    handleGoBack,
    loadData,
    handleSubtitleClick,
    translateText,
    formatTime,
    handleStateChange,

    playerRef,
    videoId: extractYouTubeId(video?.videoId) || videoId,
    initialTime: video?.progress?.currentTime || 0,
  };

  return <VideoDetailScreen {...screenProps} />;
};

export default VideoDetail;
