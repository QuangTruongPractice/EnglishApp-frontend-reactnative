import React, { useState, useContext } from "react";
import OnboardingScreen from "../Screen/OnboardingScreen";
import PlacementTest from "./PlacementTest";
import { createLearningProfile, generatePlacementTest, submitPlacementTest } from "../../configs/LoadData";
import { MyDispatchContext } from "../../configs/Context";
import Toast from "react-native-toast-message";

const Onboarding = ({ route }) => {
    const { userData } = route.params;
    const dispatch = useContext(MyDispatchContext);

    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isPlacementTestMode, setIsPlacementTestMode] = useState(false);
    const [placementQuestions, setPlacementQuestions] = useState([]);
    const [formData, setFormData] = useState({
        goal: "",
        level: "",
        dailyTarget: 15, // Default to 15 mins
    });

    const handleSelectOption = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const nextStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const handleFinishOnboarding = async () => {
        try {
            setLoading(true);
            const response = await createLearningProfile(formData);

            if (response && response.code === 1000) {
                // Now fetch placement test questions
                const placementRes = await generatePlacementTest();
                if (placementRes && placementRes.result) {
                    setPlacementQuestions(placementRes.result.questions);
                    setIsPlacementTestMode(true);
                    
                    Toast.show({
                        type: "success",
                        text1: "Hồ sơ đã được tạo!",
                        text2: "Hãy làm một bài kiểm tra nhỏ để xác định trình độ nhé 🚀",
                    });
                } else {
                    // Fallback: if placement test generation fails, just log in
                    dispatch({ type: "login", payload: userData });
                }
            } else {
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: response.message || "Không thể tạo hồ sơ học tập.",
                });
            }
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Lỗi kết nối",
                text2: "Đã có lỗi xảy ra khi khởi tạo hồ sơ.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePlacementFinish = async (results) => {
        try {
            setLoading(true);
            const payload = {
                wordResults: results
            };

            const response = await submitPlacementTest(payload);

            if (response && response.code === 1000) {
                Toast.show({
                    type: "success",
                    text1: "Hoàn tất!",
                    text2: "Lộ trình học của bạn đã sẵn sàng 🎯",
                });
                
                // Finally log the user in
                dispatch({ type: "login", payload: userData });
            } else {
                // If submission fails, still try to log in but show error
                Toast.show({
                    type: "error",
                    text1: "Lỗi lưu kết quả",
                    text2: "Vẫn có thể bắt đầu học, kết quả kiểm tra có thể chưa được lưu.",
                });
                dispatch({ type: "login", payload: userData });
            }
        } catch (err) {
            console.error("Placement submit error:", err);
            dispatch({ type: "login", payload: userData });
        } finally {
            setLoading(false);
        }
    };

    if (isPlacementTestMode) {
        return (
            <PlacementTest
                questions={placementQuestions}
                onFinish={handlePlacementFinish}
                loading={loading}
            />
        );
    }

    return (
        <OnboardingScreen
            currentStep={currentStep}
            formData={formData}
            onSelectOption={handleSelectOption}
            onNext={nextStep}
            onFinish={handleFinishOnboarding}
            loading={loading}
        />
    );
};

export default Onboarding;
