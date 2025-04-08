import { StyleSheet, View, Text, StatusBar, TextInput, Button, ImageBackground } from 'react-native';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import AppLoading from 'expo-app-loading';
import Colors from './constants/colors';

export default function App() {
  const [number, setNumber] = useState(0);
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);

  const [fontsLoaded] = useFonts({ Poppins_400Regular });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleValidate = (num) => {
    setNumber(num);
    setStep(1);
  }

  const handleGoBack = () => {
    setStep(0);
  }

  const handleGuess = (count) => {
    setStep(2);
    setCount(count);
  }

  const handlePlayAgain = () => {
    setStep(0);
    setNumber(0);
    setCount(0);
  }

  return (
    <LinearGradient colors={[Colors.primary300, Colors.primary500]} style={styles.container}>
      <ImageBackground source={require('./assets/images/background.png')} resizeMode='cover' style={styles.container} imageStyle={{ opacity: 0.2 }}>
        {step === 0 && <StartScreen onValidate={handleValidate} number={number} />}
        {step === 1 && <GameScreen number={number} onGoBack={handleGoBack} onGuess={handleGuess} />}
        {step === 2 && <ResultScreen number={number} count={count} onPlayAgain={handlePlayAgain} />}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
