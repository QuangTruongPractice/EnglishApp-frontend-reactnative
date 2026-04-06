import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../styles/SessionStyles";

const SessionPhaseMeanings = ({ meaning, onPlayAudio }) => {
  if (!meaning) return null;

  // Helper to get image URI from various possible structures
  const getImageUri = () => {
    if (!meaning.images || meaning.images.length === 0) return null;
    const firstImage = meaning.images[0];
    if (typeof firstImage === 'string') return firstImage;
    if (typeof firstImage === 'object' && firstImage.imageUrl) return firstImage.imageUrl;
    return null;
  };

  const imageUri = getImageUri();

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
      {imageUri ? (
        <View style={styles.cardImageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.6)"]}
            style={styles.imageOverlay}
          />
          
          <TouchableOpacity style={styles.audioButtonOverlay} onPress={onPlayAudio}>
            <Icon name="volume-high" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noImageTopBar}>
           <LinearGradient
            colors={["#9B2C2C", "#F45B69"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.noImageGradient}
          />
           <View style={styles.typeBadgeGray}>
             <Text style={styles.typeTextGray}>{meaning.level} - {meaning.type}</Text>
           </View>
           <TouchableOpacity style={styles.audioButtonSolid} onPress={onPlayAudio}>
              <Icon name="volume-high" size={24} color="#fff" />
           </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.cardContent} showsVerticalScrollIndicator={false}>
        {imageUri ? (
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{meaning.level} - {meaning.type}</Text>
          </View>
        ) : null}

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.wordTitle}>{meaning.word}</Text>
          <Text style={styles.phonetic}>{meaning.phonetic}</Text>
        </View>

        <View style={styles.definitionContainer}>
          <Text style={styles.definitionEn}>{meaning.definition}</Text>
          {meaning.vnDefinition && (
            <Text style={styles.definitionVn}>VN: {meaning.vnDefinition}</Text>
          )}
        </View>

        <View style={styles.exampleContainer}>
          {renderHighlightedExample(meaning.example, meaning.word)}
          {meaning.vnExample && (
            <Text style={styles.exampleVn}>vn: {meaning.vnExample}</Text>
          )}
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
