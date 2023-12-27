import mongoose from "mongoose";
interface Game {
  playerInfo: Array<any>;
  player1: Array<any>;
  player2: Array<any>;
  allPlayer: Array<any>;
  winnerId: string;
  maxPlayerLength: Number;
  activePlayerLength: Number;
}
const user = new mongoose.Schema<Game>({
  playerInfo: Array,
  player1: Array,
  player2: Array,
  allPlayer: Array,
  winnerId: String,
  maxPlayerLength: Number,
  activePlayerLength: Number,
});
user.set("timestamps", true);
export default mongoose.model<Game>("gameinfo", user);
