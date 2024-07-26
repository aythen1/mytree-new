import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'
import { Image } from 'expo-image'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Fechas = ({ selectedDate, dates, user }) => {
  const [datesFechas, setDatesFechas] = useState([])
  const { userData ,allUsers } = useSelector((state) => state.users)
  const { userEvents ,userInvitations } = useSelector((state) => state.events)


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
    console.log("cambiaron las cosassss")
  }, [selectedDate ])

  const navigation = useNavigation()


  return (
    <View style={styles.frameGroup}>
      <Text style={styles.title}>Actividad Familiar</Text>

    {datesFechas && datesFechas.map((item,i)=> {
      return (
        <Pressable
        key={i}
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
          <Text numberOfLines={1} style={{...styles.marieContainerTypo}}>
            <Text numberOfLines={1} style={styles.textTypo}>
              {item.creatorId == userData?.id ? 'Yo' : allUsers.find((e)=> e.id === item.creatorId).username}{' '}
            </Text>
          </Text>
            <Text style={styles.cumple28Aos}>{item.title}</Text>
        </View>
      </Pressable>
      )
    })}
    </View>
  )
}

const styles = StyleSheet.create({
  frameGroup: {
    marginTop: 10,
    alignSelf: 'stretch',
    paddingBottom:80,
    paddingHorizontal:10
  },
  title: {
    fontSize: 16,
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
    width: '80%',
    
  },
  marieContainerTypo: {
    textAlign: 'justify',
    lineHeight: 22,
    fontSize: FontSize.size_lg,
  },
  textTypo: {
    color: Color.primario1,
    fontFamily: FontFamily.lato,
    fontWeight: '700',
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
