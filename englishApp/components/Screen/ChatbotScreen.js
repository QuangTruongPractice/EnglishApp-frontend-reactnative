import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LaptopFace from '../User/LaptopFace';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../../styles/ChatBotStyles';

const ChatbotScreen = ({
    isSpeaking,
    isRecording,
    loading,
    startRecording,
    stopRecording,
    startNewChat
}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={startNewChat} style={styles.newChatButton}>
                    <Icon name="chat-plus-outline" size={24} color="#d32f2f" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>AI Assistant</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.faceContainer}>
                    <LaptopFace isSpeaking={isSpeaking} />
                    {loading && (
                        <ActivityIndicator
                            size="large"
                            color="#d32f2f"
                            style={styles.loadingIndicator}
                        />
                    )}
                </View>

                <View style={styles.controls}>
                    <Text style={styles.hintText}>
                        {isRecording ? "Listening..." : "Hold to talk"}
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.recordButton,
                            isRecording && styles.recordButtonActive
                        ]}
                        onPressIn={startRecording}
                        onPressOut={stopRecording}
                        activeOpacity={0.7}
                    >
                        <Icon
                            name={isRecording ? "microphone" : "microphone-outline"}
                            size={40}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChatbotScreen;
