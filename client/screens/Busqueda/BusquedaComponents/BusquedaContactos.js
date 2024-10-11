import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontFamily, FontSize, Color } from "../../../GlobalStyles";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import filterFriendsFamily from "../../utils/arrayUsuarios";

const BusquedaContactos = ({ searchOnContacts }) => {
  const { userData, allUsers } = useSelector((state) => state.users);
  const [family, setFamily] = useState(filterFriendsFamily(userData).family);
  const [friends, setFriends] = useState(filterFriendsFamily(userData).friends);
  const navigation = useNavigation();

  const [filteredFamily, setFilteredFamily] = useState(family);
  const [filteredFriends, setFilteredFriends] = useState(friends);

  useEffect(() => {
    const filterContacts = (contacts, search) => {
      return contacts.filter(
        (contact) =>
          contact.username.toLowerCase().includes(search.toLowerCase()) ||
          contact.apellido.toLowerCase().includes(search.toLowerCase()) ||
          contact.email.toLowerCase().includes(search.toLowerCase()),
      );
    };

    if (searchOnContacts !== "") {
      setFilteredFamily(filterContacts(family, searchOnContacts));
      setFilteredFriends(filterContacts(friends, searchOnContacts));
    } else {
      setFilteredFamily(family);
      setFilteredFriends(friends);
    }
  }, [searchOnContacts, family, friends]);

  return (
    <ScrollView
      style={[styles.bsquedaContactos, styles.iconLayout]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.frameParent}>
        <View>
          <View>
            <Text style={[styles.familiares, styles.retosLayout]}>
              Familiares
            </Text>
            <View style={[styles.frameChild, styles.frameChildLayout]} />
          </View>
          <View style={{ marginTop: 15, maxHeight: 100 }}>
            {filteredFamily?.length > 0 ? (
              <ScrollView
                style={{ maxHeight: 100 }}
                contentContainerStyle={{ gap: 5 }}
              >
                {filteredFamily.map((familyMember, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("OtherUserProfile", familyMember)
                      }
                      key={index}
                      style={styles.frameParent1}
                    >
                      <Image
                        style={styles.frameItem}
                        contentFit="cover"
                        source={
                          familyMember?.profilePicture
                            ? { uri: familyMember.profilePicture }
                            : require("../../../assets/frame-1547754875.png")
                        }
                      />
                      <Text
                        numberOfLines={1}
                        style={{
                          color: Color.grisDiscord,
                          textAlign: "justify",
                          marginLeft: 13,
                          fontSize: FontSize.size_base,
                          lineHeight: 19,
                          fontFamily: FontFamily.lato,
                          fontWeight: "700",
                          letterSpacing: 0,
                          width: "80%",
                        }}
                      >
                        {familyMember?.username + " " + familyMember?.apellido}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            ) : (
              <Text
                style={{
                  color: "#000",
                  marginTop: 40,
                  fontSize: 15,
                  alignSelf: "center",
                  fontWeight: 400,
                }}
              >
                {searchOnContacts === ""
                  ? "Aún no tienes ningún contacto agregado a familiares."
                  : "No encontramos resultados para tu búsqueda."}
              </Text>
            )}
          </View>

          <View style={styles.frameParent4}>
            <View>
              <Text style={[styles.familiares, styles.retosLayout]}>
                Amigos
              </Text>
              <View style={[styles.frameChild, styles.frameChildLayout]} />
            </View>
            <View style={{ marginTop: 15, maxHeight: 100 }}>
              {filteredFriends?.length > 0 ? (
                <ScrollView
                  style={{ maxHeight: 100 }}
                  contentContainerStyle={{ gap: 5 }}
                >
                  {filteredFriends.map((friendMember, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("OtherUserProfile", friendMember)
                        }
                        key={index}
                        style={styles.frameParent1}
                      >
                        <Image
                          style={styles.frameItem}
                          contentFit="cover"
                          source={
                            friendMember?.profilePicture
                              ? { uri: friendMember.profilePicture }
                              : require("../../../assets/frame-1547754875.png")
                          }
                        />
                        <Text
                          numberOfLines={1}
                          style={{
                            color: Color.grisDiscord,
                            textAlign: "justify",
                            marginLeft: 13,
                            fontSize: FontSize.size_base,
                            lineHeight: 19,
                            fontFamily: FontFamily.lato,
                            fontWeight: "700",
                            letterSpacing: 0,
                            width: "80%",
                          }}
                        >
                          {friendMember?.username +
                            " " +
                            friendMember?.apellido}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              ) : (
                <Text
                  style={{
                    color: "#000",
                    paddingHorizontal: 15,
                    marginTop: 40,
                    fontSize: 15,
                    alignSelf: "center",
                    fontWeight: 400,
                  }}
                >
                  {searchOnContacts === ""
                    ? "Aún no tienes ningún contacto agregado a familiares."
                    : "No encontramos resultados para tu búsqueda."}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={[styles.frameChild3, styles.frameChildLayout]} />
        <View style={styles.userParent}>
          <Image
            style={styles.userIcon}
            contentFit="cover"
            source={require("../../../assets/3-user1.png")}
          />
          <Text style={[styles.invitaATu, styles.retosTypo]}>
            Invita a tu familia y tu familia elegida, y mantén una conexión
            duradera
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: "100%",
    overflow: "hidden",
  },
  retosTypo: {
    textAlign: "center",
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
  },
  retosLayout: {
    lineHeight: 19,
    letterSpacing: 0,
  },
  frameChildLayout: {
    height: 1,
    width: 310,
    borderTopWidth: 1,
    borderColor: Color.secundario,
    borderStyle: "solid",
  },
  familiares: {
    fontWeight: "500",
    color: Color.colorGray_200,
    fontSize: FontSize.size_base,
    lineHeight: 19,
    fontFamily: FontFamily.lato,
    textAlign: "left",
  },
  frameChild: {
    marginTop: 15,
  },
  frameItem: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  brunoPham: {
    color: Color.grisDiscord,
    textAlign: "justify",
    marginLeft: 13,
    fontSize: FontSize.size_base,
    lineHeight: 19,
    fontFamily: FontFamily.lato,
    fontWeight: "700",
  },
  frameParent1: {
    alignItems: "center",
    flexDirection: "row",
  },
  frameParent2: {
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  frameView: {
    marginTop: 15,
  },
  frameParent4: {
    marginTop: 30,
  },
  frameChild3: {
    marginTop: 30,
  },
  userIcon: {
    width: 82,
    height: 57,
    overflow: "hidden",
  },
  invitaATu: {
    color: Color.colorDarkgray_100,
    marginTop: 30,
  },
  userParent: {
    marginTop: 30,
    alignItems: "center",
    width: "80%",
    right: "5%",
  },
  frameParent: {
    alignItems: "center",
  },
  bsquedaContactos: {
    overflow: "hidden",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});

export default BusquedaContactos;
