import { Action } from "./action";
import { ActionType } from "./action-type";
import { AppState, IVacation } from "./AppState";

export function reduce(oldAppState: AppState = new AppState(), action: Action): AppState {
    let newAppState = { ...oldAppState };
  

    switch(action.type){

        case ActionType.InitUserData:
            let token = action.payload.token;
            let userType = action.payload.userType;
            let userName = action.payload.userName;

       if(userType === "admin" && token){
           newAppState.currentUserState = "admin";
           newAppState.userIsLoggedIn = true;
           newAppState.userName = userName;
       }
       else if(userType === "customer") {
           newAppState.currentUserState = "customer"
           newAppState.userIsLoggedIn = true;
           newAppState.userName = userName;
           newAppState.vacations.sort(function(x, y) {
            return (x.isFollowed === y.isFollowed) ? 0 : x.isFollowed ? -1 : 1;
         });  
       }

       else{
           return;
       }
       break;

       case ActionType.LogOut:
           sessionStorage.removeItem("token");
           sessionStorage.removeItem("userName");
           sessionStorage.removeItem("userType");
           sessionStorage.removeItem("userID");
           newAppState.userIsLoggedIn = false;
           newAppState.currentUserState = "" ;
           newAppState.followersAmount = []
           for(let vacation of newAppState.vacations){
            if(vacation.isFollowed === true){
                vacation.isFollowed = false;
            };
            if(vacation.amountOfFollowers>0){
                vacation.amountOfFollowers = null 
            }
            
        };
        newAppState.vacations = [...oldAppState.vacations];
        break;

       case ActionType.GetAllVacations:
        let vacationsArray = action.payload;
        newAppState.vacations = vacationsArray;
         break;

       case ActionType.followVacation:
            let vacationId = action.payload.vacationID;
            for(let vacation of newAppState.vacations){
                if(vacation.id === vacationId){
                    vacation.isFollowed = true;
                };
            };
            newAppState.vacations.sort(function(x, y) {
                return (x.isFollowed === y.isFollowed) ? 0 : x.isFollowed ? -1 : 1;
             });
            console.log(newAppState.vacations)
            newAppState.vacations = [...oldAppState.vacations];
        break;

        case ActionType.UnfollowVacation:
            let vacationID = action.payload.vacationID;
            for(let vacation of newAppState.vacations){
                if(vacation.id === vacationID){
                    vacation.isFollowed = false;
                };
            };
            newAppState.vacations = [...oldAppState.vacations];
            break;

            case ActionType.GetAllFollowedVacation:
                let vacationsById = action.payload;
                newAppState.followedVacation = vacationsById;
                    newAppState.vacations.forEach((vacation) => {
                        let followedVacations = newAppState.followedVacation
                        for(let index=0; index<followedVacations.length; index++){
                            if(vacation.id === newAppState.followedVacation[index].vacationID){
                                vacation.isFollowed = true;
                            };    
                        }
                    });
                newAppState.vacations.sort(function(x, y) {
                    return (x.isFollowed === y.isFollowed) ? 0 : x.isFollowed ? -1 : 1;
                 });
                newAppState.followedVacation = [...oldAppState.vacations];
                newAppState.vacations = [...newAppState.vacations];
            break;

                case ActionType.AddVacation:
                    newAppState.vacations = [...oldAppState.vacations];
                    let newDestination = action.payload.destination;
                    let newPrice = action.payload.price;
                    let newDates = action.payload.dates;
                    let newImage = action.payload.image;
                    let newDetails = action.payload.details;
                    let newID = action.payload.vacationID
                    let newVacation = {id: newID, image: newImage, destination: newDestination, details: newDetails, dates: newDates, price:newPrice, isFollowed: false, amountOfFollowers:0};
                    newAppState.vacations.push(newVacation);
        
            break;

            case ActionType.DeleteVacation:
                newAppState.vacations = [...oldAppState.vacations];
                let vacationIdToRemove = parseInt(action.payload.vacationID)
                newAppState.vacations.forEach((vacation, index) => {
                    if(vacation.id === vacationIdToRemove ){
                        newAppState.vacations.splice(index, 1);
                    }
                });
        
                break;
                case ActionType.EditVacation:
                    newAppState.vacations = [...oldAppState.vacations];
                    let destination = action.payload.destination;
                    let price = action.payload.price;
                    let dates = action.payload.dates;
                    let image = action.payload.editImage;
                    console.log(image)
                    let details = action.payload.details;
                    let id = action.payload.vacationID;

                    newAppState.vacations.forEach((vacation) => {
             
                        if(vacation.id === id){
                            vacation.destination = destination;
                            vacation.price = price;
                            vacation.dates = dates;
                            vacation.image = image;
                            vacation.details = details;
                        }
                    })
    
                    break;
                    case ActionType.amountOfFollowers:
                        newAppState.vacations = [...oldAppState.vacations];
                        let amountOfFollowers = action.payload
                        newAppState.followersAmount = amountOfFollowers
                        newAppState.vacations.forEach((vacation) => {
                            for(let index=0; index<newAppState.followersAmount.length; index++){
                                if(vacation.id === newAppState.followersAmount[index].vacationID){
                                    vacation.amountOfFollowers = newAppState.followersAmount[index].amountOfFollowers
                                };    
                            }
                        });
                      
                    break;
    }
    return newAppState;
}