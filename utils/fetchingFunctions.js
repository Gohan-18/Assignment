import {
  addData,
  addUser,
  setAuthentication,
} from "@/store/setUser-slice";
import store from "@/store/store";
import axios from "axios";


axios.defaults.withCredentials = true;

export const logInUser = async (email, router, setError) => {

    console.log(email);

  // const data = await fetch("http://172.232.70.228:8080/api/gql", {
  //   method: 'POST',
  //   headers: {"Content-Type": 'application/json'},
  //   body: JSON.stringify({
  //     query: `
  //     mutation{
  //       generateOTP(input:{
  //         email : "superadmin@example.com"
  //       })
  //     }
  //     `
  //   })
  // })

  // const result = await data.json()
  // const jsonData = await data.json();

  try {
    const response = await fetch("http://172.232.70.228:8080/api/gql", {
      method: 'POST',
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify({
        query: `
        mutation{
          generateOTP(input:{
            email : "superadmin@example.com"
          })
        }
        `
      })
    })
    console.log(response)

    const data = await response.json()
    console.log(data);

  //   // if (data.message === "success") {
  //   //   store.dispatch(setAuthentication());
  //   // }

  //   // await setLoginUser(setError)
  //   //   .then((data) => store.dispatch(addUser(data)))
  //   //   .then(() => {
  //   //     router.push("/profile");
  //   //   })
  //   //   .catch((error) => {
  //   //     // console.log(error);
  //   //     setError(true);
  //   //     setTimeout(() => setError(false), 2000);
  //   //   });
  } catch (error) {
    console.log(error);
    setError(true);
    setTimeout(() => setError(false), 2000);
  }
};

export const setLoginUser = async (setError) => {
  try {
    const { data } = await axios.get(
      `https://frontendtestapi.staging.fastjobs.io/auth/me`
    );
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    setError(true);
    setTimeout(() => setError(false), 2000);
  }
};

export const fetchData = async () => {
  try {
    const { data } = await axios.get(
      `https://frontendtestapi.staging.fastjobs.io/data`
    );
    // console.log(data);
    // return data;
    store.dispatch(addData(data));
  } catch (error) {
    alert(error);
  }
};
