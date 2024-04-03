import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { Image } from "expo-image";
import FormatoLista from "./FormatoLista";
import FormatoArbol from "./FormatoArbol";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const Invitados = ({ onClose }) => {
  const [frameContainerVisible, setFrameContainerVisible] = useState(false);
  const [frameContainer1Visible, setFrameContainer1Visible] = useState(false);

  const openFrameContainer = useCallback(() => {
    setFrameContainerVisible(true);
  }, []);

  const closeFrameContainer = useCallback(() => {
    setFrameContainerVisible(false);
  }, []);

  const openFrameContainer1 = useCallback(() => {
    setFrameContainer1Visible(true);
  }, []);

  const closeFrameContainer1 = useCallback(() => {
    setFrameContainer1Visible(false);
  }, []);

  return (
    <>
      <View style={styles.invitados}>
        <View>
          <Pressable
            style={styles.formatoParentFlexBox}
            onPress={openFrameContainer}
          >
            <Text style={styles.formatoLista}>Formato lista</Text>
            <Image
              style={styles.stroke1Icon}
              contentFit="cover"
              source={require("../assets/stroke13.png")}
            />
          </Pressable>
          <Pressable
            style={[styles.formatoRbolParent, styles.formatoParentFlexBox]}
            onPress={openFrameContainer1}
          >
            <Text style={styles.formatoLista}>Formato árbol</Text>
            <Image
              style={styles.stroke1Icon}
              contentFit="cover"
              source={require("../assets/stroke13.png")}
            />
          </Pressable>
        </View>
      </View>

      <Modal animationType="fade" transparent visible={frameContainerVisible}>
        <View style={styles.frameContainerOverlay}>
          <Pressable
            style={styles.frameContainerBg}
            onPress={closeFrameContainer}
          />
          <FormatoLista onClose={closeFrameContainer} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={frameContainer1Visible}>
        <View style={styles.frameContainer1Overlay}>
          <Pressable
            style={styles.frameContainer1Bg}
            onPress={closeFrameContainer1}
          />
          <FormatoArbol onClose={closeFrameContainer1} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  formatoParentFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: 388,
  },
  frameContainerOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  frameContainerBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  formatoLista: {
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    lineHeight: 19,
    fontWeight: "500",
    fontFamily: FontFamily.lato,
    color: Color.gris,
    textAlign: "left",
  },
  stroke1Icon: {
    width: 8,
    height: 15,
  },
  frameContainer1Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  frameContainer1Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  formatoRbolParent: {
    marginTop: 15,
  },
  invitados: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.white,
    padding: Padding.p_xl,
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default Invitados;
