import { createClient, RedisClientType } from "redis";

export class MessageService {
  private pubClient: RedisClientType;
  private subClient: RedisClientType;

  constructor() {
    this.pubClient = createClient();
    this.subClient = createClient();

    this.pubClient.on("error", (err: any) => {
      console.log("Redis publish client error : ", err);
    });

    this.subClient.on("error", (err: any) => {
      console.log("Redis publish client error : ", err);
    });

    // menghubungkan dua klien (publisher dan subscriber) untuk berkomunikasi
    this.pubClient.connect();
    this.subClient.connect();
  }

  // logic untuk mengirim pesan ke channel tertentu
  async sendMessage(channel: string, message: string): Promise<void> {
    await this.pubClient.publish(channel, message);
  }

  // logic untuk menerima pesan dari channel tertentu
  async receiveMessage(
    channel: string,
    callback: (message: string) => void
  ): Promise<void> {
    await this.subClient.subscribe(channel, (message: string) => {
      callback(message);
    });
  }

  // logic untuk menutup koneksi dua klien
  async disconnectClients(): Promise<void> {
    await Promise.all([
      this.pubClient.disconnect(),
      this.subClient.disconnect(),
    ]);
    console.log("Disconnected from Redis");
  }
}
