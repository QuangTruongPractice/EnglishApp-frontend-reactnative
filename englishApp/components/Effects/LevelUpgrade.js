import React, { useRef, useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const LEVEL_COLORS = {
    'A1': { main: '#F45B69', bg: '#06060f' }, // Coral
    'A2': { main: '#9B2C2C', bg: '#06060f' }, // Deep Red
    'B1': { main: '#43A047', bg: '#06060f' }, // Green
    'B2': { main: '#1E88E5', bg: '#06060f' }, // Blue
    'C1': { main: '#8E24AA', bg: '#06060f' }, // Purple
    'C2': { main: '#FFB000', bg: '#06060f' }  // Golden
};

const LevelUpgrade = ({ fromLevel = 'A1', toLevel = 'A2', onComplete, fullScreen = true }) => {
    const webViewRef = useRef(null);

    const fromColor = LEVEL_COLORS[fromLevel]?.main || '#F5C418';
    const toColor = LEVEL_COLORS[toLevel]?.main || '#29D9F5';
    const bgColor = '#06060f';

    const htmlContent = useMemo(() => `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <style>
                * { box-sizing: border-box; }
                html, body { 
                    margin: 0; padding: 0; 
                    background: ${bgColor}; 
                    overflow: hidden; 
                    width: 100%; height: 100%; 
                    display: flex; justify-content: center; align-items: center;
                }
                #cv { 
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                }
            </style>
        </head>
        <body>
            <canvas id="cv"></canvas>
            <script>
                // Use explicit dimensions from React Native to avoid window.innerHeight issues
                const W = ${SCREEN_WIDTH};
                const H = ${SCREEN_HEIGHT};
                const cv = document.getElementById('cv');
                
                // Adjust for device pixel ratio for sharper rendering
                const dpr = window.devicePixelRatio || 1;
                cv.width = W * dpr;
                cv.height = H * dpr;
                
                const cx = cv.getContext('2d');
                cx.scale(dpr, dpr);

                const FROM_TEXT = "${fromLevel}";
                const TO_TEXT = "${toLevel}";
                const FROM_COLOR = "${fromColor}";
                const TO_COLOR = "${toColor}";
                const BG_COLOR = "${bgColor}";

                function easeOut(t) { return 1 - Math.pow(1 - Math.min(1, t), 3); }

                let t0 = null;
                let parts = [];
                let stars = [];
                let scattered = false;

                // Init Stars
                for (let i = 0; i < 150; i++) {
                    stars.push({
                        x: Math.random() * W,
                        y: Math.random() * H,
                        r: Math.random() * 1.5 + 0.5,
                        a: Math.random() * 0.8 + 0.2
                    });
                }

                function makeParticles() {
                    const off = document.createElement("canvas");
                    off.width = W; off.height = H;
                    const oc = off.getContext("2d");
                    const fontSize = Math.floor(W * 0.45);
                    oc.font = "900 " + fontSize + "px Georgia, serif";
                    oc.fillStyle = "#fff";
                    oc.textAlign = "center";
                    oc.textBaseline = "middle";
                    oc.fillText(FROM_TEXT, W / 2, H / 2);
                    
                    const d = oc.getImageData(0, 0, W, H).data;
                    const step = Math.max(6, Math.floor(W / 65));
                    const res = [];
                    for (let y = 0; y < H; y += step) {
                        for (let x = 0; x < W; x += step) {
                            if (d[(y * W + x) * 4 + 3] > 100) {
                                const dx = x - W / 2;
                                const dy = y - H / 2;
                                const dist = Math.hypot(dx, dy) || 1;
                                const spd = 2.0 + dist * 0.04 + Math.random() * 5.0;
                                res.push({
                                    x: x + step / 2, y: y + step / 2,
                                    vx: (dx / dist) * spd + (Math.random() - 0.5) * 4,
                                    vy: (dy / dist) * spd - 3 + (Math.random() - 0.5) * 4,
                                    sz: step - 1, rot: Math.random() * Math.PI * 2,
                                    rv: (Math.random() - 0.5) * 0.4
                                });
                            }
                        }
                    }
                    return res;
                }

                function drawLabel(text, color, alpha, scale, ox, oy) {
                    if (alpha <= 0) return;
                    cx.save();
                    cx.globalAlpha = alpha;
                    cx.translate(W / 2 + ox, H / 2 + oy);
                    cx.scale(scale, scale);
                    const fontSize = Math.floor(W * 0.45);
                    cx.font = "900 " + fontSize + "px Georgia, serif";
                    cx.fillStyle = color;
                    cx.textAlign = "center";
                    cx.textBaseline = "middle";
                    cx.fillText(text, 0, 0);
                    cx.restore();
                }

                function frame(ts) {
                    if (!t0) t0 = ts;
                    const t = (ts - t0) / 1000;
                    cx.fillStyle = BG_COLOR;
                    cx.fillRect(0, 0, W, H);

                    // stars
                    const starAlpha = Math.min(1, t * 2);
                    for (const st of stars) {
                        cx.beginPath();
                        cx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
                        cx.fillStyle = "rgba(255,255,255," + (st.a * starAlpha) + ")";
                        cx.fill();
                    }

                    if (t < 0.6) {
                    } else if (t < 2.0) {
                        const p = easeOut((t - 0.6) / 1.1);
                        drawLabel(FROM_TEXT, FROM_COLOR, p, 0.3 + 0.7 * p, 0, 0);
                    } else if (t < 3.2) {
                        const intens = (t - 2.0) / 1.25;
                        const mag = 15 * intens;
                        drawLabel(FROM_TEXT, FROM_COLOR, 1, 1, (Math.random() - 0.5) * mag, (Math.random() - 0.5) * mag);
                        
                        const n = Math.floor(intens * 18);
                        for (let i = 0; i < n; i++) {
                            const ang = i * 0.8 + t * 4;
                            const r0 = W * 0.1;
                            const r1 = r0 + Math.random() * W * 0.3;
                            cx.strokeStyle = "rgba(255,255,255," + (intens * 0.75) + ")";
                            cx.lineWidth = 2.5;
                            cx.beginPath();
                            cx.moveTo(W/2 + Math.cos(ang)*r0, H/2 + Math.sin(ang)*r0);
                            cx.lineTo(W/2 + Math.cos(ang+0.2)*r1, H/2 + Math.sin(ang+0.2)*r1);
                            cx.stroke();
                        }
                    } else {
                        if (!scattered) {
                            parts = makeParticles();
                            scattered = true;
                        }
                        const st = t - 3.2;

                        if (st < 0.25) {
                            cx.fillStyle = "rgba(255,255,255," + (1 - st / 0.25) + ")";
                            cx.fillRect(0, 0, W, H);
                        }

                        for (const p of parts) {
                            p.x += p.vx; p.y += p.vy;
                            p.vy += 0.5; p.vx *= 0.96;
                            p.rot += p.rv;
                            const life = Math.max(0, 1 - st / 2.2);
                            if (life > 0) {
                                cx.save();
                                cx.globalAlpha = life;
                                cx.translate(p.x, p.y);
                                cx.rotate(p.rot);
                                cx.fillStyle = FROM_COLOR;
                                cx.fillRect(-p.sz/2, -p.sz/2, p.sz, p.sz);
                                cx.restore();
                            }
                        }

                        if (st > 0.4 && st < 3.2) {
                            const rAge = st - 0.4;
                            const rr = rAge * W * 0.85;
                            const ra = Math.max(0, 1 - rAge / 2.2) * 0.6;
                            cx.strokeStyle = TO_COLOR;
                            cx.globalAlpha = ra;
                            cx.lineWidth = 5;
                            cx.beginPath(); cx.arc(W/2, H/2, rr, 0, Math.PI*2); cx.stroke();
                            cx.globalAlpha = 1;
                        }

                        if (st > 0.7) {
                            const p2 = easeOut((st - 0.7) / 1.1);
                            let sc = 2.0 - 1.0 * p2;
                            let alpha = p2;
                            if (st > 2.5) {
                                sc = 1.0 + 0.04 * Math.sin((st - 2.5) * 5);
                            }
                            drawLabel(TO_TEXT, TO_COLOR, alpha, sc, 0, 0);
                        }

                        if (t > 8.5) {
                            window.ReactNativeWebView.postMessage("done");
                            return;
                        }
                    }
                    requestAnimationFrame(frame);
                }
                requestAnimationFrame(frame);
            </script>
        </body>
        </html>
    `, [fromLevel, toLevel, fromColor, toColor]);

    return (
        <View style={[styles.container, fullScreen && styles.fullScreen]}>
            <WebView
                ref={webViewRef}
                style={styles.webview}
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                javaScriptEnabled={true}
                scrollEnabled={false}
                overScrollMode="never"
                onMessage={(event) => {
                    if (event.nativeEvent.data === 'done' && onComplete) {
                        onComplete();
                    }
                }}
                backgroundColor="transparent"
                transparent={true}
                domStorageEnabled={true}
                startInLoadingState={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#06060f',
        overflow: 'hidden',
    },
    fullScreen: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 9999,
    },
    webview: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});

export default LevelUpgrade;
