import * as React from "react";
import { View, StyleSheet, Text, Pressable, Share } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import { Svg } from "react-native-svg";
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from "@react-native-async-storage/async-storage";

const QR = ({ onClose, relation, selectedUserToInvite, relationType }) => {
  const navigation = useNavigation();
  const [qr, setQr] = React.useState("")
  const [user, setUser] = React.useState()
  const [relationSelected, setRelationSelected] = React.useState()


  React.useEffect(() => {
    console.log("relations ", relation, selectedUserToInvite, "invite", "relation type", relationType)
  }, [])

  const getUser = async () => {
    const usuario = await AsyncStorage.getItem('user')
    const user = JSON.parse(usuario)
    setUser(user)
  }

  React.useEffect(() => {
    const relations = () => {
      let rel
      if (relation === "Padre") rel = "dadId"
      if (relation === "Madre") rel = "momId"
      if (relation === "Hermano/a") rel = "brothersIds"
      if (relation === "Primo/a") rel = "cousinsIds"
      if (relation === "Tio/a") rel = "unclesIds"
      if (relation === "Nieto/a") rel = "grandparentsIds"
      if(relationType === "Amigos" ) rel = "friendsIds"
      if (rel) setRelationSelected(rel)
    }
  relations()
    getUser()
  }, [])



  const onShare = async (eventLink) => {
    try {
      const result = await Share.share(
        {
          message: `Te invito a formar parte de mi familia , ingresa a este link ! http://app.mytreeoficial.com/app?invite=true&property=${relationSelected}&memberId=${user?.id} `,
          title: 'Mira éste evento increíble'
        },
        {
          // Android only:
          dialogTitle: 'Te invito a formar parte de mi familia',
          // iOS only:
          excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter']
        }
      )

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // compartido con el tipo de actividad de result.activityType
        } else {
          // compartido
        }
      } else if (result.action === Share.dismissedAction) {
        // descartado
      }
    } catch (error) {
      alert(error.message)
    }
  }


  return (
    <View style={styles.qr}>
      <View style={styles.frameParent}>
        <View style={styles.image8Parent}>
          <QRCode
            size={200}
            value={`http://app.mytreeoficial.com/app?invite=true&property=${relationSelected}&memberId=${user?.id}`}
          />
          <View style={styles.searchBar}>
            <View style={styles.placeholderInput}>
              <Text style={[styles.search, styles.searchLayout]}>
              {`http://app.mytreeoficial.com/app?invite=true&property=${relationSelected}&memberId=${user?.id}`}
              </Text>
            </View>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require("../assets/vector30.png")}
            />
          </View>
        </View>
        <View style={styles.compartirParent}>
          <Text style={[styles.compartir, styles.aceptarTypo]}>Compartir</Text>
          <View style={styles.skillIconsinstagramParent}>
            <Image
              style={styles.skillIconsinstagram}
              contentFit="cover"
              source={require("../assets/skilliconsinstagram2.png")}
            />
            <Image
              style={[styles.skillIconslinkedin, styles.frameChildLayout]}
              contentFit="cover"
              source={require("../assets/skilliconslinkedin2.png")}
            />
            <Pressable onPress={() => onShare("holaa")}>
              <Image
                style={styles.frameChildLayout}
                contentFit="cover"
                source={require("../assets/group-1171276696.png")}

              />
            </Pressable>
            <Image
              style={[styles.skillIconslinkedin, styles.frameChildLayout]}
              contentFit="cover"
              source={require("../assets/deviconfacebook2.png")}
            />
          </View>
        </View>
        <LinearGradient
          style={styles.button}
          locations={[0, 1]}
          colors={["#dee274", "#7ec18c"]}
        >
          <Pressable
            style={styles.pressable}
            onPress={onClose}
          >
            <Text style={[styles.aceptar, styles.aceptarTypo]}>Aceptar</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchLayout: {
    lineHeight: 21,
    fontSize: FontSize.size_sm,
  },
  aceptarTypo: {
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
  },
  frameChildLayout: {
    marginLeft: 20,
    height: 30,
    width: 30,
  },
  image8Icon: {
    width: 201,
    height: 201,
  },
  search: {
    fontStyle: "italic",
    fontWeight: "200",
    fontFamily: FontFamily.nunito,
    color: Color.textPlaceholder,
    textAlign: "left",
    letterSpacing: 0,
    lineHeight: 21,
    fontSize: FontSize.size_sm,
  },
  placeholderInput: {
    flex: 1,
    flexDirection: "row",
  },
  vectorIcon: {
    width: 21,
    height: 21,
    marginLeft: 6,
  },
  searchBar: {
    borderRadius: Border.br_3xs,
    backgroundColor: '#f3f3f3',
    height: 40,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: Padding.p_5xs,
    marginTop: 20,
    width: '80%',
    alignItems: "center",
    flexDirection: "row",
  },
  image8Parent: {
    width: 388,
    alignItems: "center",
  },
  compartir: {
    fontSize: FontSize.size_base,
    lineHeight: 19,
    fontWeight: "500",
    color: Color.textTextPrimary,
    textAlign: "left",
  },
  skillIconsinstagram: {
    overflow: "hidden",
    height: 30,
    width: 30,
  },
  skillIconslinkedin: {
    overflow: "hidden",
  },
  skillIconsinstagramParent: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  compartirParent: {
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  aceptar: {
    position: "absolute",
    marginTop: -11,
    marginLeft: -24,
    top: "50%",
    left: "50%",
    color: Color.white,
    textAlign: "center",
    lineHeight: 21,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.lato,
  },
  pressable: {
    width: "100%",
    height: "100%",
    backgroundColor: Color.linearBoton,
    borderRadius: Border.br_11xl,
  },
  button: {
    height: 52,
    marginTop: 20,
    width: '90%',
    borderRadius: 100,
  },
  frameParent: {
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
  },
  qr: {
    backgroundColor: Color.white,
    width: '90%',
    padding: Padding.p_xl,
    flexDirection: "row",
    borderRadius: Border.br_11xl,
  },
});

export default QR;
