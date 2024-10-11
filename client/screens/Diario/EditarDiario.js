const { View, TextInput, Text, Pressable, Image } = require("react-native");
const { Color, FontFamily, FontSize, Padding } = require("../../GlobalStyles");
const {
  getUserDiariesByDateOrCategory,
  updateDiaryById,
  postDiary,
} = require("../../redux/actions/diaries");
const { LinearGradient } = require("expo-linear-gradient");
const { useDispatch, useSelector } = require("react-redux");
const { useState } = require("react");

export const EditarDiario = ({
  selected,
  setSelected,
  setEditingDiary,
  selectedDate,
  selectedSection,
}) => {
  const [text, setText] = useState(selected?.description || "");
  const [title, setTitle] = useState(selected?.title || "");
  const { userData } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  return (
    <View style={{ flexDirection: "column" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          onChangeText={setTitle}
          value={title}
          maxLength={30}
          style={{ fontSize: 19, width: "50%" }}
        ></TextInput>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{ height: 18, width: 18, marginRight: 15 }}
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
              onPress={async () => {
                const preDiary = { ...selected };
                preDiary.description = text;
                preDiary.title = title;

                const cloudinaryUrls = [];

                if (preDiary.id === "preDiary") {
                  delete preDiary.id;
                  dispatch(postDiary(preDiary)).then((res) => {
                    console.log("CREANDO", preDiary);
                    const obj = {
                      creatorId: userData.id,
                      category: selectedSection,
                    };
                    obj.images = cloudinaryUrls;

                    if (selectedDate) {
                      obj.date = selectedDate;
                    }
                    dispatch(getUserDiariesByDateOrCategory(obj));
                    setSelected({});
                  });
                } else {
                  console.log("updating diary...", preDiary);
                  const updatedData = {
                    description: preDiary.description,
                    title,
                  };
                  updatedData.images = [];
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

                    dispatch(getUserDiariesByDateOrCategory(obj));
                  });
                }
                setEditingDiary();
                setSelected({});
                setText("");
                setTitle("");
              }}
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
      <View>
        <TextInput
          style={{
            fontSize: 18,
            borderTopColor: Color.primario1,
            borderTopWidth: 1,
            paddingTop: 10,
            marginTop: 10,
          }}
          multiline
          onChangeText={setText}
          value={text}
        ></TextInput>
      </View>
    </View>
  );
};
