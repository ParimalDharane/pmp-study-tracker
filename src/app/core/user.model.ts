export class FirebaseUserModel {
  image: string;
  name: string;
  provider: string;
  uid: string;

  constructor(){
    this.image = "";
    this.name = "";
    this.provider = "";
    this.uid = "";
  }
}
