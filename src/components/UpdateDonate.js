import React, { useState, useEffect } from 'react'
import { Text, TextInput, View, FlatList, Pressable, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

//import DatePicker from 'react-native-datepicker';


export default function DonateList(props) {

    const initialState = {
        id: '',
        patientName: '',
        patientAge: '',
        guardianName: '',
        disease: '',
        contactNo: '',
        neededAmount: '',
        collectedAmount: '',
        bankDetails: ''

    }

    const [donate, setDonate] = useState(initialState)

    const [loading, setLoading] = useState(true)

    const navigation = useNavigation();



    const getUserById = async (id) => {
        const donateRef = firebase.firestore().collection('donates').doc(id)
        const doc = await donateRef.get()
        const donate = doc.data()
        setDonate({
            ...donate,
            id: doc.id,
        });
        setLoading(false)
    };

    useEffect(() => {
        getUserById(props.route.params.itemId);
    }, []);

    const handleChangeText = (name, value) => {
        setDonate({ ...donate, [name]: value });
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    };

    const updateDonate = async () => {
        const donateRef = firebase.firestore().collection('donates').doc(donate.id)
        await donateRef.set({
            patientName: donate.patientName,
            patientAge: donate.patientAge,
            guardianName: donate.guardianName,
            disease: donate.disease,
            contactNo: donate.contactNo,
            neededAmount: donate.neededAmount,
            collectedAmount: donate.collectedAmount,
            bankDetails: donate.bankDetails

        })
        setDonate(initialState)
        props.navigation.navigate("Donate List");
        alert("Updated successfully")
    }


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
                        <Text style={styles.logotext}>UPDATE DETAILS</Text>
                    </View>
                </View>

                <View style={styles.UpdateInputFormView}>
                    <Text style={styles.updateTextStart}>Patient Name</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Patient Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("patientName", value)}
                        value={donate.patientName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={styles.updateText}>Patient Age</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Patient Age (Yrs)'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("patientAge", value)}
                        value={donate.patientAge}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={styles.updateTextStart}>Parent/Guardian Name</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Parent/Guardian Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("guardianName", value)}
                        value={donate.guardianName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={styles.updateText}>Disease</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Disease'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("disease", value)}
                        value={donate.disease}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />

                    <Text style={styles.updateText}>Contact No</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Contact No'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("contactNo", value)}
                        value={donate.contactNo}
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
                    <Text style={styles.updateText}>Needed Amount (Rs) </Text>
                    <TextInput
                        style={styles.UpdateInputNameStart}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Needed Amount (Rs)'
                        onChangeText={(value) => handleChangeText("neededAmount", value)}
                        value={donate.neededAmount}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        keyboardType="numeric"
                    />
                    <Text style={styles.updateText}>Collected Amount (Rs) </Text>
                    <TextInput
                        style={styles.UpdateInputNameStart}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Collected Amount (Rs)'
                        onChangeText={(value) => handleChangeText("collectedAmount", value)}
                        value={donate.collectedAmount}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        keyboardType="numeric"
                    />
                    <Text style={styles.updateText}>Bank Details</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.UpdateInputName}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Bank Details'
                        onChangeText={(value) => handleChangeText("bankDetails", value)}
                        value={donate.bankDetails}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.UpdateEventBtn}
                        onPress={() => updateDonate()}>
                        <Text style={styles.buttonTitle}>UPDATE DETAILS</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>


        </View>

    )

}

