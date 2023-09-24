type data = {
    authorization_url: string,
    access_code: string,
    reference: string
}

export type PaymentType = {
    status: boolean,
    message: string,
    data: data
}