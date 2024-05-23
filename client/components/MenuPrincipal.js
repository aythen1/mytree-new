import React from 'react'
import { useDispatch } from 'react-redux'
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  StatusBar,
  Dimensions
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, FontSize, Border } from '../GlobalStyles'
import { setPanel } from '../redux/slices/panel.slices'

const MenuPrincipal = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { height: fullHeight } = Dimensions.get('window')
  const statusBarHeight = StatusBar.currentHeight || 0
  const heightWithoutStatusBar = fullHeight - statusBarHeight

  return (
    <ScrollView
      style={{ maxWidth: '70%', top: 0, zIndex: 0, height: '100%' }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <LinearGradient
        style={{
          borderTopRightRadius: Border.br_3xs,
          borderBottomRightRadius: Border.br_3xs,
          backgroundColor: Color.linearBoton,
          height: fullHeight
        }}
        start={{ x: 0.9, y: 0.6 }}
        end={{ x: 0, y: 0.6 }}
        colors={['#e2e57a', '#7fc08b']}
      >
        <View style={{ top: 20, left: 20, zIndex: 50 }}>
          <View>
            <View style={styles.parentFlexBox}>
              <Image
                style={[
                  styles.icoutlineSpaceDashboardIcon,
                  styles.frameChildLayout
                ]}
                contentFit="cover"
                source={require('../assets/icoutlinespacedashboard.png')}
              />
              <Pressable
                style={styles.muro}
                onPress={() => {
                  navigation.navigate('Muro')
                }}
              >
                <Text style={styles.muro1Typo}>Muro</Text>
              </Pressable>
            </View>

            <View
              style={[
                styles.iconlylightOutlinecalendarParent,
                styles.parentFlexBox
              ]}
            >
              <Image
                style={styles.frameChildLayout}
                contentFit="cover"
                source={require('../assets/iconlybolddocument.png')}
              />
              <Pressable
                style={styles.muro}
                onPress={() => {
                  navigation.navigate('MENSAJERA')
                }}
              >
                <Text style={styles.muro1Typo}>Mensajeria</Text>
              </Pressable>
            </View>

            <View
              style={[
                styles.iconlylightOutlinecalendarParent,
                styles.parentFlexBox
              ]}
            >
              <Image
                style={[
                  styles.icoutlineSpaceDashboardIcon,
                  styles.frameChildLayout
                ]}
                contentFit="cover"
                source={require('../assets/document4.png')}
              />
              <Pressable
                style={styles.muro}
                onPress={() => {
                  navigation.navigate('MIDIARIOPANTALLAPERSONAL')
                }}
              >
                <Text style={styles.muro1Typo}>Diario Familiar</Text>
              </Pressable>
            </View>

            <View
              style={[
                styles.iconlylightOutlinecalendarParent,
                styles.parentFlexBox
              ]}
            >
              <Image
                style={styles.frameChildLayout}
                contentFit="cover"
                source={require('../assets/iconlylightoutlinecalendar2.png')}
              />
              <Pressable
                style={styles.muro}
                onPress={() => {
                  navigation.navigate('CALENDARIO')
                }}
              >
                <Text style={styles.muro1Typo}>Calendario</Text>
              </Pressable>
            </View>

            <Image
              style={styles.frameItem}
              contentFit="cover"
              source={require('../assets/line-74.png')}
            />
          </View>
          <View style={styles.frameParent1}>
            <View style={styles.parentFlexBox}>
              <Image
                style={styles.frameChildLayout}
                contentFit="cover"
                source={require('../assets/group-1171276689.png')}
              />
              <Pressable
                style={styles.muro}
                onPress={() => {
                  navigation.navigate('Organizador')
                }}
              >
                <Text style={styles.muro1Typo}>Crear</Text>
              </Pressable>
            </View>

            <Image
              style={styles.frameItem}
              contentFit="cover"
              source={require('../assets/line-74.png')}
            />
          </View>
          <View style={styles.frameParent1}>
            <View>
              <View style={styles.parentFlexBox}>
                <Image
                  style={styles.iconlylightOutlinebookmark}
                  contentFit="cover"
                  source={require('../assets/search1.png')}
                />
                <Pressable
                  style={styles.muro}
                  onPress={() => {
                    navigation.navigate('Busqueda')
                  }}
                >
                  <Text style={styles.muro1Typo}>Búsqueda</Text>
                </Pressable>
              </View>

              <View
                style={[
                  styles.iconlylightOutlinecalendarParent,
                  styles.parentFlexBox
                ]}
              >
                <Image
                  style={[
                    styles.icoutlineSpaceDashboardIcon,
                    styles.frameChildLayout
                  ]}
                  contentFit="cover"
                  source={require('../assets/iconlylightoutlinebookmark.png')}
                />
                <Pressable
                  style={styles.muro}
                  onPress={() => {
                    navigation.navigate('Novedades')
                  }}
                >
                  <Text style={styles.muro1Typo}>Novedades</Text>
                </Pressable>
              </View>
            </View>
            <Image
              style={styles.frameItem}
              contentFit="cover"
              source={require('../assets/line-741.png')}
            />
          </View>
          <View style={styles.frameParent1}>
            <View style={styles.parentFlexBox}>
              <Image
                style={[
                  styles.icoutlineSpaceDashboardIcon,
                  styles.frameChildLayout
                ]}
                contentFit="cover"
                source={require('../assets/profile.png')}
              />
              <Pressable
                style={styles.muro}
                onPress={() => {
                  navigation.navigate('Perfil')
                }}
              >
                <Text style={styles.muro1Typo}>Perfil</Text>
              </Pressable>
            </View>
            <View
              style={[
                styles.iconlylightOutlinecalendarParent,
                styles.parentFlexBox
              ]}
            >
              <Image
                style={[
                  styles.icoutlineSpaceDashboardIcon,
                  styles.frameChildLayout
                ]}
                contentFit="cover"
                source={require('../assets/setting.png')}
              />
              <Pressable
                style={styles.muro}
                onPress={() => {
                  navigation.navigate('PerfilAjustes')
                }}
              >
                <Text style={styles.muro1Typo}>Ajustes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  frameChildLayout: {
    height: 17,
    width: 15
  },
  parentFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  muro1Typo: {
    textAlign: 'left',
    color: Color.white,
    fontFamily: FontFamily.lato,
    fontWeight: '900',
    fontSize: 17
  },
  muro: {
    marginLeft: 12
  },
  iconlylightOutlinecalendarParent: {
    marginTop: 20
  },
  frameItem: {
    width: '85%',
    marginTop: 20,
    height: 2
  },
  frameParent1: {
    marginTop: 20
  },
  iconlylightOutlinebookmark: {
    height: 18,
    width: 15
  },
  frameParent: {
    top: 20,
    left: 20,
    zIndex: 50
  },
  menPrincipal: {
    maxWidth: '70%',
    top: 0,
    zIndex: 0
  }
})

export default MenuPrincipal
