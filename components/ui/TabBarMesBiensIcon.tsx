import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface TabBarIconProps {
  color: string;
  size?: number;
}

export default function TabBarMesBiensIcon({ color, size }: TabBarIconProps) {
  // Change default size to 28
  const iconSize = size || 28;
  // Adjust height based on new default and viewBox
  const iconHeight = iconSize * (21/20);

  return (
    <Svg width={iconSize} height={iconHeight} viewBox="0 0 20 21" fill="none">
      <Path
        d="M1 8.09271C1 7.42535 1.33286 6.80197 1.88743 6.43073L8.88743 1.74478C9.56068 1.29409 10.4393 1.29409 11.1126 1.74478L18.1126 6.43073C18.6671 6.80197 19 7.42536 19 8.09271V18C19 19.1046 18.1046 20 17 20H12.7H10.45H8.65H7.3H3C1.89543 20 1 19.1046 1 18V8.09271Z"
        stroke={color} // Use color prop for outer path stroke
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M6.15505 8.57171C5.17052 9.55624 5.17052 11.1525 6.15506 12.137L9.97374 15.9557L9.99999 15.9295L10.0263 15.9557L13.845 12.137C14.8295 11.1525 14.8295 9.55628 13.845 8.57174C12.8604 7.58721 11.2642 7.58721 10.2796 8.57174V8.57174C10.1252 8.72618 9.87479 8.72614 9.72036 8.57171V8.57171C8.73583 7.58718 7.13959 7.58718 6.15505 8.57171Z"
        stroke={color} // Use color prop for inner heart stroke too
        strokeOpacity={0.7} // Make heart slightly less prominent
        strokeWidth="2"
      />
    </Svg>
  );
}