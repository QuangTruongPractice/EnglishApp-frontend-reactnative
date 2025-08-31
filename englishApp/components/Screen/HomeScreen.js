import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { Card, Button, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../layout/Loading";
import styles from "../../styles/HomeStyles";

const HomeScreen = ({
  mainTopics,
  q,
  setQ,
  search,
  loadMore,
  refreshing,
  onRefresh,
  loading,
  page,
  nav,
  error,
  retry,
}) => {
  const renderTopicItem = ({ item }) => (
    <Card style={styles.card} elevation={3}>
      <TouchableOpacity
        onPress={() => nav.navigate("TopicDetail", { topicId: item.id })}
        activeOpacity={0.7}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Card.Content style={styles.cardContent}>
          <Text variant="titleLarge" style={styles.title}>
            {item.name}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {item.subTopicsCount || 0} subtopics
          </Text>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );

  if (loading && page === 1) {
    return (
      <View style={styles.centerContainer}>
        <Loading />
        <Text style={styles.loadingText}>Loading topics...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button
          mode="contained"
          onPress={retry}
          buttonColor="#f45b69"
          style={styles.retryButton}
        >
          Retry
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Tìm Topics..."
          onChangeText={(t) => search(t, setQ)}
          value={q}
          style={styles.searchBar}
        />

        {mainTopics.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No topics available</Text>
          </View>
        ) : (
          <FlatList
            data={mainTopics}
            renderItem={renderTopicItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2}
            onEndReached={loadMore}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#f45b69"]}
              />
            }
            ListFooterComponent={loading && page > 1 ? <Loading /> : null}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;