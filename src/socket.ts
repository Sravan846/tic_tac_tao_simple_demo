import global from "./global";
import logger from "./logger";
import gameSchema from "./model/game";
import userSchema from "./model/user";
import rows from "./rows";
 const gameData = async (io: any, socket: any) => {
  socket.on("startGame", async (data: any) => {
    try {
      const { name, socketId } = data;
      let findGame = await gameSchema.find({ maxPlayerLength: { $lt: 2 } });
      if (findGame.length > 0) {
        let newUser = await userSchema.create({ name, socketId, sign: "O" });
        let getPlayers:any=await gameSchema.findOneAndUpdate({maxPlayerLength:1},{maxPlayerLength:2,activePlayerLength:2,$push:{playerInfo:newUser}},{new:true})
        let id = [getPlayers.playerInfo[0].socketId, getPlayers.playerInfo[1].socketId]
        global.publisher.publish("Game",JSON.stringify({event:"start",message:"Game is started",id}))
      } else {
        let newUser = await userSchema.create({ name, socketId, sign: "X" });
        await gameSchema.create({activePlayerLength:1,maxPlayerLength:1,winnerId:"",playerInfo:newUser})
      }
    } catch (error:any) {
      logger.error(`Error : ${error.message}`)
    }
  });
  socket.on("butt",async(data:any)=>{
    try {
      let request=data.split(":")
      let findSocket: any = await gameSchema.find({ "playerInfo.socketId": request[0] })
      if (request[0] == findSocket[0].playerInfo[0].socketId)
      {
        let play1 = await gameSchema.findByIdAndUpdate(findSocket[0].id, { $push: { player1: request[1], allPlayer: request[1] } }, { new: true })
        let id = [findSocket[0].playerInfo[0].socketId, findSocket[0].playerInfo[1].socketId]
        global.publisher.publish("Game", JSON.stringify({ event: "butt1", message: request[1], id }))
        if(play1)
        {
          global.publisher.publish("Game", JSON.stringify({ event: "butt12All", message: { butt: request[1], allButt: play1.allPlayer }, id: [findSocket[0].playerInfo[1].socketId] }))
          if (rows.includes(play1.player1.sort().join(""))){
            await gameSchema.findByIdAndUpdate(play1.id, { winnerId: play1.playerInfo[0]._id }, { new: true })
            global.publisher.publish("Game", JSON.stringify({ event: "winner", message: `Name : ${play1.playerInfo[0].name} win the game`, id }))
          }
        }
      }
      if (request[0] == findSocket[0].playerInfo[1].socketId){
        let play2 = await gameSchema.findByIdAndUpdate(findSocket[0].id, { $push: { player2: request[1], allPlayer: request[1] } }, { new: true })
        let id = [findSocket[0].playerInfo[0].socketId, findSocket[0].playerInfo[1].socketId]
        global.publisher.publish("Game", JSON.stringify({ event: "butt2", message: request[1], id }))
        if (play2) {
          global.publisher.publish("Game", JSON.stringify({ event: "butt21All", message: { butt: request[1], allButt: play2.allPlayer }, id: [findSocket[0].playerInfo[0].socketId] }))
          if (rows.includes(play2.player2.sort().join(""))) {
            await gameSchema.findByIdAndUpdate(play2.id, { winnerId: play2.playerInfo[1]._id }, { new: true })
            global.publisher.publish("Game", JSON.stringify({ event: "winner", message: `Name : ${play2.playerInfo[1].name} win the game`, id }))
          }
        }
      }
    } catch (error:any) {
      logger.error(`Error : ${error.message}`)
    }
  })
  socket.on("disconnect", () => {
    try {
      logger.info(`Disconnected : socket.id`);
    } catch (error:any) {
      logger.error(`Error : ${error.message}`)
    }
  });
};
export {gameData}
