import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import Texts from "../../components/Texts";
import Button from "../../components/Button";
import OnboardingItem from "../../components/UI/OnboardingItem";
import Images from "../../utils/images";
import HeaderImage from "../../components/HeaderImage";
import Pagination from "../../components/UI/Pagination";
import slides from "../../utils/onBoardingSlides";
import { useNavigation } from "@react-navigation/native";
import asyncStorage from "../../utils/asyncStorage";
import Arrow from "../../assets/svg/arrowLeft.svg"

const IntroductionScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const nextButtonHandler = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // try {
      //   await asyncStorage.storeData("viewedOnboarding", "true");
      //   navigation.navigate("authNavigation");
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  const prevButtonHandler = async () => {
    if (currentIndex === 0) {
      return;
    } else {
      slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
      // try {
      //   await asyncStorage.storeData("viewedOnboarding", "true");
      //   navigation.navigate("authNavigation");
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  const handleLogin = () => {
    navigation.navigate("mainnavigation");
  };

  return (
    <View style={styles.screen}>
      <HeaderImage />
      <View style={styles.carousel}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Pagination data={slides} scrollX={scrollX} />

      {currentIndex === slides.length - 1 && (
        <Button value="Login" style={styles.button} onPress={handleLogin} />
      )}

      <View style={styles.arrow}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={prevButtonHandler}
          style={{ opacity: currentIndex === 0 && 0 }}
        >
          <Image source={Images.arrowLeft} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={nextButtonHandler}
          activeOpacity={0.9}
          style={{
            alignItems: "flex-end",
            width: currentIndex === 0 ? "80%" : "auto",
            opacity: currentIndex === slides.length - 1 && 0,
          }}
        >
          <Image source={Images.arrowRight} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroductionScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 30,
  },
  signContainer: {
    flexDirection: "row",
    gap: 10,
  },
  signText: {
    color: "blue",
    marginBottom: 30,
  },
  signLink: {
    marginBottom: 30,
    color: "green",
  },
  arrow: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    justifyContent: "space-between",
    flex: 1,
  },
  carousel: {
    flex: 2,
  },
});
