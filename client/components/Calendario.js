import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal
} from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { Color } from '../GlobalStyles'
import { dataYears } from '../utils/dataLocal'

const Calendario = ({ selectedDate, setSelectedDate, dates }) => {
  const calendarRef = useRef(null) // Añadir referencia al Calendar
  const [selectedDates, setSelectedDates] = useState([])
  const [showYearList, setShowYearList] = useState(false)
  const [displayedYear, setDisplayedYear] = useState(new Date().getFullYear())
  const [displayedMonth, setDisplayedMonth] = useState(new Date().getMonth() + 1) // 1-based month
  const [selectedYear, setSelectedYear] = useState(new Date());





  const mm = [
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
  ]

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

  const getCurrentDate = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    setSelectedDate(getCurrentDate())
  }, [])

  const renderHeader = (date) => {
    return (
      <TouchableOpacity >
        <Text style={{fontSize:16}}>{`${mm[`${date.getMonth()}`]} ${date.getFullYear()}`}</Text>
      </TouchableOpacity>
    )
  }

  const handleYearChange = (year) => {
    const day = new Date()
    const data = day.toISOString().slice(4)
    const newData = new Date(`${year}${data}`)
    const fechaFormateada = newData.toISOString().split('T')[0];
    setSelectedYear(fechaFormateada)
    setShowYearList(false)
  }

  const updateCalendar = (year, month) => {
    setDisplayedYear(year)
    setDisplayedMonth(month)
    const newDate = `${year}-${String(month).padStart(2, '0')}-01T00:00:00.000Z`
    if (calendarRef.current) {
      calendarRef.current.setDate(newDate) // Utiliza setDate para actualizar el calendario
    }
  }

  const handleMonthChange = (month) => {
    setDisplayedMonth(month + 1) // Calendar provides 0-based month, so adjust it
    updateCalendar(displayedYear, month + 1)
  }

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.setDate(selectedYear) // Utiliza setDate para actualizar el calendario
    }
  }, [selectedYear]) // Agrega selectedYear como dependencia adicional

  return (
    <View style={styles.container}>
      <Modal visible={showYearList} transparent>
        <ScrollView
          style={{
            bottom: 0,
            position: 'absolute',
            width: '100%',
            backgroundColor: 'white',
            maxHeight: 260,
            borderTopEndRadius: 30
          }}
          contentContainerStyle={{ alignItems: 'center', gap: 15, paddingVertical: 15 }}
          showsVerticalScrollIndicator={false}
        >
          {dataYears.map((year) => (
            <TouchableOpacity
              style={{ paddingHorizontal: 40, borderRadius: 50, backgroundColor: Color.primario1 }}
              key={year}
              onPress={() => handleYearChange(year)}
            >
              <Text style={{ fontWeight: 600, color: 'white' }}>{year}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>

      <Calendar
        onDayPress={handleDayPress}
        onMonthChange={(month) => handleMonthChange(month.month - 1)}
         // Calendar provides 1-based month
        renderHeader={(date) => renderHeader(date)}
        markingType="custom"
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            customStyles: {
              container: {
                backgroundColor: Color.primario1,
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
        current={selectedYear}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15
  }
})

export default Calendario
