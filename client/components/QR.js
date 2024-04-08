import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const QR = ({ onClose }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.qr}>
      <View style={styles.frameParent}>
        <View style={styles.image8Parent}>
          <Image
            style={styles.image8Icon}
            contentFit="cover"
            source={require("../assets/image-8.png")}
          />
          <View style={styles.searchBar}>
            <View style={styles.placeholderInput}>
              <Text style={[styles.search, styles.searchLayout]}>
                mytree.app/familia-diaz
              </Text>
            </View>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require("../assets/vector30.png")}
            />
          </View>
        </View>
        <View style={styles.compartirParent}>
          <Text style={[styles.compartir, styles.aceptarTypo]}>Compartir</Text>
          <View style={styles.skillIconsinstagramParent}>
            <Image
              style={styles.skillIconsinstagram}
              contentFit="cover"
              source={require("../assets/skilliconsinstagram2.png")}
            />
            <Image
              style={[styles.skillIconslinkedin, styles.frameChildLayout]}
              contentFit="cover"
              source={require("../assets/skilliconslinkedin2.png")}
            />
            <Image
              style={styles.frameChildLayout}
              contentFit="cover"
              source={require("../assets/group-1171276696.png")}
            />
            <Image
              style={[styles.skillIconslinkedin, styles.frameChildLayout]}
              contentFit="cover"
              source={require("../assets/deviconfacebook2.png")}
            />
          </View>
        </View>
        <LinearGradient
          style={styles.button}
          locations={[0, 1]}
          colors={["#dee274", "#7ec18c"]}
        >
          <Pressable
            style={styles.pressable}
            onPress={() => navigation.navigate("BOTONInvitarAmigos1")}
          >
            <Text style={[styles.aceptar, styles.aceptarTypo]}>Aceptar</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchLayout: {
    lineHeight: 21,
    fontSize: FontSize.size_sm,
  },
  aceptarTypo: {
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  frameChildLayout: {
    marginLeft: 20,
    height: 30,
    width: 30,
  },
  image8Icon: {
    width: 201,
    height: 201,
  },
  search: {
    fontStyle: "italic",
    fontWeight: "200",
    fontFamily: FontFamily.nunito,
    color: Color.textPlaceholder,
    textAlign: "left",
    letterSpacing: 0,
    lineHeight: 21,
    fontSize: FontSize.size_sm,
  },
  placeholderInput: {
    flex: 1,
    flexDirection: "row",
  },
  vectorIcon: {
    width: 21,
    height: 21,
    marginLeft: 6,
  },
  searchBar: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    height: 40,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: Padding.p_5xs,
    marginTop: 20,
    width: 388,
    alignItems: "center",
    flexDirection: "row",
  },
  image8Parent: {
    width: 388,
    alignItems: "center",
  },
  compartir: {
    fontSize: FontSize.size_base,
    lineHeight: 19,
    fontWeight: "500",
    color: Color.textTextPrimary,
    textAlign: "left",
  },
  skillIconsinstagram: {
    overflow: "hidden",
    height: 30,
    width: 30,
  },
  skillIconslinkedin: {
    overflow: "hidden",
  },
  skillIconsinstagramParent: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  compartirParent: {
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  aceptar: {
    position: "absolute",
    marginTop: -11,
    marginLeft: -24,
    top: "50%",
    left: "50%",
    color: Color.white,
    textAlign: "center",
    lineHeight: 21,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.lato,
  },
  pressable: {
    width: "100%",
    height: "100%",
    backgroundColor: Color.linearBoton,
    borderRadius: Border.br_11xl,
  },
  button: {
    height: 52,
    marginTop: 20,
    width: 388,
  },
  frameParent: {
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
  },
  qr: {
    backgroundColor: Color.white,
    width: 428,
    padding: Padding.p_xl,
    maxWidth: "100%",
    maxHeight: "100%",
    flexDirection: "row",
    borderRadius: Border.br_11xl,
  },
});

export default QR;
