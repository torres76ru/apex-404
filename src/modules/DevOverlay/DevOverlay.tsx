import { useState } from "react";
import css from "./DevOverlay.module.scss";
import { Link } from "react-router-dom";

const DevOverlay = () => {
  // Add functionality for the button to toggle the overlay
  const [isOpen, setIsOpen] = useState(false);

  // Функция для переключения состояния оверлея
  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${css.overlayBody} ${isOpen && css.active}`}>
      {/* Кнопка для переключения оверлея */}
      <div className={css.devButton} onClick={toggleOverlay}>
        {!isOpen ? (
          <div className={css.circle}></div>
        ) : (
          <div className={css.cross}></div>
        )}
      </div>

      {/* Сам оверлей, отображается только если isOpen === true */}
      {isOpen && (
        <div className={css.overlay}>
          <h2>Dev Overlay</h2>
          <p>
            <Link to="/">Start Page</Link>
          </p>

          <p>
            <Link to="/compass">Compass</Link>
          </p>
          <p>
            <Link to="/access-denied">Access denied</Link>
          </p>

          <p>
            <Link to="/daily-reports">/daily-reports</Link>
          </p>
          <p>
            <Link to="/new-report">/new-report</Link>
          </p>
          <p>
            <Link to="/user-profile">/user-profile</Link>
          </p>
          <p>
            <Link to="/admin">/admin</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default DevOverlay;
