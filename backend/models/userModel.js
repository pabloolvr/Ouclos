import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        cpf: {type: String, required: true, unique: true},
        birthdate: { type: Date, required: true},
        address: { type: String},
        phone: { type: String},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model('User', userSchema);

export default User;