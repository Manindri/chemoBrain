import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


export default function AddEvent() {

    const [eventName, setEventName] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [eventTime, setEventTime] = useState('')
    const [venue, setVenue] = useState('')
    const [eventOrganizor, setEventOrganizor] = useState('')
    const [description, setDescription] = useState('')
    const eventRef = firebase.firestore().collection('events')

    const navigation = useNavigation();

    const onAddPress = () => {

        const data = {
            eventName,
            eventDate,
            eventTime,
            venue,
            eventOrganizor,
            description,
        };
        eventRef
            .add(data)
            .then(() => {
                navigation.navigate('Event List', { params: { data } })
            })
            .catch((error) => {
                alert(error)
            });

    }

    //Form Validation
    const checkTextInput = () => {
        //Check for the Name TextInput
        if (!eventName.trim()) {
            alert('Please Enter Event Name');
            return;
        }
        //Check for the Email TextInput
        if (!eventDate.trim()) {
            alert('Please Enter Event Date');
            return;
        }
        if (!eventTime.trim()) {
            alert('Please Enter Event Time');
            return;
        }
        if (!venue.trim()) {
            alert('Please Enter Venue');
            return;
        }
        if (!eventOrganizor.trim()) {
            alert('Please Enter Event Organizor');
            return;
        }
        if (!description.trim()) {
            alert('Please Enter Description');
            return;
        }
        //Checked Successfully
        //Do whatever you want
        alert('Success');
        onAddPress();
    };

    // const functionCombined = () => {
    //     checkTextInput();
    //     onAddPress();
    // }  
    

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Pure Drop')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                    />
                    <Text style={styles.logotext}>ADD NEW EVENT</Text>
                </View>

                <View style={styles.addFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('HomePage')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.logo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.logotext}>ADD NEW EVENT</Text>
                    </View>
                </View>

                <View style={styles.inputFormView}>
                    <TextInput
                        style={styles.inputName}
                        placeholder='Event Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEventName(text)}
                        value={eventName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Event Date - dd/mm/yyyy'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEventDate(text)}
                        value={eventDate}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Event Time'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEventTime(text)}
                        value={eventTime}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Venue'
                        onChangeText={(text) => setVenue(text)}
                        value={venue}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Event Organizor'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEventOrganizor(text)}
                        value={eventOrganizor}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Description'
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => checkTextInput() }
                        // onPressIn={() => onAddPress()}
                        >
                        <Text style={styles.buttonTitle}>ADD EVENT</Text>
                    </TouchableOpacity>
                    {/* <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View> */}
                </View>
            </KeyboardAwareScrollView>
        </View>

    )

}

