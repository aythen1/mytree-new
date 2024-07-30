import * as React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Pressable, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, FontSize } from '../../GlobalStyles'

const REGISTROPOLTICASDEPRIVAC = () => {
  const navigation = useNavigation()

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.registroPolticasDePrivac}>
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
            <View style={styles.polticaDePrivacidadLtimaWrapper}>
              <Text style={styles.polticaDePrivacidadContainer}>
                <Text
                  style={styles.polticaDePrivacidad}
                >{`Política de Privacidad
`}</Text>
                <Text style={styles.ltimaActualizacin2310202}>
                  {`Última actualización: 23/10/2023
Esta Política de Privacidad describe cómo MyTree ("nosotros", "nuestro", "nuestra") recopila, utiliza y comparte información personal cuando utilizas nuestros servicios o interactúas con nuestro sitio web [`}
                </Text>
                <Text style={styles.ltimaActualizacin2310202}>
                  <Text style={styles.wwwmytreecom1}>www.mytree.com</Text>
                </Text>
                <Text style={styles.ltimaActualizacin2310202}>{`] (el "Sitio").
`}</Text>
                <Text
                  style={styles.polticaDePrivacidad}
                >{`Información que Recopilamos
Información Personal:`}</Text>
                <Text
                  style={styles.ltimaActualizacin2310202}
                >{` Cuando utilizas nuestro Sitio, podemos recopilar cierta información personal como tu nombre, dirección de correo electrónico, número de teléfono, entre otros. Esta información se recopila de manera voluntaria cuando la proporcionas al registrarte, realizar compras o completar formularios en el Sitio.
`}</Text>
                <Text style={styles.polticaDePrivacidad}>
                  Información de Uso:
                </Text>
                <Text
                  style={styles.ltimaActualizacin2310202}
                >{` También recopilamos información sobre cómo interactúas con nuestro Sitio, como las páginas que visitas, la duración de tu visita y las acciones que realizas.
`}</Text>
                <Text
                  style={styles.polticaDePrivacidad}
                >{`Cómo Utilizamos tu Información
`}</Text>
                <Text
                  style={styles.ltimaActualizacin2310202}
                >{`Utilizamos la información recopilada para los siguientes propósitos:
Procesar tus pedidos y brindarte los productos o servicios solicitados.
Personalizar y mejorar tu experiencia en el Sitio.
Enviarte información sobre promociones, ofertas y actualizaciones sobre nuestros productos o servicios.
Responder a tus preguntas o solicitudes de servicio al cliente.
Cumplir con las leyes y regulaciones aplicables.
`}</Text>
                <Text style={styles.polticaDePrivacidad}>{`Compartir Información
`}</Text>
                <Text
                  style={styles.ltimaActualizacin2310202}
                >{`No compartimos tu información personal con terceros, excepto en las siguientes situaciones:
Con proveedores de servicios que nos ayudan a ofrecer nuestros productos y servicios.
Para cumplir con la ley o responder a solicitudes legales, como una orden judicial o una citación.
`}</Text>
                <Text
                  style={styles.polticaDePrivacidad}
                >{`Seguridad de la Información
`}</Text>
                <Text
                  style={styles.ltimaActualizacin2310202}
                >{`Implementamos medidas de seguridad para proteger tu información contra accesos no autorizados, alteraciones, divulgaciones o destrucciones no autorizadas.
`}</Text>
                <Text style={styles.polticaDePrivacidad}>{`Tus Derechos
`}</Text>
                <Text
                  style={styles.ltimaActualizacin2310202}
                >{`Tienes derecho a acceder, corregir o eliminar tu información personal. Puedes hacerlo contactándonos a través de [correo electrónico o formulario de contacto]. También tienes el derecho de optar por no recibir comunicaciones de marketing.
`}</Text>
                <Text
                  style={styles.polticaDePrivacidad}
                >{`Cambios en esta Política de Privacidad
`}</Text>
                <Text
                  style={styles.ltimaActualizacin2310202}
                >{`Nos reservamos el derecho de actualizar o modificar esta Política de Privacidad en cualquier momento. Te notificaremos sobre cambios significativos a través de un aviso en nuestro Sitio o por otros medios.
`}</Text>
                <Text style={styles.polticaDePrivacidad}>{`Contacto
`}</Text>
                <Text
                  style={styles.ltimaActualizacin2310202}
                >{`Si tienes preguntas o inquietudes sobre esta Política de Privacidad, por favor contáctanos a través de [correo electrónico o dirección física].
`}</Text>
              </Text>
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
  },
  frameChildLayout: {
    height: 243,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
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
  polticaDePrivacidad: {
    fontWeight: '700',
    fontFamily: FontFamily.lato
  },
  ltimaActualizacin2310202: {
    fontWeight: '500',
    fontFamily: FontFamily.lato
  },
  polticaDePrivacidadContainer: {
    fontSize: FontSize.size_base,
    lineHeight: 27,
    color: Color.negro,
    width: 323,
    textAlign: 'left'
  },
  polticaDePrivacidadLtimaWrapper: {
    width: "100%",
    alignItems: 'center',
  },
  volver: {
    width: 107
  },
  labelled1: {
    marginLeft: 134
  },
  labelledParent: {
    flexDirection: 'row',
    marginTop: 18
  },
  frameGroup: {
    marginTop: 20,
    alignItems: 'center'
  },
  frameParent: {
    alignItems: 'center'
  },
  registroPolticasDePrivac: {
    backgroundColor: Color.white,
    flex: 1,
    width: '100%',
    height: "100%",
    overflow: 'hidden'
  }
})

export default REGISTROPOLTICASDEPRIVAC
