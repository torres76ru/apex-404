import css from "./StartPage.module.scss";

import swipe_app from "../assets/img/icons/swipe-up.svg";
import { Link } from "react-router-dom";
import Button from "../modules/Button/Button";
import AutoTimer from "../modules/Timer/AutoTimer";
import { useEffect, useState } from "react";
import { retrieveLaunchParams } from "@tma.js/sdk-react";
import { fetchToken } from "../sevices";
import Cookies from "js-cookie";

const StartPage = () => {
  const { initData } = retrieveLaunchParams();
  const [timeExpired, setTimeExpired] = useState(false);
  const handleExpired = (flag: boolean) => {
    setTimeExpired(flag);
  };
  useEffect(() => {
    const getToken = async () => {
      try {
        if (initData) {
          const data = await fetchToken(initData);
          const token = data.body;

          // Сохранение токена в куки
          Cookies.set("token", token, { expires: 7 });
        }
      } catch (error) {
        alert(
          (error as Error).message ||
            "Failed to fetch token. Please try again later."
        );
      }
    };

    getToken();
  }, [initData]);

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
        <Link to={"/daily-reports"}>
          <Button>перейти в приложение</Button>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
