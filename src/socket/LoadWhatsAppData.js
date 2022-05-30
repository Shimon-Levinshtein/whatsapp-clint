const { socket } = require("./socketConnection");

exports.loadWhatsAppData = (userId, props) => {

    socket.emit(`request_contacts_id:${userId}`);
    socket.on(`response_contacts_id:${userId}`, data => {
        props.updateContacts(data.contacts);
    });
    socket.on(`response_event_ended_id:${userId}`, data => {
        props.deleteEventLocal(data.eventId);
    });
};