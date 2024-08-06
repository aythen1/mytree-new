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
import { AntDesign } from "@expo/vector-icons";
import axiosInstance from "../../apiBackend";
import { useSelector } from "react-redux";
import styles from "./CreateWishModalStyle";

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
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.alignSelfCenter}>
          <Text style={styles.wishListTitle}>Lista de deseos</Text>
        </View>
        <View style={styles.divider} />
        {wishList.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            {wishList &&
              wishList.map((wish, index) => (
                <View key={-index} style={styles.wishContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {!invitado && (
                      <Pressable onPress={() => handleRemoveWish(wish)}>
                        <AntDesign name="close" size={22} color={"#404040"} />
                      </Pressable>
                    )}
                    <Text style={styles.wishText}>
                      {typeof wish !== "object" ? wish : wish.description}
                    </Text>
                  </View>
                  {!wish.takenBy ? (
                    <TouchableOpacity
                      onPress={() => handleTake(wish.id)}
                      style={styles.takeButton}
                    >
                      <Text style={styles.takeButtonText}>tomar</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.takenByContainer}>
                      <Image
                        style={styles.takenByImage}
                        source={
                          allUsers.find((u) => u.id === wish.takenBy)
                            .profilePicture
                            ? {
                                uri: allUsers.find((u) => u.id === wish.takenBy)
                                  .profilePicture,
                              }
                            : require("../../assets/logoo.png")
                        }
                      />
                      <Text style={styles.takenByText}>
                        {allUsers.find((u) => u.id === wish.takenBy).username}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>
              ¡Aún no has agregado ningún deseo a tu lista!
            </Text>
          </View>
        )}
      </View>
      {!invitado && (
        <View>
          <View style={styles.divider} />
          <TextInput
            value={wish}
            onChangeText={(text) => setWish(text)}
            style={styles.wishInput}
            placeholder="Ingresa tu deseo"
          />
          <TouchableOpacity
            disabled={wish.length === 0}
            style={styles.addButtonContainer}
            onPress={handleAddWish}
          >
            <LinearGradient
              style={styles.gradientButton}
              locations={[0, 1]}
              colors={["#dee274", "#7ec18c"]}
            >
              <Text style={styles.gradientButtonText}>Agregar deseo</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButtonContainer} onPress={onClose}>
            <LinearGradient
              style={styles.gradientButton}
              locations={[0, 1]}
              colors={["#dee274", "#7ec18c"]}
            >
              <Text style={styles.gradientButtonText}>Aceptar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CreateWishListModal;
