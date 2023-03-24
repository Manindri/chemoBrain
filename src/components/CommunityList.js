import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Pressable, Image, ImageEditor } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from './HomeIcon';

export default function CommunityList() {

    const route = useRoute();
    const [communities, setCommunities] = useState([]);
    const communityRef = firebase.firestore().collection('communities');

    const navigation = useNavigation();


    useEffect(async () => {
        communityRef
            // order by time of creating
            //.orderBy('createdAt', 'desc')
            // fetch todos in realtime
            .onSnapshot(
                querySnapshot => {
                    const communities = []
                    // loop through the saved todos
                    querySnapshot.forEach((doc) => {
                        const community = doc.data()
                        community.id = doc.id,

                            communities.push(community)
                    });
                    // set the todos to the state
                    setCommunities(communities)
                },
                error => {
                    // log any error
                    console.error(error);
                }
            )
    }, []);

    const deleteCommunity = (community) => {
        // delete community from firestore db
        communityRef
            .doc(community.id)
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
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Add Community')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                    />
                    <Text style={styles.listlogotext}>COMMUNITY LIST</Text>
                </View>

                <View style={styles.ListFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Add')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.Listlogo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.Listlogotext}>COMMUNITY LIST</Text>
                    </View>
                </View>
                <FlatList
                    style={{ height: '100%' }}
                    data={communities}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <Pressable style={styles.listContainer} onPress={() => navigation.navigate('View Community', { itemId: item.id })}>
                            <View style={styles.innerListContainer}>
                                <Image
                                    style={styles.communityImage}
                                    source={require('./communityImage.png')}
                                />
                                <View style={styles.listText}>
                                    <Text style={styles.listBoxText}>{item.communityName}</Text>
                                    <Text style={styles.listBoxText}>{item.address}</Text>
                                    <Text style={styles.listBoxText}>{item.contactNo}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign
                                        name="edit"
                                        size={24}
                                        color="#48A3F3"
                                        onPress={() => navigation.navigate('Update Community', { itemId: item.id })}
                                        style={styles.listEditIcon} />

                                    <AntDesign
                                        name="delete"
                                        size={24}
                                        color="#48A3F3"
                                        onPress={() => deleteCommunity(item)}
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

