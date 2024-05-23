import 'react-native-gesture-handler'
import React, { useEffect, useRef, useState } from 'react'
import AadirAlbum from './screens/AadirAlbum'
import Album from './screens/Album'
import Privacidad from './screens/Privacidad'
import LOGIN from './screens/Inicio/LOGIN'
import Onboarding from './screens/Inicio/Onboarding'
import Onboarding1 from './screens/Inicio/Onboarding1'
import RETOSMSVOTADOS from './screens/Retos/RETOSMSVOTADOS'
import CrearLbum from './screens/CrearLbum'
import AadirAUnAlbum from './screens/AadirAUnAlbum'
import CrearAlbum from './screens/CrearAlbum'
import Organizador from './screens/Organizador'
import RetosFamiliaresCumplido from './screens/Retos/RetosFamiliaresCumplido'
import RetosFamiliaresSinCumplir from './screens/Retos/RetosFamiliaresSinCumplir'
import Chat from './screens/Mensajes/Chat'
import AADIRAADIRANCESTRO from './screens/AADIRAADIRANCESTRO'
import AADIRAADIRINFANTE from './screens/AADIRAADIRINFANTE'
import TarjetaDigital from './screens/TarjetaDigital'
import MUROALERTAS1 from './screens/MUROALERTAS1'
import MENSAJERA from './screens/Mensajes/MENSAJERA'
import Busqueda from './screens/Busqueda/Busqueda'
import BIO2Ancestro from './screens/BIO2Ancestro'
import BIO2Infante from './screens/BIO2Infante'
import PERFILIDANCESTRO from './screens/PERFILIDANCESTRO'
import PERFILIDINFANTE from './screens/PERFILIDINFANTE'
import PERFILCREARIDINFANTEANCE from './screens/PERFILCREARIDINFANTEANCE'
import Novedades from './screens/Novedades'
import Recompensas from './screens/Recompensas'
import Invitacin from './screens/Invitacin'
import MIDIARIOPANTALLAPERSONAL from './screens/Diario/MIDIARIOPANTALLAPERSONAL'
import MIDIARIOEDICINVIDEO from './screens/Diario/MIDIARIOEDICINVIDEO'
import MIDIARIOENTRADAVIDEO from './screens/MIDIARIOENTRADAVIDEO'
import Onboarding2 from './screens/Inicio/Onboarding2'
import Muro from './screens/Muro/Muro'
import CrearEvento from './screens/Calendario/CrearEvento'
import BOTONInvitarAmigos1 from './screens/BOTONInvitarAmigos1'
import PERFILNOTIFICACIONES from './screens/Muro/PERFILNOTIFICACIONES'
import PerfilSeguridad from './screens/Perfil/Ajustes/PerfilSeguridad'
import PerfilPrivacidad from './screens/Perfil/Ajustes/PerfilPrivacidad'
import PerfilVisualizacionMyTree from './screens/Perfil/Ajustes/PerfilVisualizacionMyTree'
import PERFILANCESTROAJUSTES from './screens/PERFILANCESTROAJUSTES'
import PERFILANCESTROAJUSTES1 from './screens/PERFILANCESTROAJUSTES1'
import PERFILINFANTEAJUSTES from './screens/PERFILINFANTEAJUSTES'
import PerfilConfiguracion from './screens/Perfil/Ajustes/PerfilConfiguracion'
import PerfilAjustes from './screens/Perfil/Ajustes/PerfilAjustes'
import PERFILMIINFO from './screens/Perfil/PERFILMIINFO'
import RetosBienvenida from './screens/Retos/RetosBienvenida'
import MisAlbumes from './screens/Perfil/MisAlbumes'
import SOLOYO from './screens/Perfil/SOLOYO'
import Perfil from './screens/Perfil/Perfil'
import MIDIARIOENTRADATEXTOPL7 from './screens/Diario/MIDIARIOENTRADATEXTOPL7'
import CALENDARIO from './screens/Calendario/CALENDARIO'
import Splash from './screens/Inicio/Splash'
import REGISTROPOLTICASDEPRIVAC from './screens/Inicio/REGISTROPOLTICASDEPRIVAC'
import REGISTROTRMINOSYCONDICIO from './screens/Inicio/REGISTROTRMINOSYCONDICIO'
import Suscripciones from './screens/Perfil/Ajustes/Suscripciones'
import CrearGrupo from './screens/Mensajes/CrearGrupo'
import CrearFechaEspecial from './screens/Calendario/CrearFechaEspecial'
import CrearReto from './screens/Retos/CrearReto'
import FooterNavBar from './components/FooterNavBar'
import Papers from './screens/Diario/Papers'
import FiltroEdicion from './components/FiltroEdicion'
import FiltroEdicionRecuerdo from './components/FiltroEdicionRecuerdo'
import Register from './screens/Inicio/Register'
import Eventos from './screens/Calendario/Eventos'
import MasDetallesEventos from './screens/Calendario/MasDetallesEventos'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { loadFonts } from './GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Platform, StatusBar } from 'react-native'
import UploadMemory from './screens/Memories/UploadMemory'
import { ContextProvider } from './context/Context'
import * as Linking from 'expo-linking'
import OpenedChat from './screens/Mensajes/OpenedChat'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from './components/DrawerContent'
import { NavigationContainer } from '@react-navigation/native'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

const prefix = Platform.OS == 'android' ? 'mytree://mytree/' : 'mytree://'

const linking = {
  prefixes: [prefix, 'https://app.mytree.com']
}

const App = () => {
  const navigationRef = useRef()
  const [isFooterShow, setIsFooterShow] = useState(null)
  const loadApp = async () => {
    await loadFonts()
  }

  useEffect(() => {
    Linking.addEventListener('url', async (e) => {
      const { hostname, path, queryParams } = Linking.parse(e.url)
      // console.log(queryParams,"parms")
      // const re =await Linking.openURL("http://mytreeappoficial.com")
      // console.log(re,"navsss")
      navigationRef.current?.navigate('Muro', queryParams) // Usar
    })
    loadApp()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        hidden={!isFooterShow}
        barStyle={'dark-content'}
        backgroundColor="#fff"
      />
      <Provider store={store}>
        <ContextProvider>
          <NavigationContainer ref={navigationRef} linking={linking}>
            <Drawer.Navigator
              screenOptions={{
                drawerStyle: {
                  backgroundColor: 'transparent'
                }
              }}
              drawerContent={(props) => <DrawerContent {...props} />}
            >
              <Drawer.Screen
                options={{ headerShown: false }}
                name="Main"
                component={() => (
                  <MainStackNavigator setIsFooterShow={setIsFooterShow} />
                )}
              />
            </Drawer.Navigator>
            {isFooterShow && <FooterNavBar />}
          </NavigationContainer>
        </ContextProvider>
      </Provider>
    </SafeAreaView>
  )
}

const MainStackNavigator = ({ setIsFooterShow }) => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding2"
      screenOptions={({ route }) => ({
        headerShown: false,
        footerShown: setIsFooterShow(
          route.name !== 'Register' &&
            route.name !== 'Splash' &&
            route.name !== 'Onboarding' &&
            route.name !== 'Onboarding1' &&
            route.name !== 'Onboarding2' &&
            route.name !== 'LOGIN'
        )
      })}
    >
      <Stack.Screen
        name="AadirAlbum"
        component={AadirAlbum}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UploadMemory"
        component={UploadMemory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Album"
        component={Album}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Privacidad"
        component={Privacidad}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LOGIN"
        component={LOGIN}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding1"
        component={Onboarding1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RETOSMSVOTADOS"
        component={RETOSMSVOTADOS}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FiltroEdicion"
        component={FiltroEdicion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearLbum"
        component={CrearLbum}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AadirAUnAlbum"
        component={AadirAUnAlbum}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearAlbum"
        component={CrearAlbum}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Organizador"
        component={Organizador}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RetosFamiliaresCumplido"
        component={RetosFamiliaresCumplido}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RetosFamiliaresSinCumplir"
        component={RetosFamiliaresSinCumplir}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AADIRAADIRANCESTRO"
        component={AADIRAADIRANCESTRO}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AADIRAADIRINFANTE"
        component={AADIRAADIRINFANTE}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TarjetaDigital"
        component={TarjetaDigital}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearReto"
        component={CrearReto}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MUROALERTAS1"
        component={MUROALERTAS1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MENSAJERA"
        component={MENSAJERA}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Busqueda"
        component={Busqueda}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BIO2Ancestro"
        component={BIO2Ancestro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BIO2Infante"
        component={BIO2Infante}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PERFILIDANCESTRO"
        component={PERFILIDANCESTRO}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PERFILIDINFANTE"
        component={PERFILIDINFANTE}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PERFILCREARIDINFANTEANCE"
        component={PERFILCREARIDINFANTEANCE}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Novedades"
        component={Novedades}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recompensas"
        component={Recompensas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Invitacin"
        component={Invitacin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MIDIARIOPANTALLAPERSONAL"
        component={MIDIARIOPANTALLAPERSONAL}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MIDIARIOEDICINVIDEO"
        component={MIDIARIOEDICINVIDEO}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OpenedChat"
        component={OpenedChat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MIDIARIOENTRADAVIDEO"
        component={MIDIARIOENTRADAVIDEO}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding2"
        component={Onboarding2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Muro"
        component={Muro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearEvento"
        component={CrearEvento}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BOTONInvitarAmigos1"
        component={BOTONInvitarAmigos1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PERFILNOTIFICACIONES"
        component={PERFILNOTIFICACIONES}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PerfilSeguridad"
        component={PerfilSeguridad}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PerfilPrivacidad"
        component={PerfilPrivacidad}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PerfilVisualizacionMyTree"
        component={PerfilVisualizacionMyTree}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PERFILANCESTROAJUSTES"
        component={PERFILANCESTROAJUSTES}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PERFILANCESTROAJUSTES1"
        component={PERFILANCESTROAJUSTES1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PERFILINFANTEAJUSTES"
        component={PERFILINFANTEAJUSTES}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PerfilConfiguracion"
        component={PerfilConfiguracion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PerfilAjustes"
        component={PerfilAjustes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PERFILMIINFO"
        component={PERFILMIINFO}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RetosBienvenida"
        component={RetosBienvenida}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MisAlbumes"
        component={MisAlbumes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SOLOYO"
        component={SOLOYO}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Papers"
        component={Papers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MIDIARIOENTRADATEXTOPL7"
        component={MIDIARIOENTRADATEXTOPL7}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CALENDARIO"
        component={CALENDARIO}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Eventos"
        component={Eventos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MasDetallesEventos"
        component={MasDetallesEventos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FiltroEdicionRecuerdo"
        component={FiltroEdicionRecuerdo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="REGISTROPOLTICASDEPRIVAC"
        component={REGISTROPOLTICASDEPRIVAC}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="REGISTROTRMINOSYCONDICIO"
        component={REGISTROTRMINOSYCONDICIO}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Suscripciones"
        component={Suscripciones}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearGrupo"
        component={CrearGrupo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearFechaEspecial"
        component={CrearFechaEspecial}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default App
