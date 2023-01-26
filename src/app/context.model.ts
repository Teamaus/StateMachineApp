

export interface Context{
    [key:string]:string[]
   


}

export class ContextAdapter{
    getInitialContext(...keys:string[]){

        let tempObj = keys.map(key=>{return {[key]:[]}})
        tempObj.reduce((acc:any,obj)=>{return {...acc,obj}})
    }
    updateContext(context:Context,key:keyof Context,value:string[]){
        return {...context,[key]:value}
    }
}
export function createContextAdapter(){
    return new ContextAdapter()
}