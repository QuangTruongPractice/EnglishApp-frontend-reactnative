import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import styles from "../../styles/SessionStyles";

const SessionPhaseWriting = ({ quiz, onAnswer }) => {
  const [text, setText] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  if (!quiz) return null;

  const handleSubmit = () => {
    if (!text.trim() || isAnswered) return;
    setIsAnswered(true);
    onAnswer(text.trim());
  };

  return (
    <View style={styles.card}>
      <ScrollView contentContainerStyle={styles.cardContent}>
        <Text style={styles.writingPrompt}>{quiz.question || "Hãy viết một câu sử dụng từ vựng đã học hôm nay!"}</Text>
        <TextInput
          style={styles.writingInput}
          placeholder="Nhập câu trả lời của bạn tại đây..."
          multiline
          numberOfLines={6}
          value={text}
          onChangeText={setText}
          editable={!isAnswered}
        />
        
        <TouchableOpacity 
          style={[styles.buttonPrimary, { marginTop: 20, width: "100%", flex: 0 }, (!text.trim() || isAnswered) && { opacity: 0.5 }]}
          onPress={handleSubmit}
          disabled={!text.trim() || isAnswered}
        >
          <Text style={styles.buttonTextPrimary}>{isAnswered ? "ĐÃ GỬI" : "GỬI BÀI VIẾT"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SessionPhaseWriting;
