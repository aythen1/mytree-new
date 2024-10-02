import React, { useState, useEffect } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";
import ENTRADACREADA from "../components/ENTRADACREADA";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../apiBackend";
import {
  getAllUserEvents,
  getAllUserInvitations,
} from "../redux/actions/events";
import TopBar from "../components/TopBar";

const Invitacin = ({ route }) => {
  const { userEvents: dates, userInvitations } = useSelector(
    (state) => state.events,
  );
  const { userData, allUsers } = useSelector((state) => state.users);

  const [event, setEvent] = useState({});

  const inv = userInvitations.find((e) => e.event.id === event.id);

  console.log(inv, "inv");

  const handleGetEvent = async () => {
    const res = await axiosInstance.get(`/events/${route?.params?.date?.id}`);
    console.log(res.data, "evento");
    setEvent(res.data);
  };

  useEffect(() => {
    handleGetEvent();
  }, [route?.params?.date]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [modalCreate, setModalCreate] = useState(false);

  const onCloseModalCreate = () => {
    setModalCreate(false);
  };

  const handleSubmit = async (text) => {
    await axiosInstance
      .put(`events/invite/${inv.id}/respond`, { response: text })
      .then(() => dispatch(getAllUserInvitations(userData.id)));
  };

  const handleTake = async (id) => {
    await axiosInstance
      .put(`events/wishlist/${id}/take`, { userId: userData.id })
      .then(() => handleGetEvent());
  };

  const handleDelete = async () => {
    await axiosInstance.delete(`events/${event?.id}`).then(() => {
      dispatch(getAllUserEvents(userData.id));
      navigation.goBack();
    });
  };

  return (
    <ScrollView
      style={[styles.invitacin, styles.iconLayout]}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <TopBar screen={"invitacion"}></TopBar>
      <View style={styles.paddingBottom}>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={styles.backParent}>
            <Pressable
              style={styles.calendarIcon}
              onPress={() => navigation.navigate("CALENDARIO")}
            >
              <Image
                style={[styles.icon, styles.iconLayout]}
                contentFit="cover"
                source={require("../assets/back4.png")}
              />
            </Pressable>
            <Text style={[styles.invitacin1, styles.cdigoTypo]}>
              {event.type === "normal" &&
                event.creatorId === userData.id &&
                "Evento"}
              {event.type === "normal" &&
                event.creatorId !== userData.id &&
                "Invitación"}

              {event.type === "special" && "Fecha especial"}
            </Text>
          </View>
          <View style={styles.lineParent}>
            <View style={styles.frameChild} />
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                alignSelf: "center",
              }}
              source={
                event.coverImage
                  ? { uri: event.coverImage }
                  : require("../assets/logoo.png")
              }
            ></Image>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={[styles.tituloDelEvento, styles.cdigoTypo]}>
                {event.title}
              </Text>
            </View>
            <View style={styles.calendarParent}>
              <Image
                style={styles.calendarIcon}
                contentFit="cover"
                source={require("../assets/calendar.png")}
              />
              <View style={styles.deAgostoParent}>
                <Text style={styles.hsTypo}>{event?.date?.slice(0, 10)}</Text>
                {/* <Text style={[styles.hs, styles.hsTypo]}>16:00 hs</Text> */}
              </View>
            </View>
            <View style={styles.iconlybulklocationParent}>
              <Image
                style={styles.iconlybulklocation}
                contentFit="cover"
                source={require("../assets/iconlybulklocation2.png")}
              />
              <Text style={[styles.lugarDelEvento, styles.hsTypo]}>
                {event?.location}
              </Text>
            </View>
            <Text style={[styles.cdigo, styles.cdigoTypo]}>
              {event?.description}
            </Text>
            <Text style={{ ...styles.hsTypo, marginTop: 10 }}>Invitados</Text>
            {event?.invites && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 5,
                  marginTop: 10,
                }}
              >
                {event?.invites &&
                  event?.invites.map((usuario) => {
                    const user = usuario?.user;

                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("OtherUserProfile", user)
                        }
                        style={{}}
                      >
                        <Image
                          style={{ width: 40, height: 40, borderRadius: 50 }}
                          source={
                            user?.profilePicture
                              ? { uri: user?.profilePicture }
                              : require("../assets/logoo.png")
                          }
                        ></Image>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            )}
            <View style={styles.fieldWithTitle}>
              {event?.images &&
                event?.images.map((e) => {
                  return (
                    <Image
                      style={{ width: "48%", height: 100 }}
                      source={{ uri: e }}
                    ></Image>
                  );
                })}
            </View>
          </View>

          {event.creatorId === userData.id && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => handleDelete()}
                style={{
                  ...styles.button,
                  width: "40%",
                  paddingHorizontal: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  backgroundColor: "#F00E0E",
                }}
              >
                <Image
                  contentFit="cover"
                  style={{ width: 22, height: 22, opacity: 0.7 }}
                  source={require("../assets/trashbtnwhite.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => handleDelete()}
                style={{
                  ...styles.button,
                  width: "40%",
                  paddingHorizontal: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  backgroundColor: Color.colorDarkseagreen_100,
                }}
              >
                <Image
                  contentFit="cover"
                  style={{ width: 22, height: 22 }}
                  source={require("../assets/lapizgris.png")}
                />
              </TouchableOpacity>
            </View>
          )}
          {inv?.status === "pending" && (
            <View style={styles.buttonParent}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit("rejected")}
              >
                <View style={[styles.groupParent, styles.parentPosition]}>
                  <Image
                    style={styles.frameItem}
                    contentFit="cover"
                    source={require("../assets/group-70351.png")}
                  />
                  <Text
                    style={[styles.declinoAsistencia, styles.signInSpaceBlock]}
                  >
                    Declino asistencia
                  </Text>
                </View>
              </TouchableOpacity>
              <LinearGradient
                style={styles.button1}
                locations={[0, 1]}
                colors={["#dee274", "#7ec18c"]}
              >
                <TouchableOpacity
                  style={[styles.pressable, styles.pressableLayout]}
                  onPress={() => handleSubmit("accepted")}
                >
                  <View style={[styles.vectorParent, styles.parentPosition]}>
                    <Image
                      style={styles.vectorIcon}
                      contentFit="cover"
                      source={require("../assets/vector33.png")}
                    />
                    <Text style={[styles.signIn, styles.signTypo]}>
                      Confirmo asistencia
                    </Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
          {inv?.status === "pending" && (
            <LinearGradient
              style={styles.button2}
              locations={[0, 1]}
              colors={["#dee274", "#7ec18c"]}
            >
              <Pressable
                style={[styles.pressable1, styles.pressableLayout]}
                onPress={() => navigation.goBack()}
              >
                <Text style={[styles.signIn1, styles.signTypo]}>
                  No estoy aún seguro
                </Text>
              </Pressable>
            </LinearGradient>
          )}
          {(event.creatorId === userData.id || inv?.status === "accepted") && (
            <View style={{ marginTop: 20, gap: 5 }}>
              <Text
                style={{
                  color: Color.gris,
                  fontWeight: "500",
                  lineHeight: 22,
                  fontSize: FontSize.size_lg,
                  textAlign: "left",
                  fontFamily: FontFamily.lato,
                  letterSpacing: 0,
                }}
              >
                {event?.wishListItems.length > 0 && "Lista de deseos"}
              </Text>
              {(event.creatorId === userData.id ||
                inv?.status === "accepted") &&
                event?.wishListItems?.map((e) => {
                  if (e.takenBy) {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontSize: 18 }}>{e.description}</Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <Image
                            style={{ width: 26, height: 26, borderRadius: 50 }}
                            source={{
                              uri: allUsers.find((u) => u.id == e.takenBy)
                                .profilePicture,
                            }}
                          ></Image>
                          <Text style={{ fontSize: 14 }}>
                            {allUsers.find((u) => u.id == e.takenBy).username}
                          </Text>
                        </View>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontSize: 18 }}>{e.description}</Text>
                        {event.creatorId !== userData.id && (
                          <TouchableOpacity
                            onPress={() => handleTake(e.id)}
                            style={{
                              backgroundColor: Color.colorGainsboro_100,
                              padding: 5,
                              paddingHorizontal: 8,
                              borderRadius: 50,
                            }}
                          >
                            <Text style={{ fontSize: 15, color: "gray" }}>
                              tomar
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  }
                })}
            </View>
          )}
        </View>

        <Modal animationType="fade" transparent visible={modalCreate}>
          <View style={styles.buttonContainer2Overlay}>
            <Pressable
              style={styles.buttonContainer2Bg}
              onPress={() => setModalCreate(false)}
            />
            <ENTRADACREADA
              onClose={onCloseModalCreate}
              message={"Asistencia actualizada!"}
              isNavigate={"CALENDARIO"}
            />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: "100%",
  },
  parentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  cdigoTypo: {
    textAlign: "center",
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  hsTypo: {
    lineHeight: 19,
    fontSize: FontSize.size_base,
    textAlign: "center",
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    letterSpacing: 0,
  },
  parentPosition: {
    alignItems: "center",
  },
  signInSpaceBlock: {
    marginLeft: 8,
    lineHeight: 21,
    fontSize: FontSize.footnote_size,
    letterSpacing: 0,
  },
  pressableLayout: {
    backgroundColor: Color.linearBoton,
    width: "100%",
  },
  signTypo: {
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.lato,
  },
  image6Icon: {
    width: 87,
    height: 55,
  },
  image6Wrapper: {},
  frameChild: {
    marginTop: 20,
    paddingTop: 10,
    borderColor: Color.secundario,
    borderTopWidth: 1,
    width: 369,
    height: 1,
    borderStyle: "solid",
    left: 0,
  },
  tituloDelEvento: {
    color: Color.gris,
    fontWeight: "500",
    fontSize: FontSize.size_lg,
    textAlign: "center",
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    width: "100%",
  },
  calendarIcon: {
    width: 24,
    height: 24,
  },
  hs: {
    marginLeft: 35,
  },
  deAgostoParent: {
    marginLeft: 13,
    flexDirection: "row",
  },
  calendarParent: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  iconlybulklocation: {
    width: 21,
    height: 25,
  },
  lugarDelEvento: {
    marginLeft: 8,
  },
  iconlybulklocationParent: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  cdigo: {
    marginTop: 20,
    color: Color.gris,
    fontWeight: "500",
    lineHeight: 22,
    fontSize: FontSize.size_lg,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    left: 0,
  },
  field: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    height: 107,
    width: 388,
  },
  fieldWithTitle: {
    flexDirection: "row",
    marginTop: 20,
    gap: 5,
    flexWrap: "wrap",
  },
  icon: {
    height: "100%",
  },
  invitacin1: {
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    color: Color.primario1,
    marginLeft: 5,
    lineHeight: 24,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  backParent: {
    flexDirection: "row",
  },
  lineParent: {},
  frameItem: {
    width: 12,
    height: 12,
  },
  declinoAsistencia: {
    textAlign: "center",
    marginLeft: 8,
    lineHeight: 21,
    fontSize: FontSize.footnote_size,
    fontFamily: FontFamily.lato,
  },
  groupParent: {
    top: 14,
    flexDirection: "row",
    left: 9,
  },
  button: {
    borderColor: Color.colorKhaki_100,
    borderWidth: 1,
    borderRadius: Border.br_11xl,
    height: 52,
    borderStyle: "solid",
    backgroundColor: Color.white,
    width: "46.5%",
  },
  vectorIcon: {
    width: 18,
    height: 14,
  },
  signIn: {
    marginLeft: 8,
    lineHeight: 21,
    fontSize: FontSize.footnote_size,
    letterSpacing: 0,
    color: Color.white,
  },
  vectorParent: {
    flexDirection: "row",
    top: 14,
  },
  pressable: {
    height: 52,
    left: 6,
  },
  button1: {
    marginLeft: 20,
    height: 52,
    borderRadius: Border.br_11xl,
    alignItems: "center",
    width: "46.5%",
  },
  buttonParent: {
    flexDirection: "row",
    marginTop: 40,
  },
  signIn1: {
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    fontSize: FontSize.size_base,
  },
  pressable1: {
    justifyContent: "center",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    alignItems: "center",
    flexDirection: "row",
  },
  button2: {
    top: "5%",
    borderRadius: Border.br_11xl,
  },
  invitacin: {
    backgroundColor: Color.white,
  },
  paddingBottom: {
    paddingBottom: 90,
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
});

export default Invitacin;
