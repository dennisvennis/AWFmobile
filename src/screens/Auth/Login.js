import { StyleSheet, Dimensions, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import Texts from "../../components/Texts";
import LoginSvg from "../../assets/svg/login.svg";
import Button from "../../components/Button";
import * as Linking from "expo-linking";
import * as AuthSession from "expo-auth-session";
import { config } from "../../config/config";
import asyncStorage from "../../utils/asyncStorage";
import { setUsers } from "../../store/slices/usersSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { decode as base64Decode } from "base-64";

const { height, width } = Dimensions.get("screen");

const authEndpoint = `${config.AUTH.authority}/oauth2/v2.0/authorize`;
const clientId = config.AUTH.clientId;
const redirectUri = Linking.createURL(config.AUTH.redirectUri);

const Login = () => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const discovery = AuthSession.useAutoDiscovery(
    `${config.AUTH.authority}/v2.0`
  );
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      scopes: [`${config.AUTH.scopeUrl}`],
      redirectUri,
    },
    discovery
  );

  const handleLogin = async () => {
    setLoading(true);
    promptAsync().then((codeResponse) => {
      if (request && codeResponse?.type === "success" && discovery) {
        AuthSession.exchangeCodeAsync(
          {
            clientId,
            code: codeResponse.params.code,
            extraParams: request.codeVerifier
              ? { code_verifier: request.codeVerifier }
              : undefined,
            redirectUri,
          },
          discovery
        ).then(async (res) => {
          let params = {
            token: res.accessToken,
          };
          try {
            const {
              data: {
                status,
                data: { accessToken },
              },
            } = await axios.post(`${config.API_BASE_URL}/auth/login`, params);
            console.log(status);
            if (status === "success") {
              setLoading(false);
              const base64Decoded = base64Decode(accessToken.split(".")[1]);
              const decodedToken = JSON.parse(base64Decoded);
              let {
                firstName,
                lastName,
                imageUrl,
                email,
                departmentId,
                exp: expiresIn,
                id: userId,
                role: { name: roleName, id: roleId },
              } = decodedToken;
              let userInfo = {
                userId,
                firstName,
                lastName,
                imageUrl,
                email,
                departmentId,
                expiresIn,
                roleName,
                roleId,
              };
              // Dispatch the setUser action with the user data
              dispatch(setUsers(userInfo));
              // Save user data to AsyncStorage
              await asyncStorage.storeData("token", accessToken);
              // Navigate to the main navigation screen
              navigation.navigate("combineNavigation");
            } else {
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
          }
        });
      } else if (codeResponse?.type === "cancel") {
        console.log("Authentication cancelled");
        setLoading(false);
      }
    });
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
        <Button
          value={loading ? "Verifying credentials..." : "Login"}
          style={styles.button}
          onPress={handleLogin}
        />
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
