const prisma = require('../lib/prismadb');
const bcrypt = require('bcrypt');

async function create(data) {
    data.password = await bcrypt.hash(data.password, 12);
    data.avatar = "";
    delete data.pasword_confirmation;
    try {
        const newUser = await prisma.user.create({
            data
        })
        return newUser
    } catch (error) {
        throw new Error('Email already taken');
    }
}

async function login(data) {
    const user = await prisma.user.findUnique({
        where: {email: data.email }
    })

    if (!user) {
        return null
    }
    const compare = await bcrypt.compare(data.password, user.password);
    if (!compare) {
        return null
    }
    return user;
}

const getUserById =async (id) => {
    const user = await prisma.user.findUnique({
        where: {id: +id}
    })
    if (!user) {
        return null
    }
    return user
}

module.exports = { create, login,getUserById }