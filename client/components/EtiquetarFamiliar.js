import * as React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { FontFamily, FontSize, Color, Padding, Border } from '../GlobalStyles'
import Checkbox from './Checkbox'
import { useSelector } from 'react-redux'
import reactotron from 'reactotron-react-native'

const EtiquetarFamiliar = ({ onClose, taggedUsers, setTaggedUsers }) => {
  const { allUsers, userData } = useSelector((state) => state.users)
  const [text, setText] = React.useState('')
  const userFamily =
    allUsers.filter((user) => user.id === userData.id)[0]?.familyIds || []
  const userFriends =
    allUsers.filter((user) => user.id === userData.id)[0]?.friendsIds || []

  const handleToggleTag = (userId) => {

      setTaggedUsers(userId)
    
  }

//   reactotron.display({
//     name: 'Tacos',
//     value: { a: 1, b: [1, 2, 3] },
//     preview: 'when you click here, it might surprise you!',
//     important: true,
//     image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg'
//   })


  return (
    <View
      style={{
        width: '100%',
        height: 510,
        backgroundColor: Color.white,
        borderTopRightRadius: Border.br_11xl,
        borderTopLeftRadius: Border.br_11xl,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: Color.primario1
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
            Amigos
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            maxHeight: 150,
            overflow: 'hidden',
            flexGrow: 1,
            marginTop: 5
          }}
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center'
          }}
        >
          {userFriends.length === 0 && (
            <Text
              style={{
                color: '#000',
                marginTop: 15,
                fontSize: 16,
                alignSelf: 'center',
                fontWeight: 400
              }}
            >
              ¡Aún no tienes ningún contacto agregado a amigos!
            </Text>
          )}
          {userFriends.length > 0 &&
            userFriends.map((friendMember, index) => (
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
                  <Image
                    style={{ width: 30, height: 30 }}
                    contentFit="cover"
                    source={require('../assets/frame-1547754875.png')}
                  />
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
                    {allUsers.filter(
                      (user) => user.id.toString() === friendMember
                    )[0]?.username +
                      ' ' +
                      allUsers.filter(
                        (user) => user.id.toString() === friendMember
                      )[0]?.apellido}
                  </Text>
                </View>
                <Checkbox
                  checked={taggedUsers.includes(friendMember.toString())}
                  setChecked={() => handleToggleTag(friendMember.toString())}
                />
              </View>
            ))}
        </ScrollView>

        <View
          style={{
            alignSelf: 'flex-start',
            marginTop: 20,
            alignItems: 'center'
          }}
        >
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
            Familia
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            maxHeight: 150,
            overflow: 'hidden',
            flexGrow: 1,
            marginTop: 5
          }}
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center'
          }}
        >
          {userFamily.length === 0 && (
            <Text
              style={{
                color: '#000',
                marginTop: 15,
                fontSize: 16,
                alignSelf: 'center',
                fontWeight: 400
              }}
            >
              ¡Aún no tienes ningún contacto agregado a familiares!
            </Text>
          )}
          {userFamily.length > 0 &&
            userFamily.map((familyMember, index) => (
              <View
                key={index}
                style={{
                  marginTop: 15,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center'
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={{ width: 30, height: 30 }}
                    contentFit="cover"
                    source={require('../assets/frame-1547754875.png')}
                  />
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
                    {allUsers.filter(
                      (user) => user.id.toString() === familyMember
                    )[0]?.username +
                      ' ' +
                      allUsers.filter(
                        (user) => user.id.toString() === familyMember
                      )[0]?.apellido}
                  </Text>
                </View>
                <Checkbox
                  checked={taggedUsers.includes(familyMember.toString())}
                  setChecked={() => handleToggleTag(familyMember.toString())}
                />
              </View>
            ))}
        </ScrollView>

        <View
          style={{
            alignSelf: 'flex-start',
            marginTop: 20,
            alignItems: 'center'
          }}
        >
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
            Ingresar
          </Text>
        </View>
        <View
          style={{
            borderColor: Color.secundario,
            borderTopWidth: 1,
            width: '100%',
            height: 1,
            marginTop: 15,
            borderStyle: 'solid',
          }}
        >
        </View>
      <View style={{justifyContent:"flex-start",width:"100%"}}>
      <TextInput
      style={{width:"100%",paddingTop:10}}
            placeholder="Agregar.."
            value={text}
            onChangeText={setText}
          ></TextInput>
      </View>
      </View>

      <TouchableOpacity style={{ marginTop: 40 }} onPress={()=>{
        handleToggleTag(text)
        onClose()
      }}>
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

export default EtiquetarFamiliar
