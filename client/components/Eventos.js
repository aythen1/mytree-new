import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, Border } from '../GlobalStyles'
import CalendarCheckSVG from './svgs/CalendarCheckSVG'
import EventCard from './EventCard'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Eventos = ({ search }) => {
  const navigation = useNavigation()
  const { allEvents } = useSelector((state) => state.events)
  const [user, setUser] = useState()
  const [filteredEvents, setFilteredEvents] = useState(allEvents || [])
  useEffect(() => {
    const getUser = async () => {
      const usuario = await AsyncStorage.getItem('user')
      const user = JSON.parse(usuario)
      console.log('user===============', user)
      setUser(user)
    }
    getUser()
  }, [])

  useEffect(() => {
    if (search.length) {
      const actualEvents = [...allEvents]
      setFilteredEvents(
        actualEvents.filter((event) =>
          event.title.toLowerCase().includes(search.toLowerCase())
        )
      )
      return
    } else {
      setFilteredEvents(allEvents)
    }
  }, [search])

  if (user)
    return (
      <View style={styles.frameGroup}>
        <Text style={styles.title}>Eventos</Text>

        {/* <Pressable
        style={{ height: 100,
          borderRadius: Border.br_base,
          backgroundColor: Color.colorWhitesmoke_200,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          marginTop: '10%'}}
        onPress={() => navigation.navigate('Eventos')}
      >
        <View style={{ flexDirection: 'column',
    gap: 10}}>
          <Text style={{color: Color.primario1,
    fontWeight: '600',
    fontSize: 15}}>Fecha especial</Text>
          <Text style={{ color: Color.gris}}>Barbacoa</Text>
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
      </Pressable> */}

        {filteredEvents
          .filter((eve) => eve.creatorId.toString() === user.id.toString())
          .map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
      </View>
    )
}

const styles = StyleSheet.create({
  frameGroup: {
    marginTop: 19,
    alignSelf: 'stretch',
    paddingBottom: 80
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
