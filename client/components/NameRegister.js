import React, { useCallback, useRef, useState } from 'react'
import { Image } from 'expo-image'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
  Pressable
} from 'react-native'

import { Color, FontFamily, FontSize, Border } from '../GlobalStyles'
import PopUpCalendario from './PopUpCalendario'
import Maps from './Maps'
import axiosInstance from '../apiBackend'
import { AntDesign } from '@expo/vector-icons'

const NameRegister = ({
  setDataToSend,
  dataToSend,
  setError,
  isEmailValid,
  setEmailValid
}) => {
  const timeoutRef = useRef(null)

  const [calendario, setCalendario] = useState(false)
  const [lugar, setLugar] = useState(false)

  const closeCalendario = useCallback(() => {
    setCalendario(false)
  }, [])

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleSearch = async (email) => {
    try {
      const res = await axiosInstance.post('/user/findEmail', { email })
      if (res?.data) {
        setEmailValid(false)
      }
    } catch (error) {
      if (emailPattern.test(email)) {
        setEmailValid(true)
      }

    }
  }

  const handleChange = (value) => {
    const valueLow = value

    setDataToSend((prev)=> ({ ...prev, ['email']: value }))

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      handleSearch(valueLow)
    }, 300) // 1000ms = 1 segundo
  }

  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>Nombre/s</Text>
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
              inputMode="text"
              maxLength={30}
              onChangeText={(nombre) => {
                const isLetter = /^[a-zA-Z\s]*$/.test(nombre)

                if (isLetter) {
                  setError('')
                  setDataToSend({ ...dataToSend, ['username']: nombre })
                } else {
                  setError('Solo se admiten letras')
                }
              }}
              value={dataToSend.username}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>Apellido/s</Text>
        <View style={styles.baseBackgroundParent}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIconLayout}
              contentFit="cover"
              source={require('../assets/Icard.png')}
            />
            <TextInput
              maxLength={30}

              style={styles.placeholder}
              placeholder="Apellido"
              onChangeText={(apellido) => {
                const isLetter = /^[a-zA-Z\s]*$/.test(apellido)
                if (isLetter) {
                  setError('')
                  setDataToSend({ ...dataToSend, ['apellido']: apellido })
                } else {
                  setError('Solo se admiten letras')
                }
              }}
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
          <Pressable
            onPress={() => setCalendario(true)}
            style={styles.vectorParent}
          >
            <Image
              style={styles.vectorIconLayout}
              contentFit="cover"
              source={require('../assets/Cake.png')}
            />

            <Text style={{ ...styles.placeholder, color:Color.negro, }}>
              {dataToSend.birthDate || 'Fecha de nacimiento'}
            </Text>
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
            setSelectedDate={(birt) => {
              setError('')
              setDataToSend({ ...dataToSend, ['birthDate']: birt })
            }}
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
          <Maps
            onClose={() => setLugar(false)}
            setLocation={(c) => {
              setError('')
              setDataToSend({ ...dataToSend, ['address']: c })
            }}
          />
        </View>
      </Modal>

      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>Ciudad</Text>
        <View style={styles.baseBackgroundParent}>
          <Pressable onPress={() => setLugar(true)} style={styles.vectorParent}>
            <Image
              style={styles.vectorIconLayout}
              contentFit="cover"
              source={require('../assets/Buildings.png')}
            />

            <Text style={{ ...styles.placeholder, color: Color.negro }}>
              {dataToSend.address || 'Ciudad'}
            </Text>
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
              onChangeText={(phone) => {
                if (phone === '' || phone.replace(/[^0-9]/g, '') === phone) {
                  setError('');
                  setDataToSend({ ...dataToSend, ['phone']: phone });
                } else {
                  setError('Ingresa solo números')
                }
              }}
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
            maxLength={40}
              style={styles.placeholder}
              placeholder="Email"
              
              onChangeText={(email) => {
                
                handleChange(email.toLowerCase())
              }}
              value={dataToSend.email.toLowerCase()}
            />
            {!isEmailValid ? (
              <View style={{ position: 'absolute', right: 14, top: 12 }}>
                <AntDesign name="close" color={'#ff0000'} size={20} />
              </View>
            ) : (
              <View style={{ position: 'absolute', right: 14, top: 12 }}>
                <AntDesign name="check" color={'#00ff00'} size={20} />
              </View>
            )}
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>Contraseña</Text>
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
            maxLength={40}

              onChangeText={(password) => {
                setError('')
                setDataToSend({ ...dataToSend, ['password']: password })
              }}
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
            maxLength={40}

              onChangeText={(confirm_password) => {
                setError('')
                setDataToSend({
                  ...dataToSend,
                  ['confirm_password']: confirm_password
                })
              }}
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
    height: 26
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
    elevation: 2,
    alignItems: 'center'
  },
  baseBackgroundParent: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    marginTop: 5,
    marginBottom: 5
  }
})

export default NameRegister
