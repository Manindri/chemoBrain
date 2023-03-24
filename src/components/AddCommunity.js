import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


export default function AddCommunity() {

    const [communityName, setCommunityName] = useState('')
    const [communityPresidentName, setCommunityPresidentName] = useState('')
    const [address, setAddress] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [registeredDate, setRegisteredDate] = useState('')
    const [communityPurpose, setCommunityPurpose] = useState('')
    const communityRef = firebase.firestore().collection('communities')

    const navigation = useNavigation();

    const onAddPress = () => {

        const data = {
            communityName,
            communityPresidentName,
            address,
            contactNo,
            registeredDate,
            communityPurpose,
        };
        communityRef
            .add(data)
            .then(() => {
                navigation.navigate('Community List', { params: { data } })
            })
            .catch((error) => {
                alert(error)
            });

    }

    const checkTextInput = () => {
        //Check for the Name TextInput
        if (!communityName.trim()) {
            alert('Please Enter Community Name');
            return;
        }
        //Check for the Email TextInput
        if (!communityPresidentName.trim()) {
            alert('Please Enter President Name');
            return;
        }
        if (!address.trim()) {
            alert('Please Enter Address');
            return;
        }
        if (!contactNo.trim()) {
            alert('Please Enter Contact No');
            return;
        }
        if (!registeredDate.trim()) {
            alert('Please Enter Registered Date');
            return;
        }
        if (!communityPurpose.trim()) {
            alert('Please Enter Community Purpose');
            return;
        }
        //Checked Successfully
        //Do whatever you want
        alert('Success');
    };


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
                    <Text style={styles.logotext}>ADD COMMUNITY</Text>
                </View>

                <View style={styles.addFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('HomePage')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.logo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.logotext}>ADD COMMUNITY</Text>
                    </View>
                </View>

                <View style={styles.inputFormView}>
                    <TextInput
                        style={styles.inputName}
                        placeholder='Community Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setCommunityName(text)}
                        value={communityName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Community President Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setCommunityPresidentName(text)}
                        value={communityPresidentName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Address'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setAddress(text)}
                        value={address}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Contact No'
                        onChangeText={(text) => setContactNo(text)}
                        value={contactNo}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Registered Date - dd/mm/yyyy'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setRegisteredDate(text)}
                        value={registeredDate}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Community Purpose'
                        onChangeText={(text) => setCommunityPurpose(text)}
                        value={communityPurpose}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onAddPress() }>
                        <Text style={styles.buttonTitle}>ADD COMMUNITY</Text>
                    </TouchableOpacity>
                    {/* <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View> */}
                </View>
            </KeyboardAwareScrollView>
        </View>

    )

}

