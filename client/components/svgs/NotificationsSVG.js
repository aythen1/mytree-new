// import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Defs, Path, Stop, Svg, LinearGradient } from 'react-native-svg'

const NotificationsSVG = () => {
  return (
    <Svg
      style={{ marginRight: 10 }}
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.27084 13.7871V13.5681C1.30297 12.9202 1.51062 12.2925 1.87238 11.7496C2.47452 11.0975 2.88672 10.2983 3.06573 9.43598C3.06573 8.7695 3.06573 8.0935 3.12395 7.42703C3.42471 4.21842 6.5973 2 9.73108 2H9.80869C12.9425 2 16.1151 4.21842 16.4255 7.42703C16.4837 8.0935 16.4255 8.7695 16.474 9.43598C16.6555 10.3003 17.0672 11.1019 17.6674 11.7591C18.0319 12.2972 18.2398 12.9227 18.2689 13.5681V13.7776C18.2906 14.648 17.9908 15.4968 17.4248 16.1674C16.677 16.9515 15.6621 17.4393 14.5724 17.5384C11.377 17.8812 8.15305 17.8812 4.95764 17.5384C3.86916 17.435 2.85578 16.9479 2.10523 16.1674C1.54802 15.4963 1.25226 14.6526 1.27084 13.7871Z"
        stroke="url(#paint0_linear_1289_78349)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.32495 20.8516C7.82423 21.4782 8.55741 21.8838 9.36224 21.9785C10.1671 22.0732 10.9772 21.8493 11.6133 21.3562C11.8089 21.2103 11.985 21.0408 12.1372 20.8516"
        stroke="url(#paint1_linear_1289_78349)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1289_78349"
          x1="18.27"
          y1="17.7955"
          x2="0.993863"
          y2="17.4875"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E2E57A" />
          <Stop offset="1" stopColor="#7FC08B" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1289_78349"
          x1="12.1372"
          y1="21.9998"
          x2="7.2687"
          y2="21.6617"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E2E57A" />
          <Stop offset="1" stopColor="#7FC08B" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default NotificationsSVG
