import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput
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
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../../apiBackend'
import { getUserData } from '../../../redux/actions/user'

const PerfilConfiguracion = () => {

  const navigation = useNavigation()
  const [modalCreate, setModalCreate] = useState(false)
  const [input, setInput] = useState({
    password: "",
    phone: ""
  })
const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.users)


  const seterValues = (field, value) => {
    setInput((prev) => ({
      ...prev,
      [field]: value
    }))
  }






  const onCloseModalCreate = () => {
    setModalCreate(false)
  }

  console.log(userData, "user data")

  const handleSubmit = async () => {
    // Filtrar las propiedades que tienen algún valor en el objeto input
    const filteredInput = Object.fromEntries(
      Object.entries(input).filter(([_, value]) => value !== "")
    );
  
    const res = await axiosInstance.patch(`/user/${userData?.id}`, filteredInput);
    console.log("Esto actualizó: ", res.data);
    dispatch(getUserData(userData?.id))
    setModalCreate(true);
  };

  return (
    <ScrollView style={styles.frameParent} showsVerticalScrollIndicator={false}>
      <View style={styles.viewContainer}>
        <View>
          <View style={styles.parentIcons}>
            <Image
              style={styles.image6Icon}
              contentFit="cover"
              source={require('../../../assets/image-6.png')}
            />
            <HeaderIcons
              icons={[
                <CalendarMuroSVG />,
                <BookSVG />,
                <NotificationsMuroSVG />
              ]}
            />
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
            <Text style={styles.ajustes}>Seguridad</Text>
          </View>
        </View>

        <View style={styles.centralContainer}>
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Contraseña de MyTree
              </Text>
              <TextInput onChangeText={(e)=> seterValues('password',e) }  value={input.password} secureTextEntry placeholder='••••••••••••' style={[styles.brunoPham, styles.brunoPhamTypo]}>

              </TextInput>
            </View>
          
          </View>
    

          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Teléfono
              </Text>
              <TextInput onChangeText={(e)=> seterValues('phone',e) } value={input.phone} keyboardType='numeric' placeholder={userData?.phone} style={[styles.brunoPham, styles.brunoPhamTypo]}>

              </TextInput>
            </View>
          
          </View>
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Correo electrónico
              </Text>
              <TextInput editable={false} keyboardType='email-address' placeholder={userData?.email} style={[styles.brunoPham, styles.brunoPhamTypo]}>

              </TextInput>
            </View>
          
          </View>
        </View>
        <LinearGradient
          style={styles.button}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <TouchableOpacity
            style={[styles.pressable, styles.pressableFlexBox]}
            onPress={() => {
              handleSubmit()
             }}
          >
            <Text style={styles.signIn}>Guardar</Text>
          </TouchableOpacity>
        </LinearGradient>

        {modalCreate && (
          <Modal animationType="fade" transparent={true} visible={modalCreate}>
            <TouchableWithoutFeedback onPress={() => setModalCreate(false)}>
              <View style={styles.modalOverlay}>
                <View style={{ height: "100%", width: "100%" }}>
                  <ENTRADACREADA
                    onClose={onCloseModalCreate}
                    message={'Guardado!'}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  frameParent: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: Color.white
  },
  viewContainer: {
    paddingHorizontal: Padding.p_xl,
    paddingBottom: 60
  },
  parentFlexBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  brunoPhamTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato
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
    width: '80%'
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
    justifyContent: "space-between",
    top: '5%'
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
