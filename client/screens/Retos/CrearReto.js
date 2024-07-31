import React, { useState } from 'react'
import { Image } from 'expo-image'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  Modal,
  TouchableWithoutFeedback
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  Padding,
  Color,
  Border,
  FontSize,
  FontFamily
} from '../../GlobalStyles'
import ENTRADACREADA from '../../components/ENTRADACREADA'

const CrearReto = () => {
  const navigation = useNavigation()

  const [popupCreate, setPopupCreate] = useState(false)

  const onCloseModalCreate = () => {
    setPopupCreate(false)
  }

  return (
    <View style={[styles.muroAlertas, styles.iconLayout]}>
      <Image
        style={styles.navigationIcon}
        contentFit="cover"
        source={require('../../assets/navigation14.png')}
      />

      <View style={styles.frameParent}>
        <View style={styles.image6Wrapper}>
          <Image
            style={styles.image6Icon}
            contentFit="cover"
            source={require('../../assets/image-6.png')}
          />
        </View>
        <View style={styles.frameGroup}>
          <View>
            <View style={[styles.backParent, styles.buttonFlexBox]}>
              <Pressable
                style={styles.back}
                onPress={() => navigation.goBack()}
              >
                <Image
                  style={[styles.icon, styles.iconLayout]}
                  contentFit="cover"
                  source={require('../../assets/back.png')}
                />
              </Pressable>
              <Text style={styles.crearNuevoReto}>
                Crear Nuevo Reto Familiar
              </Text>
            </View>
            <View style={styles.fieldWithTitleWrapper}>
              <View>
                <View style={[styles.titleBase, styles.buttonLayout]}>
                  <Text style={[styles.title, styles.titleFlexBox]}>Reto</Text>
                </View>
                <View style={[styles.field, styles.fieldSpaceBlock]}>
                  <View style={styles.placeholderInput}>
                    <TextInput
                      style={[styles.search, styles.searchTypo]}
                      placeholder=" Detalla tu propuesta!"
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.frameGroup}>
              <View style={[styles.titleBase, styles.buttonLayout]}>
                <Text style={[styles.title, styles.titleFlexBox]}>
                  Tipo de Reto
                </Text>
              </View>
              <View style={[styles.field1, styles.fieldSpaceBlock]}>
                <View style={styles.placeholderInput}>
                  {/* <Text style={[styles.search, styles.searchTypo]}>
                    Elige si es un reto familiar o amistoso
                  </Text> */}
                  <TextInput
                    style={[styles.search, styles.searchTypo]}
                    placeholder=" Elige si es un reto familiar o amistoso"
                  />
                </View>
                <Image
                  style={styles.arrowDown2Icon}
                  contentFit="cover"
                  source={require('../../assets/arrowdown25.png')}
                />
              </View>
            </View>
          </View>

          <Modal animationType="fade" transparent visible={popupCreate}>
            <View style={styles.buttonContainer2Overlay}>
              <Pressable onPress={onCloseModalCreate} />
              <ENTRADACREADA
                onClose={onCloseModalCreate}
                message={'Creado con exito'}
                isNavigate={'Muro'}
              />
            </View>
          </Modal>

          <LinearGradient
            style={[styles.button, styles.buttonLayout]}
            locations={[0, 1]}
            colors={['#dee274', '#7ec18c']}
          >
            <Pressable
              style={{ height: 30 }}
              onPress={() => setPopupCreate(true)}
            >
              <Text style={[styles.signIn, styles.searchTypo]}>Crear Reto</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  iconLayout: {
    overflow: 'hidden',
    width: '100%'
  },
  buttonContainer2Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  modalOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonFlexBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLayout: {
    width: 388,
    flexDirection: 'row'
  },
  titleFlexBox: {
    letterSpacing: 0,
    textAlign: 'left'
  },
  fieldSpaceBlock: {
    paddingVertical: Padding.p_smi,
    backgroundColor: Color.fAFAFA,
    borderRadius: Border.br_3xs,
    width: 388,
    flexDirection: 'row',
    paddingHorizontal: Padding.p_xl
  },
  searchTypo: {
    lineHeight: 24,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato
  },
  navigationIcon: {
    top: 821,
    left: 0,
    width: 428,
    height: 105,
    position: 'absolute'
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  image6Wrapper: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    height: '100%'
  },
  back: {
    height: 24,
    width: 24
  },
  crearNuevoReto: {
    fontSize: FontSize.size_5xl,
    fontWeight: '700',
    color: Color.negro,
    marginLeft: 20,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  backParent: {
    flexDirection: 'row'
  },
  title: {
    lineHeight: 19,
    fontWeight: '500',
    color: Color.textTextPrimary,
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    fontFamily: FontFamily.lato
  },
  titleBase: {
    paddingBottom: Padding.p_7xs
  },
  search: {
    color: Color.textPlaceholder,
    letterSpacing: 0,
    textAlign: 'left'
  },
  placeholderInput: {
    flexDirection: 'row',
    flex: 1
  },
  field: {
    // height: 194
  },
  fieldWithTitleWrapper: {
    height: 219,
    marginTop: 20
  },
  arrowDown2Icon: {
    height: 12,
    marginLeft: 24,
    width: 24
  },
  field1: {
    alignItems: 'center'
  },
  frameGroup: {
    marginTop: 20
  },
  signIn: {
    letterSpacing: 1,
    color: Color.white,
    textAlign: 'center',
    flex: 1
  },
  button: {
    borderRadius: Border.br_11xl,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  frameParent: {
    marginLeft: -214,
    top: 3,
    left: '50%',
    height: 923,
    paddingVertical: 0,
    paddingHorizontal: Padding.p_xl,
    position: 'absolute'
  },
  muroAlertas: {
    borderRadius: Border.br_31xl,
    backgroundColor: Color.white,
    height: 926,
    flex: 1
  }
})

export default CrearReto
