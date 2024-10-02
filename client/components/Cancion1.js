import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Padding, Color, Border, FontSize, FontFamily } from "../GlobalStyles";
import PropTypes from "prop-types";
import { TextInput } from "react-native";
import { Context } from "../context/Context";

const Cancion1 = ({ onClose }) => {
  const { selectedHashtags, setSelectedHashtags } = useContext(Context);
  const [value, setValue] = useState("");

  const handleAddHashtag = (tag) => {
    if (selectedHashtags.length >= 4) {
      setValue("");
      return;
    }
    if (tag) {
      if (!selectedHashtags.includes(tag)) {
        setSelectedHashtags([...selectedHashtags, tag]);
        setValue("");
      }
      return;
    }
    if (!selectedHashtags.includes(value)) {
      setSelectedHashtags([...selectedHashtags, value]);
      setValue("");
      return;
    }
    setValue("");
  };
  return (
    <View
      style={{
        backgroundColor: Color.white,
        width: "100%",
        height: 400,
        overflow: "hidden",
        padding: 20,
        borderTopLeftRadius: Border.br_11xl,
        borderTopRightRadius: Border.br_11xl,
        position: "absolute",
        bottom: 0,
        borderWidth: 1,
        borderColor: Color.primario1,
        borderBottomWidth: 0,
      }}
    >
      {/* <Text
        style={{
          fontSize: FontSize.size_xl,
          color: Color.negro,
          textAlign: 'left',
          fontFamily: FontFamily.lato,
          fontWeight: '500'
        }}
      >
        Añadir evento
      </Text> */}
      <LinearGradient
        style={{
          bottom: 15,
          position: "absolute",
          paddingHorizontal: Padding.p_5xl,
          paddingVertical: Padding.p_sm,
          backgroundColor: Color.linearBoton,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          marginLeft: 20,
          borderRadius: Border.br_11xl,
        }}
        locations={[0, 1]}
        colors={["#dee274", "#7ec18c"]}
      >
        <Text onPress={onClose} style={styles.signIn}>
          Guardar
        </Text>
      </LinearGradient>
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          width: "100%",
          gap: 3,
          marginTop: 10,
          paddingHorizontal: 10,
        }}
      >
        {selectedHashtags.length > 0 ? (
          selectedHashtags.map((hashtag, index) => (
            <View
              key={index}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                backgroundColor: Color.secundario,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 5,
                borderRadius: 100,
              }}
            >
              <Text
                style={{
                  color: Color.primario1,
                  fontSize: FontSize.size_xs,
                  fontFamily: FontFamily.lato,
                  fontWeight: "500",
                }}
              >
                {`#${hashtag}`}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedHashtags(
                    selectedHashtags.filter((tag) => tag !== hashtag),
                  );
                }}
              >
                <Image
                  style={{ width: 10, height: 10 }}
                  source={require("../assets/group-68462.png")}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: FontSize.size_xl,
                color: Color.negro,
                textAlign: "left",
                fontFamily: FontFamily.lato,
                fontWeight: "500",
              }}
            >
              ¡Añada Hashtags!
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          top: 20,
          borderRadius: Border.br_3xs,
          backgroundColor: Color.fAFAFA,
          height: 40,
          width: "100%",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={{
            fontSize: FontSize.size_base,
            lineHeight: 24,
            display: "flex",
            width: "100%",
            marginLeft: 16,
            color: Color.negro,
            textAlign: "left",
            height: 24,
            alignItems: "center",
          }}
          placeholder="#"
          onChangeText={(text) => setValue(text)}
          value={value}
        />
      </View>
      <LinearGradient
        style={{
          marginTop: 25,
          borderRadius: 100,
          backgroundColor: Color.fAFAFA,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          width: 70,
          overflow: "hidden",
        }}
        locations={[0, 1]}
        colors={["#dee274", "#7ec18c"]}
      >
        <TouchableOpacity onPress={() => handleAddHashtag()}>
          <Text
            style={{
              color: Color.white,
              textAlign: "center",
              fontSize: 13,
              fontFamily: FontFamily.lato,
            }}
          >
            Añadir
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      <Text
        style={{
          top: 20,
          color: Color.primary,
          fontSize: FontSize.size_xs,
          lineHeight: 14,
          letterSpacing: 0,
          textAlign: "left",
          fontFamily: FontFamily.lato,
          fontWeight: "500",
        }}
      >
        Recomendados:
      </Text>
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          width: "100%",
          gap: 3,
          marginTop: 25,
        }}
      >
        <Pressable
          onPress={() => handleAddHashtag("MiPrimeraBicicleta")}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: Color.secundario,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 5,
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              color: Color.primario1,
              fontSize: FontSize.size_xs,
              fontFamily: FontFamily.lato,
              fontWeight: "500",
            }}
          >
            #MiPrimeraBicicleta
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleAddHashtag("Felicidad")}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: Color.secundario,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 5,
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              color: Color.primario1,
              fontSize: FontSize.size_xs,
              fontFamily: FontFamily.lato,
              fontWeight: "500",
            }}
          >
            #Felicidad
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleAddHashtag("Happy")}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: Color.secundario,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 5,
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              color: Color.primario1,
              fontSize: FontSize.size_xs,
              fontFamily: FontFamily.lato,
              fontWeight: "500",
            }}
          >
            #Happy
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleAddHashtag("Emoción")}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: Color.secundario,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 5,
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              color: Color.primario1,
              fontSize: FontSize.size_xs,
              fontFamily: FontFamily.lato,
              fontWeight: "500",
            }}
          >
            #Emoción
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleAddHashtag("NosVamosDeViaje")}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: Color.secundario,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 5,
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              color: Color.primario1,
              fontSize: FontSize.size_xs,
              fontFamily: FontFamily.lato,
              fontWeight: "500",
            }}
          >
            #NosVamosDeViaje
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleAddHashtag("CumpleañosFeliz")}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: Color.secundario,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 5,
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              color: Color.primario1,
              fontSize: FontSize.size_xs,
              fontFamily: FontFamily.lato,
              fontWeight: "500",
            }}
          >
            #CumpleañosFeliz
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

Cancion1.propTypes = {
  onClose: PropTypes.func,
};

const styles = StyleSheet.create({
  buttonFlexBox1: {
    paddingVertical: Padding.p_6xs,
    paddingHorizontal: Padding.p_3xs,
    backgroundColor: Color.secundario,
    top: 195,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    borderRadius: Border.br_11xl,
  },
  recomendadosTypo: {
    lineHeight: 14,
    fontSize: FontSize.size_xs,
    letterSpacing: 0,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
  },
  buttonFlexBox: {
    top: 226,
    paddingVertical: Padding.p_6xs,
    paddingHorizontal: Padding.p_3xs,
    backgroundColor: Color.secundario,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    borderRadius: Border.br_11xl,
  },
  aadirEvento: {
    top: 10,
    fontSize: FontSize.size_xl,
    color: Color.negro,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    left: "50%",
    marginLeft: -194,
    position: "absolute",
  },
  signIn: {
    flex: 1,
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: "center",
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
    zIndex: 99999999,
  },
  button: {
    top: 280,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    marginLeft: "5%",
    borderRadius: Border.br_11xl,
  },
  text: {
    marginTop: -9.5,
    top: "50%",
    lineHeight: 19,
    color: Color.gris,
    letterSpacing: 0,
    left: 20,
    fontSize: FontSize.size_base,
    textAlign: "left",
    fontFamily: FontFamily.lato,
    fontWeight: "500",
    position: "absolute",
  },
  field: {
    top: 120,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    height: 49,
    left: 20,
    width: 388,
    position: "absolute",
    overflow: "hidden",
  },
  miprimerabicicleta: {
    color: Color.primario1,
  },
  button1: {
    left: 113,
  },
  button2: {
    left: 245,
  },
  button3: {
    left: 325,
  },
  button4: {
    left: 20,
  },
  button5: {
    left: 102,
  },
  button6: {
    left: 232,
  },
  recomendados: {
    top: 20,
    color: Color.primary,
    fontSize: FontSize.size_xs,
  },
  cancion: {
    backgroundColor: Color.white,
    width: "100%",
    height: 400,
    overflow: "hidden",
    borderTopLeftRadius: Border.br_11xl,
    borderTopRightRadius: Border.br_11xl,
    position: "absolute",
    bottom: 0,
  },
});

export default Cancion1;
