import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-vector-icons and @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
    MaterialIcons: 'Icon',
    Ionicons: 'Icon',
    MaterialCommunityIcons: 'Icon',
    FontAwesome: 'Icon',
    AntDesign: 'Icon',
    Entypo: 'Icon',
    EvilIcons: 'Icon',
    Feather: 'Icon',
    Fontisto: 'Icon',
    Foundation: 'Icon',
    Octicons: 'Icon',
    SimpleLineIcons: 'Icon',
    Zocial: 'Icon',
}));

// Provide a mock for react-native-vector-icons since jest-expo maps back to @expo/vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon', { virtual: true });
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon', { virtual: true });
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon', { virtual: true });

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
    const inset = { top: 0, right: 0, bottom: 0, left: 0 };
    return {
        SafeAreaProvider: ({ children }) => children,
        SafeAreaView: ({ children }) => children,
        useSafeAreaInsets: () => inset,
        SafeAreaConsumer: ({ children }) => children(inset),
    };
});

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
