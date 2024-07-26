import { View, Text, Pressable, Image, Modal, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Color, FontFamily, FontSize, Padding } from '../GlobalStyles'
import Editar2SVG from './svgs/Editar2SVG'
import { useDispatch, useSelector } from 'react-redux'
import { Context } from '../context/Context'
import ENTRADACREADA from './ENTRADACREADA'
import { LinearGradient } from 'expo-linear-gradient'
import {
  deleteDiaryById,
  getAllUserDiaries,
  getUserDiariesByDateOrCategory,
  postDiary,
  updateDiaryById
} from '../redux/actions/diaries'
import { removeUserDiary } from '../redux/slices/diaries.slices'
import Humor from './Humor'

const SingleDiary = ({
  diary,
  editing,
  pickedImages,
  setModalCreate,
  modalCreate,
  openGroupIcon1,
  last,
  selectedDate,
  setPickedImages,
  notEditable
}) => {
  const { selectedSection, formatDateToNormal } = useContext(Context)
  const { userData } = useSelector((state) => state.users)
  const [diaryImages, setDiaryImages] = useState(diary.images || [])
  const [text, setText] = useState(diary.description)
  const [showEmojisModal, setShowEmojisModal] = useState(false)
  const dispatch = useDispatch()

  const { editingDiary, setEditingDiary } = useContext(Context)

  const handleDeleteDiary = (id) => {
    console.log('deleting diary', id, '...')
    dispatch(deleteDiaryById(diary.id))
  }

  const getFileName = (filePath) => {
    const parts = filePath.split('/')
    const fileName = parts[parts.length - 1]
    return fileName
  }

  useEffect(() => {
    console.log('userData from singlediary', userData)
  }, [])

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderBottomWidth: last ? 1 : 0,
        borderBottomColor: last && '#B7E4C0',
        borderTopColor: '#B7E4C0',
        height: 70,
        marginBottom:5
      }}
    >
      <Text style={{ width: '78%', height: '100%' }}>{diary.description}</Text>

      {!notEditable && editingDiary === diary.id && (
        <View style={{ width: '100%', marginTop: -15 }}>
          <View style={{}}>
            <TextInput
              style={{
                fontSize: FontSize.size_lg,
                lineHeight: 27,
                width: Dimensions.get('screen').width * 0.8,
                textAlign: 'left',
                color: Color.negro,
                fontFamily: FontFamily.lato,
                letterSpacing: 0,
                marginBottom: 8
              }}
              multiline
              value={text}
              onChangeText={(text) => setText(text)}
            />
            <View
              style={{
                width: '100%',
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 5
              }}
            >
              {diaryImages?.length > 0 &&
                diaryImages?.map((image, i) => (
                  <View>
                    <Image
                      key={i}
                      source={{ uri: image }}
                      contentFit={'contain'}
                      style={{ width: 50, height: 50, borderRadius: 3 }}
                    />
                    <Pressable
                      onPress={() =>
                        setDiaryImages(
                          [...diaryImages].filter((img) => img !== image)
                        )
                      }
                      style={{
                        position: 'absolute',
                        top: 3,
                        right: 3,
                        borderRadius: 3,
                        backgroundColor: '#fff',
                        padding: 3.5
                      }}
                    >
                      <Image
                        contentFit="cover"
                        style={{ width: 7, height: 7 }}
                        source={require('../assets/group-68463.png')}
                      />
                    </Pressable>
                  </View>
                ))}
              {pickedImages.length > 0 &&
                pickedImages.map((image, i) => (
                  <View>
                    <Image
                      key={i + 500}
                      source={{ uri: image.uri }}
                      contentFit={'contain'}
                      style={{ width: 50, height: 50, borderRadius: 3 }}
                    />
                    <Pressable
                      onPress={() => {
                        setPickedImages(
                          pickedImages.filter((img) => img.uri !== image.uri)
                        )
                      }}
                      style={{
                        position: 'absolute',
                        top: 3,
                        right: 3,
                        borderRadius: 3,
                        backgroundColor: '#fff',
                        padding: 3.5
                      }}
                    >
                      <Image
                        contentFit="cover"
                        style={{ width: 7, height: 7 }}
                        source={require('../assets/group-68463.png')}
                      />
                    </Pressable>
                  </View>
                ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                height: '100%'
              }}
            >
              {!notEditable && editingDiary === diary.id ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: 15,
                    paddingRight: 5
                  }}
                >
                  <Pressable
                    style={{ height: 13, width: 13, marginTop: 8 }}
                    onPress={() => {
                      if (diary.id === 'preDiary') {
                        dispatch(removeUserDiary('preDiary'))
                      }
                      setEditingDiary()
                      setPickedImages([])
                    }}
                  >
                    <Image
                      style={{ height: '100%', width: '100%' }}
                      contentFit="cover"
                      source={require('../assets/group-68463.png')}
                    />
                  </Pressable>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: 'red',
                    height: '100%',
                    width: '100%'
                  }}
                >
                  <Text
                    style={{
                      fontSize: FontSize.size_lg,
                      lineHeight: 27,
                      textAlign: 'left',
                      color: Color.negro,
                      marginTop: !notEditable && 20,
                      fontFamily: FontFamily.lato,
                      letterSpacing: 0,
                      marginBottom: 8
                    }}
                  >
                    {text}
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      gap: 5
                    }}
                  >
                    {diaryImages.length > 0 &&
                      diaryImages.map((image, i) => (
                        <Image
                          key={i}
                          source={{ uri: image }}
                          contentFit={'contain'}
                          style={{ width: 50, height: 50, borderRadius: 3 }}
                        />
                      ))}
                  </View>
                </View>
              )}
              <Pressable
                style={{ height: 24, width: 24 }}
                onPress={() => setShowEmojisModal(true)}
              >
                <Image
                  style={{ height: '100%', width: '100%' }}
                  contentFit="cover"
                  source={require('../assets/group2.png')}
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
                    const preDiary = { ...diary }
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
                      formData.append('upload_preset', 'cfbb_profile_pictures')
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
                          obj.date = formatDateToNormal(selectedDate)
                        }
                        dispatch(getUserDiariesByDateOrCategory(obj))
                      })
                    } else {
                      console.log('updating diary...', preDiary)
                      const updatedData = { description: preDiary.description }
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
                          obj.date = formatDateToNormal(selectedDate)
                        }

                        dispatch(getUserDiariesByDateOrCategory(obj))
                      })
                    }
                    setPickedImages([])
                    setEditingDiary()
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
        </View>
      )}
      {!notEditable && editingDiary !== diary.id && (
        <View
          style={{
            width: '100%',
            flexDirection: 'row-reverse',
            alignItems: 'flex-end',
            paddingBottom: 5,
            position: 'absolute',
            right: 0
          }}
        >
          {!notEditable && (
            <Pressable onPress={() => handleDeleteDiary(diary.id)}>
              <Image
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
                source={require('../assets/trash.png')}
              />
            </Pressable>
          )}

          {!notEditable && (
            <Pressable onPress={() => setEditingDiary(diary.id)}>
              <View style={{ marginBottom: -3, marginRight: 4 }}>
                <Editar2SVG />
              </View>
            </Pressable>
          )}
        </View>
      )}

      {!notEditable && (
        <Modal animationType="slide" transparent visible={modalCreate}>
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
              onPress={() => setModalCreate(false)}
            />
            <ENTRADACREADA
              onClose={() => setModalCreate(false)}
              message={'Entrada Creada'}
              isNavigate={'MIDIARIOPANTALLAPERSONAL'}
            />
          </View>
        </Modal>
      )}
      {!notEditable && (
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
      )}
    </View>
  )
}

export default SingleDiary
