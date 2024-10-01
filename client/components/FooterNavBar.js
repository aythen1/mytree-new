import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Aadir1 from "./Aadir1";
import { setPanelAddFooter } from "../redux/slices/panel.slices";
import { Context } from "../context/Context";
import SelectEventTypeModal from "./SelectEventTypeModal";

import { Image } from "expo-image";

import { getAllUserDiaries } from "../redux/actions/diaries";
import { setScreen } from "../redux/slices/user.slices";

const FooterNavBar = () => {
  const {
    showCamera,
    getUsersMessages,
    showSelectEventTypeModal,
    setShowSelectEventTypeModal,
  } = useContext(Context);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { panelAddFooter } = useSelector((state) => state.panel);
  const { userData, screen: selected } = useSelector((state) => state.users);

  // const [selected, setSelected] = useState('Muro')

  const showModalAdd = () => {
    dispatch(setPanelAddFooter(!panelAddFooter));
  };
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const screenWidth = Dimensions.get("screen").width;
  if (!showCamera && !keyboardVisible)
    return (
      <View style={{ backgroundColor: "#f1f1f1" }}>
        <View
          style={{
            height: 65,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopStartRadius: 7,
            borderTopEndRadius: 7,
            position: "absolute",
            bottom: 0,
            zIndex: 999999999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: Dimensions.get("window").width / 10,
              marginLeft: "10%",
              zIndex: 9999999,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Muro");
                // setSelected('Muro')
                dispatch(setScreen("Muro"));
              }}
            >
              {/* <HomeSVG picked={selected === 'Muro' && true} /> */}
              {selected === "Muro" ? (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/Home.png")}
                ></Image>
              ) : (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/Home1.png")}
                ></Image>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CALENDARIO");
                // setSelected('Calendario')
                dispatch(setScreen("Calendario"));
              }}
              style={{ zIndex: 9999999 }}
            >
              {/* <CalendarSVG picked={selected === 'Calendario' && true} /> */}
              {selected === "Calendario" ? (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/calendario.png")}
                ></Image>
              ) : (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/calendario1.png")}
                ></Image>
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: Dimensions.get("window").width / 10,
              marginRight: "10%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MIDIARIOPANTALLAPERSONAL");
                dispatch(getAllUserDiaries(userData.id));
                dispatch(setScreen("MiDiario"));
              }}
              style={{}}
            >
              {/* <FooterBookSVG picked={selected === 'MiDiario' && true} /> */}
              {selected === "MiDiario" ? (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/diario.png")}
                ></Image>
              ) : (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/diario1.png")}
                ></Image>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Perfil");
                dispatch(setScreen("Perfil"));
              }}
            >
              {/* <UsuarioSVG picked={selected === 'Perfil' && true} /> */}
              {selected === "Perfil" ? (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/profile.png")}
                ></Image>
              ) : (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/Profile1.png")}
                ></Image>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              position: "absolute",
              top: -29,
              left: "50%",
              marginLeft: -30,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              shadowOpacity: 1,
              elevation: 4,
              shadowRadius: 4,
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowColor: "black",
            }}
            onPress={showModalAdd}
          >
            <Image
              style={{ width: 63, height: 63 }}
              contentFit="cover"
              source={require("../assets/btnhomee.png")}
            />
          </TouchableOpacity>
        </View>
        {/* <FooterBarSVG /> */}
        <Image
          style={{
            width: screenWidth,
            height: 80,
            position: "absolute",
            bottom: 0,
            opacity: 1,
          }}
          contentFit="cover"
          source={require("../assets/nav.png")}
        />
        <Modal
          animationType="fade"
          transparent
          visible={showSelectEventTypeModal}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Pressable
              style={{ width: "100%", height: "100%", left: 0, top: 0 }}
              onPress={() => setShowSelectEventTypeModal(false)}
            />
            <SelectEventTypeModal
              onClose={() => setShowSelectEventTypeModal(false)}
            />
          </View>
        </Modal>
        {panelAddFooter && (
          <Modal transparent={true} animationType="fade">
            <TouchableWithoutFeedback onPress={showModalAdd}>
              <View style={{ height: "100%" }}>
                <Aadir1
                  setShowSelectEventTypeModal={setShowSelectEventTypeModal}
                />
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </View>
      // <Image
      //   style={{ position: 'absolute', bottom: 0 }}
      //   source={require('../assets/surface2.png')}
      // />
    );
};

export default FooterNavBar;
