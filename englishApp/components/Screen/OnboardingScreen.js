import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/OnboardingStyles";

const OnboardingScreen = ({
    currentStep,
    formData,
    onSelectOption,
    onNext,
    onFinish,
    loading,
}) => {
    const steps = [
        { id: 0, title: "Welcome" },
        { id: 1, title: "Goal" },
        { id: 2, title: "Level" },
        { id: 3, title: "Target" },
        { id: 4, title: "Success" },
    ];

    const goals = [
        { label: "Giao tiếp hàng ngày", value: "DAILY_COMMUNICATION", icon: "chatbubbles-outline" },
        { label: "Tiếng Anh công việc", value: "BUSINESS_ENGLISH", icon: "briefcase-outline" },
        { label: "Ôn thi (IELTS, TOEIC...)", value: "EXAM_PREPARATION", icon: "school-outline" },
        { label: "Mở rộng vốn từ", value: "VOCABULARY_EXPANSION", icon: "book-outline" },
        { label: "Du lịch & Khám phá", value: "TRAVEL", icon: "airplane-outline" },
    ];

    const levels = [
        { label: "Mới bắt đầu (A1)", value: "A1", desc: "Chưa biết gì hoặc biết rất ít" },
        { label: "Cơ bản (A2)", value: "A2", desc: "Giao tiếp được những câu đơn giản" },
        { label: "Trung cấp (B1)", value: "B1", desc: "Có thể thảo luận các chủ đề quen thuộc" },
    ];

    const targets = [
        { label: "5 phút / ngày", value: 5, icon: "cafe-outline" },
        { label: "15 phút / ngày", value: 15, icon: "flash-outline" },
        { label: "30 phút / ngày", value: 30, icon: "rocket-outline" },
    ];

    const renderProgress = () => (
        <View style={styles.dotsContainer}>
            {steps.map((s) => (
                <View
                    key={s.id}
                    style={[styles.dot, currentStep === s.id && styles.activeDot]}
                />
            ))}
        </View>
    );

    const renderWelcome = () => (
        <View style={styles.content}>
            <View style={styles.successIcon}>
                <Ionicons name="sparkles" size={50} color="#10b981" />
            </View>
            <Text style={styles.title}>🎉 Chào mừng bạn đến với English Learning App!</Text>
            <Text style={styles.description}>
                Chúng tôi sẽ giúp bạn cá nhân hóa lộ trình học phù hợp nhất với bạn.{"\n"}
                Chỉ mất 1 phút để bắt đầu 🚀
            </Text>
        </View>
    );

    const renderGoal = () => (
        <View style={styles.content}>
            <Text style={styles.title}>🎯 Mục tiêu học tiếng Anh của bạn là gì?</Text>
            <Text style={styles.description}>Chọn mục tiêu chính để chúng tôi gợi ý nội dung phù hợp.</Text>
            <View style={styles.optionsContainer}>
                {goals.map((g) => (
                    <TouchableOpacity
                        key={g.value}
                        style={[styles.optionBtn, formData.goal === g.value && styles.selectedOptionBtn]}
                        onPress={() => onSelectOption("goal", g.value)}
                    >
                        <Ionicons
                            name={g.icon}
                            size={24}
                            color={formData.goal === g.value ? "#6366f1" : "#64748b"}
                            style={styles.optionIcon}
                        />
                        <Text style={[styles.optionText, formData.goal === g.value && styles.selectedOptionText]}>
                            {g.label}
                        </Text>
                        {formData.goal === g.value && <Ionicons name="checkmark-circle" size={24} color="#6366f1" />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderLevel = () => (
        <View style={styles.content}>
            <Text style={styles.title}>📊 Bạn đang ở trình độ nào?</Text>
            <Text style={styles.description}>Đừng lo, bạn có thể thay đổi trình độ này sau.</Text>
            <View style={styles.optionsContainer}>
                {levels.map((l) => (
                    <TouchableOpacity
                        key={l.value}
                        style={[styles.optionBtn, formData.level === l.value && styles.selectedOptionBtn]}
                        onPress={() => onSelectOption("level", l.value)}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.optionText, formData.level === l.value && styles.selectedOptionText]}>
                                {l.label}
                            </Text>
                            <Text style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>{l.desc}</Text>
                        </View>
                        {formData.level === l.value && <Ionicons name="checkmark-circle" size={24} color="#6366f1" />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderTarget = () => (
        <View style={styles.content}>
            <Text style={styles.title}>⏱ Bạn có thể dành bao nhiêu phút mỗi ngày?</Text>
            <Text style={styles.description}>Học tập đều đặn giúp bạn tiến bộ nhanh hơn.</Text>
            <View style={styles.optionsContainer}>
                {targets.map((t) => (
                    <TouchableOpacity
                        key={t.value}
                        style={[styles.optionBtn, formData.dailyTarget === t.value && styles.selectedOptionBtn]}
                        onPress={() => onSelectOption("dailyTarget", t.value)}
                    >
                        <Ionicons
                            name={t.icon}
                            size={24}
                            color={formData.dailyTarget === t.value ? "#6366f1" : "#64748b"}
                            style={styles.optionIcon}
                        />
                        <Text style={[styles.optionText, formData.dailyTarget === t.value && styles.selectedOptionText]}>
                            {t.label}
                        </Text>
                        {formData.dailyTarget === t.value && <Ionicons name="checkmark-circle" size={24} color="#6366f1" />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderSuccess = () => (
        <View style={styles.content}>
            <View style={styles.successIcon}>
                <Ionicons name="rocket-outline" size={50} color="#6366f1" />
            </View>
            <Text style={styles.title}>🎉 Tuyệt vời!</Text>
            <Text style={styles.description}>
                Chúng tôi đã sẵn sàng xây dựng lộ trình học dành riêng cho bạn.{"\n"}
                Hãy bắt đầu hành trình chinh phục tiếng Anh ngay hôm nay!
            </Text>
        </View>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: return renderWelcome();
            case 1: return renderGoal();
            case 2: return renderLevel();
            case 3: return renderTarget();
            case 4: return renderSuccess();
            default: return null;
        }
    };

    const isNextDisabled = () => {
        if (currentStep === 1) return !formData.goal;
        if (currentStep === 2) return !formData.level;
        if (currentStep === 3) return !formData.dailyTarget;
        return false;
    };

    return (
        <SafeAreaView style={styles.container}>
            {renderStepContent()}

            <View style={styles.footer}>
                {renderProgress()}

                <TouchableOpacity
                    style={[styles.primaryBtn, (isNextDisabled() || loading) && styles.disabledBtn]}
                    onPress={currentStep === 4 ? onFinish : onNext}
                    disabled={isNextDisabled() || loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.primaryBtnText}>
                            {currentStep === 0 ? "Bắt đầu" : currentStep === 4 ? "Bắt đầu học" : "Tiếp tục"}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default OnboardingScreen;
