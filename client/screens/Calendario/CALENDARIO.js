import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { Color, FontSize, Padding } from '../../GlobalStyles'
import { setPanel } from '../../redux/slices/panel.slices'
import Calendario from '../../components/Calendario'
import BarraBusqueda from '../../components/BarraBusqueda'
import Fechas from '../../components/Fechas'
import Eventos from '../../components/Eventos'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axiosInstance from '../../apiBackend'

const CALENDARIO = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { showPanel } = useSelector((state) => state.panel)

  const [selectedItem, setSelectedItem] = useState('fechas')
  const [selectedDate, setSelectedDate] = useState('')
  const [user, setUser] = useState({})
  const [dates, setDates] = useState([])

  const handleItemPress = (item) => {
    setSelectedItem(item)
  }

  useEffect(() => {
    // Función para obtener la fecha actual en formato YYYY-MM-DD
    function getCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // El mes es base 0, por eso se suma 1
      const day = String(currentDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    // Establecer la fecha actual como valor por defecto al montar el componente
    setSelectedDate(getCurrentDate());
  }, []); 

  useEffect(() => {
    const searchDate = async () => {
      const user = await AsyncStorage.getItem("user")
      const userpar = JSON.parse(user)
      setUser(userpar)
      const res = await axiosInstance.get(`/events/by-creator/${userpar.id}`)
      console.log(res.data, "las fechas")
      setDates(res.data)
    }
    searchDate()
  }, [selectedDate])
  
 

  const getRoute = () => {
    if (selectedItem === 'fechas') {
      return 'CrearFechaEspecial'
    } else if (selectedItem === 'eventos') {
      return 'CrearEvento'
    }
    return null
  }
  return (
    <ScrollView
      style={styles.calendario3}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topContainer}>
        <Pressable
          style={styles.ionmenu}
         onPress={() => dispatch(setPanel(!showPanel))}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require('../../assets/ionmenu.png')}
          />
        </Pressable>
        <Image
          style={styles.image6Icon}
          contentFit="cover"
          source={require('../../assets/image-6.png')}
        />
      </View>

      <View style={styles.ionmenuParent}>
        <BarraBusqueda navigate={navigation.navigate} route={getRoute()} />
      </View>

      <Calendario dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <View style={styles.frameParent}>
        <View style={styles.upcomingParent}>
          <Pressable
            style={[
              styles.fechasContainer,
              selectedItem === 'eventos' && styles.eventosContainer
            ]}
            onPress={() => {
              handleItemPress('fechas')
            }}
          >
            <Text
              style={[
                styles.fechas,
                selectedItem === 'eventos' && styles.eventos
              ]}
            >
              Fechas
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.eventosContainer,
              selectedItem === 'eventos' && styles.fechasContainer
            ]}
            onPress={() => {
              handleItemPress('eventos')
            }}
          >
            <Text
              style={[
                styles.eventos,
                selectedItem === 'eventos' && styles.fechas
              ]}
            >
              Eventos
            </Text>
          </Pressable>
        </View>
      </View>
      {selectedItem === 'fechas' ? <Fechas user={user} dates={dates} selectedDate={selectedDate} /> : <Eventos dates={dates} selectedDate={selectedDate} />}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  iconLayout: {
    height: 25,
    width: 25
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  icon: {
    overflow: 'hidden'
  },
  ionmenu: {
    width: 26,
    height: 20
  },
  ionmenuParent: {
    flexDirection: 'row'
  },
  upcomingParent: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginTop: '2%',
    height: 50
  },
  TextWrapper: {
    width: '80%'
  },
  frameWrapper: {
    width: 388
  },
  frameParent: {
    alignItems: 'flex-end'
  },
  background: {
    zIndex: 0
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    flex: 1
  },
  calendario3: {
    width: '100%',
    flex: 1,
    backgroundColor: Color.white,
    padding: Padding.p_xl
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 50
  },
  fechasContainer: {
    backgroundColor: '#b7e4c0',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  eventosContainer: {
    backgroundColor: Color.fAFAFA,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  fechas: {
    fontSize: FontSize.size_xl,
    color: Color.white,
    fontWeight: '700'
  },
  eventos: {
    fontSize: FontSize.size_xl,
    color: Color.grisClaro,
    fontWeight: '700'
  }
})

export default CALENDARIO
