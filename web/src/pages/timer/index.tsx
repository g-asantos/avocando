import React, { useState, useCallback, useEffect } from 'react';

import {
  Container,
  Button,
  ButtonContainer,
  PomodoroButton,
  PomodoroContainer,
} from './styles';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const alarmSound = require('../../assets/oogah_horn05.wav');

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number | string>('00');
  const [minutes, setMinutes] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [breakTimer, setBreakTimer] = useState(0);
  const [clicked, setClicked] = useState('');

  const alarmAudio = new Audio(alarmSound);

  const playSound = (audioFile: HTMLAudioElement) => {
    audioFile.play();
  };

  // timer
  useEffect(() => {
    let interval: number;

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
      playSound(alarmAudio);
    }

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(activeSeconds => Number(activeSeconds) - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [seconds, isActive, minutes, alarmAudio]);

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
          onClick={pomodoro}
          color={clicked === 'pomodoro' ? '#0099e6' : '#66ccff'}
        >
          Pomodoro
        </PomodoroButton>
        <PomodoroButton
          onClick={shortBreak}
          color={clicked === 'short break' ? '#0099e6' : '#66ccff'}
        >
          Short Break
        </PomodoroButton>
        <PomodoroButton
          onClick={longBreak}
          color={clicked === 'long break' ? '#0099e6' : '#66ccff'}
        >
          Long Break
        </PomodoroButton>
      </PomodoroContainer>

      <div>
        {seconds < 10 && seconds !== '00'
          ? `${minutes}:0${seconds}`
          : `${minutes}:${seconds}`}
      </div>

      <ButtonContainer>
        <Button theme="green" onClick={start}>
          Start
        </Button>
        <Button theme="red" onClick={stop}>
          Stop
        </Button>
        <Button theme="grey" onClick={reset}>
          Reset
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Timer;
