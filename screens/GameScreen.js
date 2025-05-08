import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import ButtonsContainer from "../components/ui/ButtonsContainer";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomNumber = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    generateRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    console.log(minBoundary, maxBoundary, currentGuess);

    const newRndNumber = generateRandomNumber(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    console.log("newRndNumber", newRndNumber);

    setCurrentGuess(newRndNumber);
    setGuessRounds((prev) => [newRndNumber, ...prev]);
  };

  let content = (
    <>
      {" "}
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <ButtonsContainer
          children1={<Ionicons name="remove" size={24} color="white" />}
          children2={<Ionicons name="add" size={24} color="white" />}
          onPress1={nextGuessHandler.bind(this, "lower")}
          onPress2={nextGuessHandler.bind(this, "higher")}
        />
      </Card>
    </>
  );
  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              {<Ionicons name="remove" size={24} color="white" />}
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              {<Ionicons name="add" size={24} color="white" />}
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screenContainer}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map((x) => (
          <Text key={x}>{x}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={
            (itemData) => (
              <GuessLogItem
                guess={itemData.item}
                roundNumber={guessRounds.length - itemData.index}
              />
            )
            // <Text>{itemData.item}</Text>
          }
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems:'center'
  },
  instructionText: { marginBottom: 12 },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
