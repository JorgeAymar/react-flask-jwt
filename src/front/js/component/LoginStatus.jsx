// LoginStatus.jsx
import React from "react";

function LoginStatus(props) {
  const { isLoggedIn, username } = props;

  return (
    <div className="text-right">
      {isLoggedIn ? (
        <span>Login: {username}</span>
      ) : (
        <span>Login: Anonymous</span>
      )}
    </div>
  );
}

export default LoginStatus;
