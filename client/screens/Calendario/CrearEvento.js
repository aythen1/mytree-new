import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
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
import CalendarSVG from "../../components/svgs/CalendarSVG";
import UbicacionSVG from "../../components/svgs/UbicacionSVG";
import AñadirUsuarioSVG from "../../components/svgs/AñadirUsuarioSVG";
import RegaloSVG from "../../components/svgs/RegaloSVG";
import Etiquetar from "../../components/Etiquetar";
import CreateWishListModal from "../../components/CreateWishModal/CreateWishListModal";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createEvent, getAllUserEvents } from "./../../redux/actions/events";
import ImagePickerModal from "../Modals/ImagePickerModal";
import axiosInstance from "../../apiBackend";
import { setScreen } from "../../redux/slices/user.slices";
import Maps from "../../components/Maps";
import ScrollableModal from "../../components/modals/ScrollableModal";
import { lugaresDeEspaña } from "../utils/Lugares";

const CrearFechaEspecial = () => {
  const [user, setUser] = useState();
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();
    return `${año}-${mes}-${dia}`;
  });
  const [location, setLocation] = useState("");
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [showLocation, setShowLocation] = useState(false);

  const [modalCreate, setModalCreate] = useState(false);
  const [programar, setProgramar] = useState(false);
  const [calendario, setCalendario] = useState(false);
  const [showTagUsers, setShowTagUsers] = useState(false);
  const [showWishList, setShowWishList] = useState(false);
  const [showPickImage, setShowPickImage] = useState(false);
  const [pickedImage, setPickedImage] = useState([]);
  const [error, setError] = useState();
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

    if (description.length > 0 && title.length > 0 && selectedDate) {
      const event = {
        type: "normal",
        creatorId: user?.id.toString(),
        description,
        images: [],
        privacyMode: "Todos",
        title,
        location,
        shared: false,
        wishList,
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
    } else {
      setError("debe contener almenos Título , Descripción y Fecha");
    }
  };
  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
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
              Crear evento
            </Text>
          </View>
        </View>

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
              paddingHorizontal: 10,

              textAlignVertical: "top",
              paddingVertical: Padding.p_smi,
              backgroundColor: Color.fAFAFA,
              borderRadius: Border.br_3xs,
              flexDirection: "row",
              width: "100%",
            }}
            placeholder="Descripción del evento"
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
              paddingLeft: 10,

              backgroundColor: Color.fAFAFA,
              borderRadius: Border.br_3xs,
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: selectedDate ? "#000" : "#606060" }}>
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
            <Text style={{ paddingLeft: 10 }} value={location}>
              {location || "Ubicación"}
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
              paddingVertical: 13,
              paddingLeft: 10,
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
              {invitedUsers.length === 0 ? "Agrega invitados" : "Ver invitados"}
            </Text>
            <AñadirUsuarioSVG />
          </Pressable>
        </View>

        <View>
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>
              Lista de observaciones
            </Text>
          </View>
          <Pressable
            onPress={() => setShowWishList(true)}
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
            <Text style={{ color: wishList.length > 0 ? "#000" : "#606060" }}>
              {wishList.length === 0
                ? "Crea tu lista de observaciones"
                : "Ver lista de observaciones"}
            </Text>
            <Image
              contentFit="cover"
              style={{ width: 22, height: 22, marginRight: 13 }}
              source={require("../../assets/gift.png")}
            />
          </Pressable>
        </View>

        <View style={styles.button2}>
          <Pressable
            style={[styles.button, styles.buttonSpaceBlock]}
            onPress={() => navigation.navigate("CALENDARIO")}
          >
            <Text style={[styles.signIn, styles.signTypo]}>Cancelar</Text>
          </Pressable>
        </View>
        {error && <Text>{error}</Text>}
        <LinearGradient
          style={{
            marginTop: "5%",
            borderRadius: Border.br_11xl,
            marginBottom: -15,
          }}
          locations={[0, 1]}
          colors={["#7ec18c", "#dee274"]}
          start={{ x: 0, y: 0 }} // Inicio del gradiente (izquierda)
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            style={[styles.pressable1, styles.pressableFlexBox]}
            onPress={() => {
              handleCreateEvent();
            }}
          >
            <Text style={[styles.signIn2, styles.signTypo]}>Enviar</Text>
          </TouchableOpacity>
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{ width: "100%", height: "100%", left: 0, top: 0 }}
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
            alignItems: "center",
            justifyContent: "center",
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
      <Modal animationType="fade" transparent visible={showWishList}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Pressable
            style={{ width: "100%", height: "100%", left: 0, top: 0 }}
            onPress={() => setShowWishList(false)}
          />
          <CreateWishListModal
            wishList={wishList}
            setWishList={setWishList}
            onClose={() => setShowWishList(false)}
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
            s
            pickedImages={pickedImage}
            setPickedImages={setPickedImage}
            onClose={() => setShowPickImage(false)}
          />
        </View>
      </Modal>
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
    </ScrollView>
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
    color: Color.textTextPrimary,
    fontWeight: "500",
    lineHeight: 19,
    fontSize: FontSize.size_base,
    textAlign: "left",
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
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 10,
  },
  titleBase: {
    paddingBottom: Padding.p_7xs,
    flexDirection: "row",
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
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  iconlyLightOutlineCalendarBg: {
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
});

export default CrearFechaEspecial;
