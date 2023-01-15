module.exports = (io, socket, onlineUsers) => {
    const addNewUser = (name, socketId) => {
        !onlineUsers.some((user) => user.name === name) && onlineUsers.push({ name, socketId })
    }
    const getUser = (name) => {
        console.log(onlineUsers)
        console.log(onlineUsers.find((user) => user.name === name))
        return onlineUsers.find((user) => user.name === name)
    }
    const removeUser = (socketId) => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
    }
    socket.on("newUser", (userId) => {
        addNewUser(userId, socket.id)
    })
    socket.on("sendNotification", ({ senderName, receiverName, type }) => {
        const receiver = getUser(receiverName)
        if (receiver !== undefined) {
            io.to(receiver.socketId).emit("getNotification", {
                senderName, type
            })
        }
    })
    socket.on("sendMessage", ({ senderName, receiverName, type }) => {
        const receiver = getUser(receiverName)
        if (receiver !== undefined) {
            io.to(receiver.socketId).emit("getMessage", {
                senderName, type
            })
        }
    })
    socket.on("disconnect", () => {
        removeUser(socket.id)
    })
}