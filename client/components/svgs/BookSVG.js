import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable } from 'react-native'
import { Path, Svg } from 'react-native-svg'

const BookSVG = ({ isNavigation }) => {
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
          d="M16.6801 16.4355H8.42871"
          stroke="#7EC18C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.6801 11.9238H8.42871"
          stroke="#7EC18C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11.5783 7.41309H8.42969"
          stroke="#7EC18C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.98242 12.0004C2.98242 20.3248 5.38014 23.1004 12.5721 23.1004C19.7653 23.1004 22.1619 20.3248 22.1619 12.0004C22.1619 3.67599 19.7653 0.900391 12.5721 0.900391C5.38014 0.900391 2.98242 3.67599 2.98242 12.0004Z"
          stroke="#7EC18C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1.11914 7.21973L4.88003 7.21973"
          stroke="#7EC18C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1.11914 16.9141L4.88003 16.9141"
          stroke="#7EC18C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  )
}

export default BookSVG
