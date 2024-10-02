import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Share,
  Dimensions,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import EnviarMensajeSVG from "../components/svgs/EnviarMensajeSVG";
import CompartirSVG from "../components/svgs/CompartirSVG";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/actions/posts";
import { getAllCommentsByPostId } from "../redux/actions/comments";
import PagerView from "react-native-pager-view";
import { scaleFont } from "../screens/utils/funcionEscalable";

const Posteo = ({ data, padding }) => {
  const {
    setShowTaggedsModal,
    setShowCommentsModal,
    setSelectedPost,
    setSelectedPostTags,
  } = useContext(Context);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: expanded ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: expanded ? 0 : 300,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [expanded]);

  const [currentPage, setCurrentPage] = useState(0);
  const onShare = async (message) => {
    try {
      const result = await Share.share(
        {
          message,
          title: "Echa un vistazo!",
        },
        {
          // Android only:
          dialogTitle: "Compartir esta publicación con",
          // iOS only:
          excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
        },
      );

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // compartido con el tipo de actividad de result.activityType
          // console.log('evento conmpartido con ', result.activityType)
        } else {
          // compartido
          // console.log('evento conmpartido')
        }
      } else if (result.action === Share.dismissedAction) {
        // descartado
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const [expanded, setExpanded] = useState(false);
  if (expanded) {
    return (
      <Pressable onPress={() => setExpanded(false)}>
        <View
          style={{
            backgroundColor: Color.mytreeClarito,
            left: 0,
            top: padding && padding !== false ? 15 : 5,
            minHeight: Dimensions.get("screen").height / 1.8,
            marginBottom: 30,
            borderRadius: 20,
            transition: "all 1s ease",
            marginHorizontal: padding && padding !== false && 15,
            overflow: "hidden",
            // opacity,
            // transform: [{translateY}]
          }}
        >
          <ImageBackground
            style={{
              height: Dimensions.get("screen").height / 1.8,
              zIndex: -1000,
              justifyContent: "flex-end",
              resizeMode: "cover",
              overflow: "hidden",
              justifyContent: "space-between",
            }}
            resizeMethod="resize"
            source={{ uri: data.photos[0] }}
          >
            <LinearGradient
              style={{
                height: "100%",
                justifyContent: "flex-start",
                padding: 15,
              }}
              end={{ x: 0.5, y: 1 }}
              start={{ x: 0.5, y: 0 }}
              colors={["rgba(0,0,0,0.7)", "transparent"]}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: scaleFont(20),
                    color: Color.white,
                    fontWeight: "700",
                    width: "80%",
                  }}
                >{`${data?.user?.username} ${data?.user?.apellido}`}</Text>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedPost(data);
                    setSelectedPostTags(data.tags || []);
                    setShowTaggedsModal(true);
                  }}
                  style={{
                    zIndex: 99999999999,
                  }}
                >
                  <LinearGradient
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 64,
                      height: 64,
                      borderRadius: 25,
                      zIndex: 0,
                    }}
                    locations={[0, 1]}
                    colors={["#7ec18c", "#dee274"]}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 59,
                        borderRadius: 23,
                        backgroundColor: "#c5eacd",
                        height: 59,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: 53,
                          borderRadius: 23,
                          backgroundColor: "#b7e4c0",
                          height: 53,
                        }}
                      >
                        <Image
                          contentFit="cover"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 20,
                            zIndex: 999999999999,
                          }}
                          source={
                            data?.user?.profilePicture
                              ? {
                                  uri: data?.user?.profilePicture,
                                }
                              : require("../assets/logoo.png")
                          }
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <ScrollView
                contentContainerStyle={{ zIndex: 999999999999 }}
                style={{
                  height: Dimensions.get("window").height / 4,
                  zIndex: 999,
                }}
              >
                <Text
                  style={{
                    fontSize: scaleFont(15),
                    textAlign: "left",
                    fontFamily: FontFamily.lato,
                    color: Color.white,
                    width: "70%",
                  }}
                >
                  {data.description}
                </Text>
              </ScrollView>

              {data.hashtags.length > 0 && (
                <View
                  style={{
                    width: "75%",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 5,
                    marginTop: 10,
                  }}
                >
                  {data.hashtags.map((hashtag) => (
                    <View
                      style={{
                        backgroundColor: "#B7E4C0",
                        borderRadius: 5,
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                      }}
                    >
                      <Text style={{ color: "#fafafa", fontWeight: "600" }}>
                        #{hashtag}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </LinearGradient>
            <View
              style={{
                position: "absolute",
                right: "5%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                gap: scaleFont(25),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelectedPost(data.id);
                  dispatch(getAllCommentsByPostId(data.id));
                  setShowCommentsModal(true);
                }}
              >
                <Image
                  contentFit="contain"
                  style={{ width: scaleFont(25), height: 40 }}
                  source={require("../assets/iconlyboldchat.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("OpenedChat", {
                    receiverId: data.id,
                    receiverName: data.nameUser,
                  });
                }}
              >
                <EnviarMensajeSVG />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ zIndex: 999999999999999 }}
                onPress={() => {
                  onShare(
                    `¡Da un vistazo al diario de ${data?.user?.username} ${data?.user?.apellido}!. Si aún no te bajaste la app descargala en Google Play https://play.google.com/store/apps/details?id=com.aythenapps.mytree`,
                  );
                }}
              >
                <CompartirSVG />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  zIndex: 99999999999,
                  position: "absolute",
                  bottom: 12,
                  right: -6,
                  fontSize: FontSize.size_base,
                  fontFamily: FontFamily.lato,
                  color: Color.white,
                }}
                onPress={() => setExpanded(false)}
              >
                <Text
                  style={{
                    fontSize: scaleFont(12),
                    textAlign: "right",
                    fontFamily: FontFamily.lato,
                    color: Color.white,
                    width: 100,
                  }}
                >
                  Ver menos...
                </Text>
              </TouchableOpacity>
            </View>
            <LinearGradient
              style={{ height: 130, justifyContent: "flex-end", padding: 15 }}
              end={{ x: 0.5, y: 0 }}
              start={{ x: 0.5, y: 1 }}
              colors={["rgba(0,0,0,0.9)", "transparent"]}
            ></LinearGradient>
          </ImageBackground>
        </View>
      </Pressable>
    );
  } else {
    return (
      <View
        // onPress={() => setExpanded(true)}
        style={{
          backgroundColor: Color.mytreeClarito,
          left: 0,
          top: padding && padding !== false ? 15 : 5,
          height: Dimensions.get("screen").height / 1.8,
          marginBottom: 30,
          borderRadius: 20,
          marginHorizontal: padding && padding !== false && 15,
          overflow: "hidden",
        }}
      >
        <PagerView
          onPageSelected={(event) => setCurrentPage(event.nativeEvent.position)}
          style={{
            height: Dimensions.get("screen").height / 1.8,
            width: "100%",
          }}
          initialPage={0}
        >
          {data.photos &&
            data.photos.map((e) => (
              <Image
                contentFit="cover"
                style={{ height: "100%", width: "100%" }}
                source={{ uri: e }}
              ></Image>
            ))}
        </PagerView>

        <TouchableOpacity
          onPress={() => {
            setSelectedPost(data);
            setSelectedPostTags(data.tags || []);
            setShowTaggedsModal(true);
          }}
          style={{ position: "absolute", left: 15, top: 15 }}
        >
          <LinearGradient
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 64,
              height: 64,
              borderRadius: 25,
              zIndex: 0,
            }}
            locations={[0, 1]}
            colors={["#7ec18c", "#dee274"]}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 59,
                borderRadius: 23,
                backgroundColor: "#c5eacd",
                height: 59,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 53,
                  borderRadius: 23,
                  backgroundColor: "#b7e4c0",
                  height: 53,
                }}
              >
                <Image
                  contentFit={data?.user?.profilePicture ? "cover" : "contain"}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                    zIndex: 999999999999,
                  }}
                  source={
                    data?.user?.profilePicture
                      ? {
                          uri: data?.user?.profilePicture,
                        }
                      : require("../assets/logoo.png")
                  }
                />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View
          style={{
            gap: scaleFont(25),
            position: "absolute",
            right: "5%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setSelectedPost(data.id);
              dispatch(getAllCommentsByPostId(data.id));
              setShowCommentsModal(true);
            }}
          >
            <Image
              contentFit="contain"
              style={{ width: scaleFont(25), height: 40 }}
              source={require("../assets/iconlyboldchat.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("OpenedChat", {
                receiverId: data.user.id,
                receiverName: data.nameUser,
              });
            }}
          >
            <EnviarMensajeSVG />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ zIndex: 999999999999999 }}
            onPress={() => {
              onShare(
                `¡Da un vistazo al diario de ${data?.user?.username} ${data?.user?.apellido}!. Si aún no te bajaste la app descargala en Google Play https://play.google.com/store/apps/details?id=com.aythenapps.mytree`,
              );
            }}
          >
            <CompartirSVG />
          </TouchableOpacity>
        </View>
        <LinearGradient
          style={{
            paddingHorizontal: 10,
            height: 130,
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
          end={{ x: 0.5, y: 0 }}
          start={{ x: 0.5, y: 1 }}
          colors={["rgba(0,0,0,0.9)", "transparent"]}
        >
          <View>
            <Text
              numberOfLines={2}
              style={styles.camila}
            >{`${data?.user?.username} ${data?.user?.apellido}`}</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.yendoALa}
            >
              {data.description}
            </Text>
          </View>
          <Pressable
            style={{ position: "absolute", bottom: 10, left: 10 }}
            onPress={() => setExpanded(true)}
          >
            <Text
              style={{
                fontSize: scaleFont(12),
                textAlign: "left",
                fontFamily: FontFamily.lato,
                color: Color.white,
              }}
            >
              Ver más...
            </Text>
          </Pressable>
          {data.photos.length > 1 && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              {data.photos.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 2,
                    backgroundColor:
                      index === currentPage ? Color.mytreeClarito : "gray",
                  }}
                />
              ))}
            </View>
          )}
        </LinearGradient>
      </View>
    );
  }
};

const Post = ({ padding, posts }) => {
  const [showIcons, setShowIcons] = useState(false);
  const { allPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const toggleIcons = () => {
    setShowIcons((prevShowIcons) => !prevShowIcons);
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  if (posts?.length === 0)
    return (
      <View style={{ width: "100%", alignItems: "center", paddingTop: 50 }}>
        <Text style={{ fontSize: 14, fontWeight: 500, color: "#202020" }}>
          No se han encontrado resultados!
        </Text>
      </View>
    );
  return (
    <View style={styles.rectangleParent} onPress={toggleIcons}>
      {posts
        ? [...posts]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10)
            .map((e, i) => <Posteo padding={padding} data={e} key={i}></Posteo>)
        : allPosts &&
          [...allPosts]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((e, i) => (
              <Posteo padding={padding} data={e} key={i}></Posteo>
            ))}
    </View>
  );
};

const styles = StyleSheet.create({
  vectorIconLayout: {
    height: 45,
    width: 45,
    left: 60,
    top: 50,
  },
  frameChild: {
    backgroundColor: Color.mytreeClarito,
    left: 0,
    top: 15,
    height: 500,
    marginBottom: 30,
    borderRadius: 20,
    marginHorizontal: 15,
    overflow: "hidden",
  },
  vectorIcon: {
    marginTop: -29,
    marginLeft: -40,
    width: 78,
    left: "50%",
    top: "50%",
  },
  rectangleParent: {
    height: "85%",
    paddingBottom: 5,
  },
  camila: {
    fontSize: scaleFont(20),
    color: Color.white,
    fontWeight: "700",
    width: "100%",
  },
  yendoALa: {
    marginTop: 20,
    fontSize: scaleFont(15),
    textAlign: "left",
    fontFamily: FontFamily.lato,
    color: Color.white,
    width: "70%",
  },
  textContainer: {
    padding: 15,
    top: "35%",
  },
  tagged: {
    borderWidth: 1,
    borderColor: Color.colorLavender_100,
    height: 60,
    width: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    top: 15,
    left: 15,
  },
  iconsContainer: {
    left: "5%",
    gap: 50,
    top: "30%",
  },
  iconsContainerEmpty: {
    height: 124,
  },
});

export default Post;
