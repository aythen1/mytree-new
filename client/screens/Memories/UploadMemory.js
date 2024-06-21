import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Touchable
} from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { Camera, CameraView } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { Context } from '../../context/Context'

const UploadMemory = () => {
  const { pickImage, libraryImage, showCamera, setShowCamera } =
    useContext(Context)
  const navigation = useNavigation()
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [cameraType, setCameraType] = useState(Camera?.Constants?.Type?.back)

  useEffect(() => {
    obtenerImagenesDeGaleria()
  }, [])

  const obtenerImagenesDeGaleria = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status !== 'granted') {
      console.error('Permiso denegado para acceder a la galería de imágenes.')
      return
    }

    const assets = await MediaLibrary.getAssetsAsync()
    const imagesArray = assets?.assets ?? []
    setImages(imagesArray)
  }

  const handleSeleccionarImagen = (imagen) => {
    console.log('imagen: ', imagen)
    setSelectedImage(imagen)
    pickImage('a', imagen.uri)
  }
  const [hasPermission, setHasPermission] = useState(null)
  const [cameraRef, setCameraRef] = useState(null)
  const cameraReff = useRef(null)
  const [facing, setFacing] = useState('back')

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const changePictureMode = () => {
    console.log(
      'setting camera mode to: ',
      facing === 'back' ? 'front' : 'back'
    )
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'))
  }

  useEffect(() => {
    console.log('selectedImage changed', selectedImage)
  }, [selectedImage])

  // const takePicture = async () => {
  //   console.log('on takePicture!')
  //   if (cameraRef) {
  //     const photo = await cameraRef.takePictureAsync()
  //     console.log(photo)
  //     setSelectedImage(photo)
  //     pickImage('a', photo.uri)
  //     setShowCamera(false)
  //   }
  // }
  const takePicture = async () => {
    if (cameraReff?.current) {
      const photo = await cameraReff.current.takePictureAsync()
      pickImage('a', photo.uri)
      setSelectedImage(photo)
      // pickImageFromCamera(selectedPicture, photo.uri);

      setShowCamera(false)
      // You can handle the taken photo here, such as displaying it or saving it.
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {showCamera ? (
        <CameraView
          ref={cameraReff}
          facing={facing}
          style={{ flex: 1 }}
          mode="picture"
          FocusMode="on"
          onCameraReady={(e) => console.log(e, 'esto es e')}

          // cameraType="back"
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', top: 22, left: 18 }}
              onPress={() => setShowCamera(false)}
            >
              <Image
                style={{
                  height: 20,
                  width: 20
                }}
                contentFit="cover"
                source={require('../../assets/whiteCross.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={changePictureMode}
              style={{ position: 'absolute', top: 18, right: 18 }}
            >
              <Entypo name="cycle" color={'#fff'} size={29} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                width: '100%',
                marginBottom: 30,
                position: 'relative'
              }}
            >
              <TouchableOpacity
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 100,
                  backgroundColor: 'transparent',
                  borderWidth: 6,
                  borderColor: '#7EC18C',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={takePicture}
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    backgroundColor: '#7EC18C',

                    color: 'white'
                  }}
                ></View>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={{ gap: 15, paddingHorizontal: 15 }}>
          <View>
            <Image
              contentFit="cover"
              style={{ width: 87 * 0.8, height: 65 * 0.8 }}
              source={require('../../assets/image-6.png')}
            />
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              marginTop: -20,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('Muro')}>
              <Image
                contentFit="cover"
                style={{ width: 19, height: 19 }}
                source={require('../../assets/group-6846.png')}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: 700, color: '#292A2B' }}>
              Subir recuerdo
            </Text>
            <TouchableOpacity
              disabled={!selectedImage}
              onPress={() => navigation.navigate('Organizador')}
            >
              <Image
                contentFit="cover"
                style={{ width: 27, height: 27 }}
                source={require('../../assets/back7.png')}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              contentFit="cover"
              style={{
                width: Dimensions.get('window').width - 30,
                height: Dimensions.get('window').width,
                borderRadius: 8
              }}
              source={
                selectedImage
                  ? { uri: selectedImage?.uri }
                  : require('../../assets/frame-1547755266.png')
              }
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View
              style={{ gap: 5, alignItems: 'center', flexDirection: 'row' }}
            >
              <Text style={{ color: '#787878', fontSize: 18, fontWeight: 500 }}>
                Recientes
              </Text>
              <Image
                source={require('../../assets/chevDown.png')}
                style={{
                  width: 13,
                  height: 6
                }}
              />
            </View>
            <View
              style={{ gap: 10, alignItems: 'center', flexDirection: 'row' }}
            >
              <TouchableOpacity
                style={{
                  gap: 5,
                  backgroundColor: '#D9D9D9',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderRadius: 5,
                  paddingHorizontal: 12,
                  height: 32
                }}
              >
                <Image
                  source={require('../../assets/multi-select-icon.png')}
                  style={{
                    width: 19,
                    height: 16
                  }}
                />
                <Text style={{ color: '#fff', fontSize: 12, fontWeight: 500 }}>
                  SELECCIONAR VARIOS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowCamera(true)}
                style={{
                  gap: 5,
                  backgroundColor: '#D9D9D9',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderRadius: 5,
                  width: 32,
                  height: 32,
                  justifyContent: 'center'
                }}
              >
                <Image
                  source={require('../../assets/cameraIcon.png')}
                  style={{
                    width: 21.5,
                    height: 19.5
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height:
                Dimensions.get('window').height -
                (Dimensions.get('window').width + 30) -
                190
            }}
          >
            <View
              style={{
                gap: 1,
                flex: 1,
                paddingBottom: 10,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start'
              }}
            >
              {images.map((imagen, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSeleccionarImagen(imagen)}
                >
                  <Image
                    source={{ uri: imagen.uri }}
                    style={{
                      width: (Dimensions.get('window').width - 33) / 4,
                      height: (Dimensions.get('window').width - 33 + 30) / 4,
                      borderRadius: 1
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default UploadMemory
