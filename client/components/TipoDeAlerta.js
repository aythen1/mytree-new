import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";

const TipoDeAlerta = ({ onClose }) => {
  return (
    <View style={styles.tipoDeAlerta}>
      <View style={styles.tuveUnAccidenteParent}>
        <Text style={[styles.tuveUnAccidente, styles.aadirTypo]}>
          ¡Tuve un accidente!
        </Text>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/line-802.png")}
        />
        <Text style={[styles.aprobElExmen, styles.aadirTypo]}>
          ¡Aprobé el exámen!
        </Text>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/line-802.png")}
        />
        <Text style={[styles.aprobElExmen, styles.aadirTypo]}>
          ¡El bebé está por nacer!
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
    flex: 1,
    alignSelf: "stretch",
  },
  tuveUnAccidente: {
    color: Color.gris,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    flex: 1,
    alignSelf: "stretch",
  },
  frameChild: {
    marginTop: 20,
    width: 388,
    maxHeight: "100%",
  },
  aprobElExmen: {
    marginTop: 20,
    color: Color.gris,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    flex: 1,
    alignSelf: "stretch",
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
    flex: 1,
    alignSelf: "stretch",
  },
  tuveUnAccidenteParent: {
    height: 196,
    width: 388,
  },
  tipoDeAlerta: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.white,
    paddingHorizontal: Padding.p_xl,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_178xl,
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default TipoDeAlerta;
