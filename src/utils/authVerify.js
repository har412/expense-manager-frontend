

export const verifyUser = ()=>{
    const access_token = localStorage.getItem('access_token')
    if(!access_token){
        return null
    }
    return true
}