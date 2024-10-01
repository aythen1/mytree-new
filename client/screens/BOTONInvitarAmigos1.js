import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import QR from "../components/QR";
import { Context } from "../context/Context";
import { LinearGradient } from "expo-linear-gradient";
import ScrollableModal from "../components/modals/ScrollableModal";
import ENTRADACREADA from "../components/ENTRADACREADA";
import {
  getAllNotifications,
  postNotification,
} from "../redux/actions/notifications";

const BOTONInvitarAmigos1 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    showQrModal,
    setShowQrModal,
    selectedRelationShip,
    showInvitationSendModal,
    setShowInvitationSendModal,
    setSelectedRelationShip,
  } = useContext(Context);
  const [relationshipModalVisible, setRelationshipModalVisible] =
    useState(false);
  const [relationtypeModalVisible, setRelationtypeModalVisible] =
    useState(false);
  const { allUsers } = useSelector((state) => state.users);
  const [filteredUsers, setFilteredUsers] = useState([...allUsers]);
  const [relationshipTop, setRelationshipTop] = useState(0);
  const [relationtypeTop, setRelationtypeTop] = useState(0);
  const [scrolledHeight, setScrolledHeight] = useState(0);
  const [selectedUserToInvite, setSelectedUserToInvite] = useState();
  const [selectedRelationType, setSelectedRelationType] = useState();

  const { userData } = useSelector((state) => state.users);

  const [value, setValue] = useState("");

  useEffect(() => {
    const filterUsers = () => {
      const filtered = allUsers.filter((user) => {
        const apellido = user.apellido.toLowerCase();
        const username = user.username.toLowerCase();
        const searchValue = value.toLowerCase();

        return apellido.includes(searchValue) || username.includes(searchValue);
      });

      setFilteredUsers(filtered);
    };

    filterUsers();
  }, [value, allUsers]);

  const handleChangeRelationType = (type) => {
    setSelectedRelationType(type);
    if (type !== selectedRelationType) setSelectedRelationShip();
  };

  const relacionIngles = () => {
    switch (selectedRelationShip) {
      case "Amigos íntimos":
        return "closeFriend";
      case "Colegio":
        return "schoolFriend";
      case "Trabajo":
        return "workFriend";
      case "Universidad":
        return "universityFriend";
      case "Afición":
        return "hobbyFriend";
      // Valor por defecto en caso de que no se encuentre la relación
      case "Sobrino/a":
        return "nephew";
      case "Hermano":
        return "brother";
      case "Primo/a":
        return "cousin";
      case "Hijo/a":
        return "children";
      case "Tío/a":
        return "uncle";
      case "Nieto/a":
        return "grandchildren";
      default:
        return "family"; // Valor por defecto para relaciones familiares
    }
  };

  const handleSendInvitation = () => {
    console.log(selectedRelationShip, "relation");
    const body = {
      title: `Solicitud de ${selectedRelationType === "Familiar" ? "familia" : "amistad"}`,
      message: `${userData.username} ${userData.apellido} te ha enviado una solicitud de ${selectedRelationType === "Familiar" ? "familia" : "amistad"}`,
      senderId: userData?.id?.toString(),
      receiverId: selectedUserToInvite?.id?.toString(),
      type: `${selectedRelationType === "Familiar" ? "family request" : "friend request"}`,
      relationship: relacionIngles(),
      readed: false,
      extraData: {},
      photos: [],
    };

    dispatch(postNotification(body)).then(() =>
      dispatch(getAllNotifications()),
    );
    setSelectedRelationShip();
    setSelectedRelationType();
  };

  return (
    <LinearGradient
      colors={["#fff", "#f1f1f1"]}
      style={{ flex: 1, paddingBottom: 70 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View
        style={{
          width: "100%",
          overflow: "hidden",
          flex: 1,
          gap: 15,
          paddingHorizontal: 15,
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={{ position: "absolute", left: 0 }}
            onPress={() => {
              if (!selectedUserToInvite) {
                navigation.goBack();
              } else {
                setSelectedRelationType();
                setSelectedRelationShip();
                setSelectedUserToInvite();
              }
            }}
          >
            <Image
              style={{ height: 20, width: 20, alignSelf: "center" }}
              contentFit="cover"
              source={require("../assets/back.png")}
            />
          </Pressable>

          <Text
            style={{
              fontSize: FontSize.size_5xl,
              fontWeight: 700,
              fontFamily: FontFamily.lato,
              color: Color.negro,
            }}
          >
            Añadir contacto
          </Text>
        </View>
        {!selectedUserToInvite && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "85%",
                height: 40,
                paddingHorizontal: 10,
                borderRadius: 10,
                gap: 10,
                alignItems: "center",
                backgroundColor: "#f3f3f3",
              }}
            >
              <Image
                style={{ width: 20, height: 20 }}
                contentFit="cover"
                source={require("../assets/search.png")}
              />
              <TextInput
                placeholderTextColor={"#BDBDBD"}
                placeholder="Búsqueda"
                value={value}
                onChangeText={(text) => {
                  setValue(text);
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f3f3f3",
                borderRadius: 100,
              }}
            >
              <Image
                style={{ width: 22, height: 22 }}
                contentFit="cover"
                source={require("../assets/send.png")}
              />
            </TouchableOpacity>
          </View>
        )}

        {selectedUserToInvite ? (
          <View style={{ gap: 10, flex: 1 }}>
            <Text
              style={{
                color: "#7EC18C",
                fontFamily: FontFamily.lato,
                fontSize: 20,
                fontWeight: 600,
              }}
            >{`Invitar a ${selectedUserToInvite.username} ${selectedUserToInvite.apellido}`}</Text>
            <View
              collapsable={false}
              onLayout={(event) => {
                event.target.measure((x, y, width, height, pageX, pageY) => {
                  setRelationtypeTop(pageY);
                });
              }}
              style={{ gap: 5, position: "relative" }}
            >
              <Text
                style={{
                  color: Color.textTextPrimary,
                  fontFamily: FontFamily.lato,
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                Relación
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: Color.textTextSecondary,
                    fontFamily: FontFamily.lato,
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  {selectedRelationType || "Selecciona tipo de relación"}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setRelationtypeModalVisible(true);
                  }}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      transform: `${relationtypeModalVisible && "rotate(90deg)"}`,
                    }}
                    source={require("../assets/back3.png")}
                  />
                </TouchableOpacity>
              </View>
              {relationtypeModalVisible && (
                <ScrollableModal
                  scrollHeight={scrolledHeight}
                  parentTop={relationtypeTop}
                  visible={relationtypeModalVisible}
                  closeModal={() => setRelationtypeModalVisible(false)}
                  onSelectItem={handleChangeRelationType}
                  options={["Amigos", "Familiar"]}
                />
              )}
            </View>

            <View
              collapsable={false}
              onLayout={(event) => {
                event.target.measure((x, y, width, height, pageX, pageY) => {
                  setRelationshipTop(pageY);
                });
              }}
              style={{ gap: 5, position: "relative" }}
            >
              <Text
                style={{
                  color: Color.textTextPrimary,
                  fontFamily: FontFamily.lato,
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                Parentesco
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: Color.textTextSecondary,
                    fontFamily: FontFamily.lato,
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  {selectedRelationShip || "Selecciona parentesco"}
                </Text>
                <TouchableOpacity
                  onPress={() => setRelationshipModalVisible(true)}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      transform: `${relationshipModalVisible && "rotate(90deg)"}`,
                    }}
                    source={require("../assets/back3.png")}
                  />
                </TouchableOpacity>
              </View>
              {relationshipModalVisible && (
                <ScrollableModal
                  scrollHeight={scrolledHeight}
                  parentTop={relationshipTop}
                  visible={relationshipModalVisible}
                  closeModal={() => setRelationshipModalVisible(false)}
                  onSelectItem={setSelectedRelationShip}
                  options={
                    selectedRelationType === "Amigos"
                      ? [
                          "Amigos íntimos",
                          "Colegio",
                          "Trabajo",
                          "Universidad",
                          "Afición",
                        ]
                      : [
                          "Madre",
                          "Padre",
                          "Primo/a",
                          "Sobrino/a",
                          "Hijo/a",
                          "Nieto/a",
                          "Tío/a",
                        ]
                  }
                />
              )}
            </View>
          </View>
        ) : (
          <ScrollView>
            {filteredUsers.map((user, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedUserToInvite(user)}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#B7E4C0",
                }}
              >
                <Text
                  style={{ color: "#787878", fontSize: 16, fontWeight: 500 }}
                >
                  {user.username + " " + user.apellido}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {selectedUserToInvite && (
          <TouchableOpacity
            disabled={
              !selectedRelationShip ||
              !selectedRelationType ||
              !selectedUserToInvite
            }
            onPress={() => {
              handleSendInvitation();
              setShowInvitationSendModal(true);
              setSelectedUserToInvite();
              setSelectedRelationShip();
              setSelectedRelationType();
            }}
          >
            <LinearGradient
              style={{
                marginLeft: "5%",
                borderRadius: 100,
                backgroundColor: Color.grisClaro,
                justifyContent: "center",
                paddingHorizontal: Padding.p_5xl,
                height: 55,
                width: "90%",
                justifySelf: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              locations={[0, 1]}
              colors={["#dee274", "#7ec18c"]}
            >
              <View
                style={{
                  borderRadius: 100,
                  position: "absolute",
                  backgroundColor: Color.white,
                  justifyContent: "center",
                  height: 53,
                  width: Dimensions.get("screen").width * 0.9 - 30,
                  justifySelf: "center",
                  alignItems: "center",
                }}
              ></View>
              <Text
                style={{
                  fontSize: FontSize.size_base,
                  letterSpacing: 1,
                  lineHeight: 24,
                  color: "#7EC18C",
                  textAlign: "center",
                  fontFamily: FontFamily.lato,
                  flex: 1,
                }}
              >
                Enviar invitación
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setShowQrModal(true)}>
          <LinearGradient
            style={{
              marginBottom: 35,
              marginLeft: "5%",
              borderRadius: Border.br_11xl,
              backgroundColor: Color.grisClaro,
              justifyContent: "center",
              paddingHorizontal: Padding.p_5xl,
              height: 55,
              width: "90%",
              justifySelf: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            locations={[0, 1]}
            colors={["#7ec18c", "#dee274"]}
            start={{ x: 0, y: 0 }} // Inicio del gradiente (izquierda)
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.signIn}>Crear link de invitación</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={showQrModal}>
        <TouchableWithoutFeedback onPress={() => setShowQrModal(false)}>
          <View style={styles.modalOverlay}>
            <View>
              <QR
                selectedUserToInvite={selectedUserToInvite}
                relation={selectedRelationShip}
                relationType={selectedRelationType}
                onClose={() => setShowQrModal(false)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal animationType="fade" transparent visible={showInvitationSendModal}>
        <View style={styles.buttonContainer2Overlay}>
          <Pressable
            style={styles.buttonContainer2Bg}
            onPress={() => setShowInvitationSendModal(false)}
          />
          <ENTRADACREADA
            onClose={() => setShowInvitationSendModal(false)}
            isNavigate={"Muro"}
            message={"¡Invitación enviada!"}
          />
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchFlexBox: {
    textAlign: "left",
    color: Color.negro,
  },
  buttonContainer2Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  buttonFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer2Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  headerLayout: {
    width: "100%",
    position: "absolute",
  },
  ionmenuIcon: {
    top: 83,
    width: 26,
    height: 20,
    overflow: "hidden",
  },
  invitaFamiliares: {
    marginLeft: -85,
    top: 78,
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
    fontFamily: FontFamily.lato,
    left: "50%",
    position: "absolute",
    color: Color.negro,
  },
  signIn: {
    fontSize: FontSize.size_base,
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.lato,
    flex: 1,
  },
  button: {
    top: 221,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.grisClaro,
    justifyContent: "center",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    left: 20,
    position: "absolute",
    width: "90%",
  },
  iconlylightOutlinesearch: {
    width: 20,
    height: 20,
  },
  search: {
    fontSize: FontSize.size_sm,
    letterSpacing: 0,
    lineHeight: 21,
    fontWeight: "500",
    fontFamily: FontFamily.nunito,
  },
  placeholderInput: {
    marginLeft: 6,
    flexDirection: "row",
    flex: 1,
  },
  searchBar: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    height: 50,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: Padding.p_5xs,
    flex: 1,
  },
  frameContainerOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  frameContainerBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  iconlylightsendCopy: {
    width: 24,
    height: 24,
  },
  iconlylightsendCopyWrapper: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.backgroundGreyBackground,
    padding: Padding.p_7xs,
    marginLeft: 16,
    flexDirection: "row",
  },
  header: {
    top: 127,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_xs,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.white,
  },
  navigationIcon: {
    top: 821,
    left: 0,
    height: 105,
  },
  checkbox: {
    borderRadius: 10,
  },
});

export default BOTONInvitarAmigos1;
