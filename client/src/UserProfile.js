import { React } from "react";
import useAuth from "./useAuth";
import Logout from "./Logout";
import "./Login.scss";
import "./Logout.scss"
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";

export default function UserProfile({ code }) {
  const { accessToken, setAccessToken, username } = useAuth(code);
  return (
    <Menu>
      <MenuButton
      
        className="login-button"
        as={Button}
        rightIcon={<TriangleDownIcon w={10} h={10} />}
      >
        {username}
      </MenuButton>
      <MenuList >
        <MenuItem className="logout-menu">
          <Logout
            code={code}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
