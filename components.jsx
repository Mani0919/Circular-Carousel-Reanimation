import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
} from "react-native-reanimated";

const duration = 2000;

export default function Components() {
  const { width } = Dimensions.get("window");
  console.log(width)
  const defaultAnim = useSharedValue(width / 2 - 160);
  console.log(defaultAnim)
  const linear = useSharedValue(width / 2 - 160);

  const animatedDefault = useAnimatedStyle(() => ({
    transform: [{ translateX: defaultAnim.value-10 }],
  }));
  const animatedChanged = useAnimatedStyle(() => ({
    transform: [{ translateX: linear.value }],
  }));

  React.useEffect(() => {
    linear.value = withRepeat(
      // highlight-next-line
      withTiming(-linear.value, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      true
    );
    defaultAnim.value = withRepeat(
      // highlight-next-line
      withTiming(-defaultAnim.value, {
        duration,
      }),
      -1,
      true
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedDefault]}>
        <Text style={styles.text}>inout</Text>
      </Animated.View>

      <Animated.View style={[styles.box, animatedChanged]}>
        <Text style={styles.text}>linear</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  box: {
    height: 80,
    width: 80,
    margin: 20,
    borderWidth: 1,
    borderColor: "#b58df1",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#b58df1",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
