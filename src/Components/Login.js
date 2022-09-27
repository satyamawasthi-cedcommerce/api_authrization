import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  var j = 1;
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
          sessionStorage.setItem(`token ${j++}`, data.data.token);
          setSession(sessionStorage);
          setUser1(data);
          navigate("/login_true");
        } else {
          console.log("error");
        }
      }, []);

    console.log(user1.success);
  };

  return (
    <>
      <div className="containerDiv">
        <form onSubmit={authenticateLogin}>
          <label htmlFor="UserName">UserName</label>
          <br />
          <input
            type="text"
            placeholder="Enter UserName"
            onChange={(event) =>
              setUser({ ...user, userName: event.target.value })
            }
            required
          />
          <br />
          <lable htmlFor="PassWord">Password</lable>
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
            required
          />
          <br />
          <input type="submit" value="Register" />
        </form>
      </div>
    </>
  );
}

export default Login;
