import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import axiosInstance from "../apiBackend";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/actions/user";

const OpcionesCaategora = ({
  onClose,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [addedCategory, setAddedCategory] = React.useState();
  const [text, setText] = React.useState("");
  const { userData } = useSelector((state) => state.users);
  const [opcion, setOpcion] = React.useState();

  const dispatch = useDispatch();

  const handleUpdateCategory = async () => {
    const res = await axiosInstance
      .patch(`/user/${userData.id}`, {
        userCategories: userData?.userCategories
          ? [...userData?.userCategories, text]
          : [text],
      })
      .then(() => dispatch(getUserData(userData.id)));
  };

  return (
    <View style={{}}>
      <View style={styles.opcionesCaategora}>
        <View style={styles.aniversarioParent}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: 77,
              maxHeight: 77,
              overflow: "hidden",
              flexGrow: 1,
              marginTop: 5,
            }}
            contentContainerStyle={{
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 6,
            }}
          >
            {userData.userCategories &&
              userData.userCategories.map((e, i) => {
                return (
                  <Pressable
                    onPress={() => {
                      setSelectedCategory(e);
                      setText("");
                    }}
                  >
                    <View style={{ flexDirection: "row", gap: 5 }}>
                      <Checkbox
                        color={Color.primario1}
                        value={opcion === i}
                        onValueChange={() => {
                          if (opcion === i) {
                            setSelectedCategory();
                            return setOpcion();
                          }
                          setOpcion(i);
                          setSelectedCategory(e);
                          setText("");
                        }}
                      />
                      <Text style={[styles.aniversario, styles.aadirTypo]}>
                        {e}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}

            {addedCategory && (
              <Pressable
                onPress={() => {
                  setSelectedCategory(addedCategory);
                  setText("");
                  onClose();
                }}
              >
                <Text style={[styles.aniversario, styles.aadirTypo]}>
                  {addedCategory}
                </Text>
              </Pressable>
            )}
          </ScrollView>
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
          <View style={{ flexDirection: "column" }}>
            <TextInput
              value={text}
              onChangeText={(text) => {
                setOpcion();
                setText(text);
              }}
              style={{
                paddingVertical: Padding.p_smi,
                backgroundColor: Color.fAFAFA,
                borderRadius: Border.br_3xs,
                paddingHorizontal: 15,
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                marginTop: 10,
              }}
              placeholder="Ingrese nueva categoría"
            />
            <TouchableOpacity
              onPress={handleUpdateCategory}
              style={{ marginTop: 10 }}
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
                  Agregar
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (text) {
                setAddedCategory(text);
                setSelectedCategory(text);
              }
              setText("");
              onClose();
            }}
            style={{ marginTop: 10 }}
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
                Guardar
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aadirTypo: {
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  aniversario: {
    color: Color.gris,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  frameChild: {
    marginTop: 20,
    width: 388,
    maxHeight: "100%",
  },
  graduacin: {
    marginTop: 20,
    color: Color.gris,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  aadir: {
    color: Color.primario2,
    marginTop: 20,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
  },
  aniversarioParent: {
    width: "100%",
    padding: 20,
  },
  opcionesCaategora: {
    borderTopEndRadius: Border.br_11xl,
    borderTopStartRadius: Border.br_11xl,

    backgroundColor: Color.white,
    width: "100%",
    bottom: 0,
    maxWidth: "100%",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Color.primario1,
  },
});

export default OpcionesCaategora;
