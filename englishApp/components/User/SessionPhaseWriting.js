import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../../styles/SessionStyles";

const SessionPhaseWriting = ({ writingPrompt, onAnswer, onFinish }) => {
  const [text, setText] = useState(writingPrompt?.userResponse || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResult, setAiResult] = useState(writingPrompt?.completed ? {
    score: writingPrompt.score,
    improved_sentence: writingPrompt.improvedSentence,
    target_keywords: writingPrompt.meanings?.map(m => ({
        keyword: m.word,
        correct_usage: true,
        reason: "Từ khóa đã được sử dụng chính xác trong câu của bạn."
    }))
  } : null);

  if (!writingPrompt) return null;

  const handleSubmit = async () => {
    if (!text.trim() || isSubmitting || aiResult) return;
    
    setIsSubmitting(true);
    const result = await onAnswer(text.trim());
    setIsSubmitting(false);
    
    if (result) {
      setAiResult(result);
    }
  };

  return (
    <View style={styles.card}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.writingPrompt}>{writingPrompt.question || "Hãy luyện tập viết với các từ vựng sau"}</Text>
        
        <View style={styles.keywordSection}>
          <Text style={styles.keywordTitle}>Các từ cần sử dụng:</Text>
          <View style={styles.keywordChips}>
            {writingPrompt.meanings?.map((m) => (
              <View key={m.id} style={styles.keywordChip}>
                <Text style={styles.keywordChipText}>{m.word}</Text>
              </View>
            ))}
          </View>
        </View>

        <TextInput
          style={[styles.writingInput, aiResult && { backgroundColor: '#f5f5f5', color: '#666' }]}
          placeholder="Nhập câu trả lời của bạn tại đây..."
          multiline
          value={text}
          onChangeText={setText}
          editable={!isSubmitting && !aiResult}
        />
        
        {!aiResult && (
          <TouchableOpacity 
            style={[styles.buttonPrimary, { width: "100%", flex: 0 }, (!text.trim() || isSubmitting) && { opacity: 0.5 }]}
            onPress={handleSubmit}
            disabled={!text.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.buttonTextPrimary}>GỬI BÀI VIẾT PHÂN TÍCH</Text>
                <Icon name="brain" size={20} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        )}

        {aiResult && (
          <View style={styles.feedbackContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
              <Text style={styles.feedbackTitle}>Phân tích từ AI</Text>
              {aiResult.processing_time && (
                <Text style={{ fontSize: 11, color: '#999' }}>{aiResult.processing_time}s</Text>
              )}
            </View>
            
            <View style={styles.scoreRow}>
              <Text style={styles.scoreValue}>{aiResult.score}/10</Text>
              <Text style={styles.scoreLabel}>Điểm đánh giá</Text>
            </View>

            <View style={styles.improvedBox}>
              <Text style={styles.improvedTitle}>Câu văn gợi ý tốt hơn:</Text>
              <Text style={styles.improvedText}>{aiResult.improved_sentence}</Text>
            </View>

            <Text style={[styles.keywordTitle, { marginTop: 10, marginBottom: 15 }]}>Phân tích từ khóa:</Text>
            {aiResult.target_keywords?.map((kw, idx) => (
              <View key={idx} style={styles.keywordAnalysisItem}>
                <Icon 
                   name={kw.correct_usage ? "check-circle" : "close-circle"} 
                   size={24} 
                   color={kw.correct_usage ? "#10b981" : "#ef4444"} 
                />
                <View style={styles.analysisContent}>
                  <Text style={[styles.analysisWord, { color: kw.correct_usage ? "#059669" : "#dc2626" }]}>
                    {kw.keyword}
                  </Text>
                  <Text style={styles.analysisReason}>{kw.reason}</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity 
              style={[styles.buttonPrimary, { width: "100%", flex: 0, marginTop: 30, backgroundColor: "#e53935" }]}
              onPress={onFinish}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.buttonTextPrimary}>QUAY LẠI BÀI HỌC</Text>
                <Icon name="arrow-right-circle" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SessionPhaseWriting;
