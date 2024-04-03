import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const OpcionesIdioma = ({ onClose }) => {
  return (
    <View style={[styles.opcionesIdioma, styles.frameChildLayout]}>
      <View style={styles.inglsParent}>
        <Text style={[styles.ingls, styles.inglsTypo]}>Inglés</Text>
        <Image
          style={[styles.frameChild, styles.espaolSpaceBlock]}
          contentFit="cover"
          source={require("../assets/line-78.png")}
        />
        <Text style={[styles.espaol, styles.espaolSpaceBlock]}>Español</Text>
        <Image
          style={[styles.frameChild, styles.espaolSpaceBlock]}
          contentFit="cover"
          source={require("../assets/line-78.png")}
        />
        <Text style={[styles.espaol, styles.espaolSpaceBlock]}>Francés</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  inglsTypo: {
    textAlign: "left",
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  espaolSpaceBlock: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  ingls: {
    alignSelf: "stretch",
  },
  frameChild: {
    overflow: "hidden",
    width: "100%",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  espaol: {
    textAlign: "left",
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  inglsParent: {
    flex: 1,
    alignSelf: "stretch",
  },
  opcionesIdioma: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.white,
    width: 428,
    height: 413,
    paddingHorizontal: Padding.p_xl,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_237xl,
  },
});

export default OpcionesIdioma;
