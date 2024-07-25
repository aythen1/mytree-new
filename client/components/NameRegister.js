import React, { useCallback, useState } from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Text, TextInput, Modal, Pressable } from 'react-native'

import { Color, FontFamily, FontSize, Border } from '../GlobalStyles'
import PopUpCalendario from './PopUpCalendario'
import Maps from './Maps'

const NameRegister = ({ name, setsetName, text, setText, mail, setMail, birthDate, setBIrthDate, setDataToSend ,dataToSend}) => {

  const [calendario, setCalendario] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const [lugar, setLugar] = useState(false)
  const [location, setLocation] = useState()

  const handleChangeText = (input) => {
    const filteredInput = input.replace(/[^0-9/]/g, '')
    let formattedInput = filteredInput
    if (filteredInput.length === 2 && filteredInput[2] !== '/') {
      formattedInput = filteredInput.slice(0, 2) + '/' + filteredInput.slice(2)
    }
    if (filteredInput.length === 5 && filteredInput[5] !== '/') {
      formattedInput = filteredInput.slice(0, 5) + '/' + filteredInput.slice(5)
    }
    setDataToSend({...dataToSend,["birthDate"]:formattedInput})
  }

  const openCalendario = useCallback(() => {
    setCalendario(true)
  }, [])

  const closeCalendario = useCallback(() => {
    setCalendario(false)
  }, [])

  const openLugar = useCallback(() => {
    setLugar(true)
  }, [])

  const closeLugar = useCallback(() => {
    setLugar(false)
  }, [])
  return (
    <View style={{flex:1,paddingBottom:20}}>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>
          Nombre/s
        </Text>
        <View style={styles.baseBackgroundParent}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIconLayout}
              contentFit="cover"
              source={require('../assets/Icard.png')}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Nombre"
              onChangeText={(nombre)=> setDataToSend({...dataToSend,["username"]:nombre})}
              value={dataToSend.username}
            />
          </View>
        </View>
        
      </View>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>
          Apellido/s
        </Text>
        <View style={styles.baseBackgroundParent}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIconLayout}
              contentFit="cover"
              source={require('../assets/Icard.png')}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Apellido"
              onChangeText={(apellido)=> setDataToSend({...dataToSend,["apellido"]:apellido})}
              value={dataToSend.apellido}
            />
          </View>
        </View>
        
      </View>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>
          Fecha de Nacimiento
        </Text>
        <View style={styles.baseBackgroundParent}>
          <Pressable onPress={()=> setCalendario(true)} style={styles.vectorParent}>
            <Image
              style={styles.vectorIconLayout}
              contentFit="cover"
              source={require('../assets/Cake.png')}
            />
            {/* <TextInput
              keyboardType="numeric"
              placeholder="20/12/1988"
              onChangeText={handleChangeText}
              value={dataToSend.birthDate}
              maxLength={10}
              style={styles.placeholder}
            /> */}
            <Text style={{...styles.placeholder,color:"gray"}}>{dataToSend.birthDate || "20/12/1988"}</Text>
          </Pressable>
        </View>
      </View>
      <Modal animationType="slide" transparent visible={calendario}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(113, 113, 113, 0.3)',
              height: '100%'
            }}
          >
            <Pressable
              style={{ width: '100%', height: '100%', left: 0, top: 0 }}
              onPress={closeCalendario}
            />
            <PopUpCalendario
              setButtonContainer2Visible={() => {}}
              setCalendario={setCalendario}
              selectedDate={dataToSend?.birthDate}
              setSelectedDate={(birt)=> setDataToSend({...dataToSend,["birthDate"]:birt})}
            />
          </View>
        </Modal>
        <Modal animationType="fade" transparent visible={lugar}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(113, 113, 113, 0.3)'
          }}
        >
          <Pressable
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0
            }}
            onPress={() => {
              setLugar(false)
            }}
          />
          <Maps onClose={() => setLugar(false)} setLocation={(c)=> setDataToSend({...dataToSend,["address"]:c})} />
        </View>
      </Modal>
      {/* <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>
        Direccion
        </Text>
        <View style={styles.baseBackgroundParent}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIconLayout}
              contentFit="cover"
              source={require('../assets/vector81.png')}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Direccion"
              onChangeText={(direccion)=> setDataToSend({...dataToSend,["address"]:direccion})}
              value={dataToSend.address}
            />
          </View>
        </View>
        
      </View> */}
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>
          Ciudad
        </Text>
        <View style={styles.baseBackgroundParent}>
          <Pressable onPress={()=> setLugar(true)} style={styles.vectorParent}>
            <Image
              style={styles.vectorIconLayout}
              contentFit="cover"
              source={require('../assets/Buildings.png')}
            />
            {/* <TextInput
              style={styles.placeholder}
              placeholder="Ciudad"
              onChangeText={(ciudad)=> setDataToSend({...dataToSend,["city"]:ciudad})}
              value={dataToSend.city}
            /> */}
            <Text style={{...styles.placeholder,color:"gray"}}>{dataToSend.address || "Ciudad"}</Text>
          </Pressable>
        </View>
        
      </View>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>Teléfono</Text>
        <View style={styles.baseBackgroundParent}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require('../assets/group4.png')}
            />
            <TextInput
              keyboardType="numeric"
              placeholder=" ( 00 ) 1234 5678"
              style={styles.placeholder}
              onChangeText={(phone)=> setDataToSend({...dataToSend,["phone"]:phone})}
              value={dataToSend.phone}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>Email</Text>
        <View style={styles.baseBackgroundParent}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIcon2}
              contentFit="contain"
              source={require('../assets/mailto.png')}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Email"
              onChangeText={(email)=> setDataToSend({...dataToSend,["email"]:email})}
              value={dataToSend.email}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>
          Contraseña
        </Text>
        <View style={styles.baseBackgroundParent}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIconLayout}
              contentFit="cover"
              source={require('../assets/Key.png')}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Contraseña"
              onChangeText={(password)=> setDataToSend({...dataToSend,["password"]:password})}
              value={dataToSend.password}
              secureTextEntry={true}

            />
          </View>
        </View>
        
      </View>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>
          Confirmar contraseña
        </Text>
        <View style={styles.baseBackgroundParent}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIconLayout}
              contentFit="cover"
              source={require('../assets/Key.png')}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Contraseña"
              secureTextEntry={true}
              onChangeText={(confirm_password)=> setDataToSend({...dataToSend,["confirm_password"]:confirm_password})}
              value={dataToSend.confirm_password}
            />
          </View>
        </View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  vectorIconLayout: {
    width: 24,
    height: 24
  },
  labelledTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },
  labelled: {
    color: Color.negro,
    textAlign: 'left',
    lineHeight: 41,
    fontWeight: '400',
    fontSize: FontSize.size_base
  },
  vectorIcon: {
    height: 26,
    width: 18
  },
  vectorIcon2: {
    width: 26,
    height: 26,
  },
  placeholder: {
    fontSize: FontSize.size_base,
    lineHeight: 24,
    display: 'flex',
    width: 211,
    marginLeft: 16,
    color: Color.negro,
    textAlign: 'left',
    height: 24,
    alignItems: 'center'
  },
  vectorParent: {
    flexDirection: 'row',
    padding: 10,
    borderStyle: 'solid',
    shadowColor: 'rgba(244, 105, 76, 0.3)',
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2
  },
  baseBackgroundParent: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    marginTop: 5,
    marginBottom: 5
  }
})

export default NameRegister
