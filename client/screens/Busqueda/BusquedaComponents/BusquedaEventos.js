import React from 'react'
import { StyleSheet, View, Pressable, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  Padding,
  Border,
  FontSize,
  FontFamily,
  Color
} from '../../../GlobalStyles'

function BusquedaEventos() {
  const navigation = useNavigation()

  return (
    <ScrollView
      style={styles.notificationParent}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        style={[styles.notification1, styles.pressableBg]}
        locations={[0, 1]}
        colors={['#dee274', '#7ec18c']}
      >
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate('BusquedaRetoSemanal')}
        >
          <View style={styles.notificationInner}>
            <View style={styles.frameParent}>
              <View style={styles.retoSemanal08112023Wrapper}>
                <Text style={styles.retoSemanal}>Evento - 08-11-2023</Text>
              </View>
              <Text style={styles.descubreCulEs}>
                Más información del evento
              </Text>
            </View>
          </View>
        </Pressable>
      </LinearGradient>
      <LinearGradient
        style={[styles.notification1, styles.pressableBg]}
        locations={[0, 1]}
        colors={['#dee274', '#7ec18c']}
      >
        <View style={styles.notificationInner}>
          <View style={styles.frameParent}>
            <View style={styles.retoSemanal08112023Wrapper}>
              <Text style={styles.retoSemanal}>Evento - 06-11-2023</Text>
            </View>
            <Text style={styles.descubreCulEs}>Más información del evento</Text>
          </View>
        </View>
      </LinearGradient>
      <LinearGradient
        style={[styles.notification1, styles.pressableBg]}
        locations={[0, 1]}
        colors={['#dee274', '#7ec18c']}
      >
        <View style={styles.notificationInner}>
          <View style={styles.frameParent}>
            <View style={styles.retoSemanal08112023Wrapper}>
              <Text style={styles.retoSemanal}>Evento - 01-11-2023</Text>
            </View>
            <Text style={styles.descubreCulEs}>Más información del evento</Text>
          </View>
        </View>
      </LinearGradient>
      <LinearGradient
        style={[styles.notification1, styles.pressableBg]}
        locations={[0, 1]}
        colors={['#dee274', '#7ec18c']}
      >
        <View style={styles.notificationInner}>
          <View style={styles.frameParent}>
            <View style={styles.retoSemanal08112023Wrapper}>
              <Text style={styles.retoSemanal}>Evento - 01-11-2023</Text>
            </View>
            <Text style={styles.descubreCulEs}>Más información del evento</Text>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bsqueda1Typo: {
    textAlign: 'left',
    fontWeight: '700'
  },
  tabsFlexBox: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    borderRadius: Border.br_7xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  retosTypo: {
    textAlign: 'center',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    fontFamily: FontFamily.lato
  },
  pressableBg: {
    backgroundColor: Color.linearBoton,
    padding: Padding.p_xl,
    borderRadius: Border.br_3xs,
    flexDirection: 'row'
  },
  retoSemanal: {
    fontSize: FontSize.size_lg,
    color: Color.white,
    lineHeight: 22,
    alignSelf: 'stretch',
    textAlign: 'left',
    fontWeight: '700'
  },
  descubreCulEs: {
    fontWeight: '300',
    textAlign: 'justify',
    marginTop: 10,
    lineHeight: 19,
    fontSize: FontSize.size_base,
    color: Color.fAFAFA
  },
  frameParent: {},
  notificationInner: {
    flexDirection: 'row',
    flex: 1
  },
  pressable: {
    width: '100%'
  },
  notification1: {
    marginTop: 20
  },
  notificationParent: {
    flex: 1,
    top: '10%',
    paddingBottom: 70
  }
})

export default BusquedaEventos
