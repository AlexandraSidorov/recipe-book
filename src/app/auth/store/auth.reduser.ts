import { User } from "../user.model";
import * as AuthActions  from "./auth.action";

export interface State{
    user: User;
    authError: string;
    loading:boolean
}

const initialState:State ={
    user: null,
    authError:null,
    loading:false
};

export function authReduser(
    state = initialState,
    action:AuthActions.AuthActions 
    ){
      switch(action.type){
        case AuthActions.AUTHENDICATE_SECCESS:
            const user = new User(
                action.payload.email, 
                action.payload.userId,
                action.payload.token,
                action.payload.expitationDate);
            return {
                ...state,
                authError: null,
                user:user,
                loading:false
            };
        case AuthActions.LOGOUT:
            return{
                ...state,
                user:null,
            };
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return{
                ...state,
                authError: null,
                loading: true
            };
        case AuthActions.AUTHENDICATE_FAIL:
            return{
                ...state,
                user:null,
                authError: action.payload,
                loading:false
            }
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError:null
            }
        default:
            return state;
      }
  }