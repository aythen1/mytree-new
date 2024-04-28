
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'
import { useDispatch, useSelector } from 'react-redux'

export const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [showInvitationSendModal,setShowInvitationSendModal] = useState(false)
  const [selectedRelationType,setSelectedRelationType] = useState('Amigos')
  const [selectedRelationShip,setSelectedRelationShip] = useState('Amigos íntimos')
  const [selectedUserToInvite,setSelectedUserToInvite] = useState()
  const [selectedHashtags, setSelectedHashtags] = useState([])
  const [selectedPostTags,setSelectedPostTags] = useState([])
  const [showQrModal, setShowQrModal] = useState(false)
  const [taggedsData, setTaggedsData] = useState()
  const [showTaggedsModal, setShowTaggedsModal] = useState(false)
  const [showShareModal,setShowShareModal] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
    const [provisoryProfileImage, setProvisoryProfileImage] = useState()
    const [provisoryCoverImage, setProvisoryCoverImage] = useState()
    const [profileImage, setProfileImage] = useState()
    const [coverImage, setCoverImage] = useState()
    const [libraryImage, setLibraryImage] = useState()
    const [showHashtagsModal,setShowHashtagsModal] = useState(false)


    function transformHttpToHttps(url) {
        if (url.startsWith('http://')) {
          return url.replace('http://', 'https://')
        } else {
          return url
        }
      }

    const pickImage = async (source, imageUri) => {
        console.log('source: ',source)
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
             console.log('dataUrl from uriImg:', data.url)
              setLibraryImage(transformHttpToHttps(data.url))
            })
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
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

return (
    <Context.Provider
      value={{
        pickImage,showInvitationSendModal,setShowInvitationSendModal,selectedPostTags,selectedHashtags,selectedRelationType,setSelectedRelationType,selectedRelationShip,setSelectedRelationShip,selectedUserToInvite,setSelectedUserToInvite, setSelectedHashtags,setSelectedPostTags,showHashtagsModal,setShowHashtagsModal,showQrModal, setShowQrModal,showCamera,showTaggedsModal, setShowTaggedsModal,showShareModal,setShowShareModal,  setShowCamera,libraryImage,setLibraryImage,coverImage,setCoverImage,profileImage,setProfileImage,provisoryCoverImage,setProvisoryCoverImage,provisoryProfileImage,setProvisoryProfileImage
      }}
    >
      {children}
    </Context.Provider>
  )
}