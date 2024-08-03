import React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { useSelector } from "react-redux";

const PERFILANCESTROAJUSTES = () => {
  const { condolences } = useSelector((state) => state.book);
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={[styles.perfilAncestroAjustes, styles.iconLayout]}>
        <Image
          style={[styles.image6Icon]}
          contentFit="cover"
          source={require("../assets/image-6.png")}
        />
        <View style={styles.backParent}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              style={[styles.icon]}
              contentFit="cover"
              source={require("../assets/back.png")}
            />
          </Pressable>
          <Text style={[styles.libroDeCondolencias, styles.papFuisteUnTypo]}>
            Libro de condolencias
          </Text>
        </View>
        <Image
          style={styles.maskGroupIcon}
          contentFit="cover"
          source={require("../assets/mask-group17.png")}
        />

        {condolences.map((condolence) => (
          <View key={condolence.message}>
            <View style={styles.aatarWrapper}>
              <Image
                style={styles.aatarIcon}
                contentFit="cover"
                source={require("../assets/aatar8.png")}
              />
              <View style={styles.parent}>
                <Text style={[styles.text, styles.textTypo]}>
                  {condolence.day}
                </Text>
                <Text style={[styles.mayo2008, styles.textTypo]}>
                  {condolence.month} {condolence.year}
                </Text>
              </View>
            </View>
            <Text style={[styles.papFuisteUn, styles.frameViewSpaceBlock]}>
              {condolence.message}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },

  textTypo: {
    textAlign: "center",
    color: Color.negro,
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  frameViewSpaceBlock: {
    marginTop: 20,
    width: 388,
  },
  papFuisteUnTypo: {
    color: Color.negro,
    fontFamily: FontFamily.lato,
  },
  iconPosition: {
    left: "50%",
    position: "absolute",
  },
  aatarIcon: {
    width: 36,
    height: 36,
  },
  aatarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  text: {
    lineHeight: 36,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
  },
  mayo2008: {
    fontSize: FontSize.size_xl,
    lineHeight: 30,
    marginLeft: 10,
  },
  parent: {
    marginLeft: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  frameContainer: {
    flexDirection: "row",
  },
  papFuisteUn: {
    fontSize: FontSize.size_lg,
    lineHeight: 27,
    display: "flex",
    textAlign: "left",
    color: Color.negro,
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    marginTop: 20,
    alignItems: "center",
  },
  frameGroup: {
    width: 388,
  },
  frameParent: {
    top: 406,
    height: 397,
  },
  perfilAncestroAjustesChild: {
    top: 0,
    left: 0,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 25,
    elevation: 25,
    shadowOpacity: 1,
    height: 386,
    width: 428,
    position: "absolute",
    backgroundColor: Color.white,
  },
  icon: {
    width: 24,
    height: 24,
  },
  back: {
    width: 24,
    height: 24,
  },
  libroDeCondolencias: {
    marginLeft: 20,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
  },
  backParent: {
    width: "100%",
    height: 40,
    // justifyContent: 'center',
    alignItems: "center",
    flexDirection: "row",
  },
  image6Icon: {
    top: 3,
    width: 87,
    height: 55,
  },
  navigationIcon: {
    marginLeft: -214,
    top: 821,
    height: 105,
    width: 428,
  },
  maskGroupIcon: {
    marginTop: 30,
    // left: -350,
    height: 233,
    width: "100%",
  },
  vectorIcon: {
    // marginTop: -243,
    // marginLeft: -37.5,
    // top: '50%',
    width: 75,
    height: 60,
  },
  perfilAncestroAjustes: {
    paddingBottom: 20,
    paddingHorizontal: 15,
    // flex: 1,
    // height: 926,
    backgroundColor: Color.white,
    width: "100%",
  },
});

export default PERFILANCESTROAJUSTES;
