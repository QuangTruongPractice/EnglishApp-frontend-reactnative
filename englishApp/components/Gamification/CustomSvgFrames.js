import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Path,
  G,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Polygon,
} from 'react-native-svg';

export const CustomSvgFrame = ({ frameKey, size = 80 }) => {
  switch (frameKey) {
    // =========================================================================
    // 🟢 1. COMMON: Khiên Bát Giác Đồng (Octagonal Bronze Shield)
    // =========================================================================
    case 'common-bronze-octagon':
      return (
        <View style={[styles.svgOverlay, { width: size, height: size }]}>
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="bronzeGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#FDE047" />
                <Stop offset="50%" stopColor="#CD7F32" />
                <Stop offset="100%" stopColor="#78350F" />
              </LinearGradient>
            </Defs>
            {/* Octagon Outer Border */}
            <Polygon
              points="50,6 81,19 94,50 81,81 50,94 19,81 6,50 19,19"
              fill="none"
              stroke="url(#bronzeGrad)"
              strokeWidth="4"
            />
            {/* Inner Bronze Bezel */}
            <Circle cx="50" cy="50" r="39" fill="none" stroke="url(#bronzeGrad)" strokeWidth="3.5" />
            <Circle cx="50" cy="50" r="36.5" fill="none" stroke="#543310" strokeWidth="1" />
            {/* 8 Corner Bronze Stud Rivets */}
            <Circle cx="50" cy="6" r="2.2" fill="#FEF08A" stroke="#543310" strokeWidth="0.5" />
            <Circle cx="81" cy="19" r="2.2" fill="#FEF08A" stroke="#543310" strokeWidth="0.5" />
            <Circle cx="94" cy="50" r="2.2" fill="#FEF08A" stroke="#543310" strokeWidth="0.5" />
            <Circle cx="81" cy="81" r="2.2" fill="#FEF08A" stroke="#543310" strokeWidth="0.5" />
            <Circle cx="50" cy="94" r="2.2" fill="#FEF08A" stroke="#543310" strokeWidth="0.5" />
            <Circle cx="19" cy="81" r="2.2" fill="#FEF08A" stroke="#543310" strokeWidth="0.5" />
            <Circle cx="6" cy="50" r="2.2" fill="#FEF08A" stroke="#543310" strokeWidth="0.5" />
            <Circle cx="19" cy="19" r="2.2" fill="#FEF08A" stroke="#543310" strokeWidth="0.5" />
          </Svg>
        </View>
      );

    // =========================================================================
    // 🟢 2. COMMON: Bánh Răng Sắt Cổ (Mechanical Iron Cogwheel)
    // =========================================================================
    case 'common-iron-cog':
      return (
        <View style={[styles.svgOverlay, { width: size, height: size }]}>
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="ironGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#E2E8F0" />
                <Stop offset="50%" stopColor="#64748B" />
                <Stop offset="100%" stopColor="#1E293B" />
              </LinearGradient>
            </Defs>
            {/* 12 Mechanical Cog Teeth around perimeter */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <G key={i} transform={`rotate(${angle} 50 50)`}>
                <Rect x="46" y="5" width="8" height="6" rx="1" fill="url(#ironGrad)" stroke="#1E293B" strokeWidth="0.5" />
              </G>
            ))}
            {/* Inner Ring */}
            <Circle cx="50" cy="50" r="39" fill="none" stroke="url(#ironGrad)" strokeWidth="4.5" />
            <Circle cx="50" cy="50" r="36.5" fill="none" stroke="#1E293B" strokeWidth="1" />
          </Svg>
        </View>
      );

    // =========================================================================
    // 🟢 3. COMMON: Bảng Đá Cổ Núi (Rounded Square Stone Tablet)
    // =========================================================================
    case 'common-stone-slab':
      return (
        <View style={[styles.svgOverlay, { width: size, height: size }]}>
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="stoneGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#F1F5F9" />
                <Stop offset="50%" stopColor="#94A3B8" />
                <Stop offset="100%" stopColor="#475569" />
              </LinearGradient>
            </Defs>
            {/* Heavy Stone Rounded Square */}
            <Rect
              x="8"
              y="8"
              width="84"
              height="84"
              rx="22"
              fill="none"
              stroke="url(#stoneGrad)"
              strokeWidth="4.5"
            />
            {/* Inner Stone Circular Bezel */}
            <Circle cx="50" cy="50" r="39" fill="none" stroke="url(#stoneGrad)" strokeWidth="3.5" />
            <Circle cx="50" cy="50" r="36.5" fill="none" stroke="#334155" strokeWidth="1" />
            {/* Stone Corner Brackets */}
            <Path d="M 16,30 L 16,16 L 30,16" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
            <Path d="M 84,30 L 84,16 L 70,16" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
            <Path d="M 16,70 L 16,84 L 30,84" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
            <Path d="M 84,70 L 84,84 L 70,84" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          </Svg>
        </View>
      );

    // =========================================================================
    // 🟢 4. COMMON: Vòng Gỗ Sồi Rừng (Oak Forest Vines)
    // =========================================================================
    case 'common-wood-oak':
      return (
        <View style={[styles.svgOverlay, { width: size, height: size }]}>
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="woodGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#D97706" />
                <Stop offset="50%" stopColor="#78350F" />
                <Stop offset="100%" stopColor="#451A03" />
              </LinearGradient>
            </Defs>
            {/* Twisted Wood Branches Ring */}
            <Circle cx="50" cy="50" r="39" fill="none" stroke="url(#woodGrad)" strokeWidth="5" />
            <Circle cx="50" cy="50" r="36.5" fill="none" stroke="#451A03" strokeWidth="1" />
            {/* Forest Leaves Accents */}
            <Path d="M 50,6 C 54,10 56,14 50,16 C 44,14 46,10 50,6 Z" fill="#22C55E" stroke="#15803D" strokeWidth="0.6" />
            <Path d="M 86,36 C 90,40 90,46 86,48 C 82,46 84,40 86,36 Z" fill="#22C55E" stroke="#15803D" strokeWidth="0.6" />
            <Path d="M 14,36 C 10,40 10,46 14,48 C 18,46 16,40 14,36 Z" fill="#22C55E" stroke="#15803D" strokeWidth="0.6" />
            <Path d="M 50,94 C 54,90 56,86 50,84 C 44,86 46,90 50,94 Z" fill="#22C55E" stroke="#15803D" strokeWidth="0.6" />
          </Svg>
        </View>
      );

    // =========================================================================
    // 🔵 5. RARE: Hiệp Sĩ Kiếm Bạc (Silver Knight Crossed Swords)
    // =========================================================================
    case 'rare-silver-swords':
      return (
        <View style={[styles.svgOverlay, { width: size, height: size }]}>
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="silverGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#FFFFFF" />
                <Stop offset="40%" stopColor="#E2E8F0" />
                <Stop offset="70%" stopColor="#94A3B8" />
                <Stop offset="100%" stopColor="#38BDF8" />
              </LinearGradient>
            </Defs>
            {/* Main Silver Knight Ring */}
            <Circle cx="50" cy="50" r="39" fill="none" stroke="url(#silverGrad)" strokeWidth="5" />
            <Circle cx="50" cy="50" r="36.5" fill="none" stroke="#0284C7" strokeWidth="1" />
            {/* Top Knight Crest */}
            <Polygon points="50,4 58,16 42,16" fill="url(#silverGrad)" stroke="#0284C7" strokeWidth="1" />
            <Circle cx="50" cy="11" r="2.2" fill="#38BDF8" />
            {/* Bottom Crossed Swords Graphic */}
            <G>
              {/* Left Sword Blade */}
              <Path d="M 28,78 L 72,92" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              {/* Right Sword Blade */}
              <Path d="M 72,78 L 28,92" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              {/* Center Diamond Guard */}
              <Polygon points="50,82 55,86 50,90 45,86" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.8" />
            </G>
          </Svg>
        </View>
      );

    // =========================================================================
    // 🔵 6. RARE: Chông Băng Bão Tuyết (Frost Spikes Crystal Aura)
    // =========================================================================
    case 'rare-frost-spikes':
      return (
        <View style={[styles.svgOverlay, { width: size, height: size }]}>
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="frostGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#E0F2FE" />
                <Stop offset="50%" stopColor="#38BDF8" />
                <Stop offset="100%" stopColor="#0369A1" />
              </LinearGradient>
            </Defs>
            {/* Diamond Frame rotated 45 deg */}
            <Polygon points="50,6 94,50 50,94 6,50" fill="none" stroke="url(#frostGrad)" strokeWidth="3" />
            {/* 4 Corner Sharp Ice Crystals */}
            <Polygon points="50,2 54,12 50,16 46,12" fill="url(#frostGrad)" stroke="#FFFFFF" strokeWidth="0.5" />
            <Polygon points="98,50 88,54 84,50 88,46" fill="url(#frostGrad)" stroke="#FFFFFF" strokeWidth="0.5" />
            <Polygon points="50,98 54,88 50,84 46,88" fill="url(#frostGrad)" stroke="#FFFFFF" strokeWidth="0.5" />
            <Polygon points="2,50 12,54 16,50 12,46" fill="url(#frostGrad)" stroke="#FFFFFF" strokeWidth="0.5" />
            {/* Inner Circular Frost Ring */}
            <Circle cx="50" cy="50" r="39" fill="none" stroke="url(#frostGrad)" strokeWidth="4.5" />
            <Circle cx="50" cy="50" r="36.5" fill="none" stroke="#BAE6FD" strokeWidth="1.2" strokeDasharray="4, 3" />
          </Svg>
        </View>
      );

    // =========================================================================
    // 🔵 7. RARE: Trái Tim Anh Đào (Sakura Heart Vine)
    // =========================================================================
    case 'rare-sakura-heart':
      return (
        <View style={[styles.svgOverlay, { width: size, height: size }]}>
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="sakuraGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#FDF2F8" />
                <Stop offset="50%" stopColor="#F472B6" />
                <Stop offset="100%" stopColor="#DB2777" />
              </LinearGradient>
            </Defs>
            {/* Outer Heart Vine Contour */}
            <Path
              d="M 50,12 C 58,2 84,2 90,24 C 96,46 72,72 50,92 C 28,72 4,46 10,24 C 16,2 42,2 50,12 Z"
              fill="none"
              stroke="url(#sakuraGrad)"
              strokeWidth="3.5"
            />
            {/* Main Inner Sakura Ring */}
            <Circle cx="50" cy="50" r="39" fill="none" stroke="url(#sakuraGrad)" strokeWidth="4.5" />
            <Circle cx="50" cy="50" r="36.5" fill="none" stroke="#FDF2F8" strokeWidth="1" />
            {/* Floating Sakura Petals */}
            <Circle cx="20" cy="70" r="3" fill="#F472B6" stroke="#FFFFFF" strokeWidth="0.5" />
            <Circle cx="26" cy="76" r="2.5" fill="#FBCFE8" />
            <Circle cx="80" cy="70" r="3" fill="#F472B6" stroke="#FFFFFF" strokeWidth="0.5" />
            <Circle cx="74" cy="76" r="2.5" fill="#FBCFE8" />
            <Circle cx="50" cy="92" r="3.5" fill="#EC4899" stroke="#FFFFFF" strokeWidth="0.8" />
          </Svg>
        </View>
      );

    // =========================================================================
    // 🟣 8. LEGENDARY: Pháp Sư Hồng Ngọc (Ruby Warlock Magic Circle)
    // =========================================================================
    case 'legendary-ruby-warlock':
      return (
        <View style={[styles.svgOverlay, { width: size, height: size }]}>
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="rubyGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#FFF1F2" />
                <Stop offset="50%" stopColor="#F43F5E" />
                <Stop offset="100%" stopColor="#9F1239" />
              </LinearGradient>
              <RadialGradient id="rubyGlow" cx="50%" cy="50%" r="50%">
                <Stop offset="50%" stopColor="#F43F5E" stopOpacity="0.4" />
                <Stop offset="100%" stopColor="#9F1239" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Circle cx="50" cy="50" r="48" fill="url(#rubyGlow)" />
            {/* Inverted Magic Triangle Overlay */}
            <Polygon points="50,88 14,26 86,26" fill="none" stroke="url(#rubyGrad)" strokeWidth="1.8" strokeDasharray="4, 3" />
            {/* Main Magic Ring */}
            <Circle cx="50" cy="50" r="39" fill="none" stroke="url(#rubyGrad)" strokeWidth="5" />
            <Circle cx="50" cy="50" r="36.5" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            {/* Top 3-Spire Crown */}
            <Polygon points="42,16 50,4 58,16" fill="url(#rubyGrad)" stroke="#FFFFFF" strokeWidth="0.8" />
            <Circle cx="50" cy="10" r="2.5" fill="#FFFFFF" />
            {/* 3 Floating Ruby Energy Orbs */}
            <Circle cx="50" cy="88" r="4" fill="#E11D48" stroke="#FFFFFF" strokeWidth="1" />
            <Circle cx="14" cy="26" r="3.2" fill="#E11D48" stroke="#FFFFFF" strokeWidth="0.8" />
            <Circle cx="86" cy="26" r="3.2" fill="#E11D48" stroke="#FFFFFF" strokeWidth="0.8" />
          </Svg>
        </View>
      );

    // =========================================================================
    // 🟣 9. LEGENDARY: Cánh Giáp Cyberpunk (Cyber Valkyrie Mech Wings)
    // =========================================================================
    case 'legendary-cyber-wings':
      return (
        <View style={[styles.svgOverlay, { width: size, height: size }]}>
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="cyberGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#ECFEFF" />
                <Stop offset="50%" stopColor="#06B6D4" />
                <Stop offset="100%" stopColor="#0891B2" />
              </LinearGradient>
            </Defs>
            {/* Multi-tiered Mech Wings Left */}
            <Path d="M 16,50 C 4,30 10,12 30,18 C 22,28 24,40 28,48 Z" fill="url(#cyberGrad)" stroke="#0284C7" strokeWidth="1" />
            <Path d="M 10,62 C 0,47 6,32 24,36 Z" fill="#EC4899" />
            {/* Multi-tiered Mech Wings Right */}
            <Path d="M 84,50 C 96,30 90,12 70,18 C 78,28 76,40 72,48 Z" fill="url(#cyberGrad)" stroke="#0284C7" strokeWidth="1" />
            <Path d="M 90,62 C 100,47 94,32 76,36 Z" fill="#EC4899" />
            {/* Main Cyber Frame Ring */}
            <Circle cx="50" cy="50" r="39" fill="none" stroke="url(#cyberGrad)" strokeWidth="4.5" />
            <Circle cx="50" cy="50" r="36.5" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3, 3" />
            {/* Helmet Horn Crest */}
            <Path d="M 40,16 L 50,4 L 60,16 L 50,11 Z" fill="url(#cyberGrad)" stroke="#0284C7" strokeWidth="0.8" />
            {/* Bottom Cyber Gem */}
            <Polygon points="44,85 50,94 56,85 50,81" fill="#EC4899" stroke="#E0F2FE" strokeWidth="1" />
          </Svg>
        </View>
      );

    // =========================================================================
    // 🟡 10. MYTHIC: Nhà Vô Địch Tuyệt Đối (God-King Dragon Sovereign)
    // =========================================================================
    case 'mythic-god-king-dragon':
      return (
        <View style={[styles.svgOverlay, { width: size, height: size }]}>
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="godGold" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#FFFBEB" />
                <Stop offset="30%" stopColor="#FDE047" />
                <Stop offset="70%" stopColor="#F59E0B" />
                <Stop offset="100%" stopColor="#78350F" />
              </LinearGradient>
              <LinearGradient id="godRed" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#EF4444" />
                <Stop offset="100%" stopColor="#991B1B" />
              </LinearGradient>
              <RadialGradient id="godAura" cx="50%" cy="50%" r="50%">
                <Stop offset="40%" stopColor="#FBBF24" stopOpacity="0.6" />
                <Stop offset="80%" stopColor="#F59E0B" stopOpacity="0.3" />
                <Stop offset="100%" stopColor="#78350F" stopOpacity="0" />
              </RadialGradient>
            </Defs>

            {/* Glowing Double Radiant Aura */}
            <Circle cx="50" cy="50" r="48" fill="url(#godAura)" />

            {/* Huge 3D Sweeping Golden Dragon Wings Left */}
            <Path
              d="M 18,50 C 3,32 8,12 30,18 C 20,28 22,40 28,47 Z"
              fill="url(#godGold)"
              stroke="#78350F"
              strokeWidth="1"
            />
            <Path
              d="M 13,62 C 1,47 9,35 26,40 C 19,47 20,55 26,59 Z"
              fill="#FBBF24"
              stroke="#92400E"
              strokeWidth="0.7"
            />

            {/* Huge 3D Sweeping Golden Dragon Wings Right */}
            <Path
              d="M 82,50 C 97,32 92,12 70,18 C 80,28 78,40 72,47 Z"
              fill="url(#godGold)"
              stroke="#78350F"
              strokeWidth="1"
            />
            <Path
              d="M 87,62 C 99,47 91,35 74,40 C 81,47 80,55 74,59 Z"
              fill="#FBBF24"
              stroke="#92400E"
              strokeWidth="0.7"
            />

            {/* Heavy Gold Main Ring */}
            <Circle cx="50" cy="50" r="39" fill="none" stroke="url(#godGold)" strokeWidth="5.5" />
            <Circle cx="50" cy="50" r="36.5" fill="none" stroke="#78350F" strokeWidth="1" />
            <Circle cx="50" cy="50" r="42" fill="none" stroke="#FEF08A" strokeWidth="0.8" strokeDasharray="3, 3" />

            {/* 5-SPIRE IMPERIAL ROYAL CROWN */}
            <Path
              d="M 33,17 L 38,5 L 45,13 L 50,2 L 55,13 L 62,5 L 67,17 Z"
              fill="url(#godGold)"
              stroke="#78350F"
              strokeWidth="1"
            />
            <Circle cx="50" cy="8" r="3.2" fill="url(#godRed)" stroke="#FFFFFF" strokeWidth="0.8" />
            <Circle cx="38" cy="11" r="2.2" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="0.5" />
            <Circle cx="62" cy="11" r="2.2" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="0.5" />

            {/* BOTTOM IMPERIAL SHIELD EMBLEM & DRAGON RUBY ORB */}
            <Polygon points="42,85 50,96 58,85 50,88" fill="url(#godGold)" stroke="#78350F" strokeWidth="1" />
            <Circle cx="50" cy="89" r="4.5" fill="url(#godRed)" stroke="#FEF08A" strokeWidth="1" />
            <Circle cx="48.5" cy="87.5" r="1.2" fill="#FFFFFF" />

            {/* Floating Sparkle Stars */}
            <Polygon points="50,18 51.5,21 54.5,21 52,23 53,26 50,24 47,26 48,23 45.5,21 48.5,21" fill="#FFFFFF" />
            <Polygon points="18,50 19.5,52 21.5,52 20,53 20.5,55 18,54 15.5,55 16,53 14.5,52 16.5,52" fill="#FEF08A" />
            <Polygon points="82,50 83.5,52 85.5,52 84,53 84.5,55 82,54 79.5,55 80,53 78.5,52 80.5,52" fill="#FEF08A" />
          </Svg>
        </View>
      );

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  svgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    pointerEvents: 'none',
  },
});

export default CustomSvgFrame;
