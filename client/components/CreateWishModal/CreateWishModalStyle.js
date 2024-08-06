import { StyleSheet } from "react-native";
import {
  Color,
  Border,
  FontFamily,
  FontSize,
  Padding,
} from "../../GlobalStyles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 400,
    backgroundColor: Color.white,
    borderTopRightRadius: Border.br_11xl,
    borderTopLeftRadius: Border.br_11xl,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Color.primario1,
  },
  topView: {
    top: 20,
    width: "100%",
    alignItems: "center",
  },
  alignSelfCenter: {
    alignSelf: "flex-start",
    alignItems: "center",
  },
  wishListTitle: {
    fontWeight: "500",
    color: Color.colorGray_200,
    textAlign: "left",
    lineHeight: 19,
    letterSpacing: 0,
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
  },
  divider: {
    borderColor: Color.secundario,
    borderTopWidth: 1,
    width: "100%",
    height: 1,
    marginTop: 15,
    borderStyle: "solid",
  },
  scrollView: {
    height: 135,
    maxHeight: 150,
    overflow: "hidden",
    flexGrow: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  scrollViewContent: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 100,
  },
  wishContainer: {
    marginTop: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  wishText: {
    fontWeight: "700",
    color: Color.grisDiscord,
    textAlign: "justify",
    marginLeft: 13,
    lineHeight: 19,
    letterSpacing: 0,
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
  },
  takeButton: {
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: 50,
    paddingHorizontal: 5,
  },
  takeButtonText: {
    fontSize: 15,
    color: "gray",
  },
  takenByContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  takenByImage: {
    width: 26,
    height: 26,
    borderRadius: 50,
  },
  takenByText: {
    fontSize: 14,
    maxWidth: 200,
  },
  emptyListContainer: {
    height: 150,
    width: "100%",
    justifyContent: "center",
  },
  emptyListText: {
    color: "#404040",
    textAlign: "center",
    fontFamily: FontFamily.lato,
    fontSize: 14,
    width: "100%",
  },
  wishInput: {
    paddingVertical: Padding.p_smi,
    backgroundColor: Color.fAFAFA,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xl,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  addButtonContainer: {
    marginTop: 10,
  },
  gradientButton: {
    justifyContent: "center",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    width: "100%",
    flexDirection: "row",
    borderRadius: Border.br_11xl,
  },
  gradientButtonText: {
    flex: 1,
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
  },
});

export default styles;
