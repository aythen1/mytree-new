import { View, Text, Dimensions, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { Image } from 'expo-image'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { Context } from '../context/Context'

const SingleComment = ({
  image,
  author,
  comment,
  createdAt,
  responses,
  likes,
  dislikes
}) => {
  const { selectedPost } = useContext(Context)

  const handleLike = () => {
    console.log('handling like on post', selectedPost)
  }

  const handleDislike = () => {
    console.log('handling dislike on post', selectedPost)
  }
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 22
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          gap: 20
        }}
      >
        <Image
          style={{ width: 30, height: 30, borderRadius: 50, marginTop: 5 }}
          contentFit="cover"
          contentPosition={'center'}
          source={{ uri: image }}
        />
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 6,
            width: Dimensions.get('screen').width - 100
          }}
        >
          <Text style={{ color: '#787878', fontSize: 12, fontWeight: '500' }}>
            {author}
          </Text>
          <Text
            style={{
              color: '#4F5660',
              fontSize: 14,
              fontWeight: '500',
              marginTop: -7
            }}
          >
            {comment}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: Dimensions.get('screen').width - 92
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}
            >
              <Text
                style={{ color: '#787878', fontSize: 11, fontWeight: '500' }}
              >
                {'1 día'}
              </Text>
              <Text
                style={{ color: '#787878', fontSize: 11, fontWeight: '500' }}
              >
                {'Responder'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20
              }}
            >
              <Pressable
                onPress={handleLike}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5
                }}
              >
                <Ionicons size={17} name="heart-outline" color={'#787878'} />
                <Text
                  style={{ color: '#787878', fontSize: 11, fontWeight: '500' }}
                >
                  {likes?.length}
                </Text>
              </Pressable>
              <Pressable onPress={handleDislike}>
                <AntDesign size={17} color={'#787878'} name="dislike2" />
              </Pressable>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7
            }}
          >
            <View
              style={{
                width: 30,
                borderBottomWidth: 0.5,
                borderBottomColor: '#787878'
              }}
            ></View>
            <Text
              style={{ color: '#787878', fontSize: 11, fontWeight: '500' }}
            >{`Ver ${responses?.length} respuestas`}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default SingleComment
