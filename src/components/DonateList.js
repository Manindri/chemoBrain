import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Pressable, Image, ImageEditor } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from './HomeIcon';

export default function DonateList() {

    const route = useRoute();
    const [donates, setDonates] = useState([]);
    const donateRef = firebase.firestore().collection('donates');

    const navigation = useNavigation();


    useEffect(async () => {
        donateRef
            // order by time of creating
            //.orderBy('createdAt', 'desc')
            // fetch todos in realtime
            .onSnapshot(
                querySnapshot => {
                    const donates = []
                    // loop through the saved todos
                    querySnapshot.forEach((doc) => {
                        const donate = doc.data()
                        donate.id = doc.id,
 
                            donates.push(donate)
                    });
                    // set the todos to the state
                    setDonates(donates)
                },
                error => {
                    // log any error
                    console.error(error);
                }
            )
    }, []);

    const deleteDonate = (donate) => {
        // delete donate from firestore db
        donateRef
            .doc(donate.id)
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
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Add Donate')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                        source={require('./colorLogo.png')}
                    />
                    <Text style={styles.listlogotext}>DONATE LIST</Text>
                </View>

                <View style={styles.ListFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Add')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.Listlogo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.Listlogotext}>DONATE LIST</Text>
                    </View>
                </View>
                <FlatList
                    style={{ height: '100%' }}
                    data={donates}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <Pressable style={styles.listContainer} onPress={() => navigation.navigate('View Donate', { itemId: item.id })}>
                            <View style={styles.innerListContainer}>
                                <Image
                                    style={styles.eventImage}
                                    source={require('./donation.png')}
                                />
                                <View style={styles.listText}>
                                    <Text style={styles.listBoxText}>{item.patientName}</Text>
                                    <Text style={styles.listBoxText}>{item.patientAge} yrs</Text>
                                    <Text style={styles.listBoxText}>{item.contactNo}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign
                                        name="edit"
                                        size={24}
                                        color="#48A3F3"
                                        onPress={() => navigation.navigate('Update Donate', { itemId: item.id })}
                                        style={styles.listEditIcon} />

                                    <AntDesign
                                        name="delete"
                                        size={24}
                                        color="#48A3F3"
                                        onPress={() => deleteDonate(item)}
                                        style={styles.listDeleteIcon} />
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

