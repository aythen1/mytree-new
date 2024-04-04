import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, FontSize } from '../../GlobalStyles'
import { Path, Svg } from 'react-native-svg'
import NameRegister from '../../components/NameRegister'
import CheckRegister from '../../components/CheckRegister'
import AcceptRegister from '../../components/AcceptRegister'

const Register = () => {
  const navigation = useNavigation()

  const [nextField, setNextField] = useState(1)

  const [name, setsetName] = useState('')
  const [text, setText] = useState('')
  const [mail, setMail] = useState('')
  const [birthDate, setBIrthDate] = useState('')

  const handleChangeText = (input) => {
    const filteredInput = input.replace(/[^0-9/]/g, '')
    let formattedInput = filteredInput
    if (filteredInput.length === 2 && filteredInput[2] !== '/') {
      formattedInput = filteredInput.slice(0, 2) + '/' + filteredInput.slice(2)
    }
    if (filteredInput.length === 5 && filteredInput[5] !== '/') {
      formattedInput = filteredInput.slice(0, 5) + '/' + filteredInput.slice(5)
    }
    setText(formattedInput)
  }

  const handleNombreChange = (text) => {
    setsetName(text)
  }

  const handleMailChange = (text) => {
    setMail(text)
  }

  const next = () => {
    if (nextField < 3) {
      setNextField((prev) => prev + 1)
    } else {
      navigation.navigate('Muro')
    }
  }

  const previous = () => {
    if (nextField > 1) {
      setNextField((prev) => prev - 1)
    } else {
      navigation.navigate('Splash')
    }
  }

  return (
    <ScrollView
      style={styles.registroNombre}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      <LinearGradient
        style={styles.frameChild}
        locations={[0, 1]}
        colors={['#7ec18c', '#dee274']}
      >
        <View style={[styles.rectangleGroup, styles.groupIconPosition]}>
          <Pressable style={styles.back} onPress={() => previous()}>
            <Image
              contentFit="cover"
              source={require('../../assets/Back Button.png')}
            />
          </Pressable>
        </View>
        <View style={styles.registrateParent}>
          <Text style={[styles.registrate, styles.registrateTypo]}>
            ¡REGISTRATE!
          </Text>
          <Text style={[styles.laFamiliaEs, styles.registrateTypo]}>
            La familia es el cimiento de la sociedad, donde el amor y el apoyo
            mutuo crean un hogar lleno de calor y seguridad.
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.frameGroup}>
        <View style={styles.lineParent}>
          <Image
            style={styles.frameInner}
            contentFit="cover"
            source={require('../../assets/line-711.png')}
          />
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
              top: 10
            }}
          >
            <View style={styles.icons}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 0C13.5913 0 15.1174 0.632141 16.2426 1.75736C17.3679 2.88258 18 4.4087 18 6C18 7.5913 17.3679 9.11742 16.2426 10.2426C15.1174 11.3679 13.5913 12 12 12C10.4087 12 8.88258 11.3679 7.75736 10.2426C6.63214 9.11742 6 7.5913 6 6C6 4.4087 6.63214 2.88258 7.75736 1.75736C8.88258 0.632141 10.4087 0 12 0ZM12 15C18.63 15 24 17.685 24 21V24H0V21C0 17.685 5.37 15 12 15Z"
                  fill="#7EC18C"
                />
              </Svg>
            </View>

            <View
              style={{
                backgroundColor:
                  nextField >= 2 ? Color.secundario : Color.grisHome,
                width: 36,
                height: 36,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 21
              }}
            >
              <Svg width="20" height="13" viewBox="0 0 24 17" fill="none">
                <Path
                  d="M8.05301 17C7.91489 16.9953 7.77918 16.9625 7.6542 16.9034C7.52921 16.8443 7.41758 16.7603 7.32615 16.6564L0.469008 9.78537C0.338267 9.70043 0.228494 9.58684 0.147975 9.45317C0.0674572 9.3195 0.0182989 9.16924 0.00421219 9.01375C-0.00987456 8.85826 0.0114785 8.70159 0.066659 8.55557C0.12184 8.40956 0.209405 8.27802 0.322745 8.17087C0.436084 8.06373 0.572235 7.98379 0.720918 7.93709C0.869601 7.89039 1.02693 7.87815 1.18102 7.90129C1.33512 7.92444 1.48195 7.98235 1.61044 8.07068C1.73893 8.15901 1.84571 8.27543 1.92272 8.41116L8.05301 14.5127L22.4119 0.165863C22.6052 0.0402724 22.835 -0.016649 23.0644 0.00422188C23.2939 0.0250928 23.5097 0.122548 23.6773 0.280966C23.8448 0.439385 23.9545 0.649593 23.9886 0.8779C24.0228 1.10621 23.9795 1.33939 23.8656 1.54008L8.77987 16.6564C8.68844 16.7603 8.57681 16.8443 8.45182 16.9034C8.32683 16.9625 8.19112 16.9953 8.05301 17Z"
                  fill="#BCBCBC"
                />
              </Svg>
            </View>
            <View
              style={{
                backgroundColor:
                  nextField >= 3 ? Color.secundario : Color.grisHome,
                width: 36,
                height: 36,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 21
              }}
            >
              <Svg width="14" height="16" viewBox="0 0 18 20" fill="none">
                <Path
                  d="M3 20C2.16667 20 1.45833 19.7083 0.875 19.125C0.291667 18.5417 0 17.8333 0 17V14H3V0H18V17C18 17.8333 17.7083 18.5417 17.125 19.125C16.5417 19.7083 15.8333 20 15 20H3ZM15 18C15.2833 18 15.521 17.904 15.713 17.712C15.905 17.52 16.0007 17.2827 16 17V2H5V14H14V17C14 17.2833 14.096 17.521 14.288 17.713C14.48 17.905 14.7173 18.0007 15 18ZM6 7V5H15V7H6ZM6 10V8H15V10H6ZM3 18H12V16H2V17C2 17.2833 2.096 17.521 2.288 17.713C2.48 17.905 2.71733 18.0007 3 18ZM3 18H2H12H3Z"
                  fill="#BCBCBC"
                />
              </Svg>
            </View>
          </View>
          <View
            style={[styles.ellipseGroup, styles.ellipseParentShadowBox]}
          ></View>
          <View
            style={[styles.ellipseGroup, styles.ellipseParentShadowBox]}
          ></View>

          <View
            style={[styles.ellipseGroup, styles.ellipseParentShadowBox]}
          ></View>
        </View>

        <View>
          {nextField === 1 &&
            <NameRegister 
              name={name} setsetName={setsetName} birthDate={birthDate} handleChangeText={handleChangeText} handleMailChange={handleMailChange} handleNombreChange={handleNombreChange} mail={mail} setBIrthDate={setBIrthDate} setMail={setMail} setText={setText} text={text} />}
          {nextField === 2 && <AcceptRegister />}
          {nextField === 3 && <CheckRegister />}
        </View>
        <Pressable style={styles.labelled1} onPress={() => next()}>
          <Text style={[styles.continuar, styles.labelledTypo]}>
            {'Continuar >'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  groupIconPosition: {
    zIndex: 100
  },
  registrateTypo: {
    textAlign: 'center',
    color: Color.white,
    fontFamily: FontFamily.lato
  },
  ellipseParentShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: 'rgba(244, 105, 76, 0.15)'
  },
  labelledTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  frameChild: {
    width: '100%',
    height: '30%',
    zIndex: 0
  },
  rectangleGroup: {
    top: 26,
    left: 15
  },
  registrate: {
    lineHeight: 24,
    fontWeight: '900',
    fontSize: FontSize.size_5xl,
    textAlign: 'center',
    color: Color.white,
    fontFamily: FontFamily.lato
  },
  laFamiliaEs: {
    fontSize: FontSize.size_lg,
    fontWeight: '500',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
    zIndex: 5
  },
  registrateParent: {
    top: 30,
    zIndex: 2
  },
  frameInner: {
    top: 30,
    height: 1,
    width: '90%'
  },
  ellipseGroup: {
    left: 267,
    flexDirection: 'row',
    elevation: 25,
    shadowRadius: 25,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: 'rgba(244, 105, 76, 0.15)',
    top: 0,
    position: 'absolute'
  },
  lineParent: {
    width: '100%',
    height: 40,
    marginBottom: 10
  },
  continuar: {
    color: Color.primario1,
    lineHeight: 41,
    fontWeight: '900',
    fontSize: FontSize.size_5xl
  },
  labelled1: {
    alignSelf: 'center',
    marginTop: 30
  },
  frameGroup: {
    marginTop: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  registroNombre: {
    backgroundColor: Color.white
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100
  },
  back: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icons: {
    backgroundColor: Color.secundario,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 21
  }
})

export default Register
