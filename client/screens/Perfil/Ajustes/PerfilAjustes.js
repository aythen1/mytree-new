import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
  Linking
} from 'react-native'
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { clearAlbums } from '../../../redux/slices/albums.slices'
import { clearChats } from '../../../redux/slices/chats.slices'
import { clearComments } from '../../../redux/slices/comments.slices'
import { clearDiaries } from '../../../redux/slices/diaries.slices'
import { clearNotifications } from '../../../redux/slices/notifications.slices'
import { clearPanel } from '../../../redux/slices/panel.slices'
import { clearPosts } from '../../../redux/slices/posts.slices'
import { clearStories } from '../../../redux/slices/stories.slices'
import { clearUser } from '../../../redux/slices/user.slices'
import { clearEvents } from '../../../redux/slices/events.slices'
import { useDispatch, useSelector } from 'react-redux'
import TopBar from '../../../components/TopBar'



const PerfilAjustes = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { userData: usuario } = useSelector((state) => state.users)



  const handleLogOut = async () => {
    await AsyncStorage.removeItem('user')
    dispatch(clearAlbums())
    dispatch(clearChats())
    dispatch(clearComments())
    dispatch(clearEvents())
    dispatch(clearDiaries())
    dispatch(clearNotifications())
    dispatch(clearPanel())
    dispatch(clearPosts())
    dispatch(clearStories())
    dispatch(clearUser())
    navigation.navigate('Splash')
  }

  const handlePress = () => {
    const email = 'mytree@gmail.com'
    const subject = ''
    const body = ''
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    Linking.openURL(mailtoUrl).catch((err) => console.error('Error:', err))
  }

  return (
    <LinearGradient
      style={{
        backgroundColor: Color.linearBoton,
        flex: 1
      }}
      locations={[0.1, 1]}
      colors={['#fff', '#7ec18c']}
    >
      <ScrollView contentContainerStyle={{paddingBottom:130}} style={styles.frameParent}>
           <TopBar></TopBar>
        <View style={styles.frameGroup}>
          <View style={{width:"100%"}}>
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
                style={{...styles.frameChild,borderRadius:100}}
                contentFit="cover"
                source={usuario.profilePicture || require('../../../assets/logoo.png')} 
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
          <Pressable
            onPress={handlePress}
            style={[styles.frameParent3, styles.parentFlexBox]}
          >
            <Image
              style={[styles.settingIcon, styles.iconLayout]}
              contentFit="cover"
              source={require('../../../assets/call1.png')}
            />
            <Text style={[styles.polticaDePrivacidad, styles.mytreeTypo]}>
              Contacta con MyTree
            </Text>
          </Pressable>
        </View>
        <Pressable style={styles.frameWrapper} onPress={handleLogOut}>
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
      </ScrollView>
    </LinearGradient>
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
    marginHorizontal:10,
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
    justifyContent: 'center',
    paddingHorizontal:10
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
    paddingVertical: 0
  },
  perfilAjustes: {
    backgroundColor: Color.linearBoton
  }
})

export default PerfilAjustes
