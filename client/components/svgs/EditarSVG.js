import React from "react";
import { Svg, Path } from "react-native-svg";

const EditarSVG = ({ styles, onColor, clickColor }) => {
  return (
    <Svg
      style={styles}
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M0.332089 18.1002L0.33527 18.1034C0.419635 18.189 0.519967 18.257 0.630498 18.3034C0.741028 18.3498 0.859576 18.3737 0.979326 18.3738C1.08009 18.3737 1.18016 18.357 1.27554 18.3243L6.46857 16.5501L16.4337 6.51382C17.0429 5.90023 17.3851 5.06803 17.385 4.20031C17.385 3.33259 17.0427 2.50042 16.4335 1.88688C15.8242 1.27334 14.9979 0.928673 14.1364 0.928711C13.2748 0.928749 12.4485 1.27349 11.8393 1.88708L1.87425 11.9234L0.112783 17.1533C0.0572973 17.316 0.0484407 17.4911 0.0872291 17.6585C0.126017 17.826 0.210881 17.9791 0.332089 18.1002ZM12.6669 2.72044C13.0571 2.33038 13.585 2.11197 14.1348 2.11304C14.6846 2.1141 15.2116 2.33455 15.6004 2.72612C15.9892 3.11768 16.2081 3.64846 16.2091 4.20221C16.2101 4.75596 15.9933 5.28756 15.606 5.68061L14.2955 7.00039L11.3564 4.04022L12.6669 2.72044ZM2.89489 12.5622L10.5289 4.87358L13.4681 7.83375L5.83403 15.5223L1.38597 17.042L2.89489 12.5622Z"
        fill={clickColor === "personalizada" ? onColor : "white"}
      />
    </Svg>
  );
};

export default EditarSVG;
