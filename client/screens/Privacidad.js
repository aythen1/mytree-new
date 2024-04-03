import React, { useState } from 'react'
import { Image } from 'expo-image'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Color, FontSize, FontFamily, Padding, Border } from '../GlobalStyles'
import Checkbox from 'expo-checkbox'

const Privacidad = () => {
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)
  const [check3, setCheck3] = useState(false)

  return (
    <View style={styles.privacidad}>
      <View style={styles.frameParent}>
        <View style={[styles.vectorParent, styles.parentFlexBox]}>
          <Image
            style={styles.vectorIcon}
            contentFit="cover"
            source={require('../assets/vector1.png')}
          />
          <Text style={styles.opcionesDePrivacidad}>
            Opciones de privacidad
          </Text>
        </View>
        <View style={styles.vectorGroup}>
          <Image
            style={[styles.frameChild, styles.frameChildLayout]}
            contentFit="cover"
            source={require('../assets/line-78.png')}
          />
          <View style={styles.quinPuedeVerTuPublicacinParent}>
            <Text style={[styles.quinPuedeVer, styles.quinPuedeVerTypo]}>
              ¿Quién puede ver tu publicación?
            </Text>
            <Text style={[styles.loremIpsumDolor, styles.familiaYAmigosTypo]}>
              Lorem ipsum dolor sit amet amet consectetur. Dui dui nullam nullam
              maecenas tempus hac. Viverra sem quis elementum id scelerisque. Ut
              amet sed sit orci justo.
            </Text>
          </View>
          <View style={styles.elegirAudienciaParent}>
            <Text style={[styles.quinPuedeVer2, styles.quinPuedeVerTypo]}>
              Elegir audiencia
            </Text>
            <View style={[styles.checkParent, styles.parentFlexBox]}>
              <View style={styles.check}>
                <Checkbox value={check1} onValueChange={setCheck1} />
              </View>
              <View style={[styles.userParent, styles.parentFlexBox]}>
                <Image
                  style={styles.userIcon}
                  contentFit="cover"
                  source={require('../assets/3-user.png')}
                />
                <Text
                  style={[styles.familiaYAmigos, styles.familiaYAmigosTypo]}
                >
                  Familia y amigos
                </Text>
              </View>
            </View>
            <View style={[styles.checkParent, styles.parentFlexBox]}>
              <View style={styles.check}>
                <Checkbox value={check2} onValueChange={setCheck2} />
              </View>
              <View style={[styles.userParent, styles.parentFlexBox]}>
                <Image
                  style={styles.userIcon}
                  contentFit="cover"
                  source={require('../assets/3-user.png')}
                />
                <Text
                  style={[styles.familiaYAmigos, styles.familiaYAmigosTypo]}
                >
                  Mi círculo
                </Text>
              </View>
            </View>
            <View style={[styles.checkParent, styles.parentFlexBox]}>
              <View style={styles.check}>
                <Checkbox value={check3} onValueChange={setCheck3} />
              </View>
              <View style={[styles.userParent, styles.parentFlexBox]}>
                <Image
                  style={styles.userIcon}
                  contentFit="cover"
                  source={require('../assets/lock.png')}
                />
                <Text
                  style={[styles.familiaYAmigos, styles.familiaYAmigosTypo]}
                >
                  Sólo para mi
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <LinearGradient
        style={[styles.button, styles.parentFlexBox]}
        locations={[0, 1]}
        colors={['#dee274', '#7ec18c']}
      >
        <Text style={styles.signIn}>Guardar</Text>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  parentFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  frameChildLayout: {
    maxHeight: '100%',
    position: 'absolute'
  },
  quinPuedeVerTypo: {
    fontWeight: '500',
    textAlign: 'left'
  },
  familiaYAmigosTypo: {
    color: Color.gris,
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato
  },
  vectorIcon: {
    width: 11,
    height: 16
  },
  opcionesDePrivacidad: {
    fontSize: FontSize.size_lg,
    fontWeight: '600',
    marginLeft: 15,
    textAlign: 'left',
    color: Color.negro,
    fontFamily: FontFamily.lato
  },
  vectorParent: {
    left: 0,
    top: 0,
    position: 'absolute'
  },
  frameChild: {
    left: 0,
    top: 0,
    width: 388
  },
  quinPuedeVer: {
    lineHeight: 19,
    letterSpacing: 0,
    fontWeight: '500',
    fontSize: FontSize.size_base,
    color: Color.negro,
    fontFamily: FontFamily.lato
  },
  quinPuedeVer2: {
    marginTop: 15,
    lineHeight: 19,
    letterSpacing: 0,
    fontWeight: '500',
    fontSize: FontSize.size_base,
    color: Color.negro,
    fontFamily: FontFamily.lato
  },
  loremIpsumDolor: {
    marginTop: 20,
    fontWeight: '500',
    textAlign: 'left',
    width: 388
  },
  quinPuedeVerTuPublicacinParent: {
    top: 20,
    left: 0,
    position: 'absolute',
    width: 388
  },
  checkChild: {
    height: '105%',
    width: '105%',
    top: '-2.5%',
    right: '-2.5%',
    bottom: '-2.5%',
    left: '-2.5%',
    borderRadius: 3,
    borderStyle: 'solid',
    borderColor: Color.colorGainsboro_100,
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: Color.white
  },
  vectorIcon1: {
    height: '34.5%',
    width: '45%',
    top: '35%',
    right: '30%',
    bottom: '30.5%',
    left: '25%',
    maxWidth: '100%',
    overflow: 'hidden'
  },
  check: {
    width: 20,
    height: 20
  },
  userIcon: {
    width: 24,
    height: 24,
    overflow: 'hidden'
  },
  familiaYAmigos: {
    textAlign: 'justify',
    marginLeft: 9
  },
  userParent: {
    marginLeft: 20
  },
  checkParent: {
    marginTop: 20
  },
  elegirAudienciaParent: {
    top: 136,
    left: 0,
    position: 'absolute'
  },
  vectorGroup: {
    top: 42,
    height: 287,
    left: 0,
    position: 'absolute',
    width: 388
  },
  frameParent: {
    height: 329,
    width: 388
  },
  signIn: {
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: 'center',
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
    flex: 1
  },
  button: {
    justifyContent: 'center',
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    marginTop: 40,
    width: '100%',
    borderRadius: Border.br_11xl,
    flexDirection: 'row'
  },
  privacidad: {
    width: '100%',
    padding: Padding.p_xl,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Color.white,
    borderTopRightRadius: Border.br_11xl,
    borderTopLeftRadius: Border.br_11xl
  }
})

export default Privacidad
