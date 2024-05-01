import React from 'react'
import { StyleSheet, View } from 'react-native'

const HeaderIcons = ({ icons }) => {
  return (
    <View style={styles.container}>
      {icons && icons.map((icon, index) => <View key={index}>{icon}</View>)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,marginTop:5,
  }
})

export default HeaderIcons
