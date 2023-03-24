import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Pressable, Image } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function DonateList(props) {

    const [donate, setDonate] = useState({
        id: '',
        patientName: '',
        patientAge: '',
        guardianName: '',
        disease: '',
        contactNo: '',
        neededAmount: '',
        collectedAmount: '',
        bankDetails: ''
    })
 
    const getUserById = async (id) => {
        const donateRef = firebase.firestore().collection('donates').doc(id)
        const doc = await donateRef.get()
        const donate = doc.data()
        setDonate({
            ...donate,
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
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Donate List')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                        source={require('./colorLogo.png')}
                    />
                    <Text style={styles.listlogotext}>DONATIONS</Text>
                </View>

                <View style={styles.addFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Pure Drop')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.logo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.logotext}>   DONATION DETAILS</Text>
                    </View>
                </View>

                <View style={styles.ArticleViewFormView}>
                <Text style={styles.viewTextEventName}>{donate.patientName}</Text>
                    <Image
                        style={styles.ViewDonateImage}
                        source={require('./donation.png')}
                    />
                    <View>
                        {/* <Text style={styles.viewTextEventName}>{event.eventName}</Text> */}
                        <Text style={styles.viewTextEventDate}>Age - {donate.patientAge} yrs</Text>
                        <Text style={styles.viewTextEventDate}>Parent/Guardian Name - {donate.guardianName}</Text>
                        <Text style={styles.viewTextEventDate}>Contact No - {donate.contactNo}</Text>
                        <Text style={styles.viewTextEventDate}>Needed Amount - {donate.neededAmount}</Text>
                        <Text style={styles.viewTextEventDate}>Collected Amount - {donate.collectedAmount}</Text>
                        <Text style={styles.viewTextEventDate}>Bank Details - {donate.bankDetails}</Text>
                        <Text style={styles.viewTextArticleWritten}>Thank you in Advance!</Text>
                    </View>
                </View>

            </KeyboardAwareScrollView>


        </View>

    )

}

