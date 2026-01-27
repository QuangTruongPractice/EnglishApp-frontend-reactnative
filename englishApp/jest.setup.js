import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// ✅ Mock Expo vector icons
const mockIcon = (props) => require('react').createElement('Icon', props);
const iconMock = {
    MaterialIcons: mockIcon,
    Ionicons: mockIcon,
    MaterialCommunityIcons: mockIcon,
    FontAwesome: mockIcon,
    AntDesign: mockIcon,
    Entypo: mockIcon,
    EvilIcons: mockIcon,
    Feather: mockIcon,
    Fontisto: mockIcon,
    Foundation: mockIcon,
    Octicons: mockIcon,
    SimpleLineIcons: mockIcon,
    Zocial: mockIcon,
};

jest.mock('@expo/vector-icons', () => iconMock, { virtual: true });
jest.mock('react-native-vector-icons', () => iconMock, { virtual: true });

// Mock sub-paths as well to satisfy the resolver/mapper
jest.mock('@expo/vector-icons/MaterialIcons', () => mockIcon, { virtual: true });
jest.mock('@expo/vector-icons/Ionicons', () => mockIcon, { virtual: true });
jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => mockIcon, { virtual: true });
jest.mock('react-native-vector-icons/MaterialIcons', () => mockIcon, { virtual: true });
jest.mock('react-native-vector-icons/Ionicons', () => mockIcon, { virtual: true });
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => mockIcon, { virtual: true });

// Mock safe area
jest.mock('react-native-safe-area-context', () => {
    const inset = { top: 0, right: 0, bottom: 0, left: 0 };
    return {
        SafeAreaProvider: ({ children }) => children,
        SafeAreaView: ({ children }) => children,
        useSafeAreaInsets: () => inset,
        SafeAreaConsumer: ({ children }) => children(inset),
    };
});

// Silence Animated warning
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
