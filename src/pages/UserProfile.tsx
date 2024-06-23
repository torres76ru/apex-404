import Container from "../modules/Container/Container";
import UserReport from "../modules/UserReport/UserReport";
import css from "./DailyReports.module.scss";
import * as axios from "../api/axios/requests";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const UserProfile = () => {
  const [reports, setReports] = useState<BodyItemReports[]>([]);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getToken = async () => {
      try {
        const savedToken = Cookies.get("token");
        console.log("token: " + savedToken);
        setToken(savedToken);
      } catch (error) {
        console.error("Failed to fetch token:", error);
      }
    };
    getToken();
  }, []);

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
      const reportsData = reports.data.body;

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
