import React from 'react';
import { View } from 'react-native';
import Svg, {
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

// This component renders the specific SVG from the Builder.io export
export default function TabBarCentralButton() {
  // SVG dimensions from source file, adjust size if needed
  const size = 70; // Example size, can be adjusted

  return (
    // The TouchableOpacity wrapper is in _layout.tsx, this just returns the visual SVG
    <View>
      <Svg width={size} height={size} viewBox="0 0 78 78" fill="none">
        <Defs>
          {/* Gradients defined in SVG source */}
          <LinearGradient id="paint0_linear_132_1225" x1="4" y1="25.4737" x2="74" y2="52.5263" gradientUnits="userSpaceOnUse">
            <Stop offset="0.0384615" stopColor="#BDA1FF" />
            <Stop offset="0.341346" stopColor="#2594FC" />
            <Stop offset="0.774038" stopColor="#6AD3F5" />
            <Stop offset="0.990385" stopColor="#92E7C8" />
          </LinearGradient>
          <LinearGradient id="paint1_linear_132_1225" x1="48.0028" y1="42.8523" x2="32.2793" y2="27.6579" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#E9FCFF" />
            <Stop offset="0.278846" stopColor="white" />
            <Stop offset="0.447115" stopColor="#D6FAFF" />
            <Stop offset="0.615385" stopColor="white" />
            <Stop offset="1" stopColor="white" />
          </LinearGradient>
          <LinearGradient id="paint2_linear_132_1225" x1="55.5126" y1="51.2024" x2="23.7482" y2="23.4986" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#E9FCFF" />
            <Stop offset="0.278846" stopColor="white" />
            <Stop offset="0.447115" stopColor="#D6FAFF" />
            <Stop offset="0.615385" stopColor="white" />
            <Stop offset="1" stopColor="white" />
          </LinearGradient>
          <LinearGradient id="paint3_linear_132_1225" x1="52.3458" y1="28.077" x2="43.1475" y2="18.7293" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#E9FCFF" />
            <Stop offset="0.278846" stopColor="white" />
            <Stop offset="0.447115" stopColor="#D6FAFF" />
            <Stop offset="0.615385" stopColor="white" />
            <Stop offset="1" stopColor="white" />
          </LinearGradient>
          <LinearGradient id="paint4_linear_132_1225" x1="56" y1="21.9439" x2="51.8841" y2="17.5922" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#E9FCFF" />
            <Stop offset="0.278846" stopColor="white" />
            <Stop offset="0.447115" stopColor="#D6FAFF" />
            <Stop offset="0.615385" stopColor="white" />
            <Stop offset="1" stopColor="white" />
          </LinearGradient>
        </Defs>
        {/* Background rect from source */}
        <Rect x="2" y="2" width="74" height="74" rx="37" fill="url(#paint0_linear_132_1225)" />
        {/* Stroke rect from source */}
        <Rect x="2" y="2" width="74" height="74" rx="37" stroke="white" strokeWidth="4" />
        {/* Paths extracted from source */}
        <Path d="M46.7244 30.853L40.8576 27.6939C39.8526 27.0285 38.7076 26.9441 37.5519 27.6939L31.6851 30.853C30.496 31.5057 30.4036 32.0067 30.4036 33.2088V42.4378C30.4036 42.9418 30.5394 43.4154 30.7768 43.8264C31.2796 44.6977 32.2381 45.2885 33.3367 45.2885H45.0685C46.1677 45.2885 47.1268 44.6977 47.6296 43.8264C47.8671 43.4154 48.0028 42.9418 48.0028 42.4378V33.2088C48.0028 31.9544 47.7003 31.4529 46.7238 30.853H46.7244ZM32.6579 33.2082C32.6579 32.9891 32.7694 32.785 32.9554 32.6612L38.8223 29.5021C38.9376 29.4408 39.0715 29.3867 39.2054 29.3867C39.3393 29.3867 39.4633 29.4317 39.5898 29.5033L45.4566 32.6624C45.642 32.785 45.7517 32.9897 45.7517 33.2095V42.4372C45.7517 42.8021 45.4467 43.099 45.071 43.099H33.3392C32.9641 43.099 32.6585 42.8021 32.6585 42.4372V33.2082H32.6579Z" fill="url(#paint1_linear_132_1225)" />
        
        {/* This path now correctly includes the full data */}
        <Path d="M55.463 30.603C55.4655 28.929 54.6149 27.3668 53.1946 26.4244L51.5318 25.4918L49.0717 26.2951L49.0209 26.391C50.0736 26.966 50.825 27.3728 50.9583 27.436C51.1604 27.5319 51.3514 27.6503 51.5411 27.7693C53.2342 28.8312 53.3192 29.0948 53.3192 31.402V45.4106C53.3192 46.6104 52.711 47.7415 51.794 48.5144C51.0507 49.1404 50.104 49.5321 49.1114 49.5321H44.0859V49.5339H41.8273C41.4491 49.5339 41.0914 49.6826 40.8552 49.9389L36.8483 53.4264L32.8408 50.0002C32.6046 49.7446 32.2475 49.5345 31.8693 49.5327H31.0162H29.545C28.5636 49.5327 27.6268 49.1502 26.8872 48.5363C25.956 47.7634 25.3373 46.6225 25.3373 45.4118V31.4032C25.3373 30.6946 25.3416 29.6291 25.7086 29.0304C25.8599 28.7833 25.9306 28.6546 26.3869 28.2635C27.1947 27.4724 35.6983 23.0674 35.6983 23.0674L38.6264 21.4256C38.8422 21.3066 39.0139 21.2082 39.3059 21.2022C39.6425 21.1955 39.7238 21.2938 39.9872 21.4274C39.9872 21.4274 41.0697 22.0243 42.5558 22.8421L44.7982 22.1099L44.9105 21.7796L42.2377 20.2811C39.7455 18.8512 38.9376 18.904 36.3734 20.2811L25.4154 26.4244C23.9925 27.3674 23.1425 28.929 23.1425 30.603V45.4106C23.1438 48.8678 26.0143 51.6808 29.545 51.6808H30.9189V51.6893H31.271L35.8762 55.7628C36.3058 56.2273 37.0889 56.3026 37.6258 55.931C37.6977 55.8812 37.7628 55.8248 37.8198 55.7628L42.4244 51.6893H44.3612V51.6808H49.1102C52.6403 51.6808 55.5108 48.8684 55.5126 45.4106V31.402C55.5126 31.1373 55.4953 30.8762 55.4624 30.62V30.603H55.463Z" fill="url(#paint2_linear_132_1225)" />
        
        {/* Other paths */}
        <Path d="M46.9346 29.5015L45.5819 25.5276L41.5235 24.2021L45.5819 22.8773L46.9346 18.9028L48.2874 22.8773L52.3458 24.2021L48.2874 25.527L46.9346 29.5015Z" fill="url(#paint3_linear_132_1225)" />
        <Path d="M53.4773 22.5816L52.8468 20.8014L50.9547 20.2076L52.8468 19.6138L53.4773 17.8329L54.1078 19.6138L56 20.2076L54.1078 20.8014L53.4773 22.5822V22.5816Z" fill="url(#paint4_linear_132_1225)" />
      </Svg>
    </View>
  );
}