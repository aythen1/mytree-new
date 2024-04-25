import React, { useState, useCallback } from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Text, Pressable, Modal } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { FontSize, Color, FontFamily, Border } from '../../GlobalStyles'
import { useDispatch, useSelector } from 'react-redux'
// import { setPaper } from '../../redux/slices/newspapersPublished.slices'
import PopUpCalendario from '../../components/PopUpCalendario'

const Papers = () => {
  // const { lastPapers } = useSelector((state) => state.papers)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [frameContainer25Visible, setFrameContainer25Visible] = useState(false)
  const [calendario, setCalendario] = useState(false)

  const openCalendario = () => {
    setCalendario(true)
  }

  const closeCalendario = () => {
    setCalendario(false)
  }

  const openFrameContainer25 = useCallback(() => {
    setFrameContainer25Visible(true)
  }, [])

  const closeFrameContainer25 = useCallback(() => {
    setFrameContainer25Visible(false)
  }, [])

  return (
    <>
      <View style={[styles.miDiarioEntradaTextoPl, styles.iconLayout]}>
        <View>
          <Image
            style={styles.line}
            contentFit="cover"
            source={require('../../assets/line-71.png')}
          />
          <View style={styles.ltimasEntradasParent}>
            <Text style={[styles.ltimosDiariosFamiliares, styles.textTypo]}>
              Últimas entradas
            </Text>
            <Pressable onPress={openCalendario}>
              <Image
                style={styles.iconlyboldfilter2}
                contentFit="cover"
                source={require('../../assets/iconlyboldfilter21.png')}
              />
            </Pressable>
          </View>
          <Image
            style={styles.line}
            contentFit="cover"
            source={require('../../assets/line-785.png')}
          />
          {/* {lastPapers.map((paper) => (
            <Pressable
              key={paper.id}
              style={styles.frameLayout}
              onPress={() => {
                dispatch(setPaper(paper))
                // navigation.navigate('Paper')
              }}
            >
              <View
                style={[styles.frameContainer, styles.frameContainerFlexBox]}
              >
                <View style={styles.aatarWrapper}>
                  <Image
                    style={styles.aatarIcon}
                    contentFit="cover"
                    source={require('../../assets/aatar7.png')}
                  />
                </View>
                <View style={styles.parent}>
                  <Text style={styles.text}>{paper.date.slice(0, 2)}</Text>
                  <Text style={styles.jul2023}>{paper.date.slice(2)}</Text>
                </View>
              </View>
              <Text style={[styles.hoyHemosVisitado, styles.urielYYo2Typo]}>
                {paper.message.length >= 70
                  ? `${paper.message.slice(0, 70)}${'...'}`
                  : paper.message}
              </Text>
            </Pressable>
          ))} */}
          <View style={styles.frameLayout}>
            <Text style={styles.text}>06/01/2024</Text>
            <View style={styles.frameContainer}>
              <Image
                style={styles.aatarIcon}
                contentFit="cover"
                source={require('../../assets/frame-1547755266.png')}
              />
              <Image
                style={styles.aatarIcon}
                contentFit="cover"
                source={require('../../assets/frame-1547755266.png')}
              />
              <Image
                style={styles.aatarIcon}
                contentFit="cover"
                source={require('../../assets/frame-1547755266.png')}
              />
            </View>
          </View>
        </View>
      </View>

      <Modal animationType="slide" transparent visible={calendario}>
        <View style={styles.iconlyLightOutlineCalendarOverlay}>
          <Pressable
            style={styles.iconlyLightOutlineCalendarBg}
            onPress={closeCalendario}
          />
          <PopUpCalendario
            setButtonContainer2Visible={() => {}}
            setCalendario={setCalendario}
          />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  iconLayout: {
    width: '100%',
    overflow: 'hidden'
  },
  ltimasEntradasParent: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '20%'
  },
  textTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  ltimosDiariosFamiliares: {
    color: Color.primario2,
    fontWeight: '700',
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_xl,
    width: '100%'
  },
  urielYYo2Typo: {
    display: 'flex',
    lineHeight: 27,
    fontSize: FontSize.size_lg,
    marginTop: 20,
    textAlign: 'left',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    alignItems: 'center'
  },
  frameLayout: {
    height: 150,
    alignSelf: 'stretch',
    marginTop: '5%'
  },
  aatarIcon: {
    width: 107,
    height: 107,
    borderRadius: 10
  },
  aatarWrapper: {
    alignItems: 'center'
  },
  text: {
    fontSize: FontSize.size_5xl,
    lineHeight: 36,
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: '700',
    letterSpacing: 0
  },
  jul2023: {
    lineHeight: 30,
    marginLeft: 10,
    fontSize: FontSize.size_xl,
    textAlign: 'center',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  parent: {
    marginLeft: 8,
    alignItems: 'center',
    flexDirection: 'row'
  },
  frameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    gap: 5
  },
  hoyHemosVisitado: {
    marginTop: 20,
    alignSelf: 'stretch',
    flex: 1
  },
  iconlyboldfilter2: {
    height: 24,
    width: 24,
    right: 20
  },
  miDiarioEntradaTextoPl: {
    top: 30,
    paddingHorizontal: 15,
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    backgroundColor: Color.white,
    paddingBottom: 100
  },
  line: {
    height: 1
  },
  iconlyLightOutlineCalendarOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  iconlyLightOutlineCalendarBg: {
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  }
})

export default Papers
