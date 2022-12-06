let tweets = [
    {
        id: "1",
        createdAt: "2022-12-01",
        name: "SeokHyun Yu",
        username: "ysh",
        text: "Hello",
    },
];

export const getAllTweets = () => {
    return tweets;
};

export const getAllTweetsByUsername = (username) => {
    return tweets.filter((tweet) => tweet.username === username);
};

export const getTweetById = (id) => {
    return tweets.find((tweet) => tweet.id === id);
};
