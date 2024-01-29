import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Stack } from "expo-router";

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View className="h-full justify-center">
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  return (
    <View className="h-full justify-center">
      <Stack.Screen options={{ title: "Ticket Flow Scanner" }} />
      <Camera style={{ flex: 1 }} type={type}>
        <View className="relative">
          <TouchableOpacity
            className="absolute right-4 top-20 mx-auto"
            onPress={toggleCameraType}
          >
            <Text className="text-2xl font-bold text-white">Flip</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
