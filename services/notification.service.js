const { Notification } = require("../models");

const setNotification = async ({
    triggeredBy,
    notify,
    notificationMessage,
    projectId,
    notificationType,
}) => {

    const notification = await new Notification({
        triggeredBy,
        notify,
        notificationMessage,
        projectId, 
        notificationType,
    }).save();
    return notification
}

const readNotificationService = async ({ notificationId,  userId }) => {
    const notification = await Notification.findOneAndUpdate({ 
        _id: notificationId, 
        notify: userId
    }, {
        isRead: true, 
        date_read: Date.now()
    }, { new: true })

    return notification;
}

module.exports = {
    setNotification,
    readNotificationService
}