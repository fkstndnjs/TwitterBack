let tweets = [
    {
        id: 1,
        createdAt: Date.now().toLocaleString(),
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

export const createTweet = ({ name, username, text }) => {
    const newTweet = {
        id: tweets[0].id + 1,
        createdAt: Date.now().toLocaleString(),
        name,
        username,
        text,
    };

    tweets = [newTweet, ...tweets];

    return tweets;
};

export const updateTweet = ({text})=>{
    const tweet = tweets.find((tweet) => tweet.id === id);

    tweet?.text = text

    return tweet;
}