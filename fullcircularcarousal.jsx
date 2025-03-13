import { View, Image, Dimensions, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const img1 = require("./assets/images/img1.jpg");
const img2 = require("./assets/images/img2.jpg");
const img3 = require("./assets/images/img3.jpg");
const img4 = require("./assets/images/img4.jpg");
const img5 = require("./assets/images/img5.jpg");
const img6 = require("./assets/images/img6.jpg");
const img7 = require("./assets/images/img7.jpg");
const img8 = require("./assets/images/img8.jpg");

export default function FullCircularCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  // Create a looped image array
  const loopedImages = [images[images.length-1], ...images, images[0]];

  const { width } = Dimensions.get("window");
  const BORDER_WIDTH = 4;
  const itemSize = width * 0.24;
  const spacing = 12;
  const itemTotal = itemSize + spacing;

  const scrollX = useSharedValue(itemTotal); // Start at first real image
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / itemTotal;
    const newIndex = Math.round(scrollX.value) - 1; // Adjust for looped array
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < images.length) {
      runOnJS(setActiveIndex)(newIndex);
    }
  });
  

  useEffect(() => {
    // Set initial scroll position to the first real image
    scrollRef.current?.scrollToOffset({ offset: itemTotal, animated: false });
  }, []);

  const scrollRef = React.useRef(null);

  const onMomentumScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / itemTotal) - 1; // Adjust index
  
    if (index === -1) {
      scrollRef.current?.scrollToOffset({
        offset: itemTotal * images.length,
        animated: false,
      });
      setActiveIndex(images.length - 1);
    } else if (index === images.length) {
      scrollRef.current?.scrollToOffset({ offset: itemTotal, animated: false });
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };
  

  const CarouselItem = ({ url, scrollX, index }) => {
    const styleZ = useAnimatedStyle(() => ({
      borderWidth: BORDER_WIDTH,
      borderColor: interpolateColor(
        scrollX.value,
        [index - 1, index, index + 1],
        ["rgba(0,0,0,0)", "red", "rgba(0,0,0,0)"]
      ),
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [itemSize / 3, 0, itemSize / 3]
          ),
        },
      ],
    }));

    return (
      <Animated.View
        style={[
          styleZ,
          {
            width: itemSize,
            height: itemSize,
            borderRadius: itemSize / 2,
            overflow: "hidden",
          },
        ]}
      >
        <Image
          source={url}
          style={{
            width: itemSize - BORDER_WIDTH * 2,
            height: itemSize - BORDER_WIDTH * 2,
            borderRadius: (itemSize - BORDER_WIDTH * 2) / 2,
          }}
          resizeMode="cover"
        />
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={images[activeIndex]}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <Animated.FlatList
          style={{ flexGrow: 0 }}
          ref={scrollRef}
          data={loopedImages}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item, index }) => (
            <CarouselItem url={item} scrollX={scrollX} index={index} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
          snapToInterval={itemTotal}
          decelerationRate={"fast"}
          contentContainerStyle={{
            gap: spacing,
            paddingHorizontal: (width - itemSize) / 2,
            paddingBottom: itemSize,
          }}
        />
      </ImageBackground>
    </View>
  );
}
