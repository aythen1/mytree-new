import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { FontSize, FontFamily, Color, Border } from '../GlobalStyles'

const Compartir = ({ onClose }) => {
  return (
    <View style={styles.compartir}>
      <Text style={[styles.compartirEn, styles.compartirEnPosition]}>
        Compartir en
      </Text>
      <View
        style={[styles.skillIconsinstagramParent, styles.compartirEnPosition]}
      >
        <Image
          style={styles.skillIconsinstagram}
          contentFit="cover"
          source={require('../assets/skilliconsinstagram1.png')}
        />
        <Image
          style={[styles.logoswhatsappIcon, styles.iconSpaceBlock]}
          contentFit="cover"
          source={require('../assets/logoswhatsappicon.png')}
        />
        <Image
          style={[styles.logoswhatsappIcon, styles.iconSpaceBlock]}
          contentFit="cover"
          source={require('../assets/skilliconslinkedin1.png')}
        />
        <Image
          style={[styles.logostiktokIcon, styles.iconSpaceBlock]}
          contentFit="cover"
          source={require('../assets/logostiktokicon1.png')}
        />
        <Image
          style={[styles.logoswhatsappIcon, styles.iconSpaceBlock]}
          contentFit="cover"
          source={require('../assets/deviconfacebook1.png')}
        />
        <Image
          style={[styles.logostiktokIcon, styles.iconSpaceBlock]}
          contentFit="cover"
          source={require('../assets/fa6brandssquarextwitter.png')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  compartirEnPosition: {
    left: '50%',
    position: 'absolute'
  },
  iconSpaceBlock: {
    marginLeft: 30,
    overflow: 'hidden',
    width: 40
  },
  compartirEn: {
    marginLeft: -70,
    top: 20,
    fontSize: FontSize.size_5xl,
    fontWeight: '500',
    fontFamily: FontFamily.lato,
    color: Color.negro,
    textAlign: 'left'
  },
  skillIconsinstagram: {
    overflow: 'hidden',
    width: 40,
    height: 40
  },
  logoswhatsappIcon: {
    height: 40,
    marginLeft: 30
  },
  logostiktokIcon: {
    height: 45
  },
  skillIconsinstagramParent: {
    marginLeft: -195,
    top: 79,
    flexDirection: 'row',
    alignItems: 'center'
  },
  compartir: {
    borderTopLeftRadius: Border.br_11xl,
    borderTopRightRadius: Border.br_11xl,
    width: '100%',
    backgroundColor: Color.white,
    height: 200,
    position: 'absolute',
    bottom: 0
  }
})

export default Compartir
