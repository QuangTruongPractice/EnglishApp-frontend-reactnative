import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SaveVocabularyScreen from "../Screen/SaveVocabularyScreen";
import { fetchSaveVocabulary, toggleVocabularySave } from "../../configs/LoadData";
import Toast from "react-native-toast-message";

const SaveVocabulary = () => {
    const nav = useNavigation();
    const queryClient = useQueryClient();

    const { data, isLoading: loading, isRefetching: refreshing, error, refetch: loadData } = useQuery({
        queryKey: ['savedVocabulary'],
        queryFn: fetchSaveVocabulary
    });

    // Extract content array
    const savedVocabs = data?.result?.content || [];
    const onRefresh = () => {
        loadData();
    };

    const handleToggleSave = async (vocabularyId) => {
        try {
            await toggleVocabularySave(vocabularyId);
            // Optimistic Update: Remove from local cache immediately
            queryClient.setQueryData(['savedVocabulary'], (oldData) => {
                if (!oldData || !oldData.result) return oldData;
                return {
                    ...oldData,
                    result: {
                        ...oldData.result,
                        content: oldData.result.content.filter((v) => v.id !== vocabularyId)
                    }
                };
            });
            // Also invalidate vocabulary detail if possible, but safe just to update this list
        } catch (ex) {
            Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể bỏ lưu từ vựng.' });
        }
    };


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
