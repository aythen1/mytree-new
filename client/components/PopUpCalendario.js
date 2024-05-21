import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Border, Color, FontFamily, FontSize } from '../GlobalStyles'

const PopUpCalendario = ({
  setButtonContainer2Visible,
  setCalendario,
  not,
  selectedDate,
  setSelectedDate
}) => {
  const handleDayPress = (day) => {
    if (selectedDate === day.dateString) {
      setSelectedDate(null)
    } else {
      setSelectedDate(day.dateString)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{borderWidth:0.2,borderRadius:3,borderColor:"gray",width:"90%",alignSelf:"center"}}>
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
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          backgroundColor: Color.white,
          paddingVertical: 15
        }}
      >
        <Pressable
          style={{ borderStartColor: 'red' }}
          onPress={() => {
            !not && setButtonContainer2Visible(true)
            !not && setCalendario(false)
          }}
        >
          <LinearGradient
            style={styles.button}
            locations={[0, 1]}
            colors={['#dee274', '#7ec18c']}
          >
            <Text style={styles.save}>Guardar</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    position: 'absolute',
    bottom: 20,
    borderRadius:30,
    overflow:"hidden",
    backgroundColor:"#FFFF",
    paddingTop:20
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
