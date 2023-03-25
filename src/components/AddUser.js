import React,{useState} from 'react'
import { Text, View,TextInput,TouchableOpacity,Image} from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';


export default function AddUser() {

   
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userRef = firebase.firestore().collection('appUsers')

    const navigation = useNavigation();

    const onAddPress = () => {

                const data = {
                    name,
                    contact,
                    dob,
                    email,
                    password
                };
                userRef
                    .add(data)
                    .then(() => {
                        navigation.navigate('Main Page', {params: {data}})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            
    }

    //Form Validation
    const checkTextInput = () => {
        //Check for the Name TextInput
        if (!name.trim()) {
            alert('Please Enter Your Name');
            return;
        }
        //Check for the Email TextInput
        if (!contact.trim()) {
            alert('Please Enter Contact No');
            return;
        }
        if (!dob.trim()) {
            alert('Please Enter DOB');
            return;
        }
        if (!email.trim()) {
            alert('Please Enter Email');
            return;
        }
        if (!password.trim()) {
            alert('Please Enter Password');
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
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Pure Drop')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                    />
                    <Text style={styles.logotext}>REGISTER HERE</Text>
                </View>

                <View style={styles.addFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('HomePage')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.logo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.logotext}>REGISTER HERE</Text>
                    </View>
                </View>

                <View style={styles.UpdateInputFormView}>
                
                <TextInput
                    style={styles.inputName}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setName(text)}
                    value={name}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Contact Number'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setContact(text)}
                    value={contact}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Date Of Birth - dd/mm/yyyy'
                    onChangeText={(text) => setDob(text)}
                    value={dob}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Email'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                 <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.UpdateEventBtn}
                    onPress={() => checkTextInput()}>
                    <Text style={styles.buttonTitle}>REGISTER</Text>
                </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>

    )

}

