import Container from "../modules/Container/Container";
import UserReport from "../modules/UserReport/UserReport";
import css from "./DailyReports.module.scss";
import * as axios from "../api/axios/requests";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "@/store/selectors";

const UserProfile = () => {
  const [reports, setReports] = useState<BodyItemReports[]>([]);
  const token = useSelector(selectToken);

  useEffect(() => {
    const fetch = async () => {
      const getReportsResponses = await Promise.all([
        axios.getUserReports({
          config: {
            headers: {
              Authorization: `${token}`
            }
          }
        })
      ]);

      const [reports] = getReportsResponses;
      let reportsData = reports.data.body;

      // Преобразование и сортировка отчетов по дате
      reportsData = reportsData
        .map((report) => ({
          ...report,
          // Преобразование строки даты в объект Date
          dateObj: new Date(report.date)
        }))
        .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

      setReports(reportsData);

      console.log(reportsData);
    };
    if (token) {
      fetch();
    }
  }, [token]);

  return (
    <div>
      <Container>
        <div className={css.heading}>
          <h1 className={`${css.title}`}>МОИ ОТЧЕТЫ</h1>
        </div>
        <div className={css.reports}>
          {reports.map((report, index) => (
            <UserReport
              key={index}
              showMore={true}
              handleShowMore={() => {}}
              reportData={report}
              showDate={true}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;
