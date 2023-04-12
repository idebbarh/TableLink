declare interface SideBarOptionType {
  title: string;
  path: string;
}

declare interface IEmployee {
  id?: number;
  name: string;
  job: string;
    email:string,
    password:string,
}


declare interface IMenuItem{
    id:number,
    name:string,
    price:number,
    description:string,
    ingredients:{
        id:number,
        name:string,
    }[] | string,
}

declare interface IReservation{
    id:number,
    name:string,
    date:string,
    time:string,
    people:number,
}
