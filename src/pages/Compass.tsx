import { useEffect } from "react";
// import * as axios from "@/api/axios/requests";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import css from "./Compass.module.scss";
import Button from "@/modules/Button/Button";
import Container from "@/modules/Container/Container";
// import Spinner from "@/modules/Spinner/Spinner";

const Compass = () => {
  // const [email, setEmail] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [popupVisible, setPopupVisible] = useState(false);
  const initData = useSelector((state: RootState) => state.toolkit.initData);
  const token = useSelector((state: RootState) => state.toolkit.token);

  useEffect(() => {
    console.log(initData, token);
  }, [initData, token]);

  // const validateEmail = (email: string) => {
  //   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return re.test(String(email).toLowerCase());
  // };

  // const sendEmail = async () => {
  //   if (initData?.user?.id === undefined) return;
  //   if (!token) return;
  //   console.log("here");
  //   if (!validateEmail(email)) {
  //     setEmailError("Введите корректный Email");
  //     return;
  //   } else {
  //     setEmailError("");
  //   }

  //   setLoading(true); // Set loading state

  //   try {
  //     const response = await axios.postMail({
  //       params: {
  //         email: email,
  //         userChatId: initData.user.id.toString()
  //       },
  //       config: {
  //         headers: { Authorization: token }
  //       }
  //     });

  //     if (response.data.status === "Success") {
  //       setPopupVisible(true);
  //       const redirectUrl = response.data.body;
  //       window.location.href = redirectUrl; // Redirect the user
  //     } else {
  //       console.error("Error sending email", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error sending email", error);
  //   } finally {
  //     setLoading(false); // Reset loading state
  //   }
  // };

  // const popup = () => {

  //   return (
  //     <div className={css.popup}>
  //       <div className={css.popup_body}>
  //         <div
  //           className={css.close_icon}
  //           onClick={() => setPopupVisible(false)}
  //         >
  //           x
  //         </div>
  //         <div className={css.input}>
  //           <label className={css.label}>Введите Email</label>
  //           <input
  //             type="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //           />
  //           {emailError && <span className={css.error}>{emailError}</span>}
  //         </div>
  //         {loading ? (
  //           <div className={css.spinner}>
  //             <Spinner />
  //           </div>
  //         ) : (
  //           <button type="button" onClick={sendEmail}>
  //             Перейти к оплате
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  const goToSite = () => {
    window.location.href = "https://404brand.pro/kompas_copy";
  };

  return (
    <div className={css.wrapper}>
      <Container>
        <div className={css.body}>
          <p className={css.p1}>
            Мы не нашли твоего отчета вчера - <br />
            значит ты потерялся на пути
          </p>

          <h1 className={css.header}>
            Вершина<span>404</span>
          </h1>
          <p className={css.p2}>
            Приобрети компас - <br /> и вернись на маршрут
          </p>
          <div className={css.button}>
            <Button
              onClick={() => {
                goToSite();
              }}
            >
              <span className={css.buttonText}>Вернуться на маршрут</span>
            </Button>
          </div>
          <p className={css.p3}>
            1000 Р - стоимость возврата
            <br /> в телеграм-канал "Вершина 404"
          </p>
        </div>
        {/* {popupVisible && popup()} */}
      </Container>
    </div>
  );
};

export default Compass;
