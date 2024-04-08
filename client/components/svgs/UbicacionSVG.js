import React from 'react'
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg'

const UbicacionSVG = () => {
  return (
    <Svg
      style={{ marginRight: 13 }}
      width="21"
      height="29"
      viewBox="0 0 22 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M5.29743 1.40516C8.57472 -0.499088 12.603 -0.465805 15.8496 1.49234C19.0642 3.49037 21.0179 7.05626 20.9999 10.8922C20.9249 14.7029 18.8299 18.285 16.2112 21.0541C14.6997 22.6596 13.0089 24.0792 11.1733 25.2841C10.9842 25.3934 10.7771 25.4666 10.5622 25.5C10.3554 25.4912 10.154 25.4301 9.97613 25.3222C7.17364 23.5119 4.715 21.2011 2.7185 18.5009C1.04788 16.247 0.0987518 13.524 0 10.7016L0.00747933 10.291C0.143883 6.60697 2.13719 3.24139 5.29743 1.40516ZM11.8609 7.55216C10.5286 6.98585 8.99256 7.29352 7.96998 8.33152C6.94739 9.36952 6.63996 10.9331 7.19125 12.2922C7.74253 13.6513 9.04377 14.5378 10.4874 14.5378C11.4332 14.5446 12.3423 14.1657 13.0122 13.4857C13.6821 12.8057 14.0572 11.881 14.0539 10.9176C14.0589 9.44705 13.1932 8.11847 11.8609 7.55216Z"
        fill="url(#paint0_linear_3121_56101)"
      />
      <Path
        opacity="0.4"
        d="M10.5 29C14.6421 29 18 28.3284 18 27.5C18 26.6716 14.6421 26 10.5 26C6.35786 26 3 26.6716 3 27.5C3 28.3284 6.35786 29 10.5 29Z"
        fill="url(#paint1_linear_3121_56101)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3121_56101"
          x1="21"
          y1="25.5"
          x2="-0.343947"
          y2="25.2088"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E2E57A" />
          <Stop offset="1" stopColor="#7FC08B" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_3121_56101"
          x1="18"
          y1="29"
          x2="2.85541"
          y2="27.7455"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E2E57A" />
          <Stop offset="1" stopColor="#7FC08B" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default UbicacionSVG
