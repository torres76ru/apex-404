import { useEffect, useState } from "react";
import Container from "../modules/Container/Container";
import UserReport from "../modules/UserReport/UserReport";
import css from "./DailyReports.module.scss";
// import { Report } from "../types";
import * as axios from "../api/axios/requests";

const DailyReports = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [reports, setReports] = useState<BodyItemReports[]>([]);
  const [currentDay, setCurrentDay] = useState<string>("");

  const handleShowMore = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  useEffect(() => {
    const fetch = async () => {
      const getDay = await Promise.all([axios.getDay()]);
      const [day] = getDay;
      const dayData = day.data.body;

      const getReportsByDay = await Promise.all([
        axios.getReportsByDay({ params: { day: dayData } })
      ]);

      const [reports] = getReportsByDay;
      const reportsData = reports.data.body;

      setReports(reportsData);
      setCurrentDay(dayData);

      console.log(reports, day);
    };

    fetch();
  }, []);

  return (
    <div>
      <Container>
        <div className={css.heading}>
          <h1 className={`${css.title}`}>Отчеты других участников</h1>
          <span className={css.marker}>
            День <span className="underline">{currentDay}</span> из 30
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
