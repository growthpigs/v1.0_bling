import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface TabBarIconProps {
  color: string;
  size?: number; // Default size handled by viewBox aspect ratio if not provided
}

export default function TabBarWishlistIcon({ color, size }: TabBarIconProps) {
  // Change default size to 28
  const iconSize = size || 28;
  // Adjust height based on new default and viewBox
  const iconHeight = iconSize * (22/24);

  return (
    <Svg width={iconSize} height={iconHeight} viewBox="0 0 24 22" fill="none">
      <Path
        d="M3.54114 3.45779C1.37517 5.62376 1.37517 9.13549 3.54114 11.3015L11.9422 19.7026L12 19.6448L12.0578 19.7026L20.4589 11.3015C22.6249 9.13556 22.6249 5.62383 20.4589 3.45786C18.2929 1.29189 14.7812 1.29189 12.6152 3.45786L12.3536 3.71949C12.1584 3.91475 11.8418 3.91475 11.6465 3.71949L11.3848 3.45779C9.21884 1.29182 5.70711 1.29182 3.54114 3.45779Z"
        stroke={color} // Use color prop for stroke
        strokeWidth="2"
      />
    </Svg>
  );
}