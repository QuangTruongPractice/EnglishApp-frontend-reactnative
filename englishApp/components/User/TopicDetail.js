import { useQuery } from "@tanstack/react-query";
import TopicDetailScreen from "../Screen/TopicDetailScreen";
import { fetchMainTopicsDetail } from "../../configs/LoadData";
import { useNavigation } from "@react-navigation/native";

const TopicDetail = ({ route }) => {
  const { topicId } = route.params;
  const nav = useNavigation();

  const { data, isLoading: loading, error, refetch: loadTopicDetails, isRefetching: refreshing } = useQuery({
    queryKey: ['mainTopicDetail', topicId],
    queryFn: () => fetchMainTopicsDetail(topicId),
    enabled: !!topicId,
  });

  const handleGoBack = () => {
    nav.goBack();
  };

  const onRefresh = () => {
    loadTopicDetails();
  };

  const topicInfo = data?.result ? {
    id: data.result.id,
    name: data.result.name,
    image: data.result.image,
    subTopicsCount: data.result.subTopicsCount,
    createdAt: data.result.createdAt,
    user_progress: data.result.user_progress || data.result.userProgress,
  } : null;

  const subTopics = data?.result?.subTopics || [];
  const errorMessage = error ? "Failed to load topic details. Please try again." : null;

  return (
    <TopicDetailScreen
      loading={loading}
      error={errorMessage}
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
