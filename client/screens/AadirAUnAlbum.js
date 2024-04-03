import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const AadirAUnAlbum = () => {
  return (
    <View style={styles.aadirAUnAlbum}>
      <View style={styles.frameFlexBox}>
        <View style={styles.vectorParent}>
          <Image
            style={[styles.vectorIcon, styles.vectorIconLayout]}
            contentFit="cover"
            source={require("../assets/vector12.png")}
          />
          <View style={styles.check}>
            <View style={styles.checkChild} />
            <Image
              style={[styles.vectorIcon1, styles.vectorIconLayout]}
              contentFit="cover"
              source={require("../assets/vector13.png")}
            />
          </View>
          <Text style={[styles.aadirAMi, styles.aadirTypo]}>
            Añadir a mi legado
          </Text>
        </View>
        <View style={[styles.button, styles.buttonLayout]}>
          <Text style={[styles.aadirEtapa, styles.aadirEtapaPosition]}>
            Añadir etapa
          </Text>
          <Image
            style={styles.stroke1Icon}
            contentFit="cover"
            source={require("../assets/stroke12.png")}
          />
        </View>
      </View>
      <View style={[styles.frameGroup, styles.frameFlexBox]}>
        <View style={styles.checkParent}>
          <View style={styles.check1}>
            <View style={styles.checkChild} />
            <Image
              style={[styles.vectorIcon1, styles.vectorIconLayout]}
              contentFit="cover"
              source={require("../assets/vector13.png")}
            />
          </View>
          <Text style={styles.aadirTypo}>Añadir a mis álbumes</Text>
        </View>
        <View style={[styles.button1, styles.buttonLayout]}>
          <Text style={[styles.elegirLbum, styles.aadirEtapaPosition]}>
            Elegir álbum
          </Text>
          <Image
            style={styles.stroke1Icon}
            contentFit="cover"
            source={require("../assets/stroke12.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vectorIconLayout: {
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    position: "absolute",
  },
  aadirTypo: {
    textAlign: "left",
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    marginLeft: 10,
  },
  buttonLayout: {
    height: 27,
    width: 128,
    backgroundColor: Color.secundario,
    borderRadius: Border.br_11xl,
  },
  aadirEtapaPosition: {
    textAlign: "center",
    color: Color.primario1,
    lineHeight: 18,
    fontSize: FontSize.size_xs,
    left: "50%",
    top: "50%",
    marginTop: -9.5,
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    position: "absolute",
  },
  frameFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  vectorIcon: {
    height: "60%",
    width: "10.75%",
    top: "20%",
    right: "87.92%",
    bottom: "20%",
    left: "1.32%",
    zIndex: 0,
  },
  checkChild: {
    height: "105%",
    width: "105%",
    top: "-2.5%",
    right: "-2.5%",
    bottom: "-2.5%",
    left: "-2.5%",
    borderRadius: 3,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro_100,
    borderWidth: 1,
    position: "absolute",
    backgroundColor: Color.white,
  },
  vectorIcon1: {
    height: "34.5%",
    width: "45%",
    top: "35%",
    right: "30%",
    bottom: "30.5%",
    left: "25%",
  },
  check: {
    zIndex: 1,
    marginLeft: 10,
    height: 20,
    width: 20,
  },
  aadirAMi: {
    zIndex: 2,
  },
  vectorParent: {
    flexDirection: "row",
  },
  aadirEtapa: {
    marginLeft: -33,
  },
  stroke1Icon: {
    top: 11,
    left: 108,
    width: 10,
    height: 5,
    position: "absolute",
  },
  button: {
    marginLeft: 101,
  },
  check1: {
    height: 20,
    width: 20,
  },
  checkParent: {
    flexDirection: "row",
  },
  elegirLbum: {
    marginLeft: -32,
  },
  button1: {
    marginLeft: 83,
  },
  frameGroup: {
    marginTop: 20,
  },
  aadirAUnAlbum: {
    flex: 1,
    width: "100%",
    padding: Padding.p_xl,
    backgroundColor: Color.white,
    borderRadius: Border.br_11xl,
  },
});

export default AadirAUnAlbum;
