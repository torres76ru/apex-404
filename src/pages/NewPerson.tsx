import { useEffect, useState } from "react";
import * as axios from "@/api/axios/requests";
import { useSelector } from "react-redux";
import { selectInitData, selectToken } from "@/store/selectors";

const NewPerson = () => {
  const [email, setEmail] = useState("");
  const initData = useSelector(selectInitData);
  const token = useSelector(selectToken);

  useEffect(() => {
    console.log(initData, token);
  }, [initData, token]);

  const sendEmail = async () => {
    if (initData?.user?.id === undefined) return;
    if (!token) return;

    await axios.postMail({
      params: {
        email: email,
        userChatId: initData.user.id.toString()
      },
      config: {
        headers: { Authorization: token }
      }
    });
  };
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="button" onClick={sendEmail}>
        Перейти к оплате
      </button>
    </div>
  );
};

export default NewPerson;
