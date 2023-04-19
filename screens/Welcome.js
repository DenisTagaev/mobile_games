import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Images from "../Images/Images";
import Constants from "../Constants";

export default function Welcome({ navigation }) {
  return (
    <View style={styles.form}>
      <Image
        source={Images.WelcomeBackground}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("Playground")}
          >
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    height: "100%",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.SCREEN_WIDTH,
    height: Constants.SCREEN_HEIGHT,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  button: {
    marginTop: 195,
    width: 250,
    height: 65, 
    backgroundColor: "#007AFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fea",
    fontSize: 18,
    fontWeight: "bold",
  },
});