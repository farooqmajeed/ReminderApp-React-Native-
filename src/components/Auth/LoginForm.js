import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Form, Item, Input, Label, Icon, Spinner, Right, Header, Body, Title, Button } from 'native-base';
// import { emailChanged, passwordChanged, loginUser } from '../store/actions'
import { AuthActions } from '../../store/actions'

const window = Dimensions.get('window');

class LoginForm extends Component {

    onEmailChange(text) {
        this.props.emailChange(text);

    }

    onPasswordChange(text) {
        this.props.passwordChange(text);
    }
    onButtonPress() {
        const { email, password, error } = this.props;
        console
        this.props.loginUser({ email, password, error });
        // Actions.dashboard();
    }
    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" style={styles.spinnerStyle} />;
        }
        return (
            <Button rounded info style={styles.buttonStyle} onPress={this.onButtonPress.bind(this)} >
                <Text style={{ color: 'black' }}> Sign in </Text>
            </Button>
        );
    }
    render() {
        return (
            <Container style={styles.containerStyle}>
                <Image source={require("../../assets/image.png")}
                    style={{
                        flex: 1,
                        width: null,
                        height: null,
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        resizeMode: 'cover',
                        opacity: 0.3
                    }}

                >

                </Image>
                <Form style={styles.formstyle}>
                    <CardItem style={{ backgroundColor: '#E3F2FD', opacity: 0.9, borderTopLeftRadius: 30, borderTopRightRadius: 30 }} >
                        <Item rounded>
                            <Label style={{ marginLeft: 10, color: 'black' }} >EMAIL</Label>
                            <Input
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.props.email} />
                        </Item>
                    </CardItem>

                    <CardItem style={{ backgroundColor: '#E3F2FD', opacity: 0.9 }}>
                        <Item rounded>
                            <Label style={{ marginLeft: 10, color: 'black' }}>PASSWORD</Label>
                            <Input
                                secureTextEntry
                                onChangeText={this.onPasswordChange.bind(this)}
                                value={this.props.password}
                            />
                        </Item>
                    </CardItem>
                    <CardItem style={{ backgroundColor: '#E3F2FD', opacity: 0.9, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>

                        {this.renderButton()}
                        <Text style={styles.errorTextStyle} >
                            {this.props.error}
                        </Text>
                    </CardItem>
                    <CardItem style={{ backgroundColor: '#E3F2FD', opacity: 0.3 }}>
                        <Text style={{ flex: 1, textAlign: 'center', marginTop: 30, color: 'black', opacity: 1 }} >  Do not have an account? </Text>
                    </CardItem>
                    <CardItem style={{ backgroundColor: '#E3F2FD', opacity: 0.3 }}>
                        <Text style={styles.textStyle2} onPress={() => Actions.signup()}> Register  </Text>
                    </CardItem>
                </Form>
            </Container>
        );
    };
}
const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        marginTop: 50,
        marginLeft: -180
    },
    containerStyle: {
        marginTop: -80,
        width: 420,
    },
    formstyle: {
        marginLeft: 20,
        // alignSelf: 'center',
        marginTop: 180,
        width: window.width * 0.9,

    },
    buttonStyle: {
        marginLeft: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        width: 180
    },
    textStyle: {
        flex: 1,
        color: 'green',
        textAlign: 'center',
    },
    textStyle2: {
        flex: 1,
        color: 'black',
        textAlign: 'center',
        opacity: 1
    },
    spinnerStyle: {
        marginLeft: 150
    },
    imageStyle: {
        width: 100,
        height: 100,
    },
    cardStyle: {
        backgroundColor: '#E8F5E9',
        opacity: 0.8
    }
});
const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;

    return { email, password, error, loading };

};

const mapDispatchToProps = (dispatch) => {
    return {
        emailChange: (text) => dispatch(AuthActions.emailChanged(text)),
        passwordChange: (text) => dispatch(AuthActions.passwordChanged(text)),
        loginUser: (userData) => dispatch(AuthActions.loginUser(userData))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm); 