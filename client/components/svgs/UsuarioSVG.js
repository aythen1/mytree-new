import React from 'react'
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const UsuarioSVG = ({ picked }) => {
  
   if(picked){
    return ( <Svg
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
      fill="url(#grad)"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0005 15.61C7.6852 15.61 4 16.2461 4 18.7936C4 21.3412 7.66182 22.0001 12.0005 22.0001C16.3159 22.0001 20 21.3629 20 18.8164C20 16.2699 16.3392 15.61 12.0005 15.61Z"
      stroke="#d9d9d9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fill="url(#grad)"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9388 11.9985C14.7707 11.9985 17.066 9.75966 17.066 6.99871C17.066 4.23777 14.7707 2 11.9388 2C9.10692 2 6.81058 4.23777 6.81058 6.99871C6.80101 9.75034 9.08141 11.9891 11.9027 11.9985H11.9388Z"
      stroke="#d9d9d9"
      strokeWidth="1.42857"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>)
    
   } else {
    return <Svg
    width="24"
    height="24"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0005 15.61C7.6852 15.61 4 16.2461 4 18.7936C4 21.3412 7.66182 22.0001 12.0005 22.0001C16.3159 22.0001 20 21.3629 20 18.8164C20 16.2699 16.3392 15.61 12.0005 15.61Z"
      stroke={'#d9d9d9'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9388 11.9985C14.7707 11.9985 17.066 9.75966 17.066 6.99871C17.066 4.23777 14.7707 2 11.9388 2C9.10692 2 6.81058 4.23777 6.81058 6.99871C6.80101 9.75034 9.08141 11.9891 11.9027 11.9985H11.9388Z"
      stroke={'#d9d9d9'}
      strokeWidth="1.42857"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
   }

  
}

export default UsuarioSVG
