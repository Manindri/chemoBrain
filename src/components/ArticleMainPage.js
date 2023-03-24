
import { Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from './HomeIcon';

export default function ArticleMainPage() {

    const route = useRoute();

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={homeStyle.circle} />
            <View style={homeStyle.circleGrey} />
            <Text style={styles.EventMainTitle}>MANAGE ARTICLES</Text>
            <View style={styles.MainEventImageView}>
            <Image
                // style={styles.MainEventImageView}
                source={require('./articleImage.png')}
            />
            </View>
            <View>
            <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('Add Article')}>
                <View style={styles.EventMainContainer1}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.EventMainText}>ADD NEW ARTICLE</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('Article List')}>
                <View style={styles.EventMainContainer2}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.EventMainText}>VIEW ALL ARTICLES</Text>
                    </View>
                </View>
            </TouchableOpacity>
            </View>
            <View style={homeStyle.BottomCircle} />
            <View style={homeStyle.BottomCircleGrey} />
            <HomeIcon/>
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
        backgroundColor: 'white',
        borderRadius: 150,
        marginLeft: -320,
        marginTop: -15,
    },
    circleGrey: {
        height: 150,
        width: 420,
        backgroundColor: '#070D1A',
        borderRadius: 150,
        marginLeft: -10,
        marginTop: -250,
    },
    BottomCircle: {
        height: 220,
        width: 220,
        backgroundColor: '#070D1A',
        borderRadius: 150,
        marginLeft: 250,
        marginTop: 20,
    },
    BottomCircleGrey: {
        height: 150,
        width: 150,
        backgroundColor: '#00B6FF',
        borderRadius: 150,
        marginLeft: 100,
        marginTop: -150,
    }
})
