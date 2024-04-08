import React from 'react'
import { Defs, Path, Stop, Svg, LinearGradient } from 'react-native-svg'

const VoiceSVG = () => {
  return (
    <Svg
      width="19"
      height="25"
      viewBox="0 0 19 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M18.3215 10.0442C18.9326 10.0442 19.4286 10.5657 19.4286 11.2108C19.4286 16.4593 15.6578 20.7932 10.8219 21.3753V23.7237C10.8219 24.3676 10.326 24.8902 9.71484 24.8902C9.10261 24.8902 8.60774 24.3676 8.60774 23.7237V21.3753C3.7708 20.7932 0 16.4593 0 11.2108C0 10.5657 0.495983 10.0442 1.1071 10.0442C1.71823 10.0442 2.21421 10.5657 2.21421 11.2108C2.21421 15.568 5.5787 19.1133 9.71484 19.1133C13.8499 19.1133 17.2144 15.568 17.2144 11.2108C17.2144 10.5657 17.7103 10.0442 18.3215 10.0442ZM9.91401 0.5C12.6607 0.5 14.8882 2.84601 14.8882 5.74032V11.3785C14.8882 14.2716 12.6607 16.6188 9.91401 16.6188H9.51434C6.76762 16.6188 4.54123 14.2716 4.54123 11.3785V5.74032C4.54123 2.84601 6.76762 0.5 9.51434 0.5H9.91401Z"
        fill="#7EC18C"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1289_78961"
          x1="19.4286"
          y1="24.8902"
          x2="-0.318446"
          y2="24.6296"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E2E57A" />
          <Stop offset="1" stopColor="#7FC08B" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default VoiceSVG
