import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'senderModel',
        required: true
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['User', 'Doctor']
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'receiverModel',
        required: true
    },
    receiverModel: {
        type: String,
        required: true,
        enum: ['User', 'Doctor']
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

export default Message;

































