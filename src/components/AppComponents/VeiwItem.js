import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker'
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Item, Input, Card, H2, Label, Form, Fab, List, ListItem } from 'native-base';
import { AppActions } from '../../store/actions/AppActions';
import * as firebase from '../../configs/db';

class VeiwItems extends Component {

    componentDidMount() {
        this.props.viewItems();
        console.log("available PROps", this.props.viewItems());
    }

    onButtonPress(name) {
        var that = this;
        var getData
        var deletedObject
        var starCountRef = firebase.database.ref('users/MyItems').orderByChild('name').equalTo(name).once('value', function (snapshot) {
            //     var starCountRef = firebase.database.ref('users/' + currentUser.uid + '/Cart').orderByChild('id').equalTo(id).once('value', function (snapshot) {
            console.log("deleted VAlue", snapshot.val());
            getData = snapshot.val()
            for (let [key, value] of Object.entries(getData)) {
                console.log("got Object", key, value);
                deletedObject = key
                console.log("deletedObject", deletedObject);
            }


        });

        this.props.removeItems(deletedObject);
    }
    render() {
        var arrayObject = []
        const data = this.props && this.props.app && this.props.app.viewItem ? this.props.app.viewItem : [];
        console.log("DATA", data)
        arrayObject = Object.values(data);
        return (
            <Container style={styles.container} >
                <Content>
                    <H2 style={{ textAlign: 'center', marginTop: 10 }} > </H2>
                    {
                        arrayObject.map((item, i) => {
                            return (
                                <ScrollView>
                                    <Card key={i} style={{ flex: 1, backgroundColor: '#E3F2FD', }}>
                                        <CardItem style={{ flex: 1, backgroundColor: '#E3F2FD', }}>
                                            <List >
                                                <ListItem style={styles.list} >
                                                    <Text style={{ color: 'black' }} >
                                                        Name:   {item.name}
                                                    </Text>
                                                </ListItem>
                                                <ListItem style={styles.list}>
                                                    <Text style={{ color: 'black' }} >
                                                        Place:   {item.place}
                                                    </Text>
                                                </ListItem>
                                                {/* <ListItem style={styles.list}>
                                                    <Text style={{ color: 'black' }} >
                                                        Date:   {new Date({ item.date })}
                                                    </Text>
                                                </ListItem> */}
                                                {/* <ListItem style={styles.list}>
                                                    <Text style={{ color: 'black' }} >
                                                        Time:   {item.time}
                                                    </Text>
                                                </ListItem> */}
                                                <Icon style={{ marginLeft: 320, color: 'red' }} name='trash' onPress={() => this.onButtonPress(item.name)} />
                                            </List>
                                        </CardItem>
                                    </Card>
                                </ScrollView>
                            )
                        })
                    }

                </Content>
                <Fab
                    containerStyle={{}}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => Actions.addItem()}
                >
                    <Icon name="add" />
                </Fab>
            </Container >
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3F2FD',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: -10
    },
    cardItem: {
        flex: 1,
        width: 350,
        height: 'auto',
        backgroundColor: '#E3F2FD',
    },
    list: {
        width: 350,
        height: 20,
        padding: 5,
        backgroundColor: '#E3F2FD',

    }

});
function mapStateToProps(state) {
    return {
        app: state.app
    }
}
function mapDispatchToProps(dispatch) {
    return {
        viewItems: (data) => dispatch(AppActions.viewItems(data)),
        removeItems: (data) => dispatch(AppActions.RemoveItems(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VeiwItems);
// export default VeiwItems;