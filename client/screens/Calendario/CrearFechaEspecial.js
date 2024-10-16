import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  FontFamily,
  Padding,
  FontSize,
  Color,
  Border,
} from "../../GlobalStyles";
import ENTRADACREADA from "../../components/ENTRADACREADA";
import PopUpCalendario from "../../components/PopUpCalendario";
import UbicacionSVG from "../../components/svgs/UbicacionSVG";
import AñadirUsuarioSVG from "../../components/svgs/AñadirUsuarioSVG";
import Etiquetar from "../../components/Etiquetar";
import OpcionesCaategora from "../../components/OpcionesCaategora";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { createEvent, getAllUserEvents } from "../../redux/actions/events";
import Privacidad from "../Privacidad";
import ImagePickerModal from "../Modals/ImagePickerModal";
import Maps from "../../components/Maps";
import { setScreen } from "../../redux/slices/user.slices";
import ScrollableModal from "../../components/modals/ScrollableModal";
import { lugaresDeEspaña } from "../utils/Lugares";
import axiosInstance from "../../apiBackend";

const CrearFechaEspecial = () => {
  const [user, setUser] = useState();
  const navigation = useNavigation();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const [selectedDate, setSelectedDate] = useState(() => {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();
    return `${año}-${mes}-${dia}`;
  });
  const [location, setLocation] = useState("");
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [showLocation, setShowLocation] = useState(false);

  const [modalCreate, setModalCreate] = useState(false);
  const [programar, setProgramar] = useState(false);
  const [calendario, setCalendario] = useState(false);
  const [showTagUsers, setShowTagUsers] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showPrivacidad, setShowPrivacidad] = useState(false);
  const [privacy, setPrivacy] = useState("Todos");
  const [showPickImage, setShowPickImage] = useState(false);
  const [pickedImage, setPickedImage] = useState([]);

  const getUser = async () => {
    const usuario = await AsyncStorage.getItem("user");
    const user = JSON.parse(usuario);
    setUser(user);
  };

  useFocusEffect(() => {
    dispatch(setScreen("Crear evento"));
  });

  useEffect(() => {
    getUser();
  }, []);

  const onCloseModalCreate = () => {
    setModalCreate(false);
  };

  const openCalendario = () => {
    setCalendario(true);
  };

  const closeCalendario = () => {
    setCalendario(false);
  };
  const dispatch = useDispatch();

  const getFileName = (filePath) => {
    const parts = filePath.split("/");
    const fileName = parts[parts.length - 1];
    return fileName;
  };

  const handleCreateEvent = async () => {
    setModalCreate(true);

    if (description.length > 0 && selectedDate && title) {
      const event = {
        type: "special",
        creatorId: user?.id.toString(),
        description,
        title: title,
        location,
        shared: false,
        images: [],
        privacyMode: privacy,
        wishList: [],
        date: new Date(selectedDate),
      };
      const cloudinaryUrls = [];

      for (const image of pickedImage) {
        const formData = new FormData();
        formData.append("file", {
          uri: image.uri,
          type: "image/jpeg",
          name: image.filename ? image.filename : getFileName(image.uri),
        });
        formData.append("upload_preset", "cfbb_profile_pictures");
        formData.append("cloud_name", "dnewfuuv0");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnewfuuv0/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await response.json();
        if (response.ok) {
          cloudinaryUrls.push(data.secure_url);
        } else {
          console.error("Error uploading image:", data);
        }
      }

      event.coverImage = cloudinaryUrls[0];

      dispatch(createEvent(event)).then(async (e) => {
        const users = invitedUsers;
        console.log(invitedUsers, "invites");
        for (let index = 0; index < users.length; index++) {
          const id = users[index]?.id;
          await axiosInstance.post(`/events/${e.payload.id}/invite`, {
            userId: id,
          });
        }

        const wishList = e.payload.wishList;

        for (let index = 0; index < wishList.length; index++) {
          const wish = wishList[index];
          await axiosInstance.post(`/events/${e.payload.id}/wishlist`, {
            description: wish,
          });
        }
        dispatch(getAllUserEvents(user.id));
      });
    }
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={[styles.crearEvento]}>
          <View>
            <View style={[styles.backParent, styles.buttonBarFlexBox]}>
              <Pressable
                style={styles.backLayout}
                onPress={() => navigation.goBack()}
              >
                <Image
                  style={styles.iconLayout}
                  contentFit="cover"
                  source={require("../../assets/back.png")}
                />
              </Pressable>
              <Text style={[styles.crearEventoText, styles.titleTypo]}>
                Crear fecha especial
              </Text>
            </View>
          </View>

          {/* <View>
            <View style={styles.titleBase}>
              <Text style={[styles.title, styles.titleTypo]}>Categoría</Text>
            </View>
            <Pressable
              onPress={() => setShowCategoryModal(true)}
              style={{
                paddingVertical: 13,
                paddingLeft: 10,
                backgroundColor: Color.fAFAFA,
                borderRadius: Border.br_3xs,
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: selectedCategory ? "#000" : "#606060" }}>
                {selectedCategory || "Selecione la categoría"}
              </Text>

              <Image
                contentFit="cover"
                style={{ width: 20, height: 20, marginRight: 10 }}
                source={require("../../assets/downArrow.png")}
              />
            </Pressable>
          </View> */}
          <View>
            <View style={styles.titleBase}>
              <Text style={[styles.title, styles.titleTypo]}>
                Título del evento
              </Text>
            </View>
            <TextInput
              value={title}
              onChangeText={(text) => setTitle(text)}
              style={{
                paddingVertical: Padding.p_smi,
                paddingHorizontal: 10,
                backgroundColor: Color.fAFAFA,
                borderRadius: Border.br_3xs,
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                gap: 20,
              }}
              placeholder="Título del evento"
            />
          </View>

          <View>
            <View style={styles.titleBase}>
              <Text style={[styles.title, styles.titleTypo]}>Descripción</Text>
            </View>
            <TextInput
              multiline={true}
              numberOfLines={4}
              value={description}
              onChangeText={(text) => setDescription(text)}
              style={{
                paddingLeft: 10,

                textAlignVertical: "top",
                paddingVertical: Padding.p_smi,
                backgroundColor: Color.fAFAFA,
                borderRadius: Border.br_3xs,
                flexDirection: "row",
                width: "100%",
              }}
              placeholder="Descripción de la fecha especial"
            />
          </View>

          <View>
            <View style={styles.titleBase}>
              <Text style={[styles.title, styles.titleTypo]}>Fecha</Text>
            </View>

            <Pressable
              onPress={openCalendario}
              style={{
                paddingVertical: 13,
                backgroundColor: Color.fAFAFA,
                borderRadius: Border.br_3xs,
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  paddingLeft: 10,
                  color: selectedDate ? "#000" : "#606060",
                }}
              >
                {selectedDate || "Selecciona una fecha"}
              </Text>

              <Image
                contentFit="cover"
                style={{ width: 22, height: 22, marginRight: 13 }}
                source={require("../../assets/vector14.png")}
              />
            </Pressable>
          </View>
          <View>
            <View style={styles.titleBase}>
              <Text style={[styles.title, styles.titleTypo]}>
                Selecciona una foto de portada
              </Text>
            </View>

            <Pressable
              onPress={() => setShowPickImage(true)}
              style={{
                paddingLeft: 10,

                paddingVertical: 13,
                backgroundColor: Color.fAFAFA,
                borderRadius: Border.br_3xs,
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: invitedUsers.length > 0 ? "#000" : "#606060" }}
              >
                {pickedImage && pickedImage.length > 0
                  ? "Cambiar foto"
                  : "Seleccionar foto"}
              </Text>
              {pickedImage.length > 0 ? (
                <Image
                  style={{
                    width: 23,
                    height: 24,
                    marginRight: 13,
                    borderRadius: 5,
                  }}
                  contentFit="cover"
                  source={{ uri: pickedImage[0]?.uri }}
                />
              ) : (
                <Image
                  style={{ width: 23, height: 24, marginRight: 13 }}
                  contentFit="cover"
                  source={require("../../assets/image3.png")}
                />
              )}
            </Pressable>
          </View>

          <View>
            <View style={styles.titleBase}>
              <Text style={[styles.title, styles.titleTypo]}>Ubicación</Text>
            </View>

            <Pressable
              onPress={() => setShowLocation(true)}
              style={styles.fieldSpaceBlock2}
            >
              <Text
                style={{
                  color: location.length > 0 ? "#000" : "#606060",
                  paddingLeft: 10,
                }}
              >
                {location.length > 0 ? location : "Ubicación"}
              </Text>
              <Pressable>
                <UbicacionSVG />
              </Pressable>
            </Pressable>
          </View>

          <View>
            <View style={styles.titleBase}>
              <Text style={[styles.title, styles.titleTypo]}>
                Etiqueta a tus invitados
              </Text>
            </View>

            <Pressable
              onPress={() => setShowTagUsers(true)}
              style={{
                paddingLeft: 10,
                paddingVertical: 13,
                backgroundColor: Color.fAFAFA,
                borderRadius: Border.br_3xs,
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: invitedUsers.length > 0 ? "#000" : "#606060" }}
              >
                {invitedUsers.length === 0
                  ? "Agrega invitados"
                  : "Ver invitados"}
              </Text>
              <AñadirUsuarioSVG />
            </Pressable>
          </View>

          <Pressable
            onPress={() => setShowPrivacidad(true)}
            style={{
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 4,
            }}
          >
            <View style={styles.titleBase}>
              <Text style={[styles.title, styles.titleTypo]}>
                Opciones de Privacidad
              </Text>
            </View>
            <Image
              contentFit="contain"
              style={{ width: 18, height: 18, marginRight: 10 }}
              source={require("../../assets/lock3.png")}
            />
          </Pressable>

          <View style={styles.button2}>
            <Pressable
              style={[styles.button, styles.buttonSpaceBlock]}
              onPress={() => navigation.navigate("CALENDARIO")}
            >
              <Text style={[styles.signIn, styles.signTypo]}>Cancelar</Text>
            </Pressable>
          </View>
          <LinearGradient
            style={styles.button2}
            locations={[0, 1]}
            colors={["#dee274", "#7ec18c"]}
          >
            <Pressable
              style={[styles.pressable1, styles.pressableFlexBox]}
              onPress={() => {
                handleCreateEvent();
              }}
            >
              <Text style={[styles.signIn2, styles.signTypo]}>Enviar</Text>
            </Pressable>
          </LinearGradient>

          <View style={styles.frameChild} />
        </View>

        <Modal animationType="fade" transparent visible={modalCreate}>
          <View style={styles.buttonContainer2Overlay}>
            <Pressable
              style={styles.buttonContainer2Bg}
              onPress={() => setModalCreate(false)}
            />
            <ENTRADACREADA
              onClose={onCloseModalCreate}
              message={"¡Enviado!"}
              isNavigate={"CALENDARIO"}
            />
          </View>
        </Modal>

        <Modal animationType="fade" transparent visible={programar}>
          <View style={styles.buttonContainer2Overlay}>
            <Pressable
              style={styles.buttonContainer2Bg}
              onPress={() => setProgramar(false)}
            />
            <PopUpCalendario
              setButtonContainer2Visible={() => {}}
              setCalendario={setProgramar}
            />
          </View>
        </Modal>

        <Modal animationType="fade" transparent visible={calendario}>
          <View style={styles.iconlyLightOutlineCalendarOverlay}>
            <Pressable
              style={styles.iconlyLightOutlineCalendarBg}
              onPress={closeCalendario}
            />
            <PopUpCalendario
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setButtonContainer2Visible={() => {}}
              setCalendario={setCalendario}
            />
          </View>
        </Modal>
        <Modal animationType="fade" transparent visible={showTagUsers}>
          <View
            style={{
              flex: 1,
            }}
          >
            <Pressable
              style={{ flex: 1 }}
              onPress={() => setShowTagUsers(false)}
            />
            <Etiquetar
              taggedUsers={invitedUsers}
              setTaggedUsers={setInvitedUsers}
              onClose={() => setShowTagUsers(false)}
            />
          </View>
        </Modal>
        <Modal animationType="fade" transparent visible={showCategoryModal}>
          <View
            style={{
              flex: 1,
            }}
          >
            <Pressable
              style={{ flex: 1 }}
              onPress={() => setShowCategoryModal(false)}
            />
            <OpcionesCaategora
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onClose={() => setShowCategoryModal(false)}
            />
          </View>
        </Modal>
        <Modal animationType="fade" transparent visible={showPrivacidad}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Pressable
              style={{ width: "100%", height: "100%", left: 0, top: 0 }}
              onPress={() => setShowPrivacidad(false)}
            />
            <Privacidad
              privacy={privacy}
              setPrivacy={setPrivacy}
              onClose={() => setShowPrivacidad(false)}
            />
          </View>
        </Modal>
        <Modal animationType="fade" transparent visible={showPickImage}>
          <View
            style={{
              height: "100%",
            }}
          >
            <Pressable
              style={{ width: "100%", height: "100%", left: 0, top: 0 }}
              onPress={() => setShowPickImage(false)}
            />
            <ImagePickerModal
              fromEvent={true}
              pickedImages={pickedImage}
              setPickedImages={setPickedImage}
              onClose={() => setShowPickImage(false)}
            />
          </View>
        </Modal>
      </ScrollView>
      {/* <Modal animationType="fade" transparent visible={showLocation}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(113, 113, 113, 0.3)",
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
            onPress={() => {
              setShowLocation(false);
            }}
          />
          <Maps
            onClose={() => setShowLocation(false)}
            setLocation={setLocation}
          />
        </View>
      </Modal> */}
      <ScrollableModal
        options={lugaresDeEspaña}
        closeModal={() => setShowLocation(false)}
        visible={showLocation}
        onSelectItem={setLocation}
      ></ScrollableModal>
    </>
  );
};

const styles = StyleSheet.create({
  titleTypo: {
    textAlign: "left",
    letterSpacing: 0,
    fontFamily: FontFamily.lato,
  },
  buttonSpaceBlock: {
    paddingBottom: Padding.p_5xs,
    paddingTop: Padding.p_6xs,
    flex: 1,
  },
  signTypo: {
    textAlign: "center",
    fontFamily: FontFamily.lato,
  },
  pressableFlexBox: {
    backgroundColor: Color.linearBoton,
    borderRadius: Border.br_11xl,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#242424",
    fontWeight: "500",
    lineHeight: 19,
    fontSize: FontSize.size_base,
    textAlign: "center",
    letterSpacing: 0,
  },
  fieldSpaceBlock: {
    paddingVertical: Padding.p_smi,
    backgroundColor: Color.fAFAFA,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xl,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  fieldSpaceBlock2: {
    paddingVertical: 10,
    backgroundColor: Color.fAFAFA,
    borderRadius: Border.br_3xs,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionField: {
    paddingVertical: Padding.p_smi,
    backgroundColor: Color.fAFAFA,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xl,
    flexDirection: "row",
    width: "100%",
    height: 100,
  },
  signIn: {
    lineHeight: 21,
    fontSize: FontSize.size_sm,
    textAlign: "center",
    letterSpacing: 0,
    color: "#dee274",
  },
  button: {
    borderStyle: "solid",
    borderColor: Color.colorKhaki_100,
    borderWidth: 1,
    height: 52,
    borderRadius: Border.br_11xl,
    paddingBottom: Padding.p_5xs,
    paddingTop: Padding.p_6xs,
    paddingHorizontal: Padding.p_base,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  signIn2: {
    letterSpacing: 1,
    color: Color.white,
    lineHeight: 24,
    fontSize: FontSize.size_base,
    flex: 1,
  },
  pressable1: {
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    width: "100%",
  },
  button2: {
    marginTop: "5%",
    borderRadius: Border.br_11xl,
  },
  frameChild: {
    padding: Padding.p_3xs,
    height: 105,
    marginTop: 8,
    backgroundColor: Color.white,
  },
  back: {
    height: 24,
    width: 24,
  },
  backParent: {
    marginBottom: 15,
  },
  crearEvento: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: Padding.p_xl,
    gap: 10,
    marginBottom: -10,
    paddingTop: 15,
  },
  titleBase: {
    paddingBottom: Padding.p_7xs,
    flexDirection: "row",
    alignItems: "center",
  },
  image6Icon: {
    width: 87,
    height: 55,
  },
  image6Wrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  buttonBarFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  backLayout: {
    height: 24,
    width: 24,
  },
  crearEventoText: {
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
    color: Color.negro,
    marginLeft: 20,
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  buttonContainer2Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  buttonContainer2Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  iconlyLightOutlineCalendarOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconlyLightOutlineCalendarBg: {
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
});

export default CrearFechaEspecial;
