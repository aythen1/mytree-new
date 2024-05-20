import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { updateMessages } from '../redux/actions/chat'
import axiosInstance from '../apiBackend'

export const Context = createContext()

export const ContextProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [showInvitationSendModal, setShowInvitationSendModal] = useState(false)
  const [selectedRelationType, setSelectedRelationType] = useState('Amigos')
  const [selectedRelationShip, setSelectedRelationShip] =
    useState('Amigos íntimos')
  const [selectedUserToInvite, setSelectedUserToInvite] = useState()
  const [selectedHashtags, setSelectedHashtags] = useState([])
  const [selectedPostTags, setSelectedPostTags] = useState([])
  const [usersWithMessages, setUsersWithMessages] = useState([])
  const [showQrModal, setShowQrModal] = useState(false)
  const [showTaggedsModal, setShowTaggedsModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [provisoryProfileImage, setProvisoryProfileImage] = useState()
  const [provisoryCoverImage, setProvisoryCoverImage] = useState()
  const [profileImage, setProfileImage] = useState()
  const [coverImage, setCoverImage] = useState()
  const [libraryImage, setLibraryImage] = useState()
  const [showHashtagsModal, setShowHashtagsModal] = useState(false)
  const [roomId, setRoomId] = useState()
  const { allUsers } = useSelector((state) => state.users)
  const [userData, setUserData] = useState()

  const getUser = async () => {
    const usuario = await AsyncStorage.getItem('user')
    const user = JSON.parse(usuario)
    setUserData(user)
  }

  useEffect(() => {
    getUser()
  }, [])

  function transformHttpToHttps(url) {
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://')
    } else {
      return url
    }
  }

  const pickImage = async (source, imageUri) => {
    console.log('source: ', source)
    console.log('imageUri:', imageUri)
    if (imageUri) {
      const profileImageData = {
        uri: imageUri,
        type: 'image/jpg',
        name: imageUri?.split('/')?.reverse()[0]?.split('.')[0]
      }

      const profileImageForm = new FormData()
      profileImageForm.append('file', profileImageData)
      profileImageForm.append('upload_preset', 'cfbb_profile_pictures')
      profileImageForm.append('cloud_name', 'dnewfuuv0')

      await fetch('https://api.cloudinary.com/v1_1/dnewfuuv0/image/upload', {
        method: 'post',
        body: profileImageForm
      })
        .then((res) => res.json())
        .then((data) => {
          //  console.log('dataUrl from uriImg:', data.url)
          setLibraryImage(transformHttpToHttps(data.url))
        })
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      })

      if (!result.canceled) {
        source === 'profile'
          ? setProvisoryProfileImage(result.assets[0].uri)
          : setProvisoryCoverImage(result.assets[0].uri)
        if (source === 'profile') {
          const profileImageData = {
            uri: result.assets[0].uri,
            type: 'image/jpg',
            name: result.assets[0].uri?.split('/')?.reverse()[0]?.split('.')[0]
          }

          const profileImageForm = new FormData()
          profileImageForm.append('file', profileImageData)
          profileImageForm.append('upload_preset', 'cfbb_profile_pictures')
          profileImageForm.append('cloud_name', 'dnewfuuv0')

          await fetch(
            'https://api.cloudinary.com/v1_1/dnewfuuv0/image/upload',
            {
              method: 'post',
              body: profileImageForm
            }
          )
            .then((res) => res.json())
            .then((data) => {
              // console.log('dataUrl from profile:', data.url)
              setProfileImage(transformHttpToHttps(data.url))
            })
        } else {
          const coverImageData = {
            uri: result.assets[0].uri,
            type: 'image/jpg',
            name: result.assets[0].uri?.split('/')?.reverse()[0]?.split('.')[0]
          }

          const coverImageForm = new FormData()
          coverImageForm.append('file', coverImageData)
          coverImageForm.append('upload_preset', 'cfbb_profile_pictures')
          coverImageForm.append('cloud_name', 'dnewfuuv0')

          await fetch(
            'https://api.cloudinary.com/v1_1/dnewfuuv0/image/upload',
            {
              method: 'post',
              body: coverImageForm
            }
          )
            .then((res) => res.json())
            .then((data) => {
              // console.log('dataUrl from cover:', data.url)
              setCoverImage(transformHttpToHttps(data.url))
            })
        }
      }
    }
  }

  function formatDate(dateString) {
    // Parse the input date string into a Date object
    const date = new Date(dateString)

    // Get the current date and time
    const now = new Date()

    // Calculate the difference in milliseconds between now and the provided date
    const diffMilliseconds = now - date

    // Convert the difference to seconds
    const diffSeconds = Math.floor(diffMilliseconds / 1000)

    // Calculate time units
    const seconds = diffSeconds % 60
    const minutes = Math.floor(diffSeconds / 60) % 60
    const hours = Math.floor(diffSeconds / (60 * 60)) % 24
    const days = Math.floor(diffSeconds / (60 * 60 * 24))

    // Determine the appropriate response based on the time elapsed
    if (days > 0) {
      // More than a day ago
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      return formattedDate
    } else if (hours > 0) {
      // Less than a day but more than an hour ago
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (minutes > 0) {
      // Less than an hour but more than a minute ago
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else {
      // Less than a minute ago
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`
    }
  }

  function getTimeFromDate(dateString) {
    const utcDate = new Date(dateString)

    const localTime = utcDate

    const localDate = new Date(localTime)

    const hours = localDate.getHours()
    const minutes = localDate.getMinutes()

    const formattedHours = hours < 10 ? '0' + hours : hours
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes

    return `${formattedHours}:${formattedMinutes}`
  }

  const getUsersMessages = () => {
    const getConvMessages = async (user) => {
      try {
        const { data } = await axiosInstance.get(
          `chat/room?limit=${10}&senderId=${userData.id}&receiverId=${user.id}`
        )
        console.log('data from chat with ', user.id, data)
        const filterByDelete = data.filter((message) => {
          const senderOrReceiver =
            message.senderId === userData.id ? 'sender' : 'receiver'
          if (senderOrReceiver === 'sender') {
            if (message.senderDelete === true) {
              return false
            }
            return true
          }
          if (senderOrReceiver === 'receiver') {
            if (message.receiverDelete === true) {
              return false
            }
            return true
          }
        })
        return filterByDelete
      } catch (error) {
        console.error('Error fetching data:', error)
        return []
      }
    }
    Promise.all(
      allUsers
        ?.filter((user) => user?.id !== userData.id)
        ?.map(async (user) => ({
          user,
          data: await getConvMessages(user)
        }))
    )
      .then((filteredUsers) => {
        const usersWithMessages = filteredUsers?.filter(
          (user) => user?.data && user?.data.length > 0
        )

        const sortedUsersWithMessages = usersWithMessages?.sort(
          (a, b) =>
            new Date(b.data[0].createdAt) - new Date(a.data[0].createdAt)
        )

        setUsersWithMessages(sortedUsersWithMessages?.map(({ user }) => user))
      })
      .catch((error) => {
        console.error('Error fetching messages for users:', error)
      })
  }

  const socket = io(
    'http://cda3a8c0-e981-4f8d-808f-a9a389c5174e.pub.instances.scw.cloud:3010',
    {
      transports: ['websocket']
      // auth: {
      //   autoConnect: true,
      //   forceNew: true,
      //   addTrailingSlash: false,
      //   withCredentials: true
      // }
    }
  )

  socket.on('connect', () => {
    console.log('Connected to server')
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server')
    setRoomId()
  })

  socket.on('error', (error) => {
    console.error('Socket connection error:', error)
  })

  socket.on('joinedRoom', (room) => {
    console.log('Joined to room: ', room)
    setRoomId(room)
  })

  socket.on('leaveRoom', (room) => {
    console.log('Leaving room: ', room)
    setRoomId()
  })

  socket.on('message-server', (msg) => {
    console.log('New message:', msg)
    dispatch(updateMessages(msg))
  })

  const joinRoom = (sender, receiver) => {
    console.log('on joinRoom with id: ', sender, receiver)
    socket.emit('joinRoom', { sender, receiver })
  }

  const leaveRoom = (sender, receiver) => {
    console.log('on leaveRoom with id: ', sender, receiver)
    socket.emit('leaveRoom', { sender, receiver })
  }

  const sendMessage = (message, sender, receiver) => {
    socket.emit('message', { message, sender, receiver })
  }

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
        setShowInvitationSendModal,
        getUsersMessages,
        selectedPostTags,
        selectedHashtags,
        selectedRelationType,
        setSelectedRelationType,
        selectedRelationShip,
        setSelectedRelationShip,
        selectedUserToInvite,
        setSelectedUserToInvite,
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
        setCoverImage,
        profileImage,
        setProfileImage,
        provisoryCoverImage,
        setProvisoryCoverImage,
        provisoryProfileImage,
        setProvisoryProfileImage,
        userData,
        setUserData
      }}
    >
      {children}
    </Context.Provider>
  )
}
