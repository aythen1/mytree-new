import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function BtnProgres({ progress }) {
  const strokeWidth = 2;
  const radius = 47;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 3) * circumference;

  return (
    <Svg
      width={96}
      height={96}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle
        opacity={0.38}
        cx={48}
        cy={48}
        r={radius}
        stroke="#fff"
        strokeWidth={strokeWidth}
      />
      <Circle
        cx={48}
        cy={48}
        r={radius}
        stroke="#292A2B"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 48 48)"
      />
    </Svg>
  );
}

export default BtnProgres;
