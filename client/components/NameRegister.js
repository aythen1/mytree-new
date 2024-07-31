import React, { useCallback, useState } from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Text, TextInput, Modal, Pressable } from 'react-native'

import { Color, FontFamily, FontSize, Border } from '../GlobalStyles'
import PopUpCalendario from './PopUpCalendario'
import Maps from './Maps'

const NameRegister = ({  setDataToSend ,dataToSend,setError}) => {

  const [calendario, setCalendario] = useState(false)
  const [lugar, setLugar] = useState(false)

  const closeCalendario = useCallback(() => {
    setCalendario(false)
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
              onChangeText={(nombre)=> {setError("");setDataToSend({...dataToSend,["username"]:nombre})}}
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
              onChangeText={(apellido)=> {setError("");setDataToSend({...dataToSend,["apellido"]:apellido})}}
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
      <Modal animationType="fade" transparent visible={calendario}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
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
              setSelectedDate={(birt)=>{ setError("");setDataToSend({...dataToSend,["birthDate"]:birt})}}
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
          <Maps onClose={() => setLugar(false)} setLocation={(c)=> {setError("");setDataToSend({...dataToSend,["address"]:c})}} />
        </View>
      </Modal>
     
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
            maxLength={10}
              keyboardType="numeric"
              placeholder=" ( 00 ) 1234 5678"
              style={styles.placeholder}
              onChangeText={(phone)=> {setError("");setDataToSend({...dataToSend,["phone"]:phone})}}
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
              onChangeText={(email)=> {setError("");setDataToSend({...dataToSend,["email"]:email})}}
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
              onChangeText={(password)=> {setError("");setDataToSend({...dataToSend,["password"]:password})}}
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
              onChangeText={(confirm_password)=> {setError("");setDataToSend({...dataToSend,["confirm_password"]:confirm_password})}}
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
