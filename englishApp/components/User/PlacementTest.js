import React, { useState, useEffect, useRef } from "react";
import PlacementTestScreen from "../Screen/PlacementTestScreen";

const PlacementTest = ({ questions, onFinish, loading: submitLoading }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    
    // For response time tracking
    const startTimeRef = useRef(Date.now());
    const timerRef = useRef(null);

    // Global Timer
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    // Handle Timeout
    useEffect(() => {
        if (timeLeft === 0 && !showFeedback) {
            clearInterval(timerRef.current);
            handleTimeOut();
        }
    }, [timeLeft]);

    const handleTimeOut = () => {
        // Find all remaining questions and mark as incorrect
        const remainingResults = [...results];
        for (let i = currentIndex; i < questions.length; i++) {
            remainingResults.push({
                meaningId: questions[i].meaningId,
                isCorrect: false,
                responseTimeMs: 0
            });
        }
        onFinish(remainingResults);
    };

    const handleAnswerPress = (answer) => {
        if (showFeedback) return;

        const endTime = Date.now();
        const responseTimeMs = endTime - startTimeRef.current;
        const isCorrect = answer.isCorrect;

        setSelectedAnswerId(answer.id);
        setShowFeedback(true);

        const newResult = {
            meaningId: questions[currentIndex].meaningId,
            isCorrect: isCorrect,
            responseTimeMs: responseTimeMs
        };

        const updatedResults = [...results, newResult];
        setResults(updatedResults);

        // Wait 1s for immediate feedback then move to next
        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedAnswerId(null);
                setShowFeedback(false);
                startTimeRef.current = Date.now();
            } else {
                clearInterval(timerRef.current);
                onFinish(updatedResults);
            }
        }, 1000);
    };

    const currentQuestion = questions[currentIndex]?.quiz;

    return (
        <PlacementTestScreen
            currentQuestion={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={questions?.length || 0}
            timeLeft={timeLeft}
            selectedAnswerId={selectedAnswerId}
            showFeedback={showFeedback}
            submitLoading={submitLoading}
            handleAnswerPress={handleAnswerPress}
        />
    );
};

export default PlacementTest;
