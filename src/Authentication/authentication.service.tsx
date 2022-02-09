import { instance } from "..";
import * as SecureStore from 'expo-secure-store';

export const getTokenFor = async (key: any): Promise<any> => {
    let res = await SecureStore.getItemAsync(key);
    if (res) {
        return res
}

export const save = async (key: any, value: any): Promise<any> => {
    await SecureStore.setItemAsync(key, value)
}

export const loginAuth = (authLogin: any) => {
  return new Promise(async (resolve, reject) => {
    await instance
      .post("login", authLogin)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const registerAuth = (authRegister: any) => {
  return new Promise(async (resolve, reject) => {
    await instance
      .post("register", authRegister)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
