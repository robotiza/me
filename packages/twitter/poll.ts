import client from './client';

const params = {
    status: 'My poll question?',
    poll_options: ['Option A', 'Option B', 'Option C'] // Maximum of four options
};

const poll = () =>
    client.post('statuses/update', params, (error, tweet, response) => {
        if (!error) {
            console.log('Poll created successfully!', response.statusMessage, tweet);
        } else {
            console.error(error);
        }
    });

export default poll;