import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Pressable, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  FontSize,
  Color,
  FontFamily,
  Padding,
  Border
} from '../../../GlobalStyles'
import HeaderIcons from '../../../components/HeaderIcons'
import CalendarMuroSVG from '../../../components/svgs/CalendarMuroSVG'
import BookSVG from '../../../components/svgs/BookSVG'
import NotificationsMuroSVG from '../../../components/svgs/NotificationsMuroSVG'
import AsyncStorage from '@react-native-async-storage/async-storage';
const PerfilAjustes = () => {
  const navigation = useNavigation()
  const [usuario,setUsuario] = useState('')

  useEffect(()=>{
    const getUser= async()=>{
    const usuario = await AsyncStorage.getItem('user');
    console.log(JSON.parse(usuario),"este es")
    setUsuario(JSON.parse(usuario));
    return JSON.parse(usuario);
    }
    getUser()
  },[])

const handleLogOut = async ()=>{
  await AsyncStorage.removeItem("user")
  navigation.navigate('Splash')
}

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        style={[styles.perfilAjustes, styles.iconLayout1]}
        locations={[0.1, 1]}
        colors={['#fff', '#7ec18c']}
      >
        <View style={styles.frameParent}>
          <View style={styles.frameGroup}>
            <View>
              <View style={styles.parentIcons}>
                <Pressable onPress={() => navigation.navigate('Muro')}>
                  <Image
                    style={styles.image6Icon}
                    contentFit="cover"
                    source={require('../../../assets/image-6.png')}
                  />
                </Pressable>
                {/* <View style={styles.iconlylightOutlinecalendarParent}>
                  <HeaderIcons
                    style={styles.header}
                    icons={[
                      // <CalendarMuroSVG />,
                      <BookSVG />,
                      <NotificationsMuroSVG />
                    ]}
                  />
                </View> */}
              </View>
              <View style={[styles.backParent, styles.parentFlexBox]}>
                <Pressable
                  style={styles.iconlylightOutlinecalendar}
                  onPress={() => navigation.goBack()}
                >
                  <Image
                    style={[styles.icon, styles.iconLayout1]}
                    contentFit="cover"
                    source={require('../../../assets/back.png')}
                  />
                </Pressable>
                <Text style={styles.ajustes}>Ajustes</Text>
              </View>
            </View>

            <View style={styles.frameView}>
              <View style={styles.parentFlexBox}>
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require('../../../assets/frame-15477548756.png')}
                />
                <View style={styles.brunoPhamWrapper}>
                  <Text style={styles.brunoPham}>{usuario.username}</Text>
                </View>
              </View>
              <View style={styles.frameParent2}>
                <Pressable
                  style={styles.parentFlexBox}
                  onPress={() => navigation.navigate('PerfilConfiguracion')}
                >
                  <View style={styles.settingParent}>
                    <Image
                      style={[styles.settingIcon, styles.iconLayout]}
                      contentFit="cover"
                      source={require('../../../assets/setting1.png')}
                    />
                    <Text style={[styles.configuracin, styles.mytreeTypo]}>
                      Configuración
                    </Text>
                    <Image
                      style={[styles.arrowDown2Icon, styles.arrowIconLayout]}
                      contentFit="cover"
                      source={require('../../../assets/arrowdown29.png')}
                    />
                  </View>
                </Pressable>
                <Pressable
                  style={[styles.frameParent3, styles.parentFlexBox]}
                  onPress={() => navigation.navigate('PerfilSeguridad')}
                >
                  <View style={styles.settingParent}>
                    <Image
                      style={styles.shieldDoneIcon}
                      contentFit="cover"
                      source={require('../../../assets/shield-done.png')}
                    />
                    <Text style={[styles.configuracin, styles.mytreeTypo]}>
                      Seguridad
                    </Text>
                    <Image
                      style={[styles.arrowDown2Icon, styles.arrowIconLayout]}
                      contentFit="cover"
                      source={require('../../../assets/arrowdown29.png')}
                    />
                  </View>
                </Pressable>
                <Pressable
                  style={[styles.frameParent3, styles.parentFlexBox]}
                  onPress={() => navigation.navigate('Suscripciones')}
                >
                  <View style={styles.parentFlexBox}>
                    <Image
                      style={styles.starIcon}
                      contentFit="cover"
                      source={require('../../../assets/star.png')}
                    />
                    <Text style={[styles.configuracin, styles.mytreeTypo]}>
                      Suscripciones
                    </Text>
                    <Image
                      style={[styles.arrowDown2Icon, styles.arrowIconLayout]}
                      contentFit="cover"
                      source={require('../../../assets/arrowdown29.png')}
                    />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={[styles.frameParent8, styles.parentLayout]}>
            <View style={styles.parentFlexBox}>
              <Image
                style={styles.shieldDoneIcon}
                contentFit="cover"
                source={require('../../../assets/document8.png')}
              />
              <Text style={[styles.configuracin, styles.mytreeTypo]}>
                Términos y condiciones
              </Text>
            </View>
            <View style={styles.categoryParent}>
              <Image
                style={[styles.settingIcon, styles.iconLayout]}
                contentFit="cover"
                source={require('../../../assets/category.png')}
              />
              <Text style={[styles.polticaDePrivacidad, styles.mytreeTypo]}>
                Política de Privacidad
              </Text>
            </View>
            <View style={[styles.frameParent3, styles.parentFlexBox]}>
              <Image
                style={[styles.settingIcon, styles.iconLayout]}
                contentFit="cover"
                source={require('../../../assets/call1.png')}
              />
              <Text style={[styles.polticaDePrivacidad, styles.mytreeTypo]}>
                Contacta con MyTree
              </Text>
            </View>
          </View>
          <Pressable
            style={styles.frameWrapper}
            onPress={
             handleLogOut}
          >
            <View style={[styles.logoutParent, styles.parentLayout]}>
              <Image
                style={styles.starIcon}
                contentFit="cover"
                source={require('../../../assets/logout.png')}
              />
              <Text style={[styles.suscripciones, styles.mytreeTypo]}>
                Cerrar sesión
              </Text>
            </View>
          </Pressable>
        </View>
      </LinearGradient>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  iconLayout1: {
    width: '100%',
    overflow: 'hidden'
  },
  documentIconLayout: {
    marginLeft: 30,
    height: 24,
    width: 24
  },
  parentIcons: {
    alignItems: 'center',
    flexDirection: 'row',
    top: '5%'
  },
  parentFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconLayout: {
    width: 20,
    overflow: 'hidden'
  },
  mytreeTypo: {
    fontWeight: '500',
    lineHeight: 22,
    fontSize: FontSize.size_lg,
    letterSpacing: 0,
    textAlign: 'left',
    color: Color.negro,
    fontFamily: FontFamily.lato
  },
  arrowIconLayout: {
    width: 9,
    height: 16
  },
  parentLayout: {
    padding: Padding.p_xl,
    borderRadius: Border.br_3xs,
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  iconlylightOutlinecalendar: {
    height: 24,
    width: 24
  },
  iconlylightOutlinecalendarParent: {
    width: '100%',
    left: '55%',
    flexDirection: 'row'
  },
  icon: {
    height: '100%',
    overflow: 'hidden'
  },
  ajustes: {
    fontSize: FontSize.size_5xl,
    marginLeft: 20,
    textAlign: 'left',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  backParent: {
    marginTop: 30
  },
  frameChild: {
    width: 50,
    height: 50
  },
  brunoPham: {
    fontSize: FontSize.size_base,
    lineHeight: 19,
    color: Color.grisDiscord,
    textAlign: 'justify',
    letterSpacing: 0,
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  brunoPhamWrapper: {
    marginLeft: 15
  },
  settingIcon: {
    height: 20
  },
  configuracin: {
    marginLeft: 15,
    width: '85%'
  },
  settingParent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowDown2Icon: {
    height: 16
    // marginLeft: '40%'
  },
  shieldDoneIcon: {
    width: 20,
    height: 22
  },
  frameParent3: {
    marginTop: 20
  },
  iconlyboldlock: {
    width: 20,
    height: 23
  },
  showIcon: {
    height: 16
  },
  starIcon: {
    width: 20,
    height: 19
  },
  suscripciones: {
    marginLeft: 11
  },
  verificacinMytree: {
    marginLeft: 16
  },
  frameParent2: {
    marginTop: 20
  },
  frameView: {
    padding: Padding.p_xl,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: Border.br_3xs,
    marginTop: 20,
    width: '100%'
  },
  frameGroup: {
    justifyContent: 'center'
  },
  polticaDePrivacidad: {
    marginLeft: 13
  },
  categoryParent: {
    alignItems: 'flex-end',
    marginTop: 20,
    flexDirection: 'row'
  },
  frameParent8: {
    height: 152,
    marginTop: 19,
    justifyContent: 'center'
  },
  logoutParent: {
    borderRadius: Border.br_3xs,
    alignItems: 'center',
    flexDirection: 'row'
  },
  frameWrapper: {
    marginTop: 19
  },
  frameParent: {
    paddingHorizontal: Padding.p_xl,
    paddingVertical: 0
  },
  perfilAjustes: {
    backgroundColor: Color.linearBoton,
    paddingBottom: 50
  }
})

export default PerfilAjustes
