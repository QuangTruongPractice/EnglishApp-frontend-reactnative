import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../styles/SessionStyles";

const SessionPhaseMeanings = ({ meaning, onPlayAudio, hasStartedQuizzes, onJumpToQuizzes }) => {
  if (!meaning) return null;

  const renderHighlightedExample = (text, highlight) => {
    if (!highlight) return <Text style={styles.exampleEn}>{text}</Text>;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text style={styles.exampleEn}>
        {parts.map((part, i) => (
          <Text key={i} style={part.toLowerCase() === highlight.toLowerCase() ? styles.highlight : null}>
            {part}
          </Text>
        ))}
      </Text>
    );
  };

  return (
    <View style={styles.card}>
      {hasStartedQuizzes && (
        <TouchableOpacity 
          style={{
            backgroundColor: "#F45B69",
            paddingVertical: 10,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
          onPress={onJumpToQuizzes}
        >
          <Text style={{color: "#fff", fontWeight: "700", fontSize: 14}}>Đang làm dở bài tập. Tiếp tục ngay!</Text>
          <Icon name="arrow-right-circle" size={20} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: meaning.images?.[0]?.imageUrl || "https://res.cloudinary.com/dabb0yavq/image/upload/v1743581561/vocabulary_placeholder_j6qjq9.png" }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.4)"]}
          style={styles.imageOverlay}
        />
        
        <TouchableOpacity style={styles.audioButtonOverlay} onPress={onPlayAudio}>
          <Icon name="volume-high" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.cardContent} showsVerticalScrollIndicator={false}>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{meaning.level} - {meaning.type}</Text>
        </View>

        <Text style={styles.wordTitle}>{meaning.word}</Text>
        <Text style={styles.phonetic}>{meaning.phonetic}</Text>

        <View style={styles.definitionContainer}>
          <Text style={styles.definitionEn}>{meaning.definition}</Text>
          <Text style={styles.definitionVn}>VN: {meaning.vnDefinition}</Text>
        </View>

        <View style={styles.exampleContainer}>
          {renderHighlightedExample(meaning.example, meaning.word)}
          <Text style={styles.exampleVn}>vn: {meaning.vnExample}</Text>
        </View>

        {meaning.synonyms && meaning.synonyms.length > 0 && (
          <View style={styles.synonymSection}>
            <Text style={styles.synonymTitle}>Từ đồng nghĩa</Text>
            <View style={styles.synonymContainer}>
              {meaning.synonyms.map((syn, index) => (
                <View key={index} style={styles.synonymChip}>
                  <Text style={styles.synonymText}>{syn}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SessionPhaseMeanings;
