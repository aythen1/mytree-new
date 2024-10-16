import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontSize, FontFamily, Padding, Border } from "../GlobalStyles";
import Checkbox from "expo-checkbox";

const Privacidad = ({ onClose, setPrivacy, privacy }) => {
  return (
    <View style={styles.privacidad}>
      <View style={styles.frameParent}>
        <View style={[styles.vectorParent, styles.parentFlexBox]}>
          <Image
            style={styles.vectorIcon}
            contentFit="contain"
            source={require("../assets/greenBackArrow.png")}
          />
          <Text style={styles.opcionesDePrivacidad}>
            Opciones de privacidad
          </Text>
        </View>
        <View style={styles.vectorGroup}>
          <Image
            style={[styles.frameChild, styles.frameChildLayout]}
            contentFit="cover"
            source={require("../assets/line-78.png")}
          />
          <View style={styles.quinPuedeVerTuPublicacinParent}>
            <Text style={[styles.quinPuedeVer, styles.quinPuedeVerTypo]}>
              ¿Quién puede ver tu publicación?
            </Text>
            <Text style={[styles.loremIpsumDolor, styles.familiaYAmigosTypo]}>
              Aquí podrás escoger todas las posibilidades para configurar quién
              puede visualizar tu contenido.
            </Text>
          </View>
          <View style={styles.elegirAudienciaParent}>
            <Text style={[styles.quinPuedeVer2, styles.quinPuedeVerTypo]}>
              Elegir audiencia
            </Text>
            <View style={[styles.checkParent, styles.parentFlexBox]}>
              <View style={styles.check}>
                <Checkbox
                  color={Color.primario1}
                  value={privacy === "Todos"}
                  onValueChange={() => setPrivacy("Todos")}
                />
              </View>
              <View style={[styles.userParent, styles.parentFlexBox]}>
                <Image
                  style={styles.userIcon}
                  contentFit="cover"
                  source={require("../assets/3-user.png")}
                />
                <Text
                  style={[styles.familiaYAmigos, styles.familiaYAmigosTypo]}
                >
                  Todos
                </Text>
              </View>
            </View>
            <View style={[styles.checkParent, styles.parentFlexBox]}>
              <View style={styles.check}>
                <Checkbox
                  color={Color.primario1}
                  value={privacy === "Amigos"}
                  onValueChange={() => setPrivacy("Amigos")}
                />
              </View>
              <View style={[styles.userParent, styles.parentFlexBox]}>
                <Image
                  style={styles.userIcon}
                  contentFit="cover"
                  source={require("../assets/3-user.png")}
                />
                <Text
                  style={[styles.familiaYAmigos, styles.familiaYAmigosTypo]}
                >
                  Amigos
                </Text>
              </View>
            </View>
            <View style={[styles.checkParent, styles.parentFlexBox]}>
              <View style={styles.check}>
                <Checkbox
                  color={Color.primario1}
                  value={privacy === "Familiares"}
                  onValueChange={() => setPrivacy("Familiares")}
                />
              </View>
              <View style={[styles.userParent, styles.parentFlexBox]}>
                <Image
                  style={styles.userIcon}
                  contentFit="cover"
                  source={require("../assets/3-user.png")}
                />
                <Text
                  style={[styles.familiaYAmigos, styles.familiaYAmigosTypo]}
                >
                  Familiares
                </Text>
              </View>
            </View>
            <View style={[styles.checkParent, styles.parentFlexBox]}>
              <View style={styles.check}>
                <Checkbox
                  color={Color.primario1}
                  value={privacy === "Yo"}
                  onValueChange={() => setPrivacy("Yo")}
                />
              </View>
              <View style={[styles.userParent, styles.parentFlexBox]}>
                <Image
                  style={styles.userIcon}
                  contentFit="cover"
                  source={require("../assets/lock.png")}
                />
                <Text
                  style={[styles.familiaYAmigos, styles.familiaYAmigosTypo]}
                >
                  Sólo para mi
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Pressable style={{ marginTop: 40 }} onPress={onClose}>
        <LinearGradient
          style={[styles.button, styles.parentFlexBox]}
          locations={[0, 1]}
          colors={["#7ec18c", "#dee274"]}
          start={{ x: 0, y: 0 }} // Inicio del gradiente (izquierda)
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.signIn}>Guardar</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  parentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  frameChildLayout: {
    maxHeight: "100%",
    position: "absolute",
  },
  quinPuedeVerTypo: {
    fontWeight: "500",
    textAlign: "left",
  },
  familiaYAmigosTypo: {
    color: Color.gris,
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
  },
  vectorIcon: {
    width: 11,
    height: 16,
  },
  opcionesDePrivacidad: {
    fontSize: FontSize.size_lg,
    fontWeight: "600",
    marginLeft: 15,
    textAlign: "left",
    color: Color.negro,
    fontFamily: FontFamily.lato,
  },
  vectorParent: {},
  frameChild: {
    left: 0,
    top: 0,
    width: 388,
  },
  quinPuedeVer: {
    lineHeight: 19,
    letterSpacing: 0,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    color: Color.negro,
    fontFamily: FontFamily.lato,
  },
  quinPuedeVer2: {
    marginTop: 15,
    lineHeight: 19,
    letterSpacing: 0,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    color: Color.negro,
    fontFamily: FontFamily.lato,
  },
  loremIpsumDolor: {
    marginTop: 20,
    fontWeight: "500",
    textAlign: "left",
  },
  quinPuedeVerTuPublicacinParent: {
    width: "100%",
  },
  checkChild: {
    height: "105%",
    width: "105%",
    top: "-2.5%",
    right: "-2.5%",
    bottom: "-2.5%",
    left: "-2.5%",
    borderRadius: 3,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro_100,
    borderWidth: 1,
    position: "absolute",
    backgroundColor: Color.white,
  },
  vectorIcon1: {
    height: "34.5%",
    width: "45%",
    top: "35%",
    right: "30%",
    bottom: "30.5%",
    left: "25%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  check: {
    width: 20,
    height: 20,
  },
  userIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  familiaYAmigos: {
    textAlign: "justify",
    marginLeft: 9,
  },
  userParent: {
    marginLeft: 20,
  },
  checkParent: {
    marginTop: 20,
  },
  elegirAudienciaParent: {},
  vectorGroup: {
    marginTop: 20,
    width: "100%",
  },
  frameParent: {
    height: 329,
    width: "100%",
  },
  signIn: {
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: "center",
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
    flex: 1,
  },
  button: {
    justifyContent: "center",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    width: "100%",
    borderRadius: Border.br_11xl,
    flexDirection: "row",
  },
  privacidad: {
    width: "100%",
    padding: Padding.p_xl,
    position: "absolute",
    bottom: 0,
    backgroundColor: Color.white,
    borderTopRightRadius: Border.br_11xl,
    borderTopLeftRadius: Border.br_11xl,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.primario1,
  },
});

export default Privacidad;
