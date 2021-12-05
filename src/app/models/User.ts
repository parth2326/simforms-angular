import { environment } from 'src/environments/environment';

export class User{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  displayPicture: string;
  status: number;
  createdAt: string;

  static fromMap(data: any): User{
    // tslint:disable-next-line: new-parens
    const user =  Object.assign(new this, data);
    return user;
  }

  getDisplayPictureUrl(): string{
    return environment.apiUrl + '/' + this.displayPicture;
  }

}
