import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Pressable, Image, ImageEditor } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function ArticleList() {

    const route = useRoute();
    const [articles, setArticles] = useState([]);
    const articleRef = firebase.firestore().collection('articles');

    const navigation = useNavigation();


    useEffect(async () => {
        articleRef
            // order by time of creating
            //.orderBy('createdAt', 'desc')
            // fetch todos in realtime
            .onSnapshot(
                querySnapshot => {
                    const articles = []
                    // loop through the saved todos
                    querySnapshot.forEach((doc) => {
                        const article = doc.data()
                        article.id = doc.id,

                            articles.push(article)
                    });
                    // set the todos to the state
                    setArticles(articles)
                },
                error => {
                    // log any error
                    console.error(error);
                }
            )
    }, []);

    const deleteArticle = (article) => {
        // delete article from firestore db
        articleRef
            .doc(article.id)
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
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Add Article')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                        // source={require('./colorLogo.png')}
                    />
                    <Text style={styles.listlogotext}>ARTICLE LIST</Text>
                </View>

                <View style={styles.ListFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Add')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.Listlogo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.Listlogotext}>ARTICLE LIST</Text>
                    </View>
                </View>
                <FlatList
                    style={{ height: '100%' }}
                    data={articles}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <Pressable style={styles.listContainer} onPress={() => navigation.navigate('View Article', { itemId: item.id })}>
                            <View style={styles.innerListContainer}>
                                <Image
                                    style={styles.articleImage}
                                    source={require('./articleImage.png')}
                                />
                                <View style={styles.listText}>
                                    <Text style={styles.listBoxText}>{item.articleName}</Text>
                                    <Text style={styles.listBoxText}>{item.publishedDate}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign
                                        name="edit"
                                        size={24}
                                        color="#48A3F3"
                                        onPress={() => navigation.navigate('Update Article', { itemId: item.id })}
                                        style={styles.listEditIcon} />

                                    <AntDesign
                                        name="delete"
                                        size={24}
                                        color="#48A3F3"
                                        onPress={() => deleteArticle(item)}
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

