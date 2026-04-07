import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import VocabularyDetailScreen from "../Screen/VocabularyDetailScreen";
import { fetchDailyVocabulary, generateQuiz, saveMeaning, submitQuiz } from "../../configs/LoadData";
import { useNavigation } from "@react-navigation/native";
import { useQuery} from "@tanstack/react-query";
import Toast from "react-native-toast-message";

const DailyPractice = () => {
    const [vocabIndex, setVocabIndex] = useState(0);
    const [completedMeanings, setCompletedMeanings] = useState([]); // List of meaning IDs
    
    // Sử dụng useQuery thay vì manual fetch
    const { data: dailyData, isLoading: loading, refetch: loadDailyData } = useQuery({
        queryKey: ['dailyVocabulary'],
        queryFn: fetchDailyVocabulary
    });
    
    const vocabList = dailyData?.code === 1000 && dailyData?.result ? dailyData.result : [];

    // Quiz State
    const [showQuizModal, setShowQuizModal] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showQuizResult, setShowQuizResult] = useState(false);

    const [isFinished, setIsFinished] = useState(false);
    const [sound, setSound] = useState(null);
    const navigation = useNavigation();



    const handleStartQuiz = async (meanId) => {
        try {
            setQuizData(null);
            setSelectedAnswer(null);
            setShowQuizResult(false);
            setShowQuizModal(true);

            const res = await generateQuiz(meanId);
            if (res.code === 1000) {
                setQuizData(res.result);
            }
        } catch (err) {
            Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể tạo bài tập.' });
            setShowQuizModal(false);
        }
    };

    const checkAnswer = () => {
        if (!selectedAnswer || !quizData) return;
        const selectedAnsObj = quizData.answers.find(a => a.id === selectedAnswer);
        setShowQuizResult(true);
        playQuizSoundEffect(selectedAnsObj?.isCorrect);

        if (selectedAnsObj?.isCorrect) {
            // Mark meaning as done locally to unlock "Next Word"
            setCompletedMeanings(prev => {
                if (!prev.includes(matchingMeaningIdForCurrentQuiz.current)) {
                    return [...prev, matchingMeaningIdForCurrentQuiz.current];
                }
                return prev;
            });
            Toast.show({ type: 'success', text1: 'Chính xác! 🎉' });
        } else {
            Toast.show({ type: 'error', text1: 'Sai rồi! ❌', text2: 'Thử quan sát kỹ nhé.' });
        }

        // Gửi kết quả về server
        if (matchingMeaningIdForCurrentQuiz.current) {
            submitQuiz(matchingMeaningIdForCurrentQuiz.current, selectedAnsObj?.isCorrect).catch(() => {
            });
        }
    };

    // We need to keep track of the meaning ID for the current quiz
    const matchingMeaningIdForCurrentQuiz = useRef(null);
    const wrappedStartQuiz = (meanId) => {
        matchingMeaningIdForCurrentQuiz.current = meanId;
        handleStartQuiz(meanId);
    }

    const handleSaveMeaning = async (meanId) => {
        try {
            const res = await saveMeaning(meanId);
            if (res.code === 1000) {
                Toast.show({ type: 'success', text1: 'Thành công', text2: 'Đã lưu vào kho từ vựng!' });
            }
        } catch (e) {
            Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể lưu ý nghĩa này.' });
        }
    };

    const handleNextWord = () => {
        if (vocabIndex < vocabList.length - 1) {
            setVocabIndex(prev => prev + 1);
            setCompletedMeanings([]);
        } else {
            setIsFinished(true);
        }
    };

    const playVocabSound = async () => {
        const currentVocab = vocabList[vocabIndex];
        if (!currentVocab?.audioUrl) return;
        try {
            if (sound) await sound.unloadAsync();
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: currentVocab.audioUrl });
            setSound(newSound);
            await newSound.playAsync();
        } catch (e) {
          // Lỗi phát âm thanh từ vựng, bỏ qua
        }
    };

    const playQuizSoundEffect = async (isCorrect) => {
        try {
            const uri = isCorrect
                ? "https://www.myinstants.com/media/sounds/duolingo-correct.mp3"
                : "https://www.myinstants.com/media/sounds/duolingo-wrong.mp3";
            const { sound } = await Audio.Sound.createAsync({ uri });
            await sound.playAsync();
        } catch (e) {
          // Lỗi phát âm thanh hiệu ứng, bỏ qua
        }
    };

    const playQuestionAudio = async () => {
        if (!quizData?.text || quizData.type !== 'AUDIO') return;
        try {
            const { sound: audioQ } = await Audio.Sound.createAsync({ uri: quizData.text });
            await audioQ.playAsync();
        } catch (e) {
          // Lỗi phát âm thanh câu hỏi, bỏ qua
        }
    };

    const handleClose = () => {
        navigation.navigate("Home");
    };

    useEffect(() => {
        if (dailyData && (!dailyData.result || dailyData.result.length === 0)) {
            setIsFinished(true);
        }
    }, [dailyData]);

    useEffect(() => {
        return () => {
            if (sound) sound.unloadAsync();
        };
    }, [sound]);

    return (
        <VocabularyDetailScreen
            vocabulary={vocabList[vocabIndex]}
            loading={loading}
            onGoBack={handleClose}
            loadSound={playVocabSound}
            loadVocabulary={loadDailyData}
            onStartQuiz={wrappedStartQuiz}
            onSaveMeaning={handleSaveMeaning}

            // Quiz Props
            showQuizModal={showQuizModal}
            setShowQuizModal={setShowQuizModal}
            quizData={quizData}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showQuizResult={showQuizResult}
            checkAnswer={checkAnswer}
            quizSound={playQuestionAudio}

            // Practice Props
            isPractice={true}
            vocabIndex={vocabIndex}
            totalVocabs={vocabList.length}
            completedMeanings={completedMeanings}
            isFinished={isFinished}
            onNextWord={handleNextWord}
        />
    );
};

export default DailyPractice;
