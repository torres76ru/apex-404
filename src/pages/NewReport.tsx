import { useEffect, useState } from "react";
import AutoTimer from "../modules/Timer/AutoTimer";
import css from "./NewReport.module.scss";
import * as axios from "../api/axios/requests";
import Cookies from "js-cookie";
import ReportSent from "@/modules/ReportSent/ReportSent";

interface FormData {
  question1: string;
  question2: string;
  question3: string;
}

const questions = [
  { id: 0, body: "Что было сделано сегодня?" },
  { id: 1, body: "Что я буду делать завтра?" },
  { id: 2, body: "Что я могу улучшить?" }
];

const NewReport = () => {
  const [timeExpired, setTimeExpired] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    question1: "",
    question2: "",
    question3: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const getToken = async () => {
      try {
        const savedToken = Cookies.get("token");
        setToken(savedToken);
      } catch (error) {
        alert(`Failed to fetch token:${error}`);
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    const getReport = async () => {
      try {
        const response = await axios.getUserReport({
          config: { headers: { Authorization: token } }
        });

        const status = response.data.status;
        setSent(status === "Success");
        console.log(status);
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      getReport();
    }
  }, [token]);

  const handleExpired = (flag: boolean) => {
    setTimeExpired(flag);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.question3) {
      newErrors.question3 = "Это поле обязательно к заполнению";
      setCurrentQuestion(2);
    }
    if (!formData.question2) {
      newErrors.question2 = "Это поле обязательно к заполнению";
      setCurrentQuestion(1);
    }
    if (!formData.question1) {
      newErrors.question1 = "Это поле обязательно к заполнению";
      setCurrentQuestion(0);
    }
    console.log(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(formData);

    const questionsPayload = [
      { id: 0, body: questions[0].body, answer: formData.question1 },
      { id: 1, body: questions[1].body, answer: formData.question2 },
      { id: 2, body: questions[2].body, answer: formData.question3 }
    ];

    const payload = { questions: questionsPayload };

    const sendReport = async () => {
      const postUserReport = await Promise.all([
        axios.postUserReport({
          params: payload,
          config: {
            headers: {
              Authorization: `${token}`
            }
          }
        })
      ]);
      console.log(postUserReport);
      const [report] = postUserReport;
      const status = report.data.status;
      if (status === "Success") {
        setSent(true);
      }
    };
    if (token) {
      sendReport();
    } else {
      alert("Необходимо авторизоваться");
    }
    setErrors({});
  };

  if (sent) return <ReportSent />;

  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        {timeExpired ? (
          <h1 className={`${css.title}`}>Форма откроется через: </h1>
        ) : (
          <h1 className={`${css.title}`}>Форма закроется через: </h1>
        )}
        <span className={css.timer}>
          <AutoTimer onExpire={handleExpired} />
        </span>
      </div>

      {!timeExpired && (
        <form className={css.formBody} onSubmit={handleSubmit} noValidate>
          {currentQuestion === 0 && (
            <div className={css.formItem}>
              <div className={css.formItem_label}>
                <label>Что было сделано сегодня?</label>
              </div>
              <div className={css.formItem_input}>
                <textarea
                  name="question1"
                  value={formData.question1}
                  onChange={handleChange}
                  required
                  style={{
                    border: errors.question1 ? "1px solid red" : "initial"
                  }}
                />
                {errors.question1 && (
                  <div className={css.error}>{errors.question1}</div>
                )}
              </div>
            </div>
          )}
          {currentQuestion === 1 && (
            <div className={css.formItem}>
              <div className={css.formItem_label}>
                <label>Что я буду делать завтра?</label>
              </div>
              <div className={css.formItem_input}>
                <textarea
                  name="question2"
                  value={formData.question2}
                  onChange={handleChange}
                  required
                  style={{
                    border: errors.question2 ? "1px solid red" : "initial"
                  }}
                />
                {errors.question2 && (
                  <div className={css.error}>{errors.question2}</div>
                )}
              </div>
            </div>
          )}
          {currentQuestion === 2 && (
            <div className={css.formItem}>
              <div className={css.formItem_label}>
                <label>Что я могу улучшить?</label>
              </div>
              <div className={css.formItem_input}>
                <textarea
                  name="question3"
                  value={formData.question3}
                  onChange={handleChange}
                  required
                  style={{
                    border: errors.question3 ? "1px solid red" : "initial"
                  }}
                />
                {errors.question3 && (
                  <div className={css.error}>{errors.question3}</div>
                )}
              </div>
            </div>
          )}
          <div className={css.buttons}>
            {currentQuestion > 0 && (
              <button
                className={`${css.button} ${css.grey}`}
                type="button"
                onClick={handleBack}
              >
                Назад
              </button>
            )}
            {currentQuestion < 2 ? (
              <button
                className={`${css.button} ${css.black}`}
                type="button"
                onClick={handleNext}
              >
                Далее
              </button>
            ) : (
              <button
                className={`${css.button} ${css.black}`}
                type="button"
                onClick={handleSubmit}
              >
                Отправить
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default NewReport;
