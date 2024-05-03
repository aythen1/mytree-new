import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Padding, Color, Border, FontSize, FontFamily } from '../GlobalStyles'
import PropTypes from 'prop-types'
import { TextInput } from 'react-native'
import { Context } from '../context/Context'

const Cancion1 = ({ onClose }) => {
  const {selectedHashtags, setSelectedHashtags} = useContext(Context)
  const [value, setValue] = useState('')

  const handleAddHashtag = (tag) => {
    console.log('value: ',value)
    if(selectedHashtags.length >= 4) {
      setValue('')
      return
    }
    if(tag){
      if(!selectedHashtags.includes(tag)){
        setSelectedHashtags([...selectedHashtags,tag])
        setValue('')
      }
      return
    }
    if(!selectedHashtags.includes(value)){
      setSelectedHashtags([...selectedHashtags,value])
      setValue('')
      return
    }
    setValue('')
  }
  console.log('selectedHashtags',selectedHashtags)
  return (
    <View style={styles.cancion}>
      <Text style={styles.aadirEvento}>Añadir evento</Text>
      <LinearGradient
        style={styles.button}
        locations={[0, 1]}
        colors={['#dee274', '#7ec18c']}
      >
        <Text onPress={onClose} style={styles.signIn}>
          Guardar
        </Text>
      </LinearGradient>
    <View style={{flexWrap:'wrap',flexDirection:'row',width:'100%',gap:3, marginTop:-5, paddingHorizontal:10}}>{selectedHashtags.length > 0 ? selectedHashtags.map((hashtag,index)=> <View style={{paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Color.secundario,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',gap:5,
    borderRadius: 100}}>
        <Text style={{color: Color.primario1,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.lato,
    fontWeight: '500'}}>
          {`#${hashtag}`}
        </Text>
        <TouchableOpacity onPress={()=>{
          setSelectedHashtags(selectedHashtags.filter(tag=>tag !== hashtag ))
        }}>
          <Image style={{width:10,height:10}} source={require('../assets/group-68462.png')}/>
        </TouchableOpacity>
      </View>): <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}><Text style={{fontSize: FontSize.size_xl,
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',}}>Añada Hashtags!</Text></View>}</View>
      <View style={styles.field}>
      <TextInput
              style={{fontSize: FontSize.size_base,
                lineHeight: 24,
                display: 'flex',
                width: '100%',
                marginLeft: 16,
                color: Color.negro,
                textAlign: 'left',
                height: 24,
                alignItems: 'center'}}
              placeholder="#"
              onChangeText={(text)=> setValue(text)}
              value={value}
            />
      </View>
      <LinearGradient
        style={{top: 155,
          borderRadius: 100,
          backgroundColor: Color.fAFAFA,
          height: 30,
          justifyContent:'center',alignItems:'center',
          left: 20,
          width: 70,
          position: 'absolute',
          overflow: 'hidden'}}
        locations={[0, 1]}
        colors={['#dee274', '#7ec18c']}
      >
      <TouchableOpacity  onPress={()=>handleAddHashtag()}><Text style={{ color: Color.white,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: FontFamily.lato}}>Añadir</Text></TouchableOpacity></LinearGradient>
      <TouchableOpacity onPress={()=>handleAddHashtag('MiPrimeraBicicleta')} style={[styles.button1, styles.buttonFlexBox1]}>
        <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
          #MiPrimeraBicicleta
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>handleAddHashtag('Felicidad')} style={[styles.button2, styles.buttonFlexBox1]}>
        <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
          #Felicidad
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>handleAddHashtag('Happy')} style={[styles.button3, styles.buttonFlexBox1]}>
        <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
          #Happy
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>handleAddHashtag('Emoción')} style={[styles.button4, styles.buttonFlexBox]}>
        <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
          #Emoción
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>handleAddHashtag('NosVamosDeViaje')} style={[styles.button5, styles.buttonFlexBox]}>
        <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
          #NosVamosDeViaje
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>handleAddHashtag('CumpleañosFeliz')} style={[styles.button6, styles.buttonFlexBox]}>
        <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
          #CumpleañosFeliz
        </Text>
      </TouchableOpacity>
      <Text style={[styles.recomendados, styles.recomendadosTypo]}>
        Recomendados:
      </Text>
    </View>
  )
}

Cancion1.propTypes = {
  onClose: PropTypes.func
}

const styles = StyleSheet.create({
  buttonFlexBox1: {
    paddingVertical: Padding.p_6xs,
    paddingHorizontal: Padding.p_3xs,
    backgroundColor: Color.secundario,
    top: 195,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    borderRadius: Border.br_11xl
  },
  recomendadosTypo: {
    lineHeight: 14,
    fontSize: FontSize.size_xs,
    letterSpacing: 0,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500'
  },
  buttonFlexBox: {
    top:226,
    paddingVertical: Padding.p_6xs,
    paddingHorizontal: Padding.p_3xs,
    backgroundColor: Color.secundario,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    borderRadius: Border.br_11xl
  },
  aadirEvento: {
    top: 10,
    fontSize: FontSize.size_xl,
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    left: '50%',
    marginLeft: -194,
    position: 'absolute'
  },
  signIn: {
    flex: 1,
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: 'center',
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato
  },
  button: {
    top: 280,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    marginLeft:'5%',
    borderRadius: Border.br_11xl
  },
  text: {
    marginTop: -9.5,
    top: '50%',
    lineHeight: 19,
    color: Color.gris,
    letterSpacing: 0,
    left: 20,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    position: 'absolute'
  },
  field: {
    top: 120,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    height: 49,
    left: 20,
    width: 388,
    position: 'absolute',
    overflow: 'hidden'
  },
  miprimerabicicleta: {
    color: Color.primario1
  },
  button1: {
    left: 113
  },
  button2: {
    left: 245
  },
  button3: {
    left: 325
  },
  button4: {
    left: 20
  },
  button5: {
    left: 102
  },
  button6: {
    left: 232
  },
  recomendados: {
    top: 200,
    color: Color.primary,
    left: 20,
    position: 'absolute',
    fontSize: FontSize.size_xs
  },
  cancion: {
    backgroundColor: Color.white,
    width: '100%',
    height: 400,
    overflow: 'hidden',
    borderTopLeftRadius: Border.br_11xl,
    borderTopRightRadius: Border.br_11xl,
    position: 'absolute',
    bottom: 0
  }
})

export default Cancion1
