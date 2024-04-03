import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";

const CONDOLENCIAS = ({ onClose }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.condolencias}>
      <Text style={[styles.queridosJohnY, styles.aceptarTypo]}>
        Queridos John y Jane, nuestras más sinceras condolencias por la pérdida
        que han sufrido. Sabemos que no hay palabras suficientes para aliviar el
        dolor, pero queremos que sepan que desde MyTree estamos pensando en
        ustedes y enviándoles fuerza y amor en este momento.
      </Text>
      <LinearGradient
        style={styles.button}
        locations={[0, 1]}
        colors={["#dee274", "#7ec18c"]}
      >
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate("PERFILCREARIDINFANTEANCE")}
        >
          <Text style={[styles.aceptar, styles.aceptarTypo]}>Aceptar</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  aceptarTypo: {
    textAlign: "center",
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  queridosJohnY: {
    alignSelf: "stretch",
    flex: 1,
    fontSize: FontSize.size_lg,
    lineHeight: 27,
    color: Color.negro,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  aceptar: {
    position: "absolute",
    marginTop: -11,
    marginLeft: -24,
    top: "50%",
    left: "50%",
    fontSize: FontSize.size_sm,
    lineHeight: 21,
    color: Color.white,
  },
  pressable: {
    width: "100%",
    height: "100%",
    backgroundColor: Color.linearBoton,
    borderRadius: Border.br_11xl,
  },
  button: {
    width: 388,
    height: 52,
    marginTop: 159,
  },
  condolencias: {
    backgroundColor: Color.white,
    width: 428,
    height: 413,
    padding: Padding.p_xl,
    maxWidth: "100%",
    maxHeight: "100%",
    alignItems: "center",
    borderRadius: Border.br_11xl,
  },
});

export default CONDOLENCIAS;
