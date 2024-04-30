import { Button, View, Text, StyleSheet, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View
      className="flex-1 items-center justify-center bg-white"
      style={rootStyles.headerStyle}
    >
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="Exchange Keys" />
      <ExpoStatusBar style="auto" />
    </View>
  );
}

const rootStyles = StyleSheet.create({
  headerStyle: {
    paddingTop: StatusBar.currentHeight,
  },
});
