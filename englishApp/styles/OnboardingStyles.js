import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#1a1a1a",
        textAlign: "center",
        marginBottom: 16,
        lineHeight: 36,
    },
    description: {
        fontSize: 16,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 40,
    },
    imageContainer: {
        width: 280,
        height: 280,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },

    // Options Styling
    optionsContainer: {
        width: "100%",
        gap: 12,
    },
    optionBtn: {
        width: "100%",
        padding: 18,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#f1f5f9",
        backgroundColor: "#f8fafc",
        flexDirection: "row",
        alignItems: "center",
    },
    selectedOptionBtn: {
        borderColor: "#6366f1",
        backgroundColor: "#f5f7ff",
    },
    optionText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#475569",
        flex: 1,
    },
    selectedOptionText: {
        color: "#6366f1",
    },
    optionIcon: {
        marginRight: 12,
    },

    // Navigation Buttons
    footer: {
        padding: 24,
        paddingBottom: 40,
    },
    primaryBtn: {
        backgroundColor: "#6366f1",
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    disabledBtn: {
        backgroundColor: "#cbd5e1",
        shadowOpacity: 0,
        elevation: 0,
    },
    primaryBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },

    // Progress Dots
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
        marginBottom: 30,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#e2e8f0",
    },
    activeDot: {
        width: 24,
        backgroundColor: "#6366f1",
    },

    // Specific Screens
    successIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#ecfdf5",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    }
});

export default styles;
