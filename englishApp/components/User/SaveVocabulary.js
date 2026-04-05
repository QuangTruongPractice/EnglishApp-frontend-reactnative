import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import SaveVocabularyScreen from "../Screen/SaveVocabularyScreen";
import { fetchSaveVocabulary, toggleVocabularySave } from "../../configs/LoadData";
import Toast from "react-native-toast-message";

const SaveVocabulary = () => {
    const [savedVocabs, setSavedVocabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const nav = useNavigation();

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await fetchSaveVocabulary();
            // The API returns a paginated object, so data is in result.content
            setSavedVocabs(res.result?.content || []);
        } catch (err) {
            setError("Không thể tải danh sách từ vựng đã lưu");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadData();
    };

    const handleToggleSave = async (vocabularyId) => {
        try {
            await toggleVocabularySave(vocabularyId);
            // In this screen, we usually want to remove the item if it's unsaved
            setSavedVocabs((prev) => prev.filter((v) => v.id !== vocabularyId));
        } catch (ex) {
            Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể bỏ lưu từ vựng.' });
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleBack = () => {
        nav.goBack();
    };

    return (
        <SaveVocabularyScreen
            onBack={handleBack}
            savedVocabs={savedVocabs}
            loading={loading}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onToggleSave={handleToggleSave}
            error={error}
            nav={nav}
        />
    );
};

export default SaveVocabulary;
