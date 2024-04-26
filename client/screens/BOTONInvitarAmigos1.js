import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Image } from 'expo-image'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native'
import { Color, FontSize, FontFamily, Border, Padding } from '../GlobalStyles'
import Checkbox from 'expo-checkbox'
import { useNavigation } from '@react-navigation/native'
import OpcionesModal from './../components/OpcionesModal'
import { setPanel } from '../redux/slices/panel.slices'
import QR from '../components/QR'
import { Context } from '../context/Context'
import { LinearGradient } from 'expo-linear-gradient'

const BOTONInvitarAmigos1 = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
 
const {showQrModal, setShowQrModal} = useContext(Context)
  const { showPanel } = useSelector((state) => state.panel)
  const { allUsers } = useSelector((state) => state.users) 
  const [filteredUsers, setFilteredUsers] = useState([...allUsers])
  const [isChecked, setChecked] = useState(false)
  const [frameContainerVisible, setFrameContainerVisible] = useState(false)

  const pushName = []

  const usersList = allUsers.map(user=>`${user.username} ${user.apellido}`)

const [value,setValue] = useState('')
  const openFrameContainer = useCallback(() => {
    setFrameContainerVisible(true)
  }, [])

  const closeFrameContainer = useCallback(() => {
    setFrameContainerVisible(false)
  }, [])


  useEffect(() => {
    console.log('value: ',value)
    const filterUsers = () => {
      const filtered = allUsers.filter(user => {
     
        const apellido = user.apellido.toLowerCase();
        const username = user.username.toLowerCase();
        const searchValue = value.toLowerCase();
      
        return apellido.includes(searchValue) || username.includes(searchValue);
      });

       setFilteredUsers(filtered);
    };

    filterUsers()
  }, [value, allUsers]);
  return (
    
    <LinearGradient  colors={['#fff', '#f1f1f1']}
    style={{ flex: 1,paddingBottom:70}}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}>
      <View style={{ width: '100%',
    overflow: 'hidden',
    flex: 1,
    gap:15,
    paddingHorizontal:15}}>
        
        <Image
          style={{ width: 87,
            height: 55}}
          contentFit="cover"
          source={require('../assets/image-6.png')}
        />
        <View style={{width:'100%', marginTop:-10, justifyContent:'center',alignItems:'center'}}> 
        <Pressable 
        style={{position:'absolute',left:0}}
        onPress={() => dispatch(setPanel(!showPanel))}
        >
          <Image
            style={{width: 26,height: 20,}}
            contentFit="cover"
            source={require('../assets/ionmenu.png')}
          />
        </Pressable>
          <Text style={{fontSize: FontSize.size_5xl,fontWeight: 700,
          fontFamily: FontFamily.lato,
          color: Color.negro}}>
            Invita familia
          </Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
          <View style={{flexDirection:'row', width:'85%',height:40, paddingHorizontal:10,borderRadius:10,gap:10,alignItems:'center', backgroundColor:'#f3f3f3'}}>
          <Image
            style={{width: 20,height: 20,}}
            contentFit="cover"
            source={require('../assets/search.png')}
          />
          <TextInput placeholderTextColor={'#BDBDBD'} placeholder='Búsqueda' value={value} onChangeText={(text)=>{
            console.log('setting value to: ',text)
            setValue(text)
          }}/>
          </View>
          <TouchableOpacity style={{width:40,height:40,justifyContent:'center',alignItems:'center', backgroundColor:'#f3f3f3',borderRadius:100}}><Image
            style={{width: 22,height: 22,}}
            contentFit="cover"
            source={require('../assets/send.png')}
          /></TouchableOpacity>
        </View>

        <ScrollView>
          {filteredUsers.map(user=><TouchableOpacity style={{paddingHorizontal:10,paddingVertical:15,borderBottomWidth:1,borderBottomColor:'#B7E4C0'}}>
            <Text style={{color:'#787878',fontSize:16,fontWeight:500}}>{user.username + ' ' + user.apellido}</Text>
          </TouchableOpacity>)}
        </ScrollView>
        <TouchableOpacity onPress={()=>setShowQrModal(true)}>
        <LinearGradient
          style={{
           marginBottom:35,
           marginLeft:'5%',
      borderRadius: Border.br_11xl,
      backgroundColor: Color.grisClaro,
      justifyContent: 'center',
      paddingHorizontal: Padding.p_5xl,
      paddingVertical: Padding.p_sm,  
      width: '90%',
      justifySelf:'center',
      alignItems: 'center',
      flexDirection: 'row'}} 
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >        
          <Text style={styles.signIn}>Crear link de invitación</Text>
       </LinearGradient></TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showQrModal}
      >
        <TouchableWithoutFeedback onPress={()=>setShowQrModal(false)}>
          <View style={styles.modalOverlay}>
            <View>
              <QR onClose={()=>setShowQrModal(false)}/>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      </LinearGradient>
  )
}

const styles = StyleSheet.create({
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
    width: '90%',
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
})

export default BOTONInvitarAmigos1
