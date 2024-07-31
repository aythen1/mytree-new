import React from 'react'
import { View, TextInput, Pressable, Dimensions } from 'react-native'
import { Image } from 'expo-image'
import { Color, Border, Padding, FontFamily, FontSize } from '../GlobalStyles'
import MasBusquedaSVG from './svgs/MasBusquedaSVG'

const BarraBusqueda = ({ navigate, route, fromSearch, search, setSearch }) => {
  const handlePress = () => {
    if (navigate && route) {
      navigate(route)
    }
  }

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        width: fromSearch ? '100%' : Dimensions.get('screen').width * 0.9,
        marginLeft: !fromSearch && Dimensions.get('screen').width * 0.05,
        backgroundColor: Color.white,
        marginTop: fromSearch ? 10 : 20,
        justifyContent: 'space-between',
        paddingHorizontal:10
      }}
    >
      <View
        style={{
          backgroundColor: Color.fAFAFA,
          paddingHorizontal: Padding.p_sm,
          paddingVertical: 3.5,
          borderRadius: Border.br_3xs,
          width: '85%',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Image
          style={{ width: 20, height: 20 }}
          contentFit="cover"
          source={require('../assets/iconlylightoutlinesearch4.png')}
        />
        <View
          style={{
            marginLeft: 6,
            flexDirection: 'row',
            flex: 1
          }}
        >
          <TextInput
            style={{
              fontSize: FontSize.size_sm,
              lineHeight: 21,
              fontStyle: 'italic',
              fontWeight: '200',
              fontFamily: FontFamily.nunito,
              color: Color.textPlaceholder,
              letterSpacing: 0,
              textAlign: 'left',
              width:"100%"
            }}
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Buscar"
            placeholderTextColor={Color.textPlaceholder}
          />
        </View>
      </View>
      <Pressable onPress={handlePress}>
        {fromSearch ? (
          <Pressable
            style={{
              width: 37,
              height: 37,
              borderRadius: 100,
              backgroundColor: Color.fAFAFA,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              style={{ width: 20, height: 20, marginRight: 3 }}
              contentFit="cover"
              source={require('../assets/blackSend.png')}
            />
          </Pressable>
        ) : (
          <MasBusquedaSVG />
        )}
      </Pressable>
    </View>
  )
}

export default BarraBusqueda
