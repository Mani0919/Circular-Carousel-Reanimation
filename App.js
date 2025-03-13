import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Circularcarousal from "./circularcarousal";
import FullCircularCarousel from "./fullcircularcarousal";

export default function App() {
  return (
    <>
      // <View style={{flex:1}}>
      <Circularcarousal />
      {/* <FullCircularCarousel/> */}
      {/* <Components /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
