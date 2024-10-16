import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Modal,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import ETIQUETADO from "../../components/ETIQUETADO";
import {
  Color,
  FontFamily,
  FontSize,
  Padding,
  Border,
} from "../../GlobalStyles";
import HeaderIcons from "../../components/HeaderIcons";
import CalendarMuroSVG from "../../components/svgs/CalendarMuroSVG";
import BookSVG from "../../components/svgs/BookSVG";
import SettingMuroSVG from "../../components/svgs/SettingMuroSVG";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotificationById,
  getAllNotifications,
  getAllUserNotifications,
} from "../../redux/actions/notifications";
import { Context } from "../../context/Context";
import { getAllUsers, getUserData, updateUser } from "../../redux/actions/user";
import TopBar from "../../components/TopBar";
import axiosInstance from "../../apiBackend";
import relacionIngles from "../../utils/relationshipTraduccion";
import { getAllPosts } from "../../redux/actions/posts";

const PERFILNOTIFICACIONES = () => {
  const { formatDate } = useContext(Context);
  const { allUsers, userData } = useSelector((state) => state.users);
  const { allNotifications, userNotifications } = useSelector(
    (state) => state.notifications,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState({});

  useEffect(() => {
    dispatch(getAllUserNotifications(userData?.id));
  }, []);

  const handleAcceptFamilyOrFriendRequest = async (
    notificationId,
    senderId,
    receiverId,
    requestType,
    relationship,
  ) => {
    if (requestType === "family request") {
      await axiosInstance
        .post(`user/${userData.id}/relation/${senderId}`, { relationship })
        .then(() => {
          dispatch(deleteNotificationById(notificationId)).then(() => {
            dispatch(getAllUserNotifications(userData?.id));

            dispatch(getUserData(userData?.id));
            dispatch(getAllPosts(userData?.id));
          });
        });
    }
    if (requestType === "friend request") {
      await axiosInstance
        .post(`user/${userData.id}/relation/${senderId}`, { relationship })
        .then(() => {
          dispatch(deleteNotificationById(notificationId)).then(() => {
            dispatch(getAllUserNotifications(userData?.id));

            dispatch(getUserData(userData?.id));
            dispatch(getAllPosts(userData?.id));
          });
        });
    }
    dispatch(getAllNotifications());
    dispatch(getAllUsers());
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.perfilNotificaciones}>
        <>
          <View style={styles.frameViewFlexBox}>
            <TopBar screen={"notificaciones"}></TopBar>
          </View>
          <View style={[styles.notificacionesWrapper, styles.frameViewFlexBox]}>
            <Text style={styles.notificaciones}>Notificaciones</Text>
          </View>
        </>
        <View style={styles.frameContainer}>
          {/* =============== NOTIFICATIONS RENDERED =============== */}
          {userNotifications.length > 0 ? (
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {userNotifications &&
                userNotifications?.map((notification, index) => (
                  <Pressable
                    onPress={async () => {
                      if (
                        notification.type === "friend request" ||
                        notification.type === "family request"
                      ) {
                        setShowInvitationModal(true);
                      }
                      await setSelectedNotification(notification);
                    }}
                    key={index}
                  >
                    <View style={[styles.frameView, styles.frameViewFlexBox]}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flex: 1,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                            flex: 1,
                          }}
                        >
                          <Image
                            style={styles.frameChild}
                            contentFit="cover"
                            source={
                              notification?.user?.profilePicture
                                ? { uri: notification?.user?.profilePicture }
                                : require("../../assets/logoo.png")
                            }
                          />
                          <Text style={styles.hasRecibidoUnaLayout}>
                            <Text style={styles.brunoTeHaContainer1}>
                              <Text style={styles.bruno}>
                                {notification.user.username}{" "}
                                {notification.user.apellido + " "}
                              </Text>
                              <Text style={styles.teHaInvitadoTypo}>
                                {notification.message + " "}
                              </Text>
                              <Text
                                style={{
                                  ...styles.teHaInvitadoTypo,
                                  color: "gray",
                                }}
                              >
                                {relacionIngles(notification?.relationship)}
                              </Text>
                            </Text>
                          </Text>
                        </View>
                        {notification?.post && (
                          <Image
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 10,
                              marginLeft: "3%",
                              marginBottom: "1%",
                            }}
                            source={{
                              uri: notification?.post?.photos[0],
                            }}
                          ></Image>
                        )}
                      </View>
                    </View>
                    <Text
                      style={{
                        alignSelf: "flex-end",
                        fontSize: 10,
                        color: "gray",
                      }}
                    >
                      {formatDate(
                        notification.createdAt,
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                      )}
                    </Text>
                    <Image
                      style={styles.frameItem}
                      contentFit="cover"
                      source={require("../../assets/line-78.png")}
                    />
                  </Pressable>
                ))}
            </ScrollView>
          ) : (
            <Text
              style={{
                color: "#000",
                marginTop: 40,
                fontSize: 16,
                alignSelf: "center",
                fontWeight: 400,
              }}
            >
              ¡No tienes ninguna notificación!
            </Text>
          )}
        </View>
      </View>

      <Modal animationType="fade" transparent visible={showInvitationModal}>
        <View style={styles.frameContainer15Overlay}>
          <Pressable
            style={styles.frameContainer15Bg}
            onPress={() => setShowInvitationModal(false)}
          />
          <ETIQUETADO
            message={selectedNotification?.message || ""}
            acceptHandler={() => {
              handleAcceptFamilyOrFriendRequest(
                selectedNotification.id,
                selectedNotification.senderId,
                selectedNotification.receiverId,
                selectedNotification.type,
                selectedNotification.relationship,
              );
              setShowInvitationModal(false);
            }}
            cancelHandler={() => {
              dispatch(deleteNotificationById(selectedNotification.id)).then(
                () => {
                  dispatch(getAllUserNotifications(userData?.id));
                },
              );
              setShowInvitationModal(false);
            }}
            onClose={() => setShowInvitationModal(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationIconLayout: {
    width: "100%",
  },
  frameParentPosition: {
    left: 0,
    top: 0,
  },
  frameGroupShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    backgroundColor: Color.white,
  },
  documentIconLayout: {
    marginLeft: 30,
    height: 24,
    width: 24,
  },
  frameViewFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  teHaInvitadoTypo: {
    fontWeight: "300",
    fontFamily: FontFamily.lato,
  },
  perfilNotificacionesChild: {
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowRadius: 25,
    elevation: 25,
    height: 113,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    backgroundColor: Color.white,
    left: 0,
    top: 0,
  },
  image6Icon: {
    width: 87,
    height: 55,
  },
  iconlylightOutlinecalendar: {
    height: 24,
    width: 24,
  },
  documentIcon: {
    overflow: "hidden",
  },
  icon: {
    height: "100%",
    width: "100%",
  },

  notificaciones: {
    fontSize: FontSize.size_5xl,
    color: Color.negro,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "700",
  },
  notificacionesWrapper: {
    justifyContent: "center",
    marginTop: 6,
  },
  frameGroup: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 4,
    elevation: 4,
    paddingBottom: Padding.p_xl,
    paddingHorizontal: Padding.p_xl,
  },
  frameContainer5Overlay: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  frameContainer5Bg: {
    // position: 'absolute',
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  frameChild: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 50,
  },
  bruno: {
    fontFamily: FontFamily.lato,
    fontWeight: "700",
  },
  brunoTeHaContainer1: {
    width: "100%",
  },
  hasRecibidoUnaLayout: {
    maxWidth: "80%",
    color: Color.black1,
    lineHeight: 19,
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    textAlign: "left",
    alignItems: "center",
  },
  minAgo: {
    fontSize: FontSize.size_xs,
    lineHeight: 18,
    color: Color.gris,
    textAlign: "justify",
    letterSpacing: 0,
    fontFamily: FontFamily.lato,
    top: 30,
  },
  frameView: {
    justifyContent: "space-between",
    flex: 1,
  },
  frameItem: {
    maxHeight: "100%",
    marginTop: 20,
    width: "100%",
  },
  frameParent1: {
    marginTop: 20,
  },
  frameContainer11Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  frameContainer11Bg: {
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  hasRecibidoUna: {
    width: 273,
    display: "flex",
    color: Color.black1,
    lineHeight: 19,
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    textAlign: "left",
    alignItems: "center",
  },
  frameContainer15Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  frameContainer15Bg: {
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  frameChild17: {
    height: 0,
    marginTop: 20,
    width: "100%",
  },
  frameContainer: {
    flex: 1,
    paddingVertical: 0,
    paddingTop: 23,
    paddingHorizontal: Padding.p_xl,
  },
  frameParent: {
    top: 0,
  },
  perfilNotificaciones: {
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default PERFILNOTIFICACIONES;
