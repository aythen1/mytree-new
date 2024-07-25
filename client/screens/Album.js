import React, { useEffect } from 'react'
import { Text, StyleSheet, View, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { FontFamily, FontSize, Color, Border, Padding } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const Album = ({ albums, setAlbums, onClose }) => {
  const navigation = useNavigation()
  const { userAlbums } = useSelector((state) => state.albums)
  useEffect(() => {
    console.log('userAlbums from Album', userAlbums)
  }, [])

  if (userAlbums.length === 0)
    return (
      <View style={styles.album}>
        <Text
          style={[styles.lbumDeMi, styles.lbumTypo, { paddingVertical: 20 }]}
        >
          ¡Todavía no has creado ningún album!
        </Text>
        <Pressable onPress={() => navigation.navigate('CrearAlbum')}>
          <Text style={[styles.aadirLbum, styles.lbumTypo]}>
            + Añadir álbum
          </Text>
        </Pressable>
      </View>
    )

  return (
    <View style={styles.album}>
      {userAlbums.map((album, i) => (
        <Pressable
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          onPress={() => {
            console.log('triggering album pick')
            const actualAlbums = [...albums]
            if (actualAlbums.includes(album.id)) {
              setAlbums(actualAlbums.filter((alb) => alb.id === album.id))
              return
            } else {
              setAlbums([...actualAlbums, album.id])
            }
          }}
          key={album.id}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.lbumDeMi, styles.lbumTypo, { maxWidth: '50%' }]}
          >
            {album.description}
          </Text>
          <Image
            contentFit="cover"
            style={{ width: 20, height: 20 }}
            source={
              albums.includes(album.id)
                ? require('../assets/checked.png')
                : require('../assets/notchecked.png')
            }
          />
        </Pressable>
      ))}
      <Pressable onPress={() => navigation.navigate('CrearAlbum')}>
        <Text style={[styles.aadirLbum, styles.lbumTypo]}>+ Añadir álbum</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  lbumTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  lbumDeMi: {
    color: Color.gris,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  albumChild: {
    maxHeight: '100%',
    width: 388,
    marginTop: 20
  },
  lbumDeMi1: {
    marginTop: 20,
    color: Color.gris,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  aadirLbum: {
    color: Color.primario1,
    marginTop: 20,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  album: {
    borderTopRightRadius: Border.br_11xl,
    borderTopLeftRadius: Border.br_11xl,
    backgroundColor: Color.white,
    position: 'absolute',
    bottom: 0,

    width: '100%',
    padding: Padding.p_xl
  }
})

export default Album
