import { useEffect, useState, useCallback } from "react";
import UserReport from "../UserReport/UserReport";
import * as axios from "@/api/axios/requests";
import _ from "lodash";
import styles from "./InfinityScroll.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "@telegram-apps/telegram-ui";

const InfinityScroll = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [reports, setReports] = useState<BodyItemReports[]>([]);
  const [page, setPage] = useState(0);
  const [hasMoreReports, setHasMoreReports] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const handleShowMore = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const getReportsByPage = async (page: number) => {
    try {
      setLoading(true);
      const reportsData = await axios.getReportsByPage({
        params: { page: page.toString() }
      });
      setReports((prevReports) => [
        ...prevReports,
        ...reportsData.data.body.reports
      ]);
      // Задержка на 3 секунды
      await new Promise((resolve) => setTimeout(resolve, 3));
      setHasMoreReports(reportsData.data.body.hasMoreReports);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert(`Произошла ошибка: ${err}`);
      setLoading(false);
    }
  };

  const handleScroll = useCallback(
    _.throttle(() => {
      if (window.scrollY > 1300) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }

      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading &&
        hasMoreReports
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 200),
    [loading, hasMoreReports]
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    getReportsByPage(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      {reports.map((report, index) => (
        <UserReport
          key={index}
          showMore={expandedItem === index}
          handleShowMore={() => handleShowMore(index)}
          reportData={report}
          showDate={true}
        />
      ))}
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spinner size="s" />
        </div>
      )}

      {showScrollTopButton && (
        <button className={styles.scrollTopButton} onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </>
  );
};

export default InfinityScroll;
