import React from 'react';
// Ensure all needed SVG components are imported
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

// Interface for the props, including the color passed by the navigator
interface TabBarIconProps {
  color: string;
  size?: number; // Keep size optional, provide default below
}

// Replace the component body with the new code
export default function TabBarPlusIcon({ color, size }: TabBarIconProps) {
  const iconSize = size || 28; // Use passed size or default to 28

  // ViewBox from SVG: "0 0 22 22"
  return (
    <Svg width={iconSize} height={iconSize} viewBox="0 0 22 22" fill="none">
      <G clipPath="url(#clip0_132_1210)">
        <Path
          d="M4.125 15.8125V17.875H6.1875V19.25H4.125V21.3125H2.75V19.25H0.6875V17.875H2.75V15.8125H4.125ZM10.34 2.55063C10.5325 1.93187 11.385 1.8975 11.6325 2.46812L11.66 2.55063L13.4544 8.54563L19.4494 10.34C20.0406 10.5188 20.0956 11.3025 19.6006 11.5913L19.5319 11.6325L19.4494 11.66L13.4544 13.4544L11.66 19.4494C11.4812 20.0406 10.6975 20.0956 10.4088 19.6006L10.3675 19.5319L10.34 19.4494L8.54563 13.4544L2.55063 11.66C1.9525 11.4812 1.90437 10.6975 2.39937 10.4088L2.46812 10.3675L2.55063 10.34L8.54563 8.54563L10.34 2.55063ZM11 5.1425L9.75562 9.295C9.7276 9.39021 9.67929 9.47822 9.61401 9.55299C9.54874 9.62776 9.46806 9.6875 9.3775 9.72812L9.295 9.75562L5.1425 11L9.295 12.2444C9.45978 12.2947 9.59963 12.4052 9.68688 12.5538L9.72812 12.6225L9.75562 12.705L11 16.8575L12.2444 12.705C12.2947 12.5402 12.4052 12.4004 12.5538 12.3131L12.6225 12.2719L12.705 12.2444L16.8575 11L12.705 9.75562C12.5413 9.70695 12.4017 9.59912 12.3131 9.45312L12.2719 9.37063L12.2444 9.295L11 5.1425ZM19.25 0.6875V2.75H21.3125V4.125H19.25V6.1875H17.875V4.125H15.8125V2.75H17.875V0.6875H19.25Z"
          fill={color} // Use color prop for fill
          strokeWidth="0" // Explicitly set strokeWidth to 0 if only fill is needed
        />
      </G>
      <Defs>
        <ClipPath id="clip0_132_1210">
          <Rect width="22" height="22" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
}