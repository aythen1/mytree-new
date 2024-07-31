import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Modal,
  ScrollView,
  TextInput
} from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import {
  FontFamily,
  Padding,
  FontSize,
  Color,
  Border
} from '../../GlobalStyles'
import { setPanel } from '../../redux/slices/panel.slices'
import OpcionesModal from '../../components/OpcionesModal'
import ENTRADACREADA from '../../components/ENTRADACREADA'
import { useNavigation } from '@react-navigation/native'
import AddGroupMembersModal from '../../components/AddGroupMembersModal'
import axiosInstance from '../../apiBackend'
import { chatGroups } from '../../redux/actions/chat'

const CrearGrupo = () => {
  const dispatch = useDispatch()

  const { showPanel } = useSelector((state) => state.panel)
  const { allUsers , userData } = useSelector((state) => state.users)

  const [taggedUsers, setTaggedUsers] = useState([])
  const [modalCreate, setModalCreate] = useState(false)
  const [showAddMembers, setShowAddMembers] = useState(false)
  const [modalOpcionesVisible, setModalOpcionesVisible] = useState(false)
  const [currentOptionsIndex, setCurrentOptionsIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [name, setName] = useState('')

  const options = [['Familia', 'Amigos']]

  const showOptionsArray = (index) => {
    setCurrentOptionsIndex(index)
    setModalOpcionesVisible(true)
  }

  const onCloseModalCreate = () => {
    setModalCreate(false)
  }

  const navigation = useNavigation()

  const submit =async ()=> {
const res = axiosInstance.post(`/chat/createGroup`,{
  room:"",
  photo:"exampple.com",
  photos:[],
  groupName:name,
  membersIds:[...taggedUsers,userData.id],
  members:[...taggedUsers,{id:userData.id}]
}).then(()=>{
  dispatch(chatGroups(userData.id))

})
console.log(res.data)
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{ paddingBottom: 110 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.crearEvento]}>
       
        <View style={styles.buttonBarFlexBox}>
        <Pressable style={{ position:"absolute",left:0}} onPress={() => navigation.goBack()}>
            <Image
              style={{ height: 20, width: 20}}
              contentFit="cover"
              source={require('../../assets/back.png')}
            />
          </Pressable>
          <Text style={[styles.crearEventoText, styles.titleTypo]}>
            Crea un grupo
          </Text>
        </View>

        <View>
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>
              Escribe el nombre
            </Text>
          </View>
          <View style={[styles.field, styles.fieldSpaceBlock]}>
            <TextInput
              onChangeText={(text) => setName(text)}
              placeholderTextColor={'#BCBCBC'}
              placeholder="Nombre de tu grupo"
            />
          </View>
        </View>

        <View>
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>Invitados</Text>
          </View>
          <Pressable
            onPress={() => setShowAddMembers(true)}
            style={[styles.field, styles.fieldSpaceBlock]}
          >
            <Text
              style={{ color: taggedUsers.length > 0 ? '#000' : '#bcbcbc' }}
            >
              {taggedUsers.length > 0
                ? allUsers
                    .filter((user) => taggedUsers.includes(user.id))
                    .map((user) => `${user.username} ${user.apellido}`)
                    .join(', ')
                : 'Selecciona tus contactos'}
            </Text>
          </Pressable>
        </View>

        <View>
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>
              Selecciona categoría
            </Text>
          </View>
          <Pressable
            style={[styles.field, styles.fieldSpaceBlock]}
            onPress={() => showOptionsArray(0)}
          >
            <View style={styles.placeholderInput}>
              <TextInput
                placeholderTextColor={selectedCategory ? '#000' : '#BCBCBC'}
                placeholder={selectedCategory || 'Elige'}
              />
            </View>
          </Pressable>
        </View>

        <Pressable style={styles.button} onPress={() => {submit();setModalCreate(true)}}>
          <Text style={[styles.signIn, styles.signTypo]}>
            Enviar invitación
          </Text>
        </Pressable>

        <LinearGradient
          style={styles.button2}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <Pressable
            style={styles.pressable1}
            // onPress={() => setModalCreate(true)}
          >
            <Text style={[styles.signIn2, styles.signTypo]}>
              Crear link de invitación
            </Text>
          </Pressable>
        </LinearGradient>
      </View>

      <Modal animationType="fade" transparent visible={modalCreate}>
        <View style={styles.buttonContainer2Overlay}>
          <Pressable
            style={styles.buttonContainer2Bg}
            onPress={() => setModalCreate(false)}
          />
          <ENTRADACREADA
            onClose={onCloseModalCreate}
            message={'Grupo creado!'}
            isNavigate={'MENSAJERA'}
          />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={modalOpcionesVisible}>
        <View style={styles.arrowDown2Icon1Overlay}>
          <Pressable
            style={styles.arrowDown2Icon1Bg}
            onPress={() => setModalOpcionesVisible(false)}
          />
          <OpcionesModal
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            opciones={options[currentOptionsIndex]}
            visible={modalOpcionesVisible}
            onClose={() => setModalOpcionesVisible(false)}
            // onAddOption={(nuevaOpcion) => {
            //   options[currentOptionsIndex].push(nuevaOpcion)
            //   onCloseModalOpciones()
            // }}
            isAdd={true}
          />
        </View>
      </Modal>
      <Modal animationType="fade" transparent visible={showAddMembers}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <Pressable
            style={{ width: '100%', height: '100%', left: 0, top: 0 }}
            onPress={() => setShowAddMembers(false)}
          />
          <AddGroupMembersModal
            taggedUsers={taggedUsers}
            setTaggedUsers={setTaggedUsers}
            onClose={() => setShowAddMembers(false)}
          />
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
  },
  titleTypo: {
    textAlign: 'left',
    letterSpacing: 0,
    fontFamily: FontFamily.lato
  },
  searchLayout: {
    lineHeight: 24,
    fontSize: FontSize.size_base
  },
  signTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },
  title: {
    color: Color.textTextPrimary,
    fontWeight: '500',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    letterSpacing: 0
  },
  placeholderInput: {
    flexDirection: 'row',
    flex: 1
  },
  field: {
    alignItems: 'center'
  },
  fieldSpaceBlock: {
    height: 50,
    backgroundColor: Color.fAFAFA,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xl,
    flexDirection: 'row',
    width: '100%'
  },
  signIn: {
    lineHeight: 21,
    fontSize: FontSize.size_sm,
    textAlign: 'center',
    letterSpacing: 0,
    color: Color.colorKhaki_100
  },
  button: {
    borderStyle: 'solid',
    borderColor: Color.colorKhaki_100,
    borderWidth: 1,
    height: 52,
    borderRadius: Border.br_11xl,
    paddingBottom: Padding.p_5xs,
    paddingTop: Padding.p_6xs,
    paddingHorizontal: Padding.p_base,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.white,
    marginTop: '5%'
  },
  signIn2: {
    letterSpacing: 1,
    color: Color.white,
    lineHeight: 24,
    fontSize: FontSize.size_base,
    flex: 1
  },
  pressable1: {
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    width: '100%'
  },
  button2: {
    marginTop: '5%',
    borderRadius: Border.br_11xl
  },
  crearEvento: {
    flex: 1,
    backgroundColor: Color.white,
    padding: Padding.p_xl,
    gap: 20
  },
  titleBase: {
    paddingBottom: Padding.p_7xs,
    flexDirection: 'row'
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  image6Wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3
  },
  buttonBarFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,justifyContent:"center"
  },
  backLayout: {
    height: 24,
    width: 24
  },
  crearEventoText: {
    fontSize: FontSize.size_5xl,
    fontWeight: '700',
    color: Color.negro,
  },
  iconLayout: {
    height: '100%',
    width: '100%'
  },
  buttonContainer2Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  buttonContainer2Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  }
})

export default CrearGrupo
