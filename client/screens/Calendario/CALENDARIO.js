import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  Border,
  Color,
  FontFamily,
  FontSize,
  Padding,
} from "../../GlobalStyles";
import Calendario from "../../components/Calendario";
import Eventos from "../../components/Eventos";
import Fechas from "../../components/Fechas";
import TopBar from "../../components/TopBar";
import MasBusquedaSVG from "../../components/svgs/MasBusquedaSVG";
import { Context } from "../../context/Context";
import {
  getAllUserEvents,
  getAllUserInvitations,
} from "../../redux/actions/events";
import { setScreen } from "../../redux/slices/user.slices";

const CALENDARIO = () => {
  const { setShowSelectEventTypeModal } = useContext(Context);
  const { userEvents: dates, userInvitations } = useSelector(
    (state) => state.events,
  );
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.users);

  const [selectedItem, setSelectedItem] = useState("fechas");
  const [selectedDate, setSelectedDate] = useState("");
  const [user] = useState({});
  const [search, setSearch] = useState("");
  const [eventInvited, setEventInvited] = useState([]);

  const handleItemPress = (item) => {
    setSelectedItem(item);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // El mes es base 0, por eso se suma 1
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useFocusEffect(
    useCallback(() => {
      // Despachar acción para obtener los eventos del usuario
      dispatch(setScreen("Calendario"));

      dispatch(getAllUserEvents(userData?.id));
      dispatch(getAllUserInvitations(userData?.id)).then((e) => {
        console.log(e, "eee");
        if (e.payload) {
          let eventos = [];
          for (let index = 0; index < e.payload.length; index++) {
            const element = e.payload[index];
            if (element.status !== "rejected") {
              eventos.push(element.event);
            }
          }

          console.log(eventos, "INVITE");
          setEventInvited(eventos);
        }
      });
      // Establecer la fecha actual como valor por defecto al enfocar el componente
    }, [dispatch]),
  );

  useEffect(() => {
    setSelectedDate(getCurrentDate());
  }, []);

  return (
    <ScrollView
      style={{
        width: "100%",
        flex: 1,
        backgroundColor: Color.white,
      }}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <TopBar screen={"calendario"}></TopBar>
      <View style={{ paddingHorizontal: 5 }}>
        {dates ? (
          <Calendario
            dates={[...dates, ...eventInvited]}
            selectedDate={selectedDate}
            setSelectedDate={(e) => {
              setSelectedDate(e);
            }}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
      <View style={styles.frameParent}>
        <View style={styles.upcomingParent}>
          <Pressable
            style={[
              styles.fechasContainer,
              selectedItem === "eventos" && styles.fechasContainerSeleccion,
            ]}
            onPress={() => {
              handleItemPress("fechas");
            }}
          >
            <Text
              style={[
                styles.fechas,
                selectedItem === "eventos" && styles.eventos,
              ]}
            >
              Fechas
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.eventosContainer,
              selectedItem === "eventos" && styles.eventosContainerSeleccion,
            ]}
            onPress={() => {
              handleItemPress("eventos");
            }}
          >
            <Text
              style={[
                styles.eventos,
                selectedItem === "eventos" && styles.fechas,
              ]}
            >
              Eventos
            </Text>
          </Pressable>
        </View>
      </View>
      {selectedItem === "fechas" ? (
        <Fechas
          user={user}
          dates={[...dates, ...eventInvited]}
          selectedDate={selectedDate}
        />
      ) : (
        <Eventos
          invitations={eventInvited}
          search={search}
          dates={[...dates, ...eventInvited]}
          selectedDate={selectedDate}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    height: 25,
    width: 25,
  },
  image6Icon: {
    width: 87,
    height: 55,
  },
  icon: {
    overflow: "hidden",
  },
  ionmenu: {
    width: 26,
    height: 20,
  },
  ionmenuParent: {
    flexDirection: "row",
  },
  upcomingParent: {
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    height: 50,
  },
  TextWrapper: {
    width: "80%",
  },
  frameWrapper: {
    width: 388,
  },
  frameParent: {
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  background: {
    zIndex: 0,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    flex: 1,
  },
  calendario3: {
    width: "100%",
    flex: 1,
    backgroundColor: Color.white,
    padding: Padding.p_xl,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 70,
  },
  fechasContainer: {
    backgroundColor: "#b7e4c0",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  fechasContainerSeleccion: {
    backgroundColor: Color.fAFAFA,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  eventosContainer: {
    backgroundColor: Color.fAFAFA,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  eventosContainerSeleccion: {
    backgroundColor: "#b7e4c0",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  fechas: {
    fontSize: FontSize.size_xl,
    color: Color.white,
    fontWeight: "700",
  },
  eventos: {
    fontSize: FontSize.size_xl,
    color: Color.grisClaro,
    fontWeight: "700",
  },
});

export default CALENDARIO;
