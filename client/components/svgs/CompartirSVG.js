import React from "react";
import { Svg, Path } from "react-native-svg";
import { scaleFont } from "../../screens/utils/funcionEscalable";
const CompartirSVG = () => {
  return (
    <Svg
      width={scaleFont(25)}
      height="34"
      viewBox="0 0 40 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1.42773 32.7147C9.77059 25.5718 11.8277 22.7147 19.9992 22.7147H24.2849V31.2861L38.5706 15.5718L24.2849 1.28613V9.85756H21.4277C7.14202 9.85756 4.28488 24.1433 1.42773 32.7147Z"
        fill="white"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CompartirSVG;
