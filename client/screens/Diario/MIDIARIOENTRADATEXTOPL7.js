import React, { useCallback, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, Padding, FontSize } from '../../GlobalStyles'
import NavBarDiario from '../../components/NavBarDiario'
import Humor from '../../components/Humor'
import ReflexionDiaria from '../../components/ReflexionDiaria'
import DescubriendoElMundo from '../../components/DescubriendoElMundo'
import CalebrandoLogros from '../../components/CelebrandoLogros'
import DesafiosSuperados from '../../components/DesafiosSuperados'
import RisaAnecdotas from '../../components/RisaAnecdotas'
import Personalizada from '../../components/Personalizada'
import NavMedia from '../../components/NavMedia'
import ENTRADACREADA from '../../components/ENTRADACREADA'
import LupaSVG from '../../components/svgs/LupaSVG'
import SettingMuroSVG from '../../components/svgs/SettingMuroSVG'
import HeaderIcons from '../../components/HeaderIcons'
import Editar2SVG from '../../components/svgs/Editar2SVG'

const MIDIARIOENTRADATEXTOPL7 = () => {
  const navigation = useNavigation()
  const [showEdit, setShowEdit] = useState(false)
  const [isSection, setIsSection] = useState('')
  const [modalCreate, setModalCreate] = useState(false)

  const [groupIcon1Visible, setGroupIcon1Visible] = useState(false)

  const openGroupIcon1 = useCallback(() => {
    setGroupIcon1Visible(true)
  }, [])

  const closeGroupIcon1 = useCallback(() => {
    setGroupIcon1Visible(false)
  }, [])

  function renderSection(isSection) {
    switch (isSection) {
      case 'mundo':
        return <DescubriendoElMundo showEdit={showEdit} />
      case 'reflexion':
        return <ReflexionDiaria />
      case 'logros':
        return <CalebrandoLogros />
      case 'desafios':
        return <DesafiosSuperados />
      case 'risas':
        return <RisaAnecdotas />
      case 'personalizada':
        return <Personalizada />
      default:
        return <DescubriendoElMundo />
    }
  }

  const onCloseModalCreate = () => {
    setModalCreate(false)
  }

  return (
    <ScrollView style={styles.miDiarioEntradaTextoPl}>
      <View style={styles.topContainer}>
        <Pressable onPress={() => navigation.navigate('Muro')}>
          <Image
            style={styles.image6Icon}
            contentFit="cover"
            source={require('../../assets/image-6.png')}
          />
        </Pressable>
        <HeaderIcons
          icons={[
            <Pressable onPress={() => navigation.navigate('Busqueda')}>
              <LupaSVG />
            </Pressable>,
            <SettingMuroSVG
              isNavigation={() => navigation.navigate('PerfilAjustes')}
            />
          ]}
        />
      </View>

      <NavBarDiario setIsSection={setIsSection} isSection={isSection} />

      <View style={styles.innerContainer}>
        {!showEdit ? (
          <View style={styles.editContainer}>
            <Pressable
              onPress={() => setShowEdit(!showEdit)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={[styles.text, styles.textTypo]}>07</Text>
              <Text style={[styles.jul2023, styles.textTypo]}>jul. 2023</Text>
              <Image
                style={styles.iconlycurvedarrowDown2}
                contentFit="cover"
                source={require('../../assets/iconlycurvedarrowdown2.png')}
              />
              <Editar2SVG style={{ marginLeft: '45%' }} />
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={styles.frameParent}
            onPress={() => {
              setShowEdit(!showEdit)
              // navigation.navigate('MIDIARIOENTRADATEXTOPL1')
            }}
          >
            {showEdit && (
              <View style={styles.groupParent}>
                <Pressable
                  style={styles.wrapper}
                  onPress={() => setShowEdit(false)}
                >
                  <Image
                    style={styles.icon}
                    contentFit="cover"
                    source={require('../../assets/group-68463.png')}
                  />
                </Pressable>
                <View style={styles.groupFlexBox}>
                  <Pressable style={styles.wrapper} onPress={openGroupIcon1}>
                    <Image
                      style={styles.icon}
                      contentFit="cover"
                      source={require('../../assets/group2.png')}
                    />
                  </Pressable>
                  <LinearGradient
                    style={styles.container}
                    locations={[0, 1]}
                    colors={['#dee274', '#7ec18c']}
                  >
                    <Pressable
                      style={[styles.pressable]}
                      onPress={() => setModalCreate(true)}
                    >
                      <Text style={[styles.signIn, styles.ttTypo]}>
                        Guardar
                      </Text>
                    </Pressable>
                  </LinearGradient>
                </View>
              </View>
            )}

            <Modal animationType="slide" transparent visible={modalCreate}>
              <View style={styles.arrowDown2Icon1Overlay}>
                <Pressable
                  style={styles.arrowDown2Icon1Bg}
                  onPress={() => setModalCreate(false)}
                />
                <ENTRADACREADA
                  onClose={() => setModalCreate(false)}
                  message={'Entrada Creada'}
                  isNavigate={'MIDIARIOPANTALLAPERSONAL'}
                />
              </View>
            </Modal>
          </Pressable>
        )}

        {/* renderizado de secciones */}
        {renderSection(isSection)}
        {/* -------------------- */}
      </View>

      {showEdit && <NavMedia />}

      <Modal animationType="slide" transparent visible={groupIcon1Visible}>
        <View style={styles.arrowDown2Icon1Overlay}>
          <Pressable
            style={styles.arrowDown2Icon1Bg}
            onPress={closeGroupIcon1}
          />
          <Humor onClose={closeGroupIcon1} />
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  arrowDown2Icon1Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  arrowDown2Icon1Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  groupParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  groupFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  pressable: {
    paddingHorizontal: Padding.p_base,
    paddingTop: Padding.p_6xs,
    paddingBottom: Padding.p_5xs,
    backgroundColor: Color.linearBoton
  },
  wrapper: {
    height: 24,
    width: 24
  },
  icon: {
    height: '100%',
    width: '100%'
  },
  container: {
    marginLeft: 20
  },
  signIn: {
    fontSize: FontSize.size_sm,
    lineHeight: 21,
    textAlign: 'center'
  },
  ttTypo: {
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  textTypo: {
    textAlign: 'center',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  text: {
    fontWeight: '700',
    lineHeight: 36,
    fontSize: FontSize.size_5xl
  },
  jul2023: {
    fontSize: FontSize.size_xl,
    lineHeight: 30,
    marginLeft: 10
  },
  iconlycurvedarrowDown2: {
    width: 14,
    height: 7,
    marginLeft: 10
  },
  frameParent: {
    width: '100%'
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  miDiarioEntradaTextoPl: {
    backgroundColor: Color.white,
    width: '100%',
    flex: 1
  },
  innerContainer: {
    flex: 1,
    marginTop: 20,
    width: '100%',
    padding: 15
  },
  topContainer: {
    top: 10,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default MIDIARIOENTRADATEXTOPL7
