import React from 'react';
import { View, ScrollView } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components//Auth/LoginForm';
import SignupForm from './components/Auth/SignUp';
import AddItem from './components/AppComponents/AddItem'
import VeiwItems from './components/AppComponents/VeiwItem'


const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>

             <Scene key="auth">
                <Scene key="login" component={LoginForm} hideNavBar={true} initial />
                <Scene key="signup" component={SignupForm} hideNavBar={true} />
            </Scene> 
            <Scene key="main">
                <Scene navigationBarStyle={{ backgroundColor: '#2196F3' }} key="addItem" component={AddItem} title={"Add Item"} initial/>
                <Scene navigationBarStyle={{ backgroundColor: '#2196F3' }} key="viewItem" component={VeiwItems} title={"View Items"}  />
            </Scene>
        </Router>
    );
};


export default RouterComponent;

