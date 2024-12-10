// This file contains the API calls to the Github API
// The searchGithub function fetches a random list of Github users ,
//  Generates a random number between 1 and 100000000 and uses it as the start parameter in the API call which returns a list of Github users

const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;

    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error("invalid API response, check the network tab");
    }
    return data;
  } catch (err) {
    console.log("an error occurred", err);
    return [];
  }
};
// The searchGithubUser function fetches a specific Github user based on the username provided as a parameter from the first API call
const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("invalid API response, check the network tab");
    }
    return data;
  } catch (err) {
    return {};
  }
};

export { searchGithub, searchGithubUser };
