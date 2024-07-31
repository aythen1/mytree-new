import * as React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { FontFamily, FontSize, Color, Padding, Border } from '../GlobalStyles'
import Checkbox from './Checkbox'
import { useSelector } from 'react-redux'
import useFetchHook from '../utils/useFetchHook'

const EtiquetarUno = ({ onClose, taggedUsers, setTaggedUsers ,data}) => {
  const { allUsers, userData } = useSelector((state) => state.users)
  const [users ,setUsers] = React.useState([])

  console.log(data,"dataaaaaaa")



    React.useEffect(() => {
      if (data) {
        const uniqueData = data.filter((item, index, self) => 
          index === self.findIndex((t) => t.id === item.id)
        );
        setUsers(uniqueData);
        console.log(uniqueData, 'data del hoooksss');
      }
    }, [data]);

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
        borderWidth:1,borderBottomWidth:0,borderColor:Color.primario1
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
            Seleccionar
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
          {data && data?.length === 0 && (
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
          {users && users?.length > 0 &&
            users.map((friendMember, index) => (
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
                <TouchableOpacity onPress={()=> {setTaggedUsers(friendMember.id);onClose(),console.log(friendMember,"member")}} style={{ flexDirection: 'row', alignItems: 'center' ,width:"100%"}}>
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
                    {allUsers.find(
                      (user) => user.id === friendMember.id
                    )?.username +
                      ' ' +
                      allUsers.find(
                        (user) => user.id === friendMember.id
                      )?.apellido}
                  </Text>
                </TouchableOpacity>
           
              </View>
            ))}
          
        </ScrollView>

      
        <View
          style={{
            borderColor: Color.secundario,
            width: '100%',
            height: 1,
            marginTop: 15,
            borderStyle: 'solid'
          }}
        />
       
      </View>
      {/* <TouchableOpacity style={{ marginTop: 40 }} onPress={onClose}>
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
      </TouchableOpacity> */}
    </View>
  )
}

export default EtiquetarUno
