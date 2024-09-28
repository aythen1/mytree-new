import {
  View,
  Text,
  Pressable,
  Image,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import Editar2SVG from "./svgs/Editar2SVG";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../context/Context";
import ENTRADACREADA from "./ENTRADACREADA";
import { LinearGradient } from "expo-linear-gradient";
import {
  deleteDiaryById,
  getAllUserDiaries,
  getUserDiariesByDateOrCategory,
  postDiary,
  updateDiaryById,
} from "../redux/actions/diaries";
import { removeUserDiary } from "../redux/slices/diaries.slices";
import Humor from "./Humor";

const SingleDiary = ({
  setEditedDiaries,
  multiEditing,
  diary,
  editing,
  pickedImages,
  setModalCreate,
  modalCreate,
  openGroupIcon1,
  last,
  selectedDate,
  setPickedImages,
  notEditable,
  setSelected,
}) => {
  const { selectedSection, formatDateToNormal } = useContext(Context);
  const { userData } = useSelector((state) => state.users);
  const [diaryImages, setDiaryImages] = useState(diary.images || []);
  const [text, setText] = useState(diary?.description);
  const [showEmojisModal, setShowEmojisModal] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(diary?.title);
  const [save, setSave] = useState(false);
  const [vermas, setVermas] = useState(false);

  const { editingDiary, setEditingDiary } = useContext(Context);

  const handleDeleteDiary = (id) => {
    dispatch(deleteDiaryById(diary.id));
  };

  const getFileName = (filePath) => {
    const parts = filePath.split("/");
    const fileName = parts[parts.length - 1];
    return fileName;
  };

  useEffect(() => {
    if (
      text.length !== diary?.description ||
      title.length !== diary?.title.length
    ) {
      setSave(true);
    } else {
      setSave(false);
    }
  }, [text, title]);

  const handleUno = async () => {
    setSave(false);
    const preDiary = { ...diary };
    preDiary.description = text;
    const cloudinaryUrls = [];

    for (const image of pickedImages) {
      const formData = new FormData();
      formData.append("file", {
        uri: image.uri,
        type: "image/jpeg",
        name: image.filename ? image.filename : getFileName(image.uri),
      });
      formData.append("upload_preset", "cfbb_profile_pictures");
      formData.append("cloud_name", "dnewfuuv0");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dnewfuuv0/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      if (response.ok) {
        cloudinaryUrls.push(data.secure_url);
      } else {
        console.error("Error uploading image:", data);
      }
    }
    if (preDiary.id === "preDiary") {
      delete preDiary.id;
      dispatch(postDiary(preDiary)).then((res) => {
        const obj = {
          creatorId: userData.id,
          category: selectedSection,
        };
        obj.images = cloudinaryUrls;

        if (selectedDate) {
          obj.date = selectedDate;
        }
        dispatch(getUserDiariesByDateOrCategory(obj));
      });
    } else {
      const updatedData = { description: preDiary.description };
      updatedData.images = [...diaryImages, ...cloudinaryUrls];
      dispatch(
        updateDiaryById({
          diaryId: preDiary.id,
          diaryData: updatedData,
        }),
      ).then((res) => {
        const obj = {
          creatorId: userData.id,
          category: selectedSection,
        };
        if (selectedDate) {
          obj.date = selectedDate;
        }

        // dispatch(getUserDiariesByDateOrCategory(obj));
      });
    }
    setPickedImages([]);
    setEditingDiary(false);
  };

  return (
    <TouchableOpacity
      onPress={() => setSelected(diary)}
      style={{
        borderTopWidth: 1,
        borderBottomWidth: last ? 1 : 0,
        borderBottomColor: last && "#B7E4C0",
        borderTopColor: "#B7E4C0",
        minHeight: 70,
      }}
    >
      {multiEditing ? (
        <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 500 }}>
          {diary?.title || "Sin título"}
        </Text>
      ) : (
        <TextInput
          maxLength={30}
          style={{ fontSize: 16, width: "78%" }}
          onChangeText={setTitle}
          value={title}
        ></TextInput>
      )}
      {multiEditing ? (
        <Text numberOfLines={1} style={{ width: "78%" }}>
          {diary.description}
        </Text>
      ) : (
        <TextInput
          multiline={vermas && !multiEditing}
          style={{ fontSize: 16 }}
          onChangeText={setText}
          value={text}
        ></TextInput>
      )}
      {save && !multiEditing && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity onPress={handleUno} style={{}}>
            <LinearGradient
              style={{
                borderRadius: 50,
                height: 25,
                width: 60,
              }}
              locations={[0, 1]}
              colors={["#dee274", "#7ec18c"]}
            >
              <Text
                style={{
                  fontSize: FontSize.size_sm,
                  lineHeight: 21,
                  textAlign: "center",
                  color: Color.white,
                  fontFamily: FontFamily.lato,
                  letterSpacing: 0,
                }}
              >
                Guardar
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {text.length > 40 && (
            <TouchableOpacity onPress={() => setVermas(!vermas)} style={{}}>
              <LinearGradient
                style={{ borderRadius: 50, height: 25, width: 60 }}
                locations={[0, 1]}
                colors={["#dee274", "#7ec18c"]}
              >
                <Text
                  style={{
                    fontSize: FontSize.size_sm,
                    lineHeight: 21,
                    textAlign: "center",
                    color: Color.white,
                    fontFamily: FontFamily.lato,
                    letterSpacing: 0,
                  }}
                >
                  Ver más
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      )}

      {!notEditable && editingDiary === diary.id && (
        <View style={{ width: "100%", marginTop: -15 }}>
          <View style={{}}>
            <TextInput
              style={{
                fontSize: FontSize.size_lg,
                lineHeight: 27,
                width: Dimensions.get("screen").width * 0.8,
                textAlign: "left",
                color: Color.negro,
                fontFamily: FontFamily.lato,
                letterSpacing: 0,
                marginBottom: 8,
              }}
              multiline
              value={text}
              onChangeText={(text) => setText(text)}
            />
            <View
              style={{
                width: "100%",
                flexWrap: "wrap",
                flexDirection: "row",
                gap: 5,
              }}
            >
              {diaryImages?.length > 0 &&
                diaryImages?.map((image, i) => (
                  <View>
                    <Image
                      key={i}
                      source={{ uri: image }}
                      contentFit={"contain"}
                      style={{ width: 50, height: 50, borderRadius: 3 }}
                    />
                    <Pressable
                      onPress={() =>
                        setDiaryImages(
                          [...diaryImages].filter((img) => img !== image),
                        )
                      }
                      style={{
                        position: "absolute",
                        top: 3,
                        right: 3,
                        borderRadius: 3,
                        backgroundColor: "#fff",
                        padding: 3.5,
                      }}
                    >
                      <Image
                        contentFit="cover"
                        style={{ width: 7, height: 7 }}
                        source={require("../assets/group-68463.png")}
                      />
                    </Pressable>
                  </View>
                ))}
              {pickedImages.length > 0 &&
                pickedImages.map((image, i) => (
                  <View>
                    <Image
                      key={i + 500}
                      source={{ uri: image.uri }}
                      contentFit={"contain"}
                      style={{ width: 50, height: 50, borderRadius: 3 }}
                    />
                    <Pressable
                      onPress={() => {
                        setPickedImages(
                          pickedImages.filter((img) => img.uri !== image.uri),
                        );
                      }}
                      style={{
                        position: "absolute",
                        top: 3,
                        right: 3,
                        borderRadius: 3,
                        backgroundColor: "#fff",
                        padding: 3.5,
                      }}
                    >
                      <Image
                        contentFit="cover"
                        style={{ width: 7, height: 7 }}
                        source={require("../assets/group-68463.png")}
                      />
                    </Pressable>
                  </View>
                ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                height: "100%",
              }}
            >
              {!notEditable && editingDiary === diary.id ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 15,
                    paddingRight: 5,
                  }}
                >
                  <Pressable
                    style={{ height: 18, width: 18, marginTop: 8 }}
                    onPress={() => {
                      if (diary.id === "preDiary") {
                        dispatch(removeUserDiary("preDiary"));
                      }
                      setEditingDiary();
                      setPickedImages([]);
                    }}
                  >
                    <Image
                      style={{ height: "100%", width: "100%" }}
                      contentFit="cover"
                      source={require("../assets/group-68463.png")}
                    />
                  </Pressable>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: "red",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: FontSize.size_lg,
                      lineHeight: 27,
                      textAlign: "left",
                      color: Color.negro,
                      marginTop: !notEditable && 20,
                      fontFamily: FontFamily.lato,
                      letterSpacing: 0,
                      marginBottom: 8,
                    }}
                  >
                    {text}
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      flexWrap: "wrap",
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    {diaryImages.length > 0 &&
                      diaryImages.map((image, i) => (
                        <Image
                          key={i}
                          source={{ uri: image }}
                          contentFit={"contain"}
                          style={{ width: 50, height: 50, borderRadius: 3 }}
                        />
                      ))}
                  </View>
                </View>
              )}
              <Pressable
                style={{ height: 24, width: 24 }}
                onPress={() => setShowEmojisModal(true)}
              >
                <Image
                  style={{ height: "100%", width: "100%" }}
                  contentFit="cover"
                  source={require("../assets/group2.png")}
                />
              </Pressable>
              <LinearGradient
                style={{ marginLeft: 20, borderRadius: 50 }}
                locations={[0, 1]}
                colors={["#dee274", "#7ec18c"]}
              >
                <Pressable
                  style={{
                    paddingHorizontal: Padding.p_base,
                    paddingTop: Padding.p_6xs,
                    paddingBottom: Padding.p_5xs,
                    backgroundColor: Color.linearBoton,
                  }}
                  onPress={handleUno}
                >
                  <Text
                    style={{
                      fontSize: FontSize.size_sm,
                      lineHeight: 21,
                      textAlign: "center",
                      color: Color.white,
                      fontFamily: FontFamily.lato,
                      letterSpacing: 0,
                    }}
                  >
                    Guardar
                  </Text>
                </Pressable>
              </LinearGradient>
            </View>
          </View>
        </View>
      )}
      {!notEditable && editingDiary !== diary.id && (
        <View
          style={{
            width: "100%",
            flexDirection: "row-reverse",
            alignItems: "flex-end",
            paddingBottom: 5,
            position: "absolute",
            paddingTop: 5,
            gap: 6,
            right: 0,
          }}
        >
          {!notEditable && (
            <Pressable onPress={() => handleDeleteDiary(diary.id)}>
              <Image
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                source={require("../assets/trashbtn.png")}
              />
            </Pressable>
          )}

          {!notEditable && (
            // <Pressable onPress={() => setEditingDiary(diary.id)}>
            <Pressable
              onPress={() => {
                setEditingDiary(diary.id);
                setSelected(diary);
              }}
            >
              <View style={{ marginRight: 4 }}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../assets/vector47.png")}
                />
              </View>
            </Pressable>
          )}
        </View>
      )}

      {!notEditable && (
        <Modal animationType="fade" transparent visible={modalCreate}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(113, 113, 113, 0.3)",
            }}
          >
            <Pressable
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
              }}
              onPress={() => setModalCreate(false)}
            />
            <ENTRADACREADA
              onClose={() => setModalCreate(false)}
              message={"Entrada Creada"}
              isNavigate={"MIDIARIOPANTALLAPERSONAL"}
            />
          </View>
        </Modal>
      )}
      {!notEditable && (
        <Modal animationType="fade" transparent visible={showEmojisModal}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(113, 113, 113, 0.3)",
            }}
          >
            <Pressable
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
              }}
              onPress={() => setShowEmojisModal(false)}
            />
            <Humor
              text={text}
              setText={setText}
              onClose={() => setShowEmojisModal(false)}
            />
          </View>
        </Modal>
      )}
    </TouchableOpacity>
  );
};

export default SingleDiary;
