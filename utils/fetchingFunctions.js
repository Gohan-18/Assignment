import { addData, addUser, setAuthentication } from "@/store/setUser-slice";
import store from "@/store/store";
import axios from "axios";

// query {
// 	users(search: {
//     filter: All
//   }){
//     users{id,firstName,lastName, email, phone,isFinal, isArchived,createdAt,updatedAt},
//     total
//   }
// }

// const search = {
//   search: "",    // Update with the appropriate search value
//   filter: "ALL", // Update with the appropriate filter value
//   sortBy: "ALPHABETICAL" // Update with the appropriate sortBy value
// };

// const roleID = "your_role_id"; // Replace with the actual role ID value

// // Define your GraphQL query
const query = `
  query {
    users(search: {
      filter: All
    }){
      users{id,firstName,lastName, email, phone,isFinal, isArchived,createdAt,updatedAt},
      total
    }
  }
`;

// // Set the variables for the query
// const variables = {
//   search,
//   roleID
// };

// // Make a GraphQL request using the Fetch API
// fetch("https://api.example.com/graphql", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     query,
//     variables
//   })
// })
// .then(response => {
//   // Check if the response was successful
//   if (response.ok) {
//     // Parse the response data as JSON
//     return response.json();
//   } else {
//     // Handle the error response
//     throw new Error(`API request failed with status code ${response.status}`);
//   }
// })
// .then(data => {
//   // Process the response data
//   console.log(data);
// })
// .catch(error => {
//   // Handle any errors that occurred during the GraphQL request
//   console.error(error);
// });

// axios.defaults.withCredentials = true;

export const getOTP = async (email, router, setError, setOtp) => {
  console.log(email);

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
    console.log(response);

    const data = await response.json();
    alert(`Your OTP is : ${data.data.generateOTP}`);
    setOtp(data.data.generateOTP);
  } catch (error) {
    console.log(error);
    setError(true);
    setTimeout(() => setError(false), 2000);
  }
};

export const handleLogin = async (email, otp, router) => {
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
    // console.log(response)
    const { data } = await response.json();

    // console.log(data?.login);
    store.dispatch(addUser(data?.login))

    if(data?.login?.sessionToken) {
      store.dispatch(setAuthentication());
      await fetchData(data?.login?.sessionToken, router)
    }
  } catch (err) {
    console.error("Failed to login:", err);
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
    console.log(error);
  }
};
