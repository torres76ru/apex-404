import { Link } from "react-router-dom";
import css from "./ReportSent.module.scss";

const ReportSent = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.body}>
        <div className={css.slogan}>
          ЕЩЕ ОДИН ШАГ К ПОБЕДЕ, <br /> ОТЧЁТ УСПЕШНО ОТПРАВЛЕН!
        </div>
        <div className={css.brand}>ВЕРШИНА 404</div>
      </div>
      <div className={css.footer}>
        <Link to="/user-profile" className={css.button}>
          Посмотреть свои отчеты
        </Link>
      </div>
    </div>
  );
};

export default ReportSent;
