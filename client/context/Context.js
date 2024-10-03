import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getUserChats, updateMessages, userChats } from "../redux/actions/chat";
import axiosInstance from "../apiBackend";
import { addUserDiary } from "../redux/slices/diaries.slices";
import { getUserData } from "../redux/actions/user";
import { setAllChats } from "../redux/slices/chats.slices";
import {
  getAllNotifications,
  getAllUserNotifications,
} from "../redux/actions/notifications";
import { format, formatInTimeZone, toZonedTime } from "date-fns-tz";
import { getAllPosts } from "../redux/actions/posts";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [showInvitationSendModal, setShowInvitationSendModal] = useState(false);
  const [selectedRelationType, setSelectedRelationType] = useState("Amigos");
  const [selectedRelationShip, setSelectedRelationShip] =
    useState("Amigos íntimos");
  const [showSelectEventTypeModal, setShowSelectEventTypeModal] =
    useState(false);
  const [selectedUserToInvite, setSelectedUserToInvite] = useState();
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedPostTags, setSelectedPostTags] = useState([]);
  const [usersWithMessages, setUsersWithMessages] = useState([]);
  const [notReaded, setNotReaded] = useState(0);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showTaggedsModal, setShowTaggedsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [provisoryProfileImage, setProvisoryProfileImage] = useState();
  const [provisoryCoverImage, setProvisoryCoverImage] = useState();
  const [profileImage, setProfileImage] = useState();
  const [coverImage, setCoverImage] = useState();
  const [libraryImage, setLibraryImage] = useState();
  const [showHashtagsModal, setShowHashtagsModal] = useState(false);
  const [roomId, setRoomId] = useState();
  const { allUsers, userData } = useSelector((state) => state.users);
  // const [userData, setUserData] = useState()
  const [selectedPost, setSelectedPost] = useState();
  const [responseTo, setResponseTo] = useState();
  const [selectedComment, setSelectedComment] = useState();
  const [selectedSection, setSelectedSection] = useState("nube");

  const handleAddDiary = (category, date) => {
    const dateEdit = new Date(date);
    const dateString = dateEdit.toISOString().split("T")[0]; // Obtener solo el año-mes-día

    dispatch(
      addUserDiary({
        images: [],
        videos: [],
        date: dateString,
        category,
        id: "preDiary",
        title: "",
        creatorId: userData.id,
        description: "",
        privacyMode: "all",
        taggedUsers: [],
      }),
    );
    setEditingDiary("preDiary");
  };

  const getUser = async () => {
    const usuario = await AsyncStorage.getItem("user");
    const user = JSON.parse(usuario);
    // setUserData(user)
    dispatch(getUserData(user.id));
  };

  useEffect(() => {
    getUser();
  }, []);

  function transformHttpToHttps(url) {
    if (url.startsWith("http://")) {
      return url.replace("http://", "https://");
    } else {
      return url;
    }
  }

  const pickImage = async (source, imageUri) => {
    if (imageUri) {
      const profileImageData = {
        uri: imageUri,
        type: "image/jpg",
        name: imageUri?.split("/")?.reverse()[0]?.split(".")[0],
      };

      const profileImageForm = new FormData();
      profileImageForm.append("file", profileImageData);
      profileImageForm.append("upload_preset", "cfbb_profile_pictures");
      profileImageForm.append("cloud_name", "dnewfuuv0");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dnewfuuv0/image/upload",
        {
          method: "post",
          body: profileImageForm,
        },
      );
      const data = await response.json();
      const imageUrl = transformHttpToHttps(data.url);

      if (source === "profile") {
        return imageUrl;
      } else {
        setLibraryImage(imageUrl);
      }
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        source === "profile"
          ? setProvisoryProfileImage(result.assets[0].uri)
          : setProvisoryCoverImage(result.assets[0].uri);
        if (source === "profile") {
          const profileImageData = {
            uri: result.assets[0].uri,
            type: "image/jpg",
            name: result.assets[0].uri?.split("/")?.reverse()[0]?.split(".")[0],
          };

          const profileImageForm = new FormData();
          profileImageForm.append("file", profileImageData);
          profileImageForm.append("upload_preset", "cfbb_profile_pictures");
          profileImageForm.append("cloud_name", "dnewfuuv0");

          await fetch(
            "https://api.cloudinary.com/v1_1/dnewfuuv0/image/upload",
            {
              method: "post",
              body: profileImageForm,
            },
          )
            .then((res) => res.json())
            .then((data) => {
              // console.log('dataUrl from profile:', data.url)
              setProfileImage(transformHttpToHttps(data.url));
            });
        } else {
          const coverImageData = {
            uri: result.assets[0].uri,
            type: "image/jpg",
            name: result.assets[0].uri?.split("/")?.reverse()[0]?.split(".")[0],
          };

          const coverImageForm = new FormData();
          coverImageForm.append("file", coverImageData);
          coverImageForm.append("upload_preset", "cfbb_profile_pictures");
          coverImageForm.append("cloud_name", "dnewfuuv0");

          await fetch(
            "https://api.cloudinary.com/v1_1/dnewfuuv0/image/upload",
            {
              method: "post",
              body: coverImageForm,
            },
          )
            .then((res) => res.json())
            .then((data) => {
              // console.log('dataUrl from cover:', data.url)
              setCoverImage(transformHttpToHttps(data.url));
            });
        }
      }
    }
  };

  const formatDateToNormal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  function formatDate(dateString, userTimezone) {
    // Convertir la fecha de la base de datos (ahora correctamente almacenada) a un objeto Date
    const dbDateUTC = new Date(dateString);

    // Usar Intl.DateTimeFormat para ajustar dbDateUTC a la zona horaria del usuario
    const dbDateInUserTimezoneStr = new Intl.DateTimeFormat("en-US", {
      timeZone: userTimezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      hour12: false,
    }).format(dbDateUTC);

    // Convertir el string formateado a un objeto Date usando formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
    const [month, day, year, hour, minute, second] =
      dbDateInUserTimezoneStr.match(/\d+/g);
    const dbDateInUserTimezone = new Date(
      `${year}-${month}-${day}T${hour}:${minute}:${second}.000`,
    );

    // Obtener la fecha y hora actual en la zona horaria del usuario
    const nowInUserTimezoneStr = new Intl.DateTimeFormat("en-US", {
      timeZone: userTimezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      hour12: false,
    }).format(new Date());

    const [nMonth, nDay, nYear, nHour, nMinute, nSecond] =
      nowInUserTimezoneStr.match(/\d+/g);
    const nowInUserTimezone = new Date(
      `${nYear}-${nMonth}-${nDay}T${nHour}:${nMinute}:${nSecond}.000`,
    );

    // Calcular la diferencia en milisegundos entre la fecha de la base de datos y la fecha actual
    const diffMilliseconds = nowInUserTimezone - dbDateInUserTimezone;

    // Verificar si la diferencia es NaN o si hubo un error
    if (isNaN(diffMilliseconds)) {
      console.error("Error al calcular la diferencia de tiempo.");
      return null;
    }

    // Convertir la diferencia a segundos
    const diffSeconds = Math.floor(diffMilliseconds / 1000);

    // Calcular unidades de tiempo
    const seconds = diffSeconds % 60;
    const minutes = Math.floor(diffSeconds / 60) % 60;
    const hours = Math.floor(diffSeconds / (60 * 60)) % 24;
    const days = Math.floor(diffSeconds / (60 * 60 * 24));

    // Determinar la respuesta adecuada
    if (days > 0) {
      return `${days} día${days > 1 ? "s" : ""} hace`;
    } else if (hours > 0) {
      return `${hours} hora${hours > 1 ? "s" : ""} hace`;
    } else if (minutes > 0) {
      return `${minutes} minuto${minutes > 1 ? "s" : ""} hace`;
    } else {
      return `${seconds} segundo${seconds !== 1 ? "s" : ""} hace`;
    }
  }

  // Ejemplo de uso

  // Ejemplo de uso

  // Ejemplo de uso

  // Ejemplo de uso

  function getTimeFromDate(dateString) {
    // Create a new Date object from the UTC string
    const utcDate = new Date(dateString);

    // // Get the local time zone offset in milliseconds
    // const localOffsetMilliseconds = new Date().getTimezoneOffset() * 60000

    // Convert the UTC time to local time by adding the offset
    const localTime = utcDate;

    // Create a new Date object representing the local time
    const localDate = new Date(localTime);

    // Extract local hours and minutes
    const hours = localDate.getHours();
    const minutes = localDate.getMinutes();

    // Format hours and minutes
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Return formatted time
    return `${formattedHours}:${formattedMinutes}`;
  }

  const formatDateDifference = (date) => {
    const ahora = new Date();
    const fecha = new Date(date);
    const milisegundosDiferencia = ahora - fecha;
    const segundosDiferencia = Math.floor(milisegundosDiferencia / 1000);
    const minutosDiferencia = Math.floor(segundosDiferencia / 60);
    const horasDiferencia = Math.floor(minutosDiferencia / 60);

    if (horasDiferencia < 24) {
      if (horasDiferencia < 0) {
        return "Hace 1 segundo";
      }
      if (horasDiferencia === 0) {
        if (minutosDiferencia === 0) {
          return `Hace ${segundosDiferencia} segundos`;
        }
        return `Hace ${minutosDiferencia} minuto${minutosDiferencia === 1 ? "" : "s"}`;
      } else {
        return `Hace ${horasDiferencia} hora${horasDiferencia === 1 ? "" : "s"}`;
      }
    } else {
      const diasDiferencia = Math.floor(horasDiferencia / 24);
      return `Hace ${diasDiferencia} día${diasDiferencia === 1 ? "" : "s"}`;
    }
  };

  const [editingDiary, setEditingDiary] = useState();
  const [notReadedMessages, setNotReadedMessages] = useState();

  const getUsersMessages = async () => {
    const { data } = await axiosInstance.post("chat/chats", {
      userId: userData.id,
    });

    const convs = Object.keys(data);

    const notReadedConvMessages = convs
      .map((conv) =>
        data[conv].filter(
          (message) =>
            message.senderId !== userData.id && message.isReaded === false,
        ),
      )
      .flat();

    setNotReadedMessages(notReadedConvMessages);
    const notReaded = convs
      .map(
        (conv) =>
          data[conv].filter(
            (message) =>
              message.senderId !== userData.id && message.isReaded === false,
          ).length,
      )
      .reduce((acc, curr) => acc + curr, 0);
    setNotReaded(notReaded);

    if (Object.keys(data).length > 0) {
      const finalInfo = Object.keys(data).map((key) => {
        const otherUserId = key
          .split("_")
          .filter((singleId) => singleId !== userData.id)[0];

        const userInfo = allUsers.filter((user) => user.id === otherUserId)[0];
        const lastMessage = data[key].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        )[0];
        return { room: key, ...userInfo, lastMessage };
      });
      //fix
      const res = finalInfo.sort(
        (a, b) =>
          new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt),
      );
      dispatch(setAllChats(res));
      setUsersWithMessages(res);
    }
  };

  const socket = io(
    process.env.EXPO_PUBLIC_LOCAL_SOCKET ||
      "http://6f651255-2a5d-4271-a8c7-35730a2de342.pub.instances.scw.cloud:3010",
    // "http://192.168.0.77:3010",

    {
      transports: ["websocket"],
      query: {
        userId: userData?.id, // Enviar userId al conectar
      },
      // auth: {
      //   autoConnect: true,
      //   forceNew: true,
      //   addTrailingSlash: false,
      //   withCredentials: true
      // }
    },
  );

  socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("join", userData?.id);
  });

  socket.on("disconnect", () => {
    // console.log('Disconnected from server')
    setRoomId();
  });

  socket.on("error", (error) => {
    console.error("Socket connection error:", error);
  });

  socket.on("notification", (data) => {
    console.log("New notification:", data);
    return dispatch(getAllUserNotifications(userData?.id));

    // Manejar la actualización de notificaciones en la app
  });

  socket.on("relationship", (data) => {
    console.log("New relationship:", data);
    dispatch(getAllPosts(userData?.id));
    return dispatch(getUserData(userData?.id));

    // Manejar la actualización de notificaciones en la app
  });

  socket.on("post-update", (data) => {
    console.log("New post update:", data);
    // Aquí puedes actualizar la lista de posts
  });

  socket.on("joinedRoom", (room) => {
    console.log("Joined to room: ", room);
    setRoomId(room);
  });

  socket.on("chats", (room) => {
    console.log("ACTUALIZADA LO CHATS", room);
    dispatch(getUserChats(userData?.id));
  });

  socket.on("leaveRoom", (room) => {
    console.log("Leaving room: ", room);
    setRoomId();
  });

  socket.on("message-server", (msg) => {
    console.log("New message:", msg);
    dispatch(updateMessages(msg));
  });

  const joinRoom = (room) => {
    console.log(room, "room");
    socket.emit("joinGroup", { room: room });
  };

  const leaveRoom = (room) => {
    socket.emit("leaveRoom", { room });
  };

  const sendMessage = (message, sender, receiver, isGroup) => {
    console.log("=============SENDING MESSAGE=============");
    console.log("sending message", {
      message,
      sender,
      receiver,
    });
    socket.emit("message", { message, sender, receiver, isGroup });
  };

  const sortByDate = (array) => {
    return [...array].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return dateA - dateB;
    });
  };
  const [showResponses, setShowResponses] = useState(false);

  return (
    <Context.Provider
      value={{
        pickImage,
        usersWithMessages,
        setUsersWithMessages,
        leaveRoom,
        roomId,
        setRoomId,
        sendMessage,
        joinRoom,
        showInvitationSendModal,
        formatDate,
        selectedSection,
        setSelectedSection,
        setShowInvitationSendModal,
        getUsersMessages,
        selectedPostTags,
        selectedHashtags,
        sortByDate,
        showResponses,
        setShowResponses,
        selectedRelationType,
        notReaded,
        setNotReaded,
        setSelectedRelationType,
        selectedRelationShip,
        setSelectedRelationShip,
        selectedUserToInvite,
        formatDateToNormal,
        setSelectedUserToInvite,
        editingDiary,
        setEditingDiary,
        setSelectedHashtags,
        setSelectedPostTags,
        showHashtagsModal,
        setShowHashtagsModal,
        showQrModal,
        setShowQrModal,
        showCamera,
        showTaggedsModal,
        setShowTaggedsModal,
        showShareModal,
        getTimeFromDate,
        setShowShareModal,
        setShowCamera,
        libraryImage,
        setLibraryImage,
        coverImage,
        showSelectEventTypeModal,
        notReadedMessages,
        setNotReadedMessages,
        setShowSelectEventTypeModal,
        formatDateDifference,
        setCoverImage,
        profileImage,
        setProfileImage,
        provisoryCoverImage,
        setProvisoryCoverImage,
        showCommentsModal,
        setShowCommentsModal,
        provisoryProfileImage,
        setProvisoryProfileImage,
        handleAddDiary,
        userData,
        selectedPost,
        setSelectedPost,
        responseTo,
        setResponseTo,
        selectedComment,
        setSelectedComment,
        // setUserData
      }}
    >
      {children}
    </Context.Provider>
  );
};
