import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { Color } from '../GlobalStyles'

const Calendario = ({ selectedDate, setSelectedDate, dates }) => {
  const [selectedDates, setSelectedDates] = useState([])

  LocaleConfig.locales['es'] = {
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ],
    dayNames: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    today: 'Hoy'
  }

  LocaleConfig.defaultLocale = 'es'

  const handleDayPress = (day) => {
    if (selectedDate === day.dateString) {
      setSelectedDate(null)
    } else {
      setSelectedDate(day.dateString)
    }
  }

  const [markedDates, setMarkedDates] = useState({})

  useEffect(() => {
    const markerDates = {}
    if (Array.isArray(dates)) {
      dates.forEach((date) => {
        markerDates[date.date.slice(0, 10)] = {
          selected: true,
          customStyles: {
            container: {
              backgroundColor: date.type === 'special' ? 'gray' : 'lightblue',
              width: 32,
              height: 32,
              borderRadius: 10
            },
            text: {
              color: 'white'
            }
          }
        }
      })
      setMarkedDates(markerDates)
    }
  }, [dates])

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markingType="custom"
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            customStyles: {
              container: {
                backgroundColor: '#DFE271',
                width: 32,
                height: 32,
                borderRadius: 10
              },
              text: {
                color: 'white'
              }
            }
          }
        }}
        theme={{
          arrowColor: '#7ec18c',
          todayTextColor: 'black'
        }}
      />
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical:15
  }
})

export default Calendario
