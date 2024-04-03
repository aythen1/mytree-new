import React, { useState } from 'react'
import { Image } from 'expo-image'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
  TextInput
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  Padding,
  Border,
  FontSize,
  FontFamily,
  Color
} from '../../GlobalStyles'
import BusquedaContactos from './BusquedaComponents/BusquedaContactos'
import BusquedaPublicaciones from './BusquedaComponents/BusquedaPublicaciones'
import BusquedaDiarios from './BusquedaComponents/BusquedaDiarios'
import BusquedaHashtags from './BusquedaComponents/BusquedaHashtags'
import BusquedaEventos from './BusquedaComponents/BusquedaEventos'
import MasBusquedaSVG from '../../components/svgs/MasBusquedaSVG'
import BarraBusqueda from '../../components/BarraBusqueda'

const Busqueda = () => {
  const navigation = useNavigation()

  const [selectedComponent, setSelectedComponent] =
    useState('BusquedaContactos')

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'BusquedaContactos':
        return <BusquedaContactos />
      case 'BusquedaPublicaciones':
        return <BusquedaPublicaciones />
      case 'BusquedaDiarios':
        return <BusquedaDiarios />
      case 'BusquedaHashtags':
        return <BusquedaHashtags />
      case 'BusquedaEventos':
        return <BusquedaEventos />
      default:
        return null
    }
  }

  return (
    <ScrollView style={styles.bsqueda} showsVerticalScrollIndicator={false}>
      <View style={styles.bsquedaContainer}>
        <Image
          style={styles.image6Icon}
          contentFit="cover"
          source={require('../../assets/image-6.png')}
        />
        <View style={styles.backParent}>
          <Pressable
            style={styles.back}
            onPress={() => navigation.navigate('Muro')}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require('../../assets/back.png')}
            />
          </Pressable>
          <Text style={[styles.bsqueda1, styles.bsqueda1Typo]}>Búsqueda</Text>
        </View>

        <BarraBusqueda />

        <ScrollView
          style={styles.tabsParent}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <Pressable
            style={[
              selectedComponent === 'BusquedaContactos'
                ? styles.tabs
                : styles.contactosWrapper,
              styles.tabsFlexBox
            ]}
            onPress={() => setSelectedComponent('BusquedaContactos')}
          >
            <Text
              style={[
                selectedComponent === 'BusquedaContactos'
                  ? styles.retos
                  : styles.contactos,
                styles.retosTypo
              ]}
            >
              Contactos
            </Text>
          </Pressable>
          <Pressable
            style={[
              selectedComponent === 'BusquedaPublicaciones'
                ? styles.tabs
                : styles.contactosWrapper,
              styles.tabsFlexBox
            ]}
            onPress={() => setSelectedComponent('BusquedaPublicaciones')}
          >
            <Text
              style={[
                selectedComponent === 'BusquedaPublicaciones'
                  ? styles.retos
                  : styles.contactos,
                styles.retosTypo
              ]}
            >
              Publicaciones
            </Text>
          </Pressable>
          <Pressable
            style={[
              selectedComponent === 'BusquedaDiarios'
                ? styles.tabs
                : styles.contactosWrapper,
              styles.tabsFlexBox
            ]}
            onPress={() => setSelectedComponent('BusquedaDiarios')}
          >
            <Text
              style={[
                selectedComponent === 'BusquedaDiarios'
                  ? styles.retos
                  : styles.contactos,
                styles.retosTypo
              ]}
            >
              Diarios
            </Text>
          </Pressable>
          <Pressable
            style={[
              selectedComponent === 'BusquedaHashtags'
                ? styles.tabs
                : styles.contactosWrapper,
              styles.tabsFlexBox
            ]}
            onPress={() => setSelectedComponent('BusquedaHashtags')}
          >
            <Text
              style={[
                selectedComponent === 'BusquedaHashtags'
                  ? styles.retos
                  : styles.contactos,
                styles.retosTypo
              ]}
            >
              Hashtags
            </Text>
          </Pressable>
          <Pressable
            style={[
              selectedComponent === 'BusquedaEventos'
                ? styles.tabs
                : styles.contactosWrapper,
              styles.tabsFlexBox
            ]}
            onPress={() => setSelectedComponent('BusquedaEventos')}
          >
            <Text
              style={[
                selectedComponent === 'BusquedaEventos'
                  ? styles.retos
                  : styles.contactos,
                styles.retosTypo
              ]}
            >
              Eventos
            </Text>
          </Pressable>
        </ScrollView>

        {renderSelectedComponent()}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bsqueda1Typo: {
    textAlign: 'left',
    fontWeight: '700'
  },
  tabsFlexBox: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    borderRadius: Border.br_7xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  retosTypo: {
    textAlign: 'center',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    fontFamily: FontFamily.lato
  },
  retoSemanalClr: {
    color: Color.white,
    letterSpacing: 0,
    fontFamily: FontFamily.lato
  },
  navigationIcon: {
    top: 821,
    height: 105
  },
  bsquedaChild: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    elevation: 25,
    shadowOpacity: 1
  },
  image6Icon: {
    top: 3,
    width: 87,
    height: 55
  },
  icon: {
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  back: {
    width: 24,
    height: 24
  },
  bsqueda1: {
    fontSize: FontSize.size_5xl,
    color: Color.negro,
    marginLeft: 20,
    fontFamily: FontFamily.lato,
    textAlign: 'left'
  },
  backParent: {
    alignItems: 'center',
    flexDirection: 'row',
    top: '5%'
  },
  iconlylightsendCopyWrapper: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.backgroundGreyBackground,
    padding: Padding.p_7xs,
    marginLeft: 16,
    flexDirection: 'row'
  },
  retos: {
    color: Color.primario1,
    fontWeight: '700',
    textAlign: 'center'
  },
  tabs: {
    backgroundColor: Color.secundario,
    width: 114
  },
  contactosWrapper: {
    width: 114,
    overflow: 'hidden'
  },
  contactos: {
    color: Color.grisGeneral
  },
  tabsParent: {
    top: '20%',
    flexDirection: 'row'
  },
  bsqueda: {
    width: '100%',
    flex: 1,
    backgroundColor: Color.white,
    padding: Padding.p_xl
  },
  bsquedaContainer: {
    paddingBottom: 80
  }
})

export default Busqueda
