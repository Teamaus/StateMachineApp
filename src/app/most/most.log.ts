export const LOGGING= []
export const LOG_EVERYTHING = true
export function most_log(swComponent:any,...logMessages:any[]){
    let print =()=>console.log("SWCOMP:",swComponent.constructor.name,"Message:",...logMessages)
    let logThisComponent = LOGGING.filter(swName=>swName==swComponent.constructor.name).length>0
    if (LOG_EVERYTHING || logThisComponent ){
        print()
    }
}

