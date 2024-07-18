import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'
import { Image } from 'expo-image'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import axiosInstance from '../apiBackend'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'

const Fechas = ({ selectedDate, dates, user }) => {
  const [datesFechas, setDatesFechas] = useState([])
  const { userData ,allUsers } = useSelector((state) => state.users)

console.log(dates,"dates")
  useEffect(() => {
    const searchDate = async () => {
      const nuevasDates = dates.filter((e) => {
        console.log(e.date.slice(0, 10), selectedDate, 'eee')
        const date = e.date.slice(0, 10)
        if (date === selectedDate) return e
      })
      setDatesFechas(nuevasDates)
    }
    searchDate()
  }, [selectedDate, dates])

  const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.frameContainer}
      onPress={() => navigation.navigate('Invitacin',{date:item})}
    >
      <View style={styles.unsplashilip77sbmoeParent}>
        <Image
          style={styles.unsplashilip77sbmoeIcon}
          contentFit="cover"
          source={item.coverImage ? item.coverImage :   require('../assets/unsplashilip77sbmoe.png')}
        />
      
      </View>
      <View style={styles.TextWrapper}>
        <Text style={styles.marieContainerTypo}>
          <Text style={styles.textTypo}>
            {item.creatorId == userData?.id ? 'Yo' : allUsers.find((e)=> e.id === item.creatorId).username}{' '}
          </Text>
          <Text style={styles.cumple28Aos}>{item.title}</Text>
        </Text>
      </View>
    </Pressable>
  )

  return (
    <View style={styles.frameGroup}>
      <Text style={styles.title}>Actividad Familiar</Text>
      <FlatList
        style={{ paddingBottom: 70 }}
        data={datesFechas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    
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
  frameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '5%'
  },
  unsplashilip77sbmoeParent: {
    flexDirection: 'row',
    marginRight:8
  },
  unsplashilip77sbmoeIcon: {
    width: 44,
    height: 44,
    borderRadius:100
  },
  vectorIcon: {
    top: '50%',
    height: 15,
    width: 20
  },
  TextWrapper: {
    width: '80%'
  },
  marieContainerTypo: {
    textAlign: 'justify',
    lineHeight: 22,
    fontSize: FontSize.size_lg
  },
  textTypo: {
    color: Color.primario1,
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  cumple28Aos: {
    color: Color.negro,
    fontFamily: FontFamily.lato
  },
  frameFlexBox: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row'
  }
})

export default Fechas
