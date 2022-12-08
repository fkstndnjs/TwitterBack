import * as userRepository from "../user/user.repository.js";

let tweets = [
    {
        createdAt: new Date().toLocaleString(),
        id: 1,
        text: "Hello",
        userId: 1,
    },
];

export const getAllTweets = async () => {
    return Promise.all(
        tweets.map(async (tweet) => {
            const { username, name } = await userRepository.findById(
                tweet.userId
            );

            return { ...tweet, username, name };
        })
    );
};

export const getAllTweetsByUsername = async (username) => {
    return getAllTweets().then((tweets) =>
        tweets.filter((tweet) => tweet.username === username)
    );
};

export const getTweetById = async (id) => {
    const tweet = tweets.find((tweet) => `${tweet.id}` === id);
    const { username, name } = userRepository.findById(tweet.userId);

    return { ...tweet, username, name };
};

export const createTweet = async (text, userId) => {
    const newTweet = {
        id: (tweets[0]?.id || 0) + 1,
        createdAt: Date.now().toLocaleString(),
        text,
        userId,
    };

    tweets = [newTweet, ...tweets];

    return tweets;
};

export const updateTweet = async (id, text) => {
    const tweet = tweets.find((tweet) => `${tweet.id}` === id);

    if (tweet) {
        tweet.text = text;
    }

    return tweet;
};

export const deleteTweet = async (id) => {
    const prevLength = tweets.length;

    tweets = tweets.filter((tweet) => `${tweet.id}` !== id);

    return prevLength !== tweets.length;
};
