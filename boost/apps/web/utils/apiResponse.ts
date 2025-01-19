class apiResponse {
  public status: number;
  public message: string;
  public data: any;
  public success: boolean;

  constructor(status: number, message: string, data: any) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = status < 400;
  }
}

export default apiResponse;
