import React, { useState } from 'react'
import { Image } from 'expo-image'
import { StyleSheet, Pressable, View, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, Color, Border, FontSize } from '../GlobalStyles'
import Filtros from './Filtros'
import Edicion from './Edicion'
import AñadeDescripcion from './AñadeDescripcion'

const FiltroEdicion = () => {
  const navigation = useNavigation()
  const [filtros, setFiltros] = useState(1)

  const avanzar = () => {
    if (filtros < 3) {
      setFiltros((prev) => prev + 1)
    }
  }

  const retroceder = () => {
    if (filtros > 1) {
      setFiltros((prev) => prev - 1)
    } else {
      navigation.goBack()
    }
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.image6Parent}>
        <Image
          style={styles.image6Icon}
          contentFit="cover"
          source={require('../assets/image-6.png')}
        />
        <View style={styles.backParent}>
          <Pressable
            style={styles.back}
            onPress={() => {
              retroceder()
            }}
          >
            <Image
              style={[styles.icon, styles.iconLayout]}
              contentFit="cover"
              source={require('../assets/back2.png')}
            />
          </Pressable>

          <View style={styles.frameGroup}>
            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={require('../assets/frame-1547754843.png')}
            />
            <Image
              style={styles.tablermusicIcon}
              contentFit="cover"
              source={require('../assets/tablermusic.png')}
            />
          </View>

          <Pressable
            style={styles.back}
            onPress={() => {
              avanzar()
              // navigation.navigate('MIDIARIOEDICINVIDEO')
            }}
          >
            <Image
              style={[styles.icon, styles.iconLayout]}
              contentFit="cover"
              source={require('../assets/back3.png')}
            />
          </Pressable>
        </View>
        <Image
          style={styles.frameItem}
          contentFit="cover"
          source={require('../assets/frame-1547755266.png')}
        />
        <View style={styles.frameContainer}>
          <View style={styles.frameView}>
            <Pressable
              style={styles.filtroParent}
              onPress={() => setFiltros(1)}
            >
              <Text
                style={{
                  fontWeight: filtros === 1 ? '700' : '500',
                  color: filtros === 1 ? Color.negro : Color.grisGeneral,
                  fontFamily: FontFamily.lato,
                  fontSize: FontSize.title2Regular_size
                }}
              >
                FILTRO
              </Text>
              {filtros === 1 && <View style={styles.frameInner} />}
            </Pressable>
            <Pressable
              style={styles.filtroParent}
              onPress={
                () => setFiltros(2)
                // navigation.navigate('MIDIARIOEDICINVIDEO1')
              }
            >
              <Text
                style={{
                  marginLeft: 25,
                  fontWeight: filtros === 2 ? '700' : '500',
                  color: filtros === 2 ? Color.negro : Color.grisGeneral,
                  fontFamily: FontFamily.lato,
                  fontSize: FontSize.title2Regular_size
                }}
              >
                EDICIÓN
              </Text>
              {filtros === 2 && (
                <View
                  style={{
                    borderStyle: 'solid',
                    borderColor: Color.primario1,
                    borderTopWidth: 5,
                    width: 100,
                    height: 5,
                    marginTop: 15,
                    marginLeft: 25
                  }}
                />
              )}
            </Pressable>
          </View>
        </View>
        <View style={styles.frameParent1}>
          {filtros === 1 ? (
            <Filtros />
          ) : filtros === 2 ? (
            <Edicion />
          ) : filtros === 3 ? (
            <AñadeDescripcion />
          ) : (
            <></>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  iconLayout: {
    width: '100%'
    // overflow: 'hidden'
  },

  frameChildLayout: {
    backgroundColor: Color.linearBoton,
    height: 70,
    width: 70,
    borderRadius: Border.br_3xs,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)'
  },
  navigationIcon: {
    // marginLeft: -214,
    top: 821,
    left: '50%',
    height: 105
    // width: 428,
    // position: 'absolute'
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  icon: {
    height: '100%'
    // overflow: 'hidden'
  },
  back: {
    width: 30,
    height: 30
  },
  frameChild: {
    width: 20,
    height: 20
  },
  tablermusicIcon: {
    width: 18,
    height: 18,
    marginLeft: 20,
    overflow: 'hidden'
  },
  frameGroup: {
    top: 0,
    // left: 157,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
    // position: 'absolute'
  },
  frameWrapper: {
    height: 30,
    width: '100%'
  },
  backParent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  },
  frameItem: {
    height: 420,
    marginTop: 20,
    width: '100%'
  },

  frameInner: {
    borderStyle: 'solid',
    borderColor: Color.primario1,
    borderTopWidth: 5,
    width: 100,
    height: 5,
    marginTop: 15
  },
  filtroParent: {
    alignItems: 'center'
  },

  frameView: {
    // width: 430,
    flexDirection: 'row'
  },
  normal: {
    fontSize: FontSize.size_base,
    fontWeight: '300',
    color: Color.primary,
    marginTop: 8
  },
  rectangleParent: {
    alignItems: 'center'
  },
  filtro1: {
    marginLeft: 20,
    alignItems: 'center'
  },
  frameChild1: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)'
  },
  rectangleGroup: {
    marginLeft: 20,
    alignItems: 'center'
  },
  rectangleContainer: {
    marginLeft: 20,
    alignItems: 'center'
  },
  rectangleParent1: {
    marginLeft: 20,
    alignItems: 'center'
  },
  rectangleParent2: {
    marginLeft: 20,
    alignItems: 'center'
  },
  rectangleParent3: {
    alignItems: 'center'
  },
  frameChild6: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)'
  },
  rectangleParent4: {
    marginLeft: 20,
    alignItems: 'center'
  },
  rectangleParent5: {
    marginLeft: 20,
    alignItems: 'center'
  },
  rectangleParent6: {
    marginLeft: 20,
    alignItems: 'center'
  },
  rectangleParent7: {
    marginLeft: 20,
    alignItems: 'center'
  },
  frameParent2: {
    marginLeft: 20,
    flexDirection: 'row'
  },
  frameParent1: {
    marginTop: 10,
    paddingTop: 15,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  frameContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 15
  },
  frameParent: {
    marginTop: 6,
    alignItems: 'center'
  },
  image6Parent: {
    marginTop: 15,
    left: 0,
    backgroundColor: Color.white,
    height: 847
  },
  aadirRecuerdo: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: 'hidden'
  }
})

export default FiltroEdicion
