import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { FontFamily, FontSize, Color } from '../../../GlobalStyles'
import { useSelector } from 'react-redux'

const BusquedaContactos = () => {
  const { userData, allUsers } = useSelector((state) => state.users)
  const userFamily =
    allUsers.filter((user) => user.id === userData.id)[0]?.familyIds || []
  const userFriends =
    allUsers.filter((user) => user.id === userData.id)[0]?.friendsIds || []

  return (
    <ScrollView
      style={[styles.bsquedaContactos, styles.iconLayout]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.frameParent}>
        <View>
          <View>
            <Text style={[styles.familiares, styles.retosLayout]}>
              Familiares
            </Text>
            <View style={[styles.frameChild, styles.frameChildLayout]} />
          </View>
          <View style={{ marginTop: 15, maxHeight: 100 }}>
            {userFamily.length > 0 ? (
              <ScrollView style={{ maxHeight: 100 }}>
                {userFamily.map((familyMember, index) => (
                  <View key={index} style={styles.frameParent1}>
                    <Image
                      style={styles.frameItem}
                      contentFit="cover"
                      source={require('../../../assets/frame-1547754875.png')}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        color: Color.grisDiscord,
                        textAlign: 'justify',
                        marginLeft: 13,
                        fontSize: FontSize.size_base,
                        lineHeight: 19,
                        fontFamily: FontFamily.lato,
                        fontWeight: '700',
                        letterSpacing: 0,
                        width: '80%'
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
                ))}
              </ScrollView>
            ) : (
              <Text
                style={{
                  color: '#000',
                  marginTop: 40,
                  fontSize: 16,
                  alignSelf: 'center',
                  fontWeight: 400
                }}
              >
                Aun no tienes ningun contacto agregado a familiares.
              </Text>
            )}
          </View>

          <View style={styles.frameParent4}>
            <View>
              <Text style={[styles.familiares, styles.retosLayout]}>
                Amigos
              </Text>
              <View style={[styles.frameChild, styles.frameChildLayout]} />
            </View>
            <View style={{ marginTop: 15, maxHeight: 100 }}>
              {userFriends.length > 0 ? (
                <ScrollView style={{ maxHeight: 100 }}>
                  {userFriends.map((friendMember, index) => (
                    <View key={index} style={styles.frameParent1}>
                      <Image
                        style={styles.frameItem}
                        contentFit="cover"
                        source={require('../../../assets/frame-1547754875.png')}
                      />
                      <Text
                        numberOfLines={1}
                        style={{
                          color: Color.grisDiscord,
                          textAlign: 'justify',
                          marginLeft: 13,
                          fontSize: FontSize.size_base,
                          lineHeight: 19,
                          fontFamily: FontFamily.lato,
                          fontWeight: '700',
                          letterSpacing: 0,
                          width: '80%'
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
                  ))}
                </ScrollView>
              ) : (
                <Text
                  style={{
                    color: '#000',
                    paddingHorizontal: 15,
                    marginTop: 40,
                    fontSize: 16,
                    alignSelf: 'center',
                    fontWeight: 400
                  }}
                >
                  Aun no tienes ningun contacto agregado a amigos.
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={[styles.frameChild3, styles.frameChildLayout]} />
        <View style={styles.userParent}>
          <Image
            style={styles.userIcon}
            contentFit="cover"
            source={require('../../../assets/3-user1.png')}
          />
          <Text style={[styles.invitaATu, styles.retosTypo]}>
            Invita a tu familia y tu familia elegida, y mantén una conexión
            duradera
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  iconLayout: {
    width: '100%',
    overflow: 'hidden'
  },
  retosTypo: {
    textAlign: 'center',
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato
  },
  retosLayout: {
    lineHeight: 19,
    letterSpacing: 0
  },
  frameChildLayout: {
    height: 1,
    width: 310,
    borderTopWidth: 1,
    borderColor: Color.secundario,
    borderStyle: 'solid'
  },
  familiares: {
    fontWeight: '500',
    color: Color.colorGray_200,
    fontSize: FontSize.size_base,
    lineHeight: 19,
    fontFamily: FontFamily.lato,
    textAlign: 'left'
  },
  frameChild: {
    marginTop: 15
  },
  frameItem: {
    width: 30,
    height: 30
  },
  brunoPham: {
    color: Color.grisDiscord,
    textAlign: 'justify',
    marginLeft: 13,
    fontSize: FontSize.size_base,
    lineHeight: 19,
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  frameParent1: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  frameParent2: {
    marginTop: 15,
    alignItems: 'center',
    flexDirection: 'row'
  },
  frameView: {
    marginTop: 15
  },
  frameParent4: {
    marginTop: 30
  },
  frameChild3: {
    marginTop: 30
  },
  userIcon: {
    width: 82,
    height: 57,
    overflow: 'hidden'
  },
  invitaATu: {
    color: Color.colorDarkgray_100,
    marginTop: 30
  },
  userParent: {
    marginTop: 30,
    alignItems: 'center',
    width: '80%',
    right: '5%'
  },
  frameParent: {
    alignItems: 'center'
  },
  bsquedaContactos: {
    overflow: 'hidden',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40
  }
})

export default BusquedaContactos
