import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#455a64',
    },
    newChatButton: {
        padding: 4,
    },
    content: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 50,
    },
    faceContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 300,
    },
    loadingIndicator: {
        position: 'absolute',
        bottom: -40,
    },
    controls: {
        alignItems: 'center',
    },
    hintText: {
        fontSize: 16,
        color: '#90a4ae',
        marginBottom: 20,
        fontWeight: '500',
    },
    recordButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#d32f2f',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    recordButtonActive: {
        backgroundColor: '#f44336',
        transform: [{ scale: 1.1 }],
    },
});

export default styles;