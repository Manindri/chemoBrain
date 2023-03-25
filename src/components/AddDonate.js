import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


export default function AddDonate() {

    const [patientName, setPatientName] = useState('')
    const [patientAge, setPatientAge] = useState('')
    const [guardianName, setGuardianName] = useState('')
    const [disease, setDisease] = useState('')    
    const [contactNo, setContactNo] = useState('')
    const [neededAmount, setNeededAmount] = useState('')
    const [collectedAmount, setCollectedAmount] = useState('')
    const [bankDetails, setBankDetails] = useState('')
    const donateRef = firebase.firestore().collection('donates')

    const navigation = useNavigation();

    const onAddPress = () => {

        const data = {
            patientName,
            patientAge,
            guardianName,
            disease,
            contactNo,
            neededAmount,
            collectedAmount,
            bankDetails,
        };
        donateRef
            .add(data)
            .then(() => {
                navigation.navigate('Donate List', { params: { data } })
            })
            .catch((error) => {
                alert(error)
            });

    }

    //Form Validation
    const checkTextInput = () => {
        //Check for the Name TextInput
        if (!patientName.trim()) {
            alert('Please Enter Patient Name');
            return;
        }
        if (!patientAge.trim()) {
            alert('Please Enter Patient Age');
            return;
        }
        //Check for the Email TextInput
        if (!guardianName.trim()) {
            alert('Please Enter Parent/Guardian Name');
            return;
        }
        if (!disease.trim()) {
            alert('Please Enter Disease');
            return;
        }
        if (!contactNo.trim()) {
            alert('Please Enter Contact No');
            return;
        }
        if (!neededAmount.trim()) {
            alert('Please Enter Needed Amount');
            return;
        }
        if (!collectedAmount.trim()) {
            alert('Please Enter Collected Amount');
            return;
        }
        if (!bankDetails.trim()) {
            alert('Please Enter Bank Details');
            return;
        }
        //Checked Successfully
        //Do whatever you want
        alert('Success');
        onAddPress();
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
                    <Text style={styles.logotext}>ADD DETAILS</Text>
                </View>

                <View style={styles.addFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('HomePage')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.logo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.logotext}>ADD DETAILS</Text>
                    </View>
                </View>

                <View style={styles.inputDonateFormView}>
                    <TextInput
                        style={styles.inputName}
                        placeholder='Patient Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setPatientName(text)}
                        value={patientName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Patient Age (Yrs)'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setPatientAge(text)}
                        value={patientAge}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Parent/Guardian Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setGuardianName(text)}
                        value={guardianName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Disease'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setDisease(text)}
                        value={disease}
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
                        placeholder='Needed Amount (Rs)'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setNeededAmount(text)}
                        value={neededAmount}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Collected Amount (Rs)'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setCollectedAmount(text)}
                        value={collectedAmount}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        keyboardType="numeric"
                    />
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Bank Details'
                        onChangeText={(text) => setBankDetails(text)}
                        value={bankDetails}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => checkTextInput() }>
                        <Text style={styles.buttonTitle}>ADD DETAILS</Text>
                    </TouchableOpacity>
                    {/* <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View> */}
                </View>
            </KeyboardAwareScrollView>
        </View>

    )

}

