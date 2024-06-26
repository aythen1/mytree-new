import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { FontSize, FontFamily, Color } from '../../../GlobalStyles'

const BusquedaHashtags = () => {
  return (
    <ScrollView
      style={styles.bsquedaPublicaciones}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.image2Parent}>
        <Image
          style={styles.image2Icon}
          contentFit="cover"
          source={require('../../../assets/fontistohashtag.png')}
        />
        <Text style={[styles.subeTusRecuerdos, styles.retosTypo]}>
          Con los hashtags, ¡Organizarás TODO! ¡Comienza ya y haz que todo cobre
          vida!
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bsquedaPublicaciones: {
    flex: 1,
    paddingBottom: 50,
    top: '30%'
  },
  image2Icon: {
    width: 121,
    height: 126
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

export default BusquedaHashtags
