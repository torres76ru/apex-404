import { useEffect, useState } from "react";
import Timer from "./Timer";
import { getExpiryTime } from "../../utils";

interface AutoTimerProps {
  onExpire?: (flag: boolean) => void;
}

const AutoTimer = ({ onExpire }: AutoTimerProps) => {
  const [expiryTime, setExpiryTime] = useState<Date>(
    () => new Date(Date.now())
  );

  const handleExpired = () => {
    const [flag, time] = getExpiryTime();
    setExpiryTime(time);
    if (onExpire) {
      onExpire(flag);
    }
  };

  useEffect(() => {
    handleExpired();
  }, []);

  return <Timer expiryTimestamp={expiryTime} onExpire={handleExpired} />;
};

export default AutoTimer;
