import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Padding, Border } from "../GlobalStyles";

const FormatoArbol = ({ onClose }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.formatoArbol}
      onPress={() => navigation.navigate("CrearEvento")}
    >
      <View>
        <View>
          <View style={styles.frameContainer}>
            <View style={styles.frameView}>
              <View style={styles.frameParent1}>
                <View style={styles.frameParent1}>
                  <Image
                    style={styles.frameChild}
                    contentFit="cover"
                    source={require("../assets/frame-1547754875.png")}
                  />
                  <Text style={styles.brunoPham}>Bruno Pham</Text>
                </View>
                <View style={[styles.check, styles.checkLayout]}>
                  <View style={styles.checkChild} />
                </View>
              </View>
              <View style={styles.frameItem} />
              <View style={styles.frameParent1}>
                <View style={styles.frameParent1}>
                  <Image
                    style={styles.frameChild}
                    contentFit="cover"
                    source={require("../assets/frame-1547754875.png")}
                  />
                  <Text style={styles.brunoPham}>Bruno Pham</Text>
                </View>
                <View style={[styles.check, styles.checkLayout]}>
                  <View style={styles.checkChild} />
                </View>
              </View>
              <View style={styles.frameItem} />
              <View style={styles.frameParent1}>
                <View style={styles.frameParent1}>
                  <Image
                    style={styles.frameChild}
                    contentFit="cover"
                    source={require("../assets/frame-1547754875.png")}
                  />
                  <Text style={styles.brunoPham}>Bruno Pham</Text>
                </View>
                <View style={[styles.check, styles.checkLayout]}>
                  <View style={styles.checkChild} />
                </View>
              </View>
            </View>
            <View style={styles.lineParent}>
              <View style={[styles.frameChild1, styles.frameChildLayout]} />
              <View style={[styles.frameChild2, styles.frameChildLayout]} />
            </View>
            <View style={styles.frameParent7}>
              <View style={styles.frameParent1}>
                <View style={styles.frameParent1}>
                  <Image
                    style={styles.frameChild}
                    contentFit="cover"
                    source={require("../assets/frame-1547754875.png")}
                  />
                  <Text style={styles.brunoPham}>Bruno Pham</Text>
                </View>
                <View style={[styles.check, styles.checkLayout]}>
                  <View style={styles.checkChild} />
                </View>
              </View>
              <View style={styles.frameItem} />
              <View style={styles.frameParent1}>
                <View style={styles.frameParent1}>
                  <Image
                    style={styles.frameChild}
                    contentFit="cover"
                    source={require("../assets/frame-1547754875.png")}
                  />
                  <Text style={styles.brunoPham}>Bruno Pham</Text>
                </View>
                <View style={[styles.check, styles.checkLayout]}>
                  <View style={styles.checkChild} />
                </View>
              </View>
              <View style={styles.frameItem} />
              <View style={styles.frameParent1}>
                <View style={styles.frameParent1}>
                  <Image
                    style={styles.frameChild}
                    contentFit="cover"
                    source={require("../assets/frame-1547754875.png")}
                  />
                  <Text style={styles.brunoPham}>Bruno Pham</Text>
                </View>
                <View style={[styles.check, styles.checkLayout]}>
                  <View style={styles.checkChild} />
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.frameChild8, styles.frameChildLayout]} />
          <View style={styles.conectadosParent}>
            <Text style={[styles.conectados, styles.signInLayout]}>
              Conectados
            </Text>
            <View style={styles.frameParent14}>
              <View style={styles.frameParent1}>
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require("../assets/frame-15477548753.png")}
                />
                <Text style={styles.brunoPham}>Bruno Pham</Text>
              </View>
              <View style={styles.checkLayout}>
                <View style={styles.checkChild} />
              </View>
            </View>
            <View style={styles.frameParent14}>
              <View style={styles.frameParent1}>
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require("../assets/frame-15477548753.png")}
                />
                <Text style={styles.brunoPham}>Bruno Pham</Text>
              </View>
              <View style={styles.checkLayout}>
                <View style={styles.checkChild} />
              </View>
            </View>
          </View>
        </View>
        <LinearGradient
          style={styles.button}
          locations={[0, 1]}
          colors={["#dee274", "#7ec18c"]}
        >
          <Text style={[styles.signIn, styles.signInLayout]}>Aceptar</Text>
        </LinearGradient>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkLayout: {
    height: 20,
    width: 20,
  },
  frameChildLayout: {
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  signInLayout: {
    lineHeight: 24,
    fontFamily: FontFamily.lato,
  },
  frameChild: {
    width: 30,
    height: 30,
  },
  brunoPham: {
    lineHeight: 19,
    fontWeight: "700",
    color: Color.grisDiscord,
    textAlign: "justify",
    marginLeft: 13,
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  frameParent1: {
    alignItems: "center",
    flexDirection: "row",
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
    marginLeft: 5,
  },
  frameItem: {
    borderRightWidth: 1,
    width: 1,
    height: 37,
    borderColor: Color.grisClaro,
    borderStyle: "solid",
  },
  frameView: {
    alignItems: "center",
  },
  frameChild1: {
    width: 57,
    height: 1,
    borderTopWidth: 1,
    borderColor: Color.grisClaro,
  },
  frameChild2: {
    marginTop: 67,
    width: 57,
    height: 1,
    borderTopWidth: 1,
    borderColor: Color.grisClaro,
  },
  lineParent: {
    paddingHorizontal: 0,
    marginLeft: 10,
    paddingVertical: Padding.p_sm,
  },
  frameParent7: {
    marginLeft: 10,
    alignItems: "center",
  },
  frameContainer: {
    flexDirection: "row",
  },
  frameChild8: {
    borderColor: Color.secundario,
    width: 389,
    marginTop: 20,
    height: 1,
    borderTopWidth: 1,
  },
  conectados: {
    fontSize: FontSize.size_xl,
    fontWeight: "500",
    color: Color.colorGray_200,
    textAlign: "left",
    letterSpacing: 0,
    lineHeight: 24,
  },
  frameParent14: {
    justifyContent: "space-between",
    width: 388,
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  conectadosParent: {
    width: 388,
    marginTop: 20,
  },
  signIn: {
    flex: 1,
    letterSpacing: 1,
    color: Color.white,
    textAlign: "center",
    lineHeight: 24,
    fontSize: FontSize.size_base,
  },
  button: {
    justifyContent: "center",
    paddingHorizontal: Padding.p_5xl,
    backgroundColor: Color.linearBoton,
    marginTop: 40,
    width: 388,
    paddingVertical: Padding.p_sm,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_11xl,
  },
  formatoArbol: {
    padding: Padding.p_xl,
    maxWidth: "100%",
    maxHeight: "100%",
    flexDirection: "row",
    backgroundColor: Color.white,
    borderRadius: Border.br_11xl,
  },
});

export default FormatoArbol;
