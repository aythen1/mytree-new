import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, Border } from '../GlobalStyles'
import CalendarCheckSVG from './svgs/CalendarCheckSVG'

const Eventos = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.frameGroup}>
      <Text style={styles.title}>Eventos</Text>

      <Pressable
        style={styles.boxContainer}
        onPress={() => navigation.navigate('Eventos')}
      >
        <View style={styles.textContainer}>
          <Text style={styles.subTitle}>Fecha especial</Text>
          <Text style={styles.name}>Barbacoa</Text>
        </View>
        <CalendarCheckSVG />
      </Pressable>

      <Pressable
        style={styles.boxContainer}
        onPress={() => navigation.navigate('Eventos')}
      >
        <View style={styles.textContainer}>
          <Text style={styles.subTitle}>Fecha especial</Text>
          <Text style={styles.name}>Pachanga</Text>
        </View>
        <CalendarCheckSVG />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  frameGroup: {
    marginTop: 19,
    alignSelf: 'stretch'
  },
  title: {
    fontSize: 25,
    color: Color.primario1,
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  boxContainer: {
    height: 100,
    borderRadius: Border.br_base,
    backgroundColor: Color.colorWhitesmoke_200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: '10%'
  },
  textContainer: {
    flexDirection: 'column',
    gap: 10
  },
  subTitle: {
    color: Color.primario1,
    fontWeight: '600',
    fontSize: 15
  },
  name: {
    color: Color.gris
  }
})

export default Eventos
