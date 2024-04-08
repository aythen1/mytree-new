import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const OpcionesFormatoFecha = ({ onClose }) => {
  return (
    <View style={[styles.opcionesFormatoFecha, styles.frameChildLayout]}>
      <View style={styles.mmddaaaaHhmmssTtParent}>
        <Text style={[styles.mmddaaaaHhmmssTt, styles.mdyyHmsTtTypo]}>
          MM/dd/aaaa hh:mm:ss tt
        </Text>
        <Image
          style={[styles.frameChild, styles.mdyyHmsTtSpaceBlock]}
          contentFit="cover"
          source={require("../assets/line-78.png")}
        />
        <Text style={[styles.mdyyHmsTt, styles.mdyyHmsTtSpaceBlock]}>
          M/d/yy h:m:s tt
        </Text>
        <Image
          style={[styles.frameChild, styles.mdyyHmsTtSpaceBlock]}
          contentFit="cover"
          source={require("../assets/line-78.png")}
        />
        <Text style={[styles.mdyyHmsTt, styles.mdyyHmsTtSpaceBlock]}>
          ddd MMM dd aaaa
        </Text>
        <Image
          style={[styles.frameChild, styles.mdyyHmsTtSpaceBlock]}
          contentFit="cover"
          source={require("../assets/line-78.png")}
        />
        <Text style={[styles.mdyyHmsTt, styles.mdyyHmsTtSpaceBlock]}>
          dddd, MMMM dd aaaa
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  mdyyHmsTtTypo: {
    textAlign: "left",
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  mdyyHmsTtSpaceBlock: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  mmddaaaaHhmmssTt: {
    alignSelf: "stretch",
  },
  frameChild: {
    overflow: "hidden",
    width: "100%",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  mdyyHmsTt: {
    textAlign: "left",
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  mmddaaaaHhmmssTtParent: {
    flex: 1,
    alignSelf: "stretch",
  },
  opcionesFormatoFecha: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.white,
    width: 428,
    height: 413,
    paddingHorizontal: Padding.p_xl,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_178xl,
  },
});

export default OpcionesFormatoFecha;
