import * as React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Image } from 'expo-image'
import { FontFamily, FontSize, Color, Border, Padding } from '../GlobalStyles'

const Album = () => {
  return (
    <View style={styles.album}>
      <Text style={[styles.lbumDeMi, styles.lbumTypo]}>
        Álbum de mi infancia
      </Text>
      <Image
        style={styles.albumChild}
        contentFit="cover"
        source={require('../assets/line-78.png')}
      />
      <Text style={[styles.lbumDeMi1, styles.lbumTypo]}>
        Álbum de mi adolescencia
      </Text>
      <Image
        style={styles.albumChild}
        contentFit="cover"
        source={require('../assets/line-78.png')}
      />
      <Text style={[styles.lbumDeMi1, styles.lbumTypo]}>Álbum de mi boda</Text>
      <Image
        style={styles.albumChild}
        contentFit="cover"
        source={require('../assets/line-78.png')}
      />
      <Text style={[styles.aadirLbum, styles.lbumTypo]}>+ Añadir álbum</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  lbumTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  lbumDeMi: {
    color: Color.gris,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  albumChild: {
    maxHeight: '100%',
    width: 388,
    marginTop: 20
  },
  lbumDeMi1: {
    marginTop: 20,
    color: Color.gris,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  aadirLbum: {
    color: Color.primario1,
    marginTop: 20,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  album: {
    borderTopRightRadius: Border.br_11xl,
    borderTopLeftRadius: Border.br_11xl,
    backgroundColor: Color.white,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: Padding.p_xl
  }
})

export default Album
