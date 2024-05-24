import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { FontFamily, FontSize, Color } from '../GlobalStyles'
import Etiquetados from './Etiquetados'
import EnviarMensajeSVG from '../components/svgs/EnviarMensajeSVG'
import CompartirSVG from '../components/svgs/CompartirSVG'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BACKURL } from '../apiBackend'
import { useFocusEffect } from '@react-navigation/native'
import { Context } from '../context/Context'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../redux/actions/posts'
import { getAllCommentsByPostId } from '../redux/actions/comments'
import { updateSelectedPostComments } from '../redux/slices/comments.slices'

const Posteo = ({ data, padding }) => {
  const {
    setShowShareModal,
    setShowTaggedsModal,
    setShowCommentsModal,
    setSelectedPost,
    setSelectedPostTags
  } = useContext(Context)

  const dispatch = useDispatch()

  return (
    <View
      style={{
        backgroundColor: Color.mytreeClarito,
        left: 0,
        top: padding && padding !== false ? 15 : 5,
        height: 500,
        marginBottom: 30,
        borderRadius: 20,
        marginHorizontal: padding && padding !== false && 15,
        overflow: 'hidden'
      }}
    >
      <ImageBackground
        style={{
          height: 500,
          zIndex: -1000,
          justifyContent: 'flex-end',
          resizeMode: 'cover',
          overflow: 'hidden'
        }}
        source={{ uri: data.photos[0] }}
      >
        <TouchableOpacity
          onPress={() => {
            console.log('settings post tags to: ', data.tags || [])
            setSelectedPostTags(data.tags || [])
            setShowTaggedsModal(true)
          }}
          style={{ position: 'absolute', left: 15, top: 15 }}
        >
          <LinearGradient
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 64,
              height: 64,
              borderRadius: 25,
              zIndex: 0
            }}
            locations={[0, 1]}
            colors={['#7ec18c', '#dee274']}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 59,
                borderRadius: 23,
                backgroundColor: '#c5eacd',
                height: 59
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 53,
                  borderRadius: 23,
                  backgroundColor: '#b7e4c0',
                  height: 53
                }}
              >
                <Image
                  contentFit="cover"
                  style={{ width: 22, height: 16.5, zIndex: 999999999999 }}
                  source={{
                    uri: 'https://res.cloudinary.com/dnewfuuv0/image/upload/v1716419224/bciupv6y3hwccgmtpwoe.png'
                  }}
                />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ gap: 50, position: 'absolute', right: 24, bottom: 100 }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedPost(data.id)
              dispatch(getAllCommentsByPostId(data.id))
              setShowCommentsModal(true)
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require('../assets/iconlyboldchat.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <EnviarMensajeSVG />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowShareModal(true)}>
            <CompartirSVG />
          </TouchableOpacity>
        </View>
        <LinearGradient
          style={{ padding: 15 }}
          end={{ x: 0.5, y: 0 }}
          start={{ x: 0.5, y: 1 }}
          colors={['rgba(0,0,0,0.9)', 'transparent']}
        >
          <Text style={styles.camila}>{data.nameUser}</Text>
          <Text style={styles.yendoALa}>{data.description}</Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

const Post = ({ padding, posts }) => {
  const [showTagged, setShowTagged] = useState(false)
  const [showIcons, setShowIcons] = useState(false)
  const { allPosts } = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  const toggleModal = () => {
    setShowTagged(!showTagged)
  }

  const toggleIcons = () => {
    setShowIcons((prevShowIcons) => !prevShowIcons)
  }
  // const fetchPosts = async () => {
  //   const usuario = await AsyncStorage.getItem('user')
  //   const user = JSON.parse(usuario)
  //   const res = await axios.get(`${BACKURL}/user/${user.id}/posts`)
  //   setPosts(res.data.reverse())
  // }

  useEffect(() => {
    dispatch(getAllPosts()) // Realizar la carga inicial de posts
  }, [])

  // useFocusEffect( // Este hook se ejecutará cada vez que la pantalla obtenga foco
  //   useCallback(() => {
  //     fetchPosts() // Volver a cargar los posts cuando la pantalla obtenga foco
  //   }, [])
  // )
  if (posts?.length === 0)
    return (
      <View style={{ width: '100%', alignItems: 'center', paddingTop: 50 }}>
        <Text style={{ fontSize: 14, fontWeight: 500, color: '#202020' }}>
          No se han encontrado resultados!
        </Text>
      </View>
    )
  return (
    <Pressable style={styles.rectangleParent} onPress={toggleIcons}>
      {posts
        ? posts.map((e, i) => (
            <Posteo padding={padding} data={e} key={i}></Posteo>
          ))
        : allPosts &&
          allPosts.map((e, i) => (
            <Posteo padding={padding} data={e} key={i}></Posteo>
          ))}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  vectorIconLayout: {
    height: 45,
    width: 45,
    left: 60,
    top: 50
  },
  frameChild: {
    backgroundColor: Color.mytreeClarito,
    left: 0,
    top: 15,
    height: 500,
    marginBottom: 30,
    borderRadius: 20,
    marginHorizontal: 15,
    overflow: 'hidden'
  },
  vectorIcon: {
    marginTop: -29,
    marginLeft: -40,
    width: 78,
    left: '50%',
    top: '50%'
  },
  rectangleParent: {
    height: '85%',
    paddingBottom: 5
  },
  camila: {
    fontSize: FontSize.size_5xl,
    color: Color.white,
    fontWeight: '700'
  },
  yendoALa: {
    marginTop: 20,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    color: Color.white
  },
  textContainer: {
    padding: 15,
    top: '35%'
  },
  tagged: {
    borderWidth: 1,
    borderColor: Color.colorLavender_100,
    height: 60,
    width: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    top: 15,
    left: 15
  },
  iconsContainer: {
    left: '5%',
    gap: 50,
    top: '30%'
  },
  iconsContainerEmpty: {
    height: 124
  }
})

export default Post
