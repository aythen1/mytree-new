import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { Border, Color, FontFamily, FontSize } from '../GlobalStyles'
import { dataYears } from '../utils/dataLocal'

const PopUpCalendario = ({
  setButtonContainer2Visible,
  setCalendario,
  not,
  selectedDate,
  setSelectedDate,
  fromDiary
}) => {
  const [showYearList, setShowYearList] = useState(false)
  const [yearSelect, setYearSelect] = useState(typeof selectedDate == 'string' && selectedDate?.slice(0,4) || new Date().getFullYear())


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

  const getCurrentDate = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0') // El mes es base 0, por eso se suma 1
    const day = String(currentDate.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

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

  
  useEffect(()=>{
 if(!fromDiary){
   setSelectedDate(getCurrentDate())
  } else {
    setSelectedDate(getCurrentDate())
 }
  },[])



  const handleDayPress = (day) => {
    if (fromDiary) {
    

      setSelectedDate(new Date(day.year, day.month - 1, day.day).toISOString())
      setCalendario(false)
      return
    }
    if (selectedDate === day.dateString) {
      setSelectedDate(null)
    } else {
      setSelectedDate(`${yearSelect}${day.dateString.slice(4)}`)
      setCalendario(false)
    }
  }

  const renderHeader = (date) => {
    return (
      <TouchableOpacity onPress={() => setShowYearList(!showYearList)}>
        <Text style={{fontSize:16}}>{`${mm[`${date.getMonth()}`]} ${yearSelect}`}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
    {!showYearList ? (
      <>
        <View
        style={{
          width: '90%',
          alignSelf: 'center'
        }}
      >
        <Calendar
         key={selectedDate + ""} 
          onDayPress={handleDayPress}
          renderHeader={(date) => renderHeader(date)}
          markingType="custom"
          
          markedDates={{
            [selectedDate]: {
              selected: true,
              customStyles: {
                container: {
                  backgroundColor: Color.primario1,
                  width: 32,
                  height: 32,
                  borderRadius: 9
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
      <View
        style={{
          paddingHorizontal: 15,
          backgroundColor: Color.white,
          paddingVertical: 15
        }}
      >
       
      </View>
      </>
    ) : (
      <ScrollView
      style={{
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
          onPress={() => {
            setYearSelect(year)
            setShowYearList(false)
          }}
        >
          <Text style={{ fontWeight: 600, color: 'white' }}>{year}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    position: 'absolute',
    bottom: 20,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#FFFF',
    borderWidth:1,
    borderColor:Color.primario1,
    paddingTop: 20
  },
  save: {
    letterSpacing: 1,
    // flex: 1,
    fontSize: FontSize.size_base,
    textAlign: 'center',
    color: Color.white,
    fontFamily: FontFamily.lato,
    lineHeight: 24
  },
  button: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Border.br_11xl
  }
})

export default PopUpCalendario
