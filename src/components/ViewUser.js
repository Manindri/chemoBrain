import React,{useState,useEffect} from 'react'
import { Text, View,FlatList,Pressable,Image} from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export default function ViewUser(props) {

    const [user , setUser] = useState({
        id: '',
        name: '',
        contact: '',
        dob: '',
        email: '',
        password: ''
    })

    const getUserById = async (id) => {
        const userRef = firebase.firestore().collection('appUsers').doc(id)
        const doc = await userRef.get()
        const user = doc.data()
        setUser({
            ...user,
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
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('User List')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                        source={require('./colorLogo.png')}
                    />
                    <Text style={styles.listlogotext}>Profile</Text>
                </View>

                <View>
                <Text style={styles.viewText}>{user.name}</Text>
                <Text style={styles.viewText}>{user.contact}</Text>
                <Text style={styles.viewText}>{user.dob}</Text>
                <Text style={styles.viewText}>{user.email}</Text>
                <Text style={styles.viewText}>{user.password}</Text>
                </View>
            
            </KeyboardAwareScrollView>
           
           
        </View>

    )

}

