/** @format */
import React from "react";
import {
  tether,
  TextInput,
  PasswordInput,
  Container,
  Heading,
  Button,
} from "@triframe/designer";
import { HelperText, Surface } from "@triframe/designer/dist/paper";
import { black, purple100 } from "@triframe/designer/dist/paper/styles/colors";

export const Login = tether(function* ({ Api, redirect }) {
  const { User } = Api;

  const form = yield {
    user: "",
    password: "",
    errorMessage: null,
  };

  return (
    <Container
      style={{ backgroundColor: "#e3f3e8", padding: "20px", height: "90vh" }}
    >
      <Container
        style={{
          marginTop: "15%",
          marginBottom: "10%",
          width: "30%",
          position: "relative",
          marginLeft: "36%",
          marginRight: "50%",
        }}
      >
        <Surface style={{ padding: "20px", display: "flex" }}>
          <Heading
            size="large"
            style={{ backgroundColor: "#00dbc4", padding: "10px" }}
          >
            Login
          </Heading>
        </Surface>
        <TextInput
          label="name"
          value={form.name}
          onChange={(value) => (form.name = value)}
          style={{ marginTop: "20px" }}
          sm={true}
        />
        <PasswordInput
          label="Password"
          value={form.password}
          onChange={(value) => (form.password = value)}
        />
        <Button
          style={{
            backgroundColor: "#00dbc4",
            shadow: "black",
            hoverEffect: "black",
          }}
          onPress={async () => {
            try {
              await User.login(form.name, form.password);
              redirect("/");
            } catch (error) {
              form.errorMessage = error.message;
            }
          }}
        >
          Login
        </Button>
      <HelperText type="error" visible={form.errorMessage !== null}>
        {form.errorMessage}
      </HelperText>
      </Container>
    </Container>
  );
});