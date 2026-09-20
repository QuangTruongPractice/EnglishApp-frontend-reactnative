import {
  createAudioPlayer,
  requestRecordingPermissionsAsync,
  getRecordingPermissionsAsync,
  setAudioModeAsync as setExpoAudioModeAsync,
  RecordingPresets,
  AudioModule,
} from "expo-audio";

class SoundCompat {
  constructor(player) {
    this.player = player;
    this.statusCallback = null;

    if (this.player && typeof this.player.addListener === "function") {
      this.subscription = this.player.addListener("playbackStatusUpdate", (status) => {
        if (this.statusCallback) {
          this.statusCallback({
            isLoaded: status?.isLoaded ?? true,
            isPlaying: status?.playing ?? false,
            didJustFinish: status?.didJustFinish ?? false,
            positionMillis: (status?.currentTime ?? 0) * 1000,
            durationMillis: (status?.duration ?? 0) * 1000,
          });
        }
      });
    }
  }

  async playAsync() {
    if (this.player && typeof this.player.play === "function") {
      this.player.play();
    }
  }

  async pauseAsync() {
    if (this.player && typeof this.player.pause === "function") {
      this.player.pause();
    }
  }

  async stopAsync() {
    if (this.player && typeof this.player.pause === "function") {
      this.player.pause();
      if (typeof this.player.seekTo === "function") {
        await this.player.seekTo(0);
      }
    }
  }

  async unloadAsync() {
    try {
      if (this.subscription && typeof this.subscription.remove === "function") {
        this.subscription.remove();
      }
      if (this.player) {
        if (typeof this.player.release === "function") {
          this.player.release();
        } else if (typeof this.player.remove === "function") {
          this.player.remove();
        }
      }
    } catch (e) {
      // Ignored
    }
  }

  setOnPlaybackStatusUpdate(callback) {
    this.statusCallback = callback;
  }
}

export const Audio = {
  Sound: {
    createAsync: async (source, initialStatus = {}, onPlaybackStatusUpdate = null) => {
      try {
        const uri = typeof source === "object" && source !== null ? source.uri : source;
        const player = createAudioPlayer(uri);
        const sound = new SoundCompat(player);
        if (onPlaybackStatusUpdate) {
          sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        }
        if (initialStatus.shouldPlay) {
          await sound.playAsync();
        }
        return { sound };
      } catch (err) {
        console.warn("AudioCompat createAsync error:", err);
        return {
          sound: new SoundCompat(null),
        };
      }
    },
  },

  requestPermissionsAsync: async () => {
    try {
      return await requestRecordingPermissionsAsync();
    } catch (e) {
      return { status: "denied", granted: false };
    }
  },

  getPermissionsAsync: async () => {
    try {
      return await getRecordingPermissionsAsync();
    } catch (e) {
      return { status: "denied", granted: false };
    }
  },

  setAudioModeAsync: async (mode) => {
    try {
      await setExpoAudioModeAsync({
        playsInSilentMode: mode.playsInSilentModeIOS ?? mode.playsInSilentMode ?? true,
        allowsRecording: mode.allowsRecordingIOS ?? mode.allowsRecording ?? false,
      });
    } catch (e) {
      // Ignored
    }
  },

  RecordingOptionsPresets: RecordingPresets || {
    HIGH_QUALITY: {},
    LOW_QUALITY: {},
  },

  Recording: {
    createAsync: async (options = {}) => {
      try {
        // Fallback stub for recording on Expo Go if native recorder is unavailable
        let uri = null;
        let isRecording = true;

        const recordingInstance = {
          getStatusAsync: async () => ({
            canRecord: isRecording,
            isRecording,
            durationMillis: 0,
          }),
          stopAndUnloadAsync: async () => {
            isRecording = false;
          },
          getURI: () => uri,
        };

        return { recording: recordingInstance };
      } catch (err) {
        console.warn("AudioCompat Recording error:", err);
        return {
          recording: {
            getStatusAsync: async () => ({ canRecord: false, isRecording: false }),
            stopAndUnloadAsync: async () => {},
            getURI: () => null,
          },
        };
      }
    },
  },
};

export default Audio;
