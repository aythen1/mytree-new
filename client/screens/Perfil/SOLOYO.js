import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Image } from 'expo-image'
// import { LinearGradient } from 'expo-linear-gradient'
// import { useNavigation } from '@react-navigation/native'
import { Color, FontSize, FontFamily } from '../../GlobalStyles'

const MiLegado = () => {
  // const navigation = useNavigation()

  return (
    <View style={styles.frameParent}>
      <View style={styles.frameContainer}>
        <View
          style={[styles.miBiografaActualParent, styles.groupParentFlexBox]}
        >
          <Text style={styles.miBiografaActual}>Sólo yo</Text>
          <View style={styles.lockParent}>
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require('../../assets/lock1.png')}
            />
          </View>
          <View style={[styles.vectorGroup, styles.groupParentFlexBox]}>
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require('../../assets/vector53.png')}
            />
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require('../../assets/iconlyboldedit.png')}
            />
          </View>
        </View>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require('../../assets/line-78.png')}
        />
        <View style={[styles.maskGroupParent, styles.groupParentFlexBox]}>
          <Image
            style={styles.maskGroupIcon}
            contentFit="cover"
            source={require('../../assets/mask-group18.png')}
          />
          <Image
            style={styles.maskGroupIcon}
            contentFit="cover"
            source={require('../../assets/mask-group19.png')}
          />
          <Image
            style={styles.maskGroupIcon}
            contentFit="cover"
            source={require('../../assets/mask-group20.png')}
          />
          <Image
            style={styles.maskGroupIcon}
            contentFit="cover"
            source={require('../../assets/mask-group21.png')}
          />
          <Image
            style={styles.vectorIcon2}
            contentFit="cover"
            source={require('../../assets/vector54.png')}
          />
        </View>
      </View>

      <View style={styles.frameContainer}>
        <View
          style={[styles.miBiografaActualParent, styles.groupParentFlexBox]}
        >
          <Text style={styles.miBiografaActual}>Mis álbumes</Text>
          <View style={[styles.vectorGroup, styles.groupParentFlexBox]}>
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require('../../assets/vector53.png')}
            />
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require('../../assets/iconlyboldedit.png')}
            />
          </View>
        </View>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require('../../assets/line-78.png')}
        />
        <View style={[styles.maskGroupParent, styles.groupParentFlexBox]}>
          <Image
            style={styles.maskGroupIcon}
            contentFit="cover"
            source={require('../../assets/farita3.png')}
          />
          <Image
            style={styles.maskGroupIcon}
            contentFit="cover"
            source={require('../../assets/marie.png')}
          />
          <Image
            style={styles.maskGroupIcon}
            contentFit="cover"
            source={require('../../assets/farita4.png')}
          />
          <Image
            style={styles.maskGroupIcon}
            contentFit="cover"
            source={require('../../assets/claire.png')}
          />
          <Image
            style={styles.vectorIcon2}
            contentFit="cover"
            source={require('../../assets/vector54.png')}
          />
        </View>
      </View>

      <View style={styles.frameContainer}>
        <View
          style={[styles.miBiografaActualParent, styles.groupParentFlexBox]}
        >
          <Text style={styles.miBiografaActual}>Mis Diarios</Text>
          <View style={[styles.vectorGroup, styles.groupParentFlexBox]}>
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require('../../assets/vector53.png')}
            />
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require('../../assets/iconlyboldedit.png')}
            />
          </View>
        </View>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require('../../assets/line-78.png')}
        />
        <View style={[styles.maskGroupParent, styles.groupParentFlexBox]}>
          <Image
            style={styles.maskGroupIcon}
            contentFit="cover"
            source={require('../../assets/farita3.png')}
          />
          <Image
            style={styles.maskGroupIcon}
            contentFit="cover"
            source={require('../../assets/marie.png')}
          />
          <Image
            style={styles.maskGroupIcon}
            contentFit="cover"
            source={require('../../assets/farita4.png')}
          />
          <Image
            style={styles.maskGroupIcon}
            contentFit="cover"
            source={require('../../assets/claire.png')}
          />
          <Image
            style={styles.vectorIcon2}
            contentFit="cover"
            source={require('../../assets/vector54.png')}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  groupParentFlexBox: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  miBiografaActual: {
    fontWeight: '500',
    textAlign: 'left',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    lineHeight: 24,
    fontSize: FontSize.size_xl
  },
  vectorIcon1: {
    width: 20,
    height: 20
  },
  vectorGroup: {
    width: 59,
    height: 24,
    alignItems: 'center'
  },
  miBiografaActualParent: {
    width: '100%',
    bottom: '2%'
  },
  frameChild: {
    width: '100%',
    height: 5
  },
  icon: {
    height: 24,
    width: 19
  },
  lockParent: {
    right: '300%'
  },
  maskGroupIcon: {
    width: 70,
    height: 70
  },
  vectorIcon2: {
    width: 30,
    height: 30
  },
  maskGroupParent: {
    width: '100%',
    alignItems: 'center'
  },
  frameContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10
  },
  frameParent: {
    left: '2%',
    top: '13%',
    width: '96%',
    gap: 30,
    marginBottom: 170
  }
})

export default MiLegado
