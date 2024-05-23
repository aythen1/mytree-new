import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, {
  G,
  Path,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeBlend
} from 'react-native-svg'

const FooterIcon = () => {
  return (
    <View style={styles.container}>
      <Svg
        width="488"
        height="135"
        viewBox="0 0 488 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <G filter="url(#filter0_d_4609_691)">
          <Path
            d="M39.1307 31H195.949C200.181 31 203.588 34.3443 204.764 38.4095C209.271 53.9824 224.635 66 243.429 66C262.424 66 277.916 55.2583 282.235 38.4793C283.294 34.3639 286.703 31 290.953 31H448.869C453.912 31 458 34.9797 458 39.8889V106H30V39.8889C30 34.9797 34.088 31 39.1307 31Z"
            fill="white"
          />
        </G>
        <Defs>
          <Filter
            id="filter0_d_4609_691"
            x="0"
            y="0"
            width="488"
            height="135"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <FeFlood floodOpacity="0" result="BackgroundImageFix" />
            <FeColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <FeOffset dy="-1" />
            <FeGaussianBlur stdDeviation="15" />
            <FeColorMatrix
              type="matrix"
              values="0 0 0 0 0.541176 0 0 0 0 0.584314 0 0 0 0 0.619608 0 0 0 0.2 0"
            />
            <FeBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_4609_691"
            />
            <FeBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_4609_691"
              result="shape"
            />
          </Filter>
        </Defs>
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default FooterIcon
