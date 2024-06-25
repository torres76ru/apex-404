import { Link } from "react-router-dom";
import css from "./ReportTimeExpired.module.scss";

interface ReportTimeExpiredProps {
  children?: React.ReactNode;
}

const ReportTimeExpired = ({ children }: ReportTimeExpiredProps) => {
  return (
    <div className={css.wrapper}>
      <div className={css.body}>
        <h1 className={css.title}>ВЕРШИНА 404</h1>
        <p className={css.info}>
          На сегодня прием отчетов завершен,
          <br /> форма откроется в 10:00 по МСК
        </p>
        <p className={css.info}>До открытия формы осталось:</p>
        <div className={css.timer}>{children}</div>
      </div>
      <div className={css.footer}>
        <Link to="/user-profile" className={css.button}>
          Посмотреть свои отчеты
        </Link>
      </div>
    </div>
  );
};

export default ReportTimeExpired;
