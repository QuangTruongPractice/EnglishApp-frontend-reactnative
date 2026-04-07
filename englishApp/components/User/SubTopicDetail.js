import { useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SubTopicDetailScreen from "../Screen/SubTopicDetailScreen";
import { fetchSubTopicsDetail, toggleVocabularySave } from "../../configs/LoadData";
import Toast from "react-native-toast-message";

const SubTopicDetail = ({ route }) => {
  const { subTopicId } = route.params;
  const nav = useNavigation();
  const queryClient = useQueryClient();

  const { data, isLoading: loading, error, refetch: loadTopicDetails, isRefetching: refreshing } = useQuery({
    queryKey: ['subTopicDetail', subTopicId],
    queryFn: () => fetchSubTopicsDetail(subTopicId),
    enabled: !!subTopicId,
  });

  const onRefresh = () => {
    loadTopicDetails();
  };

  const handleToggleSave = async (vocabularyId) => {
    try {
      await toggleVocabularySave(vocabularyId);
      // Update local cache immediately
      queryClient.setQueryData(['subTopicDetail', subTopicId], (oldData) => {
        if (!oldData || !oldData.result) return oldData;
        return {
          ...oldData,
          result: {
            ...oldData.result,
            vocabularies: oldData.result.vocabularies.map(v => 
               v.id === vocabularyId ? { ...v, isSave: !v.isSave } : v
            )
          }
        };
      });
    } catch (ex) {
      Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể lưu/bỏ lưu từ vựng.' });
    }
  };

  const handleGoBack = () => {
    nav.goBack();
  };

  const subTopicInfo = data?.result ? {
    id: data.result.id,
    name: data.result.name,
    vocabularyCount: data.result.vocabularyCount,
    createdAt: data.result.createdAt,
    user_progress: data.result.user_progress || data.result.userProgress,
  } : null;

  const vocabularies = data?.result?.vocabularies || [];
  const errorMessage = error ? "Failed to load sub topic details. Please try again." : null;

  return (
    <SubTopicDetailScreen
      loading={loading}
      error={errorMessage}
      subTopicInfo={subTopicInfo}
      vocabularies={vocabularies}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onRetry={loadTopicDetails}
      onToggleSave={handleToggleSave}
      onNavigateVocabulary={(id) =>
        nav.navigate("VocabularyDetail", { vocabularyId: id })
      }
      onGoBack={handleGoBack}
    />
  );
};

export default SubTopicDetail;
