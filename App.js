import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from "anonymous-files";
import asheImage from "./assets/Ashe.png";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  let openImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // If user reject permission
    if (permissionResult.granted === false) {
      alert("Permission is required....");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult); // Show properties about selected pic
    if (pickerResult.cancelled === true) {
      return;
    }
    // If is web, upload the pic to anonymous-files
    if (Platform.OS === "web") {
      const remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      console.log(remoteUri); // Show anonymous-file url
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri }); // Set in the state the prop with value of the selected pic
    }
  };

  // Share selected pic
  const openSharePic = async () => {
    // module to share: 'Sharing', 'isAvailableAsync' to verify the availabity of the API in that device
    // If Sharing.isAvailableAsync() is 'false'...
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Sharing available at: ${selectedImage.remoteUri}`);
      return;
    }
    // .shareAsync to share anything (in t his case the stage value (local.uri))
    await Sharing.shareAsync(selectedImage.localUri);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Select your image</Text>
      <TouchableOpacity onPress={openImage}>
        <Image
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localUri
                : "https://picsum.photos/200/200",
          }}
          onPress={openImage}
          style={styles.myImage}
        ></Image>
      </TouchableOpacity>

      {selectedImage ? (
        <TouchableOpacity style={styles.button} onPress={openSharePic}>
          <Text style={styles.buttonText}>Share your image</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  title: { fontSize: 30 },
  myImage: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: "contain",
  },
  button: { backgroundColor: "red", padding: 7, marginTop: 10 },
  buttonText: {
    color: "#fff",
  },
});
export default App;

/* 
<Text> Un elemento <p> de HTML
<View> Un elemento <div> de HTML
<Image> Permite añadir imágenes locales/url's (su prop es 'source={{uri;''}}) no src.
(Se debe añadir una prop style con su height y width), si es un archivo local se coloca
en la carpeta 'assets', se importa en el modulo a usar y en la prop. 'source' solo
se coloca una llave {}. source={imageFile}
<Button> Un elemento botón de HTML (se cierra en su mismo componente), para colocarle texto es con
su prop 'title', para presionarlo se añade 'onPress', similar a 'onClick' de reactJs.
<Alert.alert('')> Para mostrar un alerta sin el titulo 'alert' (se importa)
StyleSheet (.create) Crea un componente para agrupar estilos, es como agregar estilos dentro
de una variable y usarlos en cada propiedad 'style' de cada estiqueta en ves de escribirlos
sobre la misma etiqueta.
platform Para conocer la plataforma en la que estamos
<TouchableOpacity> Forma de botón Personalizable (Su texto se coloca dentro de <Text>, tambien tiene su método onPress())
expo-image-picker Permite la manipulación de imágenes como abrir la libreria, pedir permisos, etc.




import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>mi app</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */
