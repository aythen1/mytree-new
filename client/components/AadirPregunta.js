import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const AadirPregunta = ({ onClose }) => {
  return (
    <View style={styles.aadirPregunta}>
      <View style={styles.frameParentFlexBox}>
        <View style={styles.frameParentFlexBox}>
          <View style={styles.frameParentFlexBox}>
            <Text style={[styles.aadirPregunta1, styles.preguntaTypo]}>
              Añadir pregunta
            </Text>
            <View style={styles.field}>
              <Text style={[styles.nuevaPregunta, styles.signInTypo]}>
                Nueva pregunta
              </Text>
            </View>
          </View>
          <View style={[styles.fieldWithTitle1, styles.frameParentFlexBox]}>
            <Text style={[styles.aadirPregunta1, styles.preguntaTypo]}>
              Añadir respuesta
            </Text>
            <View style={styles.field}>
              <Text style={[styles.nuevaPregunta, styles.signInTypo]}>
                Nueva respuesta
              </Text>
            </View>
          </View>
        </View>
        <LinearGradient
          style={styles.button}
          locations={[0, 1]}
          colors={["#dee274", "#7ec18c"]}
        >
          <Text style={[styles.signIn, styles.signInTypo]}>Guardar</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  preguntaTypo: {
    textAlign: "left",
    fontWeight: "500",
    letterSpacing: 0,
  },
  signInTypo: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
  },
  frameParentFlexBox: {
    flex: 1,
    alignSelf: "stretch",
  },
  aadirPregunta1: {
    fontSize: FontSize.size_xl,
    color: Color.textTextPrimary,
    fontFamily: FontFamily.lato,
    textAlign: "left",
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: 0,
    alignSelf: "stretch",
  },
  nuevaPregunta: {
    position: "absolute",
    marginTop: -9.5,
    top: "50%",
    left: 20,
    lineHeight: 19,
    color: Color.gris,
    textAlign: "left",
    fontWeight: "500",
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  field: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    height: 49,
    marginTop: 1,
    alignSelf: "stretch",
  },
  fieldWithTitle1: {
    marginTop: 20,
  },
  signIn: {
    letterSpacing: 1,
    color: Color.white,
    textAlign: "center",
    fontSize: FontSize.size_base,
    lineHeight: 24,
    flex: 1,
  },
  button: {
    width: 388,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    marginTop: 153,
    borderRadius: Border.br_11xl,
  },
  aadirPregunta: {
    backgroundColor: Color.white,
    height: 413,
    padding: Padding.p_xl,
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: Border.br_11xl,
  },
});

export default AadirPregunta;
