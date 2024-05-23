import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Pressable
} from 'react-native'
import { Image } from 'expo-image'
import { FontSize, FontFamily, Color, Border } from '../../GlobalStyles'
import SingleComment from '../SingleComment'
import { useDispatch } from 'react-redux'
import { postComment } from '../../redux/actions/comments'
import { Context } from '../../context/Context'

const CommentsModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const { userData, selectedPost } = useContext(Context)
  const [search, setSearch] = useState('')
  const [comment, setComment] = useState('')
  const images = [
    require('../../assets/emoji1.png'),
    require('../../assets/emoji2.png'),
    require('../../assets/emoji3.png'),
    require('../../assets/emoji4.png'),
    require('../../assets/emoji5.png'),
    require('../../assets/emoji6.png'),
    require('../../assets/emoji7.png'),
    require('../../assets/emoji8.png'),
    require('../../assets/emoji9.png'),
    require('../../assets/emoji10.png')
  ]
  const hardcodedComments = [
    {
      userName: 'Bruno Pham',
      content: 'Lorem ipsum dolor sit amet consectetur',
      createdAt: new Date(),
      responses: [1, 2, 3, 4, 5],
      likes: [1, 2, 3, 4, 5, 6, 7, 8],
      dislikes: [1, 2, 3, 4, 5, 6, 7, 8],
      profilePic:
        'https://res.cloudinary.com/dnewfuuv0/image/upload/v1716389822/idv5sw3zoyvual6moptl.jpg'
    },
    {
      userName: 'Bruno Pham',
      content: 'Lorem ipsum dolor sit amet consectetur',
      createdAt: new Date(),
      responses: [1, 2, 3, 4, 5],
      likes: [1, 2, 3, 4, 5, 6, 7, 8],
      dislikes: [1, 2, 3, 4, 5, 6, 7, 8],
      profilePic:
        'https://res.cloudinary.com/dnewfuuv0/image/upload/v1716389822/idv5sw3zoyvual6moptl.jpg'
    },
    {
      userName: 'Bruno Pham2',
      content: 'Lorem ipsum dolor sit amet consectetur',
      createdAt: new Date(),
      responses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      likes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      dislikes: [1, 2, 3, 4, 5, 6, 7, 8],
      profilePic:
        'https://res.cloudinary.com/dnewfuuv0/image/upload/v1716389822/idv5sw3zoyvual6moptl.jpg'
    },
    {
      userName: 'Bruno Pham3',
      content:
        'Lorem ipsum dolor sit amet consectetur, lorem ipsum dolor sit amet consectetur',
      createdAt: new Date(),
      responses: [1, 2],
      likes: [1, 2, 3],
      dislikes: [1, 2, 3, 4, 5, 6, 7, 8],
      profilePic:
        'https://res.cloudinary.com/dnewfuuv0/image/upload/v1716389822/idv5sw3zoyvual6moptl.jpg'
    }
  ]

  const handleSendComment = (comment) => {
    dispatch(
      postComment({
        userId: userData.id,
        postId: selectedPost,
        comment: {
          content: comment,
          creatorId: userData.id.toString(),
          responses: [],
          likes: [],
          dislikes: [],
          extraData: {}
        }
      })
    )
  }

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#B7E4C0',
        borderTopRightRadius: Border.br_11xl,
        borderTopLeftRadius: Border.br_11xl,
        position: 'absolute',
        bottom: 0
      }}
    >
      <View
        style={{
          marginTop: 12,
          width: '100%',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 28,
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              marginRight: 5,
              fontWeight: '600'
            }}
          >
            Buscar :
          </Text>
          <TextInput
            style={{
              color: '#fff',
              fontWeight: '600',
              fontSize: 16,
              textAlign: 'left',
              maxWidth: '80%',
              minWidth: '50%'
            }}
            placeholderTextColor={'#fff'}
            placeholder="Tema relacionado"
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
        </View>
        <View
          style={{
            borderColor: '#787878',
            borderTopWidth: 0.5,
            width: '100%',
            height: 0,
            marginTop: 12,
            borderStyle: 'solid'
          }}
        />
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            marginRight: 5,
            fontWeight: '600',
            marginTop: 12
          }}
        >
          438 comentarios
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            maxHeight: 250,
            overflow: 'hidden',
            flexGrow: 1,
            marginTop: 12
          }}
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
            gap: 20
          }}
        >
          {hardcodedComments.map((comment, index) => (
            <SingleComment
              key={index}
              image={comment.profilePic}
              createdAt={comment.createdAt}
              dislikes={comment.dislikes}
              likes={comment.likes}
              comment={comment.content}
              author={comment.userName}
              responses={comment.responses}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          borderColor: '#787878',
          borderTopWidth: 0.5,
          width: '100%',
          height: 0,
          marginTop: 15,
          borderStyle: 'solid'
        }}
      />
      {/* =============== ICONS & COMMENT TEXTINPUT =============== */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          gap: 8,
          paddingHorizontal: 15
        }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            style={{
              width: (Dimensions.get('screen').width - 102) / 10,
              height: (Dimensions.get('screen').width - 102) / 10
            }}
            contentFit="cover"
            contentPosition={'center'}
            source={image}
          />
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginVertical: 15,
          width: '100%',
          alignItems: 'center',
          gap: 15
        }}
      >
        <Image
          style={{ width: 30, height: 30, borderRadius: 50 }}
          contentFit="cover"
          contentPosition={'center'}
          source={{
            uri: 'https://res.cloudinary.com/dnewfuuv0/image/upload/v1716389822/idv5sw3zoyvual6moptl.jpg'
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: 10,
            width: '80%',
            justifyContent: 'space-between',
            paddingRight: 12,
            alignItems: 'center'
          }}
        >
          <TextInput
            style={{
              color: '#505050',
              fontWeight: 'regular',
              fontSize: 16,
              textAlign: 'left',
              paddingVertical: 7,
              paddingHorizontal: 20,
              maxWidth: '90%'
            }}
            placeholderTextColor={'#bdbdbd'}
            placeholder="Añadir comentario..."
            onChangeText={(text) => setComment(text)}
            value={comment}
          />
          <Pressable
            disabled={comment === ''}
            onPress={() => handleSendComment(comment)}
          >
            <Image
              style={{ width: 20, height: 20 }}
              contentFit="cover"
              contentPosition={'center'}
              source={require('../../assets/send.png')}
            />
          </Pressable>
        </View>
      </View>
      {/* ========================================================= */}
    </View>
  )
}

export default CommentsModal
