import User from '@/lib/models/User';

export const userAJSON = {
    _id: 'user:1234567890',
    _rev: '7-8596f70bd9ed85a3e133af283838f191',
    pin: '1234',
    name: 'Jane Doe',
};

export const userA = new User(
    userAJSON._id,
    userAJSON._rev,
    userAJSON.pin,
    userAJSON.name,
);

export const userBJSON = {
    _id: 'user:0987654321',
    _rev: '5-8596f70bd9ed85a3e133af283838f191',
    pin: '4321',
    name: 'John Doe',
};

export const userB = new User(
    userBJSON._id,
    userBJSON._rev,
    userBJSON.pin,
    userBJSON.name,
);

export const SerializedUserA = userAJSON;
export const SerializedUserB = userBJSON;
