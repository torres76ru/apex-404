import "./Spinner.scss"; // Подключаем стили для Spinner

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Spinner;
