import React, { useState, useCallback, useEffect } from 'react'
import { Image } from 'expo-image'
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Compartir from '../components/Compartir'
import { Color, FontFamily, FontSize, Border } from '../GlobalStyles'
import HeaderIcons from '../components/HeaderIcons'
import TreeSVG from '../components/svgs/TreeSVG'
import PlusSVG from '../components/svgs/PlusSVG'
import SettingMuroSVG from '../components/svgs/SettingMuroSVG'
import { FontAwesome } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

const CrearLbum = () => {
  const route = useRoute()
  const { userData } = useSelector((state) => state.users)
  const { allPosts } = useSelector((state) => state.posts)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [selectedImage, setSelectedImage] = useState(
    route?.params?.album?.images[0]
  )
  const [vectorIcon1Visible, setVectorIcon1Visible] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    if (allPosts.length > 0 && route.params.album.id) {
      setRelatedPosts(
        allPosts
          .filter((post) => post.user.id === userData.id)
          .filter((post) => post.albums.includes(route.params.album.id))
          .map((post) => post.photos)
          .flat()
      )
    }
    console.log('album id', route.params.album.id)
    console.log('user post')
  }, [])

  const openVectorIcon1 = useCallback(() => {
    setVectorIcon1Visible(true)
  }, [])

  const closeVectorIcon1 = useCallback(() => {
    setVectorIcon1Visible(false)
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)

    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = String(date.getUTCFullYear())

    const formattedDate = `${day}/${month}/${year}`
    return formattedDate
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 110,
          backgroundColor: '#fff'
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.crearLbum}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
              justifyContent: 'space-between'
            }}
          >
            <Image
              style={styles.image6Icon}
              contentFit="cover"
              source={require('../assets/image-6.png')}
            />
            <HeaderIcons
              icons={[<TreeSVG />, <PlusSVG />, <SettingMuroSVG />]}
            />
          </View>
          <View style={styles.backParent}>
            <Pressable
              style={styles.vectorIconLayout}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={[styles.icon2, styles.iconLayout]}
                contentFit="cover"
                source={require('../assets/back4.png')}
              />
            </Pressable>
            <View
              style={[
                styles.bienvenidosAMiLbumConNoeParent,
                styles.parentFlexBox,
                {
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: '100%'
                }
              ]}
            >
              <Text
                // numberOfLines={1}
                // ellipsizeMode="tail"
                style={[
                  styles.bienvenidosAMi,
                  styles.textTypo,
                  { textAlign: 'flex-start' }
                ]}
              >
                {route?.params?.album?.description}
              </Text>
              <Text style={[styles.text, styles.textTypo]}>
                {formatDate(route?.params?.album?.date)}
              </Text>
            </View>
          </View>

          {/* <View style={[styles.crearLbumChild, styles.image6IconPosition]} /> */}
          <View>
            <Image
              style={[
                styles.maskGroupIcon,
                styles.frameParentPosition,
                { borderRadius: 10 }
              ]}
              contentFit="cover"
              source={{ uri: selectedImage }}
            />
            <Pressable style={styles.vector} onPress={openVectorIcon1}>
              <Image
                style={styles.iconLayout}
                contentFit="cover"
                source={require('../assets/vector8.png')}
              />
            </Pressable>
          </View>

          <View
            style={{
              width: '100%',
              flexWrap: 'wrap',
              gap: 5,
              flexDirection: 'row',
              marginTop: 30
            }}
          >
            {route?.params?.album?.images?.map((image, index) => (
              <Pressable onPress={() => setSelectedImage(image)} key={index}>
                <Image
                  style={{
                    height: 80,
                    borderRadius: 3,
                    width: (Dimensions.get('screen').width - 55) / 4
                  }}
                  contentFit="cover"
                  source={{ uri: image }}
                />
                {selectedImage === image && (
                  <FontAwesome
                    style={{ position: 'absolute', top: 2, right: 5 }}
                    size={20}
                    name="bullseye"
                    color={'#1bb523'}
                  />
                )}
              </Pressable>
            ))}
            {relatedPosts.map((img, index) => (
              <Pressable
                onPress={() => setSelectedImage(img)}
                key={index + 99999}
              >
                <Image
                  style={{
                    height: 80,
                    borderRadius: 3,
                    width: (Dimensions.get('screen').width - 55) / 4
                  }}
                  contentFit="cover"
                  source={{ uri: img }}
                />
                {selectedImage === img && (
                  <FontAwesome
                    style={{ position: 'absolute', top: 2, right: 5 }}
                    size={20}
                    name="bullseye"
                    color={'#1bb523'}
                  />
                )}
                <Text
                  style={{
                    position: 'absolute',
                    fontWeight: '700',
                    left: 5,
                    top: 1,
                    color: '#1bb523',
                    fontSize: 14
                  }}
                >
                  D
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal animationType="fade" transparent visible={vectorIcon1Visible}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Pressable
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0
            }}
            onPress={closeVectorIcon1}
          />
          <Compartir onClose={closeVectorIcon1} />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  image6IconPosition: {
    // left: 20,
    // position: 'absolute'
  },
  parentFlexBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  vectorIconLayout: {
    height: 24,
    width: 24
  },
  frameParentPosition: {
    width: '100%'
  },
  maskGroupLayout: {
    height: 80,
    width: 80
  },
  iconLayout: {
    height: '100%',
    width: '100%'
  },
  textTypo: {
    textAlign: 'center',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    lineHeight: 24,
    fontSize: FontSize.size_xl
  },
  image6Icon: {
    // top: 3,
    width: 87,
    height: 55
  },
  iconlylightOutlineplus: {
    marginLeft: 20
  },
  vectorParent: {
    top: 20,
    left: 296,
    flexDirection: 'row',
    position: 'absolute'
  },
  navigationIcon: {
    top: 821,
    left: 0,
    width: 428,
    height: 105,
    position: 'absolute'
  },
  crearLbumChild: {
    // top: 101,
    width: '100%',
    height: 705
  },
  maskGroupIcon: {
    // top: 155,
    marginTop: 15,
    height: 400
  },
  maskGroupIcon2: {
    marginLeft: 5
  },
  maskGroupParent: {
    flexDirection: 'row'
  },
  vectorIcon1Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  vectorIcon1Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  vector: {
    position: 'absolute',
    top: 40,
    right: 30,
    width: 30,
    height: 33
  },
  frameParent: {
    paddingHorizontal: 15,
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row'
  },
  icon2: {
    overflow: 'hidden'
  },
  bienvenidosAMi: {
    fontWeight: '500'
  },
  text: {
    fontWeight: '300',
    marginTop: 20
  },
  bienvenidosAMiLbumConNoeParent: {
    marginLeft: 17
  },
  backParent: {
    // top: 67,
    flexDirection: 'row'
  },
  crearLbum: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: 'hidden',
    width: '100%',
    paddingBottom: 30
    // marginBottom: 200
  }
})

export default CrearLbum
