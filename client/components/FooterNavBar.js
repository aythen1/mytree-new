import React, { useContext, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import CalendarSVG from './svgs/CalendarSVG';
import FooterBookSVG from './svgs/FooterBookSVG';
import UsuarioSVG from './svgs/UsuarioSVG';
import HomeSVG from './svgs/HomeSVG';
import Aadir1 from './Aadir1';
import { setPanelAddFooter } from '../redux/slices/panel.slices';
import { Color } from '../GlobalStyles';
import { Context } from '../context/Context';

const FooterNavBar = () => {
  const {showCamera} = useContext(Context)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { panelAddFooter } = useSelector((state) => state.panel);

  const [selected, setSelected] = useState('Muro');

  const showModalAdd = () => {
   dispatch(setPanelAddFooter(!panelAddFooter));
  };

 if (!showCamera) return (
    <>
      <View style={{
        height: 70,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopStartRadius: 7,
        borderTopEndRadius: 7,
        backgroundColor: 'white',
        zIndex: 100,
        position: 'absolute',
        bottom: 0
      }}>
        <View style={{ flexDirection: 'row',gap:(Dimensions.get('window').width/10), marginLeft: '12%'}}>
          <Pressable
            onPress={() => {
              navigation.navigate('Muro');
              setSelected('Muro');
            }}
          >
            <HomeSVG
              picked={selected === 'Muro' ? true : false}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('CALENDARIO');
              setSelected('Calendario');
            }}
            style={{  }}
          >
            <CalendarSVG
              picked={selected === 'Calendario' ? true : false}
            />
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row',gap:(Dimensions.get('window').width/10), marginRight: '12%' }}>
          <Pressable
            onPress={() => {
              navigation.navigate('MIDIARIOPANTALLAPERSONAL');
              setSelected('MiDiario');
            }}
            style={{  }}
          >
            <FooterBookSVG
              picked={selected === 'MiDiario' ? true:false}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Perfil');
              setSelected('Perfil');
            }}
          >
            <UsuarioSVG
              picked={selected === 'Perfil' ? true:false}
            />
          </Pressable>
        </View>

        <Pressable style={{
          width: 60,
          height: 60,
          backgroundColor: Color.backgroundGreyBackground,
          position: 'absolute',
          top: -30,
          left: '50%',
          marginLeft: -30,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center'
        }} onPress={showModalAdd}>
          <LinearGradient
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 60,
              zIndex: 0
            }}
            locations={[0, 1]}
            colors={['#7ec18c', '#dee274']}
          >
            
            <Image style={{width:25,height:25, borderWidth:2}} contentFit="cover" source={require('../assets/PlusPng.png')}/>
          </LinearGradient>
        </Pressable>
      </View>

      {panelAddFooter && (
        <Modal transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={showModalAdd}>
            <View style={{ height: '100%' }}>
              <Aadir1 />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
};

export default FooterNavBar;
