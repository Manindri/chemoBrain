import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { firebase } from "../firebase/config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


export default function AddArticle() {

    const [articleName, setArticleName] = useState('')
    const [publishedDate, setPublishedDate] = useState('')
    const [writtenBy, setWrittenBy] = useState('')
    const [content, setContent] = useState('')
    const articleRef = firebase.firestore().collection('articles')

    const navigation = useNavigation();

    const onAddPress = () => {

        const data = {
            articleName,
            publishedDate,
            writtenBy,
            content,
        };
        articleRef
            .add(data)
            .then(() => {
                navigation.navigate('Article List', { params: { data } })
            })
            .catch((error) => {
                alert(error)
            });

    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Login')} style={styles.backbtn} />
                    <Image
                        style={styles.logo}
                        source={require('./colorLogo.png')}
                    />
                    <Text style={styles.logotext}>ADD NEW ARTICLE</Text>
                </View>

                <View style={styles.addFormRec}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="arrowleft" size={24} color="#fff" onPress={() => navigation.navigate('Pure Drop')} style={styles.backbtn} /> */}
                        <Image
                            style={styles.logo}
                            source={require('./colorLogo.png')}
                        />
                        <Text style={styles.logotext}>ADD NEW ARTICLE</Text>
                    </View>
                </View>

                <View style={styles.ArticleInputFormView}>
                    <TextInput
                        style={styles.inputName}
                        placeholder='Article Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setArticleName(text)}
                        value={articleName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Published Date - dd/mm/yyyy'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setPublishedDate(text)}
                        value={publishedDate}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Written By'
                        onChangeText={(text) => setWrittenBy(text)}
                        value={writtenBy}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        multiline
                        numberOfLines={30}
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Content'
                        onChangeText={(text) => setContent(text)}
                        value={content}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onAddPress()}>
                        <Text style={styles.buttonTitle}>ADD ARTICLE</Text>
                    </TouchableOpacity>
                    {/* <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View> */}
                </View>
            </KeyboardAwareScrollView>
        </View>

    )

}

