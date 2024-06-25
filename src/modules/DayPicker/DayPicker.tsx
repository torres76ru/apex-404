import { useState } from "react";
import css from "./DayPicker.module.scss";

interface DayPickerProps {
  currentDay: number | null;
  onDaySelect: (day: number) => void;
}

const DayPicker = ({ currentDay, onDaySelect }: DayPickerProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const renderDayOptions = () => {
    const options = [];
    for (let i = 1; i <= 30; i++) {
      options.push(
        <div
          key={i}
          className={`${css.dayOption} ${
            currentDay === i && css.selectedOption
          }`}
          onClick={() => {
            onDaySelect(i);
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          День {i}
        </div>
      );
    }
    return options;
  };

  return (
    <div className={css.body}>
      <div
        className={`${css.selectedDay} ${isDropdownOpen && css._active}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        День <span className="underline">{currentDay}</span> из 30
      </div>
      {isDropdownOpen && (
        <div className={css.dropdownContent}>
          <div className={css.dropdownContent_body}>{renderDayOptions()}</div>
        </div>
      )}
    </div>
  );
};

export default DayPicker;
