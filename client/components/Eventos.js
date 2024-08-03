import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Color, FontFamily, Border } from "../GlobalStyles";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Eventos = ({ search, selectedDate, invitations }) => {
  const { userEvents: dates } = useSelector((state) => state.events);
  const { userData } = useSelector((state) => state.users);

  const [filteredEvents, setFilteredEvents] = useState([]);

  console.log("esto da ", invitations);

  useEffect(() => {
    if (search.length) {
      setFilteredEvents(
        dates.filter(
          (event) =>
            event.title.toLowerCase().includes(search.toLowerCase()) &&
            event.type === "normal",
        ),
      );
      return;
    } else {
      const searchDate = async () => {
        const neww = [...dates, ...invitations];
        console.log("new", neww);
        const nuevasDates = neww.filter((e) => {
          const date = e.date.slice(0, 10);
          if (date === selectedDate && e.type === "normal") return e;
        });
        console.log("new2", nuevasDates);

        setFilteredEvents(nuevasDates);
      };
      searchDate();
    }
  }, [search, dates, selectedDate]);

  return (
    <View style={styles.frameGroup}>
      <Text style={styles.title}>Eventos</Text>
      {filteredEvents.map(
        (event) =>
          event?.type === "normal" && (
            <EventCard key={event?.id} event={event} />
          ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  frameGroup: {
    marginTop: 10,
    paddingHorizontal: 10,
    alignSelf: "stretch",
    paddingBottom: 80,
  },
  title: {
    fontSize: 16,
    color: Color.primario1,
    fontFamily: FontFamily.lato,
    fontWeight: "700",
  },
  boxContainer: {
    height: 100,
    borderRadius: Border.br_base,
    backgroundColor: Color.colorWhitesmoke_200,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: "10%",
  },
  textContainer: {
    flexDirection: "column",
    gap: 10,
  },
  subTitle: {
    color: Color.primario1,
    fontWeight: "600",
    fontSize: 15,
  },
  name: {
    color: Color.gris,
  },
});

export default Eventos;
