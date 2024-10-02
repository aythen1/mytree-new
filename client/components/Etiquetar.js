import * as React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize, Color, Padding, Border } from "../GlobalStyles";
import Checkbox from "./Checkbox";
import { useSelector } from "react-redux";
import reactotron from "reactotron-react-native";
import filterFriendsFamily from "../screens/utils/arrayUsuarios";

const Etiquetar = ({
  onClose,
  taggedUsers,
  setTaggedUsers,
  invites,
  invitado,
}) => {
  const { allUsers, userData } = useSelector((state) => state.users);

  const [friends, setFriends] = React.useState([]);
  const [family, setFamily] = React.useState([]);

  React.useEffect(() => {
    const { friends, family } = filterFriendsFamily(userData);
    setFriends(friends);
    setFamily(family);
  }, []);

  const handleToggleTag = (userId) => {
    console.log(taggedUsers, "otro");
    const filter = taggedUsers.filter((u) => u?.id === userId?.id);
    if (filter[0]) {
      const newArray = taggedUsers.filter((u) => u.id !== userId?.id);
      setTaggedUsers(newArray);
    } else {
      setTaggedUsers([...taggedUsers, userId]);
    }
  };

  console.log("dataaa", invites);

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: Color.white,
        borderTopRightRadius: Border.br_11xl,
        borderTopLeftRadius: Border.br_11xl,
        bottom: 0,
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderWidth: 1,
        borderColor: Color.primario1,
      }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        {invites && (
          <View style={{ paddingBottom: invitado ? 30 : 0 }}>
            <View style={{ alignSelf: "flex-start", alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "500",
                  color: Color.colorGray_200,
                  textAlign: "left",
                  lineHeight: 19,
                  letterSpacing: 0,
                  fontFamily: FontFamily.lato,
                  fontSize: FontSize.size_base,
                }}
              >
                Invitados
              </Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                maxHeight: 100,
                borderColor: Color.secundario,
                borderTopWidth: 1,
                overflow: "hidden",
                marginTop: 5,
              }}
              contentContainerStyle={{
                width: "100%",
                alignItems: "center",
              }}
            >
              {invites.length === 0 && (
                <Text
                  style={{
                    color: "#000",
                    marginTop: 15,
                    fontSize: 16,
                    alignSelf: "center",
                    fontWeight: 400,
                  }}
                >
                  ¡Aún no tienes ningún contacto agregado a amigos!
                </Text>
              )}
              {invites.length > 0 &&
                invites.map((friendMember, index) => (
                  <View
                    key={-index}
                    style={{
                      marginTop: 15,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{ width: 30, height: 30, borderRadius: 50 }}
                        contentFit="cover"
                        source={
                          friendMember.user.profilePicture
                            ? { uri: friendMember.user.profilePicture }
                            : require("../assets/frame-1547754875.png")
                        }
                      />
                      <Text
                        style={{
                          fontWeight: "700",
                          color: Color.grisDiscord,
                          textAlign: "justify",
                          marginLeft: 13,
                          lineHeight: 19,
                          letterSpacing: 0,
                          fontFamily: FontFamily.lato,
                          fontSize: FontSize.size_base,
                        }}
                      >
                        {friendMember.user?.username +
                          " " +
                          friendMember.user?.apellido}
                      </Text>
                    </View>
                    <Text>
                      {friendMember.status === "pending"
                        ? "pendiente"
                        : friendMember.status === "accepted"
                          ? "aceptó"
                          : friendMember.status === "rejected"
                            ? "rechazó"
                            : ""}
                    </Text>
                  </View>
                ))}
            </ScrollView>
          </View>
        )}
        {!invitado && (
          <View style={{ width: "100%" }}>
            <View
              style={{
                alignSelf: "flex-start",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: Color.colorGray_200,
                  textAlign: "left",
                  lineHeight: 19,
                  letterSpacing: 0,
                  fontFamily: FontFamily.lato,
                  fontSize: FontSize.size_base,
                  paddingTop: 12,
                  width: "100%",
                }}
              >
                Amigos
              </Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                maxHeight: 100,
                borderColor: Color.secundario,
                borderTopWidth: 1,
                overflow: "hidden",
                flexGrow: 1,
                marginTop: 5,
              }}
              contentContainerStyle={{
                width: "100%",
                alignItems: "center",
              }}
            >
              {friends.length === 0 && (
                <Text
                  style={{
                    color: "#000",
                    marginTop: 15,
                    fontSize: 16,
                    alignSelf: "center",
                    fontWeight: 400,
                  }}
                >
                  ¡Aún no tienes ningún contacto agregado a amigos!
                </Text>
              )}
              {friends.length > 0 &&
                friends.map((friendMember, index) => {
                  const is = invites?.find(
                    (a) => a.userId === friendMember?.id,
                  );
                  if (!is)
                    return (
                      <View
                        key={-index}
                        style={{
                          marginTop: 15,
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Image
                            style={{ width: 30, height: 30, borderRadius: 50 }}
                            contentFit="cover"
                            source={
                              friendMember.profilePicture
                                ? { uri: friendMember.profilePicture }
                                : require("../assets/logoo.png")
                            }
                          />
                          <Text
                            style={{
                              fontWeight: "700",
                              color: Color.grisDiscord,
                              textAlign: "justify",
                              marginLeft: 13,
                              lineHeight: 19,
                              letterSpacing: 0,
                              fontFamily: FontFamily.lato,
                              fontSize: FontSize.size_base,
                            }}
                          >
                            {friendMember?.username +
                              " " +
                              friendMember?.apellido}
                          </Text>
                        </View>
                        <Checkbox
                          checked={taggedUsers.find(
                            (u) => u.id === friendMember.id,
                          )}
                          setChecked={() => handleToggleTag(friendMember)}
                        />
                      </View>
                    );
                })}
            </ScrollView>
          </View>
        )}

        {!invitado && (
          <View style={{ width: "100%" }}>
            <View
              style={{
                alignSelf: "flex-start",
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: Color.colorGray_200,
                  textAlign: "left",
                  letterSpacing: 0,
                  fontFamily: FontFamily.lato,
                  fontSize: FontSize.size_base,
                  paddingTop: 12,
                }}
              >
                Familia
              </Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                minHeight: 150,
                maxHeight: 150,
                borderColor: Color.secundario,
                borderTopWidth: 1,
                overflow: "hidden",
                flexGrow: 1,
                marginTop: 5,
              }}
              contentContainerStyle={{
                width: "100%",
                alignItems: "center",
              }}
            >
              {family.length === 0 && (
                <Text
                  style={{
                    color: "#000",
                    marginTop: 15,
                    fontSize: 16,
                    alignSelf: "center",
                    fontWeight: 400,
                  }}
                >
                  ¡Aún no tienes ningún contacto agregado a familiares!
                </Text>
              )}
              {family.length > 0 &&
                family.map((familyMember, index) => {
                  const is = invites?.find((a) => a.userId === familyMember.id);
                  if (!is)
                    return (
                      <View
                        key={index}
                        style={{
                          marginTop: 15,
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Image
                            style={{ width: 30, height: 30, borderRadius: 50 }}
                            contentFit="cover"
                            source={
                              familyMember?.profilePicture
                                ? { uri: familyMember?.profilePicture }
                                : require("../assets/logoo.png")
                            }
                          />
                          <Text
                            style={{
                              fontWeight: "700",
                              color: Color.grisDiscord,
                              textAlign: "justify",
                              marginLeft: 13,
                              lineHeight: 19,
                              letterSpacing: 0,
                              fontFamily: FontFamily.lato,
                              fontSize: FontSize.size_base,
                            }}
                          >
                            {familyMember?.username +
                              " " +
                              familyMember?.apellido}
                          </Text>
                        </View>
                        <Checkbox
                          checked={taggedUsers.find(
                            (u) => u.id === familyMember.id,
                          )}
                          setChecked={() => handleToggleTag(familyMember)}
                        />
                      </View>
                    );
                })}
            </ScrollView>
          </View>
        )}
        {!invitado && (
          <TouchableOpacity style={{ marginTop: 40 }} onPress={onClose}>
            <LinearGradient
              style={{
                justifyContent: "center",
                paddingHorizontal: Padding.p_5xl,
                paddingVertical: Padding.p_sm,
                backgroundColor: Color.linearBoton,
                width: "100%",
                flexDirection: "row",
                borderRadius: Border.br_11xl,
              }}
              locations={[0, 1]}
              colors={["#7ec18c", "#dee274"]}
              start={{ x: 0, y: 0 }} // Inicio del gradiente (izquierda)
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={{
                  flex: 1,
                  letterSpacing: 1,
                  lineHeight: 24,
                  color: Color.white,
                  textAlign: "center",
                  fontFamily: FontFamily.lato,
                  fontSize: FontSize.size_base,
                }}
              >
                Aceptar
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Etiquetar;
