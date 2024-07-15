import error_icon from "@/assets/img/error_icon.png";
import css from "./AccessDenied.module.scss";
import Container from "@/modules/Container/Container";
import Button from "@/modules/Button/Button";
import { selectStatus } from "@/store/selectors";
import { useSelector } from "react-redux";

const AccessDenied = () => {
  const status = useSelector(selectStatus);
  return (
    <div className={css.wrapper}>
      <div className={css.body}>
        <Container>
          <div className={css.content}>
            <div className={`${css.image}`}>
              <img src={error_icon} alt="Error icon" />
            </div>
            <div className={css.title}>
              <h1>В доступе отказанно...</h1>
            </div>
            <div className={`${css.buttons}`}>
              <Button variant={"inline_black"} href={"https://404brand.ru/"}>
                Приобрести доступ
              </Button>
              <Button variant={"inline_white"} href={"https://t.me/admn_404"}>
                НАПИСАТЬ В ПОДДЕРЖКУ
              </Button>
              {status && ["banned"].includes(status) && (
                <Button variant={"inline_white"} to={"/compass"}>
                  Я забыл написать отчет
                </Button>
              )}
            </div>
          </div>
        </Container>
        <Container>
          <div className={`${css.brand}`}>ВЕРШИНА 404</div>
        </Container>
      </div>
    </div>
  );
};

export default AccessDenied;
