import { retrieveLaunchParams } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { setInitData, setToken } from "./store/toolkitSlice";
import { fetchToken } from "./sevices";
import { RootState } from "./store";
import * as axios from "./api/axios/requests";
import { selectToken } from "./store/selectors";

const App = () => {
  const { initData, initDataRaw } = retrieveLaunchParams();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const initDataStore = useSelector(
    (state: RootState) => state.toolkit.initData
  );

  useEffect(() => {
    console.log(retrieveLaunchParams().initDataRaw);

    if (initData && !initDataStore && initDataRaw) {
      dispatch && dispatch(setInitData(initData));
      getToken();
      getUserStatus();
    }
  }, [initData, dispatch, initDataRaw]);

  const getToken = async () => {
    try {
      if (initDataRaw) {
        const data = await fetchToken(initDataRaw);
        const token = data.body;
        dispatch(setToken(token));
      }
    } catch (error) {
      console.error("Failed to fetch token:", error);
    }
  };
  const getUserStatus = async () => {
    if (!token) return;
    try {
      const response = await axios.postCheckUserStatus({
        config: {
          headers: { Authorization: token }
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error("Failed to check user status:", error);
    }
  };

  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
};

export default App;
