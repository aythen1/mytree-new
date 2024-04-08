import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const OpcionesCulturas = ({ onClose }) => {
  return (
    <View style={[styles.opcionesCulturas, styles.frameChildLayout]}>
      <View style={styles.anglosajonaFlexBox}>
        <Text style={[styles.anglosajona, styles.latinaTypo]}>Anglosajona</Text>
        <Image
          style={[styles.frameChild, styles.latinaFlexBox]}
          contentFit="cover"
          source={require("../assets/line-786.png")}
        />
        <Text style={[styles.latina, styles.latinaFlexBox]}>Latina</Text>
        <Image
          style={[styles.frameChild, styles.latinaFlexBox]}
          contentFit="cover"
          source={require("../assets/line-772.png")}
        />
        <Text style={[styles.latina, styles.latinaFlexBox]}>Otra</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  latinaTypo: {
    textAlign: "left",
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  latinaFlexBox: {
    marginTop: 20,
    flex: 1,
    alignSelf: "stretch",
  },
  anglosajona: {
    flex: 1,
    alignSelf: "stretch",
  },
  frameChild: {
    overflow: "hidden",
    width: "100%",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  latina: {
    textAlign: "left",
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  anglosajonaFlexBox: {
    flex: 1,
    alignSelf: "stretch",
  },
  opcionesCulturas: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.white,
    width: 428,
    height: 413,
    paddingHorizontal: Padding.p_xl,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_237xl,
  },
});

export default OpcionesCulturas;
