import { useState, useEffect } from "react";
import TopicDetailScreen from "../Screen/TopicDetailScreen";
import { fetchMainTopicsDetail } from "../../configs/LoadData";
import { useNavigation } from "@react-navigation/native";

const TopicDetail = ({ route }) => {
  const { topicId } = route.params;
  const [subTopics, setSubTopics] = useState([]);
  const [topicInfo, setTopicInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const nav = useNavigation();

  const loadTopicDetails = async () => {
    try {
      if (!refreshing) setLoading(true);
      const response = await fetchMainTopicsDetail(topicId);
      const data = response.result;

      setTopicInfo({
        id: data.id,
        name: data.name,
        image: data.image,
        subTopicsCount: data.subTopicsCount,
        createdAt: data.createdAt,
      });
      setSubTopics(data.subTopics || []);
      setError(null);
    } catch (ex) {
      console.error(ex);
      setError("Failed to load topic details. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleGoBack = () => {
    nav.goBack();
  };

  useEffect(() => {
    if (topicId) {
      loadTopicDetails();
    }
  }, [topicId]);

  const onRefresh = () => {
    setRefreshing(true);
    setError(null);
    loadTopicDetails();
  };

  return (
    <TopicDetailScreen
      loading={loading}
      error={error}
      topicInfo={topicInfo}
      subTopics={subTopics}
      refreshing={refreshing}
      onRefresh={onRefresh}
      reload={loadTopicDetails}
      onGoBack={handleGoBack}
    />
  );
};

export default TopicDetail;
