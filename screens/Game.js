import { 
  TouchableOpacity,
  StyleSheet,
  Text,
  View, 
  ImageBackground,
  Modal,
  Pressable
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import entities from "../entities/index";
import Constants from "../Constants";
import Physics from "../Physics";
import Images from "../Images/Images";

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [score, setScore] = useState(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    setRunning(true);
    setScore(0);
  }, []);

  const startNewGame = () => {
    setRunning(true);
    setScore(0);
    gameEngine.swap(entities());
  }

  const addScore = debounce(() => {
    const newScore = score + 1;
    setScore(newScore);
  }, 100)

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.GameBackground}
        resizeMode="stretch"
        style={styles.image}
      >
        <Text style={styles.score}>Score: {score}</Text>
        <GameEngine
          ref={(ref) => {
            setGameEngine(ref);
          }}
          systems={[Physics]}
          entities={entities()}
          running={running}
          onEvent={(e) => {
            switch (e.type) {
              case "game_over":
                setRunning(false);
                gameEngine.stop();
                break;
              case "add_score":
                addScore();
                break;
            }
          }}
          style={styles.gameContainer}
        ></GameEngine>

        <TouchableOpacity
          onPressIn={() => {
            gameEngine.dispatch({ type: "move-left" });
          }}
          style={styles.buttonLeft}
        >
          <View style={styles.control}>
            <Text style={styles.centerText}>Move</Text>
            <Text style={styles.centerText}>Left</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={() => {
            gameEngine.dispatch({ type: "move-right" });
          }}
          style={styles.buttonRight}
        >
          <View style={styles.control}>
            <Text style={styles.centerText}>Move</Text>
            <Text style={styles.centerText}>Right</Text>
          </View>
        </TouchableOpacity>
        {!running && (
          <Modal animationType="fade" transparent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Game Over!</Text>
                <Pressable
                  style={styles.button}
                  onPress={() => startNewGame()}
                >
                  <Text style={styles.textStyle}>New Game</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
        <Text style={styles.watermark}>By Denis Tagaev </Text>
      </ImageBackground>
    </View>
  );
}

// Styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  score: {
    position: "absolute",
    top: 100,
    fontSize: 30,
    left: 130,
  },
  gameContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  watermark: {
    position: "absolute",
    fontStyle: "italic",
    fontSize: 22,
    bottom: 1,
    right: 90,
  },
  buttonLeft: {
    position: "absolute",
    left: 0,
    bottom: 35,
    height: Constants.WINDOW_HEIGHT,
    width: Constants.WINDOW_WIDTH / 2,
    display: "flex",
    justifyContent: "flex-end",
    padding: 16,
    paddingBottom: 230,
  },
  buttonRight: {
    position: "absolute",
    right: 0,
    bottom: 35,
    height: Constants.WINDOW_HEIGHT,
    width: Constants.WINDOW_WIDTH / 2,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 16,
    paddingBottom: 230,
  },
  centerText: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    opacity: 0.8,
    borderRadius: 10,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#007AFF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});
