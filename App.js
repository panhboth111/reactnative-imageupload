import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const App = () => {
  //image is a state used to store the selected image. setImage is use to update image
  const [image, setImage] = useState(null);
  //function to request permission from the camera roll to access pictures
  const requestCameraRollPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted")
        alert("We need your permissions to access the pictures");
    }
  };
  //function used to select picture from camera roll
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) setImage(result.uri);
  };
  //lifecycle methods to call the request permission function
  useEffect(() => {
    requestCameraRollPermission();
  }, []);
  return (
    <View style={styles.container}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      )}
      <CustomButton selectImage={selectImage} />
      {/* use the customly made button while passing selectImage function as prop */}
    </View>
  );
};

export default App;

// a customly made button component to use as the upload button. selectImage is a function passed as a prop
const CustomButton = ({ selectImage }) => (
  <TouchableOpacity onPress={selectImage} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>SELECT</Text>
    <Text style={styles.appButtonText}>PICTURE</Text>
  </TouchableOpacity>
);

//custom styles to apply to the components and elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "grey",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
