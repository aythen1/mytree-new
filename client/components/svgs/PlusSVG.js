import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable } from 'react-native'
import { Path, Svg } from 'react-native-svg'

const PlusSVG = ({ isNavigation }) => {
  const navigation = useNavigation()
  return (
    <Pressable
      onPress={() => isNavigation && navigation.navigate(isNavigation)}
    >
      <Svg
        style={{ marginRight: 10 }}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.2309 0C21.2796 0 24 2.84205 24 7.07163V16.9284C24 21.158 21.2796 24 17.2309 24H6.76912C2.72037 24 0 21.158 0 16.9284V7.07163C0 2.84205 2.72037 0 6.76912 0H17.2309ZM17.2309 1.67442H6.76912C3.67479 1.67442 1.67442 3.792 1.67442 7.07163V16.9284C1.67442 20.208 3.67479 22.3256 6.76912 22.3256H17.2309C20.3263 22.3256 22.3256 20.208 22.3256 16.9284V7.07163C22.3256 3.792 20.3263 1.67442 17.2309 1.67442ZM12 7.06303C12.4621 7.06303 12.8372 7.4381 12.8372 7.90024V11.1516L16.0928 11.1519C16.555 11.1519 16.93 11.5269 16.93 11.9891C16.93 12.4512 16.555 12.8263 16.0928 12.8263L12.8372 12.826V16.0792C12.8372 16.5414 12.4621 16.9164 12 16.9164C11.5379 16.9164 11.1628 16.5414 11.1628 16.0792V12.826L7.90716 12.8263C7.44391 12.8263 7.06995 12.4512 7.06995 11.9891C7.06995 11.5269 7.44391 11.1519 7.90716 11.1519L11.1628 11.1516V7.90024C11.1628 7.4381 11.5379 7.06303 12 7.06303Z"
          fill="#7EC18C"
        />
      </Svg>
    </Pressable>
  )
}

export default PlusSVG
