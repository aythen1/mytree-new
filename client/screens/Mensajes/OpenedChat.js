import {
  View,
  Text,
  Image,
  StatusBar,
  Pressable,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Context } from "../../context/Context";
import { Color, FontFamily } from "../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import SingleMessage from "./SingleMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  chatGroups,
  emptyAllMessages,
  getChatHistory,
  getChatHistoryGroup,
  getUserChat,
  getUserChats,
  getUserGroupChat,
} from "../../redux/actions/chat";
import {
  setAllChats,
  setAllConversationMessagesToRead,
  setAllMessages,
} from "../../redux/slices/chats.slices";
import axiosInstance from "../../apiBackend";
import Miembros from "../../components/Miembros";

const OpenedChat = ({ route }) => {
  const scrollViewRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { allUsers, userData } = useSelector((state) => state.users);
  const {
    allMessages,
    userChats,
    chat: chat2,
  } = useSelector((state) => state.chats);
  const [selectedUserDetails, setSelectedUserDetails] = useState();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState({});
  const [usuario, setUsuario] = useState({});
  const [showTaggedsModal, setShowTaggedsModal] = useState({});

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {
    joinRoom,
    getUsersMessages,
    roomId,
    leaveRoom,
    sendMessage,
    getTimeFromDate,
  } = useContext(Context);

  const handleSendMessage = () => {
    sendMessage(
      message,
      userData?.id,
      route?.params?.receiverId,
      route?.params.isGroup,
    );
    setMessage();
  };

  const { receiverId } = route?.params;
  useEffect(() => {
    console.log(route?.params, "eeeeeeeeeeee2");

    if (!route.params.isGroup) {
      dispatch(getUserChat({ userA: userData?.id, userB: receiverId })).then(
        async (e) => {
          if (!e.payload) {
            const chatCreate = await axiosInstance.post(`/chat/create`, {
              userAId: userData?.id,
              userBId: receiverId,
            });
            setChat(chatCreate.data.data);
            console.log(chatCreate, "eeeeeeeeeeee22");
            const isGroup = route?.params?.isGroup;
            const chat = chatCreate.data?.data;
            const user =
              chatCreate.data.data.userA.id === userData.id
                ? chatCreate.data.data.userB
                : chatCreate.data.data.userA;
            setUsuario(user);
            console.log(chatCreate.data.data, "eeeeeeeeeeee2");

            joinRoom(chat?.id);
          } else {
            setChat(e?.payload?.data);
            console.log(e, "eeeeeeeeeeee2");
            const isGroup = route?.params?.isGroup;
            const chat = e?.payload?.data;
            const user =
              e?.payload.data.userA.id === userData.id
                ? e?.payload.data.userB
                : e?.payload.data.userA;
            setUsuario(user);
            console.log(e?.payload.data, "eeeeeeeeeeee2");
            const copy = [...chat?.messages];
            const sortedMessages = copy?.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );
            joinRoom(chat?.id);
            dispatch(setAllMessages(sortedMessages));
          }
        },
      );
    } else {
      console.log(receiverId, "demaaaaa");
      dispatch(getUserGroupChat(receiverId)).then((e) => {
        console.log(e, "demaaaaa");
        setChat(e?.payload);
        console.log(e, "eeeeeeeeeeee2");
        const isGroup = route?.params?.isGroup;
        const chat = e?.payload;

        console.log(e?.payload.data, "eeeeeeeeeeee2");
        const copy = [...chat?.messages];
        const sortedMessages = copy?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        joinRoom(chat?.id);
        dispatch(setAllMessages(sortedMessages));
      });
    }

    return () => {
      dispatch(emptyAllMessages());
      leaveRoom(chat?.id);
    };
  }, []);

  // const setAllToRead = async () => {
  //   const messagesToSetReaded = allMessages?.filter(
  //     (message) =>
  //       message.senderId !== userData?.id && message?.isReaded === false,
  //   );

  //   if (messagesToSetReaded.length > 0) {
  //     try {
  //       const promises = messagesToSetReaded.map((message) =>
  //         axiosInstance.put(`chat/readed/${message?.id}`),
  //       );
  //       await Promise.all(promises);
  //       dispatch(setAllConversationMessagesToRead());
  //       getUsersMessages();
  //     } catch (error) {
  //       console.error("Error setting messages to read", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (allMessages && allMessages.length > 0) {
  //     setAllToRead();
  //   }
  // }, [allMessages]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <LinearGradient
      style={{
        flex: 1,
        overflow: "hidden",
        width: "100%",
        paddingBottom: 15,
      }}
      colors={["#41bf63", "#f1f1f1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar
        hidden={false}
        barStyle={"dark-content"}
        backgroundColor="#fff"
      />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 25,
          paddingBottom: 10,
          paddingTop: 10,
          borderColor: "green",
          borderBottomColor: Color.primario1,
          borderBottomWidth: 0.5,
          marginBottom: 2,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              style={{
                width: 9,
                height: 18,
                marginRight: 25,
                marginTop: 2.5,
              }}
              contentFit="cover"
              source={require("../../assets/greenBackArrow.png")}
            />
          </Pressable>

          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "left",
                fontFamily: FontFamily.lato,
                fontSize: 20,
                color: Color.primario1,
                width: Dimensions.get("screen").width / 3,
              }}
              numberOfLines={1}
            >
              {route?.params?.receiverName}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", gap: 23 }}>
          <View
            style={{
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                borderRadius: 5,
                paddingHorizontal: 5,
                paddingVertical: 1,
                backgroundColor: "#d9d9d9",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 7,
                  fontFamily: FontFamily.lato,
                  color: Color.fAFAFA,
                }}
              >
                Pronto
              </Text>
            </View>
            <Image
              style={{
                width: 20,
                height: 20,
              }}
              contentFit="cover"
              source={require("../../assets/graySword.png")}
            />
          </View>
          <Pressable onPress={() => navigation.navigate("CrearEvento")}>
            <Image
              style={{
                width: 20,
                height: 20,
              }}
              contentFit="cover"
              source={require("../../assets/greenCalendar.png")}
            />
          </Pressable>

          <Pressable
            onPress={() => {
              if (!route.params.isGroup) {
                return navigation.navigate("OtherUserProfile", usuario);
              } else {
                setShowTaggedsModal(true);
              }
            }}
          >
            <Image
              style={{
                width: 24,
                height: 24,
                borderRadius: 50,
              }}
              contentFit="cover"
              source={
                usuario?.profilePicture
                  ? { uri: usuario?.profilePicture }
                  : require("../../assets/greenPerson.png")
              }
            />
          </Pressable>
        </View>

        {/* <TouchableOpacity
          style={{
            width: 50,
            alignItems: 'flex-end'
          }}
          onPress={() => setShowOptionsModal(true)}
        >
          <ThreePointsSVG />
        </TouchableOpacity> */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        <View
          style={{
            flexDirection: "column-reverse",
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          {allMessages.length > 0 &&
            allMessages?.map((msg, i) => {
              if (chat2.members) {
                const user = chat2.members.find((m) => m.id === msg?.senderId);
                return (
                  <SingleMessage
                    userex={user}
                    hour={getTimeFromDate(msg.createdAt)}
                    key={i}
                    text={msg?.message}
                    isMy={msg?.senderId.toString() === userData?.id.toString()}
                    read={msg?.isReaded}
                  />
                );
              } else {
                return (
                  <SingleMessage
                    userex={
                      chat2?.userA?.id === userData?.id
                        ? chat2?.userB
                        : chat2?.userA
                    }
                    hour={getTimeFromDate(msg.createdAt)}
                    key={i}
                    text={msg?.message}
                    isMy={msg?.senderId.toString() === userData?.id.toString()}
                    read={msg?.isReaded}
                  />
                );
              }
            })}
        </View>
      </ScrollView>
      <View
        style={{
          marginTop: 15,
          height: 50,
          paddingHorizontal: Dimensions.get("screen").width * 0.025,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#999999"
          style={{
            flex: 1,
            paddingLeft: 13,
            height: "100%",
            maxWidth: "81%",
            fontSize: 16,
            borderRadius: 10,
            color: "#303030",
            backgroundColor: "#f9f9f9",
          }}
        />
        <Pressable
          disabled={message?.length === 0}
          onPress={handleSendMessage}
          style={{ width: 50, height: 50, borderRadius: 100 }}
        >
          <LinearGradient
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              zIndex: 0,
            }}
            locations={[0, 1]}
            colors={["#7ec18c", "#dee274"]}
          >
            <Image
              style={{ width: 26, height: 26 }}
              contentFit="cover"
              source={require("../../assets/paperplanee.png")}
            />
          </LinearGradient>
        </Pressable>
      </View>
      <Modal animationType="fade" transparent visible={showTaggedsModal}>
        <TouchableWithoutFeedback onPress={() => setShowTaggedsModal(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Miembros
              members={chat2.members}
              onClose={() => setShowTaggedsModal(false)}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
};

export default OpenedChat;
