export type JwtPayload = {
    sub: string,
    email: string,
    name: string,
    clientId: number,
    rolId: number,
    cityId: number,
    provinceId: number,
    address: string,
    exp: number,
    iss: string,
    aud: string
}