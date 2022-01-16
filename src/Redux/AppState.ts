export class AppState {

  public vacations: IVacation [] = [];
  public currentUserState: string = "";
  public userIsLoggedIn: boolean = false;
  public userName: string = "";
  public followedVacation = []; 
  public chartData: any = {};
  public followersAmount = [];
  // public sessionStorageToken = sessionStorage.getItem("token")
}




export interface IVacation {
  id: number;
  image: string;
  destination: string;
  details: string;
  dates: string;
  price: number;
  isFollowed: boolean;
  amountOfFollowers:number;
}