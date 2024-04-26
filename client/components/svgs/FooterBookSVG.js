import React from 'react'
import { Svg, Path, Defs, Stop,LinearGradient } from 'react-native-svg'

const FooterBookSVG = ({ picked }) => {
 if(picked) {
  return <Svg
  width="24"
  height="24"
  viewBox="0 0 23 23"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Defs>
    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <Stop offset="0" stopColor="#7ec18c" />
      <Stop offset="1" stopColor="#dee274" />
    </LinearGradient>
  </Defs>
  <Path
    d="M16.6811 16.4357H8.42969"
    stroke={'url(#grad)'}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLineJoin="round"
  />
  <Path
    d="M16.6811 11.924H8.42969"
    stroke={'url(#grad)'}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLineJoin="round"
  />
  <Path
    d="M11.5783 7.41284H8.42969"
    stroke={'url(#grad)'}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLineJoin="round"
  />
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M2.98291 12.0001C2.98291 20.3245 5.38062 23.1001 12.5726 23.1001C19.7658 23.1001 22.1623 20.3245 22.1623 12.0001C22.1623 3.67575 19.7658 0.900146 12.5726 0.900146C5.38062 0.900146 2.98291 3.67575 2.98291 12.0001Z"
    stroke={'url(#grad)'}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLineJoin="round"
  />
</Svg>
   
  } else {
    return  <Svg
    width="24"
    height="24"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M16.6811 16.4357H8.42969"
      stroke={'#d9d9d9'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLineJoin="round"
    />
    <Path
      d="M16.6811 11.924H8.42969"
      stroke={'#d9d9d9'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLineJoin="round"
    />
    <Path
      d="M11.5783 7.41284H8.42969"
      stroke={'#d9d9d9'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLineJoin="round"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.98291 12.0001C2.98291 20.3245 5.38062 23.1001 12.5726 23.1001C19.7658 23.1001 22.1623 20.3245 22.1623 12.0001C22.1623 3.67575 19.7658 0.900146 12.5726 0.900146C5.38062 0.900146 2.98291 3.67575 2.98291 12.0001Z"
      stroke={'#d9d9d9'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLineJoin="round"
    />
  </Svg>
  }
}

export default FooterBookSVG
