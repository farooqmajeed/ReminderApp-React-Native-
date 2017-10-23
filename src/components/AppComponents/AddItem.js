import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, TouchableOpacity, AppState, Platform, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PushNotification from 'react-native-push-notification';
import PushController from './PushController';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Item, Input, Card, H2, Label, Form } from 'native-base';
import { AppActions } from '../../store/actions/AppActions';
import * as firebase from '../../configs/db';


class AddItem extends Component {
    constructor(Props) {
        super(Props);

        this.state = {
            name: '',
            place: '',
            date: '',
            time: '',
            isDateTimePickerVisible: false,
            seconds: 10
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);

        setTimeout(() => {
            console.log("In setTimeOUT");
            this.setState({
                seconds: 15
            })
        }, 15000)
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    componentDidMount() {
        console.log("componenet did mount run")
        AppState.addEventListener('change', this.handleAppStateChange);
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleDatePicked = (date) => {

        console.log("49:", date);
        this.setState({
            date: date
        })
        console.log('A date has been picked: ', date);

        this.hideDateTimePicker();
    }


    handleSubmit = () => {
        console.log("hit")
        // var currentMinutes = this.state.date.getMinutes();
        // e.preventDefault();
        // let date = this.state.date.getMonth() + "/" + this.state.date.getDate() + "/" + this.state.date.getFullYear();

        // let time = this.state.date.getHours() + ":" + (currentMinutes < 10 ? "0" : "") + this.state.date.getMinutes();
        var date = this.state.date
        let name = this.state.name.toLowerCase();
        let place = this.state.place
        let userObj = {
            name: name,
            place: place,
            date: date.getTime()
            // time: time
        }
        console.log("itemADD", userObj);
        this.props.addItem(userObj)
        Actions.viewItem();
        console.log(" this.props.viewItems();", this.props.viewItems());

    }
    handleAppStateChange(appState) {
        console.log("state handle change detect");
        // var that = this;
        // var getData
        // var reminderTime
        // var alarmTime
        // var starCountRef = firebase.database.ref('users/MyItems').once('value', function (snapshot) {
        //     getData = snapshot.val()
        //     for (let [key, value] of Object.entries(getData)) {
        //         time = value.time
        //         date = value.date
        //         console.log("reminderTime", time);
        //         console.log("date", date);
        //     }

        //     var reminderTime = new Date(date);
        //     reminderTime.setHours(time.toString().split(":")[0])
        //     reminderTime.setMinutes(time.toString().split(":")[1])
        //     console.log("date", reminderTime);
        //     alarmTime = new Date(reminderTime);
        //     console.log("alarmTime", alarmTime);


        // });

        if (appState === 'background') {
            let date = this.state.date;
            //    let date = new Date(Date.now() + 60000);
            console.log("notification date", date)

            if (Platform.OS === 'ios') {
                date = date.toISOString();
            }

            PushNotification.localNotificationSchedule({
                message: "My Notification Message",
                date: date,
            });
        }
    }

    render() {
        return (
            <Container style={styles.container} >
                <Content>
                    <Form style={styles.cardItem} >
                        <Item floatingLabel>
                            <Label>Item Name</Label>
                            <Input
                                required
                                name='name'
                                ref='name'
                                value={this.state.value}
                                onChangeText={(name) => this.setState({ name })}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Item Place</Label>
                            <Input
                                required
                                name='place'
                                ref='place'
                                value={this.state.value}
                                onChangeText={(place) => this.setState({ place })}
                            />
                        </Item>
                        <TouchableOpacity onPress={this.showDateTimePicker}>
                            <Text style={{ textAlign: 'center', margin: 5, paddingTop: 5 }}>Set Reminder Time</Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            mode={'datetime'}
                            value={this.state.value}
                            onDateChange={(date) => { this.handleDatePicked }}
                            onTimeChange={(time) => { this.setState({ time: time }) }}
                            is24Hour={false}
                        />
                        <Button block info style={{ margin: 5 }} onPress={() => this.handleSubmit()} >
                            <Text>Add To Remember </Text>
                        </Button>
                        <Button block info style={{ margin: 5 }} onPress={() => Actions.viewItem()}>
                            <Text> View Items </Text>
                        </Button>
                        {/* <Picker
                            selectedValue={this.state.seconds}
                            onValueChange={(seconds) => this.setState({ seconds })}
                        >
                            <Picker.Item label="5" value={5} />
                            <Picker.Item label="10" value={10} />
                            <Picker.Item label="15" value={15} />
                        </Picker>   */}
                    </Form>
                    <PushController />
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3F2FD',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: -30
    },
    cardItem: {
        flex: 1,
        width: 350,
        height: 'auto'
    }
});

function mapStateToProps(state) {
    return {
        app: state.app
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addItem: (data) => dispatch(AppActions.addItem(data)),
        viewItems: (data) => dispatch(AppActions.viewItems(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddItem);

