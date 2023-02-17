module.exports = (io, socket) => {
    const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    socket.on("disconnectFromRoom", () => {
        socket.leave(roomId);
    });
}
