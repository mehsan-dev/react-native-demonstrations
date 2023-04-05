import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Image } from "react-native-elements";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../config/firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";

const storage = getStorage(app);

const Photo = () => {
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setUploading] = useState(false);
  const imageName = `image-${new Date().toISOString()}`;
  const storageRef = ref(storage, imageName);

  useFocusEffect(
    useCallback(() => {
      permissions();
    }, [])
  );

  const permissions = async () => {
    const [status, requestPermission] =
      await ImagePicker.useCameraPermissions();
    if (!status.granted) {
      const finalPerm = await requestPermission();
      if (!finalPerm.granted) {
        alert(
          "Camera permission required! To use this feature, you need to enable camera permissions in the app settings."
        );
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        console.log("imageee");
        setImage(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const takeImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const uploadImage = async () => {
    const response = await fetch(image);
    const blob = await response.blob();
    setUploading(true);
    uploadBytes(storageRef, blob).then(function (snapshot) {
      console.log("Uploaded a blob or file!", snapshot);
      getDownloadURL(ref(storage, snapshot.ref))
        .then((url) => {
          setUploading(false);
          console.log("urlss", url);
          setUploadedImage(url);
        })
        .catch((error) => {
          setUploading(false);
          console.log("err", error);
        });
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {uploadedImage ? (
        <Image
          source={{ uri: uploadedImage }}
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          {image ? (
            <>
              <Text>IMAGE SELECTED!</Text>
              <Text>Press Upload to upload the image</Text>
            </>
          ) : (
            <Text>Select or capture an Image</Text>
          )}
        </View>
      )}
      <View style={styles.buttonContainer}>
        {uploadedImage ? (
          <Button
            containerStyle={styles.button}
            title="Retake"
            onPress={() => {
              setImage(null);
              setUploadedImage(null);
            }}
          />
        ) : image ? (
          <>
            <Button
              loading={isUploading}
              containerStyle={styles.button}
              title="Upload Image"
              onPress={uploadImage}
            />
            <Button
              containerStyle={styles.button}
              title="Discard this Image"
              onPress={() => setImage(null)}
            />
          </>
        ) : (
          <>
            <Button
              containerStyle={styles.button}
              title="Select Image from Gallery"
              onPress={pickImage}
            />
            <Button
              containerStyle={styles.button}
              title="Take a Photo"
              onPress={takeImage}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({
  imagePlaceholder: {
    padding: 80,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  button: {
    margin: 5,
    width: "100%",
  },

  buttonContainer: {
    width: "70%",
  },
});
