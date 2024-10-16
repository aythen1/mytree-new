import * as React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize, Color, Padding, Border } from "../GlobalStyles";
import Checkbox from "./Checkbox";
import { useSelector } from "react-redux";

const AddGroupMembersModal = ({ onClose, taggedUsers, setTaggedUsers }) => {
  const { allUsers, userData } = useSelector((state) => state.users);

  const handleToggleTag = (userId) => {
    if (taggedUsers.includes(userId.toString())) {
      const newArray = taggedUsers.filter(
        (id) => id.toString() !== userId.toString(),
      );
      setTaggedUsers(newArray);
    } else {
      setTaggedUsers([...taggedUsers, userId.toString()]);
    }
  };

  const userFamily =
    allUsers.filter((user) => user.id === userData.id)[0]?.familyIds || [];
  const userFriends =
    allUsers.filter((user) => user.id === userData.id)[0]?.friendsIds || [];

  return (
    <View
      style={{
        width: "100%",
        height: 510,
        backgroundColor: Color.white,
        borderTopRightRadius: Border.br_11xl,
        borderTopLeftRadius: Border.br_11xl,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: Color.primario1,
        position: "absolute",
        bottom: 0,
        paddingHorizontal: 30,
      }}
    >
      <View
        style={{
          top: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
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
            Amigos
          </Text>
        </View>
        <View
          style={{
            borderColor: Color.secundario,
            borderTopWidth: 1,
            width: "100%",
            height: 1,
            marginTop: 15,
            borderStyle: "solid",
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            maxHeight: 150,
            overflow: "hidden",
            flexGrow: 1,
            marginTop: 5,
          }}
          contentContainerStyle={{
            width: "100%",
            alignItems: "center",
          }}
        >
          {userFamily.length > 0 &&
            userFamily.map((familyMember, index) => {
              if (true)
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
                          allUsers.filter(
                            (user) => user.id.toString() === familyMember,
                          )[0]?.profilePicture
                            ? allUsers.filter(
                                (user) => user.id.toString() === familyMember,
                              )[0]?.profilePicture
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
                        {allUsers.filter(
                          (user) => user.id.toString() === familyMember,
                        )[0]?.username +
                          " " +
                          allUsers.filter(
                            (user) => user.id.toString() === familyMember,
                          )[0]?.apellido}
                      </Text>
                    </View>
                    <Checkbox
                      checked={taggedUsers.includes(familyMember.toString())}
                      setChecked={() =>
                        handleToggleTag(familyMember.toString())
                      }
                    />
                  </View>
                );
            })}
        </ScrollView>

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
              lineHeight: 19,
              letterSpacing: 0,
              fontFamily: FontFamily.lato,
              fontSize: FontSize.size_base,
            }}
          >
            Familia
          </Text>
        </View>
        <View
          style={{
            borderColor: Color.secundario,
            borderTopWidth: 1,
            width: "100%",
            height: 1,
            marginTop: 15,
            borderStyle: "solid",
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            maxHeight: 150,
            overflow: "hidden",
            flexGrow: 1,
            marginTop: 5,
          }}
          contentContainerStyle={{
            width: "100%",
            alignItems: "center",
          }}
        >
          {userFriends.length > 0 &&
            userFriends.map((friendMember, index) => {
              if (true)
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
                          allUsers.filter(
                            (user) => user.id.toString() === friendMember,
                          )[0]?.profilePicture
                            ? allUsers.filter(
                                (user) => user.id.toString() === friendMember,
                              )[0]?.profilePicture
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
                        {allUsers.filter(
                          (user) => user.id.toString() === friendMember,
                        )[0]?.username +
                          " " +
                          allUsers.filter(
                            (user) => user.id.toString() === friendMember,
                          )[0]?.apellido}
                      </Text>
                    </View>
                    <Checkbox
                      checked={taggedUsers.includes(friendMember.toString())}
                      setChecked={() =>
                        handleToggleTag(friendMember.toString())
                      }
                    />
                  </View>
                );
            })}
        </ScrollView>
      </View>
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
    </View>
  );
};

export default AddGroupMembersModal;
