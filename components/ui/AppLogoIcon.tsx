// components/ui/AppLogoIcon.tsx
import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface AppLogoIconProps {
  size?: number; // Use this to control the size (width/height are equal)
}

// Renders the app logo using the provided full SVG code
// Includes the necessary gradient definitions for color
export default function AppLogoIcon({ size = 50 }: AppLogoIconProps) {
  // Original viewBox is "0 0 650 650" (aspect ratio 1:1)
  const width = size;
  const height = size;

  return (
    <Svg width={width} height={height} viewBox="0 0 650 650" fill="none">
      {/* Path data provided by user */}
      <Path
        d="M549.3 87.5L559.5 58.2L590 48.4L559.5 38.6L549.3 9.29999L539.1 38.6L508.6 48.4L539.1 58.2L549.3 87.5ZM421.9 136.1L443.7 201.5L465.5 136L531 114.2L465.5 92.4L443.7 26.9L421.9 92.4L356.4 114.2L421.9 136V136.1ZM345.8 171.7C329.6 160.7 311.1 159.4 292.5 171.7L197.9 223.7C178.7 234.4 177.2 242.7 177.2 262.5V414.5C177.2 422.8 179.4 430.6 183.2 437.4C191.3 451.7 206.8 461.5 224.5 461.5H413.7C431.4 461.5 446.9 451.8 455 437.4C458.8 430.6 461 422.8 461 414.5V262.5C461 241.8 456.1 233.6 440.4 223.7L345.8 171.7ZM424.7 414.5C424.7 420.5 419.8 425.4 413.7 425.4H224.5C218.4 425.4 213.5 420.5 213.5 414.5V262.5C213.5 258.9 215.3 255.5 218.3 253.5L312.9 201.5C314.8 200.5 316.9 199.6 319.1 199.6C321.3 199.6 323.3 200.3 325.3 201.5L419.9 253.5C422.9 255.5 424.7 258.9 424.7 262.5V414.5ZM581.3 219.6C581.3 192 567.6 166.3 544.7 150.8L517.9 135.4L478.2 148.6L477.4 150.2C494.4 159.7 506.5 166.4 508.7 167.4C512 169 515 170.9 518.1 172.9C545.4 190.4 546.8 194.7 546.8 232.7V463.4C546.8 483.2 537 501.8 522.2 514.5C510.2 524.8 494.9 531.3 478.9 531.3H397.8H361.4C355.3 531.3 349.5 533.8 345.7 538L281.1 595.4L216.5 539C212.7 534.8 206.9 531.3 200.8 531.3H187H163.3C147.5 531.3 132.4 525 120.4 514.9C105.4 502.2 95.4 483.4 95.4 463.4V232.7C95.4 221 95.4 203.5 101.4 193.6C103.8 189.5 105 187.4 112.3 181C125.3 168 262.5 95.4 262.5 95.4L309.7 68.4C313.2 66.4 315.9 64.8 320.7 64.7C326.1 64.6 327.4 66.2 331.7 68.4C331.7 68.4 349.2 78.2 373.1 91.7L409.3 79.6L411.1 74.2L368 49.5C327.8 26 314.8 26.8 273.4 49.5L96.7 150.7C73.8 166.2 60 192 60 219.5V463.4C60 520.3 106.3 566.7 163.3 566.7H185.5C185.5 566.8 191.2 566.8 191.2 566.8L265.5 633.9C272.4 641.6 285.1 642.8 293.7 636.7C294.9 635.9 295.9 635 296.8 633.9L371.1 566.8H402.3C402.3 566.7 478.9 566.7 478.9 566.7C535.8 566.7 582.1 520.4 582.2 463.4V232.7C582.2 228.3 581.9 224 581.4 219.8V219.5L581.3 219.6Z"
        fill="url(#paint0_linear_176_508_app_logo)" // Reference the gradient below
      />
      {/* Gradient Definition */}
      <Defs>
        {/* Added _app_logo suffix to prevent potential ID conflicts */}
        <LinearGradient id="paint0_linear_176_508_app_logo" x1="146.5" y1="98.8" x2="568" y2="520.3" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#07D9FF"/>
          <Stop offset="1" stopColor="#7B36F1"/>
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
