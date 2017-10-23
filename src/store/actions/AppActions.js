import firebase from '../../configs/db';
import { Actions } from 'react-native-router-flux';
import {
    VEIW_ITEMS,
    ADD_ITEM,
    REMOVE_ITEMS
} from './types'

export class AppActions {
    static addItem = (UserObj) => {
        return (dispatch) => {
            firebase.database().ref(`/users/MyItems`)
                .push(UserObj)
                .then((data) => {
                    dispatch({ type: ADD_ITEM });
                    console.log("ITEM ADD", data);
                    alert("successfully Add")
                });
                Actions.refresh();
        };
    }
    static viewItems = () => {
        return (dispatch) => {
            const getData = [];
            firebase.database().ref(`/users/MyItems`)
                .on('value', snapshot => {
                    dispatch({ type: VEIW_ITEMS, payload: snapshot.val() });
                    // console.log("snapshot", snapshot.val())
                });
        };
    };
    static RemoveItems = (UserObj) => {
      console.log("UserObj", UserObj);  
        return (dispatch) => {
            firebase.database().ref(`/users/MyItems/`+ UserObj)
                .remove()
                .then((data) => {
                    dispatch({ type: REMOVE_ITEMS });
                    console.log("ITEM REmove", data);
                });
        }
    }

}