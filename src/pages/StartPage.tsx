import css from "./StartPage.module.scss";

import swipe_app from "../assets/img/icons/swipe-up.svg";
import Button from "../modules/Button/Button";
import AutoTimer from "../modules/Timer/AutoTimer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectStatus } from "@/store/selectors";

const StartPage = () => {
  const [timeExpired, setTimeExpired] = useState(false);
  const status = useSelector(selectStatus);

  useEffect(() => {
    console.log("status", status);
  }, [status]);

  const handleExpired = (flag: boolean) => {
    setTimeExpired(flag);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.body}>
        <div className={css.body_content}>
          <div className={css.header}>вершина 404</div>
          <div className={css.time}>
            {timeExpired ? (
              <h1 className={`${css.time_title}`}>Форма откроется через: </h1>
            ) : (
              <h1 className={`${css.time_title}`}>Форма закроется через: </h1>
            )}
            <div className={css.time_clock}>
              <AutoTimer onExpire={handleExpired} />
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
        {status && ["admin", "freezed", "member"].includes(status) ? (
          <Button to={"/daily-reports"}>
            <span>перейти в приложение</span>
          </Button>
        ) : (
          <Button to={"/access-denied"}>перейти в приложение</Button>
        )}
      </div>
    </div>
  );
};

export default StartPage;
