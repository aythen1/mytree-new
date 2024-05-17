import * as React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  TextInput
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontFamily, FontSize, Color, Padding, Border } from '../GlobalStyles'
import { AntDesign } from '@expo/vector-icons'

const CreateWishListModal = ({ onClose, wishList, setWishList }) => {
  const [wish, setWish] = React.useState('')
  const handleAddWish = () => {
    if (!wishList.includes(wish.toLowerCase())) {
      setWishList([...wishList, wish])
      setWish('')
    }
  }

  const handleRemoveWish = (name) => {
    if (wishList.includes(name)) {
      const newWishList = wishList.filter((wish) => wish !== name)
      setWishList(newWishList)
    }
  }

  return (
    <View
      style={{
        width: '100%',
        height: 400,
        backgroundColor: Color.white,
        borderTopRightRadius: Border.br_11xl,
        borderTopLeftRadius: Border.br_11xl,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 30
      }}
    >
      <View
        style={{
          top: 20,
          width: '100%',
          alignItems: 'center'
        }}
      >
        <View style={{ alignSelf: 'flex-start', alignItems: 'center' }}>
          <Text
            style={{
              fontWeight: '500',
              color: Color.colorGray_200,
              textAlign: 'left',
              lineHeight: 19,
              letterSpacing: 0,
              fontFamily: FontFamily.lato,
              fontSize: FontSize.size_base
            }}
          >
            Lista de deseos
          </Text>
        </View>
        <View
          style={{
            borderColor: Color.secundario,
            borderTopWidth: 1,
            width: '100%',
            height: 1,
            marginTop: 15,
            borderStyle: 'solid'
          }}
        />
        {wishList.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: 135,
              maxHeight: 150,
              overflow: 'hidden',
              flexGrow: 1,
              marginTop: 5,
              marginBottom: 10
            }}
            contentContainerStyle={{
              width: '100%',
              alignItems: 'center'
            }}
          >
            {wishList.map((wish, index) => (
              <View
                key={-index}
                style={{
                  marginTop: 15,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center'
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: Color.grisDiscord,
                      textAlign: 'justify',
                      marginLeft: 13,
                      lineHeight: 19,
                      letterSpacing: 0,
                      fontFamily: FontFamily.lato,
                      fontSize: FontSize.size_base
                    }}
                  >
                    {wish}
                  </Text>
                </View>
                <Pressable onPress={() => handleRemoveWish(wish)}>
                  <AntDesign name="close" size={22} color={'#404040'} />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View
            style={{ height: 150, width: '100%', justifyContent: 'center' }}
          >
            <Text
              style={{
                color: '#404040',
                textAlign: 'center',
                fontFamily: FontFamily.lato,
                fontSize: 14,
                width: '100%'
              }}
            >
              Aun no has agregado ningun deseo a tu lista!
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          borderColor: Color.secundario,
          borderTopWidth: 1,
          width: '100%',
          height: 1,
          marginTop: 15,
          borderStyle: 'solid'
        }}
      />

      <TextInput
        value={wish}
        onChangeText={(text) => setWish(text)}
        style={{
          paddingVertical: Padding.p_smi,
          backgroundColor: Color.fAFAFA,
          borderRadius: Border.br_3xs,
          paddingHorizontal: Padding.p_xl,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          marginTop: 10
        }}
        placeholder="Ingresa tu deseo"
      />

      <TouchableOpacity style={{ marginTop: 10 }} onPress={handleAddWish}>
        <LinearGradient
          style={{
            justifyContent: 'center',
            paddingHorizontal: Padding.p_5xl,
            paddingVertical: Padding.p_sm,
            backgroundColor: Color.linearBoton,
            width: '100%',
            flexDirection: 'row',
            borderRadius: Border.br_11xl
          }}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <Text
            style={{
              flex: 1,
              letterSpacing: 1,
              lineHeight: 24,
              color: Color.white,
              textAlign: 'center',
              fontFamily: FontFamily.lato,
              fontSize: FontSize.size_base
            }}
          >
            Agregar deseo
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 10 }} onPress={onClose}>
        <LinearGradient
          style={{
            justifyContent: 'center',
            paddingHorizontal: Padding.p_5xl,
            paddingVertical: Padding.p_sm,
            backgroundColor: Color.linearBoton,
            width: '100%',
            flexDirection: 'row',
            borderRadius: Border.br_11xl
          }}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <Text
            style={{
              flex: 1,
              letterSpacing: 1,
              lineHeight: 24,
              color: Color.white,
              textAlign: 'center',
              fontFamily: FontFamily.lato,
              fontSize: FontSize.size_base
            }}
          >
            Aceptar
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default CreateWishListModal
