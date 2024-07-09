import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable, Text } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { Context } from '../../context/Context'

const MessageSVG = ({ color }) => {
  const navigation = useNavigation()
  const { notReaded } = useContext(Context)
  return (
    <Pressable onPress={() => navigation.navigate('MENSAJERA')}>
      {notReaded > 0 && (
        <Text
          style={{
            position: 'absolute',
            borderRadius: 100,
            backgroundColor: '#EB5757',
            borderWidth: 2,
            borderColor: '#fff',
            width: 18,
            height: 18,
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: 1.5,
            color: '#fff',
            alignItems: 'center',
            top: -8,
            right: 3,
            zIndex: 1000,
            fontSize: 10,
            fontWeight: 700
          }}
        >
          {notReaded}
        </Text>
      )}
      <Svg
        style={{ marginRight: 10 }}
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.9798 0C21.697 0 24.5 3.344 24.5 7.77846V16.2314C24.5 18.5009 23.7722 20.5514 22.4494 22.0062C21.2628 23.3095 19.7234 24 17.9977 24H6.99898C5.27656 24 3.73833 23.3108 2.5506 22.0062C1.22781 20.5514 0.5 18.5009 0.5 16.2314V7.77846C0.5 3.344 3.30298 0 7.02019 0H17.9798ZM17.9798 1.84615H7.02019C4.21274 1.84615 2.17442 4.34092 2.17442 7.77846V16.2314C2.17442 18.0074 2.72809 19.5938 3.73274 20.6978C4.59898 21.6517 5.72977 22.1538 7.00233 22.1538H17.9798C17.982 22.1514 17.991 22.1538 17.9977 22.1538C19.2714 22.1538 20.401 21.6517 21.2673 20.6978C22.273 19.5938 22.8256 18.0074 22.8256 16.2314V7.77846C22.8256 4.34092 20.7873 1.84615 17.9798 1.84615ZM19.7391 7.54314C20.0304 7.93822 19.9757 8.51914 19.6174 8.8416L14.6567 13.2871C14.0293 13.8361 13.2792 14.1105 12.5301 14.1105C11.7833 14.1105 11.0388 13.8385 10.4159 13.2945L5.4094 8.84406C5.04884 8.52406 4.99302 7.94191 5.28214 7.5456C5.57349 7.15052 6.10037 7.08775 6.45981 7.40652L11.4619 11.8521C12.0903 12.401 12.9755 12.401 13.6085 11.8471L18.5603 7.40899C18.9197 7.08529 19.4466 7.14683 19.7391 7.54314Z"
          fill={color ? color : '#7EC18C'}
        />
      </Svg>
    </Pressable>
  )
}

export default MessageSVG
