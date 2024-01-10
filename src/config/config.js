export const config = {
  STANDARD_PORTRAIT_DEVICE_WIDTH: 350,
  STANDARD_PORTRAIT_DEVICE_HEIGHT: 680,
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || "",
  TOAST_LONG_DURATION: 3649.9998,
  TOAST_SHORT_DURATION: 1850,
  AUTH: {
    clientId: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID || "",
    authority: `${process.env.EXPO_PUBLIC_AUTH_AZURE_CLOUD_ID}/${process.env.EXPO_PUBLIC_AUTH_TENANT_ID}`,
    postLogoutRedirectUri: `${process.env.EXPO_PUBLIC_APP_HOME}`,
    redirectUri: `${process.env.EXPO_PUBLIC_APP_HOME}`,
    scopeUrl: `${process.env.EXPO_PUBLIC_AUTH_AZURE_SCOPE_URL}`,
  },
};
