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
    const React = require('react');
    const inset = { top: 0, right: 0, bottom: 0, left: 0 };
    const frame = { x: 0, y: 0, width: 390, height: 844 };
    const SafeAreaContext = React.createContext(inset);
    const SafeAreaInsetsContext = React.createContext(inset);
    return {
        SafeAreaContext,
        SafeAreaInsetsContext,
        SafeAreaProvider: ({ children }) => children,
        SafeAreaView: ({ children }) => children,
        useSafeAreaInsets: () => inset,
        useSafeAreaFrame: () => frame,
        SafeAreaConsumer: ({ children }) => children(inset),
        initialWindowMetrics: {
            frame,
            insets: inset,
        },
    };
});

// Mock react-native-screens
jest.mock('react-native-screens', () => {
    const React = require('react');
    const { View } = require('react-native');
    class Screen extends React.Component {
        render() {
            return React.createElement(View, this.props);
        }
    }
    class ScreenContainer extends React.Component {
        render() {
            return React.createElement(View, this.props);
        }
    }
    return {
        ScreenContainer,
        Screen,
        NativeScreen: Screen,
        NativeScreenContainer: ScreenContainer,
        ScreenStack: View,
        ScreenStackHeaderConfig: View,
        ScreenStackHeaderSubview: View,
        enableScreens: jest.fn(),
    };
});

// Mock react-native-paper
jest.mock('react-native-paper', () => {
    const React = require('react');

    const MockComponent = (name) => {
        const Component = (props) => React.createElement(name, props);
        Component.displayName = name;
        return Component;
    };

    const paperProxy = new Proxy({}, {
        get: (target, prop) => {
            if (typeof prop === 'symbol') return target[prop];
            if (prop === 'MD2Colors') {
                return { red800: '#d32f2f' };
            }
            if (prop === 'TextInput' || prop === 'Avatar' || prop === 'List' || prop === 'DataTable' || prop === 'Dialog') {
                // For nested components like TextInput.Icon
                return new Proxy(MockComponent(prop), {
                    get: (subTarget, subProp) => {
                        if (typeof subProp === 'symbol') return subTarget[subProp];
                        return MockComponent(`${prop}.${subProp}`);
                    }
                });
            }
            return MockComponent(prop);
        }
    });

    return paperProxy;
});

// Mock navigation
jest.mock('@react-navigation/native-stack', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
        createNativeStackNavigator: () => ({
            Navigator: ({ children }) => React.createElement(View, { testID: 'Stack.Navigator' }, children),
            Screen: ({ name }) => React.createElement(View, { testID: `Stack.Screen.${name}` }),
        }),
    };
});

jest.mock('@react-navigation/bottom-tabs', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
        createBottomTabNavigator: () => ({
            Navigator: ({ children }) => React.createElement(View, { testID: 'Tab.Navigator' }, children),
            Screen: ({ name }) => React.createElement(View, { testID: `Tab.Screen.${name}` }),
        }),
    };
});

// Mock datetimepicker
jest.mock('@react-native-community/datetimepicker', () => {
    const React = require('react');
    const { View } = require('react-native');
    const MockDateTimePicker = (props) => React.createElement(View, props);
    MockDateTimePicker.displayName = 'DateTimePicker';
    return MockDateTimePicker;
});

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
    const React = require('react');
    const { View } = require('react-native');
    const MockIcon = (props) => React.createElement(View, props);
    MockIcon.displayName = 'MaterialCommunityIcons';
    return MockIcon;
});

// Mock toast
jest.mock('react-native-toast-message', () => {
    const React = require('react');
    const { View } = require('react-native');
    const MockToast = (props) => React.createElement(View, props);
    MockToast.show = jest.fn();
    MockToast.hide = jest.fn();
    return MockToast;
});

// Mock expo-av
jest.mock('expo-av', () => ({
    Audio: {
        Sound: jest.fn(),
        setIsEnabledAsync: jest.fn(),
        setAudioModeAsync: jest.fn(),
    },
    Video: {
        props: {
            resizeMode: {},
        },
    },
}));

// Mock react-native-webview
jest.mock('react-native-webview', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
        default: (props) => React.createElement(View, props),
        WebView: (props) => React.createElement(View, props),
    };
});