const io = require("socket.io")();
const socket = {
    io:io
}

const client = require('prom-client')
const gauge = new client.Gauge({name: 'number_of_clients', help: 'number of clients that connected using socket.io'})
gauge.inc(1)

io.on("connection", function(socket) {
    console.log("a user connected")

    socket.on("disconnect", () => {
        console.log("user disconnected")
        gauge.dec(1);
    })

    socket.on("message", (msg) => {
        console.log('message: ' + msg)
        io.emit('message', msg)
    })
})

module.exports = socket;