import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
import { useSelector } from "react-redux";
import axiosInstance from "../../apiBackend";
import useRelationsLength from "../utils/lenghtUsuarios";

const PERFILMIINFO = ({ setSelectedComponent, usuario }) => {
  // const { familyLength, usersLength } = useSelector((state) => state.users);
  console.log(usuario.id, "usuario");
  const [usersLength, setUsersLength] = useState();
  const [familyLength, setFamilyLength] = useState();

  const { totalFamilyLength, totalFriendsLength } = useRelationsLength(usuario);

  useEffect(() => {
    const get = async () => {
      try {
        const response = await axiosInstance.get(
          `/user/${usuario?.id}/friendsAndFamilyLength`,
        );

        setUsersLength(response.data.friendsCount);
        setFamilyLength(response.data.familyCount);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  return (
    <ScrollView
      style={styles.perfilMiInfo}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.frameView}>
        <View style={styles.frameParent5}>
          <Pressable style={styles.frameContainer}>
            <Text style={[styles.familiares, styles.text1Typo]}>
              Familiares
            </Text>
            <View style={styles.parent}>
              <Text style={[styles.text1, styles.text1Typo]}>
                {totalFamilyLength || 0}
              </Text>
              <View style={styles.ellipseGroup}>
                <Image
                  style={styles.vectorIcon1}
                  contentFit="scale-down"
                  source={require("../../assets/vector9.png")}
                />
              </View>
            </View>
          </Pressable>
          <Pressable style={styles.amigosParent}>
            <Text style={[styles.familiares, styles.text1Typo]}>Amigos</Text>
            <View style={styles.parent}>
              <Text style={[styles.text1, styles.text1Typo]}>
                {totalFriendsLength || 0}
              </Text>
              <View style={styles.ellipseGroup}>
                <Image
                  style={styles.vectorIcon1}
                  contentFit="scale-down"
                  source={require("../../assets/vector9.png")}
                />
              </View>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.frameParent6}>
        <View style={styles.miInformacinPersonalParent}>
          <Text style={[styles.miInformacinPersonal, styles.miInfoTypo]}>
            Mi información personal
          </Text>
        </View>

        <View style={styles.frameParent}>
          <View style={[styles.frameWrapper, styles.frameWrapperFlexBox]}>
            <View style={styles.nombreYApellidosParent}>
              <Text style={[styles.nombreYApellidos, styles.quEsLoTypo1]}>
                Nombre y apellido
              </Text>
              <Text style={[styles.brunoPham1, styles.quEsLoTypo1]}>
                {usuario.username} {usuario.apellido}
              </Text>
            </View>
          </View>
          <View style={[styles.frameWrapper, styles.frameWrapperFlexBox]}>
            <View style={styles.nombreYApellidosParent}>
              <Text style={[styles.nombreYApellidos, styles.quEsLoTypo1]}>
                Fecha y Lugar de Nacimiento
              </Text>
              <Text style={[styles.brunoPham1, styles.quEsLoTypo1]}>
                {usuario.birthDate} - {usuario.address}
              </Text>
            </View>
          </View>
          <View style={[styles.frameWrapper, styles.frameWrapperFlexBox]}>
            <View style={styles.nombreYApellidosParent}>
              <Text style={[styles.nombreYApellidos, styles.quEsLoTypo1]}>
                Ciudad actual de residencia
              </Text>
              <Text style={[styles.brunoPham1, styles.quEsLoTypo1]}>
                {usuario.city}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: 26,
    overflow: "hidden",
  },
  miInfoTypo: {
    fontWeight: "700",
    fontFamily: FontFamily.lato,
  },
  skillLayout: {
    width: 30,
    height: 30,
    overflow: "hidden",
  },
  text1Typo: {
    color: Color.primary,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
  },
  frameWrapperFlexBox: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  quEsLoTypo1: {
    fontWeight: "500",
    fontFamily: FontFamily.lato,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  image6Parent: {
    flexDirection: "row",
    alignItems: "center",
  },
  frameView: {
    alignItems: "center",
  },
  frameContainer: {
    alignItems: "flex-start",
  },
  skillIconsinstagram: {
    height: 30,
  },
  skillIconslinkedin: {
    height: 30,
    marginLeft: 20,
  },
  logostiktokIcon: {
    height: 30,
    marginLeft: 20,
  },
  familiares: {
    textAlign: "left",
  },
  text1: {
    letterSpacing: 0.3,
    textAlign: "right",
    fontWeight: "800",
  },
  frameInner: {
    width: 35,
    height: 35,
    zIndex: 0,
  },
  vectorIcon1: { width: 29, height: 29 },
  ellipseGroup: {
    backgroundColor: Color.secundario,
    padding: 5,
    borderRadius: 100,
  },
  parent: {
    marginTop: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  amigosParent: {
    alignItems: "flex-start",
  },
  logros: {
    display: "flex",
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  frameParent5: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    width: "100%",
  },
  miInformacinPersonal: {
    fontSize: FontSize.size_5xl,
    width: 266,
    textAlign: "left",
    color: Color.negro,
    fontFamily: FontFamily.lato,
  },
  lock: {
    height: 30,
    width: 24,
  },
  miInformacinPersonalParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
  },
  nombreYApellidos: {
    textAlign: "left",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    color: Color.negro,
  },
  brunoPham1: {
    color: Color.grisGeneral,
    textAlign: "left",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    marginTop: 10,
  },
  nombreYApellidosParent: {
    width: "100%",
    paddingHorizontal: 10,
  },
  frameWrapper: {},
  frameWrapper2: {
    flexDirection: "row",
  },
  redesSocialesParent: {
    width: "40%",
    paddingHorizontal: 10,
  },
  frameParent6: {
    width: "100%",
    height: "100%",
  },
  frameParent: {
    gap: 30,
    paddingBottom: 180,
  },
  perfilMiInfo: {
    borderRadius: Border.br_31xl,
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default PERFILMIINFO;
