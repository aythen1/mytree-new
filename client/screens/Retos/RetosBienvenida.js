import * as React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, Pressable, View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  Padding,
  FontFamily,
  FontSize,
  Color,
  Border
} from '../../GlobalStyles'

const RetosBienvenida = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.retosBienvenida}>
      <View style={[styles.frameParent, styles.frameParentPosition]}>
        <View style={styles.frameGroup}>
          <View style={styles.pressableFlexBox}>
            <Pressable
              style={styles.messageLayout}
              onPress={() => navigation.navigate('MENSAJERA')}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require('../../assets/message3.png')}
              />
            </Pressable>
            <Pressable
              style={[styles.iconlylightOutlinecalendar, styles.messageLayout]}
              onPress={() => navigation.navigate('CALENDARIO')}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require('../../assets/iconlylightoutlinecalendar6.png')}
              />
            </Pressable>
            <Pressable
              style={[styles.iconlylightOutlinecalendar, styles.messageLayout]}
              onPress={() => navigation.navigate('PerfilAjustes')}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require('../../assets/iconlylightoutlinesetting1.png')}
              />
            </Pressable>
          </View>
          <View style={styles.parentSpaceBlock}>
            <View style={[styles.popularWrapper, styles.tabsFlexBox]}>
              <Text style={[styles.popular, styles.popularTypo]}>Familia</Text>
            </View>
            <Pressable
              style={[styles.tabs, styles.tabsFlexBox]}
              onPress={() => navigation.navigate('RetosBienvenida1')}
            >
              <Text style={[styles.trending, styles.popularTypo]}>Retos</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.parentSpaceBlock}>
          <LinearGradient
            style={[styles.frameChild, styles.pressableBg]}
            locations={[0, 0.26, 0.57, 0.82]}
            colors={['#7ec18c', '#d0dd78', '#dce175', '#fff']}
          />
          <View style={styles.frameContainer}>
            <View style={styles.frameView}>
              <View style={styles.bienvenidATuMuroDeMytreeWrapper}>
                <Text style={[styles.bienvenidATu, styles.bienvenidATuTypo]}>
                  Bienvenid@ a tu Muro de MyTree:
                </Text>
              </View>
              <Text
                style={[styles.enEsteEspacio, styles.bienvenidATuTypo]}
              >{`En este espacio, te invitamos a estar informado de todos tus acontecimientos familiares, pasados, presentes y futuros. Sumérgete y descubre todo lo que MyTree te ofrece ¿Qué encontrarás aquí? ¡Mucho más que solo
fotos!

📸 Fotos y vídeos de toda tu familia y amigos.

💡 Acontecimientos familiares: Estarás al día de todo lo que pase en tu familia de manera organizada.

🧡 Álbumes de fotos: Comparte todos tus álbumes familiares ¡Tu historia podría ser la siguiente!

🌍 Videodiarios, que todos tus familiares y amigos sepan cómo te ha ese viaje, como a ido tu día.

🎉 Eventos y Novedades: Crea un evento y todas vuestras fotos se sincronizarán automáticamente.

🙌 ID Infante: Verás de manera ordenada todo lo que pase con los nuevos infantes de tu familia o amigos.

Sigue explorando y siéntete libre de compartir tu contenido. ¡Te ayudamos a crear tu legado!`}</Text>
              <View style={[styles.checkParent, styles.parentSpaceBlock]}>
                <View style={styles.check}>
                  <View style={styles.checkChild} />
                  <Image
                    style={styles.vectorIcon}
                    contentFit="cover"
                    source={require('../../assets/vector.png')}
                  />
                </View>
                <View style={styles.noVolverAMostrarWrapper}>
                  <Text style={styles.noVolverA}>No volver a mostrar</Text>
                </View>
              </View>
            </View>
            <LinearGradient
              style={styles.button}
              locations={[0, 1]}
              colors={['#dee274', '#7ec18c']}
            >
              <Pressable
                style={[styles.pressable, styles.pressableBg]}
                onPress={() => navigation.navigate('Muro')}
              >
                <Text style={styles.signIn}>CONTINUAR</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      </View>
      <Image
        style={[styles.navigationIcon, styles.frameParentPosition]}
        contentFit="cover"
        source={require('../../assets/navigation33.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  frameParentPosition: {
    left: 0,
    position: 'absolute'
  },
  messageLayout: {
    height: 24,
    width: 24
  },
  tabsFlexBox: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    width: 194,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  popularTypo: {
    width: 110,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  pressableBg: {
    backgroundColor: Color.linearBoton,
    borderRadius: Border.br_11xl
  },
  bienvenidATuTypo: {
    textAlign: 'left',
    color: Color.white,
    fontFamily: FontFamily.lato
  },
  parentSpaceBlock: {
    marginTop: 20,
    flexDirection: 'row'
  },
  icon: {
    height: '100%',
    width: '100%'
  },
  iconlylightOutlinecalendar: {
    marginLeft: 20
  },
  pressableFlexBox: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  popular: {
    color: Color.white,
    width: 110,
    fontWeight: '700'
  },
  popularWrapper: {
    borderTopLeftRadius: Border.br_3xs,
    borderBottomLeftRadius: Border.br_3xs,
    backgroundColor: Color.secundario,
    overflow: 'hidden'
  },
  trending: {
    fontWeight: '300',
    color: Color.textPlaceholder
  },
  tabs: {
    borderTopRightRadius: Border.br_3xs,
    borderBottomRightRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA
  },
  frameGroup: {
    alignItems: 'flex-end'
  },
  frameChild: {
    height: 803,
    zIndex: 0,
    width: 428
  },
  bienvenidATu: {
    fontSize: FontSize.size_5xl,
    fontWeight: '700',
    textAlign: 'left'
  },
  bienvenidATuMuroDeMytreeWrapper: {
    alignItems: 'center'
  },
  enEsteEspacio: {
    fontWeight: '500',
    width: 383,
    height: 471,
    textAlign: 'left',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    marginTop: 20
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
  vectorIcon: {
    height: '34.5%',
    width: '45%',
    top: '35%',
    right: '30%',
    bottom: '30.5%',
    left: '25%',
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'absolute',
    overflow: 'hidden'
  },
  check: {
    width: 20,
    height: 20
  },
  noVolverA: {
    color: Color.gris,
    textAlign: 'justify',
    fontFamily: FontFamily.lato,
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  noVolverAMostrarWrapper: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkParent: {
    alignItems: 'center'
  },
  frameView: {
    height: 565,
    width: 388
  },
  signIn: {
    letterSpacing: 1,
    lineHeight: 24,
    textAlign: 'center',
    color: Color.white,
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
    flex: 1
  },
  pressable: {
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  button: {
    marginTop: 41,
    width: 388
  },
  frameContainer: {
    left: 20,
    zIndex: 1,
    top: 20,
    position: 'absolute'
  },
  frameParent: {
    alignItems: 'center',
    top: 20
  },
  navigationIcon: {
    top: 821,
    height: 105,
    width: 428
  },
  retosBienvenida: {
    borderRadius: Border.br_31xl,
    // height: 926,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
    backgroundColor: Color.white
  }
})

export default RetosBienvenida
