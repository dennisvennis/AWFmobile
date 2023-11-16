import { Dimensions, PixelRatio } from "react-native";
import { config } from "../config/config";
const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");

const scale = config.STANDARD_PORTRAIT_DEVICE_WIDTH / deviceWidth;

const fontScale = (value) => {
  const size = scale * value;
  return Math.round(PixelRatio.roundToNearestPixel(size));
};

const Height = (value) => {
  if (!value) return 0;
  return (value / 100) * deviceHeight;
};

const Width = (value) => {
  if (!value) return 0;
  return (value / 100) * deviceWidth;
};

export { fontScale, Height, Width };
