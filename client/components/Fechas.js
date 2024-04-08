import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { Color, FontFamily, FontSize } from '../GlobalStyles'

const Fechas = () => {
  return (
    <View style={styles.frameGroup}>
      <Text style={styles.title}>Actividad Familiar</Text>
      <Pressable
        style={styles.frameContainer}
        onPress={() => navigation.navigate('Invitacin')}
      >
        <View style={styles.unsplashilip77sbmoeParent}>
          <Image
            style={styles.unsplashilip77sbmoeIcon}
            contentFit="cover"
            source={require('../assets/unsplashilip77sbmoe.png')}
          />
          <Image
            style={styles.vectorIcon}
            contentFit="cover"
            source={require('../assets/vector15.png')}
          />
        </View>
        <View style={styles.TextWrapper}>
          <Text style={[styles.marieContainerTypo]}>
            <Text style={styles.textTypo}>{`Bruno `}</Text>
            <Text style={styles.cumple28Aos}>cumple 28 años</Text>
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.frameFlexBox}
        onPress={() => navigation.navigate('Invitacin')}
      >
        <View style={styles.unsplashilip77sbmoeParent}>
          <Image
            style={styles.unsplashilip77sbmoeIcon}
            contentFit="cover"
            source={require('../assets/unsplashilip77sbmoe.png')}
          />
          <Image
            style={styles.vectorIcon}
            contentFit="cover"
            source={require('../assets/vector15.png')}
          />
        </View>
        <View style={styles.TextWrapper}>
          <Text style={[styles.marieContainerTypo]}>
            <Text style={styles.textTypo}>{`Bruno `}</Text>
            <Text style={styles.cumple28Aos}>
              ha organizado un evento familiar
            </Text>
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={[styles.frameWrapper, styles.frameFlexBox]}
        onPress={() => navigation.navigate('Invitacin')}
      >
        <View style={styles.unsplashilip77sbmoeParent}>
          <Image
            style={styles.unsplashilip77sbmoeIcon}
            contentFit="cover"
            source={require('../assets/unsplashilip77sbmoe.png')}
          />
          <Image
            style={styles.vectorIcon}
            contentFit="cover"
            source={require('../assets/vector15.png')}
          />
        </View>
        <View style={styles.TextWrapper}>
          <Text style={[styles.marieContainerTypo]}>
            <Text style={styles.textTypo}>{`Marie `}</Text>
            <Text style={styles.cumple28Aos}>cumple 28 años</Text>
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.frameFlexBox}
        onPress={() => navigation.navigate('Invitacin')}
      >
        <View style={styles.unsplashilip77sbmoeParent}>
          <Image
            style={styles.unsplashilip77sbmoeIcon}
            contentFit="cover"
            source={require('../assets/unsplashilip77sbmoe.png')}
          />
          <Image
            style={styles.vectorIcon}
            contentFit="cover"
            source={require('../assets/vector15.png')}
          />
        </View>
        <View style={styles.TextWrapper}>
          <Text style={styles.marieContainerTypo}>
            <Text style={styles.textTypo}>{`Marie `}</Text>
            <Text style={styles.cumple28Aos}>
              ha organizado un evento familiar
            </Text>
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  frameGroup: {
    marginTop: 19,
    alignSelf: 'stretch'
  },
  title: {
    fontSize: 25,
    color: Color.primario1,
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  frameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '5%'
  },
  unsplashilip77sbmoeParent: {
    flexDirection: 'row'
  },
  unsplashilip77sbmoeIcon: {
    width: 44,
    height: 44
  },
  vectorIcon: {
    top: '50%',
    height: 15,
    width: 20
  },
  TextWrapper: {
    width: '80%'
  },
  marieContainerTypo: {
    textAlign: 'justify',
    lineHeight: 22,
    fontSize: FontSize.size_lg
  },
  textTypo: {
    color: Color.primario1,
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  cumple28Aos: {
    color: Color.negro,
    fontFamily: FontFamily.lato
  },
  frameFlexBox: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row'
  }
})

export default Fechas
