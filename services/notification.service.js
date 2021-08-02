const { Notification, User } = require("../models");
const { userSelect } = require("./service.constants")

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
    })
    const err = await notification.validateSync();
    if(!err) {
        await notification.save()

        await User.findByIdAndUpdate(notify, {
            $push: {
                notifications: notification._id
            }
        } )

        const notificationFetch = await Notification.find( { _id: notification?.id})
                .populate({
                    path: "triggeredBy",
                    select: userSelect
                })
                .populate({
                    path: "notify",
                    select: userSelect
                })
                
        return notificationFetch
    } else {
        return err
    }
    // node mailer 
}

const readNotificationService = async ({ notificationId,  userId }) => {
    const notification = await Notification.findOneAndUpdate({ 
        _id: notificationId, 
        notify: userId
    }, {
        isRead: true, 
        updatedAt: Date.now()
    }, { new: true })

    return notification;
}

module.exports = {
    setNotification,
    readNotificationService
}