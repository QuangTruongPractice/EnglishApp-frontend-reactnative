import React, { useState, useContext, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';
import Toast from 'react-native-toast-message';
import { MyUserContext } from '../../configs/Context';
import { ChatbotApis, endpoints } from '../../configs/Apis';
import ChatbotScreen from '../Screen/ChatbotScreen';

const Chatbot = () => {
    const user = useContext(MyUserContext);
    const [conversationId, setConversationId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const recordingRef = useRef(null);
    const soundRef = useRef(null);
    const isPreparingRef = useRef(false);
    const stopRequestedRef = useRef(false);

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
            if (recordingRef.current) {
                recordingRef.current.stopAndUnloadAsync().catch(() => { });
            }
        };
    }, []);

    const playAudio = async (url) => {
        if (!url) return;
        try {
            if (soundRef.current) {
                await soundRef.current.unloadAsync();
            }
            setIsSpeaking(true);
            const { sound } = await Audio.Sound.createAsync({ uri: url });
            soundRef.current = sound;

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    setIsSpeaking(false);
                }
            });

            await sound.playAsync();
        } catch (error) {
            // console.error("Error playing audio:", error);
            setIsSpeaking(false);
        }
    };

    const handleSend = async (audioUri) => {
        if (!audioUri) return;

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('user_id', user?.id || '');
            if (conversationId) {
                formData.append('conversation_id', conversationId);
            }

            if (audioUri) {
                formData.append('audio', {
                    uri: audioUri,
                    name: 'recording.m4a',
                    type: 'audio/m4a'
                });
            }

            const response = await ChatbotApis.post(endpoints['chat-voice'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data) {
                const { conversation_id, audio_url } = response.data;
                if (conversation_id) setConversationId(conversation_id);

                // Play audio response
                if (audio_url) {
                    playAudio(audio_url);
                }
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Opps',
                text2: 'Không thể kết nối với AI. Vui lòng thử lại.'
            });
        } finally {
            setLoading(false);
        }
    };

    const startNewChat = () => {
        setConversationId(null);
        Toast.show({
            type: 'info',
            text1: 'New Chat',
            text2: 'Conversation history cleared.'
        });
    };

    const startRecording = async () => {
        if (isPreparingRef.current) return;

        try {
            isPreparingRef.current = true;
            stopRequestedRef.current = false;

            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                Toast.show({
                    type: 'info',
                    text1: 'Thông báo',
                    text2: 'Vui lòng cấp quyền micro để sử dụng tính năng này.'
                });
                return;
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording: newRecording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );

            recordingRef.current = newRecording;

            if (stopRequestedRef.current) {
                await stopAndSend(newRecording);
            } else {
                setIsRecording(true);
            }
        } catch (err) {
            Toast.show({
                type: 'error',
                text1: 'Opps',
                text2: 'Không thể khởi động micro.'
            });
        } finally {
            isPreparingRef.current = false;
        }
    };

    const stopAndSend = async (rec) => {
        try {
            setIsRecording(false);
            if (!rec) return;

            const status = await rec.getStatusAsync();
            if (status.canRecord) {
                await rec.stopAndUnloadAsync();
                const uri = rec.getURI();
                if (uri) handleSend(uri);
            }
        } catch (e) {
            // Ignore minor errors during cleanup
        } finally {
            recordingRef.current = null;
            stopRequestedRef.current = false;
        }
    };

    const stopRecording = async () => {
        if (isPreparingRef.current) {
            stopRequestedRef.current = true;
            setIsRecording(false);
            return;
        }

        if (recordingRef.current) {
            await stopAndSend(recordingRef.current);
        }
    };

    return (
        <ChatbotScreen
            isSpeaking={isSpeaking}
            isRecording={isRecording}
            loading={loading}
            startRecording={startRecording}
            stopRecording={stopRecording}
            startNewChat={startNewChat}
        />
    );
};

export default Chatbot;
