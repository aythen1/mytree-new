import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const OpcionesCaategora = ({ onClose }) => {
  return (
    <View style={styles.opcionesCaategora}>
      <View style={styles.aniversarioParent}>
        <Text style={[styles.aniversario, styles.aadirTypo]}>Aniversario</Text>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/line-802.png")}
        />
        <Text style={[styles.graduacin, styles.aadirTypo]}>Graduación</Text>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/line-802.png")}
        />
        <Text style={[styles.graduacin, styles.aadirTypo]}>
          Compra de primer coche
        </Text>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/line-802.png")}
        />
        <Text style={[styles.aadir, styles.aadirTypo]}>+ Añadir</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aadirTypo: {
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  aniversario: {
    color: Color.gris,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  frameChild: {
    marginTop: 20,
    width: 388,
    maxHeight: "100%",
  },
  graduacin: {
    marginTop: 20,
    color: Color.gris,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  aadir: {
    color: Color.primario2,
    marginTop: 20,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  aniversarioParent: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 388,
  },
  opcionesCaategora: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.white,
    width: 428,
    height: 413,
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default OpcionesCaategora;
