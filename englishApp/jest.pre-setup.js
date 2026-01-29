process.env.EXPO_OS = 'ios';
const NativeModules = require('react-native/Libraries/BatchedBridge/NativeModules');

if (!NativeModules.UIManager) {
    NativeModules.UIManager = {};
}

if (!NativeModules.NativeUnimoduleProxy) {
    NativeModules.NativeUnimoduleProxy = {
        viewManagersMetadata: {},
        modulesConstants: {
            mockDefinition: {
                ExponentConstants: {
                    experienceUrl: { mock: 'exp://localhost:8081' }
                }
            }
        }
    };
}
