import React, { useState, useEffect } from 'react'
import { Text, TextInput, View, FlatList, Pressable, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

//import DatePicker from 'react-native-datepicker';


export default function ArticleList(props) {

    const initialState = {
        id: '',
        articleName: '',
        publishedDate: '',
        writtenBy: '',
        content: ''

    }

    const [article, setArticle] = useState(initialState)

    const [loading, setLoading] = useState(true)

    const navigation = useNavigation();



    const getUserById = async (id) => {
        const articleRef = firebase.firestore().collection('articles').doc(id)
        const doc = await articleRef.get()
        const article = doc.data()
        setArticle({
            ...article,
            id: doc.id,
        });
        setLoading(false)
    };

    useEffect(() => {
        getUserById(props.route.params.itemId);
    }, []);

    const handleChangeText = (name, value) => {
        setArticle({ ...article, [name]: value });
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    };

    const updateArticle = async () => {
        const articleRef = firebase.firestore().collection('articles').doc(article.id)
        await articleRef.set({
            articleName: article.articleName,
            publishedDate: article.publishedDate,
            writtenBy: article.writtenBy,
            content: article.content

        })
        setArticle(initialState)
        props.navigation.navigate("Article List");
        alert("Updated successfully")
    }


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Article List')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                        source={require('./colorLogo.png')}
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
                        <Text style={styles.logotext}>UPDATE ARTICLE</Text>
                    </View>
                </View>

                <View style={styles.UpdateArticleInputFormView}>
                    <Text style={styles.updateTextStart}>Article Name</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Article Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("articleName", value)}
                        value={article.articleName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={styles.updateText}>Published Date</Text>
                    <TextInput
                        style={styles.UpdateInputName}
                        placeholder='Published Date'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(value) => handleChangeText("publishedDate", value)}
                        value={article.publishedDate}
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
                    <Text style={styles.updateText}>Written By</Text>
                    <TextInput
                        style={styles.UpdateInputNameStart}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Written By'
                        onChangeText={(value) => handleChangeText("writtenBy", value)}
                        value={article.writtenBy}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={styles.updateText}>Content</Text>
                    <TextInput
                        multiline
                        numberOfLines={30}
                        style={styles.UpdateInputName}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Content'
                        onChangeText={(value) => handleChangeText("content", value)}
                        value={article.content}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => updateArticle()}>
                        <Text style={styles.buttonTitle}>UPDATE ARTICLE</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>


        </View>

    )

}

