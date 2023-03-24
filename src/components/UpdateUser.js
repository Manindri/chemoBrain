import React,{useState,useEffect} from 'react'
import { Text, TextInput, View,FlatList,Pressable,Image, ActivityIndicator,TouchableOpacity} from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

//import DatePicker from 'react-native-datepicker';


export default function UpdateUser(props) {

    const initialState = {
        id: '',
        name: '',
        contact: '',
        dob: '',
        email: '',
        password: ''

    }

    const [user , setUser] = useState(initialState)

    const [loading , setLoading] = useState(true)

    const navigation = useNavigation();

    

    const getUserById = async (id) => {
        const userRef = firebase.firestore().collection('appUsers').doc(id)
        const doc = await userRef.get()
        const user = doc.data()
        setUser({
            ...user,
            id: doc.id,
        });
        setLoading(false)
    };

    useEffect(() => {
        getUserById(props.route.params.itemId);
    }, []);

    const handleChangeText = (name, value) => {
        setUser({...user, [name]: value});
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    };

    const updateUser = async () => {
        const userRef = firebase.firestore().collection('appUsers').doc(user.id)
        await userRef.set({
            name: user.name,
            contact: user.contact,
            dob: user.dob,
            email: user.email,
            password: user.password
        })
        setUser(initialState)
        props.navigation.navigate("User List");
        alert("Updated successfully")
    }

    
    return (
        <View style={styles.container}>
             <KeyboardAwareScrollView 
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('User List')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                        source={require('./colorLogo.png')}
                    />
                    <Text style={styles.listlogotext}>UPDATE PROFILE</Text>
                </View>

                <View style={styles.addFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Pure Drop')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.logo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.logotext}>UPDATE PROFILE</Text>
                    </View>
                </View>

                <View style={styles.UpdateInputFormView}>
                <Text style={styles.updateTextStart}>User Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder='User Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(value) => handleChangeText("name" , value)}
                    value={user.name}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.updateText}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(value) => handleChangeText("email" , value)}
                    value={user.email}
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
                <Text style={styles.updateText}>Date Of Birth</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Date of Birth'
                    onChangeText={(value) => handleChangeText("dob" , value)}
                    value={user.dob}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.updateText}>Contact No</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Contact Number'
                    onChangeText={(value) => handleChangeText("contact" , value)}
                    value={user.contact}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType='numeric'
                />
                <Text style={styles.updateText}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Password'
                    onChangeText={(value) => handleChangeText("password" , value)}
                    value={user.password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.UpdateEventBtn}
                    onPress={() => updateUser()}>
                    <Text style={styles.buttonTitle}>UPDATE PROFILE</Text>
                </TouchableOpacity>
            </View>
            </KeyboardAwareScrollView>
           
           
        </View>

    )

}

