import React, { useState, useCallback } from 'react'
import { Image } from 'expo-image'
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, FontSize, Color, Border, Padding } from '../GlobalStyles'
import ENTRADACREADA from '../components/ENTRADACREADA'
import { useSelector } from 'react-redux'

const Invitacin = ({route}) => {

  

  const { userEvents:dates ,userInvitations } = useSelector((state) => state.events)

  const event = route?.params?.date
  const event_location = route?.params?.date.location
  const event_images = route?.params?.date.images
  const event_description = route?.params?.date.description

  const inv = userInvitations.find((e)=> e.event.id == event.id )

  console.log(inv,"imnvvvvvvvvvvvvvvvvvvvvvvvvvvvv")



  const event_date = route?.params?.date?.date.slice(0,10)


  const navigation = useNavigation()

  const [modalCreate, setModalCreate] = useState(false)

  const onCloseModalCreate = () => {
    setModalCreate(false)
  }

  return (
    <ScrollView
      style={[styles.invitacin, styles.iconLayout]}
      contentContainerStyle={{paddingBottom:100}}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.paddingBottom}>
        <View style={[styles.image6Wrapper, styles.parentFlexBox]}>
          <Image
            style={styles.image6Icon}
            contentFit="cover"
            source={require('../assets/image-6.png')}
          />
        </View>
        <View>
          <View style={styles.backParent}>
            <Pressable
              style={styles.calendarIcon}
              onPress={() => navigation.navigate('CALENDARIO')}
            >
              <Image
                style={[styles.icon, styles.iconLayout]}
                contentFit="cover"
                source={require('../assets/back4.png')}
              />
            </Pressable>
            <Text style={[styles.invitacin1, styles.cdigoTypo]}>
              Invitación
            </Text>
          </View>
          <View style={styles.lineParent}>
            <View style={styles.frameChild} />
            <Text style={[styles.tituloDelEvento, styles.cdigoTypo]}>
              {event.title}
            </Text>
            <View style={styles.calendarParent}>
              <Image
                style={styles.calendarIcon}
                contentFit="cover"
                source={require('../assets/calendar.png')}
              />
              <View style={styles.deAgostoParent}>
                <Text style={styles.hsTypo}>{event_date}</Text>
                {/* <Text style={[styles.hs, styles.hsTypo]}>16:00 hs</Text> */}
              </View>
            </View>
            <View style={styles.iconlybulklocationParent}>
              <Image
                style={styles.iconlybulklocation}
                contentFit="cover"
                source={require('../assets/iconlybulklocation2.png')}
              />
              <Text style={[styles.lugarDelEvento, styles.hsTypo]}>
                {event_location}
              </Text>
            </View>
            <Text style={[styles.cdigo, styles.cdigoTypo]}>{event_description}</Text>
            <View style={styles.fieldWithTitle}>
              {event_images && event_images.map((e)=>{
                return (
                  <Image style={{width:"48%",height:100}} source={{uri:e}}></Image>
                )
              } )}
              {/* <Text style={styles.hsTypo}>Observaciones</Text>
              <View style={[styles.field, styles.parentPosition]} /> */}
            </View>
          </View>
         {inv.status === 'pending' && (
           <View style={styles.buttonParent}>
           <Pressable
             style={styles.button}
             onPress={() => setModalCreate(true)}
           >
             <View style={[styles.groupParent, styles.parentPosition]}>
               <Image
                 style={styles.frameItem}
                 contentFit="cover"
                 source={require('../assets/group-70351.png')}
               />
               <Text
                 style={[styles.declinoAsistencia, styles.signInSpaceBlock]}
               >
                 Declino asistencia
               </Text>
             </View>
           </Pressable>
           <LinearGradient
             style={styles.button1}
             locations={[0, 1]}
             colors={['#dee274', '#7ec18c']}
           >
             <Pressable
               style={[styles.pressable, styles.pressableLayout]}
               onPress={() => setModalCreate(true)}
             >
               <View style={[styles.vectorParent, styles.parentPosition]}>
                 <Image
                   style={styles.vectorIcon}
                   contentFit="cover"
                   source={require('../assets/vector33.png')}
                 />
                 <Text style={[styles.signIn, styles.signTypo]}>
                   Confirmo asistencia
                 </Text>
               </View>
             </Pressable>
           </LinearGradient>
         </View>
         )}
       {inv.status == 'pending' && (
           <LinearGradient
           style={styles.button2}
           locations={[0, 1]}
           colors={['#dee274', '#7ec18c']}
         >
           <Pressable
             style={[styles.pressable1, styles.pressableLayout]}
             onPress={() => setModalCreate(true)}
           >
             <Text style={[styles.signIn1, styles.signTypo]}>
               No estoy aún seguro
             </Text>
           </Pressable>
         </LinearGradient>
       )}
        </View>

        <Modal animationType="slide" transparent visible={modalCreate}>
          <View style={styles.buttonContainer2Overlay}>
            <Pressable
              style={styles.buttonContainer2Bg}
              onPress={() => setModalCreate(false)}
            />
            <ENTRADACREADA
              onClose={onCloseModalCreate}
              message={'Asistencia actualizada!'}
              isNavigate={'CALENDARIO'}
            />
          </View>
        </Modal>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  iconLayout: {
    width: '100%'
  },
  parentFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  cdigoTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  hsTypo: {
    lineHeight: 19,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    letterSpacing: 0
  },
  parentPosition: {
    alignItems: 'center'
  },
  signInSpaceBlock: {
    marginLeft: 8,
    lineHeight: 21,
    fontSize: FontSize.footnote_size,
    letterSpacing: 0
  },
  pressableLayout: {
    backgroundColor: Color.linearBoton,
    width: '100%'
  },
  signTypo: {
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  image6Wrapper: {
  },
  frameChild: {
    marginTop:20,
    borderColor: Color.secundario,
    borderTopWidth: 1,
    width: 369,
    height: 1,
    borderStyle: 'solid',
    left: 0
  },
  tituloDelEvento: {
    marginTop:20,
    color: Color.gris,
    fontWeight: '500',
    lineHeight: 22,
    fontSize: FontSize.size_lg,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    left: 0
  },
  calendarIcon: {
    width: 24,
    height: 24
  },
  hs: {
    marginLeft: 35
  },
  deAgostoParent: {
    marginLeft: 13,
    flexDirection: 'row'
  },
  calendarParent: {
    marginTop:20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconlybulklocation: {
    width: 21,
    height: 25
  },
  lugarDelEvento: {
    marginLeft: 16
  },
  iconlybulklocationParent: {
    marginTop:20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  cdigo: {
    marginTop:20,
    color: Color.gris,
    fontWeight: '500',
    lineHeight: 22,
    fontSize: FontSize.size_lg,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    left: 0
  },
  field: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    height: 107,
    width: 388
  },
  fieldWithTitle: {
  flexDirection:"row",
  marginTop:20,
  gap:5,
  flexWrap:"wrap"
  },
  icon: {
    height: '100%'
  },
  invitacin1: {
    fontSize: FontSize.size_xl,
    fontWeight: '700',
    color: Color.primario1,
    marginLeft: 5,
    lineHeight: 24,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  backParent: {
    flexDirection: 'row'
  },
  lineParent: {
 
  },
  frameItem: {
    width: 12,
    height: 12
  },
  declinoAsistencia: {
    textAlign: 'center',
    marginLeft: 8,
    lineHeight: 21,
    fontSize: FontSize.footnote_size,
    fontFamily: FontFamily.lato
  },
  groupParent: {
    top: 14,
    flexDirection: 'row',
    left: 9
  },
  button: {
    borderColor: Color.colorKhaki_100,
    borderWidth: 1,
    borderRadius: Border.br_11xl,
    height: 52,
    borderStyle: 'solid',
    backgroundColor: Color.white,
    width: '46.5%'
  },
  vectorIcon: {
    width: 18,
    height: 14
  },
  signIn: {
    marginLeft: 8,
    lineHeight: 21,
    fontSize: FontSize.footnote_size,
    letterSpacing: 0,
    color: Color.white
  },
  vectorParent: {
    flexDirection: 'row',
    top: 14
  },
  pressable: {
    height: 52,
    left: 6
  },
  button1: {
    marginLeft: 20,
    height: 52,
    borderRadius: Border.br_11xl,
    alignItems: 'center',
    width: '46.5%'
  },
  buttonParent: {
    flexDirection: 'row',
    marginTop:40
  },
  signIn1: {
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    fontSize: FontSize.size_base
  },
  pressable1: {
    justifyContent: 'center',
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    alignItems: 'center',
    flexDirection: 'row'
  },
  button2: {
    top: '5%',
    borderRadius: Border.br_11xl
  },
  invitacin: {
    backgroundColor: Color.white,
    padding: Padding.p_xl
  },
  paddingBottom: {
    paddingBottom: 90
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

export default Invitacin
