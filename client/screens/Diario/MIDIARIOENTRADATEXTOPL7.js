import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, Padding, FontSize } from "../../GlobalStyles";
import NavBarDiario from "../../components/NavBarDiario";
import Humor from "../../components/Humor";
import ReflexionDiaria from "./ReflexionDiaria";
import NavMedia from "../../components/NavMedia";
import { Context } from "../../context/Context";
import { Entypo } from "@expo/vector-icons";
import { Camera, CameraView } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import PopUpCalendario from "../../components/PopUpCalendario";
import MasBusquedaSVG from "../../components/svgs/MasBusquedaSVG";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDiariesByDateOrCategory,
  postDiary,
  updateDiaryById,
} from "../../redux/actions/diaries";
import ImagePickerModal from "../Modals/ImagePickerModal";
import TopBar from "../../components/TopBar";
import { removeUserDiary } from "../../redux/slices/diaries.slices";

const MIDIARIOENTRADATEXTOPL7 = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados
  const day = String(currentDate.getDate()).padStart(2, "0");

  const dispatch = useDispatch();
  const { selectedSection, editingDiary, handleAddDiary } = useContext(Context);
  const navigation = useNavigation();
  const [showEdit, setShowEdit] = useState(false);
  const [isSection, setIsSection] = useState("");
  const { userData } = useSelector((state) => state.users);
  const { userDiaries } = useSelector((state) => state.diaries);

  const [modalCreate, setModalCreate] = useState(false);
  const { pickImage, showCamera, setShowCamera, setEditingDiary } =
    useContext(Context);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(`${year}-${month}-${day}`);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [showEmojisModal, setShowEmojisModal] = useState(false);

  const [pickedImages, setPickedImages] = useState([]);
  const [diaryImages, setDiaryImages] = useState([]);

  const monthsInSpanish = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  useEffect(() => {
    obtenerImagenesDeGaleria();
  }, []);

  useEffect(() => {
    setEditingDiary();
    const obj = { creatorId: userData.id, category: selectedSection };
    if (selectedDate) {
      obj.date = selectedDate;
    }
    dispatch(getUserDiariesByDateOrCategory(obj)).then((e) => {});
    // Aca cuando tenga la ruta desarrollo logica de get de diarios por categoria y selectedDate.
  }, [selectedDate, selectedSection]);

  const obtenerImagenesDeGaleria = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      console.error("Permiso denegado para acceder a la galería de imágenes.");
      return;
    }

    const assets = await MediaLibrary.getAssetsAsync();
    const imagesArray = assets?.assets ?? [];
    setImages(imagesArray);
  };

  const [hasPermission, setHasPermission] = useState(null);
  const cameraReff = useRef(null);
  const [facing, setFacing] = useState("back");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const changePictureMode = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (cameraReff?.current) {
      const photo = await cameraReff.current.takePictureAsync();
      pickImage("a", photo.uri);
      setSelectedImage(photo);
      // pickImageFromCamera(selectedPicture, photo.uri);

      setShowCamera(false);
      // You can handle the taken photo here, such as displaying it or saving it.
    }
  };

  const [groupIcon1Visible, setGroupIcon1Visible] = useState(false);

  const openGroupIcon1 = useCallback(() => {
    setGroupIcon1Visible(true);
  }, []);

  const closeGroupIcon1 = useCallback(() => {
    setGroupIcon1Visible(false);
  }, []);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const monthString = selectedDate?.slice(5, 7).split("0").join(""); // Elimina el "0" inicial si existe
  const monthNumber = parseInt(monthString, 10); // Convierte la cadena a un número

  return (
    <View
      style={{
        backgroundColor: Color.white,
        width: "100%",
        justifyContent: "space-between",
        flexGrow: 1,
        paddingBottom: showCamera ? 0 : 105,
      }}
    >
      {showCamera ? (
        <CameraView
          ref={cameraReff}
          facing={facing}
          style={{ flex: 1 }}
          mode="picture"
          FocusMode="on"

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
        <View>
          <View>
            <TopBar></TopBar>

            <NavBarDiario setIsSection={setIsSection} isSection={isSection} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                height: "100%",
                paddingBottom: 100,
              }}
              style={{
                width: "100%",
                paddingTop: 15,
                paddingHorizontal: 15,
                height: "100%",
              }}
            >
              <View style={styles.editContainer}>
                <Pressable
                  onPress={() => setShowCalendar(true)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.text, styles.textTypo]}>
                    {selectedDate.slice(8, 10)}
                  </Text>
                  <Text style={[styles.jul2023, styles.textTypo]}>
                    {`${monthsInSpanish[monthNumber - 1]} ${selectedDate?.slice(0, 4)}`}
                  </Text>
                  <Image
                    style={styles.iconlycurvedarrowDown2}
                    resizeMode="contain"
                    source={require("../../assets/iconlycurvedarrowdown2.png")}
                  />
                  {/* <Editar2SVG style={{ marginLeft: '45%' }} /> */}
                </Pressable>
                <Pressable
                  onPress={() => handleAddDiary(selectedSection, selectedDate)}
                >
                  <MasBusquedaSVG />
                </Pressable>
              </View>

              {/* renderizado de secciones */}
              {/* {renderSection(selectedSection)} */}

              {editingDiary === "preDiary" ? (
                <ScrollView
                  style={{ width: "100%", height: "100%" }}
                  contentContainerStyle={{ paddingBottom: 500 }}
                >
                  <Text style={[styles.reflexinDiaria, styles.hoyLoHeFlexBox]}>
                    {selectedSection === "nube"
                      ? "Reflexión Diaria"
                      : selectedSection === "logros"
                        ? "Celebrando Logros"
                        : selectedSection === "desafios"
                          ? "Desafíos Superados"
                          : selectedSection === "risas"
                            ? "Risas y anécdotas"
                            : selectedSection === "mundo"
                              ? "Descubriendo el mundo"
                              : "Personalizada"}
                  </Text>
                  <View style={{}}>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        gap: 5,
                      }}
                    >
                      {diaryImages?.length > 0 &&
                        diaryImages?.map((image, i) => (
                          <View>
                            <Image
                              key={i}
                              source={{ uri: image }}
                              contentFit={"contain"}
                              style={{ width: 50, height: 50, borderRadius: 3 }}
                            />
                            <Pressable
                              onPress={() =>
                                setDiaryImages(
                                  [...diaryImages].filter(
                                    (img) => img !== image,
                                  ),
                                )
                              }
                              style={{
                                position: "absolute",
                                top: 3,
                                right: 3,
                                borderRadius: 3,
                                backgroundColor: "#fff",
                                padding: 3.5,
                              }}
                            >
                              <Image
                                contentFit="cover"
                                style={{ width: 7, height: 7 }}
                                source={require("../../assets/group-68463.png")}
                              />
                            </Pressable>
                          </View>
                        ))}
                      {pickedImages.length > 0 &&
                        pickedImages.map((image, i) => (
                          <View>
                            <Image
                              key={i + 500}
                              source={{ uri: image.uri }}
                              contentFit={"contain"}
                              style={{ width: 50, height: 50, borderRadius: 3 }}
                            />
                            <Pressable
                              onPress={() => {
                                setPickedImages(
                                  pickedImages.filter(
                                    (img) => img.uri !== image.uri,
                                  ),
                                );
                              }}
                              style={{
                                position: "absolute",
                                top: 3,
                                right: 3,
                                borderRadius: 3,
                                backgroundColor: "#fff",
                                padding: 3.5,
                              }}
                            >
                              <Image
                                contentFit="cover"
                                style={{ width: 7, height: 7 }}
                                source={require("../../assets/group-68463.png")}
                              />
                            </Pressable>
                          </View>
                        ))}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <TextInput
                      placeholder="Título"
                      value={title}
                      onChangeText={setTitle}
                      maxLength={30}
                      style={{ width: "50%", fontSize: 20 }}
                    ></TextInput>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        height: "100%",
                      }}
                    >
                      {editingDiary ? (
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 15,
                            paddingRight: 15,
                          }}
                        >
                          <Pressable
                            style={{ height: 18, width: 18 }}
                            onPress={() => {
                              if (editingDiary === "preDiary") {
                                dispatch(removeUserDiary("preDiary"));
                              }
                              setText("");
                              setTitle("");

                              setEditingDiary();
                              setPickedImages([]);
                            }}
                          >
                            <Image
                              style={{ height: "100%", width: "100%" }}
                              contentFit="cover"
                              source={require("../../assets/group-68463.png")}
                            />
                          </Pressable>
                        </View>
                      ) : (
                        <View
                          style={{
                            backgroundColor: "red",
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: FontSize.size_lg,
                              lineHeight: 27,
                              textAlign: "left",
                              color: Color.negro,
                              marginTop: 20,
                              fontFamily: FontFamily.lato,
                              letterSpacing: 0,
                              marginBottom: 8,
                            }}
                          >
                            {text}
                          </Text>
                          <View
                            style={{
                              width: "100%",
                              flexWrap: "wrap",
                              flexDirection: "row",
                              gap: 5,
                            }}
                          >
                            {diaryImages.length > 0 &&
                              diaryImages.map((image, i) => (
                                <Image
                                  key={i}
                                  source={{ uri: image }}
                                  contentFit={"contain"}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 3,
                                  }}
                                />
                              ))}
                          </View>
                        </View>
                      )}
                      <Pressable
                        style={{ height: 24, width: 24 }}
                        onPress={() => setShowEmojisModal(true)}
                      >
                        <Image
                          style={{ height: "100%", width: "100%" }}
                          contentFit="cover"
                          source={require("../../assets/group2.png")}
                        />
                      </Pressable>
                      <LinearGradient
                        style={{ marginLeft: 20, borderRadius: 50 }}
                        locations={[0, 1]}
                        colors={["#dee274", "#7ec18c"]}
                      >
                        <Pressable
                          style={{
                            paddingHorizontal: Padding.p_base,
                            paddingTop: Padding.p_6xs,
                            paddingBottom: Padding.p_5xs,
                            backgroundColor: Color.linearBoton,
                          }}
                          onPress={async () => {
                            const ultimo = userDiaries[userDiaries.length - 1];
                            const preDiary = { ...ultimo };
                            preDiary.description = text;
                            preDiary.title = title;
                            const cloudinaryUrls = [];

                            // for (const image of pickedImages) {
                            //   const formData = new FormData()
                            //   formData.append('file', {
                            //     uri: image.uri,
                            //     type: 'image/jpeg',
                            //     name: image.filename
                            //       ? image.filename
                            //       : getFileName(image.uri)
                            //   })
                            //   formData.append(
                            //     'upload_preset',
                            //     'cfbb_profile_pictures'
                            //   )
                            //   formData.append('cloud_name', 'dnewfuuv0')

                            //   const response = await fetch(
                            //     'https://api.cloudinary.com/v1_1/dnewfuuv0/image/upload',
                            //     {
                            //       method: 'POST',
                            //       body: formData
                            //     }
                            //   )

                            //   const data = await response.json()
                            //   if (response.ok) {
                            //     cloudinaryUrls.push(data.secure_url)
                            //   } else {
                            //     console.error('Error uploading image:', data)
                            //   }
                            // }

                            if (preDiary.id === "preDiary") {
                              delete preDiary.id;
                              dispatch(postDiary(preDiary)).then((res) => {
                                setText("");
                                setTitle("");
                                const obj = {
                                  creatorId: userData.id,
                                  category: selectedSection,
                                };
                                obj.images = cloudinaryUrls;

                                if (selectedDate) {
                                  obj.date = selectedDate;
                                }
                                dispatch(getUserDiariesByDateOrCategory(obj));
                              });
                            } else {
                              const updatedData = {
                                description: preDiary.description,
                              };
                              updatedData.images = [
                                ...diaryImages,
                                ...cloudinaryUrls,
                              ];
                              dispatch(
                                updateDiaryById({
                                  diaryId: preDiary.id,
                                  diaryData: updatedData,
                                  title,
                                }),
                              ).then((res) => {
                                setText("");
                                setTitle("");
                                const obj = {
                                  creatorId: userData.id,
                                  category: selectedSection,
                                };
                                if (selectedDate) {
                                  obj.date = selectedDate;
                                }

                                dispatch(getUserDiariesByDateOrCategory(obj));
                              });
                            }
                            setPickedImages([]);
                            setEditingDiary();
                            setText("");
                          }}
                        >
                          <Text
                            style={{
                              fontSize: FontSize.size_sm,
                              lineHeight: 21,
                              textAlign: "center",
                              color: Color.white,
                              fontFamily: FontFamily.lato,
                              letterSpacing: 0,
                            }}
                          >
                            Guardar
                          </Text>
                        </Pressable>
                      </LinearGradient>
                    </View>
                  </View>
                  <View
                    style={{
                      borderTopWidth: 1,
                      marginTop: 10,
                      borderColor: Color.primario1,
                    }}
                  >
                    <TextInput
                      placeholder="Escribe algo.."
                      style={{
                        fontSize: FontSize.size_lg,
                        width: "100%",
                        textAlign: "left",
                        color: Color.negro,
                        fontFamily: FontFamily.lato,
                        letterSpacing: 0,
                        paddingTop: 5,
                      }}
                      multiline
                      value={text}
                      onChangeText={(text) => setText(text)}
                    />
                  </View>
                </ScrollView>
              ) : (
                <ReflexionDiaria
                  pickedImages={pickedImages}
                  setPickedImages={setPickedImages}
                  openGroupIcon1={openGroupIcon1}
                  modalCreate={modalCreate}
                  setModalCreate={setModalCreate}
                  selectedDate={selectedDate}
                  editing={showEdit}
                />
              )}

              {/* -------------------- */}
            </ScrollView>
          </View>

          {editingDiary && <NavMedia setShowImagesModal={setShowImagesModal} />}
          <Modal animationType="fade" transparent visible={showCalendar}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pressable
                style={{ width: "100%", height: "100%", left: 0, top: 0 }}
                onPress={() => setShowCalendar(false)}
              />
              <PopUpCalendario
                fromDiary={true}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setButtonContainer2Visible={() => {}}
                setCalendario={setShowCalendar}
              />
            </View>
          </Modal>

          <Modal animationType="fade" transparent visible={groupIcon1Visible}>
            <View style={styles.arrowDown2Icon1Overlay}>
              <Pressable
                style={styles.arrowDown2Icon1Bg}
                onPress={closeGroupIcon1}
              />
              <Humor onClose={closeGroupIcon1} />
            </View>
          </Modal>
          <Modal animationType="fade" transparent visible={showImagesModal}>
            <View
              style={{
                height: "100%",
              }}
            >
              <Pressable
                style={{ width: "100%", height: "100%", left: 0, top: 0 }}
                onPress={() => setShowImagesModal(false)}
              />
              <ImagePickerModal
                pickedImages={pickedImages}
                setPickedImages={setPickedImages}
                onClose={() => setShowImagesModal(false)}
              />
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  hoyLoHeFlexBox: {
    textAlign: "left",
    alignSelf: "stretch",
    color: Color.negro,
    marginTop: 20,
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  reflexinDiaria: {
    lineHeight: 36,
    fontSize: FontSize.size_5xl,
    marginBottom: 10,
  },
  arrowDown2Icon1Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  arrowDown2Icon1Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  groupParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
  },
  groupFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  pressable: {
    paddingHorizontal: Padding.p_base,
    paddingTop: Padding.p_6xs,
    paddingBottom: Padding.p_5xs,
    backgroundColor: Color.linearBoton,
  },
  wrapper: {
    height: 24,
    width: 24,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  container: {
    marginLeft: 20,
  },
  signIn: {
    fontSize: FontSize.size_sm,
    lineHeight: 21,
    textAlign: "center",
  },
  ttTypo: {
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  textTypo: {
    textAlign: "center",
    color: Color.negro,
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
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
    width: 49 * 0.3,
    height: 27 * 0.3,
    marginLeft: 10,
    marginTop: 1,
  },
  frameParent: {
    width: "100%",
  },
  image6Icon: {
    width: 87,
    height: 55,
  },
  miDiarioEntradaTextoPl: {
    backgroundColor: Color.white,
    width: "100%",
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginTop: 20,
    width: "100%",
    padding: 15,
  },
  topContainer: {
    top: 10,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default MIDIARIOENTRADATEXTOPL7;
