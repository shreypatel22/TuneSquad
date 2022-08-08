import { useState, React, useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import Logout from "./Logout";
import "./Login.scss";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";

export default function UserProfile({ code }) {
  const { accessToken, setAccessToken, username, setUsername } = useAuth(code);
  return (
    <div>
      <Menu>
        <MenuButton
          className="login-button"
          as={Button}

          rightIcon={<TriangleDownIcon w={10} h={10} />}
        >
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
