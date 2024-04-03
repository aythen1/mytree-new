import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Border, FontFamily, FontSize, Color, Padding } from "../GlobalStyles";

const FormatoLista = ({ onClose }) => {
  return (
    <View style={[styles.formatoLista, styles.buttonLayout]}>
      <View style={styles.frameParent}>
        <View style={styles.frameGroup}>
          <View style={styles.parentFlexBox}>
            <Text style={[styles.grupo1, styles.grupo1Typo]}>Grupo 1</Text>
            <View style={styles.check}>
              <View style={styles.checkChild} />
            </View>
          </View>
          <View style={styles.frameChild} />
          <View style={[styles.frameContainer, styles.parentFlexBox]}>
            <View style={styles.frameView}>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                source={require("../assets/frame-1547754875.png")}
              />
              <Text style={[styles.brunoPham, styles.grupo1Typo]}>
                Bruno Pham
              </Text>
            </View>
            <View style={styles.check}>
              <View style={styles.checkChild} />
            </View>
          </View>
          <View style={[styles.frameContainer, styles.parentFlexBox]}>
            <View style={styles.frameView}>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                source={require("../assets/frame-1547754875.png")}
              />
              <Text style={[styles.brunoPham, styles.grupo1Typo]}>
                Bruno Pham
              </Text>
            </View>
            <View style={styles.check}>
              <View style={styles.checkChild} />
            </View>
          </View>
          <View style={[styles.frameContainer, styles.parentFlexBox]}>
            <View style={styles.frameView}>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                source={require("../assets/frame-1547754875.png")}
              />
              <Text style={[styles.brunoPham, styles.grupo1Typo]}>
                Bruno Pham
              </Text>
            </View>
            <View style={styles.check}>
              <View style={styles.checkChild} />
            </View>
          </View>
          <View style={[styles.grupo2Parent, styles.parentFlexBox]}>
            <Text style={[styles.grupo1, styles.grupo1Typo]}>Grupo 2</Text>
            <View style={styles.check}>
              <View style={styles.checkChild} />
            </View>
          </View>
          <View style={styles.frameChild} />
          <View style={[styles.frameContainer, styles.parentFlexBox]}>
            <View style={styles.frameView}>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                source={require("../assets/frame-1547754875.png")}
              />
              <Text style={[styles.brunoPham, styles.grupo1Typo]}>
                Bruno Pham
              </Text>
            </View>
            <View style={styles.check}>
              <View style={styles.checkChild} />
            </View>
          </View>
          <View style={[styles.frameContainer, styles.parentFlexBox]}>
            <View style={styles.frameView}>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                source={require("../assets/frame-1547754875.png")}
              />
              <Text style={[styles.brunoPham, styles.grupo1Typo]}>
                Bruno Pham
              </Text>
            </View>
            <View style={styles.check}>
              <View style={styles.checkChild} />
            </View>
          </View>
        </View>
        <LinearGradient
          style={[styles.button, styles.buttonLayout]}
          locations={[0, 1]}
          colors={["#dee274", "#7ec18c"]}
        >
          <Text style={[styles.signIn, styles.grupo1Typo]}>Aceptar</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonLayout: {
    borderRadius: Border.br_11xl,
    flexDirection: "row",
  },
  grupo1Typo: {
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
  },
  parentFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  grupo1: {
    fontWeight: "500",
    color: Color.colorGray_200,
    textAlign: "left",
    lineHeight: 19,
    letterSpacing: 0,
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
  },
  checkChild: {
    position: "absolute",
    height: "105%",
    width: "105%",
    top: "-2.5%",
    right: "-2.5%",
    bottom: "-2.5%",
    left: "-2.5%",
    borderRadius: 3,
    borderColor: Color.colorGainsboro_100,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Color.white,
  },
  check: {
    width: 20,
    height: 20,
  },
  frameChild: {
    borderColor: Color.secundario,
    borderTopWidth: 1,
    width: 389,
    height: 1,
    marginTop: 15,
    borderStyle: "solid",
  },
  frameItem: {
    width: 30,
    height: 30,
  },
  brunoPham: {
    fontWeight: "700",
    color: Color.grisDiscord,
    textAlign: "justify",
    marginLeft: 13,
    lineHeight: 19,
    letterSpacing: 0,
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
  },
  frameView: {
    alignItems: "center",
    flexDirection: "row",
  },
  frameContainer: {
    marginTop: 15,
    flex: 1,
  },
  grupo2Parent: {
    marginTop: 15,
  },
  frameGroup: {
    height: 320,
    alignItems: "center",
  },
  signIn: {
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
    flex: 1,
  },
  button: {
    width: 388,
    justifyContent: "center",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    marginTop: 57,
    alignItems: "center",
    flexDirection: "row",
  },
  frameParent: {
    flex: 1,
    alignSelf: "stretch",
  },
  formatoLista: {
    width: 428,
    padding: Padding.p_xl,
    maxWidth: "100%",
    maxHeight: "100%",
    flexDirection: "row",
    backgroundColor: Color.white,
  },
});

export default FormatoLista;
