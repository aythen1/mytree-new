import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { FontFamily, FontSize, Color, Padding, Border } from '../GlobalStyles'
import Checkbox from './Checkbox'
import { useSelector } from 'react-redux'

const Etiquetar = ({ onClose, taggedUsers, setTaggedUsers }) => {
  const {allUsers}= useSelector(state=>state.users)

  const handleToggleTag = (userId) => {
    if (taggedUsers.includes(userId)) {
      const newArray = taggedUsers.filter(id => id !== userId);
      setTaggedUsers(newArray);
    } else {
      setTaggedUsers([...taggedUsers, userId]);
    }
  };

  return (
    <View style={styles.etiquetar}>
      <View style={styles.frameParent}>
        
      <View style={{alignSelf:'flex-start',
    alignItems: 'center'}}>
          <Text style={[styles.grupo1, styles.grupo1Typo]}>Amigos</Text>

        </View>
        <View style={{ borderColor: Color.secundario,
    borderTopWidth: 1,
    width: '100%',
    height: 1,
    marginTop: 15,
    borderStyle: 'solid'}} />
        {
          allUsers.map((user,index)=><View key={-index} style={[styles.frameGroup, styles.frameGroupFlexBox]}>
          <View style={styles.buttonFlexBox}>
            <Image
              style={styles.frameItem}
              contentFit="cover"
              source={require('../assets/frame-1547754875.png')}
            />
            <Text style={[styles.brunoPham, styles.grupo1Typo]}>
              {user.username + ' ' + user.apellido}
            </Text>
          </View>
         <Checkbox checked={taggedUsers.includes(user.id)}
              setChecked={() => handleToggleTag(user.id)} />
        </View>)
        }



        <View style={{alignSelf:'flex-start', marginTop:20,
    alignItems: 'center'}}>
          <Text style={[styles.grupo1, styles.grupo1Typo]}>Familia</Text>

        </View>
        <View style={{ borderColor: Color.secundario,
    borderTopWidth: 1,
    width: '100%',
    height: 1,
    marginTop: 15,
    borderStyle: 'solid'}} />
        {
          allUsers.map((user,index)=><View key={index} style={[styles.frameGroup, styles.frameGroupFlexBox]}>
          <View style={styles.buttonFlexBox}>
            <Image
              style={styles.frameItem}
              contentFit="cover"
              source={require('../assets/frame-1547754875.png')}
            />
            <Text style={[styles.brunoPham, styles.grupo1Typo]}>
              {user.username + ' ' + user.apellido}
            </Text>
          </View>
         <Checkbox checked={taggedUsers.includes(user.id)}
              setChecked={() => handleToggleTag(user.id)}/>
        </View>)
        }
        
      </View>
      <TouchableOpacity onPress={onClose}>
        <LinearGradient
          style={[styles.button, styles.buttonFlexBox]}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <Text style={[styles.signIn, styles.grupo1Typo]}>Aceptar</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  grupo1Typo: {
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base
  },
  frameGroupFlexBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 388,
    alignItems: 'center'
  },
  buttonFlexBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  grupo1: {
    fontWeight: '500',
    color: Color.colorGray_200,
    textAlign: 'left',
    lineHeight: 19,
    letterSpacing: 0,
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base
  },
  checkChild: {
    height: '105%',
    width: '105%',
    top: '-2.5%',
    right: '-2.5%',
    bottom: '-2.5%',
    left: '-2.5%',
    borderRadius: 3,
    borderColor: Color.colorGainsboro_100,
    borderWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    backgroundColor: Color.white
  },
  check: {
    width: 20,
    height: 20
  },
  frameChild: {
    borderColor: Color.secundario,
    borderTopWidth: 1,
    width: 389,
    height: 1,
    marginTop: 15,
    borderStyle: 'solid'
  },
  frameItem: {
    width: 30,
    height: 30
  },
  brunoPham: {
    fontWeight: '700',
    color: Color.grisDiscord,
    textAlign: 'justify',
    marginLeft: 13,
    lineHeight: 19,
    letterSpacing: 0,
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base
  },
  frameGroup: {
    marginTop: 15
  },
  frameParent: {
    top: 20,
    height: 320,
    alignItems: 'center',
    left: 20,
    position: 'absolute'
  },
  signIn: {
    flex: 1,
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base
  },
  button: {
    top: 397,
    justifyContent: 'center',
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    width: 388,
    flexDirection: 'row',
    left: 20,
    position: 'absolute',
    borderRadius: Border.br_11xl
  },
  etiquetar: {
    width: '100%',
    height: 500,
    // maxWidth: '100%',
    // maxHeight: '100%',
    backgroundColor: Color.white,
    borderTopRightRadius: Border.br_11xl,
    borderTopLeftRadius: Border.br_11xl,
    position: 'absolute',
    bottom: 0
  }
})

export default Etiquetar
