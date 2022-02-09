import React from 'react';
import { createContext, useState } from "react";
import {
  getTokenFor,
  loginAuth,
  registerAuth,
  save,
} from "./authentication.service";

export const AuthenticationContext = createContext({});

export const AuthenticationContextProvider = ({ children }: any) => {
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [aToken, setAToken] = useState("");

  const getToken = (token: string) => {
    getTokenFor(token);
  };

  const onAuthLogin = (loginData: any) => {
    return new Promise<void>(async (resolve, reject) => {
      const stringData = JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      });
      loginAuth(stringData)
        .then(async (res: any) => {

          await save("aToken", res.data.access_tokens);
          await save("rToken", res.data.refresh_tokens);

          getToken(aToken);
          setIsAuthentication(true);
          resolve();
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  const onAuthRegister = (registerData: any) => {
    return new Promise<void>(async (resolve, reject) => {
      const stringData = JSON.stringify({
        email: registerData.email,
        password: registerData.password,
        retypedPasswords: registerData.retypedPasswords,
      });
      registerAuth(stringData)
        .then(() => {
          resolve();
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        onAuthLogin,
        onAuthRegister,
        isAuthentication,
        getToken,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
