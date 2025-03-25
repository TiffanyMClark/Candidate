const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    // console.log(import.meta.env);
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
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      console.error("GitHub API Error:", response.status);
      throw new Error(`GitHub API Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
};

export { searchGithub, searchGithubUser };
