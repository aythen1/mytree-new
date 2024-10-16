import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Camera, CameraView } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Context } from "../../context/Context";
import { Color } from "../../GlobalStyles";
import PagerView from "react-native-pager-view";
import { handleSelect } from "./utils/utils";
import ScrollableModal from "../../components/modals/ScrollableModal";

const UploadMemory = () => {
  const { pickImage, showCamera, setShowCamera } = useContext(Context);
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSelection, setShowSelection] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraReff = useRef(null);
  const [facing, setFacing] = useState("back");
  const [multiSelect, setMultiSelect] = useState([]);
  const [album, setAlbum] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [showAlbum, setShowAlbum] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState({ title: "Camera" });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    // obtenerImagenesDeGaleria();
  }, []);

  const obtenerImagenesDeGaleria = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      console.error("Permiso denegado para acceder a la galería de imágenes.");
      return;
    }

    const assetsAlbum = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    const arr1 = [];
    const arr2 = [];
    assetsAlbum.map((e) => arr1.push(e.title));
    assetsAlbum.map((e) => arr2.push(e));

    setAlbum(arr1);
    setAlbumData(arr2);
    const filtro = arr2.filter((e) => e.title == selectedAlbum.title);
    console.log(albumData, selectedAlbum, "FILTRO");
    const assets = await MediaLibrary.getAssetsAsync({
      album: filtro[0],
    });
    const arr = [];
    console.log("assets", assets.assets);
    const imagesArray = assets?.assets ?? [];
    setImages(imagesArray);
  };

  const handleSeleccionarImagen = (imagen) => {
    setSelectedImage(imagen);
    // pickImage("a", imagen.uri);
  };

  const changePictureMode = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  useEffect(() => {
    if (selectedAlbum.title !== "") {
      obtenerImagenesDeGaleria();
    }
  }, [selectedAlbum]);

  const takePicture = async () => {
    if (cameraReff?.current) {
      const photo = await cameraReff.current.takePictureAsync();
      pickImage("a", photo.uri);
      setSelectedImage(photo);
      setShowCamera(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {showCamera ? (
        <CameraView
          ref={cameraReff}
          facing={facing}
          style={{ flex: 1 }}
          mode="picture"
          FocusMode="on"
          onCameraReady={(e) => console.log(e, "esto es e")}

          // cameraType="back"
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 22, left: 18 }}
              onPress={() => setShowCamera(false)}
            >
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                contentFit="cover"
                source={require("../../assets/whiteCross.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={changePictureMode}
              style={{ position: "absolute", top: 18, right: 18 }}
            >
              <Entypo name="cycle" color={"#fff"} size={29} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                width: "100%",
                marginBottom: 30,
                position: "relative",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 100,
                  backgroundColor: "transparent",
                  borderWidth: 6,
                  borderColor: "#7EC18C",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={takePicture}
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    backgroundColor: "#7EC18C",

                    color: "white",
                  }}
                ></View>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={{ gap: 15, paddingHorizontal: 15, flex: 1 }}>
          <View
            style={{
              justifyContent: "space-between",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 15,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Muro")}>
              <Image
                contentFit="cover"
                style={{ width: 14, height: 14 }}
                source={require("../../assets/group-6846.png")}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 700, color: "#292A2B" }}>
              Subir recuerdo
            </Text>
            <TouchableOpacity
              disabled={!selectedImage}
              onPress={() =>
                navigation.navigate("Organizador", {
                  data:
                    multiSelect.length > 0 ? [...multiSelect] : selectedImage,
                })
              }
            >
              <Image
                contentFit="cover"
                style={{ width: 20, height: 20 }}
                source={require("../../assets/back7.png")}
              />
            </TouchableOpacity>
          </View>

          {multiSelect.length === 0 ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                contentFit="cover"
                style={{
                  width: Dimensions.get("window").width - 30,
                  height: Dimensions.get("screen").height / 1.8,
                  borderRadius: 8,
                }}
                source={
                  selectedImage
                    ? { uri: selectedImage?.uri }
                    : require("../../assets/frame-1547755266.png")
                }
              />
            </View>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: Dimensions.get("window").height / 2.3,
              }}
            >
              <PagerView
                style={{
                  height: Dimensions.get("window").height / 2.3,
                  width: "100%",
                }}
                initialPage={0}
              >
                {multiSelect.map((e, i) => (
                  <View style={{ width: "100%" }} key={i}>
                    <Image
                      style={{
                        width: Dimensions.get("window").width - 30,
                        height: Dimensions.get("window").height / 2.3,
                        borderRadius: 8,
                      }}
                      contentFit="cover"
                      source={{ uri: e?.uri }}
                    />
                  </View>
                ))}
              </PagerView>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => setShowAlbum(true)}
              style={{ gap: 5, alignItems: "center", flexDirection: "row" }}
            >
              <Text style={{ color: "#787878", fontSize: 18, fontWeight: 500 }}>
                {selectedAlbum.title || "Recientes"}
              </Text>
              <Image
                source={require("../../assets/chevDown.png")}
                style={{
                  width: 13,
                  height: 6,
                }}
              />
            </TouchableOpacity>

            <View
              style={{ gap: 10, alignItems: "center", flexDirection: "row" }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (showSelection) {
                    setMultiSelect([]);
                  }
                  setShowSelection(!showSelection);
                }}
                style={{
                  gap: 5,
                  backgroundColor: showSelection ? Color.primario1 : "#D9D9D9",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 5,
                  paddingHorizontal: 12,
                  height: 32,
                }}
              >
                <Image
                  source={require("../../assets/multi-select-icon.png")}
                  style={{
                    width: 19,
                    height: 16,
                  }}
                />
                <Text style={{ color: "#fff", fontSize: 12, fontWeight: 500 }}>
                  SELECCIONAR VARIOS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowCamera(true)}
                style={{
                  gap: 5,
                  backgroundColor: "#D9D9D9",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 5,
                  width: 32,
                  height: 32,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/cameraIcon.png")}
                  style={{
                    width: 21.5,
                    height: 19.5,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 70 }}
            style={{
              height: Dimensions.get("window").height / 2.8,
            }}
          >
            <View
              style={{
                gap: 1,
                flex: 1,
                paddingBottom: 10,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              {images.map((imagen, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (showSelection) {
                      handleSelect(
                        imagen,
                        setSelectedImage,
                        multiSelect,
                        setMultiSelect,
                      );
                    } else {
                      handleSeleccionarImagen(imagen);
                    }
                  }}
                >
                  {multiSelect.find((img, i) => imagen.id === img.id) && (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: Color.primario1,
                        borderRadius: 100,
                        position: "absolute",
                        top: 10,
                        right: 10,
                        zIndex: 800,
                      }}
                    >
                      <Text style={{ color: "white", textAlign: "center" }}>
                        {multiSelect.indexOf(imagen) + 1}
                      </Text>
                    </View>
                  )}
                  <Image
                    source={{ uri: imagen.uri }}
                    style={{
                      width: (Dimensions.get("window").width - 33) / 4,
                      height: (Dimensions.get("window").width - 33 + 30) / 4,
                      borderRadius: 1,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
      <ScrollableModal
        parentTop={100}
        scrollHeight={100}
        options={album}
        visible={showAlbum}
        onSelectItem={(e) => setSelectedAlbum({ title: e })}
        closeModal={() => setShowAlbum(false)}
        style={{ bottom: 0 }}
      ></ScrollableModal>
    </View>
  );
};

export default UploadMemory;
