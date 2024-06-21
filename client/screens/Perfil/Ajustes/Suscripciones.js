import React from 'react'
import { Image } from 'expo-image'
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  ScrollView,
  Dimensions
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  Color,
  FontFamily,
  FontSize,
  Padding,
  Border
} from '../../../GlobalStyles'

const Suscripciones = () => {
  const navigation = useNavigation()

  return (
    <ScrollView
      style={[styles.suscripciones, styles.iconLayout]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.frameParent, styles.frameParentPosition]}>
        <View style={styles.image6Parent}>
          <Image
            style={styles.image6Icon}
            contentFit="cover"
            source={require('../../../assets/image-6.png')}
          />
          <View style={[styles.backParent, styles.buttonFlexBox]}>
            <Pressable
              style={styles.back}
              onPress={() => navigation.navigate('PerfilAjustes')}
            >
              <Image
                style={[styles.icon, styles.iconLayout]}
                contentFit="cover"
                source={require('../../../assets/back.png')}
              />
            </Pressable>
            <Text style={styles.suscripciones1}>Suscripciones</Text>
          </View>
        </View>
        <View style={styles.div2CardsParent}>
          <View style={[styles.div2Cards, styles.div2ShadowBox]}>
            <View style={styles.card}>
              <View style={styles.content}>
                <View style={styles.content}>
                  <View style={styles.content}>
                    <View style={[styles.premiumParent, styles.frameFlexBox]}>
                      <Text style={[styles.premium, styles.mesTypo]}>
                        Premium
                      </Text>
                      <Text style={[styles.mes, styles.mesTypo]}>
                        €4.99/mes
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.planEspecialPara, styles.planTypo]}>
                    Plan especial para un usuario
                  </Text>
                </View>
                <LinearGradient
                  style={[styles.button, styles.buttonFlexBox]}
                  locations={[0, 1]}
                  colors={['#dee274', '#7ec18c']}
                >
                  <Text style={styles.signIn}>Adquirir ahora</Text>
                </LinearGradient>
                <View style={styles.divider} />
                <View style={styles.content2}>
                  <View style={[styles.frameGroup, styles.frameFlexBox]}>
                    <View style={styles.checkParent}>
                      <Image
                        style={styles.checkIcon}
                        contentFit="cover"
                        source={require('../../../assets/check.png')}
                      />
                      <Text style={styles.soportePrioritarioTypo}>
                        Soporte Prioritario
                      </Text>
                    </View>
                    <Image
                      style={styles.infoIcon}
                      contentFit="cover"
                      source={require('../../../assets/info.png')}
                    />
                  </View>
                  <View style={[styles.frameContainer, styles.frameFlexBox]}>
                    <View style={styles.checkParent}>
                      <Image
                        style={styles.checkIcon}
                        contentFit="cover"
                        source={require('../../../assets/check1.png')}
                      />
                      <Text style={styles.soportePrioritarioTypo}>
                        5 Fotos alta calidad en perfil
                      </Text>
                    </View>
                    <Image
                      style={styles.infoIcon}
                      contentFit="cover"
                      source={require('../../../assets/info.png')}
                    />
                  </View>
                  <View style={[styles.frameContainer, styles.frameFlexBox]}>
                    <View style={styles.checkParent}>
                      <Image
                        style={styles.checkIcon}
                        contentFit="cover"
                        source={require('../../../assets/check1.png')}
                      />
                      <Text style={styles.soportePrioritarioTypo}>
                        Copia de seguridad de datos
                      </Text>
                    </View>
                    <Image
                      style={styles.infoIcon}
                      contentFit="cover"
                      source={require('../../../assets/info.png')}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.div2Cards1, styles.div2ShadowBox]}>
            <View style={styles.card}>
              <View style={styles.content}>
                <View style={styles.content}>
                  <View style={styles.content}>
                    <View style={[styles.premiumParent, styles.frameFlexBox]}>
                      <Text style={[styles.premium, styles.mesTypo]}>VIP</Text>
                      <Text style={[styles.mes, styles.mesTypo]}>
                        €9.99/mes
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.planEspecialPara, styles.planTypo]}>
                    Plan especial para dos usuarios
                  </Text>
                </View>
                <LinearGradient
                  style={[styles.button, styles.buttonFlexBox]}
                  locations={[0, 1]}
                  colors={['#dee274', '#7ec18c']}
                >
                  <Text style={styles.signIn}>Adquirir ahora</Text>
                </LinearGradient>
                <View style={styles.divider} />
                <View style={[styles.frameContainer, styles.frameFlexBox]}>
                  <View style={styles.checkParent}>
                    <Image
                      style={styles.checkIcon}
                      contentFit="cover"
                      source={require('../../../assets/check1.png')}
                    />
                    <Text style={styles.soportePrioritarioTypo}>
                      Soporte Avanzado
                    </Text>
                  </View>
                  <Image
                    style={styles.infoIcon}
                    contentFit="cover"
                    source={require('../../../assets/info.png')}
                  />
                </View>
                <View style={[styles.frameContainer, styles.frameFlexBox]}>
                  <View style={styles.checkParent}>
                    <Image
                      style={styles.checkIcon}
                      contentFit="cover"
                      source={require('../../../assets/check1.png')}
                    />
                    <Text style={styles.soportePrioritarioTypo}>
                      Menos anuncios
                    </Text>
                  </View>
                  <Image
                    style={styles.infoIcon}
                    contentFit="cover"
                    source={require('../../../assets/info.png')}
                  />
                </View>
                <View style={[styles.frameContainer, styles.frameFlexBox]}>
                  <View style={styles.checkParent}>
                    <Image
                      style={styles.checkIcon}
                      contentFit="cover"
                      source={require('../../../assets/check2.png')}
                    />
                    <Text
                      style={[
                        styles.emojisExclusivosEn,
                        styles.soportePrioritarioTypo
                      ]}
                    >
                      Emojis exclusivos en toda la plataforma MyDiary,
                      Mensajería, diseño del muro, etc.
                    </Text>
                  </View>
                  <Image
                    style={styles.infoIcon}
                    contentFit="cover"
                    source={require('../../../assets/info1.png')}
                  />
                </View>
                <View style={[styles.frameContainer, styles.frameFlexBox]}>
                  <View style={styles.checkParent}>
                    <Image
                      style={styles.checkIcon}
                      contentFit="cover"
                      source={require('../../../assets/check1.png')}
                    />
                    <Text style={styles.soportePrioritarioTypo}>
                      Copia de seguridad de datos
                    </Text>
                  </View>
                  <Image
                    style={styles.infoIcon}
                    contentFit="cover"
                    source={require('../../../assets/info.png')}
                  />
                </View>
                <View style={[styles.frameContainer, styles.frameFlexBox]}>
                  <View style={styles.checkParent}>
                    <Image
                      style={styles.checkIcon}
                      contentFit="cover"
                      source={require('../../../assets/check1.png')}
                    />
                    <Text style={styles.soportePrioritarioTypo}>
                      Fotos y videos de alta calidad
                    </Text>
                  </View>
                  <Image
                    style={styles.infoIcon}
                    contentFit="cover"
                    source={require('../../../assets/info.png')}
                  />
                </View>
                <View style={[styles.frameContainer, styles.frameFlexBox]}>
                  <View style={styles.checkParent}>
                    <Image
                      style={styles.checkIcon}
                      contentFit="cover"
                      source={require('../../../assets/check1.png')}
                    />
                    <Text style={styles.soportePrioritarioTypo}>
                      Emojis y filtros exclusivos
                    </Text>
                  </View>
                  <Image
                    style={styles.infoIcon}
                    contentFit="cover"
                    source={require('../../../assets/info.png')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.div2Cards2, styles.div2ShadowBox]}>
            <View style={styles.card}>
              <View style={styles.content}>
                <View style={styles.content}>
                  <View style={[styles.premiumParent, styles.frameFlexBox]}>
                    <Text style={[styles.premium, styles.mesTypo]}>
                      Vínculo Infinito
                    </Text>
                    <Text style={[styles.mes, styles.mesTypo]}>€19.99/mes</Text>
                  </View>
                  <Text style={[styles.planEspecialPara2, styles.planTypo]}>
                    Plan especial para cuatro o más usuarios
                  </Text>
                </View>
                <LinearGradient
                  style={[styles.button, styles.buttonFlexBox]}
                  locations={[0, 1]}
                  colors={['#dee274', '#7ec18c']}
                >
                  <Text style={styles.signIn}>Adquirir ahora</Text>
                </LinearGradient>
                <View style={styles.divider} />
                <View style={styles.content2}>
                  <View style={[styles.frameGroup, styles.frameFlexBox]}>
                    <View style={styles.checkParent}>
                      <Image
                        style={styles.checkIcon}
                        contentFit="cover"
                        source={require('../../../assets/check1.png')}
                      />
                      <Text style={styles.soportePrioritarioTypo}>
                        Sin Anuncios
                      </Text>
                    </View>
                    <Image
                      style={styles.infoIcon}
                      contentFit="cover"
                      source={require('../../../assets/info.png')}
                    />
                  </View>
                  <View style={[styles.frameContainer, styles.frameFlexBox]}>
                    <View style={styles.checkParent}>
                      <Image
                        style={styles.checkIcon}
                        contentFit="cover"
                        source={require('../../../assets/check1.png')}
                      />
                      <Text style={styles.soportePrioritarioTypo}>
                        Soporte VIP
                      </Text>
                    </View>
                    <Image
                      style={styles.infoIcon}
                      contentFit="cover"
                      source={require('../../../assets/info.png')}
                    />
                  </View>
                  <View style={[styles.frameContainer, styles.frameFlexBox]}>
                    <View style={styles.checkParent}>
                      <Image
                        style={styles.checkIcon}
                        contentFit="cover"
                        source={require('../../../assets/check1.png')}
                      />
                      <Text style={styles.soportePrioritarioTypo}>
                        IA para mejorar tus fotos antiguas
                      </Text>
                    </View>
                    <Image
                      style={styles.infoIcon}
                      contentFit="cover"
                      source={require('../../../assets/info.png')}
                    />
                  </View>
                  <View style={[styles.frameContainer, styles.frameFlexBox]}>
                    <View style={styles.checkParent}>
                      <Image
                        style={styles.checkIcon}
                        contentFit="cover"
                        source={require('../../../assets/check1.png')}
                      />
                      <Text style={styles.soportePrioritarioTypo}>
                        Acceso Anticipado a Funciones Nuevas
                      </Text>
                    </View>
                    <Image
                      style={styles.infoIcon}
                      contentFit="cover"
                      source={require('../../../assets/info.png')}
                    />
                  </View>
                  <View style={[styles.frameContainer, styles.frameFlexBox]}>
                    <View style={styles.checkParent}>
                      <Image
                        style={styles.checkIcon}
                        contentFit="cover"
                        source={require('../../../assets/check1.png')}
                      />
                      <Text style={styles.soportePrioritarioTypo}>
                        Fotos y videos en alta calidad
                      </Text>
                    </View>
                    <Image
                      style={styles.infoIcon}
                      contentFit="cover"
                      source={require('../../../assets/info.png')}
                    />
                  </View>
                  <View style={[styles.frameContainer, styles.frameFlexBox]}>
                    <View style={styles.checkParent}>
                      <Image
                        style={styles.checkIcon}
                        contentFit="cover"
                        source={require('../../../assets/check1.png')}
                      />
                      <Text
                        style={styles.soportePrioritarioTypo}
                      >{`Fotos y videos ID Infantes y Ancestros
en alta calidad`}</Text>
                    </View>
                    <Image
                      style={styles.infoIcon}
                      contentFit="cover"
                      source={require('../../../assets/info.png')}
                    />
                  </View>
                  <View style={[styles.frameContainer, styles.frameFlexBox]}>
                    <View style={styles.checkParent}>
                      <Image
                        style={styles.checkIcon}
                        contentFit="cover"
                        source={require('../../../assets/check1.png')}
                      />
                      <Text style={styles.soportePrioritarioTypo}>
                        Copia de seguridad de datos
                      </Text>
                    </View>
                    <Image
                      style={styles.infoIcon}
                      contentFit="cover"
                      source={require('../../../assets/info.png')}
                    />
                  </View>
                  <View style={[styles.frameContainer, styles.frameFlexBox]}>
                    <View style={styles.checkParent}>
                      <Image
                        style={styles.checkIcon}
                        contentFit="cover"
                        source={require('../../../assets/check1.png')}
                      />
                      <Text style={styles.soportePrioritarioTypo}>
                        Emojis y filtros exclusivos
                      </Text>
                    </View>
                    <Image
                      style={styles.infoIcon}
                      contentFit="cover"
                      source={require('../../../assets/info.png')}
                    />
                  </View>
                  <View style={[styles.frameContainer, styles.frameFlexBox]}>
                    <View style={styles.checkParent}>
                      <Image
                        style={styles.checkIcon}
                        contentFit="cover"
                        source={require('../../../assets/check1.png')}
                      />
                      <Text style={styles.soportePrioritarioTypo}>
                        Copia de Seguridad
                      </Text>
                    </View>
                    <Image
                      style={styles.infoIcon}
                      contentFit="cover"
                      source={require('../../../assets/info.png')}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Image
        style={[styles.navigationIcon, styles.frameParentPosition]}
        contentFit="cover"
        source={require('../../../assets/navigation40.png')}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  iconLayout: {
    width: '100%',
    overflow: 'hidden'
  },
  buttonFlexBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  div2ShadowBox: {
    elevation: 25,
    shadowRadius: 25,
    shadowColor: 'rgba(221, 219, 246, 0.25)',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4
    }
  },
  frameFlexBox: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  mesTypo: {
    color: Color.grisTextosWeb,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  planTypo: {
    color: Color.grisGeneral,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  soportePrioritarioTypo: {
    marginLeft: 8,
    letterSpacing: 1,
    fontSize: FontSize.size_base,
    color: Color.grisTextosWeb,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  image6Icon: {
    width: 87,
    height: 55,
    left: '6%',
    top: '13%'
  },
  icon: {
    height: '100%',
    overflow: 'hidden'
  },
  back: {
    width: 24,
    height: 24
  },
  suscripciones1: {
    color: Color.negro,
    marginLeft: 20,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '700',
    fontSize: FontSize.size_5xl
  },
  backParent: {
    marginTop: 20,
    marginLeft: 20
  },
  image6Parent: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowRadius: 4,
    elevation: 4,
    paddingHorizontal: Padding.p_xl,
    paddingBottom: Padding.p_xl,
    width: '100%',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4
    },
    backgroundColor: Color.white
  },
  premium: {
    fontWeight: '700',
    fontSize: FontSize.size_5xl,
    color: Color.grisTextosWeb
  },
  mes: {
    fontSize: FontSize.size_lg
  },
  premiumParent: {
    alignItems: 'flex-end'
  },
  content: {
    alignSelf: 'stretch'
  },
  planEspecialPara: {
    marginTop: 6
  },
  signIn: {
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: 'center',
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
    flex: 1
  },
  button: {
    borderRadius: Border.br_11xl,
    width: '95%',
    alignSelf: 'center',
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    marginTop: 16
  },
  divider: {
    borderStyle: 'solid',
    borderColor: Color.white,
    borderTopWidth: 1,
    height: 1,
    marginTop: 16,
    alignSelf: 'stretch'
  },
  checkIcon: {
    width: 20,
    height: 20,
    overflow: 'hidden'
  },
  checkParent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoIcon: {
    width: 16,
    height: 16,
    overflow: 'hidden'
  },
  frameGroup: {
    alignItems: 'center'
  },
  frameContainer: {
    marginTop: 16,
    alignItems: 'center'
  },
  content2: {
    marginTop: 16,
    alignSelf: 'stretch'
  },
  card: {
    borderRadius: Border.br_3xs,
    padding: Padding.p_xl,
    width: '100%',
    backgroundColor: Color.white
  },
  div2Cards: {
    width: '100%',
    borderWidth: 2
  },
  emojisExclusivosEn: {
    width: 304
  },
  div2Cards1: {
    width: '100%',
    marginTop: 20
  },
  planEspecialPara2: {
    marginTop: 8
  },
  div2Cards2: {
    width: '100%',
    marginTop: 20
  },
  div2CardsParent: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  frameParent: {
    top: 2,
    alignItems: 'center',
    paddingBottom: 650
  },
  navigationIcon: {
    top: 821,
    height: 105,
    width: 428
  },
  suscripciones: {
    overflow: 'hidden',
    flex: 1,
    backgroundColor: Color.white
  }
})

export default Suscripciones
