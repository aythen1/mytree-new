import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Padding, Border, FontSize, Color, FontFamily } from '../GlobalStyles'

const Novedades = () => {
  const navigation = useNavigation()

  return (
    <ScrollView style={styles.novedades} showsVerticalScrollIndicator={false}>
      <View style={styles.parentPosition}>
        <View style={styles.rectangleParent}>
          <Image
            style={styles.image6Icon}
            contentFit="cover"
            source={require('../assets/image-6.png')}
          />
          <View style={styles.backParent}>
            <Pressable
              style={styles.back}
              onPress={() => navigation.navigate('Muro')}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require('../assets/back.png')}
              />
            </Pressable>
            <Text style={styles.novedades1}>Novedades</Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={[styles.notification, styles.notificationLayout]}>
            <View style={styles.notificationInner}>
              <View style={styles.frameParent}>
                <View style={styles.yaSeEmpiezaARespirarLWrapper}>
                  <Text style={styles.yaSeEmpieza}>
                    Ya se empieza a respirar ... la Navidad!!! - 01/12/2023
                  </Text>
                </View>
                <Text
                  style={[styles.deseasFelicitarEstas, styles.votaLosRetosTypo]}
                >
                  ¿Deseas felicitar estas fiestas a todos tus familiares y
                  amigos? Desde MyTree te lo ponemos fácil, crea una Tarjeta
                  Digital y te la personalizamos. Que tu gente sepa que te
                  acuerdas de ellos!
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.notification1, styles.notificationLayout]}>
            <View style={styles.notificationInner}>
              <View style={styles.frameParent}>
                <View style={styles.yaSeEmpiezaARespirarLWrapper}>
                  <Text style={styles.nuevoRetoFamiliar}>
                    Nuevo Reto Familiar - 08-11-2023
                  </Text>
                </View>
                <Text style={[styles.votaLosRetos, styles.votaLosRetosTypo]}>
                  Vota los Retos Familiares que más te guste y reta a tus
                  familiares
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.notification1, styles.notificationLayout]}>
            <View style={styles.notificationInner}>
              <View style={styles.frameParent}>
                <View style={styles.yaSeEmpiezaARespirarLWrapper}>
                  <Text style={styles.quTeTraemos}>
                    ¿Qué te traemos en la nueva actualización? - 01-11-2023
                  </Text>
                </View>
                <Text style={[styles.votaLosRetos, styles.votaLosRetosTypo]}>
                  Ahora, con MyTree podrás participar en los Retos Familiares.
                  Haz click en el botón + y seleccioná “Acceder a Retos
                  Familiares”, y empieza a divertirte con tu familia!!!!
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  parentPosition: {
    padding: Padding.p_xl
  },
  notificationLayout: {
    padding: Padding.p_xl,
    borderRadius: Border.br_3xs,
    flexDirection: 'row'
  },
  votaLosRetosTypo: {
    fontWeight: '300',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    color: Color.black1,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  yaSeEmpieza: {
    // height: 38,
    textAlign: 'left',
    color: Color.black1,
    fontFamily: FontFamily.lato,
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: 0,
    fontSize: FontSize.size_lg,
    alignSelf: 'stretch'
  },
  yaSeEmpiezaARespirarLWrapper: {
    alignSelf: 'stretch'
  },
  deseasFelicitarEstas: {
    marginTop: 18,
    textAlign: 'left'
  },
  frameParent: {
    flex: 1
  },
  notificationInner: {
    flexDirection: 'row',
    flex: 1
  },
  notification: {
    backgroundColor: Color.secundario
  },
  nuevoRetoFamiliar: {
    textAlign: 'left',
    color: Color.black1,
    lineHeight: 22,
    letterSpacing: 0,
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.lato,
    fontWeight: '700',
    alignSelf: 'stretch'
  },
  votaLosRetos: {
    textAlign: 'justify',
    marginTop: 10
  },
  notification1: {
    backgroundColor: Color.fAFAFA,
    marginTop: 10
  },
  quTeTraemos: {
    lineHeight: 19,
    fontSize: FontSize.size_base,
    height: 38,
    textAlign: 'left',
    color: Color.black1,
    fontFamily: FontFamily.lato,
    fontWeight: '700',
    letterSpacing: 0,
    alignSelf: 'stretch'
  },
  image6Icon: {
    top: 2,
    width: 87,
    height: 55,
    zIndex: 1
  },
  icon: {
    height: '100%'
  },
  back: {
    width: 24,
    height: 24
  },
  novedades1: {
    fontSize: FontSize.size_5xl,
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  backParent: {
    alignItems: 'center',
    gap: 20,
    zIndex: 2,
    flexDirection: 'row',
    top: '2%'
  },
  novedades: {
    flex: 1,
    backgroundColor: Color.white
  },
  bottomContainer: {
    top: '5%'
  }
})

export default Novedades
