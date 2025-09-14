import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import SubTopicDetailScreen from "../Screen/SubTopicDetailScreen";
import { fetchSubTopicsDetail } from "../../configs/LoadData";

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
      console.error(ex);
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
      onNavigateVocabulary={(id) =>
        nav.navigate("VocabularyDetail", { vocabularyId: id })
      }
      onGoBack={handleGoBack}
    />
  );
};

export default SubTopicDetail;
