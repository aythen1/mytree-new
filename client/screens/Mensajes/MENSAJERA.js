import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, FontSize } from '../../GlobalStyles'
import { Image } from 'expo-image'
import ButtonsMensajeria from '../../components/ButtonsMensajeria'
import Messages from '../../components/Messages'
import BarraBusqueda from '../../components/BarraBusqueda'

const MENSAJERA = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.mensajera}>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require('../../assets/back.png')}
          />
        </Pressable>
        <Text style={styles.videodiarios}>Mensajes / Grupos</Text>
      </View>
      <BarraBusqueda navigate={navigation.navigate} route="CrearGrupo" />
      <View style={styles.bottomContainer}>
        <ButtonsMensajeria />
        <Messages />
      </View>
      <View style={{ borderWidth: 2, width: '100%', flex: 1 }}>
        <View style={{}}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mensajera: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: Color.white
  },
  videodiarios: {
    fontSize: FontSize.size_5xl,
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  container: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 15
  },
  icon: {
    height: 20,
    width: 20
  },
  bottomContainer: {
    marginTop: 40,
    paddingHorizontal: 15
  }
})

export default MENSAJERA
