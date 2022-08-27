import { fetchUser } from "../utils/fecthLocalStorageData"


const userInfo = fetchUser();

export const initialState = {
    user: userInfo,
}