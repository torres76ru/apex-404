import css from "./StartPage.module.scss";

import swipe_app from "../assets/img/icons/swipe-up.svg";
import { Link } from "react-router-dom";
import Button from "../modules/Button/Button";
import { useEffect, useState } from "react";
import { getCurrentDateInUTCPlus3 } from "../utils";
import Timer from "../modules/Timer/Timer";

const StartPage = () => {
  const [expiryTime, setExpiryTime] = useState<Date>(
    () => new Date(Date.now())
  );
  useEffect(() => {
    const dateInUTCPlus3 = getCurrentDateInUTCPlus3();
    const time =
      dateInUTCPlus3.getHours() < 10
        ? new Date(
            dateInUTCPlus3.getFullYear(),
            dateInUTCPlus3.getMonth(),
            dateInUTCPlus3.getDate(),
            10,
            0,
            0,
            0
          )
        : new Date(
            dateInUTCPlus3.getFullYear(),
            dateInUTCPlus3.getMonth(),
            dateInUTCPlus3.getDate(),
            23,
            59,
            59,
            999
          );

    setExpiryTime(time);
    console.log("Set time", time);
  }, []);

  return (
    <div className={css.wrapper}>
      <div className={css.body}>
        <div className={css.body_content}>
          <div className={css.header}>вершина 404</div>
          <div className={css.time}>
            <div className={css.time_title}>форма отчета закроется через</div>
            <div className={css.time_clock}>
              <Timer expiryTimestamp={expiryTime} />
            </div>
          </div>
          <div className={css.swipe}>
            <div className={css.swipe_icon}>
              <img src={swipe_app} alt="Тяни вверх" />
            </div>
            <div className={css.swipe_text}>Тяни вверх</div>
          </div>
        </div>
      </div>
      <div className={css.footer}>
        <Link to={"/daily-reports"}>
          <Button>перейти в приложение</Button>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
