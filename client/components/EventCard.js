import React from "react";
import { Pressable, Text, View } from "react-native";
import CalendarCheckSVG from "./svgs/CalendarCheckSVG";
import { Border, Color } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const EventCard = ({ event }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        height: 100,
        borderRadius: Border.br_base,
        backgroundColor: Color.colorWhitesmoke_200,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        width: "100%",
        marginTop: 15,
      }}
      onPress={() => navigation.navigate("Eventos", event)}
    >
      <View style={{ flexDirection: "column", gap: 10, width: "90%" }}>
        <Text
          style={{ color: Color.primario1, fontWeight: "600", fontSize: 15 }}
        >
          {event.title}
        </Text>
        <View>
          <Text numberOfLines={1} style={{ color: Color.gris }}>
            {event.description}
          </Text>
        </View>
      </View>
      <CalendarCheckSVG />
    </Pressable>
  );
};

export default EventCard;
