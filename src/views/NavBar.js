/** @format */

import React from "react";
import {
  tether,
  Section,
  Drawer,
  TextInput,
  List,
  Modal,
  Container,
  Heading,
  Button,
  Subheading,
  Appbar,
} from "@triframe/designer";

export const NavBar = tether(function* ({ Api, redirect }) {
  const { User } = Api;
  const currentUser = yield User.current();

  let handleLogout = async () => {
    try {
      await redirect("/");
      await User.logout();
    } catch (error) {
      console.log(error);
    }
  };
  const modalView = yield {
    visible: false,
  };

  // this wont exist until we have a place to enter what company 
  // we want on the creat-a-review page
  // const handleCreateReview = () => {
  //   if (user !== null) {
  //     redirect(`/create-review/${id}`);
  //   } else {
  //     modalView.visible = true;
  //     console.log(modalView.visible);
  //   }
  // };

  return (
    <Appbar style={{ backgroundColor: "black" }}>
      <Button
        style={{ backgroundColor: "black" }}
        onPress={async () => await redirect("/")}
      >
        Home
      </Button>
      {currentUser === null ? (
        <Button
          style={{ backgroundColor: "black" }}
          onPress={async () => await redirect("/login")}
        >
          Login
        </Button>
      ) : (
        <Button style={{ backgroundColor: "black" }} onPress={handleLogout}>
          Log Out
        </Button>
      )}
      {currentUser === null ? (
        <Button
          style={{ backgroundColor: "black" }}
          onPress={async () => await redirect("/sign-up")}
        >
          Sign Up
        </Button>
      ) : (
        <Button
          style={{ backgroundColor: "black" }}
          onPress={async () => await redirect(`/list/${currentUser.id}`)}
        >
          {currentUser.name}
        </Button>
      )}
    </Appbar>
  );
});
