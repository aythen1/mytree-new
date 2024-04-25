import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Image } from 'expo-image'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TouchableWithoutFeedback
} from 'react-native'
import { Color, FontSize, FontFamily, Border, Padding } from '../GlobalStyles'
import Checkbox from 'expo-checkbox'
import { useNavigation } from '@react-navigation/native'
import OpcionesModal from './../components/OpcionesModal'
// import { setPanel } from '../redux/slices/panel.slices'

const BOTONInvitarAmigos1 = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { showPanel } = useSelector((state) => state.panel)
  const { contacts } = useSelector((state) => state.contacts)
  const [isChecked, setChecked] = useState(false)
  const [frameContainerVisible, setFrameContainerVisible] = useState(false)

  const pushName = []

  const mapcontacts = contacts.map((contact) => pushName.concat(contact.name))

  const openFrameContainer = useCallback(() => {
    setFrameContainerVisible(true)
  }, [])

  const closeFrameContainer = useCallback(() => {
    setFrameContainerVisible(false)
  }, [])

  return (
    <>
      <View style={styles.botonInvitarAmigos}>
        <Pressable 
        // onPress={() => dispatch(setPanel(!showPanel))}
        >
          <Image
            style={[styles.ionmenuIcon, styles.iconPosition]}
            contentFit="cover"
            source={require('../assets/ionmenu.png')}
          />
        </Pressable>
        <Image
          style={[styles.image6Icon, styles.iconPosition]}
          contentFit="cover"
          source={require('../assets/image-6.png')}
        />
        <Text style={[styles.invitaFamiliares, styles.searchFlexBox]}>
          Invita familiares
        </Text>
        <Pressable style={[styles.button, styles.buttonFlexBox]}>
          <Text style={styles.signIn}>Crear link de invitación</Text>
        </Pressable>
        <View style={[styles.header, styles.headerLayout]}>
          <View style={[styles.searchBar, styles.buttonFlexBox]}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
            />
            <View style={styles.placeholderInput}>
              <Text style={[styles.search, styles.searchFlexBox]}>Juan</Text>
            </View>
          </View>
          <Pressable
            style={styles.iconlylightsendCopyWrapper}
            onPress={openFrameContainer}
          >
            <Image
              style={styles.iconlylightsendCopy}
              contentFit="cover"
              source={require('../assets/iconlylightsend-copy.png')}
            />
          </Pressable>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={frameContainerVisible}
      >
        <TouchableWithoutFeedback onPress={closeFrameContainer}>
          <View style={styles.modalOverlay}>
            <View>
              <OpcionesModal
                opciones={mapcontacts}
                visible={frameContainerVisible}
                onClose={closeFrameContainer}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  iconPosition: {
    left: 20,
    position: 'absolute'
  },
  modalOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchFlexBox: {
    textAlign: 'left',
    color: Color.negro
  },
  buttonFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerLayout: {
    width: '100%',
    position: 'absolute'
  },
  ionmenuIcon: {
    top: 83,
    width: 26,
    height: 20,
    overflow: 'hidden'
  },
  image6Icon: {
    top: 3,
    width: 87,
    height: 55
  },
  invitaFamiliares: {
    marginLeft: -85,
    top: 78,
    fontSize: FontSize.size_5xl,
    fontWeight: '700',
    fontFamily: FontFamily.lato,
    left: '50%',
    position: 'absolute',
    color: Color.negro
  },
  signIn: {
    fontSize: FontSize.size_base,
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    flex: 1
  },
  button: {
    top: 221,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.grisClaro,
    justifyContent: 'center',
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    left: 20,
    position: 'absolute',
    width: '90%'
  },
  iconlylightOutlinesearch: {
    width: 20,
    height: 20
  },
  search: {
    fontSize: FontSize.size_sm,
    letterSpacing: 0,
    lineHeight: 21,
    fontWeight: '500',
    fontFamily: FontFamily.nunito
  },
  placeholderInput: {
    marginLeft: 6,
    flexDirection: 'row',
    flex: 1
  },
  searchBar: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    height: 50,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: Padding.p_5xs,
    flex: 1
  },
  frameContainerOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  frameContainerBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  iconlylightsendCopy: {
    width: 24,
    height: 24
  },
  iconlylightsendCopyWrapper: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.backgroundGreyBackground,
    padding: Padding.p_7xs,
    marginLeft: 16,
    flexDirection: 'row'
  },
  header: {
    top: 127,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_xs,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Color.white
  },
  navigationIcon: {
    top: 821,
    left: 0,
    height: 105
  },
  checkbox: {
    borderRadius: 10
  },
  botonInvitarAmigos: {
    width: '100%',
    overflow: 'hidden',
    flex: 1,
    backgroundColor: Color.white
  }
})

export default BOTONInvitarAmigos1
