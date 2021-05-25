const dotenv = require('dotenv')
const Twitter = require('twitter')
const fetch = require("node-fetch")

dotenv.config({path: './config.env'});

const twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

const newVerseToday = async () => {
    const dayAgo = new Date(new Date().getTime()- 1000 * 60 * 60 * 24).toISOString();

    try{
        

       const response = await fetch(`https://beta.ourmanna.com/api/v1/get/?format=text${dayAgo}`
       

       )
       const text = await response.text();

     
        
       return text;


    } catch (error){
        console.log(error)
    }
};
const shareVerse = async () => {
    const newVerse = await newVerseToday()

    if(newVerse) {
        twitterClient.post(
            'statuses/update', 
            {
                status: `${newVerse}`,
            },
            function (error, tweet, response){
                if(!error) {
                    console.log(tweet)
                }
                if(error){
                    console.log(error)
                }
            }
        )
    }
}

shareVerse();

setInterval(shareVerse, 1000 * 60 * 60 * 24) // Share every hour
