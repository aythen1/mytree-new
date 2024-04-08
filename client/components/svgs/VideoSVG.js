import React from 'react'
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg'

const VideoSVG = () => {
  return (
    <Svg
      style={{ marginRight: 10 }}
      width="26"
      height="20"
      viewBox="0 0 26 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M13.1612 0.00732422C16.233 0.00732422 18.3777 2.16092 18.3777 5.24721V14.1223C18.3777 17.2086 16.233 19.3622 13.1612 19.3622H5.81517C2.74334 19.3622 0.598633 17.2086 0.598633 14.1223V5.24721C0.598633 2.16092 2.74334 0.00732422 5.81517 0.00732422H13.1612ZM23.3746 3.07698C23.9314 2.78879 24.5846 2.81892 25.116 3.15951C25.6474 3.49879 25.9645 4.08828 25.9645 4.73279V14.6375C25.9645 15.2833 25.6474 15.8715 25.116 16.2108C24.8255 16.3955 24.5009 16.4898 24.1736 16.4898C23.901 16.4898 23.6283 16.4243 23.3733 16.292L21.495 15.3278C20.7999 14.9689 20.3687 14.2484 20.3687 13.448V5.92093C20.3687 5.11923 20.7999 4.39874 21.495 4.04243L23.3746 3.07698Z"
        fill="#7EC18C"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1289_78953"
          x1="25.9645"
          y1="19.3622"
          x2="0.190532"
          y2="18.8025"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E2E57A" />
          <Stop offset="1" stopColor="#7FC08B" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default VideoSVG
