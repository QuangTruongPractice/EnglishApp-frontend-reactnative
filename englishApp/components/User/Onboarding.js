import React, { useState, useContext } from "react";
import OnboardingScreen from "../Screen/OnboardingScreen";
import { createLearningProfile } from "../../configs/LoadData";
import { MyDispatchContext } from "../../configs/Context";
import Toast from "react-native-toast-message";

const Onboarding = ({ route }) => {
    const { userData } = route.params;
    const dispatch = useContext(MyDispatchContext);

    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
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

    const handleFinish = async () => {
        try {
            setLoading(true);
            // Data structure: { goal: "...", level: "...", dailyTarget: 20 }
            const response = await createLearningProfile(formData);

            if (response && response.code === 1000) {
                Toast.show({
                    type: "success",
                    text1: "Thành công!",
                    text2: "Hồ sơ học tập của bạn đã được khởi tạo 🚀",
                });

                // Officially log the user in
                dispatch({ type: "login", payload: userData });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: response.message || "Không thể tạo hồ sơ học tập.",
                });
            }
        } catch (err) {
            // console.error("Onboarding error:", err);
            Toast.show({
                type: "error",
                text1: "Lỗi kết nối",
                text2: "Đã có lỗi xảy ra. Vui lòng thử lại.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <OnboardingScreen
            currentStep={currentStep}
            formData={formData}
            onSelectOption={handleSelectOption}
            onNext={nextStep}
            onFinish={handleFinish}
            loading={loading}
        />
    );
};

export default Onboarding;
