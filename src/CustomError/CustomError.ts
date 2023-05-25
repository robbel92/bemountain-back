class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public publicMessage?: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.publicMessage = publicMessage ?? this.message;
  }
}

export default CustomError;
