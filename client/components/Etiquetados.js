import React, { useContext } from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Pressable, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontSize, FontFamily, Color, Border, Padding } from '../GlobalStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { Context } from '../context/Context'
import { useSelector } from 'react-redux'

const Etiquetados = () => {
  const { selectedPostTags, selectedPost } = useContext(Context)
  const { allUsers, userData } = useSelector((state) => state.users)
  const { setShowTaggedsModal, taggedsData } = useContext(Context)
  const navigation = useNavigation()
  
  return (
    <View
      style={{
        backgroundColor: Color.white,
        width: '80%',
        borderRadius: Border.br_5xl,
        padding: Padding.p_base,
        justifyContent: 'center'
      }}
    >
      <Pressable
        onPress={() => {
          if (selectedPost.user.id !== userData.id) {
            navigation.navigate('OtherUserProfile', selectedPost.user)
          } else {
            navigation.navigate('Perfil')
          }
        }}
        style={{ alignItems: 'center', flexDirection: 'row', gap: 8 }}
      >
        <Image
          style={{ width: 30, height: 30, borderRadius: 8 }}
          source={
            selectedPost.user.profilePicture
              ? { uri: selectedPost.user.profilePicture }
              : require('../assets/logoo.png')
          }
        ></Image>
        <Text style={{ width: '80%' }}>
          {selectedPost.user.username} {selectedPost.user.apellido}
        </Text>
      </Pressable>
      <Image
        style={styles.image}
        contentFit="cover"
        source={require('../assets/line-94.png')}
      />

      {selectedPostTags.length > 0 ? (
        selectedPostTags.map((tag, index) => (
          <Pressable
            onPress={() => {
              setShowTaggedsModal(false)
              if (tag === userData.id) {
                navigation.navigate('Perfil')
                return
              }
              navigation.navigate(
                'OtherUserProfile',
                allUsers.filter((user) => user.id.toString() === tag)[0]
              )
            }}
            key={index}
            style={[styles.frameGroup, styles.frameGroupFlexBox]}
          >
            <View key={index + 999999} style={styles.frameContainer}>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                source={
                  allUsers.filter((user) => user.id.toString() === tag)[0]
                    ? {
                        uri: allUsers.filter(
                          (user) => user.id.toString() === tag
                        )[0].profilePicture
                      }
                    : require('../assets/frame-15477548751.png')
                }
              />
              <Text style={styles.brunoPham}>
                {allUsers.filter((user) => user.id.toString() === tag)[0]
                  .username +
                  ' ' +
                  allUsers.filter((user) => user.id.toString() === tag)[0]
                    .apellido}
              </Text>
            </View>
          </Pressable>
        ))
      ) : (
        <Text style={{ color: '#404040', fontSize: 15, marginTop: 16 }}>
          La publicación no tiene etiquetados.
        </Text>
      )}
      <Image
        style={styles.image}
        contentFit="cover"
        source={require('../assets/line-94.png')}
      />
      <Pressable
        style={[styles.frameGroup, styles.frameGroupFlexBox]}
        onPress={() => setShowTaggedsModal(false)}
      >
        <LinearGradient
          style={styles.button}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <Text style={{ color: '#fff' }}>Aceptar</Text>
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
  frameParentPosition: {},
  frameGroupFlexBox: {
    alignSelf: 'stretch',
    marginTop: '6%'
  },
  frameItem: {
    width: 30,
    height: 30,
    borderRadius: 8
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
