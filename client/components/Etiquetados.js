import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Pressable, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontSize, FontFamily, Color, Border, Padding } from '../GlobalStyles'
import { LinearGradient } from 'expo-linear-gradient'

const Etiquetados = ({ setShowTagged }) => {
  const navigation = useNavigation()

  const handleClose = () => {
    setShowTagged(false)
  }

  return (
    <View style={styles.frameParentPosition}>
      <Image
        style={styles.image}
        contentFit="cover"
        source={require('../assets/line-94.png')}
      />
      <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
        <View style={styles.frameContainer}>
          <Image
            style={styles.frameItem}
            contentFit="cover"
            source={require('../assets/frame-15477548751.png')}
          />
          <Text style={styles.brunoPham}>Bruno Pham</Text>
        </View>
      </View>
      <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
        <View style={styles.frameContainer}>
          <Image
            style={styles.frameItem}
            contentFit="cover"
            source={require('../assets/frame-15477548752.png')}
          />
          <Text style={styles.brunoPham}>Bruno Pham</Text>
        </View>
      </View>
      <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
        <View style={styles.frameContainer}>
          <Image
            style={styles.frameItem}
            contentFit="cover"
            source={require('../assets/frame-15477548751.png')}
          />
          <Text style={styles.brunoPham}>Bruno Pham</Text>
        </View>
      </View>
      <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
        <View style={styles.frameContainer}>
          <Image
            style={styles.frameItem}
            contentFit="cover"
            source={require('../assets/frame-15477548752.png')}
          />
          <Text style={styles.brunoPham}>Bruno Pham</Text>
        </View>
      </View>
      <Image
        style={styles.image}
        contentFit="cover"
        source={require('../assets/line-94.png')}
      />
      <Pressable
        style={[styles.frameGroup, styles.frameGroupFlexBox]}
        onPress={handleClose}
      >
        <LinearGradient
          style={styles.button}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <Text>Aceptar</Text>
        </LinearGradient>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  iconLayout: {
    overflow: 'hidden',
    width: '100%'
  },
  frameParentPosition: {
    left: '20%',
    top: '30%',
    backgroundColor: Color.white,
    height: '50%',
    width: '75%',
    borderRadius: Border.br_5xl,
    padding: Padding.p_base,
    justifyContent: 'center'
  },
  frameGroupFlexBox: {
    alignSelf: 'stretch',
    marginTop: '6%'
  },
  frameItem: {
    width: 30,
    height: 30
  },
  image: {
    height: 1.5,
    marginTop: 15
  },
  brunoPham: {
    fontSize: FontSize.size_sm,
    lineHeight: 19,
    color: Color.grisDiscord,
    textAlign: 'justify',
    marginLeft: 13,
    fontWeight: '700',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  frameContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  frameGroup: {
    gap: 50,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    height: 48,
    width: '100%',
    borderRadius: Border.br_11xl,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})

export default Etiquetados
