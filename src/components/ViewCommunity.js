import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Pressable, Image } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function CommunityList(props) {

    const [community, setCommunity] = useState({
        id: '',
        communityName: '',
        communityPresidentName: '',
        address: '',
        contactNo: '',
        registeredDate: '',
        communityPurpose: ''
    })

    const getUserById = async (id) => {
        const communityRef = firebase.firestore().collection('communities').doc(id)
        const doc = await communityRef.get()
        const community = doc.data()
        setCommunity({
            ...community,
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
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Community List')} style={styles.backbtn} />
                    <Image
                        style={styles.communityLogo}
                        source={require('./colorLogo.png')}
                    />
                    <Text style={styles.listlogotext}>COMMUNITIES</Text>
                </View>

                <View style={styles.addFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Pure Drop')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.communityLogo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.communityLogotext}>COMMUNITY DETAILS</Text>
                    </View>
                </View>

                <View style={styles.ArticleViewFormView}>
                <Text style={styles.viewTextEventName}>{community.communityName}</Text>
                    <Image
                        style={styles.ViewCommunityImage}
                        source={require('./communityImage.png')}
                    />
                    <View>
                        {/* <Text style={styles.viewTextEventName}>{event.eventName}</Text> */}
                        <Text style={styles.viewTextEventDate}>Address - {community.address}</Text>
                        <Text style={styles.viewTextEventDate}>Contact No - {community.contactNo}</Text>
                        <Text style={styles.viewTextEventDate}>Community President - {community.communityPresidentName}</Text>
                        <Text style={styles.viewTextEventContent}>{community.communityPurpose}</Text>
                        <Text style={styles.viewTextArticleWritten}>Founded On - {community.registeredDate}</Text>
                    </View>
                </View>

            </KeyboardAwareScrollView>


        </View>

    )

}

