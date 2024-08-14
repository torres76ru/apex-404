import Container from "../modules/Container/Container";
import css from "./DailyReports.module.scss";
// import { Report } from "../types";

import InfinityScroll from "@/modules/InfinityScroll/InfinityScroll";

const DailyReportsTEMP = () => {
  return (
    <div>
      <Container>
        <div className={css.heading}>
          <h1 className={`${css.title}`}>Отчеты других участников</h1>
        </div>
        <div className={css.reports}>
          <InfinityScroll />
        </div>
      </Container>
    </div>
  );
};

export default DailyReportsTEMP;
