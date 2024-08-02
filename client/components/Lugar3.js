import * as React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { FontFamily, FontSize, Color, Padding, Border } from '../GlobalStyles'
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps'

const Lugar3 = ({ onClose }) => {
  const [x, setX] = React.useState({ latitude: 37.78825, longitude: -122.4324 })
  const [markerPosition, setMarkerPosition] = React.useState(null)

  return (
    <View style={styles.lugar}>
      <View style={styles.header}>
        <View style={[styles.searchBar]}>
          <Image
            style={styles.iconlylightOutlinesearch}
            contentFit="cover"
            source={require('../assets/iconlylightoutlinesearch3.png')}
          />
          <View>
            <Text style={styles.search}>{`Buscar `}</Text>
          </View>
        </View>
        <View style={styles.iconlylightsendCopyWrapper}>
          <Image
            style={styles.iconlylightsendCopy}
            contentFit="cover"
            source={require('../assets/iconlylightsend-copy1.png')}
          />
        </View>
      </View>

      <MapView
        onPress={(e) => {
          setMarkerPosition(e.nativeEvent.coordinate)
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        style={{ width: '100%', height: 300 }}
      >
        {markerPosition && (
          <Marker
            coordinate={markerPosition}
            title="Marcador personalizado"
            description="Ubicación seleccionada por el usuario"
          />
        )}
      </MapView>
      <Pressable onPress={onClose}>
        <LinearGradient
          style={styles.button}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <Text style={[styles.signIn, styles.signInTypo]}>Guardar</Text>
        </LinearGradient>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  searchBarFlexBox: {
    flexDirection: 'row'
  },
  signInTypo: {
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base
  },
  iconlylightOutlinesearch: {
    width: 20,
    height: 20
  },
  search: {
    fontSize: FontSize.size_sm,
    lineHeight: 21,
    fontStyle: 'italic',
    fontWeight: '200',
    fontFamily: FontFamily.nunito,
    color: Color.textPlaceholder,
    textAlign: 'left',
    letterSpacing: 0
  },
  placeholderInput: {
    marginLeft: 6
  },
  searchBar: {
    backgroundColor: Color.backgroundFieldBackground,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: Padding.p_5xs,
    alignItems: 'center',
    borderRadius: Border.br_11xl,
    flexDirection: 'row',
    width: '86%'
    // backgroundColor: 'red'
  },
  iconlylightsendCopy: {
    width: 24,
    height: 24
  },
  iconlylightsendCopyWrapper: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.backgroundGreyBackground,
    padding: Padding.p_7xs,
    marginLeft: 16,
    flexDirection: 'row'
  },
  header: {
    // marginLeft: -212,
    width: '100%',
    paddingVertical: Padding.p_xs,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Color.white
  },
  rectangleIcon: {
    top: 89,
    borderTopLeftRadius: Border.br_9xs,
    borderTopRightRadius: Border.br_9xs,
    borderBottomLeftRadius: Border.br_8xs,
    height: 182,
    width: '100%'
    // left: 20
  },
  momento: {
    top: -2,
    left: 0,
    color: Color.textTextPrimary,
    fontWeight: '500',
    lineHeight: 19,
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    letterSpacing: 0,
    position: 'absolute'
  },
  titleBase: {
    width: 69,
    height: 19
  },
  culEsEste: {
    marginTop: -9.5,
    top: '50%',
    color: Color.gris,
    fontWeight: '500',
    lineHeight: 19,
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    letterSpacing: 0,
    position: 'absolute',
    left: 20
  },
  field: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    height: 49,
    width: 388
  },
  fieldWithTitle: {
    marginLeft: -194,
    top: 291,
    width: 388
  },
  signIn: {
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
    flex: 1
  },
  button: {
    marginTop: 20,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: Border.br_11xl
  },
  lugar: {
    flex: 1,
    width: '90%',
    position: 'absolute',
    paddingHorizontal: 20,
    paddingTop: 3,
    bottom: 20,
    height: 451,
    maxWidth: '100%',
    maxHeight: '100%',
    backgroundColor: Color.white,
    borderRadius: 30
  }
})

export default Lugar3
