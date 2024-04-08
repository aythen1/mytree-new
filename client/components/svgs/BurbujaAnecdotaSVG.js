import React from 'react'
import { Svg, Path } from 'react-native-svg'

const BurbujaAnecdotaSVG = ({ onColor, clickColor, styles }) => {
  return (
    <Svg
      style={styles}
      width="27"
      height="24"
      viewBox="0 0 27 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M5.15155 17.5106C5.32022 17.6781 5.44947 17.8803 5.53008 18.1029C5.6107 18.3254 5.64069 18.5628 5.61793 18.7981C5.50372 19.8872 5.2872 20.9635 4.97118 22.0128C7.23805 21.4937 8.62256 20.8925 9.25143 20.5775C9.60812 20.3988 10.0189 20.3564 10.4052 20.4585C11.5125 20.7505 12.6538 20.8975 13.7998 20.8957C20.2933 20.8957 25.1748 16.3839 25.1748 11.2515C25.1748 6.12084 20.2933 1.60736 13.7998 1.60736C7.3063 1.60736 2.4248 6.12084 2.4248 11.2515C2.4248 13.6112 3.42743 15.8004 5.15155 17.5106ZM4.35043 23.7874C3.96542 23.8629 3.57915 23.932 3.1918 23.9947C2.8668 24.0462 2.6198 23.7118 2.74818 23.4129C2.89247 23.0763 3.02471 22.7348 3.14468 22.389L3.14955 22.3729C3.55255 21.2156 3.8808 19.8847 4.00105 18.6454C2.00718 16.6684 0.799805 14.0805 0.799805 11.2515C0.799805 5.03748 6.62055 0 13.7998 0C20.9791 0 26.7998 5.03748 26.7998 11.2515C26.7998 17.4656 20.9791 22.5031 13.7998 22.5031C12.5122 22.5048 11.23 22.3394 9.98593 22.0112C9.14093 22.434 7.32255 23.2039 4.35043 23.7874Z"
        fill={clickColor === 'risas' ? onColor : 'white'}
      />
    </Svg>
  )
}

export default BurbujaAnecdotaSVG
