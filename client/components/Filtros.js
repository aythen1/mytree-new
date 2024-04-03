import * as React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, Pressable, View, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, Color, Border, FontSize } from '../GlobalStyles'

const Filtros = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.frameParent1}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.rectangleParent}>
          <LinearGradient
            style={styles.frameChildLayout}
            locations={[0, 1]}
            colors={['#e2e57a', '#7fc08b']}
          />
          <Text style={[styles.normal, styles.edicinTypo]}>Normal</Text>
        </View>
        <View style={styles.filtro1}>
          <LinearGradient
            style={styles.frameChildLayout}
            locations={[0, 1]}
            colors={['#e2e57a', '#7fc08b']}
          />
          <Text style={[styles.normal, styles.edicinTypo]}>Sepia</Text>
        </View>
        <View style={styles.rectangleGroup}>
          <LinearGradient
            style={[styles.frameChild1, styles.frameChildLayout]}
            locations={[0, 1]}
            colors={['#e2e57a', '#7fc08b']}
          />
          <Text style={[styles.normal, styles.edicinTypo]}>Claro</Text>
        </View>
        <View style={styles.rectangleContainer}>
          <LinearGradient
            style={styles.frameChildLayout}
            locations={[0, 1]}
            colors={['#e2e57a', '#7fc08b']}
          />
          <Text style={[styles.normal, styles.edicinTypo]}>Oscuro</Text>
        </View>
        <View style={styles.rectangleParent1}>
          <LinearGradient
            style={styles.frameChildLayout}
            locations={[0, 1]}
            colors={['#e2e57a', '#7fc08b']}
          />
          <Text style={[styles.normal, styles.edicinTypo]}>Contraste</Text>
        </View>
        <View style={styles.rectangleParent2}>
          <LinearGradient
            style={styles.frameChildLayout}
            locations={[0, 1]}
            colors={['#e2e57a', '#7fc08b']}
          />
          <Text style={[styles.normal, styles.edicinTypo]}>B&N</Text>
        </View>
        <View style={styles.frameParent2}>
          <View style={styles.rectangleParent3}>
            <LinearGradient
              style={styles.frameChildLayout}
              locations={[0, 1]}
              colors={['#e2e57a', '#7fc08b']}
            />
            <Text style={[styles.normal, styles.edicinTypo]}>Normal</Text>
          </View>
          <View style={styles.rectangleParent4}>
            <LinearGradient
              style={[styles.frameChild6, styles.frameChildLayout]}
              locations={[0, 1]}
              colors={['#e2e57a', '#7fc08b']}
            />
            <Text style={[styles.normal, styles.edicinTypo]}>Claro</Text>
          </View>
          <View style={styles.rectangleParent5}>
            <LinearGradient
              style={styles.frameChildLayout}
              locations={[0, 1]}
              colors={['#e2e57a', '#7fc08b']}
            />
            <Text style={[styles.normal, styles.edicinTypo]}>Oscuro</Text>
          </View>
          <View style={styles.rectangleParent6}>
            <LinearGradient
              style={styles.frameChildLayout}
              locations={[0, 1]}
              colors={['#e2e57a', '#7fc08b']}
            />
            <Text style={[styles.normal, styles.edicinTypo]}>Contraste</Text>
          </View>
          <View style={[styles.rectangleParent7, styles.frameChildShadowBox]}>
            <LinearGradient
              style={styles.frameChildLayout}
              locations={[0, 1]}
              colors={['#e2e57a', '#7fc08b']}
            />
            <Text style={[styles.normal, styles.edicinTypo]}>B&N</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  iconLayout: {
    width: '100%'
    // overflow: 'hidden'
  },
  edicinTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.lato
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
  filtro: {
    fontWeight: '700',
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontSize: FontSize.title2Regular_size
  },
  frameInner: {
    borderStyle: 'solid',
    borderColor: Color.primario1,
    borderTopWidth: 5,
    width: '100%',
    height: 5,
    marginTop: 20
  },
  filtroParent: {
    alignItems: 'center'
  },
  edicin: {
    fontWeight: '500',
    color: Color.grisGeneral,
    marginLeft: 61,
    fontSize: FontSize.title2Regular_size,
    textAlign: 'center'
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
    paddingBottom: 50,
    flexDirection: 'row'
    // width: 428
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
    top: 3,
    left: 0,
    height: 847
    // position: 'absolute'
  },
  aadirRecuerdo: {
    borderRadius: Border.br_31xl,
    backgroundColor: Color.white,
    flex: 1,
    // height: 926,
    overflow: 'hidden'
  }
})

export default Filtros
