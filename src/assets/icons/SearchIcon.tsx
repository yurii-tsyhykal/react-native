import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default () => (
  <Svg width="22" height="22" fill="none" viewBox="0 0 22 22">
    <Path
      stroke="#141B34"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m13 13 2.5 2.5"
    />
    <Path
      stroke="#141B34"
      strokeLinecap="round"
      strokeWidth="1.5"
      d="M15.433 17.525a1.48 1.48 0 1 1 2.092-2.092l3.042 3.042a1.48 1.48 0 1 1-2.092 2.092z"
    />
    <Path
      stroke="#141B34"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M15 8A7 7 0 1 0 1 8a7 7 0 0 0 14 0Z"
    />
  </Svg>
);
