import React, { useState, useCallback, useEffect } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Compartir from "../components/Compartir";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import HeaderIcons from "../components/HeaderIcons";
import TreeSVG from "../components/svgs/TreeSVG";
import PlusSVG from "../components/svgs/PlusSVG";
import SettingMuroSVG from "../components/svgs/SettingMuroSVG";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "../components/TopBar";
import axiosInstance from "../apiBackend";
import { getAllUserAlbums } from "../redux/actions/albums";

const CrearLbum = () => {
  const route = useRoute();
  const { userData } = useSelector((state) => state.users);
  const { allPosts } = useSelector((state) => state.posts);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(
    route?.params?.album?.images[0],
  );
  const [vectorIcon1Visible, setVectorIcon1Visible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (allPosts.length > 0 && route.params.album.id) {
      setRelatedPosts(
        allPosts
          .filter((post) => post.user.id === userData.id)
          .filter((post) => post.albums.includes(route.params.album.id))
          .map((post) => post.photos)
          .flat(),
      );
    }
  }, []);
  const dispatch = useDispatch();
  const handleUpdate = async (pic) => {
    await axiosInstance
      .patch(`albums/${route?.params?.album?.id}`, { coverPicture: pic })
      .then(() => dispatch(getAllUserAlbums(userData?.id)));
  };

  const closeVectorIcon1 = useCallback(() => {
    setVectorIcon1Visible(false);
  }, []);
  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    if (date > today) {
      return dateString.slice(0, 10);
    }

    const diffInMilliseconds = today - date;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInDays === 0) {
      return "Hoy";
    } else if (diffInDays === 1) {
      return "Hace un día";
    } else if (diffInDays < 30) {
      return `Hace ${diffInDays} días`;
    } else if (diffInMonths === 1) {
      return "Hace un mes";
    } else if (diffInMonths < 12) {
      return `Hace ${diffInMonths} meses`;
    } else if (diffInYears === 1) {
      return "Hace un año";
    } else {
      return `Hace ${diffInYears} años`;
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 0,
          paddingBottom: 110,
          backgroundColor: "#fff",
        }}
        showsVerticalScrollIndicator={false}
      >
        <TopBar></TopBar>
        <View style={styles.crearLbum}>
          <View style={styles.backParent}>
            <Pressable
              style={styles.vectorIconLayout}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={[styles.icon2, styles.iconLayout]}
                contentFit="cover"
                source={require("../assets/back4.png")}
              />
            </Pressable>
            <View
              style={[
                styles.bienvenidosAMiLbumConNoeParent,
                styles.parentFlexBox,
                {
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  width: "100%",
                },
              ]}
            >
              <Text
                // numberOfLines={1}
                // ellipsizeMode="tail"
                style={[
                  styles.bienvenidosAMi,
                  styles.textTypo,
                  { textAlign: "flex-start", fontSize: 20 },
                ]}
              >
                {route?.params?.album?.description}
              </Text>
            </View>
          </View>

          <View>
            <Image
              style={[
                styles.maskGroupIcon,
                styles.frameParentPosition,
                { borderRadius: 10 },
              ]}
              contentFit="cover"
              source={{ uri: selectedImage }}
            />
          </View>
          <Text style={[styles.text, styles.textTypo, { fontSize: 12 }]}>
            {formatDate2(route?.params?.album?.date)}
          </Text>

          <View
            style={{
              width: "100%",
              flexWrap: "wrap",
              gap: 5,
              flexDirection: "row",
              marginTop: 0,
            }}
          >
            {route?.params?.album?.images?.map((image, index) => (
              <Pressable
                onLongPress={() => {
                  setSelectedImage(image);
                  handleUpdate(image);
                }}
                onPress={() => setSelectedImage(image)}
                key={index}
              >
                <Image
                  style={{
                    height: 80,
                    borderRadius: 3,
                    width: (Dimensions.get("screen").width - 55) / 4,
                  }}
                  contentFit="cover"
                  source={{ uri: image }}
                />
                {selectedImage === image && (
                  <FontAwesome
                    style={{ position: "absolute", top: 2, right: 5 }}
                    size={20}
                    name="bullseye"
                    color={"#1bb523"}
                  />
                )}
              </Pressable>
            ))}
            {relatedPosts.map((img, index) => (
              <Pressable
                onPress={() => setSelectedImage(img)}
                onLongPress={() => {
                  setSelectedImage(img);
                  handleUpdate(img);
                }}
                key={index + 99999}
              >
                <Image
                  style={{
                    height: 80,
                    borderRadius: 3,
                    width: (Dimensions.get("screen").width - 55) / 4,
                  }}
                  contentFit="cover"
                  source={{ uri: img }}
                />
                {selectedImage === img && (
                  <FontAwesome
                    style={{ position: "absolute", top: 2, right: 5 }}
                    size={20}
                    name="bullseye"
                    color={"#1bb523"}
                  />
                )}
                <Text
                  style={{
                    position: "absolute",
                    fontWeight: "700",
                    left: 5,
                    top: 1,
                    color: "#1bb523",
                    fontSize: 14,
                  }}
                >
                  D
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal animationType="fade" transparent visible={vectorIcon1Visible}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
            }}
            onPress={closeVectorIcon1}
          />
          <Compartir onClose={closeVectorIcon1} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  image6IconPosition: {
    // left: 20,
    // position: 'absolute'
  },
  parentFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  vectorIconLayout: {
    height: 24,
    width: 24,
  },
  frameParentPosition: {
    width: "100%",
  },
  maskGroupLayout: {
    height: 80,
    width: 80,
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  textTypo: {
    textAlign: "left",
    color: Color.negro,
    fontFamily: FontFamily.lato,
    lineHeight: 24,
    fontSize: FontSize.size_2xs,
  },
  image6Icon: {
    // top: 3,
    width: 87,
    height: 55,
  },
  iconlylightOutlineplus: {
    marginLeft: 20,
  },
  vectorParent: {
    top: 20,
    left: 296,
    flexDirection: "row",
    position: "absolute",
  },
  navigationIcon: {
    top: 821,
    left: 0,
    width: 428,
    height: 105,
    position: "absolute",
  },
  crearLbumChild: {
    // top: 101,
    width: "100%",
    height: 705,
  },
  maskGroupIcon: {
    // top: 155,
    marginTop: 15,
    height: 400,
  },
  maskGroupIcon2: {
    marginLeft: 5,
  },
  maskGroupParent: {
    flexDirection: "row",
  },
  vectorIcon1Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  vectorIcon1Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  vector: {
    position: "absolute",
    top: 40,
    right: 30,
    width: 30,
    height: 33,
  },
  frameParent: {
    paddingHorizontal: 15,
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  icon2: {
    overflow: "hidden",
  },
  bienvenidosAMi: {
    fontWeight: "500",
  },
  text: {
    fontWeight: "300",
    paddingBottom: 5,
  },
  bienvenidosAMiLbumConNoeParent: {
    marginLeft: 17,
  },
  backParent: {
    // top: 67,
    flexDirection: "row",
  },
  crearLbum: {
    backgroundColor: Color.white,
    flex: 1,
    paddingHorizontal: 10,
    overflow: "hidden",
    width: "100%",
    paddingBottom: 30,
    // marginBottom: 200
  },
});

export default CrearLbum;
