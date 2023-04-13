import {
  addData,
  addUser,
  setAuthentication,
} from "@/store/setUser-slice";
import store from "@/store/store";
import axios from "axios";


axios.defaults.withCredentials = true;

export const logInUser = async (email, router, setError, setOtp) => {
  console.log(email)

  try {
    const response = await fetch("http://172.232.70.228:8080/api/gql/query", {
      method: 'POST',
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify({
        query: `
        mutation{
          generateOTP(input:{
            email : "${email}"
          })
        }
        `
      })
    })
    console.log(response)

    const data = await response.json()
    alert(`Your OTP is : ${data.data.generateOTP}`);
    setOtp(data.data.generateOTP)

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

const handleLogin = async () => {
  try {
    const response = await axios.post("http://172.232.70.228:8080/api/gql/query", {
      query: `
        mutation {
          login(input: {
            email: "${email}", 
            phone: "${phone}",
            otp: "${otp}"
          })
        }
      `,
    });

    // Handle the response and store the token in localStorage or a global state management library
    const { success, token } = response.data.data.login;
    if (success) {
      console.log('Logged in with token:', token);
      // Redirect to the listing page
      // e.g., Router.push('/users');
    } else {
      console.error('Failed to login:', response.data.errors);
    }
  } catch (err) {
    console.error('Failed to login:', err);
  }
};