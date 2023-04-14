import { addData, addUser, setAuthentication } from "@/store/setUser-slice";
import store from "@/store/store";

export const getOTP = async (email, setError, setOtp) => {
  try {
    const response = await fetch("http://172.232.70.228:8080/api/gql/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation{
          generateOTP(input:{
            email : "${email}"
          })
        }
        `,
      }),
    });

    const data = await response.json();
    alert(`Your OTP is : ${data.data.generateOTP}`);
    setOtp(data.data.generateOTP);
  } catch (error) {
    console.log(error);
    setError(true);
    setTimeout(() => setError(false), 2000);
  }
};

export const handleLogin = async (email, otp, router, setError) => {

  if(otp.length !== 5) {
    setError(true);
    setTimeout(() => setError(false), 2000);
  }
  else {
    try {
      const response = await fetch("http://172.232.70.228:8080/api/gql/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          mutation {
            login(input: {
              email : "${email}",
              otp : "${otp}"
            }),{
              id,
              name,
              isAdmin,
              orgUID,
              roleID,
              sessionToken
            }
          }
        `,
        }),
      });

      const { data } = await response.json();

      if(data === null) {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
      else {
        store.dispatch(addUser(data?.login))
  
        if(data?.login?.sessionToken) {
          store.dispatch(setAuthentication());
          await fetchData(data?.login?.sessionToken, router)
        }
      }
  
      // store.dispatch(addUser(data?.login))
  
      // if(data?.login?.sessionToken) {
      //   store.dispatch(setAuthentication());
      //   await fetchData(data?.login?.sessionToken, router)
      // }
    } catch (err) {
      console.error("Failed to login:", err);
    }
  }

 
};

export const fetchData = async (sessionToken, router) => {
  try {
    const response = await fetch("http://172.232.70.228:8080/api/gql/query", {
      method: "POST",
      headers: {
        "Authorization": `${sessionToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            users(search: {
              filter: All, 
              sortBy: DateCreated, 
              sortDir: Ascending, 
              offset: 0, 
              limit: 10
            }){
              users{
                id,
                firstName,
                lastName, 
                email, 
                phone,
                isFinal, 
                isArchived,
                createdAt,
                updatedAt
              },
              total
            }
          }
        `,
      }),
    });

    const { data } = await response.json()

    const userData = data?.users?.users;
    if(userData.length) {
      store.dispatch(addData(userData));
      router.push('/profile')
    }

  } catch (error) {
    alert(error);
  }
};
