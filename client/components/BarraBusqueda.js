import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Dimensions
} from 'react-native'
import { Image } from 'expo-image'
import { Color, Border, Padding, FontFamily, FontSize } from '../GlobalStyles'
import MasBusquedaSVG from './svgs/MasBusquedaSVG'

const BarraBusqueda = ({ navigate, route }) => {
  const handlePress = () => {
    if (navigate && route) {
      navigate(route)
    }
  }

  return (
    <View style={styles.header}>
      <View style={styles.searchBar}>
        <Image
          style={styles.iconlylightOutlinesearch}
          contentFit="cover"
          source={require('../assets/iconlylightoutlinesearch4.png')}
        />
        <View style={styles.placeholderInput}>
          <TextInput
            style={styles.search}
            placeholder="Search"
            placeholderTextColor={Color.textPlaceholder}
          />
        </View>
      </View>
      <Pressable onPress={handlePress}>
        <MasBusquedaSVG />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('screen').width * 0.9,
    marginLeft: Dimensions.get('screen').width * 0.05,
    backgroundColor: Color.white,
    marginTop: 20,
    justifyContent: 'space-between'
  },
  searchBar: {
    backgroundColor: Color.fAFAFA,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: 3.5,
    borderRadius: Border.br_3xs,
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconlylightOutlinesearch: {
    width: 20,
    height: 20
  },
  placeholderInput: {
    marginLeft: 6,
    flexDirection: 'row',
    flex: 1
  },
  search: {
    fontSize: FontSize.size_sm,
    lineHeight: 21,
    fontStyle: 'italic',
    fontWeight: '200',
    fontFamily: FontFamily.nunito,
    color: Color.textPlaceholder,
    letterSpacing: 0,
    textAlign: 'left'
  }
})

export default BarraBusqueda
