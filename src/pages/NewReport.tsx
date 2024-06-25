import { useEffect, useState } from "react";
import AutoTimer from "../modules/Timer/AutoTimer";
import css from "./NewReport.module.scss";
import * as axios from "../api/axios/requests";
import Cookies from "js-cookie";
import ReportSent from "@/modules/ReportSent/ReportSent";
import ReportTimeExpired from "@/modules/ReportTimeExpired/ReportTimeExpired";

interface FormData {
  question1: string;
  question2: string;
  question3: string;
  photo?: File;
}

const NewReport = () => {
  const [timeExpired, setTimeExpired] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [sent, setSent] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>("");
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
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const maxSizeMB = 30; // Максимальный размер файла в мегабайтах
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file) {
      if (file.size <= maxSizeBytes && file.type.startsWith("image/")) {
        setSelectedFile(URL.createObjectURL(file));
        setErrors((prevErrors) => ({ ...prevErrors, question4: "" }));
      } else {
        setSelectedFile(null);
        setErrors((prevErrors) => ({
          ...prevErrors,
          question4:
            "Размер файла не должен превышать 30 МБ и должен быть изображением."
        }));
        event.target.value = ""; // Сбросить выбранный файл
      }
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, question4: "" })); // Очистить ошибку, если файл не выбран
    }

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        photo: file
      }));
    }
  };

  const handleRemoveFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelectedFile(null);
    setFormData((prevData) => ({
      ...prevData,
      photo: undefined
    }));
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    const formDataToSend = new FormData();
    formDataToSend.append("question1", formData.question1);
    formDataToSend.append("question2", formData.question2);
    formDataToSend.append("question3", formData.question3);
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }

    try {
      const response = await axios.postUserReport({
        params: formDataToSend,
        config: {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data"
          }
        }
      });
      const status = response.data.status;
      if (status === "Success") {
        setSent(true);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    }

    setErrors({});
  };

  if (timeExpired)
    return (
      <ReportTimeExpired>
        <AutoTimer onExpire={handleExpired} />
      </ReportTimeExpired>
    );

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
          {currentQuestion === 3 && (
            <div className={css.formItem}>
              <div className={css.formItem_label}>
                <label>Прикрепить фото, по желанию</label>
              </div>
              <div className={`${css.formItem_input} ${css.formtItem_photo}`}>
                <label className={css.fileInputLabel}>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {selectedFile && (
                    <div className={css.form_img}>
                      <img
                        src={selectedFile}
                        alt="Selected"
                        className={css.previewImage}
                      />
                    </div>
                  )}
                  <div className={css.fileInputPlaceholder}>
                    <span className={css.plus}>+</span>
                    <span className={css.add_photo}>ДОБАВИТЬ ФОТО</span>
                  </div>
                </label>
                {selectedFile && (
                  <button
                    type="button"
                    className={`${css.removeButton} ${css.button} ${css.black}`}
                    onClick={handleRemoveFile}
                  >
                    Удалить
                  </button>
                )}
                {errors.question4 && (
                  <div className={css.error}>{errors.question4}</div>
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
            {currentQuestion < 3 ? (
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
