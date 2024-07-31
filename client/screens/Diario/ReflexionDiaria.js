import React, { useState, useCallback, useContext, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Modal,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native'
import { FontFamily, FontSize, Color, Padding, Border } from '../../GlobalStyles'
import { useDispatch, useSelector } from 'react-redux'
import SingleDiary from '../../components/SingleDiary'
import { Context } from '../../context/Context'
import { getUserDiariesByDateOrCategory, postDiary, updateDiaryById } from '../../redux/actions/diaries'
import { LinearGradient } from 'expo-linear-gradient'
import Humor from '../../components/Humor'

const ReflexionDiaria = ({
  editing,
  modalCreate,
  setModalCreate,
  openGroupIcon1,
  selectedDate,
  pickedImages,
  setPickedImages
}) => {
  const { userDiaries, selectedDiary, loading } = useSelector(
    (state) => state.diaries
  )
  const { userData } = useSelector(
    (state) => state.users
  )
  const [showEmojisModal, setShowEmojisModal] = useState(false)

  const [selected, setSelected] = useState({})
  const [text, setText] = useState(selected?.description || '')
  const [diaryImages, setDiaryImages] = useState(selected?.images || [])
const dispatch = useDispatch()
  const { selectedSection, formatDateToNormal, editingDiary, setEditingDiary } =
    useContext(Context)

  useEffect(() => {
    if (selected) {
      setText(selected?.description)
    }
  }, [selected])

  return (
    <View
      style={{
        backgroundColor: Color.white,
        width: '100%'
      }}
    >
      <Text style={[styles.reflexinDiaria, styles.hoyLoHeFlexBox]}>
        {selectedSection === 'nube'
          ? 'Reflexión Diaria'
          : selectedSection === 'logros'
            ? 'Celebrando Logros'
            : selectedSection === 'desafios'
              ? 'Desafíos Superados'
              : selectedSection === 'risas'
                ? 'Risas y anécdotas'
                : selectedSection === 'mundo'
                  ? 'Descubriendo el mundo'
                  : 'Personalizada'}
      </Text>
      {loading ? (
        <ActivityIndicator
          style={{
            backgroundColor: 'transparent',
            alignSelf: 'center',
            marginTop: '20%'
          }}
          animating={true}
          size="xlarge"
          color={'#B7E4C0'}
        />
      ) : userDiaries.length === 0 ? (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingTop: 50
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: 500, color: '#202020' }}>
            ¡No hemos encontrado diarios basados en su búsqueda!
          </Text>
        </View>
      ) : selected ? (
        <ScrollView style={{ height: '100%', width: '100%' }}>
          {selected.id == editingDiary ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Text style={{ fontSize: 19 }}>Tíutlo</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Pressable
                  style={{ height: 18, width: 18, marginRight: 15 }}
                  onPress={() => {
                    setEditingDiary()
                    setSelected(null)
                  }}
                >
                  <Image
                    style={{ height: '100%', width: '100%' }}
                    contentFit="cover"
                    source={require('../../assets/group-68463.png')}
                  />
                </Pressable>
                <Pressable
                  style={{ height: 24, width: 24 }}
                  onPress={() => setShowEmojisModal(true)}
                >
                  <Image
                    style={{ height: '100%', width: '100%' }}
                    contentFit="cover"
                    source={require('../../assets/group2.png')}
                  />
                </Pressable>
                <LinearGradient
                  style={{ marginLeft: 20, borderRadius: 50 }}
                  locations={[0, 1]}
                  colors={['#dee274', '#7ec18c']}
                >
                  <Pressable
                    style={{
                      paddingHorizontal: Padding.p_base,
                      paddingTop: Padding.p_6xs,
                      paddingBottom: Padding.p_5xs,
                      backgroundColor: Color.linearBoton
                    }}
                    onPress={async () => {
                      console.log('opening create modal')
                      const preDiary = { ...selected }
                      preDiary.description = text
                      const cloudinaryUrls = []

                      for (const image of pickedImages) {
                        const formData = new FormData()
                        formData.append('file', {
                          uri: image.uri,
                          type: 'image/jpeg',
                          name: image.filename
                            ? image.filename
                            : getFileName(image.uri)
                        })
                        formData.append(
                          'upload_preset',
                          'cfbb_profile_pictures'
                        )
                        formData.append('cloud_name', 'dnewfuuv0')

                        const response = await fetch(
                          'https://api.cloudinary.com/v1_1/dnewfuuv0/image/upload',
                          {
                            method: 'POST',
                            body: formData
                          }
                        )

                        const data = await response.json()
                        if (response.ok) {
                          cloudinaryUrls.push(data.secure_url)
                        } else {
                          console.error('Error uploading image:', data)
                        }
                      }
                      if (preDiary.id === 'preDiary') {
                        console.log('its a pre diary, posting it..', preDiary)
                        delete preDiary.id
                        dispatch(postDiary(preDiary)).then((res) => {
                          const obj = {
                            creatorId: userData.id,
                            category: selectedSection
                          }
                          obj.images = cloudinaryUrls
                          console.log(
                            'SELECTED DATE BEFORE POSTING',
                            selectedDate
                          )
                          if (selectedDate) {
                            obj.date = selectedDate
                          }
                          dispatch(getUserDiariesByDateOrCategory(obj))
                      setSelected({})

                        })
                      } else {
                        console.log('updating diary...', preDiary)
                        const updatedData = {
                          description: preDiary.description
                        }
                        updatedData.images = [...diaryImages, ...cloudinaryUrls]
                        dispatch(
                          updateDiaryById({
                            diaryId: preDiary.id,
                            diaryData: updatedData
                          })
                        ).then((res) => {
                          const obj = {
                            creatorId: userData.id,
                            category: selectedSection
                          }
                          if (selectedDate) {
                            obj.date = selectedDate
                          }

                          dispatch(getUserDiariesByDateOrCategory(obj))
                        })
                      }
                      setPickedImages([])
                      setEditingDiary()
                      setSelected({})
                    }}
                  >
                    <Text
                      style={{
                        fontSize: FontSize.size_sm,
                        lineHeight: 21,
                        textAlign: 'center',
                        color: Color.white,
                        textAlign: 'center',
                        fontFamily: FontFamily.lato,
                        letterSpacing: 0
                      }}
                    >
                      Guardar
                    </Text>
                  </Pressable>
                </LinearGradient>
              </View>
            </View>
          ) : (
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Text style={{fontSize:20}}>Titulo</Text>
              <Pressable
                style={{
                  height: 18,
                  width: 18,
                  marginRight: 15,
                  alignSelf: 'flex-end'
                }}
                onPress={() => {
                  setEditingDiary()
                  setSelected(null)
                }}
              >
                <Image
                  style={{ height: '100%', width: '100%' }}
                  contentFit="cover"
                  source={require('../../assets/group-68463.png')}
                />
              </Pressable>
            </View>
          )}
          {selected.id == editingDiary ? (
            <TextInput
            style={{borderTopColor:Color.primario1 , borderTopWidth:1 ,paddingTop:10,marginTop:10}}
              multiline
             
              onChangeText={setText}
              value={text}
            ></TextInput>
          ) : (
            <Text  style={{ width: '100%', marginTop: 10 ,borderTopColor:Color.primario1 , borderTopWidth:1 ,paddingTop:10}}>{selected.description}</Text>
          )}
        </ScrollView>
      ) : (
       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:100}} style={{height:Dimensions.get("screen").height / 2}}>
        { userDiaries.map((diary, index) => (
          <SingleDiary
            setSelected={setSelected}
            pickedImages={pickedImages}
            setPickedImages={setPickedImages}
            selectedDate={selectedDate}
            key={diary.id}
            diary={diary}
            editing={selectedDiary?.id === diary.id}
            setModalCreate={setModalCreate}
            modalCreate={modalCreate}
            openGroupIcon1={openGroupIcon1}
            last={index === userDiaries.length - 1}
          />
        ))}
       </ScrollView>
      )}

      <View style={[styles.miDiarioEntradaTextoPlItem, styles.diarioLayout]} />
      <Modal animationType="slide" transparent visible={showEmojisModal}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(113, 113, 113, 0.3)'
          }}
        >
          <Pressable
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0
            }}
            onPress={() => setShowEmojisModal(false)}
          />
          <Humor
            text={text}
            setText={setText}
            onClose={() => setShowEmojisModal(false)}
          />
        </View>
      </Modal>
    </View>
  )
}






const styles = StyleSheet.create({
  diarioLayout: {
    width: 428,
    position: 'absolute'
  },
  hoyLoHe: {
    fontSize: FontSize.size_lg,
    lineHeight: 27
  },
  hoyLoHeFlexBox: {
    textAlign: 'left',
    alignSelf: 'stretch',
    color: Color.negro,
    marginTop: 20,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  frameItemFlexBox: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  groupFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  ttTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  textLayout: {
    lineHeight: 36,
    fontSize: FontSize.size_5xl
  },
  jul2023Typo: {
    lineHeight: 30,
    fontSize: FontSize.size_xl,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  hoyLoHeFlexBox: {
    textAlign: 'left',
    alignSelf: 'stretch',
    color: Color.negro,
    marginTop: 20,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  groupIconLayout: {
    width: 30,
    marginLeft: 30
  },
  image6IconPosition: {
    left: 20,
    position: 'absolute'
  },
  vectorFlexBox: {
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_sm,
    width: 40,
    borderRadius: Border.br_8xs,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  frameItemLayout: {
    zIndex: 0,
    height: 36,
    width: 40,
    borderRadius: Border.br_8xs,
    backgroundColor: Color.secundario
  },
  vectorIconPosition1: {
    zIndex: 1,
    position: 'absolute'
  },
  vectorIconPosition: {
    left: 7,
    zIndex: 1,
    width: 26,
    position: 'absolute'
  },
  miDiarioEntradaTextoPlChild: {
    height: 662,
    backgroundColor: Color.linearBoton,
    left: 0,
    width: 428,
    top: 64
  },
  icon: {
    height: '100%',
    width: '100%'
  },
  wrapper: {
    height: 24,
    width: 24
  },
  groupIcon1Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  groupIcon1Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
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
  signIn: {
    fontSize: FontSize.size_sm,
    lineHeight: 21,
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  pressable: {
    borderRadius: Border.br_11xl,
    paddingHorizontal: Padding.p_base,
    paddingTop: Padding.p_6xs,
    paddingBottom: Padding.p_5xs,
    backgroundColor: Color.linearBoton
  },
  container: {
    marginLeft: 20
  },
  groupParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 388
  },
  frameContainer3Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  frameContainer3Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  text: {
    fontWeight: '700',
    color: Color.negro,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    lineHeight: 36,
    fontSize: FontSize.size_5xl
  },
  jul2023: {
    marginLeft: 10,
    color: Color.negro
  },
  iconlycurvedarrowDown2: {
    width: 14,
    height: 7,
    marginLeft: 10
  },
  parent: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  reflexinDiaria: {
    lineHeight: 36,
    fontSize: FontSize.size_5xl,
    marginBottom: 10
  },
  hoyLoHe: {
    fontSize: FontSize.size_lg,
    lineHeight: 27
  },
  frameParent: {
    top: 133,
    height: 357,
    width: 388,
    left: 20,
    position: 'absolute'
  },
  miDiarioEntradaTextoPlItem: {
    top: 726,
    height: 75,
    backgroundColor: Color.secundario,
    left: 0,
    width: 428
  },
  iconlyboldimage: {
    width: 32,
    height: 32
  },
  iconlyboldcamera: {
    width: 34,
    height: 33,
    marginLeft: 30
  },
  iconlyboldvoice: {
    width: 25,
    height: 34,
    marginLeft: 30
  },
  frameChild: {
    height: 21
  },
  groupIcon: {
    height: 30
  },
  tt: {
    fontSize: FontSize.size_15xl,
    lineHeight: 51,
    marginLeft: 30,
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  iconlyboldticketStar: {
    width: 42,
    marginLeft: 30,
    height: 32
  },
  iconlyboldimageParent: {
    top: 738,
    left: 12,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute'
  },
  image6Icon: {
    top: 3,
    width: 87,
    height: 55
  },
  documentIcon: {
    marginLeft: 30,
    height: 24,
    width: 24,
    overflow: 'hidden'
  },
  iconlylightOutlinesetting: {
    marginLeft: 30,
    height: 24,
    width: 24
  },
  iconlylightOutlinesearchParent: {
    top: 20,
    left: 276,
    position: 'absolute',
    justifyContent: 'center'
  },
  navigationIcon: {
    marginLeft: -214,
    top: 821,
    left: '50%',
    height: 105
  },
  vectorIcon: {
    height: 28,
    width: 26
  },
  vectorWrapper: {
    backgroundColor: Color.colorLavenderblush,
    height: 36
  },
  frameItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden'
  },
  vectorIcon1: {
    left: 8,
    top: 4,
    height: 28,
    width: 24
  },
  vectorIcon2: {
    top: 4,
    height: 28
  },
  vectorIcon3: {
    top: 6,
    height: 24
  },
  rectangleParent: {
    height: 36,
    width: 40
  },
  vectorIcon4: {
    height: 18,
    width: 26
  },
  vectorContainer: {
    backgroundColor: Color.secundario
  },
  vectorIcon5: {
    height: '48.33%',
    width: '43.25%',
    top: '26.11%',
    right: '29%',
    bottom: '25.56%',
    left: '27.75%',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden'
  },
  frameGroup: {
    backgroundColor: Color.colorHoneydew_100,
    height: 49,
    paddingLeft: Padding.p_xs,
    paddingRight: Padding.p_xl,
    borderRadius: Border.br_8xs,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 428,
    left: 0,
    top: 64,
    position: 'absolute'
  },
  iconlyboldunlock: {
    height: 30,
    width: 24
  },
  familiaYAmigos: {
    color: Color.primario1,
    marginLeft: 20
  },
  privacidad: {
    top: 676,
    left: 20,
    position: 'absolute'
  },
  miDiarioEntradaTextoPl: {
    // borderRadius: Border.br_31xl,
    backgroundColor: Color.white,
    flex: 1,
    // height: 926,
    overflow: 'hidden',
    width: '100%'
  }
})

export default ReflexionDiaria
