import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import img1 from "./assets/images/img1.jpg";
import img2 from "./assets/images/img2.jpg";
import img3 from "./assets/images/img3.jpg";
import img4 from "./assets/images/img4.jpg";
import img5 from "./assets/images/img5.jpg";
import img6 from "./assets/images/img6.jpg";
import img7 from "./assets/images/img7.jpg";
import img8 from "./assets/images/img8.jpg";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function CircularCarousel() {
  const [activeindex, setActiveIndex] = useState(0);
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  const { width } = Dimensions.get("window");
  console.log("screen width",width)
  const BORDER_WIDTH = 4;
  const itemsize = width * 0.24;
  const spacing = 12;
  const itemtotal = itemsize + spacing;

  const CarouselItem = ({ url, scrollx, index }) => {
    const styleZ = useAnimatedStyle(() => {
      return {
        borderWidth: BORDER_WIDTH,
        borderColor: interpolateColor(
          scrollx.value,
          [index - 1, index, index + 1],
          ["rgba(0,0,0,0)", "red", "rgba(0,0,0,0)"]
        ),
        transform: [
          {
            translateY: interpolate(
              scrollx.value,
              [index - 1, index, index + 1],
              [itemsize / 3, 0, itemsize / 3]
            ),
          },
        ],
      };
    });

    return (
      <Animated.View
        style={[
          styleZ,
          {
            width: itemsize,
            height: itemsize,
            borderRadius: itemsize / 2,
            overflow: "hidden",
          },
        ]}
      >
        <Image
          source={url}
          style={{
            width: itemsize - BORDER_WIDTH * 2,
            height: itemsize - BORDER_WIDTH * 2,
            borderRadius: (itemsize - BORDER_WIDTH * 2) / 2,
          }}
          resizeMode="cover"
        />
      </Animated.View>
    );
  };

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / itemtotal;
    const newindex = Math.round(scrollX.value);
    if (newindex !== activeindex) {
    //   setActiveIndex(newindex);
    runOnJS(setActiveIndex)(newindex)
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={images[activeindex]}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <Animated.FlatList
          style={{ flexGrow: 0 }}
          data={images}
          contentContainerStyle={{
            // backgroundColor:"red",
            gap: spacing,
            paddingHorizontal: (width - itemsize) / 2,
            paddingBottom: itemsize,
          }}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item, index }) => (
            <CarouselItem url={item} scrollx={scrollX} index={index} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          snapToInterval={itemtotal}
          decelerationRate={"fast"}
        />
      </ImageBackground>
    </View>
  );
}
