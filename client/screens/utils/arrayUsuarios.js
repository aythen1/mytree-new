const filterFriendsFamily = (userData) => {
  // Definir las relaciones para familiares y amigos
  const familyKeys = [
    "brothers",
    "cousins",
    "childrens",
    "uncles",
    "grandchildrens",
    "nephews",
  ];

  const friendKeys = [
    "closeFriends",
    "schoolFriends",
    "workFriends",
    "universityFriends",
    "hobbyFriends",
  ];

  // Obtener todos los familiares
  let familyUsers = familyKeys.reduce((acc, key) => {
    return acc.concat(userData[key] || []);
  }, []);

  // Obtener todos los amigos
  let friendUsers = friendKeys.reduce((acc, key) => {
    return acc.concat(userData[key] || []);
  }, []);

  // Ordenar ambos arrays alfabéticamente por nombre
  familyUsers.sort((a, b) => a.name.localeCompare(b.name));
  friendUsers.sort((a, b) => a.name.localeCompare(b.name));

  return {
    family: familyUsers,
    friends: friendUsers,
  };
};

export default filterFriendsFamily;
