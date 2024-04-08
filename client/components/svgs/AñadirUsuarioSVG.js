import React from 'react'
import { Path, Svg, Defs, LinearGradient, Stop } from 'react-native-svg'

const AñadirUsuarioSVG = () => {
  return (
    <Svg
      style={{ marginRight: 11 }}
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9 14.3326C13.8802 14.3326 18 15.0722 18 17.9286C18 20.7851 13.8537 21.5 9 21.5C4.11985 21.5 0 20.7593 0 17.904C0 15.0475 4.14507 14.3326 9 14.3326ZM20.3988 6.02632C20.9942 6.02632 21.4775 6.47886 21.4775 7.03389V8.33395H22.9212C23.5155 8.33395 24 8.7865 24 9.34153C24 9.89656 23.5155 10.3491 22.9212 10.3491H21.4775V11.6503C21.4775 12.2053 20.9942 12.6579 20.3988 12.6579C19.8045 12.6579 19.32 12.2053 19.32 11.6503V10.3491H17.8788C17.2833 10.3491 16.8 9.89656 16.8 9.34153C16.8 8.7865 17.2833 8.33395 17.8788 8.33395H19.32V7.03389C19.32 6.47886 19.8045 6.02632 20.3988 6.02632ZM9 0.5C12.3055 0.5 14.9552 2.97206 14.9552 6.05598C14.9552 9.1399 12.3055 11.612 9 11.612C5.69452 11.612 3.04484 9.1399 3.04484 6.05598C3.04484 2.97206 5.69452 0.5 9 0.5Z"
        fill="url(#paint0_linear_3121_56109)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3121_56109"
          x1="24"
          y1="21.5"
          x2="-0.388879"
          y2="21.0382"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E2E57A" />
          <Stop offset="1" stopColor="#7FC08B" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default AñadirUsuarioSVG
