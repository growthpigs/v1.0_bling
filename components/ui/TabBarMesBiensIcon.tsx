import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface TabBarIconProps {
  color: string;
  size?: number;
}

export default function TabBarMesBiensIcon({ color, size = 24 }: TabBarIconProps) {
  // Using standard 24x24 viewBox
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Extracted house path from SVG 132:1217, adjusted coordinates assuming 24x24 target */}
      {/* NOTE: Coordinates might need fine-tuning if aspect ratio differs significantly */}
      {/* Using stroke={color} based on original SVG */}
      <Path
        d="M1 11.0927C1 10.4254 1.33291 9.80197 1.88742 9.43073L8.88742 4.74478C9.56073 4.29409 10.4393 4.29409 11.1126 4.74478L18.1126 9.43073C18.6671 9.80197 19 10.4254 19 11.0927V21C19 22.1046 18.1046 23 17 23H3C1.89543 23 1 22.1046 1 21V11.0927Z" // Simplified/adjusted path based on visual and coordinates
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round" // From original SVG
        // fill={color} // Alternatively, fill if you want a solid house
      />
       {/* Removed the inner heart path and text element from original */}
    </Svg>
  );
}