import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { FontFamily, FontSize, Color } from '../GlobalStyles'

const DescubriendoElMundo = ({ showEdit }) => {
  const [texto, setTexto] = useState(`👫 Hoy lo he compartido con... 
  😊 Hoy me siento/nos sentimos...
  🌍 Lugar Explorado
  🌟 El momento más emocionante fue...
  😮 Lo que más nos impactó fue...
  🌞 El mejor momento del día fue...`)

  const handleTextoChange = (nuevoTexto) => {
    setTexto(nuevoTexto)
  }

  return (
    <>
      <View style={styles.miDiarioEntradaTextoPl}>
        {showEdit ? (
          <View>
            <Text style={[styles.reflexinDiaria, styles.hoyLoHeFlexBox]}>
              Descubriendo el mundo
            </Text>
            <TextInput
              style={[styles.hoyLoHe, styles.hoyLoHeFlexBox]}
              multiline
              value={texto}
              onChangeText={handleTextoChange}
            />
          </View>
        ) : (
          <View>
            <Text style={[styles.reflexinDiaria, styles.hoyLoHeFlexBox]}>
              Descubriendo el mundo
            </Text>
            <Text style={[styles.hoyLoHe, styles.hoyLoHeFlexBox]}>{texto}</Text>
          </View>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  miDiarioEntradaTextoPl: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: 'hidden',
    width: '100%'
  },
  reflexinDiaria: {
    lineHeight: 36,
    fontSize: FontSize.size_5xl
  },
  hoyLoHe: {
    fontSize: FontSize.size_lg,
    lineHeight: 27
  },
  hoyLoHeFlexBox: {
    textAlign: 'left',
    color: Color.negro,
    marginTop: 20,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  }
})

export default DescubriendoElMundo
