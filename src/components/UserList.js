import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Pressable, Image, ImageEditor } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function UserList() {

    const route = useRoute();
    const [users, setUsers] = useState([]);
    const userRef = firebase.firestore().collection('appUsers');

    const navigation = useNavigation();


    useEffect(async () => {
        userRef
            // order by time of creating
            //.orderBy('createdAt', 'desc')
            // fetch todos in realtime
            .onSnapshot(
                querySnapshot => {
                    const users = []
                    // loop through the saved todos
                    querySnapshot.forEach((doc) => {
                        const user = doc.data()
                        user.id = doc.id,

                            users.push(user)
                    });
                    // set the todos to the state
                    setUsers(users)
                },
                error => {
                    // log any error
                    console.error(error);
                }
            )
    }, []);

    const deleteUser = (user) => {
        // delete article from firestore db
        userRef
            .doc(user.id)
            .delete()
            .then(() => {
                // show a successful alert
                alert("Deleted successfully");
            })
            .catch(error => {
                // show an error alert
                alert(error);
            })
    }


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Add User')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                    />
                    <Text style={styles.listlogotext}>MY PROFILE</Text>
                </View>

                <View style={styles.ListFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Add')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.Listlogo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.Listlogotext}>MY PROFILE</Text>
                    </View>
                </View>
                <FlatList
                    style={{ height: '100%', textAlign: "center" }}
                    data={users}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <Pressable style={styles.listContainer} onPress={() => navigation.navigate('User List', { itemId: item.id })}>
                            <View style={styles.ProfileInnerListContainer}>
                                <Image
                                    style={styles.profileImage}
                                    source={require('./profile.png')}
                                />
                                <View style={styles.listText}>
                                    <Text style={styles.listBoxText}> Name : {item.name}
                                    </Text>
                                    <Text style={styles.listBoxText}> Email : {item.email}
                                    </Text>
                                    <Text style={styles.listBoxText}> DOB : {item.dob}
                                    </Text>
                                    <Text style={styles.listBoxText}> Contact No : {item.contact}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign
                                        name="edit"
                                        size={24}
                                        color="#48A3F3"
                                        onPress={() => navigation.navigate('Update User', { itemId: item.id })}
                                        style={styles.UserEditIcon} />
                                    <AntDesign
                                        name="delete"
                                        size={24}
                                        color="#48A3F3"
                                        onPress={() => deleteUser(item)}
                                        style={styles.UserDeleteIcon} />
                                </View>

                            </View>

                        </Pressable>

                    )}
                >
                </FlatList>
            </KeyboardAwareScrollView>
        </View>

    )

}

