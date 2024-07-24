import React from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const FooterBarSVG = (props) => {
  const screenWidth = Dimensions.get('screen').width;

  return (
    <View style={{
      position: 'absolute',
      bottom: -10,
      width: "100%",
      alignItems: 'center', // Asegura que el SVG esté centrado
    }}>
      <View style={{
        width: screenWidth,
        height: 75,
        backgroundColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -10 }, // Sombra hacia arriba
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, // Para Android
        position: 'absolute',
      }} />
      <Svg
        style={{
          backgroundColor: 'transparent',
        }}
        width={"100%"}
        height={75}
        viewBox="0 0 428 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M9.13071 0H165.949C170.181 0 173.588 3.34429 174.764 7.40949C179.271 22.9824 194.635 35 213.429 35C232.424 35 247.916 24.2583 252.235 7.47931C253.294 3.36385 256.703 0 260.953 0H418.869C423.912 0 428 3.97969 428 8.88889V75H0V8.88889C0 3.97969 4.08798 0 9.13071 0Z"
          fill="#fff"
        />
      </Svg>
    </View>
  );
};

export default FooterBarSVG;
