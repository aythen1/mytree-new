import React, { useContext } from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native'
import { FontSize, FontFamily, Color } from '../../../GlobalStyles'
import { Context } from '../../../context/Context'
import { useNavigation } from '@react-navigation/native'

const BusquedaPublicaciones = ({ search, setSearch }) => {
  const navigation = useNavigation()
  const { setSelectedSection } = useContext(Context)
  return (
    <View style={{ paddingHorizontal: 10, backgroundColor: 'transparent' }}>
      <Pressable
        style={styles.rectangleGroup}
        onPress={() => {
          setSelectedSection('nube')
          navigation.navigate('MIDIARIOENTRADATEXTOPL7')
        }}
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
            {/* <Pressable onPress={navigateTo}>
                    <CamaraSVG />
                  </Pressable> */}
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require('../../../assets/vector34.png')}
            />
          </View>
        </View>
      </Pressable>

      <Pressable
        style={styles.rectangleGroup2}
        onPress={() => {
          setSelectedSection('logros')
          navigation.navigate('MIDIARIOENTRADATEXTOPL7')
        }}
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
            {/* <Pressable onPress={navigateTo}>
                    <CamaraSVG />
                  </Pressable> */}
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require('../../../assets/vector35.png')}
            />
          </View>
        </View>
      </Pressable>

      <Pressable
        style={styles.rectangleGroup3}
        onPress={() => {
          setSelectedSection('desafios')
          navigation.navigate('MIDIARIOENTRADATEXTOPL7')
        }}
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
            {/* <Pressable onPress={navigateTo}>
                    <CamaraSVG />
                  </Pressable> */}
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require('../../../assets/vector36.png')}
            />
          </View>
        </View>
      </Pressable>

      <Pressable
        style={styles.rectangleGroup4}
        onPress={() => {
          setSelectedSection('risas')
          navigation.navigate('MIDIARIOENTRADATEXTOPL7')
        }}
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
            {/* <Pressable onPress={navigateTo}>
                    <CamaraSVG />
                  </Pressable> */}
            <Image
              style={styles.vectorIcon3}
              contentFit="cover"
              source={require('../../../assets/vector37.png')}
            />
          </View>
        </View>
      </Pressable>

      <Pressable
        style={styles.rectangleGroup5}
        onPress={() => {
          setSelectedSection('mundo')
          navigation.navigate('MIDIARIOENTRADATEXTOPL7')
        }}
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
            {/* <Pressable onPress={navigateTo}>
                    <CamaraSVG />
                  </Pressable> */}
            <Image
              style={styles.vectorIcon4}
              contentFit="cover"
              source={require('../../../assets/vector38.png')}
            />
          </View>
        </View>
      </Pressable>
    </View>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 60,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Color.colorLavenderblush
  },
  rectangleGroup2: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 60,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Color.colorLavender_100
  },
  rectangleGroup3: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 60,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Color.colorLightcyan
  },
  rectangleGroup4: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 60,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Color.colorOldlace
  },
  rectangleGroup5: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 60,
    justifyContent: 'center',
    borderRadius: 5,
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
    backgroundColor: 'transparent'
  }
})

export default BusquedaPublicaciones
