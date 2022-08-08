import { useState, React, useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import Logout from "./Logout";
import "./Login.scss";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";

export default function UserProfile({ code }) {
  const { accessToken, setAccessToken } = useAuth(code);
  const [username, setUsername] = useState();
  //   useEffect(() => {
  //     const getMe = () => {
  //     axios
  //       .post("http://localhost:3001/user", { accessToken })
  //       .then((response) => {
  //         setUsername(response.data.name);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //       console.log(username, "!!!!!!!!!!!!!!!")
  //   };
  // }, [username]);

  const getMe = () => {
    axios
      .post("http://localhost:3001/user", { accessToken })
      .then((response) => {
        setUsername(response.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(username, "!!!!!!!!!!!!!!!");
  };

  return (
    <div>
      <Menu>
        <MenuButton className="login-button" as={Button} onClick={getMe}>
          {username}
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Logout
              code={code}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
            />
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
