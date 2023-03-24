import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Pressable, Image } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function EventList(props) {

    const [event, setEvent] = useState({
        id: '',
        eventName: '',
        eventDate: '',
        eventTime: '',
        venue: '',
        eventOrganizor: '',
        description: ''
    })
 
    const getUserById = async (id) => {
        const eventRef = firebase.firestore().collection('events').doc(id)
        const doc = await eventRef.get()
        const event = doc.data()
        setEvent({
            ...event,
            id: doc.id,
        })

    }

    useEffect(() => {
        getUserById(props.route.params.itemId);
    })


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
                        <Text style={styles.logotext}>EVENT DETAILS</Text>
                    </View>
                </View>

                <View style={styles.ArticleViewFormView}>
                <Text style={styles.viewTextEventName}>{event.eventName}</Text>
                    <Image
                        style={styles.ViewEventImage}
                        source={require('./eventPeople.png')}
                    />
                    <View>
                        {/* <Text style={styles.viewTextEventName}>{event.eventName}</Text> */}
                        <Text style={styles.viewTextEventDate}>Date - {event.eventDate}</Text>
                        <Text style={styles.viewTextEventDate}>Time - {event.eventTime}</Text>
                        <Text style={styles.viewTextEventDate}>Venue - {event.venue}</Text>
                        <Text style={styles.viewTextEventContent}>{event.description}</Text>
                        <Text style={styles.viewTextArticleWritten}>Organized by - {event.eventOrganizor}</Text>
                    </View>
                </View>

            </KeyboardAwareScrollView>


        </View>

    )

}

