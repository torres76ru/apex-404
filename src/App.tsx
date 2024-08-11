import { retrieveLaunchParams } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { setInitData, setStatus, setToken } from "./store/toolkitSlice";
import * as axios from "./api/axios/requests";
import { selectInitData, selectToken } from "./store/selectors";

const App = () => {
  const { initData, initDataRaw } = retrieveLaunchParams();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const initDataStore = useSelector(selectInitData);

  useEffect(() => {
    const getToken = async () => {
      try {
        if (initDataRaw) {
          const response = await axios.fetchAuthToken({
            config: {
              headers: { Authorization: initDataRaw }
            }
          });
          const token = response.data.body;
          if (response.status == 200) {
            dispatch(setToken(token));
          }
        }
      } catch (error) {
        console.error("Failed to fetch token:", error);
        alert(`Ошибка при загрузке токена: ${error}`);
      }
    };

    if (initData && !initDataStore && initDataRaw) {
      dispatch && dispatch(setInitData(initData));
      getToken();
    }
  }, [dispatch, initData, initDataRaw, initDataStore]);

  useEffect(() => {
    const getUserStatus = async () => {
      try {
        const response = await axios.postCheckUserStatus({
          config: {
            headers: { Authorization: token }
          }
        });

        dispatch(setStatus(response.data.body));
      } catch (error) {
        console.error("Failed to check user status:", error);
        alert(`Ошибка при загрузке статуса: ${error}`);
      }
    };

    if (token) {
      getUserStatus();
    }
  }, [token, dispatch]);

  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
};

export default App;
