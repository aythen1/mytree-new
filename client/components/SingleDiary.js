import { View, Text, Pressable, Image, Modal } from 'react-native'
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
  postDiary,
  updateDiaryById
} from '../redux/actions/diaries'

const SingleDiary = ({
  diary,
  editing,
  setModalCreate,
  modalCreate,
  openGroupIcon1,
  last
}) => {
  const [text, setText] = useState(diary.description)
  const dispatch = useDispatch()
  const { editingDiary, userData, setEditingDiary } = useContext(Context)
  const handleDeleteDiary = (id) => {
    console.log('deleting diary', id, '...')
    dispatch(deleteDiaryById(diary.id))
  }

  useEffect(() => {
    console.log('Modal create changed to', modalCreate)
  }, [modalCreate])
  return (
    <View
      style={{
        paddingTop: 20,
        paddingBottom: 5,
        borderTopWidth: 1,
        borderBottomWidth: last ? 1 : 0,
        borderBottomColor: last && '#B7E4C0',
        borderTopColor: '#B7E4C0'
      }}
    >
      {editingDiary === diary.id && (
        <View style={{ width: '100%', marginTop: -15 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              alignItems: 'center'
            }}
          >
            <Pressable
              style={{ height: 18, width: 18 }}
              onPress={() => setEditingDiary()}
            >
              <Image
                style={{ height: '100%', width: '100%' }}
                contentFit="cover"
                source={require('../assets/group-68463.png')}
              />
            </Pressable>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
              }}
            >
              <Pressable
                style={{ height: 24, width: 24 }}
                onPress={openGroupIcon1}
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
                  onPress={() => {
                    console.log('opening create modal')
                    const preDiary = { ...diary }
                    preDiary.description = text
                    if (!preDiary.id) {
                      console.log('its a pre diary, posting it..', preDiary)
                      dispatch(postDiary(preDiary)).then((res) =>
                        getAllUserDiaries(userData.id)
                      )
                    } else if (preDiary.id) {
                      console.log('updating diary...', preDiary)
                      dispatch(
                        updateDiaryById({
                          diaryId: preDiary.id,
                          diaryData: { description: preDiary.description }
                        })
                      ).then((res) => getAllUserDiaries(userData.id))
                    }
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
      {editingDiary !== diary.id && (
        <View
          style={{
            position: 'absolute',
            top: 5,
            left: 0,
            zIndex: 99999999999999,
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Pressable onPress={() => handleDeleteDiary(diary.id)}>
            <Image
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
              source={require('../assets/trash.png')}
            />
          </Pressable>

          <Pressable onPress={() => setEditingDiary(diary.id)}>
            <Editar2SVG />
          </Pressable>
        </View>
      )}
      {editingDiary === diary.id ? (
        <TextInput
          style={{
            fontSize: FontSize.size_lg,
            lineHeight: 27,
            textAlign: 'left',
            color: Color.negro,
            fontFamily: FontFamily.lato,
            letterSpacing: 0
          }}
          multiline
          value={text}
          onChangeText={(text) => setText(text)}
        />
      ) : (
        <Text
          style={{
            fontSize: FontSize.size_lg,
            lineHeight: 27,
            textAlign: 'left',
            color: Color.negro,
            marginTop: 20,
            fontFamily: FontFamily.lato,
            letterSpacing: 0
          }}
        >
          {text}
        </Text>
      )}
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
    </View>
  )
}

export default SingleDiary
