 declare type ApiError = {
  message: string
  response: {
    data: {
      message: string
    }
  }
}

export default ApiError