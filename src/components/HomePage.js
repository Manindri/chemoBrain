
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function ArticleList() {

    const route = useRoute();

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={homeStyle.circle}/>
            <View style={homeStyle.circleGrey}/>
            <Text style={homeStyle.welcomeText}>WELCOME TO </Text>
            <View style={homeStyle.logoView}>
                <Image
                    style={homeStyle.homeLogo}
                    source={require('./appLogo.png')}
                />
                <Text style={homeStyle.appName}>Chemo Brain </Text>
            </View>
            <TouchableOpacity
                style={homeStyle.getStartBtn}
                onPress={() => navigation.navigate('Add User')}>
                <Text style={homeStyle.getStartTitle}>GET STARTED</Text>
            </TouchableOpacity>
        </View>

    )

}

const homeStyle = StyleSheet.create({
    welcomeText: {
        color: '#070D1A',
        fontSize: 50,
        marginTop: 120,
        fontWeight: 'bold',
    },
    appName: {
        color: '#070D1A',
        fontSize: 35,
        marginTop: -30,
        marginLeft: 40,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    logoView: {
        height: 270,
        width: 270,
        backgroundColor: 'none',
        marginTop: 50,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#070D1A',
        // elevation: 20,
        // shadowColor:'blue',
    },
    homeLogo: {
        marginTop: -25,
        marginLeft: 5,
        height: 250,
        width: 250,
    },
    getStartBtn: {
        marginTop: 50,
        // backgroundColor: '#00B6FF',
        backgroundColor: '#070D1A',
        width: 250,
        height: 50,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: 'center',
    },
    getStartTitle: {
        fontSize: 25,
        // color: '#070D1A'
        color: 'white'
    },
    circle: {
        height: 200,
        width: 200,
        backgroundColor: '#070D1A',
        borderRadius: 150,
        marginLeft: -320,
        marginTop: -15,
    },
    circleGrey: {
        height: 150,
        width: 150,
        backgroundColor: '#00B6FF',
        borderRadius: 150,
        marginLeft: -150,
        marginTop: -250,
    }
})
