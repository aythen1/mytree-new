import * as React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Pressable, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Color, FontSize, FontFamily } from '../../GlobalStyles'

const REGISTROTRMINOSYCONDICIO = () => {
  const navigation = useNavigation()

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:60}}>
      <View style={styles.registroTrminosYCondicio}>
        <Image
          style={styles.vectorIcon}
          contentFit="cover"
          source={require('../../assets/vector71.png')}
        />
        <View style={[styles.frameParent, styles.framePosition]}>
          <View style={styles.frameChildLayout}>
            <LinearGradient
              style={[styles.frameChild, styles.frameChildLayout]}
              locations={[0, 1]}
              colors={['#7ec18c', '#dee274']}
            />
            <View style={styles.rectangleGroup}>
              <Pressable
                style={styles.frameItem}
                onPress={() => navigation.goBack()}
              />
              <Image
                style={styles.backButtonIcon}
                contentFit="contain"
                source={require('../../assets/back-button1.png')}
              />
            </View>
            <Text style={styles.registrate}>¡REGISTRATE!</Text>
          </View>
          <View style={styles.frameGroup}>
            <View style={styles.trminosYCondicionesDeUsoParent}>
              <Text style={styles.trminosYCondicionesContainer}>
                <Text
                  style={styles.trminosYCondiciones}
                >{`Términos y Condiciones de Uso
`}</Text>
                <Text
                  style={styles.porFavorLee}
                >{`Por favor, lee detenidamente los siguientes términos y condiciones antes de utilizar este servicio.
`}</Text>
                <Text
                  style={styles.trminosYCondiciones}
                >{`Aceptación de los Términos: `}</Text>
                <Text
                  style={styles.porFavorLee}
                >{`Al acceder o utilizar este servicio, aceptas estar sujeto a estos términos y condiciones de uso. Si no estás de acuerdo con alguno de estos términos, no utilices este servicio.
`}</Text>
                <Text style={styles.trminosYCondiciones}>
                  Uso del Servicio:
                </Text>
                <Text
                  style={styles.porFavorLee}
                >{` Este servicio está destinado únicamente para uso personal y no comercial. No debes utilizar este servicio de ninguna manera que pueda infringir las leyes locales, nacionales o internacionales.
`}</Text>
                <Text style={styles.trminosYCondiciones}>{`Contenido: `}</Text>
                <Text
                  style={styles.porFavorLee}
                >{`Todo el contenido proporcionado en este servicio es propiedad exclusiva y está protegido por leyes de derechos de autor. No puedes copiar, modificar, distribuir, vender o utilizar de ninguna otra manera este contenido sin el consentimiento expreso del propietario.
`}</Text>
                <Text style={styles.trminosYCondiciones}>Privacidad:</Text>
                <Text
                  style={styles.porFavorLee}
                >{` Nos comprometemos a proteger tu privacidad y a no compartir tu información personal con terceros sin tu consentimiento. Para obtener más información, consulta nuestra Política de Privacidad.
`}</Text>
                <Text
                  style={styles.trminosYCondiciones}
                >{`Enlaces a Terceros: `}</Text>
                <Text
                  style={styles.porFavorLee}
                >{`Este servicio puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido de estos sitios y no somos responsables de ningún daño o perjuicio causado por el uso de los mismos.
`}</Text>
                <Text style={styles.trminosYCondiciones}>
                  Limitación de Responsabilidad:
                </Text>
                <Text
                  style={styles.porFavorLee}
                >{` En ningún caso seremos responsables por daños directos, indirectos, incidentales, especiales o consecuentes que surjan del uso de este servicio.
`}</Text>
                <Text style={styles.trminosYCondiciones}>Modificaciones:</Text>
                <Text
                  style={styles.porFavorLee}
                >{` Nos reservamos el derecho de modificar o actualizar estos términos y condiciones en cualquier momento sin previo aviso. Es tu responsabilidad revisar periódicamente estos términos para estar al tanto de cualquier cambio.
L`}</Text>
                <Text style={styles.trminosYCondiciones}>ey Aplicable:</Text>
                <Text
                  style={styles.porFavorLee}
                >{` Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del [país o estado correspondiente], sin tener en cuenta sus disposiciones sobre conflictos de leyes.
Al utilizar este servicio, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguno de estos términos, por favor, no utilices este servicio.`}</Text>
              </Text>
              <View style={styles.frameContainer}>
                <View style={styles.checkParent}>
                  <View style={styles.check}>
                    <View style={styles.checkChild} />
                  </View>
                  <Text
                    style={[styles.aceptoTodosLos, styles.declaroQueSoyTypo]}
                  >
                    Acepto todos los términos y condiciones
                  </Text>
                </View>
                <View style={styles.checkGroup}>
                  <View style={styles.check}>
                    <View style={styles.checkChild} />
                  </View>
                  <Text
                    style={[styles.declaroQueSoy, styles.declaroQueSoyTypo]}
                  >
                    Declaro que soy mayor de 18 años
                  </Text>
                </View>
              </View>
            </View>
          
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  framePosition: {
    left: 0,
    top: 0
    // position: 'absolute'
  },
  frameChildLayout: {
    height: 243,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  declaroQueSoyTypo: {
    marginLeft: 11,
    fontWeight: '500',
    textAlign: 'left',
    color: Color.negro,
    lineHeight: 27,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato
  },
  volverTypo: {
    color: Color.primario1,
    lineHeight: 41,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '900',
    fontSize: FontSize.size_5xl
  },
  vectorIcon: {
    height: '37.33%',
    width: '77.1%',
    top: '-5.98%',
    right: '0%',
    bottom: '68.65%',
    left: '22.9%',
    maxWidth: '100%',
    maxHeight: '100%',
    opacity: 0.2,
    position: 'absolute',
    overflow: 'hidden'
  },
  frameChild: {
    backgroundColor: Color.linearBoton,
    left: 0,
    top: 0,
    position: 'absolute'
  },
  frameItem: {
    left: 15,
    top: 15,
    width: 35,
    height: 35,
    zIndex: 99
  },
  backButtonIcon: {
    top: 15,
    left: 15,
    width: 20,
    height: 18,
    zIndex: 1,
    position: 'absolute'
  },
  rectangleGroup: {
    top: 26,
    left: 15,
    position: 'absolute'
  },
  registrate: {
    lineHeight: 24,
    color: Color.white,
    textAlign: 'center',
    transform: [
      {
        rotate: '-0.55deg'
      }
    ],
    fontFamily: FontFamily.lato,
    fontWeight: '900',
    fontSize: FontSize.size_5xl,
    position: 'absolute'
  },
  trminosYCondiciones: {
    fontWeight: '700',
    fontFamily: FontFamily.lato
  },
  porFavorLee: {
    fontWeight: '500',
    fontFamily: FontFamily.lato
  },
  trminosYCondicionesContainer: {
    width: 323,
    textAlign: 'left',
    color: Color.negro,
    lineHeight: 27,
    fontSize: FontSize.size_base
  },
  checkChild: {
    height: '105%',
    width: '105%',
    top: '-2.5%',
    right: '-2.5%',
    bottom: '-2.5%',
    left: '-2.5%',
    borderRadius: 3,
    borderStyle: 'solid',
    borderColor: Color.colorGainsboro_100,
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: Color.white
  },
  check: {
    width: 20,
    height: 20
  },
  aceptoTodosLos: {
    width: 290
  },
  checkParent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  declaroQueSoy: {
    width: 246
  },
  checkGroup: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  frameContainer: {
    marginTop: 10
  },
  trminosYCondicionesDeUsoParent: {
    width: 388,
    height: 571,
    alignItems: 'center',
    overflow: 'hidden'
  },
  volver: {
    width: 107
  },
  labelled1: {
    marginLeft: 134
  },
  labelledParent: {
    marginTop: 18,
    flexDirection: 'row'
  },
  frameGroup: {
    marginTop: 20,
    alignItems: 'center'
  },
  frameParent: {
    alignItems: 'center'
  },
  registroTrminosYCondicio: {
    flex: 1,
    width: '100%',
    backgroundColor: Color.white
  }
})

export default REGISTROTRMINOSYCONDICIO
