import { StyleSheet, Dimensions, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import Texts from "../../components/Texts";
import LoginSvg from "../../assets/svg/login.svg";
import Button from "../../components/Button";
import API_SERVICE from "../../utils/api";
import * as Linking from "expo-linking";
import * as AuthSession from "expo-auth-session";
import { config } from "../../config/config";
import asyncStorage from "../../utils/asyncStorage";
import { setUsers } from "../../store/slices/usersSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const { height, width } = Dimensions.get("screen");

const authEndpoint = `${config.AUTH.authority}/oauth2/v2.0/authorize`;
const clientId = config.AUTH.clientId;
const redirectUri = Linking.createURL(config.AUTH.redirectUri);
const Login = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId,
      responseType: AuthSession.ResponseType.Code,
      scopes: ["openid", "profile", "User.Read"],
      extraParams: { prompt: "select_account" },
    },
    { authorizationEndpoint: authEndpoint }
  );

  const handleLogin = () => {
    // Call promptAsync to initiate the authentication process
    promptAsync();
  };

  useEffect(() => {
    const handleAuthResponse = async () => {
      try {
        if (response?.type === "success") {
          // Handle the authentication result
          console.log("Authentication result:", response.params.code);
          let params = {
            token: response.params.code,
          };
          const res = axios.post(`${config.API_BASE_URL}/auth/login`, params);

          console.log("////RES", res);

          // Dispatch the setUser action with the user data
          // dispatch(setUsers(response));

          // Save user data to AsyncStorage
          // await asyncStorage.storeData("user", response);

          // Navigate to the main navigation screen
          navigation.navigate("mainnavigation");
        } else if (response?.type === "cancel") {
          console.log("Authentication cancelled");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    // Call the handleAuthResponse function when the response changes
    handleAuthResponse();
  }, [response]);

  return (
    <View style={{ ...styles.screen }}>
      <View style={styles.image_container}>
        <LoginSvg />
      </View>
      <View style={{ ...styles.text_container, marginTop: theme.spacing.l }}>
        <Texts variant="h1" style={{ textAlign: "center" }}>
          Bring Yor Work Together
        </Texts>
        <Texts
          variant="p"
          style={{
            textAlign: "center",
            marginVertical: theme.spacing.m,
            color: theme.colors.darkGreen,
            fontSize: width * 0.04,
          }}
        >
          A better experience for your document approval processes.
        </Texts>
      </View>
      <View style={{ ...styles.btn_container, marginTop: theme.spacing.xl }}>
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
    width: "70%",
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 30,
  },
});
