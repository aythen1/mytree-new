import { View, Text, Image, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../apiBackend";
import { Context } from "../../context/Context";
import { getUserData, updateUser } from "../../redux/actions/user";

const ChatCard = ({
  name,
  selectedUserId,
  value,
  userInfo,
  isGroup,
  usuario,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { getTimeFromDate, notReadedMessages, usersWithMessages } =
    useContext(Context);
  const [convMessages, setConvMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState({});
  const [loading, setLoading] = useState(true);

  const { user, allUsers, userData } = useSelector((state) => state.users);

  useEffect(() => {
    setLoading(true);
    getLastMessage();
  }, []);

  const getLastMessage = (messages) => {
    const copy = [...userInfo?.messages];
    const sortedMessages = copy?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    const lastM = sortedMessages.slice(0, 1);
    console.log(lastM, "LAST");
    setLastMessage(lastM[0]);

    setLoading(false);
  };
  console.log(usuario, "ususario");
  return (
    <Pressable
      style={{
        height: 85,
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        backgroundColor: Color.colorWhitesmoke_200,
        flexDirection: "row",
      }}
      onPress={() => {
        navigation.navigate("OpenedChat", {
          receiverId: selectedUserId,
          receiverName: name,
          isGroup,
        });
      }}
    >
      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          if (userData.fixedChat === selectedUserId) {
            dispatch(
              updateUser({ userId: userData.id, userData: { fixedChat: "" } }),
            ).then((res) => dispatch(getUserData(userData.id)));
          } else {
            dispatch(
              updateUser({
                userId: userData.id,
                userData: { fixedChat: selectedUserId },
              }),
            ).then((res) => dispatch(getUserData(userData.id)));
          }
        }}
        style={{ position: "absolute", bottom: 20, right: 15 }}
      >
        <Image
          style={{ width: 16, height: 16, zIndex: 0 }}
          contentFit="cover"
          source={
            userData.fixedChat === selectedUserId
              ? require("../../assets/greenPin.png")
              : require("../../assets/greyPin.png")
          }
        />
      </Pressable>
      {usuario ? (
        <Image
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
            borderRadius: 50,
          }}
          source={{ uri: usuario.profilePicture }}
        ></Image>
      ) : (
        <Image
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
            borderRadius: 50,
          }}
          source={require("../../assets/greenPerson.png")}
        ></Image>
      )}
      <View style={{ marginLeft: 16, flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{
            textAlign: "justify",
            color: Color.primario1,
            fontFamily: FontFamily.lato,
            lineHeight: 19,
            fontSize: FontSize.size_base,
            fontWeight: "700",
            letterSpacing: 0,
            alignSelf: "stretch",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            marginTop: 4,
            color: Color.textTextSecondary,
            textAlign: "left",
            fontFamily: FontFamily.lato,
            letterSpacing: 0,
            alignSelf: "stretch",
            lineHeight: 21,
            fontSize: FontSize.size_sm,
          }}
        >
          {lastMessage?.message
            ? lastMessage?.message?.length >= 20
              ? lastMessage?.message.slice(0, 20).concat("...")
              : lastMessage?.message
            : "Inicia una conversacion!"}
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          alignItems: "flex-end",
          height: 44,
        }}
      >
        <Text
          style={{
            fontWeight: "300",
            lineHeight: 18,
            fontSize: FontSize.size_xs,
            textAlign: "justify",
            fontFamily: FontFamily.lato,
            color: Color.textPlaceholder,
            letterSpacing: 0,
          }}
        >
          {lastMessage ? getTimeFromDate(lastMessage?.createdAt) : ""}
        </Text>
        {notReadedMessages?.some(
          (message) => message.senderId === selectedUserId,
        ) && (
          <View style={{ marginTop: 4, flexDirection: "row" }}>
            <Image
              style={{ width: 23, height: 23, zIndex: 0 }}
              contentFit="cover"
              source={require("../../assets/ellipse-7159.png")}
            />
            <Text
              style={{
                left: 3,
                color: Color.grisHome,
                display: "flex",
                width: 17,
                height: 17,
                alignItems: "center",
                lineHeight: 18,
                fontSize: FontSize.size_xs,
                textAlign: "center",
                fontFamily: FontFamily.lato,
                fontWeight: "700",
                letterSpacing: 0,
                top: 2,
                position: "absolute",
                zIndex: 1,
              }}
            >
              {
                notReadedMessages.filter(
                  (message) => message.senderId === selectedUserId,
                ).length
              }
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default ChatCard;
