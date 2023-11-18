import { StyleSheet, Dimensions, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import Texts from "../../components/Texts";
import LoginSvg from "../../assets/svg/login.svg";
import Button from "../../components/Button";
const { height,width } = Dimensions.get("screen");
const Login = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.navigate("auth");
  }, []);
  const handleLogin = () => {
    navigation.navigate("dashboard");
  };
  return (
    <View style={{ ...styles.screen }}>
      <View style={styles.image_container}>
        <LoginSvg />
      </View>
      <View style={{ ...styles.text_container, marginTop: theme.spacing.l }}>
        <Texts variant="h1" style={{ textAlign: "center" }}>
          Bring Yor Work Together
        </Texts>
        <Texts variant="p" style={{ textAlign: "center",marginVertical: theme.spacing.m,color: theme.colors.darkGreen, fontSize: width*0.04}}>
          A better experience for your document approval processes.
        </Texts>
      </View>
      <View style={{...styles.btn_container,marginTop: theme.spacing.xl}}>
        <Button value="Login" style={styles.button} onPress={handleLogin} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text_container: {
    width: "70%"
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 30,
  },
});
