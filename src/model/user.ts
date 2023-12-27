import mongoose from "mongoose";
interface User {
    name: string;
    sign: string;
    socketId: string;
}
const user = new mongoose.Schema<User>({
    name: String,
    sign: String,
    socketId: String,
});
user.set("timestamps", true);
export default mongoose.model<User>("userinfo", user);
