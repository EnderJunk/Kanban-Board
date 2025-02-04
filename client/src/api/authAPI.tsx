import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO:done make a POST request to the login route
  // Sending user creds to BE
  // await for a response with status and data (token)
  try {
    // Response should contain the status and the data we send to the FE
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // application/json = json string
      },
      body: JSON.stringify(userInfo), // Sending back the credentials. Stringified (converted into string)
    });

    const data = await response.json();

    if (!response.ok) {
      // Handles bad responses (400, 500)
      throw new Error("Credentials inccorect");
    }

    return data;
  } catch (err) {
    // FE fetch errors
    console.log("Error logging in: ", err);
    return Promise.reject("Could not get user");
  }
};

// POST = CREATE

export { login };
