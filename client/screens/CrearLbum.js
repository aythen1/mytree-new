import React, { useState, useCallback } from 'react'
import { Image } from 'expo-image'
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  Modal,
  ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Compartir from '../components/Compartir'
import { Color, FontFamily, FontSize, Border } from '../GlobalStyles'
import HeaderIcons from '../components/HeaderIcons'
import TreeSVG from '../components/svgs/TreeSVG'
import PlusSVG from '../components/svgs/PlusSVG'
import SettingMuroSVG from '../components/svgs/SettingMuroSVG'

const CrearLbum = () => {
  const [vectorIcon1Visible, setVectorIcon1Visible] = useState(false)
  const navigation = useNavigation()

  const openVectorIcon1 = useCallback(() => {
    setVectorIcon1Visible(true)
  }, [])

  const closeVectorIcon1 = useCallback(() => {
    setVectorIcon1Visible(false)
  }, [])

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
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
                styles.parentFlexBox
              ]}
            >
              <Text style={[styles.bienvenidosAMi, styles.textTypo]}>
                Bienvenidos a mi álbum con Noelia
              </Text>
              <Text style={[styles.text, styles.textTypo]}>30/08/2022</Text>
            </View>
          </View>

          {/* <View style={[styles.crearLbumChild, styles.image6IconPosition]} /> */}
          <Image
            style={[styles.maskGroupIcon, styles.frameParentPosition]}
            contentFit="cover"
            source={require('../assets/mask-group12.png')}
          />
          <View style={[styles.frameParent, styles.frameParentPosition]}>
            <View style={styles.maskGroupParent}>
              <Image
                style={styles.maskGroupLayout}
                contentFit="cover"
                source={require('../assets/mask-group13.png')}
              />
              <Image
                style={[styles.maskGroupIcon2, styles.maskGroupLayout]}
                contentFit="cover"
                source={require('../assets/mask-group13.png')}
              />
            </View>
            <Pressable style={styles.vector} onPress={openVectorIcon1}>
              <Image
                style={styles.iconLayout}
                contentFit="cover"
                source={require('../assets/vector8.png')}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent visible={vectorIcon1Visible}>
        <View style={styles.vectorIcon1Overlay}>
          <Pressable style={styles.vectorIcon1Bg} onPress={closeVectorIcon1} />
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
    height: 517
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
    width: 25,
    height: 28
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
