import * as React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { FontSize, FontFamily, Color, Padding, Border } from '../GlobalStyles'

const Lugar2 = ({ onClose }) => {
  return (
    <View style={styles.lugar}>
      <View style={styles.frameParent}>
        <View style={styles.frameParent}>
          <View style={styles.header}>
            <View style={styles.searchBar}>
              <Image
                style={styles.iconlylightOutlinesearch}
                contentFit="cover"
                source={require('../assets/iconlylightoutlinesearch2.png')}
              />
              <View style={styles.placeholderInput}>
                <Text style={styles.search}>{`Buscar `}</Text>
              </View>
            </View>
            <View style={styles.iconlylightsendCopyWrapper}>
              <Image
                style={styles.iconlylightsendCopy}
                contentFit="cover"
                source={require('../assets/iconlylightsend-copy1.png')}
              />
            </View>
          </View>
          <Image
            style={styles.rectangleIcon}
            contentFit="cover"
            source={require('../assets/rectangle4.png')}
          />
        </View>
        <Pressable onPress={onClose}>
          <LinearGradient
            style={styles.button}
            locations={[0, 1]}
            colors={['#dee274', '#7ec18c']}
          >
            <Text style={styles.signIn}>Guardar</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  iconlylightOutlinesearch: {
    width: 20,
    height: 20
  },
  search: {
    fontSize: FontSize.size_sm,
    letterSpacing: 0,
    lineHeight: 21,
    fontStyle: 'italic',
    fontWeight: '200',
    fontFamily: FontFamily.nunito,
    color: Color.textPlaceholder,
    textAlign: 'left'
  },
  placeholderInput: {
    marginLeft: 6,
    flex: 1,
    flexDirection: 'row'
  },
  searchBar: {
    backgroundColor: Color.backgroundFieldBackground,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: Padding.p_5xs,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Border.br_11xl
  },
  iconlylightsendCopy: {
    width: 24,
    height: 24
  },
  iconlylightsendCopyWrapper: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.backgroundGreyBackground,
    padding: Padding.p_7xs,
    marginLeft: 16,
    flexDirection: 'row'
  },
  header: {
    width: 424,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_xs,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.white
  },
  rectangleIcon: {
    borderTopLeftRadius: Border.br_9xs,
    borderTopRightRadius: Border.br_9xs,
    borderBottomLeftRadius: Border.br_8xs,
    height: 270,
    marginTop: 8,
    width: 388
  },
  frameParent: {
    alignItems: 'center'
  },
  signIn: {
    fontSize: FontSize.size_base,
    letterSpacing: 1,
    lineHeight: 24,
    fontFamily: FontFamily.lato,
    color: Color.white,
    textAlign: 'center',
    flex: 1
  },
  button: {
    justifyContent: 'center',
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    marginTop: 20,
    width: 388,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Border.br_11xl
  },
  lugar: {
    paddingHorizontal: 2,
    paddingVertical: Padding.p_xl,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Color.white,
    borderTopRightRadius: Border.br_11xl,
    borderTopLeftRadius: Border.br_11xl
  }
})

export default Lugar2
