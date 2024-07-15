import * as axios from "@/api/axios/requests/";
import { selectToken } from "@/store/selectors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from "./AdminPage.module.scss";
import Container from "@/modules/Container/Container";
import Button from "@/modules/Button/Button";

const AdminPage = () => {
  const token = useSelector(selectToken);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  useEffect(() => {
    const fuck = async () => {
      try {
        const response = await axios.getUsers({
          config: {
            headers: { Authorization: `${token}` }
          }
        });
        console.log("Users response", response);
        if (response.status === 200) {
          setUsers(response.data.body);
        }
      } catch (error) {
        console.error("Error fetching users", error);
        alert(`Error fetching users${error}`);
      }
    };

    if (token) {
      fuck();
    }
  }, [token]);

  const handleBanToggle = async (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      const confirmationMessage =
        user.status === "banned"
          ? `Вы точно хотите разбанить ${
              user.username ? "@" + user.username : user.firstName
            }?`
          : `Вы точно хотите забанить ${
              user.username ? "@" + user.username : user.firstName
            }?`;
      if (window.confirm(confirmationMessage)) {
        try {
          if (user.status === "banned") {
            await axios.postUnbanUser({
              params: { userId: user.chatId },
              config: { headers: { Authorization: `${token}` } }
            });
          } else {
            await axios.postBanUser({
              params: { userId: user.chatId },
              config: { headers: { Authorization: `${token}` } }
            });
          }
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === id
                ? {
                    ...user,
                    status: user.status === "banned" ? "member" : "banned"
                  }
                : user
            )
          );
        } catch (error) {
          console.error(
            `Error ${user.status === "banned" ? "unbanning" : "banning"} user`,
            error
          );
          alert(
            `Error ${
              user.status === "banned" ? "unbanning" : "banning"
            } user: ${error}`
          );
        }
      }
    }
  };

  const handleFreezeToggle = async (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      const confirmationMessage =
        user.status === "freezed"
          ? `Вы точно хотите разморозить ${
              user.username ? "@" + user.username : user.firstName
            }?`
          : `Вы точно хотите заморозить ${
              user.username ? "@" + user.username : user.firstName
            }?`;
      if (window.confirm(confirmationMessage)) {
        try {
          if (user.status === "freezed") {
            await axios.postUnfreezeUser({
              params: { userId: user.chatId },
              config: { headers: { Authorization: `${token}` } }
            });
          } else {
            await axios.postFreezeUser({
              params: { userId: user.chatId },
              config: { headers: { Authorization: `${token}` } }
            });
          }
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === id
                ? {
                    ...user,
                    status: user.status === "freezed" ? "member" : "freezed"
                  }
                : user
            )
          );
        } catch (error) {
          console.error(
            `Error ${
              user.status === "freezed" ? "unfreezing" : "freezing"
            } user`,
            error
          );
          alert(
            `Error ${
              user.status === "freezed" ? "unfreezing" : "freezing"
            } user: ${error}`
          );
        }
      }
    }
  };

  const handleItem = (id: number) => {
    setSelectedUser(id);
  };
  return (
    <div>
      <div className={css.heading}>
        <h1 className={`${css.title}`}>Отчеты других участников</h1>
      </div>
      <Container>
        <ul className={`${css.list}`}>
          {users.map((user) => (
            <li
              className={`${css.user}`}
              key={user.id}
              onClick={() => handleItem(user.id)}
            >
              <span className={`${css.user_row}`}>
                <div>
                  {user.id} |{" "}
                  {user.username ? "@" + user.username : user.firstName}
                </div>
                <div>{user.status}</div>
              </span>
              {selectedUser === user.id && user.status !== "admin" && (
                <div className={`${css.user_actions}`}>
                  <Button
                    variant={"black"}
                    onClick={() => handleBanToggle(user.id)}
                    style={{ height: "40px" }}
                  >
                    {user.status === "banned" ? "Разбанить" : "Забанить"}
                  </Button>
                  <Button
                    variant={"black"}
                    onClick={() => handleFreezeToggle(user.id)}
                    style={{ height: "40px" }}
                  >
                    {user.status === "freezed" ? "Разморозить" : "Заморозить"}
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default AdminPage;
