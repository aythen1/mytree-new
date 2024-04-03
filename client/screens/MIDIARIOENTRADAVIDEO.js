import * as React from 'react'
import { StyleSheet, View, Pressable, Text } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { Border, Color } from '../GlobalStyles'

const MIDIARIOENTRADAVIDEO = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.miDiarioEntradaVideo}>
      <View style={[styles.rectangleParent, styles.parentFlexBox]}>
        <View style={styles.frameChild} />

        <Image
          style={[styles.vectorIcon, styles.vectorIconPosition]}
          contentFit="cover"
          source={require('../assets/vector39.png')}
        />
      </View>
      <Pressable
        style={[styles.ellipseParent, styles.parentFlexBox]}
        onPress={() => navigation.navigate('FiltroEdicion')}
      >
        <Image
          style={styles.frameItem}
          contentFit="cover"
          source={require('../assets/ellipse-7165.png')}
        />
        <Image
          style={[styles.frameInner, styles.vectorIconPosition]}
          contentFit="cover"
          source={require('../assets/ellipse-7166.png')}
        />
      </Pressable>
      <Pressable
        style={[styles.wrapper, styles.wrapperPosition]}
        onPress={() => navigation.navigate('MIDIARIOPANTALLAPERSONAL')}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require('../assets/group-68461.png')}
        />
      </Pressable>

      <Image
        style={[styles.iconlyboldimage, styles.iconLayout]}
        contentFit="cover"
        source={require('../assets/iconlyboldimage.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  parentFlexBox: {
    flexDirection: 'row',
    position: 'absolute'
  },
  vectorIconPosition: {
    zIndex: 1,
    position: 'absolute'
  },
  wrapperPosition: {
    left: '4.67%',
    position: 'absolute'
  },
  iconLayout: {
    maxHeight: '100%',
    maxWidth: '100%',
    overflow: 'hidden'
  },
  vectorIcon1Position: {
    bottom: '94.38%',
    maxHeight: '100%',
    maxWidth: '100%',
    position: 'absolute',
    overflow: 'hidden'
  },
  navigationIconLayout: {
    width: 428,
    left: 0
  },
  frameChild: {
    borderRadius: Border.br_5xl,
    backgroundColor: Color.secundario,
    width: '100%',
    height: 904,
    zIndex: 0
  },
  vectorIcon: {
    marginTop: -29,
    marginLeft: -40,
    top: '50%',
    width: 78,
    height: 63,
    left: '50%'
  },
  rectangleParent: {
    top: 0,
    width: '100%',
    left: 0,
    height: 926,
    flexDirection: 'row'
  },
  frameItem: {
    width: 100,
    height: 100,
    zIndex: 0
  },
  frameInner: {
    top: 10,
    left: 10,
    width: 80,
    height: 80
  },
  ellipseParent: {
    marginLeft: -49,
    top: 630,
    left: '50%'
  },
  icon: {
    height: '100%',
    width: '100%',
    maxHeight: '100%',
    maxWidth: '100%'
  },
  wrapper: {
    top: '2.59%',
    right: '89.72%',
    bottom: '94.82%',
    width: '5.61%',
    height: '2.59%'
  },
  vectorIcon1: {
    height: '3.35%',
    width: '4.67%',
    top: '2.27%',
    right: '47.66%',
    left: '47.66%'
  },
  iconlylightOutlinesetting: {
    height: '3.46%',
    width: '7.48%',
    top: '2.16%',
    right: '4.67%',
    left: '87.85%'
  },
  iconlyboldimage: {
    height: '4.32%',
    width: '9.35%',
    top: '90.34%',
    right: '85.98%',
    bottom: '11.34%',
    left: '4.67%',
    position: 'absolute'
  },
  navigationIcon: {
    top: 821,
    height: 105,
    position: 'absolute',
    left: 0
  },
  miDiarioEntradaVideo: {
    // borderRadius: Border.br_31xl,
    backgroundColor: Color.white,
    flex: 1,
    overflow: 'hidden',
    height: 926,
    width: '100%'
    // paddingBottom: 50
  }
})

export default MIDIARIOENTRADAVIDEO
