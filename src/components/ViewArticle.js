import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Pressable, Image } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function ArticleList(props) {

    const [article, setArticle] = useState({
        id: '',
        articleName: '',
        publishedDate: '',
        writtenBy: '',
        content: ''
    })

    const getUserById = async (id) => {
        const articleRef = firebase.firestore().collection('articles').doc(id)
        const doc = await articleRef.get()
        const article = doc.data()
        setArticle({
            ...article,
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Article List')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                        source={require('./logo.png')}
                    />
                    <Text style={styles.listlogotext}>ARTICLE</Text>
                </View>

                <View style={styles.addFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Pure Drop')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.logo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.logotext}>ARTICLE DETAILS</Text>
                    </View>
                </View>

                <View style={styles.ArticleViewFormView}>
                    <Image
                        style={styles.articleImage}
                        source={require('./articleImage.png')}
                    />
                    <View>
                        <Text style={styles.viewTextArticleName}>{article.articleName}</Text>
                        <Text style={styles.viewTextArticleDate}>Published On - {article.publishedDate}</Text>
                        <Text style={styles.viewTextArticleContent}>{article.content}</Text>
                        <Text style={styles.viewTextArticleWritten}>Written By - {article.writtenBy}</Text>
                    </View>
                </View>

            </KeyboardAwareScrollView>


        </View>

    )

}

