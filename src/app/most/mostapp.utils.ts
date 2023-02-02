
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';

export const goBack = (activatedRoute:ActivatedRoute ,level:number):any=>
{
    if (activatedRoute.parent)
      console.log("ACTIVE  and Level",activatedRoute.snapshot.url,level);
    else{
      console.log("ACTIVE  unefined");
    }
    return level==0?activatedRoute:activatedRoute.parent?goBack(activatedRoute.parent,level-1):activatedRoute
}
export const urlLevel=(url:string)=>url=="/"?0:url.replace("//","").split("/").length-1
export const getPathFromPathObj=(objPath:any):string[]=>{
    let key = Object.keys(objPath)[0]
    if (Object.keys(objPath[key]).length == 0)
    {
        return [key]
    }
    else{
      return [key,...getPathFromPathObj(objPath[key])]
    }

}

