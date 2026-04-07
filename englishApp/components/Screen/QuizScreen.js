import React from "react";
import { FlatList, View, RefreshControl, TouchableOpacity, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../../styles/QuizStyles";

const QuizScreen = ({
  quizList,
  totalCount,
  loading,
  error,
  refreshing,
  onRefresh,
  loadMore,
}) => {
  const nav = useNavigation();

  const handleQuizPress = (quizId) => {
    nav.navigate("QuizDetail", { quizId });
  };

  const getBadgeConfig = (type) => {
    switch (type) {
      case 'MC': return { label: 'Trắc nghiệm', icon: 'bullseye-arrow', style: styles.badgeMC, text: styles.textMC };
      case 'AUDIO': return { label: 'Âm thanh', icon: 'volume-high', style: styles.badgeAUDIO, text: styles.textAUDIO };
      case 'FILL': return { label: 'Điền từ', icon: 'pencil', style: styles.badgeFILL, text: styles.textFILL };
      case 'MATCH': return { label: 'Ghép đôi', icon: 'link-variant', style: styles.badgeMATCH, text: styles.textMATCH };
      case 'TEXT': return { label: 'Văn bản', icon: 'text-box-outline', style: styles.badgeTEXT, text: styles.textTEXT };
      default: return { label: 'Câu hỏi', icon: 'help-circle-outline', style: styles.badgeTEXT, text: styles.textTEXT };
    }
  };

  const renderQuizCard = (quiz) => {
    const badge = getBadgeConfig(quiz.type);
    return (
      <TouchableOpacity 
        key={quiz.id} 
        style={styles.quizCard} 
        onPress={() => handleQuizPress(quiz.id)}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.typeBadge, badge.style]}>
            <Icon name={badge.icon} size={14} color={badge.text.color} />
            <Text style={[styles.typeText, badge.text]}>{badge.label}</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#ccc" />
        </View>

        <Text style={styles.questionTitle} numberOfLines={2}>{quiz.question || "Không có tiêu đề"}</Text>

        <View style={styles.cardFooter}>
          <View style={styles.answerInfo}>
            <Icon name="layers-outline" size={16} color="#999" />
            <Text style={styles.answerText}>{quiz.answers?.length || 4} lựa chọn</Text>
          </View>
          <View style={styles.startButton}>
            <Text style={styles.startButtonText}>Bắt đầu</Text>
            <Icon name="play-circle" size={16} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View>
      <LinearGradient colors={["#4a0d0d", "#6b1a1a", "#7e2222"]} style={styles.headerBackground}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Thử thách Quiz</Text>
            <Text style={styles.headerSubtitle}>Củng cố kiến thức mỗi ngày</Text>
          </View>
          <Icon name="trophy-variant" size={32} color="rgba(255,255,255,0.3)" />
        </View>
      </LinearGradient>
      
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalCount}</Text>
          <Text style={styles.statLabel}>Tổng số</Text>
        </View>
        <View style={[styles.statItem, styles.statItemLast]}>
          <Text style={styles.statValue}>{quizList.length}</Text>
          <Text style={styles.statLabel}>Đã tải</Text>
        </View>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!loading || refreshing) return <View style={{ height: 20 }} />;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#9B2C2C" />
        <Text style={styles.loadingText}>Đang tải thêm...</Text>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="text-box-search-outline" size={64} color="#ddd" />
      <Text style={styles.emptyTitle}>Chưa có thử thách nào</Text>
      <Text style={styles.emptySubtitle}>Danh sách câu hỏi đang được cập nhật, quay lại sau nhé!</Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <Icon name="alert-circle-outline" size={64} color="#ef4444" />
      <Text style={styles.errorTitle}>Có lỗi xảy ra</Text>
      <Text style={styles.errorMessage}>{error}</Text>
      <TouchableOpacity onPress={onRefresh} style={styles.retryButton}>
        <Text style={styles.retryButtonText}>Thử lại</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={quizList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderQuizCard(item)}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={!loading && renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" colors={["#9B2C2C"]} />
        }
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.3}
        onEndReached={loadMore}
        contentContainerStyle={styles.scrollContent}
      />
      {error && quizList.length === 0 && renderErrorState()}
    </SafeAreaView>
  );
};

export default QuizScreen;
