import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { FontSize, FontFamily, Color } from '../../../GlobalStyles'
import Post from '../../../components/Post'
import { useSelector } from 'react-redux'

const BusquedaHashtags = ({ search, setSeach, filteredPosts }) => {
  // const { allPosts } = useSelector((state) => state.posts)
  // const [filteredPosts, setFilteredPosts] = useState(allPosts || [])
  // useEffect(() => {
  //   if (search.length > 0) {
  //     setFilteredPosts(
  //       allPosts.filter((post) => {
  //         if (post?.hashtags?.length > 0) {
  //           const hashtagsLowerCase = post.hashtags.map((hashtag) =>
  //             hashtag.toLowerCase()
  //           )
  //           return hashtagsLowerCase.includes(search.toLowerCase())
  //         } else {
  //           return false
  //         }
  //       })
  //     )
  //   } else {
  //     setFilteredPosts(allPosts)
  //   }
  // }, [search])

  if (search.length > 0) {
    return <Post posts={filteredPosts} padding={true} />
  } else
    return (
      <ScrollView
        style={styles.bsquedaPublicaciones}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.image2Parent}>
          <Image
            style={styles.image2Icon}
            contentFit="cover"
            source={require('../../../assets/fontistohashtag.png')}
          />
          <Text style={[styles.subeTusRecuerdos, styles.retosTypo]}>
            ¡Ingresa un hashtag para realizar una busqueda de publicaciones en
            base a el!
          </Text>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  bsquedaPublicaciones: {
    flex: 1,
    paddingBottom: 50,
    top: '30%'
  },
  image2Icon: {
    width: 121,
    height: 126
  },
  image2Parent: {
    alignItems: 'center'
  },
  subeTusRecuerdos: {
    color: Color.colorDarkgray_100,
    marginTop: 30,
    textAlign: 'center',
    fontSize: FontSize.size_base
  },
  retosTypo: {
    textAlign: 'center',
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato
  }
})

export default BusquedaHashtags
