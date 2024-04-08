import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { FontSize, FontFamily, Color } from '../../../GlobalStyles'

const BusquedaPublicaciones = () => {
  return (
    <ScrollView
      style={styles.bsquedaPublicaciones}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.image2Parent}>
        <Image
          style={styles.image2Icon}
          contentFit="cover"
          source={require('../../../assets/image-2.png')}
        />
        <Text style={[styles.subeTusRecuerdos, styles.retosTypo]}>
          Sube tus recuerdos y mantente al día de todos tus seres queridos, ¡no
          esperes más!
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bsquedaPublicaciones: {
    flex: 1,
    backgroundColor: Color.white,
    paddingBottom: 50,
    top: '30%'
  },
  image2Icon: {
    width: 120,
    height: 120
  },
  image2Parent: {
    alignItems: 'center'
  },
  subeTusRecuerdos: {
    color: Color.colorDarkgray_100,
    marginTop: 30,
    textAlign: 'center',
    fontSize: FontSize.size_base
  },
  retosTypo: {
    textAlign: 'center',
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato
  }
})

export default BusquedaPublicaciones
