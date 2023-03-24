import React, { useState, useEffect } from 'react'
import { Text, TextInput, View, FlatList, Pressable, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

//import DatePicker from 'react-native-datepicker';


export default function EventList(props) {

    const initialState = {
        id: '',
        eventName: '',
        eventDate: '',
        eventTime: '',
        venue: '',
        eventOrganizor: '',
        description: ''

    }

    const [event, setEvent] = useState(initialState)

    const [loading, setLoading] = useState(true)

    const navigation = useNavigation();



    const getUserById = async (id) => {
        const eventRef = firebase.firestore().collection('events').doc(id)
        const doc = await eventRef.get()
        const event = doc.data()
        setEvent({
            ...event,
            id: doc.id,
        });
        setLoading(false)
    };

    useEffect(() => {
        getUserById(props.route.params.itemId);
    }, []);

    const handleChangeText = (name, value) => {
        setEvent({ ...event, [name]: value });
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    };

    const updateEvent = async () => {
        const eventRef = firebase.firestore().collection('events').doc(event.id)
        await eventRef.set({
            eventName: event.eventName,
            eventDate: event.eventDate,
            eventTime: event.eventTime,
            venue: event.venue,
            eventOrganizor: event.eventOrganizor,
            description: event.description

        })
        setEvent(initialState)
        props.navigation.navigate("Event List");
        alert("Updated successfully")
    }


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Event List')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                        source={require('./colorLogo.png')}
                    />
                    <Text style={styles.listlogotext}>EVENTS</Text>
                </View>

                <View style={styles.addFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Pure Drop')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.logo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.logotext}>UPDATE EVENT</Text>
                    </View>
                </View>

                <View style={styles.UpdateInputFormView}>
                    <Text style={styles.updateTextStart}>Event Name</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Event Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("eventName", value)}
                        value={event.eventName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={styles.updateText}>Event Date</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Event Date'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("eventDate", value)}
                        value={event.eventDate}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />

                    <Text style={styles.updateText}>Event Time</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Event Time'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("eventTime", value)}
                        value={event.eventTime}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />

                    <Text style={styles.updateText}>Venue</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Venue'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("venue", value)}
                        value={event.venue}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />

                    {/* <DatePicker
                        style={styles.datePickerStyle}
                        mode="date"
                        value={article.publishedDate}
                        placeholder="Published Date"
                        format="DD/MM/YYYY"
                        minDate="01-01-1900"
                        maxDate="01-01-2000"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                            position: 'absolute',
                            right: -5,
                            top: 4,
                            marginLeft: 0,
                            },
                            dateInput: {
                            borderColor : "gray",
                            alignItems: "flex-start",
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            },
                            placeholderText: {
                            fontSize: 17,
                            color: "gray"
                            },
                            dateText: {
                            fontSize: 17,
                            }
                        }}
                        onDateChange={(value) => handleChangeText("publishedDate" , value)}
                /> */}
                    <Text style={styles.updateText}>Event Organizor</Text>
                    <TextInput
                        style={styles.UpdateInputNameStart}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Event Organizor'
                        onChangeText={(value) => handleChangeText("eventOrganizor", value)}
                        value={event.eventOrganizor}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={styles.updateText}>Description</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.UpdateInputName}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Description'
                        onChangeText={(value) => handleChangeText("description", value)}
                        value={event.description}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.UpdateEventBtn}
                        onPress={() => updateEvent()}>
                        <Text style={styles.buttonTitle}>UPDATE EVENT</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>


        </View>

    )

}

