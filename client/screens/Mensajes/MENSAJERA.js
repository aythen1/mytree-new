import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import { Image } from "expo-image";
import ButtonsMensajeria from "../../components/ButtonsMensajeria";
import BarraBusqueda from "../../components/BarraBusqueda";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../../context/Context";
import ChatCard from "./ChatCard";
import { useDispatch, useSelector } from "react-redux";
import { isLoading } from "expo-font";
import axiosInstance from "../../apiBackend";
import TopBar from "../../components/TopBar";
import { setScreen } from "../../redux/slices/user.slices";
import { chatGroups, getUserChats } from "../../redux/actions/chat";
import filterFriendsFamily from "../utils/arrayUsuarios";

const MENSAJERA = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [userChats, setUserChats] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  const {
    allMessages,
    groups,
    allChats,
    userChats: Chaats,
  } = useSelector((state) => state.chats);

  useEffect(() => {
    dispatch(getUserChats(userData?.id)).then((e) => {
      setUserChats(e.payload.data);
      dispatch(chatGroups(userData?.id)).then((a) => {
        console.log(a.payload, "PAY");
        const all = [...a.payload];
        setUserChats(all.concat(e.payload.data));
        setUserGroups(a.payload);
      });
    });
  }, []);

  const { allUsers, userData: usuario } = useSelector((state) => state.users);
  const { usersWithMessages, userData, getUsersMessages } = useContext(Context);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useFocusEffect(() => {
    dispatch(setScreen("Mensajería"));
  });

  const filterUsers = () => {
    // dispatch(getUserChats(userData?.id));

    setLoading(true);
    console.log("entra");
    const { family, friends } = filterFriendsFamily(userData);
    console.log(family, friends, "entra");
    const friendIds = friends.flatMap((friend) =>
      friend.id ? [friend.id] : friend,
    ); // Asegúrate de obtener los IDs de `friends`
    const familyIds = family.flatMap((family) =>
      family.id ? [family.id] : family,
    ); // Asegúrate de obtener los IDs de `friends`
    switch (selectedFilter) {
      case "All":
        setLoading(false);
        const nww = [...Chaats];
        setUserChats(userGroups.concat(nww));

        break;
      case "Friends":
        const chats = Chaats.filter((c) => {
          const user = c.userA.id === userData.id ? c.userB : c.userA;

          // Comprueba si el ID del usuario está en el array de friends
          if (friendIds.includes(user.id)) {
            return c; // Mantén el chat en el filtrado si el ID está en `friends`
          }
        });

        console.log(chats, "entra");
        setUserChats(chats);
        setLoading(false);
        break;
      case "Family":
        const chatsFamily = Chaats.filter((c) => {
          const user = c.userA.id === userData.id ? c.userB : c.userA;

          // Comprueba si el ID del usuario está en el array de friends
          if (familyIds.includes(user.id)) {
            return c; // Mantén el chat en el filtrado si el ID está en `friends`
          }
        });

        console.log(chats, "entra");
        setUserChats(chatsFamily);
        setLoading(false);
        break;
      case "Groups":
        console.log(chats, "entra");
        setUserChats(groups);
        setLoading(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    filterUsers();
  }, [selectedFilter]);

  return (
    <LinearGradient
      colors={["#fff", "#f1f1f1"]}
      style={{ flex: 1, paddingBottom: 70 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View
        style={{
          paddingBottom: 20,
          backgroundColor: "#fff",
          shadowOpacity: 1,
          elevation: 5,
          shadowRadius: 15,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          shadowColor: "black",
        }}
      >
        <TopBar screen={"mensajes"}></TopBar>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            paddingHorizontal: Dimensions.get("screen").width * 0.05,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              style={{ height: 20, width: 20 }}
              contentFit="cover"
              source={require("../../assets/back.png")}
            />
          </Pressable>
          <Text
            style={{
              fontSize: FontSize.size_5xl,
              color: Color.negro,
              textAlign: "left",
              fontFamily: FontFamily.lato,
              fontWeight: "700",
            }}
          >
            Mensajes / Grupos
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <BarraBusqueda
            search={search}
            setSearch={setSearch}
            navigate={navigation.navigate}
            route="CrearGrupo"
          />
        </View>
        <ButtonsMensajeria
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </View>
      {/* ========================== MENSAJES ======================= */}
      {loading ? (
        <ActivityIndicator
          style={{
            backgroundColor: "transparent",
            alignSelf: "center",
            marginTop: "20%",
          }}
          animating={true}
          size="xlarge"
          color={"#B7E4C0"}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10,
          }}
        >
          {search !== "" && userChats.length > 0
            ? userChats?.map((user, i) => {
                if (user?.groupName) {
                  return (
                    <ChatCard
                      key={i}
                      name={user?.groupName}
                      selectedUserId={user.id}
                      isGroup={true}
                      userInfo={user}
                    />
                  );
                } else {
                  let usuario;
                  if (user?.userA?.id === userData?.id) {
                    usuario = { ...user?.userB };
                  } else {
                    usuario = { ...user?.userA };
                  }

                  return (
                    <ChatCard
                      key={i}
                      usuario={usuario}
                      name={usuario?.username + " " + usuario?.apellido}
                      selectedUserId={usuario?.id}
                      isGroup={false}
                      userInfo={user}
                    />
                  );
                }
              })
            : search !== "" &&
              userChats.length === 0 && (
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    paddingTop: 50,
                  }}
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: 500, color: "#202020" }}
                  >
                    No se han encontrado resultados!
                  </Text>
                </View>
              )}
          {search === "" && userChats.length > 0
            ? userChats?.map((user, i) => {
                if (user?.groupName) {
                  return (
                    <ChatCard
                      key={i}
                      name={user?.groupName}
                      selectedUserId={user.id}
                      isGroup={true}
                      userInfo={user}
                    />
                  );
                } else {
                  let usuario;
                  if (user?.userA?.id === userData?.id) {
                    usuario = { ...user?.userB };
                  } else {
                    usuario = { ...user?.userA };
                  }
                  console.log(usuario, "card");
                  return (
                    <ChatCard
                      key={i}
                      usuario={usuario}
                      name={usuario?.username + " " + usuario?.apellido}
                      selectedUserId={usuario?.id}
                      isGroup={false}
                      userInfo={user}
                    />
                  );
                }
              })
            : search === "" &&
              userChats.length < 1 && (
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    paddingTop: 50,
                  }}
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: 500, color: "#202020" }}
                  >
                    ¡Aún no tienes chats, inicia una conversación!
                  </Text>
                </View>
              )}
        </ScrollView>
      )}
    </LinearGradient>
  );
};

export default MENSAJERA;
