import css from "./UserReport.module.scss";
import placeholder from "../../assets/img/avatar-empty.png";

interface UserReportProps {
  showMore: boolean;
  handleShowMore: () => void;
  reportData: BodyItemReports;
  showDate?: boolean;
}

const UserReport = ({
  showMore,
  handleShowMore,
  showDate = false,
  reportData
}: UserReportProps) => {
  return (
    <>
      <div className={css.body}>
        <div className={css.header}>
          <div className={css.header_left}>
            <img src={placeholder} alt="user profile" />
          </div>
          <div className={css.header_right}>
            <div className={css.header_info}>
              <div className={css.uid}>UID: {reportData.ownerUuid}</div>
              <div className={css.username}>{reportData.ownerUsername}</div>
            </div>
            {showDate && <div className={css.date}>{reportData.date}</div>}
          </div>
        </div>
        <div className={css.body_content}>
          <div className={css.question}>
            <div className={css.label}>что было сделано сегодня?</div>
            <div className={css.text}>{reportData.questions[0].answer}</div>
          </div>
          {showMore && (
            <>
              <div className={css.question}>
                <div className={css.label}>что буду делать завтра?</div>
                <div className={css.text}>{reportData.questions[1].answer}</div>
              </div>
              <div className={css.question}>
                <div className={css.label}>Что могу улучшить?</div>
                <div className={css.text}>{reportData.questions[2].answer}</div>
              </div>
            </>
          )}
          {!showMore && (
            <div className={css.showMoreButton} onClick={handleShowMore}>
              Показать еще
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserReport;
