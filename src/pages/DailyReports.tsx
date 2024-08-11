import { useEffect, useState } from "react";
import Container from "../modules/Container/Container";
import UserReport from "../modules/UserReport/UserReport";
import css from "./DailyReports.module.scss";
// import { Report } from "../types";
import * as axios from "../api/axios/requests";
import DayPicker from "@/modules/DayPicker/DayPicker";

const DailyReports = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [reports, setReports] = useState<BodyItemReports[]>([]);
  const [currentDay, setCurrentDay] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const handleShowMore = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const getCurrentDay = async () => {
    try {
      const dayData = await axios.getDay();
      setCurrentDay(dayData.data.body || "0");
    } catch (err) {
      console.log("get current day", err);
    }
  };

  const getReportsByDay = async (day: string) => {
    try {
      const reportsData = await axios.getReportsByDay({
        params: { day: day }
      });
      const sortedReports = reportsData.data.body.sort(
        (a, b) => a.userId - b.userId
      );
      setReports(sortedReports);
    } catch (err) {
      console.log(err);
      alert(`Произошла ошибка: ${err}}`);
    }
  };

  useEffect(() => {
    getCurrentDay();
  }, []);

  useEffect(() => {
    if (currentDay) {
      setSelectedDay(parseInt(currentDay, 10)); // Initialize selectedDay with currentDay
      getReportsByDay(currentDay);
    }
  }, [currentDay]);

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    getReportsByDay(day.toString());
  };

  return (
    <div>
      <Container>
        <div className={css.heading}>
          <h1 className={`${css.title}`}>Отчеты других участников</h1>
          <span className={css.marker}>
            <DayPicker currentDay={selectedDay} onDaySelect={handleDaySelect} />
          </span>
        </div>
        <div className={css.reports}>
          {reports.map((report, index) => (
            <UserReport
              key={index}
              showMore={expandedItem === index}
              handleShowMore={() => handleShowMore(index)}
              reportData={report}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DailyReports;
