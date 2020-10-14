import {useNavigation} from '@react-navigation/native';
import React, {useState, useCallback, useEffect} from 'react';
import Sound from 'react-native-sound';
import {
  Container,
  ButtonAction,
  ButtonContainer,
  PomodoroButton,
  PomodoroContainer,
  CounterContainer,
  ButtonText,
  TodoButton,
} from './styles';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const alarmSound = require('../../assets/oogah_horn05.wav');

const alarmAudio = new Sound(alarmSound, Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('error playing sound');
  }
});

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number | string>('00');
  const [minutes, setMinutes] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [breakTimer, setBreakTimer] = useState(0);
  const [clicked, setClicked] = useState('');
  const navigate = useNavigation();

  // timer
  useEffect(() => {
    let interval: Timeout;

    if (
      (isActive && seconds === 0 && minutes !== 0) ||
      (isActive && seconds === '00' && minutes !== 0) ||
      (isActive && seconds === '0' && minutes !== 0)
    ) {
      setTimeout(() => {
        setSeconds(59);
        setMinutes(minutes - 1);
      }, 1000);
    }

    if (seconds === 0 && minutes === 0) {
      setIsActive(false);
      alarmAudio.play();
    }

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((activeSeconds) => Number(activeSeconds) - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [seconds, isActive, minutes]);

  const pomodoro = useCallback(() => {
    setMinutes(25);
    setSeconds('00');

    setMode('pomodoro');
    setClicked('pomodoro');
    setIsActive(true);
  }, []);

  const shortBreak = useCallback(() => {
    setMinutes(5);
    setSeconds('00');

    setMode('short break');
    setClicked('short break');
    setIsActive(true);
  }, []);

  const longBreak = useCallback(() => {
    setMinutes(15);
    setSeconds('00');
    setMode('long break');
    setClicked('long break');
    setIsActive(true);
  }, []);

  // changes mode after time passed
  useEffect(() => {
    if (
      mode === 'pomodoro' &&
      minutes === 0 &&
      seconds === 0 &&
      breakTimer < 4
    ) {
      shortBreak();
      setBreakTimer(breakTimer + 1);
    } else if (
      mode === 'short break' &&
      breakTimer < 4 &&
      minutes === 0 &&
      seconds === 0
    ) {
      pomodoro();
    } else if (breakTimer === 4) {
      longBreak();
      setBreakTimer(0);
    }
  }, [mode, minutes, breakTimer, seconds, longBreak, pomodoro, shortBreak]);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const reset = useCallback(() => {
    setSeconds('00');
    setIsActive(false);

    if (mode === 'pomodoro') {
      setMinutes(25);
    } else if (mode === 'short break') {
      setMinutes(5);
    } else if (mode === 'long break') {
      setMinutes(15);
    }
  }, [mode]);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  return (
    <Container>
      <PomodoroContainer>
        <PomodoroButton
          onPress={pomodoro}
          color={clicked === 'pomodoro' ? '#0099e6' : '#66ccff'}>
          <ButtonText>Pomodoro</ButtonText>
        </PomodoroButton>
        <PomodoroButton
          onPress={shortBreak}
          color={clicked === 'short break' ? '#0099e6' : '#66ccff'}>
          <ButtonText>Short Break</ButtonText>
        </PomodoroButton>
        <PomodoroButton
          onPress={longBreak}
          color={clicked === 'long break' ? '#0099e6' : '#66ccff'}>
          <ButtonText>Long Break</ButtonText>
        </PomodoroButton>
      </PomodoroContainer>

      <CounterContainer>
        {seconds < 10 && seconds !== '00'
          ? `${minutes}:0${seconds}`
          : `${minutes}:${seconds}`}
      </CounterContainer>

      <ButtonContainer>
        <ButtonAction theme="green" onPress={start}>
          <ButtonText>Start</ButtonText>
        </ButtonAction>
        <ButtonAction theme="red" onPress={stop}>
          <ButtonText>Stop</ButtonText>
        </ButtonAction>
        <ButtonAction theme="grey" onPress={reset}>
          <ButtonText>Reset</ButtonText>
        </ButtonAction>
      </ButtonContainer>

      <TodoButton onPress={() => navigate.navigate('Todo')}>
        <ButtonText>Todo Page</ButtonText>
      </TodoButton>
    </Container>
  );
};

export default Timer;
