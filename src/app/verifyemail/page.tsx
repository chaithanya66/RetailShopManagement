"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <div>
        <h1>Verify the Email</h1>
        <h2>{token ? `${token}` : "no token"}</h2>

        {verified && (
          <div>
            <h2>Email Verified</h2>
            <Link href="/login">Login</Link>
          </div>
        )}

        {error && (
          <div>
            <h1>Error while verifying</h1>
          </div>
        )}
      </div>
    </>
  );
}
