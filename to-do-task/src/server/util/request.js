import axios from 'axios';
const rax = require('retry-axios');
const interceptorId = rax.attach();


const getConfig = (config = {}) => {
    config.url = ('http://localhost:9000/api' || '/api') + (config.url || '');
    return config;
};

const request = async (config = {}) => {
    try {
        const {data} = await axios(getConfig(config),{
            raxConfig: {
                // Retry 5 times on requests that return a response (500, etc) before giving up.
                retry: 5,
                retryDelay: 0,
                // Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
                noResponseRetries: 2,

                // HTTP methods to automatically retry.
                httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT', 'POST'],

                // The response status codes to retry.  Supports a double
                // array with a list of ranges.
                statusCodesToRetry: [[100, 199], [400, 404], [500, 599]],

            }
        });
        return data;
    } catch (error) {
        throw error;
    }
};


export default request;
