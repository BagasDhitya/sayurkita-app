import Bull, { Queue } from "bull";

export class QueueService {
  private queue: Queue;

  constructor() {
    this.queue = new Bull("myqueue");
  }

  async addToQueue(data: any) {
    this.queue.add(data);
  }

  async processQueue() {
    this.queue.process(async (job) => {
      console.log(`Processing job with data : ${JSON.stringify(job.data)}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Job with data : ${JSON.stringify(job.data)} processed`);
    });
  }
}
