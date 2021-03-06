const { Notification, User } = require("../models");
const { userSelect } = require("./service.constants")

const setNotification = async (notificationBody) => {

    const notificationCreate = await new Notification({
        ...notificationBody
    })

    const err = await notificationCreate.validateSync();
    if(!err) {
        const notificationDetails = await notificationCreate.save()

        const notifyUserDetails = await User.findByIdAndUpdate(notificationBody.notify, {
            $push: {
                notifications: notificationDetails._id
            }
        },{ 
            new: true,
            runValidators: true,
        } ).select(userSelect)
        const triggeredByUserDetails = await User.findById(notificationBody.triggeredBy , userSelect )

        return ({notificationDetails, notifyUserDetails, triggeredByUserDetails})
    } else {
        throw Error("Bad Notification Request") 
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