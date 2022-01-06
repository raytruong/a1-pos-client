import User from '@/lib/models/User';

export const userAJSON = {
    _id: 'user:1031448183',
    _rev: '3-rq290b2sjwgcwrm11ouc21wjuebl0lzj',
    pin: '9494',
    name: 'Jane Doe',
};

export const userBJSON = {
    _id: 'user:1051090379',
    _rev: '7-1ytd74mdaqx5cs7pb45z9evdtf5fwgvl',
    pin: '2321',
    name: 'John Doe',
};

export const userAInstance = new User(
    userAJSON._id,
    userAJSON._rev,
    userAJSON.pin,
    userAJSON.name,
);

export const userBInstance = new User(
    userBJSON._id,
    userBJSON._rev,
    userBJSON.pin,
    userBJSON.name,
);
