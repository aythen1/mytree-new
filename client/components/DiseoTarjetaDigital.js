import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { FontSize, Color, FontFamily, Border, Padding } from '../GlobalStyles'

const DiseoTarjetaDigital = ({ onClose }) => {
  return (
    <View style={styles.diseoTarjetaDigital}>
      <View style={styles.plantillasParent}>
        <Text style={styles.plantillas}>Plantillas</Text>
        <View style={styles.frameParent}>
          <View style={styles.frameGroup}>
            <View style={styles.rectangleParent}>
              <View style={styles.frameChild} />
              <View
                style={[
                  styles.portraitPhotographyParent,
                  styles.vectorIconLayout
                ]}
              >
                <Text style={styles.portraitPhotography}>PLANTILLA 1</Text>
                <Image
                  style={[styles.vectorIcon, styles.vectorIconLayout]}
                  contentFit="cover"
                  source={require('../assets/vector29.png')}
                />
              </View>
            </View>
            <View style={styles.rectangleGroup}>
              <View style={styles.frameChild} />
              <View
                style={[
                  styles.portraitPhotographyParent,
                  styles.vectorIconLayout
                ]}
              >
                <Text style={styles.portraitPhotography}>PLANTILLA 1</Text>
                <Image
                  style={[styles.vectorIcon, styles.vectorIconLayout]}
                  contentFit="cover"
                  source={require('../assets/vector29.png')}
                />
              </View>
            </View>
          </View>
          <View style={styles.frameContainer}>
            <View style={styles.rectangleParent}>
              <View style={styles.frameChild} />
              <View
                style={[
                  styles.portraitPhotographyParent,
                  styles.vectorIconLayout
                ]}
              >
                <Text style={styles.portraitPhotography}>PLANTILLA 1</Text>
                <Image
                  style={[styles.vectorIcon, styles.vectorIconLayout]}
                  contentFit="cover"
                  source={require('../assets/vector29.png')}
                />
              </View>
            </View>
            <View style={styles.rectangleGroup}>
              <View style={styles.frameChild} />
              <View
                style={[
                  styles.portraitPhotographyParent,
                  styles.vectorIconLayout
                ]}
              >
                <Text style={styles.portraitPhotography}>PLANTILLA 1</Text>
                <Image
                  style={[styles.vectorIcon, styles.vectorIconLayout]}
                  contentFit="cover"
                  source={require('../assets/vector29.png')}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  vectorIconLayout: {
    height: 44,
    position: 'absolute'
  },
  plantillas: {
    fontSize: FontSize.size_xl,
    letterSpacing: 0,
    lineHeight: 24,
    fontWeight: '500',
    color: Color.colorGray_200,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  frameChild: {
    backgroundColor: Color.secundario,
    height: 158,
    zIndex: 0,
    width: 184,
    borderRadius: Border.br_11xl
  },
  portraitPhotography: {
    top: 13,
    left: 0,
    fontSize: FontSize.size_sm,
    lineHeight: 17,
    fontWeight: '700',
    color: Color.white,
    textAlign: 'center',
    position: 'absolute',
    fontFamily: FontFamily.lato
  },
  vectorIcon: {
    marginTop: -22,
    marginLeft: -29.5,
    top: '50%',
    left: '50%',
    width: 55
  },
  portraitPhotographyParent: {
    top: 57,
    left: 51,
    width: 85,
    zIndex: 1
  },
  rectangleParent: {
    width: 184
  },
  rectangleGroup: {
    marginLeft: 20,
    width: 184
  },
  frameGroup: {
    flexDirection: 'row'
  },
  frameContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  frameParent: {
    marginTop: 20
  },
  plantillasParent: {
    alignSelf: 'stretch',
    flex: 1
  },
  diseoTarjetaDigital: {
    backgroundColor: Color.white,
    height: 420,
    position: 'absolute',
    bottom: 0,

    padding: Padding.p_xl,
    // maxWidth: '100%',
    // maxHeight: '100%',
    borderTopRightRadius: Border.br_11xl,
    borderTopLeftRadius: Border.br_11xl
  }
})

export default DiseoTarjetaDigital
