
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileIcon from './ProfileIcon';

export default function MainPage() {

    const route = useRoute();

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={homeStyle.circle} />
            <View style={homeStyle.circleGrey} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 150 ,marginRight: 15}}>
                <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('Donate Main')}>
                    <View style={styles.MainInnerListContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="donate" style={styles.MainDonateIcon} />
                        </View>
                        <Text style={styles.MainDonateText}>DONATE</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('Article Main')}>
                    <View style={styles.MainInnerListContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="article" style={styles.MainArticleIcon} />
                        </View>
                        <Text style={styles.MainArticleText}>ARTICLES</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: -180, marginRight: 15 }}>
                <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('Event Main')}>
                    <View style={styles.MainInnerListContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="event" style={styles.MainEventIcon} />
                        </View>
                        <Text style={styles.MainEventText}>EVENTS</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('Community Main')}>
                    <View style={styles.MainInnerListContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Foundation name="social-picasa" style={styles.MainCommunityIcon} />
                        </View>
                        <Text style={styles.MainCommunityText}>COMMUNITY</Text>
                    </View>
                </TouchableOpacity>
            </View>          
            <View style={homeStyle.BottomCircle} />
            <View style={homeStyle.BottomCircleGrey} />
            <ProfileIcon/>
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
    logoView: {
        height: 270,
        width: 270,
        backgroundColor: '#070D1A',
        marginTop: 50,
        borderRadius: 50,
        elevation: 20,
        shadowColor: 'blue',
    },
    homeLogo: {
        marginTop: -65,
        marginLeft: -140
    },
    getStartBtn: {
        marginTop: 50,
        backgroundColor: '#00B6FF',
        width: 250,
        height: 50,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: 'center',
    },
    getStartTitle: {
        fontSize: 25,
        color: '#070D1A'
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
    },
    BottomCircle: {
        height: 200,
        width: 200,
        backgroundColor: '#070D1A',
        borderRadius: 150,
        marginLeft: 250,
        marginTop: 245,
    },
    BottomCircleGrey: {
        height: 150,
        width: 150,
        backgroundColor: '#00B6FF',
        borderRadius: 150,
        marginLeft: 100,
        marginTop: -120,
    }
})
