import React , {Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {Card,Header,Icon} from 'react-native-elements'
import firebase from 'firebase'

import db from '../config'

export default class ReacieverDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            userId       :firebase.auth().currentUser.email,
            recieverId   :this.props.navigation.getParam('detials')["ser_id"],
            requestId    :this.props.navigation.getParam('details')["request_id"],
            bookName     :this.props.navigation.getParam('details')["book_name"],
            reason_for_requesting  :this.props.navigation.getParam('details')["reason_to_request"],
            recieverName : '',
            recieverContact: '',
            recieverAddress:'',
            recieverRequestDocId:''
        }
    }



    getRecieverDetails(){
        db.collection('users').where('email_id',"==",this.state.recieverId).get()
        .then(snapshot=>{
            snapshot.forEachdoc(doc=>{
                this.setState({
                    recieverName    : doc.data().first_name,
                    recieverContact : doc.data().contact,
                    recieverAddress : doc.data().address,
                })
            })
        });

        db.collection('reqested_ books').where('request_id',"==",this.state.requestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc => {
                this.setState({recieverRequestDocId:doc.id})
            })
        })}

        updateBookStatus=()=>{
            db.collection('all_donations').add({
                book_name   : this.state.bookName,
                request_id  : this.state.requestId,
                requested_by: this.state.recieverName,
                donor_id    : this.state.userId,
                request_status : "Donor Intrested"
            })
        }



        componentDidMount(){
            this.getRecieverDetails()
        }

        render(){
            return (
                <View style = {StyleSheet.container}>
                    <View style={{flex:0.1}}>
                        <Header leftComponent ={<Icon name='arrow-left' type='feather' color='#696969' onPress={()=> this.props.navigation.goBack()}}/>
                    </View>
                </View>
            )
        }
}