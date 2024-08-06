import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Share,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Color,
  FontFamily,
  Padding,
  Border,
  FontSize,
} from "../../GlobalStyles";
import Badge1 from "../../assets/Badge_01.svg";
import Badge2 from "../../assets/Badge_02.svg";
import Badge3 from "../../assets/Badge_03.svg";
import Badge4 from "../../assets/Badge_04.svg";
import Badge5 from "../../assets/Badge_05.svg";
import Badge6 from "../../assets/Badge_06.svg";
import Badge7 from "../../assets/Badge_07.svg";
import Badge8 from "../../assets/Badge_08.svg";
import Badge9 from "../../assets/Badge_09.svg";
import { useDispatch, useSelector } from "react-redux";
import MiLegado from "./MiLegado";
import MisAlbumes from "./MisAlbumes";
import PERFILMIINFO from "./PERFILMIINFO";
import SOLOYO from "./SOLOYO";
import HeaderIcons from "../../components/HeaderIcons";
import TreeSVG from "../../components/svgs/TreeSVG";
import SettingMuroSVG from "../../components/svgs/SettingMuroSVG";
import PlusSVG from "../../components/svgs/PlusSVG";
import NotificationsMuroSVG from "../../components/svgs/NotificationsMuroSVG";
import LupaSVG from "../../components/svgs/LupaSVG";
import BarraBusqueda from "../../components/BarraBusqueda";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { getUserPosts } from "../../redux/actions/posts";
import { Context } from "../../context/Context";
import axiosInstance from "../../apiBackend";
import SimboloSVG from "./SimboloSVG";
import { Entypo } from "@expo/vector-icons";
import EmojiPicker, { emojiFromUtf16 } from "rn-emoji-picker";
import { emojis } from "rn-emoji-picker/dist/data";
import { getAllUserEvents } from "../../redux/actions/events";
import { getAllUserDiaries } from "../../redux/actions/diaries";
import { getUserFriendsAndFamilyLength } from "../../redux/actions/user";
import TopBar from "../../components/TopBar";

const OtherUserProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { showPanel } = useSelector((state) => state.panel);
  const { userPosts } = useSelector((state) => state.posts);
  const { userAlbums } = useSelector((state) => state.albums);
  const { allPosts } = useSelector((state) => state.posts);

  const [selectedComponent, setSelectedComponent] = useState("MiLegado");
  const [search, setSearch] = useState(false);
  const route = useRoute();
  const userData = route.params;

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "MiLegado":
        return <MiLegado fromOther={true} otherId={userData.id} />;
      case "MisAlbumes":
        return <MisAlbumes fromOther={true} otherId={userData.id} />;
      case "PERFILMIINFO":
        return (
          <PERFILMIINFO
            usuario={userData}
            setSelectedComponent={setSelectedComponent}
          />
        );
      case "SOLOYO":
        return <SOLOYO />;
      default:
        return null;
    }
  };

  // console.log('userData.badge', userData.badge)

  //   useEffect(() => {
  //     if (userData?.newUser) {
  //       axiosInstance.patch(`/user/${userData?.id}`, { newUser: false })
  //     }

  //     dispatch(getUserPosts(userData?.id)).then((res) => {})
  //     dispatch(getAllUserEvents(userData?.id)).then((res) => {})
  //     dispatch(getAllUserDiaries(userData?.id)).then((res) => {})
  //     dispatch(getUserFriendsAndFamilyLength(userData?.id)).then((res) => {
  //       console.log(res, 'asdasdas')
  //     })
  //   }, [])

  return (
    <ScrollView
      style={{
        flex: 1,

        backgroundColor: Color.white,
      }}
      showsVerticalScrollIndicator={false}
    >
      <TopBar screen={"perfilOtro"}></TopBar>

      {/* <Pressable
        onPress={() => navigation.openDrawer()}
        style={styles.menuPosition}
      >
        <Image
          style={styles.ionmenuIcon}
          contentFit="cover"
          source={require('../../assets/ionmenu.png')}
        />
      </Pressable> */}

      {search && <BarraBusqueda />}

      <View style={{ width: "auto", justifyContent: "center" }}>
        <Pressable
          //   onPress={() => setShowImageOptions(!showImageOptions)}
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            flexDirection: "row",
            position: "relative",
          }}
        >
          {!userData?.profilePicture ? (
            <View>
              <View
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: 50,
                  right: -45,
                  zIndex: 999999999999,
                  borderRadius: 2,
                  borderColor: "red",
                }}
              >
                {!userData?.badge && <Badge1 width={30} height={30} />}
                {userData?.badge === "badge1" ? (
                  <Badge1 width={30} height={30} />
                ) : userData?.badge === "badge2" ? (
                  <Badge2 width={30} height={30} />
                ) : userData?.badge === "badge3" ? (
                  <Badge3 width={30} height={30} />
                ) : userData?.badge === "badge4" ? (
                  <Badge4 width={30} height={30} />
                ) : userData?.badge === "badge5" ? (
                  <Badge5 width={30} height={30} />
                ) : userData?.badge === "badge6" ? (
                  <Badge6 width={30} height={30} />
                ) : userData?.badge === "badge7" ? (
                  <Badge7 width={30} height={30} />
                ) : userData?.badge === "badge8" ? (
                  <Badge8 width={30} height={30} />
                ) : (
                  <Badge9 width={30} height={30} />
                )}
              </View>
              <Image
                style={{ ...styles.perfilItem, borderRadius: 100 }}
                contentFit="cover"
                source={require("../../assets/group-1171276683.png")}
              />
            </View>
          ) : (
            <View>
              <View
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: 50,
                  right: -45,
                  zIndex: 999999999999,
                }}
              >
                {!userData?.badge && <Badge1 width={30} height={30} />}
                {userData?.badge === "badge1" ? (
                  <Badge1 width={30} height={30} />
                ) : userData?.badge === "badge2" ? (
                  <Badge2 width={30} height={30} />
                ) : userData?.badge === "badge3" ? (
                  <Badge3 width={30} height={30} />
                ) : userData?.badge === "badge4" ? (
                  <Badge4 width={30} height={30} />
                ) : userData?.badge === "badge5" ? (
                  <Badge5 width={30} height={30} />
                ) : userData?.badge === "badge6" ? (
                  <Badge6 width={30} height={30} />
                ) : userData?.badge === "badge7" ? (
                  <Badge7 width={30} height={30} />
                ) : userData?.badge === "badge8" ? (
                  <Badge8 width={30} height={30} />
                ) : (
                  userData?.badge === "badge9" && (
                    <Badge9 width={30} height={30} />
                  )
                )}
              </View>
              <Image
                style={{ ...styles.perfilItem, borderRadius: 100 }}
                contentFit="cover"
                source={{
                  uri: userData?.profilePicture,
                }}
              />
            </View>
          )}
        </Pressable>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.brunoPham}>
          {userData?.username} {userData?.apellido}
        </Text>
        <View style={styles.placeContainer}>
          <Text style={[styles.daNangVietnam, styles.miInfoTypo]}>
            {userData?.adress && userData?.adress + ","}
            {userData?.city}
          </Text>
        </View>
      </View>

      <View style={styles.tabsBar}>
        <Pressable
          style={[
            styles.tabs,
            (selectedComponent === "MiLegado" ||
              selectedComponent === "SOLOYO") &&
              styles.miWrapper,
          ]}
          onPress={() => setSelectedComponent("MiLegado")}
        >
          <Text
            style={
              (styles.miInfo,
              (selectedComponent === "MiLegado" ||
                selectedComponent === "SOLOYO") &&
                styles.selectedText)
            }
          >
            Legado
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tabs,
            selectedComponent === "PERFILMIINFO" && styles.miWrapper,
          ]}
          onPress={() => setSelectedComponent("PERFILMIINFO")}
        >
          <Text
            style={
              (styles.miInfo,
              selectedComponent === "PERFILMIINFO" && styles.selectedText)
            }
          >
            Información
          </Text>
        </Pressable>
      </View>

      {renderSelectedComponent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    left: "1%",
    top: "2%",
  },
  ionmenuIcon: {
    width: 26,
    height: 20,
  },
  ionmenu: {},
  menuPosition: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  buttonFlexBox: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  vectorIconLayout: {
    width: 24,
    height: 24,
  },
  groupIconLayout: {
    height: 50,
    width: 50,
  },
  miInfoTypo: {
    color: Color.gris,
    letterSpacing: 0,
    textAlign: "center",
    fontFamily: FontFamily.lato,
  },

  signInTypo: {
    color: Color.white,
    letterSpacing: 0,
    textAlign: "center",
    fontFamily: FontFamily.lato,
  },
  image6Icon: {
    width: 87,
    height: 55,
  },
  vectorIcon: {
    height: 24,
  },
  iconlylightOutlineplus: {
    marginLeft: 20,
    height: 24,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  vectorParent: {
    top: "5%",
  },
  perfilItem: {
    height: 130,
    width: 130,
  },
  nameContainer: {
    paddingVertical: 20,
  },
  brunoPham: {
    textAlign: "center",
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: "700",
    lineHeight: 24,
    fontSize: FontSize.size_xl,
    paddingHorizontal: 15,
  },
  placeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  daNangVietnam: {
    fontWeight: "300",
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    lineHeight: 24,
  },
  miLegado: {
    lineHeight: 19,
    fontSize: FontSize.size_base,
    fontWeight: "700",
    color: Color.white,
  },
  miWrapper: {
    backgroundColor: Color.secundario,
    width: "37%",
    borderRadius: Border.br_7xs,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: {
    width: "37%",
    borderRadius: Border.br_7xs,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    justifyContent: "center",
    alignItems: "center",
  },
  misLbumes: {
    width: 120,
    color: Color.gris,
    letterSpacing: 0,
    textAlign: "center",
    fontFamily: FontFamily.lato,
  },
  miInfo: {
    color: Color.gris,
    letterSpacing: 0,
    textAlign: "center",
    fontFamily: FontFamily.lato,
    lineHeight: 19,
    fontSize: FontSize.size_base,
  },
  selectedText: {
    color: Color.white,
    fontWeight: "700",
    letterSpacing: 0,
    textAlign: "center",
    fontFamily: FontFamily.lato,
    lineHeight: 19,
    fontSize: FontSize.size_base,
  },
  tabsBar: {
    width: "100%",
    backgroundColor: Color.white,
    flexDirection: "row",
    justifyContent: "center",
  },
  signIn: {
    fontSize: FontSize.size_xs,
    lineHeight: 18,
  },
  button: {
    borderRadius: Border.br_11xl,
    width: 80,
    height: 28,
    paddingHorizontal: Padding.p_base,
    justifyContent: "center",
    left: "100%",
    backgroundColor: Color.linearBoton,
  },
  perfil: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: Color.white,
  },
});

export default OtherUserProfile;
