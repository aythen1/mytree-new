import * as React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, Pressable, View, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, Color, Border, FontSize } from '../GlobalStyles'

const Edicion = () => {
  const navigation = useNavigation()

  return (
    <View style={[styles.miDiarioEdicinVideo, styles.iconLayout1]}>
      <View style={styles.parentFlexBox1}>
        <Image
          style={[styles.reverseRightIcon, styles.reverseIconLayout]}
          contentFit="cover"
          source={require('../assets/reverseleft.png')}
        />
        <Image
          style={[styles.reverseRightIcon, styles.reverseIconLayout]}
          contentFit="cover"
          source={require('../assets/reverseright.png')}
        />
        <Image
          style={[styles.refreshCcw02Icon, styles.reverseIconLayout]}
          contentFit="cover"
          source={require('../assets/refreshccw02.png')}
        />
      </View>

      <View style={styles.parentFlexBox}>
        <Image
          style={styles.containerIcono}
          contentFit="cover"
          source={require('../assets/container-icono.png')}
        />
        <Image
          style={[styles.icon2, styles.icon2Layout]}
          contentFit="cover"
          source={require('../assets/icon2.png')}
        />
        <Image
          style={styles.icon3}
          contentFit="cover"
          source={require('../assets/icon3.png')}
        />
        <Image
          style={[styles.icon4, styles.iconLayout]}
          contentFit="cover"
          source={require('../assets/icon4.png')}
        />
        <Image
          style={[styles.frameChild, styles.icon2Layout]}
          contentFit="cover"
          source={require('../assets/group-1171276674.png')}
        />
        <Image
          style={[styles.icon5, styles.iconLayout]}
          contentFit="cover"
          source={require('../assets/icon5.png')}
        />
        <Image
          style={[styles.icon4, styles.iconLayout]}
          contentFit="cover"
          source={require('../assets/icon6.png')}
        />
        <Image
          style={styles.icon7}
          contentFit="cover"
          source={require('../assets/icon7.png')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  iconLayout1: {
    width: '100%',
    overflow: 'hidden'
  },
  parentFlexBox1: {
    flexDirection: 'row',
    marginBottom: 15,
    width: '100%'
    // position: 'absolute'
  },
  parentFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  edicinClr: {
    color: Color.negro,
    fontWeight: '700'
  },
  backLayout: {
    height: 30,
    width: 30
  },
  containerIconoParentPosition: {
    // position: 'absolute',
    // left: 20
  },
  filtroPosition: {
    top: 627,
    position: 'absolute'
  },
  edicinTypo: {
    fontSize: FontSize.title2Regular_size,
    fontFamily: FontFamily.lato
  },
  iconPosition: {
    left: '50%',
    position: 'absolute'
  },
  icon2Layout: {
    height: 40,
    marginLeft: 23
  },
  iconLayout: {
    height: 41,
    marginLeft: 23
  },
  reverseIconLayout: {
    height: 25,
    overflow: 'hidden'
  },
  frameItemLayout: {
    height: 537,
    width: 426
  },
  icon: {
    height: '100%',
    overflow: 'hidden'
  },
  editarVideo: {
    fontSize: FontSize.size_5xl,
    marginLeft: 20,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    color: Color.negro,
    fontWeight: '700'
  },
  backParent: {
    justifyContent: 'center'
  },
  back1: {
    marginLeft: 181
  },
  frameParent: {
    top: 20,
    left: 20
  },
  clarityresizeUpLineIcon: {
    top: 556,
    width: 36,
    height: 36,
    left: 20,
    overflow: 'hidden'
  },
  filtro1: {
    fontWeight: '500',
    color: Color.grisGeneral,
    textAlign: 'left'
  },
  filtro: {
    left: 67
  },
  edicin: {
    left: 275,
    textAlign: 'center',
    top: 627,
    position: 'absolute',
    color: Color.negro,
    fontWeight: '700',
    fontSize: FontSize.title2Regular_size
  },
  miDiarioEdicinVideoChild: {
    marginLeft: -2.5,
    top: 671,
    borderStyle: 'solid',
    borderColor: Color.primario1,
    borderTopWidth: 5,
    width: 219,
    height: 5
  },
  containerIcono: {
    borderRadius: Border.br_9xs,
    width: 70,
    height: 70,
    overflow: 'hidden'
  },
  icon2: {
    marginLeft: 23,
    width: 43
  },
  icon3: {
    width: 45,
    height: 43,
    marginLeft: 23
  },
  icon4: {
    width: 41
  },
  frameChild: {
    width: 44,
    marginLeft: 23
  },
  icon5: {
    borderRadius: 1,
    width: 43
  },
  icon7: {
    width: 25,
    height: 21,
    marginLeft: 23
  },
  rseLeftIcon: {
    width: 24,
    height: 25
  },
  reverseRightIcon: {
    width: 24,
    height: 25,
    marginLeft: 23
  },
  refreshCcw02Icon: {
    width: 27,
    marginLeft: 23
  },

  frameItem: {
    backgroundColor: Color.secundario,
    zIndex: 0
  },
  vectorIcon: {
    marginTop: -28.5,
    marginLeft: -40,
    top: '50%',
    width: 78,
    height: 63,
    zIndex: 1
  },
  rectangleParent: {
    top: 70,
    left: 0,
    flexDirection: 'row',
    position: 'absolute'
  },
  navigationIcon: {
    marginLeft: -214,
    top: 821,
    width: 428,
    height: 105
  },
  miDiarioEdicinVideo: {
    // borderRadius: Border.br_31xl,
    backgroundColor: Color.white,
    flex: 1,
    height: 926,
    overflow: 'hidden'
  }
})

export default Edicion
