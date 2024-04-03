import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const PopupDiario = ({ onClose }) => {
  return (
    <View style={[styles.popupDiario, styles.popupDiarioFlexBox]}>
      <Text
        style={[styles.unLugarDonde, styles.popupDiarioFlexBox]}
      >{`Un lugar donde podrás dejar tu Legado escrito
o mediante video. Elige el tema del que quieras
dejar registro, y compártelo con tu familia`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  popupDiarioFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  unLugarDonde: {
    alignSelf: "stretch",
    flex: 1,
    fontSize: FontSize.size_lg,
    lineHeight: 22,
    fontWeight: "300",
    fontFamily: FontFamily.nunito,
    color: Color.primario1,
    textAlign: "center",
    display: "flex",
  },
  popupDiario: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.white,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    width: 404,
    height: 136,
    overflow: "hidden",
    flexDirection: "row",
    padding: Padding.p_mini,
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default PopupDiario;
