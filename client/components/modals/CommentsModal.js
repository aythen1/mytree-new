import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  Pressable
} from 'react-native'
import { Image } from 'expo-image'
import { Border, FontFamily } from '../../GlobalStyles'
import SingleComment from '../SingleComment'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCommentsByPostId,
  postComment,
  sendResponseToCommentById,
  updateCommentById
} from '../../redux/actions/comments'
import { Context } from '../../context/Context'
import uuid from 'react-native-uuid'

const CommentsModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const { selectedPostComments } = useSelector((state) => state.comments)
  const [filteredComments, setFilteredComments] = useState(
    selectedPostComments || []
  )
  const { allUsers, userData } = useSelector((state) => state.users)

  const {
    selectedPost,
    setSelectedComment,
    showResponses,
    responseTo,
    sortByDate,
    setResponseTo,
    selectedComment
  } = useContext(Context)
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
  const emojis = ['😳', '😊', '😄', '😍', '😉', '😞', '😢', '😠', '😮', '😑']

  useEffect(() => {
    if (search.length) {
      const actualComments = [...selectedPostComments]
      setFilteredComments(
        actualComments.filter((comment) =>
          comment.content.toLowerCase().includes(search.toLowerCase())
        )
      )
      return
    } else {
      setFilteredComments(selectedPostComments)
    }
  }, [search])

  useEffect(() => {
    if (selectedPostComments) {
      if (search.length) {
        const actualComments = [...selectedPostComments]
        setFilteredComments(
          actualComments.filter((comment) =>
            comment.content.toLowerCase().includes(search.toLowerCase())
          )
        )
        return
      } else {
        setFilteredComments(selectedPostComments)
      }
    }
  }, [selectedPostComments])

  const scrollViewRef = useRef(null)

  const handleSendComment = (comment) => {
    dispatch(
      postComment({
        userId: userData?.id,
        postId: selectedPost,
        comment: {
          content: comment,
          creatorId: userData?.id.toString(),
          responses: [],
          likes: [],
          dislikes: [],
          extraData: {}
        }
      })
    ).then((data) => dispatch(getAllCommentsByPostId(selectedPost)))
    setComment('')
    setSearch('')
    setResponseTo()
    setSelectedComment()
  }

  const handleSendResponse = (responseTo, comment) => {
    console.log(
      'sending',
      comment,
      'to: ',
      responseTo?.username,
      'on commentId:',
      selectedComment
    )
    dispatch(
      sendResponseToCommentById({
        commentId: selectedComment,
        commentData: {
          responses: {
            id: uuid.v1(),
            response: comment,
            creatorId: userData?.id,
            email: userData.email,
            likes: [],
            dislikes: [],
            userName: `${userData?.username} ${userData?.apellido}`,
            createdAt: new Date()
          }
        }
      })
    ).then((res) => {
      dispatch(getAllCommentsByPostId(selectedPost))
      setComment('')
      setSearch('')
      setResponseTo()
      setSelectedComment()
    })
  }

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true })
    }
  }, [selectedPostComments, showResponses])

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
        <Pressable
          onPress={onClose}
          style={{
            width: 60,
            height: 10,
            borderRadius: 50,
            flexDirection: 'row',
            paddingHorizontal: 28,
            backgroundColor: 'white',
            alignItems: 'center'
          }}
        ></Pressable>
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
          {`${selectedPostComments.length} comentarios`}
        </Text>
        {selectedPostComments.length > 0 ? (
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            style={{
              maxHeight: 250,
              overflow: 'hidden',
              flexGrow: 1,
              marginTop: 12,
              width: '100%'
            }}
            contentContainerStyle={{
              width: '100%',
              alignItems: 'center',
              gap: 20
            }}
          >
            {selectedPostComments &&
              filteredComments &&
              sortByDate(filteredComments).map((comment, index) => (
                <SingleComment
                  key={index}
                  commentId={comment?.id}
                  image={
                    allUsers.filter(
                      (user) => user?.id.toString() === comment.creatorId
                    )[0]?.profilePicture
                  }
                  createdAt={comment.createdAt || new Date()}
                  creatorId={comment.creatorId}
                  dislikes={comment.dislikes || []}
                  likes={comment.likes || []}
                  comment={comment.content}
                  author={
                    allUsers.filter(
                      (user) => user?.id.toString() === comment.creatorId
                    )[0]?.username +
                    ' ' +
                    allUsers.filter(
                      (user) => user?.id.toString() === comment.creatorId
                    )[0]?.apellido
                  }
                  responses={comment?.responses || []}
                />
              ))}
          </ScrollView>
        ) : (
          <Text
            style={{
              color: '#404040',
              fontWeight: '400',
              fontSize: 14,
              height: 250,
              paddingTop: 50
            }}
          >
            ¡Esta publicación aún no tiene comentarios!
          </Text>
        )}
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
     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
     {emojis.map((image, index) => (
          <Text key={index}
            onPress={() => {
              setComment(`${comment}😞`)
            }}
            style={{fontSize: 26,
              fontFamily: FontFamily.lato,
              fontWeight: '500',
            
              letterSpacing: 10}}
          >
            {image}
          </Text>
        ))}
     </ScrollView>
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
          source={
            userData.profilePicture
              ? {
                  uri: userData.profilePicture
                }
              : require('../../assets/logoo.png')
          }
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
          {responseTo && (
            <Text
              style={{
                color: '#303030',
                fontWeight: 'regular',
                fontSize: 16,
                textAlign: 'left',
                paddingLeft: 10
              }}
            >
              {'@' + responseTo?.username + responseTo?.apellido}
            </Text>
          )}
          <TextInput
            style={{
              color: '#505050',
              fontWeight: 'regular',
              fontSize: 16,
              zIndex: 9999999,
              textAlign: 'left',
              paddingVertical: 7,
              paddingLeft: responseTo ? 7 : 20,
              paddingRight: 20,
              flex: 1
            }}
            placeholderTextColor={'#bdbdbd'}
            placeholder={responseTo ? '' : 'Añadir comentario...'}
            onChangeText={(text) => {
              console.log('text:', text)
              if (text === '') {
                setResponseTo()
                setSelectedComment()
                setComment(text)
              } else {
                setComment(text)
              }
            }}
            value={comment}
          />
          <Pressable
            disabled={comment === ''}
            onPress={() => {
              if (responseTo) {
                handleSendResponse(responseTo, comment)
              } else {
                handleSendComment(comment)
              }
            }}
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
