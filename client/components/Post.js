import React, { useCallback, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  TouchableOpacity
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
import { useFocusEffect } from '@react-navigation/native';

const Posteo = ({ user, desc }) => {
  const [showTagged, setShowTagged] = useState(false)
  const [showIcons, setShowIcons] = useState(false)
  const [posts, setPosts] = useState([])

  const toggleModal = () => {
    setShowTagged(!showTagged)
  }

  const toggleIcons = () => {
    setShowIcons((prevShowIcons) => !prevShowIcons)
  }

  return (
    <LinearGradient
      style={styles.frameChild}
      locations={[0.77, 1]}
      colors={['rgba(183, 228, 192, 0.8)', 'rgba(41, 42, 43, 0.8)']}
    >
      <Image
        style={[styles.vectorIcon, styles.vectorIconLayout]}
        contentFit="cover"
        source={require('../assets/vector39.png')}
      />

      {showIcons ? (
        <View style={styles.iconsContainer}>
          <EnviarMensajeSVG />
          <CompartirSVG />
        </View>
      ) : (
        <View style={styles.iconsContainerEmpty}></View>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.camila}>{user}</Text>
        <Text style={styles.yendoALa}>{desc}</Text>
      </View>
    </LinearGradient>
  )
}

const Post = () => {
  const [showTagged, setShowTagged] = useState(false)
  const [showIcons, setShowIcons] = useState(false)
  const [posts, setPosts] = useState([])

  const toggleModal = () => {
    setShowTagged(!showTagged)
  }

  const toggleIcons = () => {
    setShowIcons((prevShowIcons) => !prevShowIcons)
  }
  const fetchPosts = async () => {
    const usuario = await AsyncStorage.getItem('user')
    const user = JSON.parse(usuario)
    const res = await axios.get(`${BACKURL}/user/${user.id}/posts`)
    console.log(res,"resss")
    setPosts(res.data.reverse())
  }

  useEffect(() => {
    fetchPosts() // Realizar la carga inicial de posts
  }, [])

  useFocusEffect( // Este hook se ejecutará cada vez que la pantalla obtenga foco
    useCallback(() => {
      fetchPosts() // Volver a cargar los posts cuando la pantalla obtenga foco
    }, [])
  )
  return (
    <Pressable style={styles.rectangleParent} onPress={toggleIcons}>
      {posts &&
        posts.map((e, i) => (
          <Posteo desc={e.description} user={e.nameUser} key={i}></Posteo>
        ))}

      {/* <LinearGradient
        style={styles.frameChild}
        locations={[0.77, 1]}
        colors={['rgba(183, 228, 192, 0.8)', 'rgba(41, 42, 43, 0.8)']}
      >
        <TouchableOpacity style={styles.tagged} onPress={toggleModal}>
          <Image
            style={{ width: 30, height: 30 }}
            contentFit="cover"
            source={require('../assets/vector39.png')}
          />
        </TouchableOpacity>

        {showIcons ? (
          <View style={styles.iconsContainer}>
            <EnviarMensajeSVG />
            <CompartirSVG />
          </View>
        ) : (
          <View style={styles.iconsContainerEmpty}></View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.camila}>Camila</Text>
          <Text style={styles.yendoALa}>
            Yendo a la casa de la tía Elisa! Los esperamos allá, familia!
          </Text>
        </View>
      </LinearGradient>
      <LinearGradient
        style={styles.frameChild}
        locations={[0.77, 1]}
        colors={['rgba(183, 228, 192, 0.8)', 'rgba(41, 42, 43, 0.8)']}
      >
        <Image
          style={[styles.vectorIcon, styles.vectorIconLayout]}
          contentFit="cover"
          source={require('../assets/vector39.png')}
        />

        {showIcons ? (
          <View style={styles.iconsContainer}>
            <EnviarMensajeSVG />
            <CompartirSVG />
          </View>
        ) : (
          <View style={styles.iconsContainerEmpty}></View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.camila}>Camila</Text>
          <Text style={styles.yendoALa}>
            Yendo a la casa de la tía Elisa! Los esperamos allá, familia!
          </Text>
        </View>
      </LinearGradient>
      <LinearGradient
        style={styles.frameChild}
        locations={[0.77, 1]}
        colors={['rgba(183, 228, 192, 0.8)', 'rgba(41, 42, 43, 0.8)']}
      >
        <Image
          style={[styles.vectorIcon, styles.vectorIconLayout]}
          contentFit="cover"
          source={require('../assets/vector39.png')}
        />

        {showIcons ? (
          <View style={styles.iconsContainer}>
            <EnviarMensajeSVG />
            <CompartirSVG />
          </View>
        ) : (
          <View style={styles.iconsContainerEmpty}></View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.camila}>Camila</Text>
          <Text style={styles.yendoALa}>
            Yendo a la casa de la tía Elisa! Los esperamos allá, familia!
          </Text>
        </View>
      </LinearGradient> */}

      {showTagged && (
        <Modal
          isVisible={showTagged}
          onRequestClose={toggleModal}
          transparent={true}
        >
          <Etiquetados setShowTagged={setShowTagged} />
        </Modal>
      )}
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
    marginBottom: 30
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
    top: 15
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
