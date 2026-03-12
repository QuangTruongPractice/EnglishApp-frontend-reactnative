import React from "react";
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton, ActivityIndicator } from "react-native-paper";
import { styles as progressStyles } from "../../styles/ProgressStyles";
import styles from "../../styles/SaveVocabularyStyles";

const SaveVocabularyScreen = ({ onBack, savedVocabs, loading, refreshing, onRefresh, error, onToggleSave, nav }) => {
    const VocabularyCard = ({ data }) => (
        <TouchableOpacity
            onPress={() => nav.navigate("VocabularyDetail", { vocabularyId: data.id })}
            activeOpacity={0.7}
            style={progressStyles.vocaCard}
        >
            <TouchableOpacity
                style={progressStyles.vocaIconContainer}
                onPress={() => onToggleSave(data.id)}
            >
                <IconButton
                    icon={data.isSave ? "bookmark" : "bookmark-outline"}
                    iconColor={data.isSave ? "#6366f1" : "#ccc"}
                    size={24}
                    style={{ margin: 0 }}
                />
            </TouchableOpacity>

            <View style={progressStyles.vocaInfoContainer}>
                <View style={progressStyles.vocaMainLine}>
                    <Text style={progressStyles.vocaWord}>{data.word}</Text>
                    {data.phonetic && (
                        <Text style={progressStyles.vocaPhonetic}>{data.phonetic}</Text>
                    )}
                    {data.level && (
                        <View style={progressStyles.vocaLevelBadge}>
                            <Text style={progressStyles.vocaLevelText}>{data.level}</Text>
                        </View>
                    )}
                </View>
                <View style={progressStyles.vocaSecondLine}>
                    {data.subTopics && data.subTopics.length > 0 && (
                        <Text style={progressStyles.vocaType}>
                            {data.subTopics.map((t) => t.name).join(", ")}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    size={24}
                    onPress={onBack}
                />
                <Text style={styles.headerTitle}>Từ vựng đã lưu</Text>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {loading && !refreshing ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : savedVocabs.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <IconButton icon="bookmark-outline" size={80} iconColor="#ccc" />
                        <Text style={styles.emptyText}>Chưa có từ vựng nào được lưu</Text>
                    </View>
                ) : (
                    savedVocabs.map((v) => <VocabularyCard key={v.id} data={v} />)
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SaveVocabularyScreen;
