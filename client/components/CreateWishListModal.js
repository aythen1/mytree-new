import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize, Color, Padding, Border } from "../GlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import axiosInstance from "../apiBackend";
import { useSelector } from "react-redux";

const CreateWishListModal = ({
  onClose,
  wishList,
  setWishList,
  invitado,
  event,
  setEvent,
}) => {
  const { allUsers, userData } = useSelector((state) => state.users);

  const [wish, setWish] = React.useState("");
  console.log(wishList, "lsitaaaaa");
  const handleAddWish = () => {
    if (!wishList.includes(wish.toLowerCase())) {
      setWishList([...wishList, wish]);
      setWish("");
    }
  };

  const handleRemoveWish = (name) => {
    if (wishList.includes(name)) {
      const newWishList = wishList.filter((wish) => wish !== name);
      setWishList(newWishList);
    }
  };

  const handleTake = async (id) => {
    await axiosInstance
      .put(`events/wishlist/${id}/take`, { userId: userData.id })
      .then(() => handleGetEvent());
  };

  const handleGetEvent = async () => {
    const res = await axiosInstance.get(`/events/${event?.id}`);
    // console.log(res.data, "datitaa", event_wishList);
    setWishList(res?.data?.wishListItems);
    setEvent(res?.data);
  };

  return (
    <View
      style={{
        width: "100%",
        height: 400,
        backgroundColor: Color.white,
        borderTopRightRadius: Border.br_11xl,
        borderTopLeftRadius: Border.br_11xl,
        position: "absolute",
        bottom: 0,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: Color.primario1,
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
            Lista de deseos
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
        {wishList.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: invitado ? "100%" : 135,
              maxHeight: invitado ? "100%" : 150,
              overflow: "hidden",
              flexGrow: 1,
              marginTop: 5,
              marginBottom: 10,
            }}
            contentContainerStyle={{
              width: "100%",
              alignItems: "center",
              paddingBottom: invitado ? 100 : 0,
            }}
          >
            {wishList &&
              wishList.map((wish, index) => (
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
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {!invitado && (
                      <Pressable onPress={() => handleRemoveWish(wish)}>
                        <AntDesign name="close" size={22} color={"#404040"} />
                      </Pressable>
                    )}

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
                      {typeof wish !== "object" ? wish : wish.description}
                    </Text>
                  </View>
                  {!wish.takenBy ? (
                    <TouchableOpacity
                      onPress={() => handleTake(wish.id)}
                      style={{
                        backgroundColor: Color.colorGainsboro_100,
                        padding: 5,
                        paddingHorizontal: 8,
                        borderRadius: 50,
                      }}
                    >
                      <Text style={{ fontSize: 15, color: "gray" }}>tomar</Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Image
                        style={{ width: 26, height: 26, borderRadius: 50 }}
                        source={
                          allUsers.find((u) => u.id === wish.takenBy)
                            .profilePicture
                            ? {
                                uri: allUsers.find((u) => u.id === wish.takenBy)
                                  .profilePicture,
                              }
                            : require("../assets/logoo.png")
                        }
                      ></Image>
                      <Text style={{ fontSize: 14, maxWidth: 200 }}>
                        {allUsers.find((u) => u.id === wish.takenBy).username}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
          </ScrollView>
        ) : (
          <View
            style={{ height: 150, width: "100%", justifyContent: "center" }}
          >
            <Text
              style={{
                color: "#404040",
                textAlign: "center",
                fontFamily: FontFamily.lato,
                fontSize: 14,
                width: "100%",
              }}
            >
              ¡Aún no has agregado ningún deseo a tu lista!
            </Text>
          </View>
        )}
      </View>
      {!invitado && (
        <View>
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

          <TextInput
            value={wish}
            onChangeText={(text) => setWish(text)}
            style={{
              paddingVertical: Padding.p_smi,
              backgroundColor: Color.fAFAFA,
              borderRadius: Border.br_3xs,
              paddingHorizontal: Padding.p_xl,
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              marginTop: 10,
            }}
            placeholder="Ingresa tu deseo"
          />

          <TouchableOpacity
            disabled={wish.length === 0}
            style={{ marginTop: 10 }}
            onPress={handleAddWish}
          >
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
              colors={["#dee274", "#7ec18c"]}
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
                Agregar deseo
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 10 }} onPress={onClose}>
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
              colors={["#dee274", "#7ec18c"]}
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
      )}
    </View>
  );
};

export default CreateWishListModal;
