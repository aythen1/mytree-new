import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Pressable, Text, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, Padding, Color, Border, FontSize } from '../GlobalStyles'
import RecompensasSVG from '../components/svgs/RecompensasSVG'

const Recompensas = () => {
  const navigation = useNavigation()

  const points = [
    {
      diary: [10, 30, 200, 1000, 2000],
      wall: [1, 50, 3000, 30000, 100000],
      challenge: [20, 30, 200, 1000, 2000],
      vote: [1, 5, 1000, 5000, 500000]
    }
  ]
  const colors = ['#7EC18C', '#FFC269', '#B0B0B0', '#F9E168', '#65BBCE']

  return (
    <ScrollView
      style={[styles.recompensas, styles.iconLayout]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.paddingBottom}>
        <Image
          style={styles.image6Icon}
          contentFit="cover"
          source={require('../assets/image-6.png')}
        />
        <View style={styles.backParent}>
          <Pressable
            style={styles.backLayout}
            onPress={() => navigation.navigate('Muro')}
          >
            <Image
              style={[styles.icon, styles.iconLayout]}
              contentFit="cover"
              source={require('../assets/back.png')}
            />
          </Pressable>
          <Text style={[styles.recompensas1, styles.ptsTypo]}>Recompensas</Text>
        </View>
        <View>
          <Text style={[styles.accinPorRecompensa, styles.ptsTypo]}>
            Acción por recompensa
          </Text>
          <View style={styles.entradaAlDiarioDeFormaPbParent}>
            <Text style={[styles.entradaAlDiario, styles.ptsTypo]}>
              Entrada al diario de forma pública
            </Text>
            <ScrollView
              style={styles.frameParent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {points.map((point, pointIndex) => (
                <View style={styles.frameSquare} key={pointIndex}>
                  {point.diary.map((value, idx) => (
                    <View key={idx} style={styles.frameGroup}>
                      <View style={styles.ellipseParent}>
                        <Image
                          style={styles.frameChild}
                          contentFit="cover"
                          source={require('../assets/ellipse-7170.png')}
                        />
                        <RecompensasSVG
                          fillColor={colors[idx % colors.length]}
                          styles={[styles.vectorIcon, styles.backLayout]}
                        />
                      </View>
                      <Text style={[styles.pts, styles.ptsTypo]}>{value}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.entradaAlDiarioDeFormaPbParent}>
            <Text style={[styles.entradaAlDiario, styles.ptsTypo]}>
              Interactuar con el muro
            </Text>
            <ScrollView
              style={styles.frameParent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {points.map((point, pointIndex) => (
                <View style={styles.frameSquare} key={pointIndex}>
                  {point.wall.map((value, idx) => (
                    <View key={idx} style={styles.frameGroup}>
                      <View style={styles.ellipseParent}>
                        <Image
                          style={styles.frameChild}
                          contentFit="cover"
                          source={require('../assets/ellipse-7170.png')}
                        />
                        <RecompensasSVG
                          fillColor={colors[idx % colors.length]}
                          styles={[styles.vectorIcon, styles.backLayout]}
                        />
                      </View>
                      <Text style={[styles.pts, styles.ptsTypo]}>{value}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.entradaAlDiarioDeFormaPbParent}>
            <Text style={[styles.entradaAlDiario, styles.ptsTypo]}>
              Creación de retos
            </Text>
            <ScrollView
              style={styles.frameParent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {points.map((point, pointIndex) => (
                <View style={styles.frameSquare} key={pointIndex}>
                  {point.challenge.map((value, idx) => (
                    <View key={idx} style={styles.frameGroup}>
                      <View style={styles.ellipseParent}>
                        <Image
                          style={styles.frameChild}
                          contentFit="cover"
                          source={require('../assets/ellipse-7170.png')}
                        />
                        <RecompensasSVG
                          fillColor={colors[idx % colors.length]}
                          styles={[styles.vectorIcon, styles.backLayout]}
                        />
                      </View>
                      <Text style={[styles.pts, styles.ptsTypo]}>{value}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.entradaAlDiarioDeFormaPbParent}>
            <Text style={[styles.entradaAlDiario, styles.ptsTypo]}>
              Votación de retos
            </Text>
            <ScrollView
              style={styles.frameParent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {points.map((point, pointIndex) => (
                <View style={styles.frameSquare} key={pointIndex}>
                  {point.vote.map((value, idx) => (
                    <View key={idx} style={styles.frameGroup}>
                      <View style={styles.ellipseParent}>
                        <Image
                          style={styles.frameChild}
                          contentFit="cover"
                          source={require('../assets/ellipse-7170.png')}
                        />
                        <RecompensasSVG
                          fillColor={colors[idx % colors.length]}
                          styles={[styles.vectorIcon, styles.backLayout]}
                        />
                      </View>
                      <Text style={[styles.pts, styles.ptsTypo]}>{value}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  iconLayout: {
    overflow: 'hidden',
    width: '100%'
  },
  ptsTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  backLayout: {
    height: 24,
    width: 24
  },
  image6Icon: {
    top: '2.5%',
    width: 87,
    height: 55,
    left: '2%'
  },
  icon: {
    height: '100%'
  },
  recompensas1: {
    marginLeft: 20,
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '700',
    fontSize: FontSize.size_5xl
  },
  backParent: {
    gap: 20,
    alignItems: 'center',
    flexDirection: 'row',
    left: 20,
    marginBottom: '10%',
    marginTop: '5%'
  },
  accinPorRecompensa: {
    color: Color.primario1,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '700',
    fontSize: FontSize.size_5xl
  },
  entradaAlDiario: {
    fontSize: FontSize.size_xl,
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  frameChild: {
    width: 35,
    height: 35,
    zIndex: 0
  },
  vectorIcon: {
    top: 7,
    left: 6,
    zIndex: 1,
    position: 'absolute'
  },
  ellipseParent: {
    flexDirection: 'row'
  },
  pts: {
    fontSize: FontSize.size_base,
    marginTop: 3,
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  frameGroup: {
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    borderColor: Color.primario1,
    borderStyle: 'solid',
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xs,
    alignItems: 'center',
    overflow: 'hidden',
    width: '17%'
  },
  frameParent: {
    marginTop: 20,
    flexDirection: 'row'
  },
  frameSquare: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 15,
    width: 500
  },
  entradaAlDiarioDeFormaPbParent: {
    marginTop: 20
  },
  recompensas: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 5
  },
  paddingBottom: {
    paddingBottom: 50
  }
})

export default Recompensas
