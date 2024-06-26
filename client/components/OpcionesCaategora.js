import * as React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable
} from 'react-native'
import { FontFamily, FontSize, Color, Border, Padding } from '../GlobalStyles'
import { LinearGradient } from 'expo-linear-gradient'

const OpcionesCaategora = ({
  onClose,
  selectedCategory,
  setSelectedCategory
}) => {
  const [addedCategory, setAddedCategory] = React.useState()
  const [text, setText] = React.useState('')
  return (
    <View style={styles.opcionesCaategora}>
      <View style={styles.aniversarioParent}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            height: 70,
            maxHeight: 70,
            overflow: 'hidden',
            flexGrow: 1,
            marginTop: 5
          }}
          contentContainerStyle={{
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 6
          }}
        >
          <Pressable
            onPress={() => {
              setSelectedCategory('Aniversario')
              setText('')
              onClose()
            }}
          >
            <Text style={[styles.aniversario, styles.aadirTypo]}>
              Aniversario
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedCategory('Graduación')
              setText('')
              onClose()
            }}
          >
            <Text style={[styles.aniversario, styles.aadirTypo]}>
              Graduación
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setSelectedCategory('Compra de primer coche')
              setText('')
              onClose()
            }}
          >
            <Text style={[styles.aniversario, styles.aadirTypo]}>
              Compra de primer coche
            </Text>
          </Pressable>
          {addedCategory && (
            <Pressable
              onPress={() => {
                setSelectedCategory(addedCategory)
                setText('')
                onClose()
              }}
            >
              <Text style={[styles.aniversario, styles.aadirTypo]}>
                {addedCategory}
              </Text>
            </Pressable>
          )}
        </ScrollView>
        <View
          style={{
            borderColor: Color.secundario,
            borderTopWidth: 1,
            width: '100%',
            height: 1,
            marginTop: 15,
            borderStyle: 'solid'
          }}
        />
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          style={{
            paddingVertical: Padding.p_smi,
            backgroundColor: Color.fAFAFA,
            borderRadius: Border.br_3xs,
            paddingHorizontal: 15,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            marginTop: 10
          }}
          placeholder="Ingrese nueva categoría"
        />
        <TouchableOpacity
          onPress={() => {
            setAddedCategory(text)
            setSelectedCategory(text)
            setText('')
            onClose()
          }}
          style={{ marginTop: 10 }}
        >
          <LinearGradient
            style={{
              justifyContent: 'center',
              paddingHorizontal: Padding.p_5xl,
              paddingVertical: Padding.p_sm,
              backgroundColor: Color.linearBoton,
              width: '100%',
              flexDirection: 'row',
              borderRadius: Border.br_11xl
            }}
            locations={[0, 1]}
            colors={['#dee274', '#7ec18c']}
          >
            <Text
              style={{
                flex: 1,
                letterSpacing: 1,
                lineHeight: 24,
                color: Color.white,
                textAlign: 'center',
                fontFamily: FontFamily.lato,
                fontSize: FontSize.size_base
              }}
            >
              + Añadir
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  aadirTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  aniversario: {
    color: Color.gris,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  frameChild: {
    marginTop: 20,
    width: 388,
    maxHeight: '100%'
  },
  graduacin: {
    marginTop: 20,
    color: Color.gris,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  aadir: {
    color: Color.primario2,
    marginTop: 20,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  aniversarioParent: {
    position: 'absolute',
    width: '100%',
    padding: 20
  },
  opcionesCaategora: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.white,
    width: '100%',
    height: 500,
    maxWidth: '100%',
    maxHeight: '100%'
  }
})

export default OpcionesCaategora
