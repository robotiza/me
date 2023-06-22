Creating a Twitter poll using Node.js requires integrating with the Twitter API. Here's an overview of the steps involved:

1. Set up a Twitter Developer Account: To access the Twitter API, you'll need to create a Twitter Developer Account and create a new Twitter App. This will provide you with the necessary API keys and access tokens.

2. Install Required Dependencies: In your Node.js project, install the twitter package using npm or yarn. This package allows you to interact with the Twitter API. Run the following command to install it:

```bash
npm install twitter
```

3. Configure Twitter API Credentials: Store your Twitter API credentials securely in a configuration file or environment variables. Retrieve the consumer key, consumer secret, access token, and access token secret from your Twitter Developer Account.

4. Set Up Twitter Client: In your Node.js code, set up the Twitter client using the credentials you obtained:

```javascript
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  access_token_key: 'YOUR_ACCESS_TOKEN_KEY',
  access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET'
});
```

5. Create a Twitter Poll: Use the Twitter API's post method to create a poll tweet:

```javascript
const params = {
  status: 'My poll question?',
  poll_options: ['Option A', 'Option B', 'Option C'] // Maximum of four options
};

client.post('statuses/update', params, (error, tweet, response) => {
  if (!error) {
    console.log('Poll created successfully!');
  } else {
    console.error(error);
  }
});
```

Customize the status parameter with your poll question and provide an array of options in the poll_options parameter. Note that Twitter allows a maximum of four options for a poll.

6. Handle the API response: The callback function in the client.post method handles the response from the Twitter API. You can use it to check for errors or obtain information about the created tweet.

Make sure to handle error scenarios gracefully and follow the Twitter API usage guidelines and rate limits.

Remember to consult the official Twitter API documentation for detailed information on endpoint specifications, parameters, and any recent updates: https://developer.twitter.com/en/docs/api-reference-index