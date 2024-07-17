import React, { useContext } from 'react'
import { Text, StyleSheet, View, Pressable, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import { Color, FontSize, FontFamily } from '../../GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Context } from '../../context/Context'

const MiLegado = ({ albums, posts, events, diaries }) => {
  const navigation = useNavigation()

  const { userAlbums } = useSelector((state) => state.albums)
  const { userEvents } = useSelector((state) => state.events)
  const { userDiaries } = useSelector((state) => state.diaries)

  const { userPosts } = useSelector((state) => state.posts)
  const { setShowSelectEventTypeModal } = useContext(Context)

  console.log(diaries, 'albums1111111111111111111111')

  return (
    <View style={styles.frameParent}>
      <View style={styles.frameContainer}>
        <View
          style={[
            styles.miBiografaActualParent,
            styles.groupParentFlexBox,
            { justifyContent: 'space-between', alignItems: 'center' }
          ]}
        >
          <Text style={styles.miBiografaActual}>{albums ? 'Álbumes' : 'Mis Álbumes'}</Text>
        {!albums && (
            <Pressable onPress={() => navigation.navigate('CrearAlbum')}>
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require('../../assets/vector53.png')}
            />
          </Pressable>
        )}
        </View>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require('../../assets/line-78.png')}
        />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 20,
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          {albums
            ? albums.map((album) => (
                <Pressable
                  key={album.id}
                  onPress={() => navigation.navigate('CrearLbum', { album })}
                >
                  <Image
                    style={{ width: 70, height: 70, borderRadius: 100 }}
                    contentFit="cover"
                    source={
                      album?.images?.length > 0
                        ? { uri: album.images[0] }
                        : require('../../assets/claire.png')
                    }
                  />
                </Pressable>
              ))
            : userAlbums.map((album) => (
                <Pressable
                  key={album.id}
                  onPress={() => navigation.navigate('CrearLbum', { album })}
                >
                  <Image
                    style={{ width: 70, height: 70, borderRadius: 100 }}
                    contentFit="cover"
                    source={
                      album.images.length > 0
                        ? { uri: album.images[0] }
                        : require('../../assets/claire.png')
                    }
                  />
                </Pressable>
              ))}
        </View>
      </View>
      <View style={styles.frameContainer}>
        <View
          style={[
            styles.miBiografaActualParent,
            styles.groupParentFlexBox,
            { justifyContent: 'space-between', alignItems: 'center' }
          ]}
        >
          <Text style={styles.miBiografaActual}>{posts ? 'Publicaciones':'Mis Publicaciones'}</Text>
         {!posts && (
           <Pressable onPress={() => navigation.navigate('UploadMemory')}>
           <Image
             style={styles.vectorIcon1}
             contentFit="cover"
             source={require('../../assets/vector53.png')}
           />
         </Pressable>
         )}
        </View>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require('../../assets/line-78.png')}
        />
        <ScrollView
          horizontal
          contentContainerStyle={{ gap: 25 }}
          showsHorizontalScrollIndicator={false}
          style={[styles.maskGroupParent, styles.groupParentFlexBox]}
        >
          {posts
            ? posts.map((e, i) => (
                <Image
                  style={styles.maskGroupIcon}
                  contentFit="cover"
                  source={{ uri: e.photos[0] }}
                />
              ))
            : userPosts.map((e, i) => (
                <Image
                  style={styles.maskGroupIcon}
                  contentFit="cover"
                  source={{ uri: e.photos[0] }}
                />
              ))}
        </ScrollView>
      </View>

      <View style={styles.frameContainer}>
        <View
          style={[
            styles.miBiografaActualParent,
            styles.groupParentFlexBox,
            { justifyContent: 'space-between', alignItems: 'center' }
          ]}
        >
          <Text style={styles.miBiografaActual}>Eventos</Text>
         {!events && (
           <Pressable onPress={() => setShowSelectEventTypeModal(true)}>
           <Image
             style={styles.vectorIcon1}
             contentFit="cover"
             source={require('../../assets/vector53.png')}
           />
         </Pressable>
         )}
        </View>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require('../../assets/line-78.png')}
        />
        <ScrollView
          contentContainerStyle={{ gap: 25 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={[styles.maskGroupParent, styles.groupParentFlexBox]}
        >
          {events
            ? events.map((e, i) => {
                return (
                  <Pressable key={i}>
                    <Image
                      style={{ ...styles.maskGroupIcon, borderRadius: 100 }}
                      contentFit="cover"
                      source={
                        e.coverImage
                          ? { uri: e.coverImage }
                          : require('../../assets/mytreelogofinal.png')
                      }
                    />
                  </Pressable>
                )
              })
            : userEvents.map((e, i) => {
                return (
                  <Pressable key={i}>
                    <Image
                      style={{ ...styles.maskGroupIcon, borderRadius: 100 }}
                      contentFit="cover"
                      source={
                        e.coverImage
                          ? { uri: e.coverImage }
                          : require('../../assets/mytreelogofinal.png')
                      }
                    />
                  </Pressable>
                )
              })}
        </ScrollView>
      </View>
      <View style={styles.frameContainer}>
        <View
          style={[
            styles.miBiografaActualParent,
            styles.groupParentFlexBox,
            { justifyContent: 'space-between', alignItems: 'center' }
          ]}
        >
          <Text style={styles.miBiografaActual}>Diarios</Text>
       {!diaries && (
           <Pressable
           onPress={() => navigation.navigate('MIDIARIOPANTALLAPERSONAL')}
         >
           <Image
             style={styles.vectorIcon1}
             contentFit="cover"
             source={require('../../assets/vector53.png')}
           />
         </Pressable>
       )}
        </View>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require('../../assets/line-78.png')}
        />
         <ScrollView
          contentContainerStyle={{ gap: 25 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={[styles.maskGroupParent, styles.groupParentFlexBox]}
        >
          {diaries
            ? diaries.map((e, i) => {
                return (
                  <Pressable key={i}>
                    <Image
                      style={{ ...styles.maskGroupIcon, borderRadius: 100 }}
                      contentFit="cover"
                      source={
                        e?.coverImage
                          ? { uri: e?.coverImage }
                          : require('../../assets/thum.png')
                      }
                    />
                  </Pressable>
                )
              })
            : userDiaries.map((e, i) => {
                return (
                  <Pressable key={i}>
                    <Image
                      style={{ ...styles.maskGroupIcon, borderRadius: 100 }}
                      contentFit="cover"
                      source={
                        e?.coverImage
                          ? { uri: e?.coverImage }
                          : require('../../assets/thum.png')
                      }
                    />
                  </Pressable>
                )
              })}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  groupParentFlexBox: {
    flexDirection: 'row',
    gap: 25
  },
  miBiografaActual: {
    fontWeight: '500',
    textAlign: 'left',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    lineHeight: 24,
    fontSize: FontSize.size_xl
  },
  vectorIcon1: {
    width: 20,
    height: 20
  },
  vectorGroup: {
    width: 59,
    height: 24,
    alignItems: 'center'
  },
  miBiografaActualParent: {
    width: '100%',
    bottom: '2%'
  },
  frameChild: {
    width: '100%',
    height: 1
  },
  maskGroupIcon: {
    width: 70,
    height: 70,
    borderRadius: 10
  },
  vectorIcon2: {
    width: 30,
    height: 30
  },
  maskGroupParent: {
    width: '100%'
  },
  frameContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10
  },
  frameParent: {
    paddingHorizontal: 10,
    paddingTop: 40,
    width: '100%',
    gap: 30,
    marginBottom: 130
  }
})

export default MiLegado
