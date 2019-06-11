export class Message {
  destination: string;
  body: string;

  constructor(destination: string, body?: any) {
    this.destination = destination;
    if (body != null)
      this.body = typeof body === 'string' ? this.body = body : JSON.stringify(body);
  }

}
