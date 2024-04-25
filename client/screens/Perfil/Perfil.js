import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Pressable, Text, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import {
  Color,
  FontFamily,
  Padding,
  Border,
  FontSize
} from '../../GlobalStyles'
import { useDispatch, useSelector } from 'react-redux'
// import { setPanel } from '../../redux/slices/panel.slices'
import MiLegado from './MiLegado'
import MisAlbumes from './MisAlbumes'
import PERFILMIINFO from './PERFILMIINFO'
import SOLOYO from './SOLOYO'
import HeaderIcons from '../../components/HeaderIcons'
import TreeSVG from '../../components/svgs/TreeSVG'
import SettingMuroSVG from '../../components/svgs/SettingMuroSVG'
import PlusSVG from '../../components/svgs/PlusSVG'
import NotificationsMuroSVG from '../../components/svgs/NotificationsMuroSVG'
import LupaSVG from '../../components/svgs/LupaSVG'
import BarraBusqueda from '../../components/BarraBusqueda'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Perfil = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { showPanel } = useSelector((state) => state.panel)

  const [selectedComponent, setSelectedComponent] = useState('MiLegado')
  const [search, setSearch] = useState(false)
  const [usuario, setUsuario] = useState({})


  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'MiLegado':
        return <MiLegado />
      case 'MisAlbumes':
        return <MisAlbumes />
      case 'PERFILMIINFO':
        return <PERFILMIINFO usuario={usuario} setSelectedComponent={setSelectedComponent} />
      case 'SOLOYO':
        return <SOLOYO />
      default:
        return null
    }
  }
  useEffect(()=>{
    const getUser= async()=>{
    const usuario = await AsyncStorage.getItem('user');
    console.log(JSON.parse(usuario),"este es")
    setUsuario(JSON.parse(usuario));
    return JSON.parse(usuario);
    }
    getUser()
  },[])

  return (
    <ScrollView style={styles.perfil} showsVerticalScrollIndicator={false}>
      <View style={[styles.vectorParent, styles.buttonFlexBox]}>
        <Pressable onPress={() => navigation.navigate('Muro')}>
          <Image
            style={[styles.image6Icon, styles.ionmenu]}
            contentFit="cover"
            source={require('../../assets/image-6.png')}
          />
        </Pressable>

        <HeaderIcons
          icons={
            selectedComponent !== 'PERFILMIINFO'
              ? [
                  <Pressable onPress={() => setSearch(!search)}>
                    <LupaSVG />
                  </Pressable>,
                  <PlusSVG isNavigation={'CrearAlbum'} />,
                  <SettingMuroSVG isNavigation={'PerfilAjustes'} />
                ]
              : [
                  <TreeSVG />,
                  <NotificationsMuroSVG
                    isNavigation={'PERFILNOTIFICACIONES'}
                  />,
                  <SettingMuroSVG isNavigation={'PerfilAjustes'} />
                ]
          }
        />
      </View>

      <Pressable
      //  onPress={() => dispatch(setPanel(!showPanel))}
        style={styles.menuPosition}
      >
        <Image
          style={styles.ionmenuIcon}
          contentFit="cover"
          source={require('../../assets/ionmenu.png')}
        />
      </Pressable>

      {search && <BarraBusqueda />}

      <View style={styles.imageContainer}>
        <Image
          style={styles.perfilItem}
          contentFit="cover"
          source={require('../../assets/group-1171276683.png')}
        />
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.brunoPham}> {usuario.username}</Text>
        <View style={styles.placeContainer}>
          <Text style={[styles.daNangVietnam, styles.miInfoTypo]}>
            {usuario.address}, {usuario.city}
          </Text>
        </View>
      </View>

      <View style={styles.tabsBar}>
        <Pressable
          style={[
            styles.tabs,
            (selectedComponent === 'MiLegado' ||
              selectedComponent === 'SOLOYO') &&
              styles.miWrapper
          ]}
          onPress={() => setSelectedComponent('MiLegado')}
        >
          <Text
            style={
              (styles.miInfo,
              (selectedComponent === 'MiLegado' ||
                selectedComponent === 'SOLOYO') &&
                styles.selectedText)
            }
          >
            Mi Legado
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tabs,
            selectedComponent === 'PERFILMIINFO' && styles.miWrapper
          ]}
          onPress={() => setSelectedComponent('PERFILMIINFO')}
        >
          <Text
            style={
              (styles.miInfo,
              selectedComponent === 'PERFILMIINFO' && styles.selectedText)
            }
          >
            Mi información
          </Text>
        </Pressable>
      </View>

      {renderSelectedComponent()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  iconPosition: {
    left: '1%',
    top: '2%'
  },
  ionmenuIcon: {
    width: 26,
    height: 20
  },
  ionmenu: {
    marginRight: '42%'
  },
  menuPosition: {
    left: '2.5%',
    top: '3%'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    top: '12%',
    gap: 50
  },
  buttonFlexBox: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center'
  },
  vectorIconLayout: {
    width: 24,
    height: 24
  },
  groupIconLayout: {
    height: 50,
    width: 50
  },
  miInfoTypo: {
    color: Color.gris,
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },

  signInTypo: {
    color: Color.white,
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  vectorIcon: {
    height: 24
  },
  iconlylightOutlineplus: {
    marginLeft: 20,
    height: 24
  },
  icon: {
    height: '100%',
    width: '100%'
  },
  vectorParent: {
    top: '5%'
  },
  perfilItem: {
    height: 130,
    width: 130
  },
  nameContainer: {
    flex: 1,
    top: '8%'
  },
  brunoPham: {
    textAlign: 'center',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: '700',
    lineHeight: 24,
    fontSize: FontSize.size_xl
  },
  placeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: '4%',
    gap: 20
  },
  daNangVietnam: {
    fontWeight: '300',
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    lineHeight: 24
  },
  miLegado: {
    lineHeight: 19,
    fontSize: FontSize.size_base,
    fontWeight: '700',
    color: Color.white
  },
  miWrapper: {
    backgroundColor: Color.secundario,
    width: '37%',
    borderRadius: Border.br_7xs,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabs: {
    width: '37%',
    borderRadius: Border.br_7xs,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    justifyContent: 'center',
    alignItems: 'center'
  },
  misLbumes: {
    width: 120,
    color: Color.gris,
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },
  miInfo: {
    color: Color.gris,
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    lineHeight: 19,
    fontSize: FontSize.size_base
  },
  selectedText: {
    color: Color.white,
    fontWeight: '700',
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    lineHeight: 19,
    fontSize: FontSize.size_base
  },
  tabsBar: {
    width: '90%',
    backgroundColor: Color.white,
    flexDirection: 'row',
    top: '25%',
    justifyContent: 'center'
  },
  signIn: {
    fontSize: FontSize.size_xs,
    lineHeight: 18
  },
  button: {
    borderRadius: Border.br_11xl,
    width: 80,
    height: 28,
    paddingHorizontal: Padding.p_base,
    justifyContent: 'center',
    left: '100%',
    backgroundColor: Color.linearBoton
  },
  perfil: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Color.white
  }
})

export default Perfil
