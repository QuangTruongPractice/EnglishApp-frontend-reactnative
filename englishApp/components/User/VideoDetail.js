import { useState, useEffect, useRef, useCallback } from "react";
import VideoDetailScreen from "../Screen/VideoDetailScreen";
import { updateVideoProgress, fetchVideoDetail } from "../../configs/LoadData";
import { useNavigation } from "@react-navigation/native";

const VideoDetail = ({ route }) => {
  const { videoId } = route.params;
  const [video, setVideo] = useState(null);
  const [subtitles, setSubtitles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState(null);
  const [translatedTexts, setTranslatedTexts] = useState({});
  const [translatingIds, setTranslatingIds] = useState(new Set());
  const [isPlayerReady, setIsPlayerReady] = useState(false); 
  const webViewRef = useRef(null);
  const lastSaveTimeRef = useRef(0);
  const nav = useNavigation();

  const saveProgress = useCallback(async (progress, immediate = false) => {
      const now = Date.now();
      if (!immediate && now - lastSaveTimeRef.current < 5000) return;

      lastSaveTimeRef.current = now;

      try {
        await updateVideoProgress(progress, videoId);
        console.info(Math.round(progress.currentTime));
      } catch (error) {
        console.error("Failed to save progress:", error);
      }
    },
    [videoId]
  );

  const handleGoBack = () => {
    nav.goBack();
  };

  const handleWebViewMessage = useCallback(
    (event) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);

        const progress = {
          currentTime: data.currentTime || 0,
          duration: data.videoDuration || 0,
          isPlaying: data.isPlaying || false,
        };

        switch (data.event) {
          case "video-ready":
            setIsPlayerReady(true); 
            break;
          case "video-progress":
            if (progress.isPlaying) {
              saveProgress(progress);
            }
            break;
          case "video-played":
            saveProgress(progress, true);
            break;
          case "video-paused":
            saveProgress(progress, true);
            break;
          case "video-ended":
            saveProgress(progress, true);
            break;
          case "seek-completed":
            console.log("Seeked to:", data.time);
            break;
        }
      } catch (error) {
        console.error("Error parsing WebView message:", error);
      }
    },
    [saveProgress]
  );

  const loadData = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetchVideoDetail(videoId);
      const { video, subtitles } = res.result;

      setVideo(video);
      setSubtitles(subtitles || []);
    } catch (ex) {
      setError("Không thể tải video. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  const handleSubtitleClick = useCallback((subtitle) => {
    console.log("Subtitle clicked:", subtitle);
    setSelectedSubtitle(subtitle);
    
    if (isPlayerReady && webViewRef.current && subtitle.startTime !== undefined) {
      const seekTime = typeof subtitle.startTime === 'string' 
        ? parseFloat(subtitle.startTime) 
        : subtitle.startTime;
      
      console.log("Seeking to time:", seekTime);
      
      setTimeout(() => {
        webViewRef.current?.postMessage(
          JSON.stringify({
            action: "seekTo",
            time: seekTime,
          })
        );
      }, 100);
    } else {
      console.warn("Player not ready or invalid startTime:", {
        isPlayerReady,
        hasWebViewRef: !!webViewRef.current,
        startTime: subtitle.startTime
      });
    }
  }, [isPlayerReady]);

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
        console.error("Translation error:", error);
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

  const generateYoutubeHTML = useCallback(() => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; background: #000; overflow: hidden; }
    #player { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <div id="player"></div>
  <script>
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    let player;
    let progressTimer;
    let isPlayerReady = false;

    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: '${video?.videoId}',
        playerVars: {
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          start: ${video?.progress?.currentTime || 0}
        },
        events: {
          onReady: (event) => {
            isPlayerReady = true;
            postMessage({ 
              event: 'video-ready', 
              videoDuration: player.getDuration() 
            });
            
            // Nếu có progress từ trước, seek đến vị trí đó
            const savedTime = ${video?.progress?.currentTime || 0};
            if (savedTime > 0) {
              player.seekTo(savedTime, true);
            }
          },
          onStateChange: handleStateChange
        }
      });
    };

    const handleStateChange = (event) => {
      const duration = player.getDuration();
      const currentTime = player.getCurrentTime();
      const baseData = { currentTime, videoDuration: duration };

      clearInterval(progressTimer);
      
      if (event.data === YT.PlayerState.PLAYING) {
        postMessage({ ...baseData, event: 'video-played', isPlaying: true });
        progressTimer = setInterval(() => {
          postMessage({
            event: 'video-progress',
            currentTime: player.getCurrentTime(),
            videoDuration: duration,
            isPlaying: true
          });
        }, 1000);
      } else if (event.data === YT.PlayerState.PAUSED) {
        postMessage({ ...baseData, event: 'video-paused', isPlaying: false });
      } else if (event.data === YT.PlayerState.ENDED) {
        postMessage({ ...baseData, event: 'video-ended', currentTime: duration, isPlaying: false });
      }
    };

    const postMessage = (data) => {
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      }
    };

    window.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received message:', data);
        
        if (data.action === 'seekTo' && player && isPlayerReady) {
          const seekTime = parseFloat(data.time);
          console.log('Seeking to:', seekTime);
          
          if (!isNaN(seekTime) && seekTime >= 0) {
            player.seekTo(seekTime, true);
            
            // Gửi confirm về React Native
            setTimeout(() => {
              postMessage({
                event: 'seek-completed',
                time: seekTime,
                currentTime: player.getCurrentTime()
              });
            }, 500);
          }
        }
      } catch (e) {
        console.error('Message parsing error:', e);
      }
    });

    // Thêm event listener cho document để catch message từ React Native
    document.addEventListener('message', (event) => {
      window.dispatchEvent(new MessageEvent('message', { data: event.data }));
    });
  </script>
</body>
</html>`;
  }, [video]);

  useEffect(() => {
    loadData();
  }, [videoId]);

  useEffect(() => {
    setIsPlayerReady(false);
  }, [video?.videoId]);

  const screenProps = {
    video,
    subtitles,
    error,
    loading,
    selectedSubtitle,
    translatedTexts,
    translatingIds,

    handleGoBack,
    loadData,
    handleSubtitleClick,
    translateText,
    formatTime,
    handleWebViewMessage,
    
    webViewRef,
    youtubeHTML: generateYoutubeHTML(),
  };

  return <VideoDetailScreen {...screenProps} />;
};

export default VideoDetail;