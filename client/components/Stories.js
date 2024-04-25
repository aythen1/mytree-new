import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

const Stories = () => {
  // const { stories } = useSelector((state) => state.stories)

  return (
    <View style={{ top: 15, width: '100%', justifyContent: 'center' }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {/* {stories.map((story) => (
          <View key={story.name} style={styles.youLayout}>
            <Image
              style={[styles.aatarIcon, styles.aatarIconPosition]}
              contentFit="cover"
              source={story.image}
            />
            <View>
              <Text>{story.name}</Text>
            </View>
          </View>
        ))} */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  youLayout: {
    height: 90,
    width: 70,
    marginLeft: 10,
    alignItems: 'center'
  },
  aatarIcon: {
    height: 70,
    top: 0,
    width: 70
  },

  aatarIconPosition: {
    width: 70
  }
})

export default Stories
