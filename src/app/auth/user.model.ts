export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private tokenExpirationDate: Date
  ) {}

    get token() {
        if(!this.tokenExpirationDate || new Date() > this.tokenExpirationDate)  //token does not exist or has expired already
        {
            return null
        }
        return this._token
    }
}
