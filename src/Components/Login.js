import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FormLayout, TextField } from "@shopify/polaris";
import { Button } from "@shopify/polaris";
import { Card } from "@shopify/polaris";
import { Text } from "@shopify/polaris";
function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [user1, setUser1] = useState({});
  const [session, setSession] = useState("");
  const authenticateLogin = (event) => {
    event.preventDefault();
    fetch(
      `https://fbapi.sellernext.com/user/login?username=${user.userName}&&password=${user.password}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          sessionStorage.setItem(`token`, data.data.token);
          setSession(data.data.token);
          setUser1(data);
          navigate("/login_true");
        } else {
          alert("Kindly enter correct user credentials");
        }
      }, []);
  };
  const handleClearButtonClick = useCallback(() => setUser(""), []);
  return (
    <>
      <div className="containerDiv">
        <Card sectioned>
          <Text variant="heading2xl" as="h1">
            Login Authentication
          </Text>
          <FormLayout>
            <TextField
              label="User Name"
              value={user.userName ?? ""}
              onChange={(value) => setUser({ ...user, userName: value })}
              autoComplete="off"
              requiredIndicator
              clearButton
              onClearButtonClick={handleClearButtonClick}
            />
            <TextField
              type="password"
              label="Password"
              value={user.password ?? ""}
              onChange={(value) => setUser({ ...user, password: value })}
              autoComplete="email"
              requiredIndicator
              clearButton
              onClearButtonClick={handleClearButtonClick}
            />
            <Button primary onClick={authenticateLogin}>
              Log In user
            </Button>
          </FormLayout>
        </Card>
      </div>
    </>
  );
}

export default Login;
