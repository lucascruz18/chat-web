import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5050';

export const userId = uuidv4()

export const socket = io(URL, {
    query: {
        userId,
        name: 'Lucas',
        avatar: 'https://gravatar.com/avatar/7a5dc4644e274af020da6dd3f4e00dde?s=400&d=robohash&r=x',
        status: 'online',
        blocked: false,
        trainingId: '123'
    }
});