import { useLocation, Link } from "react-router-dom";
import daily_reports_icon from "../../assets/img/icons/daily-reports.svg";
import daily_reports_active_icon from "../../assets/img/icons/daily-reports-active.svg";
import new_report_icon from "../../assets/img/icons/new-report.svg";
import new_report_active_icon from "../../assets/img/icons/new-report-active.svg";
import user_profile_icon from "../../assets/img/icons/user-profile.svg";
import user_profile_active_icon from "../../assets/img/icons/user-profile-active.svg";
import admin_icon from "@/assets/img/icons/admin.svg";
import admin_active_icon from "@/assets/img/icons/admin-active.svg";
import css from "./Navbar.module.scss";
import { useSelector } from "react-redux";
import { selectStatus } from "@/store/selectors";

const Navbar = () => {
  const status = useSelector(selectStatus);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={css.container}>
      <div className={css.row}>
        <div className={`${css.column} ${css.left}`}>
          <Link to="/daily-reports">
            <div
              className={`${css.item} ${
                currentPath === "/daily-reports" ? css.active : ""
              }`}
            >
              <img
                src={
                  currentPath === "/daily-reports"
                    ? daily_reports_active_icon
                    : daily_reports_icon
                }
                alt="Лента"
              />
              <span>лента</span>
            </div>
          </Link>
        </div>
        <div className={`${css.column} ${css.center}`}>
          <Link to="/new-report">
            <div
              className={`${css.item} ${
                currentPath === "/new-report" ? css.active : ""
              }`}
            >
              <img
                src={
                  currentPath === "/new-report"
                    ? new_report_active_icon
                    : new_report_icon
                }
                alt="Отчет"
              />
              <span>отчет</span>
            </div>
          </Link>
        </div>
        <div
          className={`${css.column} ${
            status === "admin" ? css.center : css.right
          }`}
        >
          <Link to="/user-profile">
            <div
              className={`${css.item} ${
                currentPath === "/user-profile" ? css.active : ""
              }`}
            >
              <img
                src={
                  currentPath === "/user-profile"
                    ? user_profile_active_icon
                    : user_profile_icon
                }
                alt="Профиль"
              />
              <span>профиль</span>
            </div>
          </Link>
        </div>
        {status === "admin" && (
          <div className={`${css.column} ${css.right}`}>
            <Link to="/admin">
              <div
                className={`${css.item} ${
                  currentPath === "/admin" ? css.active : ""
                }`}
              >
                <img
                  src={
                    currentPath === "/admin" ? admin_active_icon : admin_icon
                  }
                  alt="управление"
                />
                <span>управление</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
