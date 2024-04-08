import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const OpcionesInicioDeSemana = ({ onClose }) => {
  return (
    <View style={[styles.opcionesInicioDeSemana, styles.frameChildLayout]}>
      <View style={styles.sbadoParent}>
        <Text style={[styles.sbado, styles.sbadoTypo]}>Sábado</Text>
        <Image
          style={[styles.frameChild, styles.domingoFlexBox]}
          contentFit="cover"
          source={require("../assets/line-786.png")}
        />
        <Text style={[styles.domingo, styles.domingoFlexBox]}>Domingo</Text>
        <Image
          style={[styles.frameChild, styles.domingoFlexBox]}
          contentFit="cover"
          source={require("../assets/line-772.png")}
        />
        <Text style={[styles.domingo, styles.domingoFlexBox]}>Lunes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  sbadoTypo: {
    textAlign: "left",
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  domingoFlexBox: {
    marginTop: 20,
    flex: 1,
    alignSelf: "stretch",
  },
  sbado: {
    flex: 1,
    textAlign: "left",
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    alignSelf: "stretch",
  },
  frameChild: {
    overflow: "hidden",
    width: "100%",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  domingo: {
    textAlign: "left",
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  sbadoParent: {
    height: 137,
    alignSelf: "stretch",
  },
  opcionesInicioDeSemana: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.white,
    width: 428,
    paddingHorizontal: Padding.p_xl,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_237xl,
  },
});

export default OpcionesInicioDeSemana;
