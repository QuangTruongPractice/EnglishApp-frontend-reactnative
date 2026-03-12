import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import SubTopicDetailScreen from "../Screen/SubTopicDetailScreen";
import { fetchSubTopicsDetail, toggleVocabularySave } from "../../configs/LoadData";

const SubTopicDetail = ({ route }) => {
  const { subTopicId } = route.params;
  const [vocabularies, setVocabularies] = useState([]);
  const [subTopicInfo, setSubTopicInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const nav = useNavigation();

  const loadTopicDetails = async () => {
    try {
      setLoading(true);
      const response = await fetchSubTopicsDetail(subTopicId);
      const data = response.result;

      setSubTopicInfo({
        id: data.id,
        name: data.name,
        vocabularyCount: data.vocabularyCount,
        createdAt: data.createdAt,
      });
      setVocabularies(data.vocabularies || []);
    } catch (ex) {
      // console.error(ex);
      setError("Failed to load sub topic details. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setError(null);
    loadTopicDetails();
  };

  const handleToggleSave = async (vocabularyId) => {
    try {
      await toggleVocabularySave(vocabularyId);
      // Update local state to reflect the change immediately
      setVocabularies((prevVocabularies) =>
        prevVocabularies.map((vocab) =>
          vocab.id === vocabularyId ? { ...vocab, isSave: !vocab.isSave } : vocab
        )
      );
    } catch (ex) {
      // console.error("Error toggling vocabulary save:", ex);
      // Optional: Show an error message to the user
    }
  };

  const handleGoBack = () => {
    nav.goBack();
  };

  useEffect(() => {
    if (subTopicId) {
      loadTopicDetails();
    }
  }, [subTopicId]);

  return (
    <SubTopicDetailScreen
      loading={loading}
      error={error}
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
