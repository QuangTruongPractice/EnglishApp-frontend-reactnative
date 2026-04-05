import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";

import styles from "../../styles/SessionStyles";
import { 
  fetchDailySession, 
  submitQuizSession, 
  submitWritingSession, 
  checkSessionLevelUp 
} from "../../configs/LoadData";

import SessionPhaseMeanings from "./SessionPhaseMeanings";
import SessionPhaseQuizzes from "./SessionPhaseQuizzes";
import SessionPhaseWriting from "./SessionPhaseWriting";
import SessionResult from "./SessionResult";

const PHASES = {
  MEANINGS: "MEANINGS",
  QUIZZES: "QUIZZES",
  WRITING: "WRITING",
  RESULT: "RESULT"
};

const DailySession = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(PHASES.MEANINGS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [levelUpData, setLevelUpData] = useState(null);

  // Animation values for XP
  const [awardedXP, setAwardedXP] = useState(0);
  const [showXPAnimation, setShowXPAnimation] = useState(false);
  const xpAnimY = useRef(new Animated.Value(0)).current;
  const xpAnimOpacity = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  useEffect(() => {
    loadSession();
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, []);

  useEffect(() => {
    setIsAnswered(false);
  }, [currentIndex, currentPhase]);

  const loadSession = async () => {
    try {
      setLoading(true);
      const res = await fetchDailySession();
      if (res.code === 1000) {
        setSession(res.result);
        setTotalXP(res.result.totalXP || 0);
        if (res.result.completed) {
          setCurrentPhase(PHASES.RESULT);
        }
      } else {
        Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể tải phiên học tập.' });
      }
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Lỗi kết nối máy chủ.' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#F45B69" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Đang khởi tạo bài học...</Text>
      </View>
    );
  }

  if (!session) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "#fff", fontSize: 16 }}>Không thể tải phiên học tập.</Text>
        <TouchableOpacity style={[styles.buttonPrimary, { flex: 0, marginTop: 20, paddingHorizontal: 30 }]} onPress={loadSession}>
          <Text style={styles.buttonTextPrimary}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const playAudio = async (uri) => {
    if (!uri) return;
    try {
      if (sound) await sound.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync({ uri });
      setSound(newSound);
      await newSound.playAsync();
    } catch (e) {
      // Lỗi phát âm thanh, bỏ qua
    }
  };

  const completeSession = async () => {
    try {
      const res = await checkSessionLevelUp(session.id);
      if (res.code === 1000) {
        setLevelUpData(res.result);
        if (res.result?.totalXP) {
          setTotalXP(res.result.totalXP);
        }
      }
    } catch (e) {
      // Lỗi kiểm tra level up, bỏ qua và vẫn hiển thị kết quả
    } finally {
      setCurrentPhase(PHASES.RESULT);
    }
  };

  const handleNext = () => {
    if (currentPhase === PHASES.MEANINGS) {
      if (currentIndex < session.meanings.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        handleJumpToQuizzes(); // Try jumping past already done quizzes when next-ing from meanings
      }
    } else if (currentPhase === PHASES.QUIZZES) {
      if (currentIndex < session.quizzes.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsAnswered(false);
      } else {
        setCurrentPhase(PHASES.WRITING);
        setCurrentIndex(0);
        setIsAnswered(false);
      }
    } else if (currentPhase === PHASES.WRITING) {
      if (currentIndex < (session.writingPrompts?.length || 0) - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsAnswered(false);
      } else {
        completeSession();
      }
    }
  };

  const handleJumpToQuizzes = () => {
    // Find first unanswered quiz
    const firstUnansweredIndex = session.quizzes.findIndex(q => q.isCorrect === null);
    if (firstUnansweredIndex !== -1) {
      setCurrentPhase(PHASES.QUIZZES);
      setCurrentIndex(firstUnansweredIndex);
    } else {
      // All quizzes are done, go to writing
      setCurrentPhase(PHASES.WRITING);
      setCurrentIndex(0);
    }
  };

  const handleTabChange = (type) => {
    if (!session || !session.quizzes) return;
    const quizzes = session.quizzes;
    
    // First try to find an unanswered quiz of that specific type
    let targetIndex = quizzes.findIndex(q => q.quiz.type === type && q.isCorrect === null);
    
    // If all are answered, just go to the first quiz of that type
    if (targetIndex === -1) {
       targetIndex = quizzes.findIndex(q => q.quiz.type === type);
    }
    
    if (targetIndex !== -1) {
       if (currentPhase !== PHASES.QUIZZES) {
          setCurrentPhase(PHASES.QUIZZES);
       }
       setCurrentIndex(targetIndex);
    } else {
       Toast.show({ type: 'info', text1: 'Thông báo', text2: 'Không có bài tập loại này.' });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
       if (currentPhase === PHASES.QUIZZES) {
         setCurrentPhase(PHASES.MEANINGS);
         setCurrentIndex(session.meanings.length - 1);
       } else if (currentPhase === PHASES.WRITING) {
         setCurrentPhase(PHASES.QUIZZES);
         setCurrentIndex(session.quizzes.length - 1);
       }
    }
  };

  const triggerXPAnimation = (xp) => {
    if (xp <= 0) return;
    setAwardedXP(xp);
    setShowXPAnimation(true);
    xpAnimY.setValue(0);
    xpAnimOpacity.setValue(1);

    Animated.parallel([
      Animated.timing(xpAnimY, {
        toValue: -150, // Move up
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(xpAnimOpacity, {
        toValue: 0, // Fade out
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowXPAnimation(false);
    });
  };

  const onQuizAnswer = async (isCorrect) => {
    setIsAnswered(true);
    const quiz = session.quizzes[currentIndex];
    
    let awardedXp = isCorrect ? (quiz.xpAwarded || 3) : 0;
    
    try {
      const res = await submitQuizSession(session.id, quiz.id, isCorrect);
      if (res.code === 1000) {
        if (res.result && typeof res.result === 'object' && typeof res.result.xpAwarded === 'number') {
           awardedXp = res.result.xpAwarded;
        } else if (typeof res.result === 'number') {
           // We ignore direct number if it might be totalXP, but fallback to xpAwarded is safer
           // awardedXp = res.result; 
        }
      }
    } catch (e) {
      // Lỗi gửi kết quả quiz, bỏ qua
    }

    if (awardedXp > 0) {
      setTotalXP(prev => prev + awardedXp);
      triggerXPAnimation(awardedXp);
    }
  };

  const onWritingAnswer = async (content) => {
    setIsAnswered(true);
    const prompt = session.writingPrompts[currentIndex];
    
    try {
      const res = await submitWritingSession(session.id, prompt.id, content);
      if (res.code === 1000) {
        const aiResult = res.result; // Full AiAnalysisResponse
        const xp = aiResult.score || 2; 
        
        setTotalXP(prev => prev + xp);
        triggerXPAnimation(xp);
        
        return aiResult; // Return to component for display
      }
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể gửi bài viết.' });
    }
    return null;
  };

  const renderProgressBar = () => {
    let progress = 0;
    let total = 1;
    
    if (currentPhase === PHASES.MEANINGS) {
      progress = currentIndex + 1;
      total = session.meanings.length;
    } else if (currentPhase === PHASES.QUIZZES) {
      progress = currentIndex + 1;
      total = session.quizzes.length;
    } else if (currentPhase === PHASES.WRITING) {
      progress = 1;
      total = 1;
    }

    const widthPercent = (progress / total) * 100;

    return (
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${widthPercent}%` }]} />
        </View>
    );
  };

  const renderContent = () => {
    switch (currentPhase) {
      case PHASES.MEANINGS:
        return (
          <SessionPhaseMeanings 
            meaning={session.meanings[currentIndex]} 
            onPlayAudio={() => playAudio(session.meanings[currentIndex]?.audioUrl)} 
          />
        );
      case PHASES.QUIZZES:
        return (
          <SessionPhaseQuizzes 
            quiz={session.quizzes[currentIndex]?.quiz} 
            onAnswer={onQuizAnswer} 
            initialAnswerStatus={session.quizzes[currentIndex]?.isCorrect}
            onTabChange={handleTabChange}
          />
        );
      case PHASES.WRITING:
        return (
          <SessionPhaseWriting 
            writingPrompt={session.writingPrompts[currentIndex]}
            onAnswer={onWritingAnswer} 
            onFinish={completeSession}
          />
        );
      case PHASES.RESULT:
        return <SessionResult totalXP={totalXP} levelUpData={levelUpData} onFinish={() => navigation.navigate("Home")} onClose={() => navigation.goBack()} />;
      default:
        return null;
    }
  };

  // Loading and null checks are handled above

  const hasStartedQuizzes = session ? session.quizzes.some(q => q.isCorrect !== null) : false;

  if (currentPhase === PHASES.RESULT) {
    return renderContent();
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#4a0d0d", "#6b1a1a", "#7e2222"]} style={styles.headerBackground}>
        <View style={styles.headerDecorativeCircle} />

        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          {renderProgressBar()}
          <Text style={styles.progressText}>
            {currentPhase === PHASES.MEANINGS ? currentIndex + 1 : (currentPhase === PHASES.QUIZZES ? currentIndex + 1 : 1)} / 
            {currentPhase === PHASES.MEANINGS ? session.meanings.length : (currentPhase === PHASES.QUIZZES ? session.quizzes.length : 1)}
          </Text>
        </View>

        <View style={styles.phaseBadge}>
          <Icon name="book-open-variant" size={16} color="#fff" style={{marginRight: 6}} />
          <Text style={styles.phaseBadgeText}>
              {currentPhase === PHASES.MEANINGS ? "Học từ vựng" : (currentPhase === PHASES.QUIZZES ? "Thực hành bài tập" : "Luyện kỹ năng viết")}
          </Text>
        </View>
      </LinearGradient>

      {renderContent()}

      {/* Floating XP Animation */}
      {showXPAnimation && (
        <Animated.View
          style={{
            position: "absolute",
            top: "40%",
            alignSelf: "center",
            transform: [{ translateY: xpAnimY }],
            opacity: xpAnimOpacity,
            zIndex: 1000,
          }}
        >
          <Text style={{ 
            fontSize: 48, 
            fontWeight: "900", 
            color: "#FFD700", 
            textShadowColor: 'rgba(0, 0, 0, 0.5)', 
            textShadowOffset: { width: 0, height: 4 }, 
            textShadowRadius: 10 
          }}>
            +{awardedXP} XP
          </Text>
        </Animated.View>
      )}

      {currentPhase !== PHASES.RESULT && (
        <View style={styles.footerContainer}>
          {currentPhase === PHASES.MEANINGS && hasStartedQuizzes && (
            <TouchableOpacity style={styles.quitButton} onPress={handleJumpToQuizzes}>
              <Icon name="bullseye-arrow" size={20} color="#e53935" />
              <Text style={styles.quitButtonText}>Quay lại bài tập</Text>
            </TouchableOpacity>
          )}

          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.buttonSecondary, currentPhase === PHASES.MEANINGS && currentIndex === 0 && { opacity: 0.5 }]} 
              onPress={handleBack}
              disabled={currentPhase === PHASES.MEANINGS && currentIndex === 0}
            >
              <Icon name="arrow-left" size={20} color="#666" style={{marginRight: 8}} />
              <Text style={styles.buttonTextSecondary}>Trước</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.buttonPrimary, 
                (currentPhase === PHASES.QUIZZES && !isAnswered && session.quizzes[currentIndex]?.isCorrect === null) && { opacity: 0.5 }
              ]} 
              onPress={handleNext}
              disabled={currentPhase === PHASES.QUIZZES && !isAnswered && session.quizzes[currentIndex]?.isCorrect === null}
            >
              <Text style={styles.buttonTextPrimary}>Tiếp theo</Text>
              <Icon name="arrow-right" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DailySession;
