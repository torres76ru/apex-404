import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

interface TimerProps {
  expiryTimestamp: Date;
}

const padNumber = (number: number) => {
  return number.toString().padStart(2, "0");
};

const Timer = ({ expiryTimestamp }: TimerProps) => {
  const { seconds, minutes, hours, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called")
  });

  useEffect(() => {
    console.log(expiryTimestamp.toString());
  }, [expiryTimestamp]);

  useEffect(() => {
    restart(expiryTimestamp);
  }, [expiryTimestamp, restart]);

  return (
    <div>
      <span>{padNumber(hours)}</span>:<span>{padNumber(minutes)}</span>:
      <span>{padNumber(seconds)}</span>
    </div>
  );
};

export default Timer;
