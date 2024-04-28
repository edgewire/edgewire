import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import { exchangeKeys } from "./utils/diffieHellman";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="Exchange Keys" onPress={() => exchangeKeys()} />
      <StatusBar style="auto" />
    </View>
  );
}
