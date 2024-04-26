import React from 'react'
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, Color, FontSize } from '../../GlobalStyles'
import { useSelector, useDispatch } from 'react-redux'
import { setPanel } from '../../redux/slices/panel.slices'
import Papers from './Papers'
import HeaderIcons from '../../components/HeaderIcons'
import LupaSVG from '../../components/svgs/LupaSVG'
import SettingMuroSVG from '../../components/svgs/SettingMuroSVG'
import CamaraSVG from '../../components/svgs/CamaraSVG'

const MIDIARIOPANTALLAPERSONAL = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { showPanel } = useSelector((state) => state.panel)

  const navigateTo = () => {
    navigation.navigate('MIDIARIOEDICINVIDEO')
  }

  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.miDiarioPantallaPersonal}>
          <View
            style={{
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15
            }}
          >
            <Pressable onPress={() => navigation.navigate('Muro')}>
              <Image
                style={styles.image6Icon}
                contentFit="cover"
                source={require('../../assets/image-6.png')}
              />
            </Pressable>
            <View style={styles.iconlylightOutlinesearchParent}>
              <HeaderIcons
                icons={[
                  <Pressable onPress={() => navigation.navigate('Busqueda')}>
                    <LupaSVG />
                  </Pressable>,
                  <SettingMuroSVG isNavigation={'PerfilAjustes'} />
                ]}
              />
            </View>
          </View>

          <View style={styles.frameParent12}>
            <Pressable 
            onPress={() => dispatch(setPanel(!showPanel))}
            >
              <Image
                style={[styles.ionmenuIcon, styles.ionmenuIconLayout]}
                contentFit="cover"
                source={require('../../assets/ionmenu2.png')}
              />
            </Pressable>
            <Text style={[styles.miDiario, styles.textTypo]}>
              Diario Familiar
            </Text>
          </View>

          <View>
            <Pressable
              style={styles.rectangleGroup}
              onPress={() => navigation.navigate('MIDIARIOENTRADATEXTOPL7')}
            >
              <View style={[styles.frameContainer]}>
                <View>
                  <View>
                    <Text style={[styles.enBlancoO, styles.textTypo]}>
                      Mi reflexión diaria
                    </Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <Pressable onPress={navigateTo}>
                    <CamaraSVG />
                  </Pressable>
                  <Image
                    style={styles.vectorIcon}
                    contentFit="cover"
                    source={require('../../assets/vector34.png')}
                  />
                </View>
              </View>
            </Pressable>

            <Pressable
              style={styles.rectangleGroup2}
              onPress={() => navigation.navigate('MIDIARIOENTRADATEXTOPL7')}
            >
              <View style={[styles.frameContainer]}>
                <View>
                  <View>
                    <Text style={[styles.enBlancoO, styles.textTypo]}>
                      Celebrando Logros
                    </Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <Pressable onPress={navigateTo}>
                    <CamaraSVG />
                  </Pressable>
                  <Image
                    style={styles.vectorIcon1}
                    contentFit="cover"
                    source={require('../../assets/vector35.png')}
                  />
                </View>
              </View>
            </Pressable>

            <Pressable
              style={styles.rectangleGroup3}
              onPress={() => navigation.navigate('MIDIARIOENTRADATEXTOPL7')}
            >
              <View style={[styles.frameContainer]}>
                <View>
                  <View>
                    <Text style={[styles.enBlancoO, styles.textTypo]}>
                      Desafíos Superados
                    </Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <Pressable onPress={navigateTo}>
                    <CamaraSVG />
                  </Pressable>
                  <Image
                    style={styles.vectorIcon}
                    contentFit="cover"
                    source={require('../../assets/vector36.png')}
                  />
                </View>
              </View>
            </Pressable>

            <Pressable
              style={styles.rectangleGroup4}
              onPress={() => navigation.navigate('MIDIARIOENTRADATEXTOPL7')}
            >
              <View style={[styles.frameContainer]}>
                <View>
                  <View>
                    <Text style={[styles.enBlancoO, styles.textTypo]}>
                      Risas y Anécdotas
                    </Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <Pressable onPress={navigateTo}>
                    <CamaraSVG />
                  </Pressable>
                  <Image
                    style={styles.vectorIcon3}
                    contentFit="cover"
                    source={require('../../assets/vector37.png')}
                  />
                </View>
              </View>
            </Pressable>

            <Pressable
              style={styles.rectangleGroup5}
              onPress={() => navigation.navigate('MIDIARIOENTRADATEXTOPL7')}
            >
              <View style={[styles.frameContainer]}>
                <View>
                  <View>
                    <Text style={[styles.enBlancoO, styles.textTypo]}>
                      Descubriendo el mundo
                    </Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <Pressable onPress={navigateTo}>
                    <CamaraSVG />
                  </Pressable>
                  <Image
                    style={styles.vectorIcon4}
                    contentFit="cover"
                    source={require('../../assets/vector38.png')}
                  />
                </View>
              </View>
            </Pressable>
          </View>

          <Papers />
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  textTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  ionmenuIconLayout: {
    height: 20,
    overflow: 'hidden'
  },
  enBlancoO: {
    lineHeight: 24,
    fontWeight: '500',
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_xl
  },
  vectorIcon: {
    height: 28,
    width: 26
  },
  frameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rectangleGroup: {
    marginTop: 20,
    padding: 10,
    height: 60,
    justifyContent: 'center',
    backgroundColor: Color.colorLavenderblush
  },
  rectangleGroup2: {
    marginTop: 20,
    padding: 10,
    height: 60,
    justifyContent: 'center',
    backgroundColor: Color.colorLavender_100
  },
  rectangleGroup3: {
    marginTop: 20,
    padding: 10,
    height: 60,
    justifyContent: 'center',
    backgroundColor: Color.colorLightcyan
  },
  rectangleGroup4: {
    marginTop: 20,
    padding: 10,
    height: 60,
    justifyContent: 'center',
    backgroundColor: Color.colorOldlace
  },
  rectangleGroup5: {
    marginTop: 20,
    padding: 10,
    height: 60,
    justifyContent: 'center',
    backgroundColor: Color.colorAntiquewhite
  },
  vectorIcon1: {
    width: 24,
    height: 28
  },
  vectorIcon3: {
    height: 24,
    width: 26
  },
  vectorIcon4: {
    height: 18,
    width: 26
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  iconlylightOutlinesearchParent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  ionmenuIcon: {
    width: 26
  },
  miDiario: {
    marginLeft: '25%',
    fontWeight: '700',
    fontSize: FontSize.size_5xl,
    color: Color.negro,
    fontFamily: FontFamily.lato
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30
  },
  frameParent12: {
    top: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20
  },
  miDiarioPantallaPersonal: {
    paddingBottom: 50,
    width: '100%',
    backgroundColor: Color.white
  }
})

export default MIDIARIOPANTALLAPERSONAL
