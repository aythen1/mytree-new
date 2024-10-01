const sortedUsers = (userData) => {
  const relationKeys = [
    "brothers",
    "cousins",
    "childrens",
    "uncles",
    "grandchildrens",
    "closeFriends",
    "schoolFriends",
    "workFriends",
    "universityFriends",
    "hobbyFriends",
    "nephews",
  ];

  // Recorremos todas las propiedades de relaciones y las concatenamos en un solo array
  let allUsers = relationKeys.reduce((acc, key) => {
    return acc.concat(userData[key] || []);
  }, []);

  // Ordenamos los usuarios alfabéticamente por nombre
  allUsers.sort((a, b) => a.name.localeCompare(b.name));

  return allUsers;
};

export default sortedUsers;
