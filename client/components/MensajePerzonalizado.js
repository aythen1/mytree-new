import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const MensajePerzonalizado = ({ onClose }) => {
  return (
    <View style={styles.mensajePerzonalizado}>
      <View style={styles.cumpleaosParent}>
        <Text style={styles.cumpleaosTypo}>Cumpleaños</Text>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/line-802.png")}
        />
        <Text style={[styles.aniversario, styles.cumpleaosTypo]}>
          Aniversario
        </Text>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/line-802.png")}
        />
        <Text style={[styles.aniversario, styles.cumpleaosTypo]}>
          Graduación
        </Text>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/line-802.png")}
        />
        <Text style={[styles.aniversario, styles.cumpleaosTypo]}>
          Nacimiento
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cumpleaosTypo: {
    textAlign: "left",
    color: Color.gris,
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
  aniversario: {
    marginTop: 20,
  },
  cumpleaosParent: {
    height: 196,
    width: 388,
  },
  mensajePerzonalizado: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.white,
    paddingHorizontal: Padding.p_xl,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_178xl,
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default MensajePerzonalizado;
