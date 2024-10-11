import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Modal,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import {
  FontFamily,
  FontSize,
  Color,
  Padding,
  Border,
} from "../../GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import SingleDiary from "../../components/SingleDiary";
import { Context } from "../../context/Context";
import {
  getUserDiariesByDateOrCategory,
  postDiary,
  updateDiaryById,
} from "../../redux/actions/diaries";
import { LinearGradient } from "expo-linear-gradient";
import Humor from "../../components/Humor";
import { EditarDiario } from "./EditarDiario";

const Diario = ({ selected, setEditingDiary, setSelected }) => {
  const [text, setText] = useState(selected?.description || "");
  const [title, setTitle] = useState(selected?.title || "");

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 500 }}>
          {selected?.title || "Sin título"}
        </Text>
        <Pressable
          style={{
            height: 18,
            width: 18,
            marginRight: 2,
            alignSelf: "flex-end",
          }}
          onPress={() => {
            setEditingDiary();
            setSelected(null);
            setText("");
            setTitle("");
          }}
        >
          <Image
            style={{ height: "100%", width: "100%" }}
            contentFit="cover"
            source={require("../../assets/group-68463.png")}
          />
        </Pressable>
      </View>
      <Text
        style={{
          width: "100%",
          marginTop: 10,
          borderTopColor: Color.primario1,
          borderTopWidth: 1,
          paddingTop: 10,
          fontSize: 18,
        }}
      >
        {selected.description}
      </Text>
    </View>
  );
};

const ReflexionDiaria = ({
  editing,
  modalCreate,
  setModalCreate,
  openGroupIcon1,
  selectedDate,
  pickedImages,
  setPickedImages,
  diary,
}) => {
  const { userDiaries, selectedDiary, loading, filterDiaries } = useSelector(
    (state) => state.diaries,
  );
  const { userData } = useSelector((state) => state.users);
  const [showEmojisModal, setShowEmojisModal] = useState(false);

  const [selected, setSelected] = useState({});
  const [text, setText] = useState(selected?.description || "");
  const [title, setTitle] = useState(selected?.title || "");
  const [edition, setEdition] = useState(false);

  const [isEditingAll, setIsEditingAll] = useState(false);
  const [previousIsEditingAll, setPreviousIsEditingAll] = useState(false);
  const [editedDiaries, setEditedDiaries] = useState(filterDiaries);

  const [diaryImages, setDiaryImages] = useState(selected?.images || []);
  const dispatch = useDispatch();
  const { selectedSection, formatDateToNormal, editingDiary, setEditingDiary } =
    useContext(Context);

  useEffect(() => {
    if (diary) {
      setSelected(diary);
    }
  }, [diary]);

  useEffect(() => {
    if (!edition) {
      const obj = {
        creatorId: userData.id,
        category: selectedSection,
      };
      if (selectedDate) {
        obj.date = selectedDate;
      }

      dispatch(getUserDiariesByDateOrCategory(obj));
    }
  }, [edition]);

  useEffect(() => {
    if (selected) {
      setText(selected?.description);
      setTitle(selected?.title);
    }
  }, [selected]);

  useEffect(() => {
    if (!isEditingAll && previousIsEditingAll) {
      editedDiaries.forEach((diary) => {
        const updatedData = {
          description: diary.description,
          title: diary.title,
        };
        dispatch(
          updateDiaryById({ diaryId: diary.id, diaryData: updatedData }),
        );
      });
      const obj = {
        creatorId: userData.id,
        category: selectedSection,
      };
      if (selectedDate) {
        obj.date = selectedDate;
      }
      dispatch(getUserDiariesByDateOrCategory(obj));
    }
  }, [
    isEditingAll,
    previousIsEditingAll,
    editedDiaries,
    dispatch,
    selectedDate,
    selectedSection,
    userData.id,
  ]);

  return (
    <View
      style={{
        backgroundColor: Color.white,
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.reflexinDiaria, styles.hoyLoHeFlexBox]}>
          {selectedSection === "nube"
            ? "Reflexión Diaria"
            : selectedSection === "logros"
              ? "Celebrando Logros"
              : selectedSection === "desafios"
                ? "Desafíos Superados"
                : selectedSection === "risas"
                  ? "Risas y anécdotas"
                  : selectedSection === "mundo"
                    ? "Descubriendo el mundo"
                    : "Personalizada"}
        </Text>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
          onPress={() => {
            setEdition(!edition);
            // setEditingDiary(diary.id)
            // setSelected(diary)
          }}
        >
          <Text
            style={{
              textAlignVertical: "center",
              color: !edition ? "#7EC18C" : "gray",
            }}
          >
            Editar
          </Text>
          <Image
            style={{ width: 20, height: 20 }}
            source={
              !edition
                ? require("../../assets/lapizgris.png")
                : require("../../assets/vector47.png")
            }
          />
        </Pressable>
      </View>
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
      ) : filterDiaries.length === 0 && !selected?.id ? (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingTop: 50,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: 500, color: "#202020" }}>
            ¡No hemos encontrado diarios basados en su búsqueda!
          </Text>
        </View>
      ) : selected?.id ? (
        <ScrollView style={{ height: "100%", width: "100%" }}>
          {selected.id === editingDiary ? (
            <EditarDiario
              selected={selected}
              selectedDate={selectedDate}
              selectedSection={selectedSection}
              setEditingDiary={setEditingDiary}
              setSelected={setSelected}
            ></EditarDiario>
          ) : (
            <Diario
              selected={selected}
              setEditingDiary={setEditingDiary}
              setSelected={setSelected}
            ></Diario>
          )}
        </ScrollView>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          style={{ height: Dimensions.get("screen").height / 2 }}
        >
          {filterDiaries.map((diary, index) => (
            <SingleDiary
              setEditedDiaries={setEditedDiaries}
              multiEditing={!edition}
              setSelected={setSelected}
              pickedImages={pickedImages}
              setPickedImages={setPickedImages}
              selectedDate={selectedDate}
              key={diary.id}
              diary={diary}
              editing={selectedDiary?.id === diary.id}
              setModalCreate={setModalCreate}
              modalCreate={modalCreate}
              openGroupIcon1={openGroupIcon1}
              last={index === filterDiaries.length - 1}
            />
          ))}
        </ScrollView>
      )}

      <View style={[styles.miDiarioEntradaTextoPlItem, styles.diarioLayout]} />
      <Modal animationType="fade" transparent visible={showEmojisModal}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
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
    </View>
  );
};

const styles = StyleSheet.create({
  diarioLayout: {
    width: 428,
    position: "absolute",
  },
  hoyLoHe: {
    fontSize: FontSize.size_lg,
    lineHeight: 27,
  },
  hoyLoHeFlexBox: {
    textAlign: "left",
    textAlignVertical: "center",
    color: Color.negro,
    marginTop: 20,
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  frameItemFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  ttTypo: {
    textAlign: "center",
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  textLayout: {
    lineHeight: 36,
    fontSize: FontSize.size_5xl,
  },
  jul2023Typo: {
    lineHeight: 30,
    fontSize: FontSize.size_xl,
    textAlign: "center",
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },

  groupIconLayout: {
    width: 30,
    marginLeft: 30,
  },
  image6IconPosition: {
    left: 20,
    position: "absolute",
  },
  vectorFlexBox: {
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_sm,
    width: 40,
    borderRadius: Border.br_8xs,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  frameItemLayout: {
    zIndex: 0,
    height: 36,
    width: 40,
    borderRadius: Border.br_8xs,
    backgroundColor: Color.secundario,
  },
  vectorIconPosition1: {
    zIndex: 1,
    position: "absolute",
  },
  vectorIconPosition: {
    left: 7,
    zIndex: 1,
    width: 26,
    position: "absolute",
  },
  miDiarioEntradaTextoPlChild: {
    height: 662,
    backgroundColor: Color.linearBoton,
    left: 0,
    width: 428,
    top: 64,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    height: 24,
    width: 24,
  },
  groupIcon1Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  groupIcon1Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  frameContainerOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  frameContainerBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  signIn: {
    fontSize: FontSize.size_sm,
    lineHeight: 21,
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  pressable: {
    borderRadius: Border.br_11xl,
    paddingHorizontal: Padding.p_base,
    paddingTop: Padding.p_6xs,
    paddingBottom: Padding.p_5xs,
    backgroundColor: Color.linearBoton,
  },
  container: {
    marginLeft: 20,
  },
  groupParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 388,
  },
  frameContainer3Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  frameContainer3Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  text: {
    fontWeight: "700",
    color: Color.negro,
    textAlign: "center",
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    lineHeight: 36,
    fontSize: FontSize.size_5xl,
  },
  jul2023: {
    marginLeft: 10,
    color: Color.negro,
  },
  iconlycurvedarrowDown2: {
    width: 14,
    height: 7,
    marginLeft: 10,
  },
  parent: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  reflexinDiaria: {
    fontSize: FontSize.size_5xl,
    marginBottom: 10,
  },
  hoyLoHe: {
    fontSize: FontSize.size_lg,
    lineHeight: 27,
  },
  frameParent: {
    top: 133,
    height: 357,
    width: 388,
    left: 20,
    position: "absolute",
  },
  miDiarioEntradaTextoPlItem: {
    top: 726,
    height: 75,
    backgroundColor: Color.secundario,
    left: 0,
    width: 428,
  },
  iconlyboldimage: {
    width: 32,
    height: 32,
  },
  iconlyboldcamera: {
    width: 34,
    height: 33,
    marginLeft: 30,
  },
  iconlyboldvoice: {
    width: 25,
    height: 34,
    marginLeft: 30,
  },
  frameChild: {
    height: 21,
  },
  groupIcon: {
    height: 30,
  },
  tt: {
    fontSize: FontSize.size_15xl,
    lineHeight: 51,
    marginLeft: 30,
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  iconlyboldticketStar: {
    width: 42,
    marginLeft: 30,
    height: 32,
  },
  iconlyboldimageParent: {
    top: 738,
    left: 12,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  image6Icon: {
    top: 3,
    width: 87,
    height: 55,
  },
  documentIcon: {
    marginLeft: 30,
    height: 24,
    width: 24,
    overflow: "hidden",
  },
  iconlylightOutlinesetting: {
    marginLeft: 30,
    height: 24,
    width: 24,
  },
  iconlylightOutlinesearchParent: {
    top: 20,
    left: 276,
    position: "absolute",
    justifyContent: "center",
  },
  navigationIcon: {
    marginLeft: -214,
    top: 821,
    left: "50%",
    height: 105,
  },
  vectorIcon: {
    height: 28,
    width: 26,
  },
  vectorWrapper: {
    backgroundColor: Color.colorLavenderblush,
    height: 36,
  },
  frameItem: {
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  vectorIcon1: {
    left: 8,
    top: 4,
    height: 28,
    width: 24,
  },
  vectorIcon2: {
    top: 4,
    height: 28,
  },
  vectorIcon3: {
    top: 6,
    height: 24,
  },
  rectangleParent: {
    height: 36,
    width: 40,
  },
  vectorIcon4: {
    height: 18,
    width: 26,
  },
  vectorContainer: {
    backgroundColor: Color.secundario,
  },
  vectorIcon5: {
    height: "48.33%",
    width: "43.25%",
    top: "26.11%",
    right: "29%",
    bottom: "25.56%",
    left: "27.75%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  frameGroup: {
    backgroundColor: Color.colorHoneydew_100,
    height: 49,
    paddingLeft: Padding.p_xs,
    paddingRight: Padding.p_xl,
    borderRadius: Border.br_8xs,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: 428,
    left: 0,
    top: 64,
    position: "absolute",
  },
  iconlyboldunlock: {
    height: 30,
    width: 24,
  },
  familiaYAmigos: {
    color: Color.primario1,
    marginLeft: 20,
  },
  privacidad: {
    top: 676,
    left: 20,
    position: "absolute",
  },
  miDiarioEntradaTextoPl: {
    // borderRadius: Border.br_31xl,
    backgroundColor: Color.white,
    flex: 1,
    // height: 926,
    overflow: "hidden",
    width: "100%",
  },
});

export default ReflexionDiaria;
