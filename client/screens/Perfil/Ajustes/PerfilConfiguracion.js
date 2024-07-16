import React, { useState, useRef, useEffect, useContext } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  FontFamily,
  Color,
  FontSize,
  Border,
  Padding
} from '../../../GlobalStyles'
import ENTRADACREADA from '../../../components/ENTRADACREADA'
import HeaderIcons from '../../../components/HeaderIcons'
import CalendarMuroSVG from '../../../components/svgs/CalendarMuroSVG'
import BookSVG from '../../../components/svgs/BookSVG'
import NotificationsMuroSVG from '../../../components/svgs/NotificationsMuroSVG'
import axios from 'axios';
import axiosInstance, { BACKURL } from '../../../apiBackend'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../../redux/actions/user'
import { Context } from '../../../context/Context'
import { CameraView } from 'expo-camera'
import SimboloSVG from '../SimboloSVG'
import { Entypo } from '@expo/vector-icons'

const PerfilConfiguracion = () => {

  const { userData: usuario } = useSelector((state) => state.users)
  const [showImageOptions, setShowImageOptions] = useState(false)
  const [facing, setFacing] = useState('back')
  const { pickImage, provisoryProfileImage, profileImage } = useContext(Context)
  const dispatch = useDispatch()
  const [showCamera, setShowCamera] = useState(false)


  const navigation = useNavigation()
  const nombreInputRef = useRef(null)
  const [modalCreate, setModalCreate] = useState(false)
  const [inputsBros, setInputsBros] = useState([])
  const [dataToSend, setDataToSend] = useState({
    username: "",
    birthDate: "",
    address: "",
  })

  const cameraReff = useRef(null)

  const takePicture = async () => {
    if (cameraReff) {
      const photo = await cameraReff.current.takePictureAsync()
      setSelectedImage(photo)
      pickImage('profile', photo.uri)
      setShowCamera(false)
    }
  }
  useEffect(() => {
    if (profileImage) {
      console.log('llego')
      axiosInstance.patch(`/user/${usuario?.id}`, {
        profilePicture: profileImage
      })
    }
    dispatch(getUserData(usuario?.id))
  }, [profileImage])

  const changePictureMode = async () => {
    setFacing((prev) => (prev == 'back' ? 'front' : 'back'))
  }



  const onCloseModalCreate = () => {
    setModalCreate(false)
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(`${BACKURL}/user/${usuario.id}`, dataToSend)
      if (res.data) {
        setModalCreate(true)
        dispatch(getUserData(usuario.id))
      }

    } catch (error) {
      console.log(error)
    }
  }

  

 if (!showCamera) {
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.viewContainer}>
      <ScrollView contentContainerStyle={{ paddingBottom: 130 }} style={styles.frameParent} showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.parentIcons}>
            <Pressable onPress={() => navigation.navigate('Muro')}>
              <Image
                style={styles.image6Icon}
                contentFit="cover"
                source={require('../../../assets/image-6.png')}
              />
            </Pressable>
            <View style={styles.iconlylightOutlinecalendarParent}>
              <HeaderIcons
                icons={[
                  <CalendarMuroSVG />,
                  <BookSVG />,
                  <NotificationsMuroSVG />
                ]}
              />
            </View>
          </View>
          <View style={[styles.backParent, styles.parentFlexBox]}>
            <Pressable
              style={styles.iconlylightOutlinecalendar}
              onPress={() => navigation.navigate('PerfilAjustes')}
            >
              <Image
                style={[styles.icon, styles.iconLayout1]}
                contentFit="cover"
                source={require('../../../assets/back.png')}
              />
            </Pressable>
            <Text style={styles.ajustes}>Configuración</Text>
          </View>
        </View>

        <View style={styles.centralContainer}>
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={{width:"100%"}}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Cambiar foto de perfil
              </Text>
              <View style={{ width: "100%",height:200, justifyContent: 'center',alignItems:"center" }}>
                <Pressable
                  onPress={() => setShowImageOptions(!showImageOptions)}
                  style={{ alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    flexDirection: 'row' , position:"relative"}}
                >
                    <Pressable
                      onPress={() => setShowCamera(true)}
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: Color.secundario,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position:"absolute",top: 30,right:0,zIndex:999
                      }}
                    >
                      <Image
                        style={{ width: 16, height: 16 }}
                        contentFit="cover"
                        source={require('../../../assets/cameraIcon.png')}
                      />
                    </Pressable>
                  {!provisoryProfileImage && !usuario?.profilePicture ? (
                    <Image
                      style={{ ...styles.perfilItem, borderRadius: 100 }}
                      contentFit="cover"
                      source={require('../../../assets/group-1171276683.png')}
                    />
                  ) : (
                    <Image
                      style={{ ...styles.perfilItem, borderRadius: 100 }}
                      contentFit="cover"
                      source={{
                        uri:
                          profileImage ||
                          provisoryProfileImage ||
                          usuario.profilePicture
                      }}
                    />
                  )}
                 
                </Pressable>
                {showImageOptions && (
                  <View
                    style={{ position: 'absolute', top: 0, right: '25%', gap: 10 }}
                  >
                    <Pressable
                      onPress={() => pickImage('profile')}
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: Color.secundario,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <SimboloSVG color={'#fff'} />
                    </Pressable>
                    <Pressable
                      onPress={() => setShowCamera(true)}
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: Color.secundario,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Image
                        style={{ width: 16, height: 16 }}
                        contentFit="cover"
                        source={require('../../../assets/cameraIcon.png')}
                      />
                    </Pressable>
                    
                  </View>
                )}
                 <TouchableOpacity
                      onPress={() => pickImage('profile')}
                      style={{
                        width: 120,
                        height: 30,
                        backgroundColor: Color.secundario,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                     <Text style={{color:"white"}}>Subir imagen</Text>
                    </TouchableOpacity>
              </View>
            </View>

          </View>
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Nombre completo
              </Text>
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo,{width:"100%"}]}
                ref={nombreInputRef}
                placeholder={usuario.username}
                onChangeText={(text) => setDataToSend({ ...dataToSend, ["username"]: text })}
                value={dataToSend.username}
              />
              <Image
                style={[styles.vectorIcon1, styles.vectorIconLayout]}
                contentFit="cover"
                source={require('../../../assets/vector47.png')}
              />
              </View>
            </View>
          
          </View>
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Fecha de nacimiento
              </Text>
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"100%"}}>

              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo,{width:"100%"}]}
                ref={nombreInputRef}
                placeholder={usuario.birthDate || "Fecha de nacimiento"}
                onChangeText={(text) => setDataToSend({ ...dataToSend, ["birthDate"]: text })}
                value={dataToSend.birthDate}
              />
         
              </View>
            </View>
          
          </View>
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Ubicación
              </Text>
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"100%"}}>

              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo,{width:"100%"}]}
                ref={nombreInputRef}
                placeholder={usuario.address || "Ubicación"}
                onChangeText={(text) => setDataToSend({ ...dataToSend, ["address"]: text })}
                value={dataToSend.address}
              />
              
              </View>
            </View>
        
          </View>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require('../../../assets/line-811.png')}
          />
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Madre
              </Text>
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"100%"}}>

              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo]}
                ref={nombreInputRef}
                placeholder="Agregar madre"
              />
          
              </View>
            </View>
           
          </View>
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Padre
              </Text>
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"100%"}}>

              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo]}
                ref={nombreInputRef}
                placeholder="Agregar padre"
              />
        
              </View>
            </View>
         
          </View>

          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require('../../../assets/line-811.png')}
          />

          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Hermanos
              </Text>
              
              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo]}
                ref={nombreInputRef}
                placeholder="Agregar hermano"
              />
            </View>
            <View style={{ alignItems: "center", width: "20%" }}>
              <Pressable
                onPress={() => {
                  setInputsBros((prev) => {
                    return [...prev, { input: "1" }]
                  })
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 22 }}>+</Text>
              </Pressable>

            </View>

          </View>
          {inputsBros.length > 0 && inputsBros.map((e, i) => {
            return (
              <View key={i} style={styles.nombreCompletoParent}>

                <TextInput
                  style={[styles.brunoPham, styles.brunoPhamTypo]}
                  ref={nombreInputRef}
                  placeholder="Agregar hermano"
                />
              </View>
            )
          })}
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require('../../../assets/line-811.png')}
          />
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Estado Civíl
              </Text>
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"100%"}}>

              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo]}
                ref={nombreInputRef}
                placeholder="Agregar estado civíl"
              />
       
              </View>
            </View>
            
          </View>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require('../../../assets/line-811.png')}
          />
          <View style={[styles.deleteParent, styles.parentFlexBox]}>
            <Image
              style={styles.deleteIcon}
              contentFit="cover"
              source={require('../../../assets/delete2.png')}
            />
            <Text style={[styles.eliminarDatos, styles.brunoPhamTypo]}>
              Eliminar datos
            </Text>
          </View>
        </View>
        <LinearGradient
          style={styles.button}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <Pressable
            style={[styles.pressable, styles.pressableFlexBox]}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.signIn}>Guardar</Text>
          </Pressable>
        </LinearGradient>

        {modalCreate && (
          <Modal animationType="fade" transparent={true} visible={modalCreate}>
            <TouchableWithoutFeedback onPress={() => setModalCreate(false)}>
              <View style={styles.modalOverlay}>
                <View style={{ width: "100%", height: "100%" }}>
                  <ENTRADACREADA
                    onClose={onCloseModalCreate}
                    message={'Guardado!'}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )} else {
    return (
      <View style={{ zIndex: 9999, height: '100%' }}>
        <CameraView
          ref={cameraReff}
          facing={facing}
          style={{ flex: 1 }}
          mode="picture"
          FocusMode="on"
          onCameraReady={(e) => console.log(e, 'esto es e')}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', top: 49, left: 20 }}
              onPress={() => setShowCamera(false)}
            >
              <Image
                style={{
                  height: 16,
                  width: 16
                }}
                contentFit="cover"
                source={require('../../../assets/group-565.png')}
              />
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
                onPress={takePicture}
                style={{
                  width: 60,
                  height: 60,
                  bottom: 100,
                  borderRadius: 100,
                  backgroundColor: '#cecece',

                  color: 'white'
                }}
              ></TouchableOpacity>
              <TouchableOpacity
                onPress={changePictureMode}
                style={{
                  position: 'absolute',
                  right: 20,
                  bottom: 100,
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Entypo name="cycle" color={'#fff'} size={25} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  frameParent: {

    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: 10,
  },
  viewContainer: {
    backgroundColor: Color.white
    ,
    flex: 1,
  },
  perfilItem:{
    height: 130,
    width: 130
  },
  parentFlexBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  brunoPhamTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    width:"100%"
  },
  vectorIconLayout: {
    height: 21,
    width: 21
  },
  frameContainerFlexBox: {
    flexDirection: 'row'
  },
  pressableFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  cambiarFotoDe: {
    color: Color.negro,
    textAlign: 'left',
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 19,
    fontSize: FontSize.size_base
  },
  brunoPham: {
    color: Color.grisGeneral,
    marginTop: 10,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 19,
    fontSize: FontSize.size_base
  },
  nombreCompletoParent: {
    width: '80%',
  },
  vectorIcon1: {
    marginLeft: 20
  },
  frameContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  frameChild: {
    height: '0.5%',
    width: 388,
    marginTop: 20
  },
  deleteIcon: {
    width: 18,
    height: 20,
    overflow: 'hidden'
  },
  eliminarDatos: {
    fontSize: FontSize.size_lg,
    lineHeight: 22,
    marginLeft: 15,
    color: Color.negro,
    textAlign: 'left',
    fontWeight: '500',
    letterSpacing: 0
  },
  deleteParent: {
    marginTop: 38,
    alignItems: 'center'
  },
  signIn: {
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
    flex: 1
  },
  pressable: {
    borderRadius: Border.br_11xl,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton
  },
  button: {
    marginTop: 38,
    borderRadius: Border.br_11xl
  },
  icon: {
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  image6Icon: {
    top: 3,
    width: 87,
    height: 55
  },
  documentIcon: {
    overflow: 'hidden'
  },
  parentIcons: {
    alignItems: 'center',
    flexDirection: 'row',
    top: '5%'
  },
  iconlylightOutlinecalendarParent: {
    width: '100%',
    left: '45%',
    flexDirection: 'row'
  },
  iconlylightOutlinecalendar: {
    height: 24,
    width: 24
  },
  documentIconLayout: {
    marginLeft: 30,
    height: 24,
    width: 24
  },
  backParent: {
    marginTop: 30
  },
  icon: {
    height: '100%',
    overflow: 'hidden'
  },
  iconLayout1: {
    width: '100%',
    overflow: 'hidden'
  },
  ajustes: {
    fontSize: FontSize.size_5xl,
    marginLeft: 20,
    textAlign: 'left',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  centralContainer: {
    left: '3%'
  },
  modalOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default PerfilConfiguracion
