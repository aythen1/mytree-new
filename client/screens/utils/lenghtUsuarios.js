import { useMemo } from "react";

const useRelationsLength = (userData) => {
  return useMemo(() => {
    // Definimos las propiedades que contienen las relaciones familiares y de amigos
    const familyKeys = [
      "brothers",
      "cousins",
      "childrens",
      "uncles",
      "grandchildrens",
      "nephews",
    ];

    const friendsKeys = [
      "closeFriends",
      "schoolFriends",
      "workFriends",
      "universityFriends",
      "hobbyFriends",
    ];

    // Recorremos las propiedades de relaciones familiares y calculamos la longitud total
    const totalFamilyLength = familyKeys.reduce((acc, key) => {
      return acc + (userData[key]?.length || 0);
    }, 0);

    // Recorremos las propiedades de relaciones de amigos y calculamos la longitud total
    const totalFriendsLength = friendsKeys.reduce((acc, key) => {
      return acc + (userData[key]?.length || 0);
    }, 0);

    return { totalFamilyLength, totalFriendsLength };
  }, [userData]); // Solo recalcula cuando userData cambia
};

export default useRelationsLength;
