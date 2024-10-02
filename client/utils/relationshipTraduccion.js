export default function relacionEspanol(selectedRelationShip) {
  switch (selectedRelationShip) {
    case "closeFriend":
      return "Amigos íntimos";
    case "schoolFriend":
      return "Colegio";
    case "workFriend":
      return "Trabajo";
    case "universityFriend":
      return "Universidad";
    case "hobbyFriend":
      return "Afición";
    case "brother":
      return "Hermano";
    case "cousin":
      return "Primo";
    case "children":
      return "Hijo";
    case "uncle":
      return "Tío";
    case "grandchildren":
      return "Nieto";
    case "nephew":
      return "Sobrino";
    default:
      return ""; // Valor por defecto para relaciones
  }
}
