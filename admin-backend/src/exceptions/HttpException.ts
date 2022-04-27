export class HttpException extends Error {
  public status: number;
  public message: string;
  public code: number;

  constructor(status: number, message: string, code?: number) {
    super(message);
    this.status = status;
    this.code = code;
    this.message = message;
  }
}
