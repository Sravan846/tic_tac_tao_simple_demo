let socket = io();
$(document).ready(() => {
  $(".buttons").attr("disabled", true);
  $("#stgame").click(() => {
    var name = prompt("Enter your name");
    if (name) {
      $("#stgame").remove();
      $("#messages").html("Wating for the Players");
      socket.emit("startGame", { socketId: socket.id, name });
    } else {
      alert("Name not be empty");
    }
  });
  $(".buttons").click((e) => {
    let { id } = e.target;
    console.log("id", id);
    socket.emit("butt", `${socket.id}:${id}`);
  });
});
socket.on("start", (data) => {
  $("#messages").html(data);
  $(".buttons").attr("disabled", false);
});
socket.on("butt1",(data)=>{
  $(`#${data}`).html("X")
  $(`.buttons`).attr("disabled", true);
})
socket.on("butt12All",(data)=>{
  $(".buttons").attr("disabled", false);
  data.allButt.forEach(i => {
    $(`#${i}`).attr("disabled", true);
  });
})
socket.on("winner",(data)=>{
  $("#messages").html(data);
  $(".buttons").attr("disabled", true);
})

socket.on("butt2",(data)=>{
  debugger
  $(`#${data}`).html("O")
  $(`.buttons`).attr("disabled", true);
})
socket.on("butt21All",(data)=>{
  debugger
  $(".buttons").attr("disabled", false);
  data.allButt.forEach(i => {
    $(`#${i}`).attr("disabled", true);
  });
})
