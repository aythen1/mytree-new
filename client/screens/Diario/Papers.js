import React, { useState, useCallback } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../../GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import PopUpCalendario from "../../components/PopUpCalendario";
import SingleDiary from "../../components/SingleDiary";

const Papers = () => {
  const { userDiaries } = useSelector((state) => state.diaries);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [calendario, setCalendario] = useState(false);

  const openCalendario = () => {
    setCalendario(true);
  };

  const closeCalendario = () => {
    setCalendario(false);
  };

  return (
    <>
      <View
        style={{
          marginTop: 30,
          paddingHorizontal: 10,
          overflow: "hidden",
          width: "100%",
          backgroundColor: "transparent",
        }}
      >
        <View>
          <Image
            style={styles.line}
            contentFit="cover"
            source={require("../../assets/line-71.png")}
          />
          <View style={styles.ltimasEntradasParent}>
            <Text
              style={[
                styles.ltimosDiariosFamiliares,
                styles.textTypo,
                { color: Color.primario1 },
              ]}
            >
              Últimas entradas
            </Text>
            <Pressable>
              {/* <Pressable onPress={openCalendario}> */}

              <Image
                style={styles.iconlyboldfilter2}
                contentFit="cover"
                source={require("../../assets/iconlyboldfilter21.png")}
              />
            </Pressable>
          </View>
          <Image
            style={styles.line}
            contentFit="cover"
            source={require("../../assets/line-785.png")}
          />

          <View style={styles.frameLayout}>
            {[...userDiaries]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((diary, index) => (
                <SingleDiary
                  setSelected={() =>
                    navigation.navigate("MIDIARIOENTRADATEXTOPL7", {
                      date: diary,
                    })
                  }
                  multiEditing={true}
                  key={diary.id}
                  notEditable={true}
                  diary={diary}
                  editing={false}
                  last={index === userDiaries.length - 1}
                />
              ))}
          </View>
        </View>
      </View>

      <Modal animationType="fade" transparent visible={calendario}>
        <View style={styles.iconlyLightOutlineCalendarOverlay}>
          <Pressable style={styles.iconlyLightOutlineCalendarBg} />
          <PopUpCalendario
            setButtonContainer2Visible={() => {}}
            setCalendario={setCalendario}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: "100%",
    overflow: "hidden",
  },
  ltimasEntradasParent: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.lato,
  },
  ltimosDiariosFamiliares: {
    color: Color.primario2,
    fontWeight: "700",
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_xl,
    width: "100%",
  },
  urielYYo2Typo: {
    display: "flex",
    lineHeight: 27,
    fontSize: FontSize.size_lg,
    textAlign: "left",
    color: Color.negro,
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    alignItems: "center",
  },
  frameLayout: {},
  aatarIcon: {
    width: 107,
    height: 107,
    borderRadius: 10,
  },
  aatarWrapper: {
    alignItems: "center",
  },
  text: {
    fontSize: FontSize.size_5xl,
    lineHeight: 36,
    paddingVertical: 3,
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: "700",
    letterSpacing: 0,
  },
  jul2023: {
    lineHeight: 30,
    marginLeft: 10,
    fontSize: FontSize.size_xl,
    textAlign: "center",
    color: Color.negro,
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  parent: {
    marginLeft: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  frameContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
    gap: 5,
  },
  hoyHemosVisitado: {
    marginTop: 20,
    alignSelf: "stretch",
    flex: 1,
  },
  iconlyboldfilter2: {
    height: 24,
    width: 24,
    right: 20,
  },
  miDiarioEntradaTextoPl: {
    top: 30,
    paddingHorizontal: 15,
    overflow: "hidden",
    height: "100%",
    width: "100%",
    backgroundColor: Color.white,
    paddingBottom: 100,
  },
  line: {
    height: 1,
  },
  iconlyLightOutlineCalendarOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  iconlyLightOutlineCalendarBg: {
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
});

export default Papers;
