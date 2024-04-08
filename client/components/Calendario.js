import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Color } from '../GlobalStyles'

const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDayPress = (day) => {
    if (selectedDate === day.dateString) {
      setSelectedDate(null)
    } else {
      setSelectedDate(day.dateString)
    }
  }

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markingType="custom"
        markedDates={{
          [selectedDate]: {
            selected: true,
            customStyles: {
              container: {
                backgroundColor: '#DFE271',
                width: 32,
                height: 32,
                borderRadius: 0
              },
              text: {
                color: 'white'
              }
            }
          }
        }}
        theme={{
          todayTextColor: 'black'
        }}
      />
      <View
        style={{
          paddingHorizontal: 15,
          backgroundColor: Color.white,
          paddingVertical: 15
        }}
      ></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
})

export default Calendario
