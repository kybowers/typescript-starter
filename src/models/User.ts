import Bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export type UserDocument = mongoose.Document & {
    username: string;
    password: string;
};

type comparePasswordFunction = (
    candidatePassword: string,
    cb: (err: any, isMatch: any) => {}
) => void;

export interface AuthToken {
    accessToken: string;
    kind: string;
}

const userSchema = new mongoose.Schema(
    {
        username: { type: String, unique: true },
        password: String,
    },
    { timestamps: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
    const user = this as UserDocument;
    if (!user.isModified('password')) {
        return next();
    }
    user.password = Bcrypt.hashSync(user.password, 10);
    next();
});

const comparePassword: comparePasswordFunction = function (
    candidatePassword,
    cb
) {
    cb(null, Bcrypt.compareSync(candidatePassword, this.password));
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>('User', userSchema);
