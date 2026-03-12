import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const LaptopFace = ({ isSpeaking = false }) => {
    const floatAnim = useRef(new Animated.Value(0)).current;
    const blinkAnim = useRef(new Animated.Value(1)).current;
    const lookXAnim = useRef(new Animated.Value(0)).current;
    const lookYAnim = useRef(new Animated.Value(0)).current;
    const mouthAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Floating animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: -10,
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Blinking logic
        const blink = () => {
            Animated.sequence([
                Animated.timing(blinkAnim, {
                    toValue: 0.1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(blinkAnim, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                const randomDelay = 2000 + Math.random() * 4000;
                setTimeout(blink, randomDelay);
            });
        };

        const blinkTimeout = setTimeout(blink, 2000);

        // Look around logic
        const lookAround = () => {
            if (isSpeaking) {
                lookXAnim.setValue(0);
                lookYAnim.setValue(0);
                setTimeout(lookAround, 1000);
                return;
            }
            const x = (Math.random() - 0.5) * 15;
            const y = (Math.random() - 0.5) * 8;

            Animated.parallel([
                Animated.timing(lookXAnim, {
                    toValue: x,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(lookYAnim, {
                    toValue: y,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                const randomDelay = 3000 + Math.random() * 4000;
                setTimeout(lookAround, randomDelay);
            });
        };

        const lookTimeout = setTimeout(lookAround, 3000);

        return () => {
            clearTimeout(blinkTimeout);
            clearTimeout(lookTimeout);
        };
    }, [isSpeaking]);

    useEffect(() => {
        if (isSpeaking) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(mouthAnim, {
                        toValue: 1,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                    Animated.timing(mouthAnim, {
                        toValue: 0,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            mouthAnim.setValue(0);
        }
    }, [isSpeaking]);

    return (
        <View style={styles.wrapper}>
            <Animated.View style={[styles.laptop, { transform: [{ translateY: floatAnim }] }]}>
                <View style={styles.screenFrame}>
                    <View style={styles.screen}>
                        <Animated.View style={[
                            styles.faceContainer,
                            { transform: [{ translateX: lookXAnim }, { translateY: lookYAnim }] }
                        ]}>
                            <View style={styles.eyes}>
                                <Animated.View style={[styles.eye, { transform: [{ scaleY: blinkAnim }] }]}>
                                    <View style={styles.eyeHighlightSmall} />
                                    <View style={styles.eyeHighlightLarge} />
                                </Animated.View>
                                <Animated.View style={[styles.eye, { transform: [{ scaleY: blinkAnim }] }]}>
                                    <View style={styles.eyeHighlightSmall} />
                                    <View style={styles.eyeHighlightLarge} />
                                </Animated.View>
                            </View>
                            {isSpeaking ? (
                                <Animated.View style={[
                                    styles.talkingMouth,
                                    { transform: [{ scaleY: mouthAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }] }
                                ]} />
                            ) : (
                                <View style={styles.mouth} />
                            )}
                        </Animated.View>
                    </View>
                </View>
                <View style={styles.base} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 250,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    laptop: {
        position: 'relative',
        width: 320,
        height: 220,
    },
    screenFrame: {
        position: 'absolute',
        top: 0,
        left: '50%',
        marginLeft: -160,
        width: 320,
        height: 200,
        backgroundColor: '#455a64',
        borderRadius: 16,
        padding: 10,
        zIndex: 2,
        elevation: 5,
    },
    screen: {
        width: '100%',
        height: '100%',
        backgroundColor: '#81d4fa',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    faceContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    eyes: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 50,
        marginBottom: 15,
    },
    eye: {
        width: 25,
        height: 35,
        backgroundColor: '#263238',
        borderRadius: 15,
        position: 'relative',
    },
    eyeHighlightLarge: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 8,
        height: 8,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    eyeHighlightSmall: {
        position: 'absolute',
        bottom: 6,
        left: 6,
        width: 3,
        height: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 1.5,
    },
    mouth: {
        width: 28,
        height: 14,
        borderBottomWidth: 3,
        borderBottomColor: '#263238',
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
    },
    talkingMouth: {
        height: 24,
        width: 30,
        backgroundColor: '#263238',
        borderRadius: 12,
    },
    base: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        marginLeft: -175,
        width: 350,
        height: 20,
        backgroundColor: '#cfd8dc',
        borderRadius: 4,
        zIndex: 1,
        elevation: 3,
    },
});

export default LaptopFace;
