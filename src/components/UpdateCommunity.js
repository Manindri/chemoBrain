import React, { useState, useEffect } from 'react'
import { Text, TextInput, View, FlatList, Pressable, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

//import DatePicker from 'react-native-datepicker';


export default function CommunityList(props) {

    const initialState = {
        id: '',
        communityName: '',
        communityPresidentName: '',
        address: '',
        contactNo: '',
        registeredDate: '',
        communityPurpose: ''

    }

    const [community, setCommunity] = useState(initialState)

    const [loading, setLoading] = useState(true)

    const navigation = useNavigation();



    const getUserById = async (id) => {
        const communityRef = firebase.firestore().collection('communities').doc(id)
        const doc = await communityRef.get()
        const community = doc.data()
        setCommunity({
            ...community,
            id: doc.id,
        });
        setLoading(false)
    };

    useEffect(() => {
        getUserById(props.route.params.itemId);
    }, []);

    const handleChangeText = (name, value) => {
        setCommunity({ ...community, [name]: value });
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    };

    const updateCommunity = async () => {
        const communityRef = firebase.firestore().collection('communities').doc(community.id)
        await communityRef.set({
            communityName: community.communityName,
            communityPresidentName: community.communityPresidentName,
            address: community.address,
            contactNo: community.contactNo,
            registeredDate: community.registeredDate,
            communityPurpose: community.communityPurpose

        })
        setCommunity(initialState)
        props.navigation.navigate("Community List");
        alert("Updated successfully")
    }


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Community List')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                        source={require('./colorLogo.png')}
                    />
                    <Text style={styles.listlogotext}>COMMUNITIES</Text>
                </View>

                <View style={styles.addFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Pure Drop')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.logo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.logotext}>UPDATE COMMUNITY</Text>
                    </View>
                </View>

                <View style={styles.UpdateInputFormView}>
                    <Text style={styles.updateTextStart}>Community Name</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Community Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("communityName", value)}
                        value={community.communityName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={styles.updateText}>Community President Name</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Community President Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("communityPresidentName", value)}
                        value={community.communityPresidentName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />

                    <Text style={styles.updateText}>Address</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Address'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("address", value)}
                        value={community.address}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />

                    <Text style={styles.updateText}>Contact No</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Contact No'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("contactNo", value)}
                        value={community.contactNo}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        keyboardType="numeric"
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
                    <Text style={styles.updateText}>Registered Date (dd/mm/yyyy) </Text>
                    <TextInput
                        style={styles.UpdateInputNameStart}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Registered Date - dd/mm/yyyy'
                        onChangeText={(value) => handleChangeText("registeredDate", value)}
                        value={community.registeredDate}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={styles.updateText}>Community Purpose</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.UpdateInputName}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Community Purpose'
                        onChangeText={(value) => handleChangeText("communityPurpose", value)}
                        value={community.communityPurpose}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.UpdateEventBtn}
                        onPress={() => updateCommunity()}>
                        <Text style={styles.buttonTitle}>UPDATE COMMUNITY</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>


        </View>

    )

}

