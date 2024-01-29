import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { ArrowLeftRight, CheckCheck, Zap } from "lucide-react-native";

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setData(data);
  };

  if (!permission) return <View />;

  if (!permission.granted)
    return (
      <View className="h-full justify-center">
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  function toggleFlashMode() {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off,
    );
  }

  return (
    <View className="relative h-full justify-center">
      <TouchableOpacity
        className="absolute right-4 top-20 z-30 mx-auto"
        onPress={toggleCameraType}
      >
        <ArrowLeftRight className="h-20 w-20 text-white" />
      </TouchableOpacity>

      <TouchableOpacity
        className="absolute right-4 top-36 z-30 mx-auto"
        onPress={toggleFlashMode}
      >
        <Zap className="h-20 w-20 text-white" />
      </TouchableOpacity>
      <BarCodeScanner
        style={{ flex: 1 }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        type={type}
      />
      {scanned && (
        <View className="absolute bottom-0 w-full rounded-t-2xl border-t bg-black p-4 text-white">
          <CheckCheck
            className="mx-auto mb-8 mt-4 text-green-300"
            height={90}
            width={90}
          />
          <Text className="mx-auto text-3xl font-bold text-white">Valid</Text>
          <Text className="mx-auto text-xl font-bold text-white">{data}</Text>

          <Text className="mx-auto mt-4 text-white">
            Purchased on: 20. 1. 2023
          </Text>

          <TouchableOpacity
            className="mx-6 mb-12 mt-20 rounded bg-white"
            onPress={() => setScanned(false)}
          >
            <Text className="py-2 text-center text-2xl font-bold text-black">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
