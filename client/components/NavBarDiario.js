import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, Padding, Border, FontSize } from "../GlobalStyles";
import NubeSVG from "./svgs/NubeSVG";
import LogrosSVG from "./svgs/LogrosSVG";
import { Path, Svg } from "react-native-svg";
import DesafiosSVG from "./svgs/DesafiosSVG";
import BurbujaAnecdotaSVG from "./svgs/BurbujaAnecdotaSVG";
import AvionSVG from "./svgs/AviosSVG";
import EditarSVG from "./svgs/EditarSVG";
import { Context } from "../context/Context";

const NavBarDiario = () => {
  const navigation = useNavigation();
  const { selectedSection, setSelectedSection } = useContext(Context);

  return (
    <View
      style={{
        backgroundColor: Color.white,
        width: "100%",
        height: 60,
      }}
    >
      <View
        style={{
          backgroundColor: Color.colorHoneydew_100,
          height: 50,
          paddingHorizontal: Padding.p_xs,
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          left: 0,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            backgroundColor:
              selectedSection === "nube"
                ? Color.colorLavenderblush
                : Color.secundario,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
          }}
          onPress={() => {
            setSelectedSection("nube");
          }}
        >
          <NubeSVG onColor={"#FF5CE8"} clickColor={selectedSection} />
        </Pressable>
        <Pressable
          onPress={() => {
            setSelectedSection("logros");
          }}
        >
          <View
            style={{
              backgroundColor:
                selectedSection === "logros"
                  ? Color.colorLavender_100
                  : Color.secundario,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
            }}
          />
          <LogrosSVG
            styles={[styles.vectorIcon1, styles.vectorIconPosition1]}
            onColor={"#6342E8"}
            clickColor={selectedSection}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            setSelectedSection("desafios");
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              overflow: "hidden",
              backgroundColor:
                selectedSection === "desafios"
                  ? Color.colorLightcyan
                  : Color.secundario,
              padding: 5,
              borderRadius: 4,
              zIndex: 0,
              height: 40,
              width: 40,
            }}
          />
          <DesafiosSVG
            styles={[styles.vectorIcon2, styles.vectorIconPosition]}
            onColor={"#53D5FF"}
            clickColor={selectedSection}
          />
        </Pressable>
        <Pressable
          style={styles.rectangleParent}
          onPress={() => {
            setSelectedSection("risas");
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              overflow: "hidden",
              backgroundColor:
                selectedSection === "risas"
                  ? Color.colorHoneydew_200
                  : Color.secundario,
              padding: 5,
              borderRadius: 4,
              zIndex: 0,
              height: 40,
              width: 40,
            }}
          />
          <BurbujaAnecdotaSVG
            styles={[styles.vectorIcon3, styles.vectorIconPosition]}
            onColor={"#39FD9E"}
            clickColor={selectedSection}
          />
        </Pressable>
        <Pressable
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor:
              selectedSection === "mundo"
                ? Color.colorOldlace
                : Color.secundario,
            padding: 5,
            borderRadius: 4,
            zIndex: 0,
            height: 40,
            width: 40,
          }}
          onPress={() => {
            setSelectedSection("mundo");
          }}
        >
          <AvionSVG
            styles={styles.vectorIcon4}
            onColor={"#FFD02F"}
            clickColor={selectedSection}
          />
        </Pressable>
        <Pressable
          style={styles.rectangleParent}
          onPress={() => {
            setSelectedSection("personalizada");
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              overflow: "hidden",
              backgroundColor:
                selectedSection === "personalizada"
                  ? Color.colorAntiquewhite
                  : Color.secundario,
              padding: 5,
              borderRadius: 4,
              zIndex: 0,
              height: 40,
              width: 40,
            }}
          />
          <EditarSVG
            styles={[styles.vectorIcon5, styles.vectorIconPosition1]}
            onColor={"#FF9860"}
            clickColor={selectedSection}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationIconLayout: {
    width: 428,
    position: "absolute",
  },
  image6IconPosition: {
    left: 20,
    position: "absolute",
  },
  parentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
    top: 100,
  },
  textTypo: {
    textAlign: "center",
    color: Color.negro,
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  hoyLoHeFlexBox: {
    marginTop: 20,
    textAlign: "left",
    color: Color.negro,
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    alignSelf: "stretch",
  },
  documentIconLayout: {
    marginLeft: 30,
    height: 24,
    width: 24,
  },
  frameFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  vectorFlexBox: {
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_sm,
    width: 40,
    justifyContent: "space-between",
    borderRadius: Border.br_8xs,
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  frameLayout: {
    zIndex: 0,
    height: 40,
    width: 40,
    backgroundColor: Color.secundario,
    borderRadius: Border.br_8xs,
  },
  vectorIconPosition1: {
    zIndex: 1,
    position: "absolute",
  },
  vectorIconPosition: {
    left: 7,
    zIndex: 1,
    width: 26,
    position: "absolute",
  },
  miDiarioEntradaTextoPlChild: {
    height: 390,
    backgroundColor: Color.linearBoton,
    left: 0,
    top: 64,
    width: 428,
  },
  text: {
    fontWeight: "700",
    lineHeight: 36,
    fontSize: FontSize.size_5xl,
  },
  jul2023: {
    fontSize: FontSize.size_xl,
    lineHeight: 30,
    marginLeft: 10,
  },
  iconlycurvedarrowDown2: {
    width: 14,
    height: 7,
    marginLeft: 10,
  },
  parent: {
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  descubriendoElMundo: {
    lineHeight: 36,
    fontSize: FontSize.size_5xl,
  },
  hoyLoHe: {
    fontSize: FontSize.size_lg,
    lineHeight: 27,
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  frameParent: {
    top: 133,
    width: 388,
    height: 301,
  },
  image6Icon: {
    top: 3,
    width: 87,
    height: 55,
  },
  iconlylightOutlinesearch: {
    height: 24,
    width: 24,
  },
  documentIcon: {
    overflow: "hidden",
  },
  iconlylightOutlinesearchParent: {
    top: 20,
    left: 276,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  navigationIcon: {
    marginLeft: -214,
    top: 821,
    left: "50%",
    height: 105,
  },
  vectorIcon: {
    height: 28,
    width: 26,
  },
  vectorWrapper: {
    height: 36,
    backgroundColor: Color.secundario,
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_sm,
  },
  frameChild: {
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  vectorIcon1: {
    left: 8,
    top: 4,
    height: 28,
    width: 24,
  },
  vectorIcon2: {
    top: 4,
    height: 28,
  },
  vectorIcon3: {
    top: 6,
    height: 24,
  },
  rectangleParent: {
    height: 40,
    width: 40,
  },
  vectorIcon4: {
    height: 18,
    width: 26,
    top: 5,
  },
  vectorContainer: {
    backgroundColor: Color.colorOldlace,
  },
  vectorIcon5: {
    height: "48.33%",
    width: "43.25%",
    top: "26.11%",
    right: "29%",
    bottom: "25.56%",
    left: "27.75%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  frameGroup: {
    backgroundColor: Color.colorHoneydew_100,
    height: 49,
    paddingLeft: Padding.p_xs,
    paddingRight: Padding.p_xl,
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    left: 0,
    top: 20,
    position: "absolute",
  },
  miDiarioEntradaTextoPl: {
    backgroundColor: Color.white,
    width: "100%",
    height: 60,
  },
});

export default NavBarDiario;
