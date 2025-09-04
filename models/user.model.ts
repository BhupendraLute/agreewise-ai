import bcrypt from "bcryptjs";
import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
	name?: string;
	email: string;
	password?: string;
	avatar?: string;
}

const UserSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: [true, "Email already exists"],
		},
		password: { type: String, default: "" },
		avatar: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

export const User = models.User || model<IUser>("User", UserSchema);

// password encryption with bcryptjs
UserSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		if (this.password)
			this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});
