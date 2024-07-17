import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Touchable,
  Pressable
} from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { Camera, CameraView } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { Context } from '../../context/Context'
import {
  Border,
  Color,
  FontFamily,
  FontSize,
  Padding
} from '../../GlobalStyles'
import PagerView from 'react-native-pager-view'
import { handleSelect } from '../Memories/utils/utils'
import { LinearGradient } from 'expo-linear-gradient'
import { Picker } from '@react-native-picker/picker'
import {Feather} from 'react-native-vector-icons'

const ImagePickerModal = ({
  onClose,
  setPickedImages,
  pickedImages,
  fromEvent
}) => {
  const { pickImage, libraryImage } =
    useContext(Context)
  const navigation = useNavigation()
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [cameraType, setCameraType] = useState(Camera?.Constants?.Type?.back)
  const [showSelection, setShowSelection] = useState(true)
  const [hasPermission, setHasPermission] = useState(null)
  const [cameraRef, setCameraRef] = useState(null)
  const cameraReff = useRef(null)
  const [facing, setFacing] = useState('back')
  const [multiSelect, setMultiSelect] = useState([])
  const [album, setAlbum] = useState([])
  const [albumData, setAlbumData] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState({ title: 'Camera' })
  const [showCamera, setShowCamera] = useState(false)

  useEffect(() => {
    obtenerImagenesDeGaleria()
  }, [])

  const obtenerImagenesDeGaleria = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status !== 'granted') {
      console.error('Permiso denegado para acceder a la galería de imágenes.')
      return
    }

    const assets = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true
    })
    const arr = []
    const arr2 = []
    assets.map((e) => arr.push(e.title))
    assets.map((e) => arr2.push(e))
    setAlbum(arr)
    setAlbumData(arr2)
  }

  const obtenerImagenesDeGalerias = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status !== 'granted') {
      console.error('Permiso denegado para acceder a la galería de imágenes.')
      return
    }
    const filtro = albumData.filter((e) => e?.title == selectedAlbum?.title)
    const assets = await MediaLibrary.getAssetsAsync({ album: filtro[0] })
    const imagesArray = assets?.assets ?? []
    setImages(imagesArray)
  }

  useEffect(() => {
    if (selectedAlbum !== '') {
      obtenerImagenesDeGalerias()
    }
  }, [selectedAlbum])

  const handleSeleccionarImagen = (imagen) => {
    console.log('imagen: ', imagen)
    setSelectedImage(imagen)
    pickImage('a', imagen.uri)
  }

  const changePictureMode = () => {
    console.log(
      'setting camera mode to: ',
      facing === 'back' ? 'front' : 'back'
    )
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'))
  }

  const takePicture = async () => {
    console.log('ON TAKE PICTURE')
    if (cameraReff?.current) {
      const photo = await cameraReff.current.takePictureAsync()
      // pickImage('a', photo.uri)
      console.log('PHOTO',photo)
      setPickedImages([...pickedImages,photo])
      // setSelectedImage(photo)
      setShowCamera(false)
    }
  }
  console.log('pickedImages', pickedImages)
  if (showCamera)
    return (
      <CameraView
        ref={cameraReff}
        facing={facing}
        style={{ height:'100%', position: 'absolute', top: 0, left: 0 }}
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
                }}
              ></View>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </CameraView>
    )
  return (
    <View
      style={{
        backgroundColor: Color.white,
        width: '100%',
        overflow: 'hidden',
        padding: 15,
        gap: 20,
        paddingTop: 20,
        borderTopLeftRadius: Border.br_11xl,
        borderTopRightRadius: Border.br_11xl,
        position: 'absolute',
        bottom: 0
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          style={{ gap: 5, alignItems: 'center', flexDirection: 'row' }}
        >
          <Picker
            style={{ width: '100%', height: 40, justifyContent: 'flex-start' }}
            selectedValue={selectedAlbum}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue, 'value')
              setSelectedAlbum(itemValue)
            }}
          >
            {albumData &&
              albumData.map((e, i) => {
                return <Picker.Item key={i} label={e.title} value={e} />
              })}
          </Picker>
        </TouchableOpacity>
        <View
          style={{ gap: 10, alignItems: 'center', flexDirection: 'row' }}
        ></View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          maxHeight: ((Dimensions.get('window').width - 33) / 4) * 2 + 20
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
              onPress={() => {
                if (fromEvent) {
                  setPickedImages([imagen])
                  return
                }
                if (showSelection) {
                  handleSelect(
                    imagen,
                    setSelectedImage,
                    pickedImages,
                    setPickedImages
                  )
                } else {
                  handleSeleccionarImagen(imagen)
                }
              }}
            >
              {pickedImages.find((img, i) => imagen.id === img.id) && (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: Color.secundario,
                    borderRadius: 100,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 10,
                    right: 10,
                    zIndex: 800
                  }}
                >
                  {fromEvent && (
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 11,
                        fontWeight: '700'
                      }}
                    >
                      ✓
                    </Text>
                  )}
                  {!fromEvent && (
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      {pickedImages.findIndex(
                        (element) => element.id === imagen.id
                      ) + 1}
                    </Text>
                  )}
                </View>
              )}
              <Image
                source={{ uri: imagen.uri }}
                style={{
                  width: (Dimensions.get('window').width - 33) / 4,
                  height: (Dimensions.get('window').width - 33 + 30) / 4,
                  borderRadius: 2
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Pressable onPress={onClose}>
        <LinearGradient
          style={{
            paddingVertical: Padding.p_sm,
            backgroundColor: Color.linearBoton,
            borderRadius: Border.br_11xl,
            justifyContent: 'center',
            alignSelf: 'center',
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row'
          }}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <Text
            style={{
              letterSpacing: 1,
              lineHeight: 24,
              color: Color.white,
              textAlign: 'center',
              fontSize: FontSize.size_base,
              fontFamily: FontFamily.lato
            }}
          >
            Aceptar
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  )
}

export default ImagePickerModal
