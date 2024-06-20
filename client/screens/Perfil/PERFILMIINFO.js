import React from 'react'
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native'
import { Image } from 'expo-image'
// import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, Color, Border, FontSize } from '../../GlobalStyles'

const PERFILMIINFO = ({ setSelectedComponent ,usuario}) => {
  const navigation = useNavigation()

  return (
    <ScrollView
      style={styles.perfilMiInfo}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.frameView}>
        <View style={styles.image6Parent}>
          <Image
            style={[styles.skillIconsinstagram, styles.skillLayout]}
            contentFit="cover"
            source={require('../../assets/skilliconsinstagram4.png')}
          />
          <Image
            style={[styles.skillIconslinkedin, styles.skillLayout]}
            contentFit="cover"
            source={require('../../assets/skilliconslinkedin4.png')}
          />
          <Image
            style={[styles.logostiktokIcon, styles.iconLayout]}
            contentFit="cover"
            source={require('../../assets/logostiktokicon3.png')}
          />
          <Image
            style={[styles.skillIconslinkedin, styles.skillLayout]}
            contentFit="cover"
            source={require('../../assets/deviconfacebook4.png')}
          />
        </View>

        <View style={styles.frameParent5}>
          <Pressable style={styles.frameContainer}>
            <Text style={[styles.familiares, styles.text1Typo]}>
              Familiares
            </Text>
            <View style={styles.parent}>
              <Text style={[styles.text1, styles.text1Typo]}>25</Text>
              <View style={styles.ellipseGroup}>
                <Image
                  style={styles.frameInner}
                  contentFit="cover"
                  source={require('../../assets/ellipse-7170.png')}
                />
                <Image
                  style={styles.vectorIcon1}
                  contentFit="cover"
                  source={require('../../assets/vector9.png')}
                />
              </View>
            </View>
          </Pressable>
          <Pressable
            style={styles.amigosParent}
            // onPress={() => navigation.navigate('MISAMIGOS')}
          >
            <Text style={[styles.familiares, styles.text1Typo]}>Amigos</Text>
            <View style={styles.parent}>
              <Text style={[styles.text1, styles.text1Typo]}>5</Text>
              <View style={styles.ellipseGroup}>
                <Image
                  style={styles.frameInner}
                  contentFit="cover"
                  source={require('../../assets/ellipse-7170.png')}
                />
                <Image
                  style={styles.vectorIcon1}
                  contentFit="cover"
                  source={require('../../assets/vector9.png')}
                />
              </View>
            </View>
          </Pressable>
          <View style={styles.amigosParent}>
            <Text style={[styles.logros, styles.text1Typo]}>Logros</Text>
            <View style={styles.parent}>
              <Text style={[styles.text1, styles.text1Typo]}>40 Tree’s</Text>
              <View style={styles.ellipseGroup}>
                <Image
                  style={styles.frameInner}
                  contentFit="cover"
                  source={require('../../assets/ellipse-7170.png')}
                />
                <Image
                  style={styles.vectorIcon1}
                  contentFit="cover"
                  source={require('../../assets/vector9.png')}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.frameParent6}>
        <View style={styles.miInformacinPersonalParent}>
          <Text style={[styles.miInformacinPersonal, styles.miInfoTypo]}>
            Mi información personal
          </Text>
          <Pressable
            style={styles.lock}
            onPress={() => setSelectedComponent('SOLOYO')}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require('../../assets/lock1.png')}
            />
          </Pressable>
        </View>

        <View style={styles.frameParent}>
          <View style={[styles.frameWrapper, styles.frameWrapperFlexBox]}>
            <View style={styles.nombreYApellidosParent}>
              <Text style={[styles.nombreYApellidos, styles.quEsLoTypo1]}>
                Nombre y apellido
              </Text>
              <Text style={[styles.brunoPham1, styles.quEsLoTypo1]}>
              {usuario.username} {usuario.apellido}
              </Text>
            </View>
          </View>
          <View style={[styles.frameWrapper, styles.frameWrapperFlexBox]}>
            <View style={styles.nombreYApellidosParent}>
              <Text style={[styles.nombreYApellidos, styles.quEsLoTypo1]}>
                Fecha y Lugar de Nacimiento
              </Text>
              <Text style={[styles.brunoPham1, styles.quEsLoTypo1]}>
                {usuario.birthDate} - {usuario.address}
              </Text>
            </View>
          </View>
          <View style={[styles.frameWrapper, styles.frameWrapperFlexBox]}>
            <View style={styles.nombreYApellidosParent}>
              <Text style={[styles.nombreYApellidos, styles.quEsLoTypo1]}>
                Ciudad actual de residencia
              </Text>
              <Text style={[styles.brunoPham1, styles.quEsLoTypo1]}>
              {usuario.city}
              </Text>
            </View>
          </View>

          <View style={styles.frameWrapper2}>
            <View style={styles.redesSocialesParent}>
              <Text style={[styles.nombreYApellidos, styles.quEsLoTypo1]}>
                Redes Sociales
              </Text>
              <Text style={[styles.brunoPham1, styles.quEsLoTypo1]}>
                @BrunoPham
              </Text>
            </View>
            <View style={styles.redesSocialesParent}>
              <Text style={[styles.nombreYApellidos, styles.quEsLoTypo1]}>
                Lista de Deseos
              </Text>
              <Text style={[styles.brunoPham1, styles.quEsLoTypo1]}>
                Sin especificar
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  iconLayout: {
    width: 26,
    overflow: 'hidden'
  },
  miInfoTypo: {
    fontWeight: '700',
    fontFamily: FontFamily.lato
  },
  skillLayout: {
    width: 30,
    height: 30,
    overflow: 'hidden'
  },
  text1Typo: {
    color: Color.primary,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato
  },
  frameWrapperFlexBox: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center'
  },
  quEsLoTypo1: {
    fontWeight: '500',
    fontFamily: FontFamily.lato
  },
  icon: {
    height: '100%',
    width: '100%'
  },
  image6Parent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  frameView: {
    alignItems: 'center'
  },
  frameContainer: {
    alignItems: 'flex-end'
  },
  skillIconsinstagram: {
    height: 30
  },
  skillIconslinkedin: {
    height: 30,
    marginLeft: 20
  },
  logostiktokIcon: {
    height: 30,
    marginLeft: 20
  },
  familiares: {
    textAlign: 'left'
  },
  text1: {
    letterSpacing: 0.3,
    textAlign: 'right',
    fontWeight: '800'
  },
  frameInner: {
    width: 35,
    height: 35,
    zIndex: 0
  },
  vectorIcon1: {
    top: 6,
    left: 6,
    zIndex: 1,
    height: 24,
    width: 24,
    position: 'absolute'
  },
  ellipseGroup: {
    marginLeft: 16,
    flexDirection: 'row'
  },
  parent: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  amigosParent: {
    marginLeft: 40,
    alignItems: 'flex-end'
  },
  logros: {
    display: 'flex',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  frameParent5: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal:10,
    width: '100%'
  },
  miInformacinPersonal: {
    fontSize: FontSize.size_5xl,
    width: 266,
    textAlign: 'left',
    color: Color.negro,
    fontFamily: FontFamily.lato
  },
  lock: {
    height: 30,
    width: 24
  },
  miInformacinPersonalParent: {
    flexDirection: 'row',
  justifyContent:"space-between",
  paddingHorizontal: 10,
  paddingVertical: 20,
    alignItems: 'center'
  },
  nombreYApellidos: {
    textAlign: 'left',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    color: Color.negro
  },
  brunoPham1: {
    color: Color.grisGeneral,
    textAlign: 'left',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    marginTop: 10
  },
  nombreYApellidosParent: {
    width: '100%',
    paddingHorizontal:10
  },
  frameWrapper: {
  },
  frameWrapper2: {
    flexDirection: 'row'
  },
  redesSocialesParent: {
    width: '40%',
  paddingHorizontal:10
  },
  // descripcinParent: {
  //   flexDirection: 'row'
  // },
  // quEsLo: {
  //   fontWeight: '500',
  //   fontFamily: FontFamily.lato
  // },
  // compartirConMi: {
  //   fontWeight: '300',
  //   fontFamily: FontFamily.lato,
  //   marginTop: 10
  // },
  // vectorIcon4: {
  //   width: 15,
  //   height: 15,
  //   marginLeft: 20
  // },
  // frameWrapper3: {
  //   height: 64,
  //   marginTop: 20
  // },
  // frameParent8: {
  //   top: 322,
  //   height: 113,
  //   width: 388,
  //   left: 0
  // },
  // lock2: {
  //   width: 12,
  //   marginLeft: 90,
  //   height: 24
  // },
  // hoyMeSiento: {
  //   fontFamily: FontFamily.lato
  // },
  // conGripe: {
  //   fontWeight: '300',
  //   fontFamily: FontFamily.lato
  // },
  // hoyMeSientoContainer: {
  //   width: 347
  // },
  // hoyMeSientoConGripeWrapper: {
  //   width: 334
  // },
  // combinedShapeIcon: {
  //   width: 25,
  //   height: 25,
  //   marginLeft: 20
  // },
  // frameWrapper4: {
  //   height: 82,
  //   marginTop: 20
  // },
  // frameParent10: {
  //   top: 455,
  //   left: 0
  // },
  // espacioDndeLos: {
  //   width: 347,
  //   fontWeight: '300',
  //   fontFamily: FontFamily.lato
  // },
  // frameParent12: {
  //   left: 0
  // },
  frameParent6: {
    width: '100%',
    height: '100%'
  },
  frameParent: {
    gap: 30,
    paddingBottom: 180
  },
  perfilMiInfo: {
    borderRadius: Border.br_31xl,
    flex: 1,
 paddingTop:40,
    backgroundColor: Color.white
  }
})

export default PERFILMIINFO
