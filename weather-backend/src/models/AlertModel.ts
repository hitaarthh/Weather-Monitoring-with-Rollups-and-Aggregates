import mongoose, { Schema, Document } from 'mongoose';

export interface IAlert extends Document {
    city: string;
    message: string;
    timestamp: Date;
}

const AlertSchema: Schema = new Schema({
    city: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Alert = mongoose.model<IAlert>('Alert', AlertSchema);
export default Alert;
