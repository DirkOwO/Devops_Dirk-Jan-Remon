import fs from "fs"
import amqp from "amqplib"

async function start(){
    const connection = await amqp.connect(process.env.MESSAGE_QUEUE);
    const channel = await connection.createChannel();
    await channel.assertQueue('logs', {durable: true});
    await channel.prefetch(1);

    channel.consume('logs', message => {

        console.log('received a message from rabbitmq');

        fs.appendFile('/data/messages.txt',message.content.toString() + '\n', err => channel.ack(message));
    });
}

start();