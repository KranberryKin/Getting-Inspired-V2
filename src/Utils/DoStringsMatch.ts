export const DoStringsMatch = (stringA:string, stringB:string) => {
    var doesMatch = true;
    if(stringA.length !== stringB.length){
        doesMatch = false;
    } else {
        for(let i = 0; i < stringA.length; i ++){
            const Achar = stringA[i];
            const Bchar = stringB[i];
            if(Achar !== Bchar){
                doesMatch = false;
            }
        }
    }
    return doesMatch;
}