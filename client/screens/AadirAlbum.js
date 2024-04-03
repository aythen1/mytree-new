import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, FontFamily, Border, Color, Padding } from "../GlobalStyles";

const AadirAlbum = () => {
  return (
    <View style={styles.aadirAlbum}>
      <View>
        <Text style={[styles.aadirLbum, styles.lbumTypo]}>Añadir álbum</Text>
        <View style={styles.field}>
          <Text style={[styles.nuevoLbum, styles.signInTypo]}>Nuevo álbum</Text>
        </View>
        <View style={styles.recomendadosParent}>
          <Text style={[styles.recomendados, styles.recomendadosTypo]}>
            Recomendados:
          </Text>
          <View style={[styles.button, styles.buttonFlexBox]}>
            <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
              #MiPrimeraBicicleta
            </Text>
          </View>
          <View style={[styles.button, styles.buttonFlexBox]}>
            <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
              #Felicidad
            </Text>
          </View>
          <View style={[styles.button, styles.buttonFlexBox]}>
            <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
              #Happy
            </Text>
          </View>
          <View style={[styles.button, styles.buttonFlexBox]}>
            <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
              #Emoción
            </Text>
          </View>
          <View style={[styles.button, styles.buttonFlexBox]}>
            <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
              #NosVamosDeViaje
            </Text>
          </View>
          <View style={[styles.button, styles.buttonFlexBox]}>
            <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
              #CumpleañosFeliz
            </Text>
          </View>
        </View>
      </View>
      <LinearGradient
        style={[styles.button6, styles.buttonFlexBox]}
        locations={[0, 1]}
        colors={["#dee274", "#7ec18c"]}
      >
        <Text style={[styles.signIn, styles.signInTypo]}>Guardar</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  lbumTypo: {
    textAlign: "left",
    fontWeight: "500",
    letterSpacing: 0,
  },
  signInTypo: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
  },
  recomendadosTypo: {
    lineHeight: 14,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    letterSpacing: 0,
  },
  buttonFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_11xl,
  },
  aadirLbum: {
    fontSize: FontSize.size_xl,
    color: Color.textTextPrimary,
    fontFamily: FontFamily.lato,
    textAlign: "left",
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: 0,
  },
  nuevoLbum: {
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
    marginTop: 20,
    width: 388,
  },
  recomendados: {
    color: Color.primary,
  },
  miprimerabicicleta: {
    color: Color.primario1,
  },
  button: {
    backgroundColor: Color.secundario,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_6xs,
    marginLeft: 7,
  },
  recomendadosParent: {
    width: 364,
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
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
  button6: {
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    marginTop: 147,
    width: 388,
    justifyContent: "center",
  },
  aadirAlbum: {
    backgroundColor: Color.white,
    width: "100%",
    padding: Padding.p_xl,
    flex: 1,
    borderRadius: Border.br_11xl,
  },
});

export default AadirAlbum;
