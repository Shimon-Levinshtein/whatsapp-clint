const { socket } = require("./socketConnection");

exports.loadWhatsAppData = (userId, props) => {

    socket.emit(`request_contacts_id:${userId}`);
    socket.on(`response_contacts_id:${userId}`, data => {
        props.updateContacts(data.contacts);
    });
    socket.emit(`request_chats_id:${userId}`);
    socket.on(`response_chats_id:${userId}`, data => {
        props.updateChats(data.chats);
    });
    socket.on(`response_chats_by_chatId_id:${userId}`, data => {
        props.updateSingleChat(data);
    });
    socket.on(`response_event_ended_id:${userId}`, data => {
        switch (data.type) {
            case 'messageByDate':
                props.deleteEventLocal(data.eventId);
                break;
            default:
                break;
        }
    });
};