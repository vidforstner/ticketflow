import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: "Ticket dd Flow Scanner" }} />
      <View className="h-full w-full p-4">
        <Text>sdsdsd arojdfdfdfack</Text>
        <Text>sdsdsd arojdfdfdfack celo dela top</Text>
      </View>
    </SafeAreaView>
  );
}
