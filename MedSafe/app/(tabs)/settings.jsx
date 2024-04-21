import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

import profilePic from '../../assets/images/dp.png';

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Tab() {
    return (
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.image}
                        source={profilePic}
                        placeholder={blurhash}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.name}>Viral Damaniya</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', padding: 4, marginTop: 4}}>
                    <View style={{}}>
                        <Text><MaterialCommunityIcons name="gender-male-female" size={16} color="black" /> Male</Text>
                        <Text style={{marginTop: 8}}><MaterialCommunityIcons name="calendar-account" size={16} color="black" /> 25 Yrs</Text>
                    </View>
                    <View style={{ marginLeft: 20}}>
                        <Text><MaterialCommunityIcons name="human-male-height-variant" size={16} color="black" /> 5.75 ft </Text>
                        <Text style={{marginTop: 8}}><MaterialCommunityIcons name="weight" size={16} color="black" /> 66.6 kgs </Text>
                    </View>
                </View>
            </View>
            <View style={styles.profileBelow}>
                <View style={{flexDirection: 'row', alignContent: 'flex-start', paddingVertical: 12}}>
                    <Text style={styles.head}><MaterialCommunityIcons name="allergy" size={16} color="black" />    Known Allergies :</Text>
                    <View>
                        <Text style={{fontSize: 16, marginBottom: 4}}> Iloperidone (Drug)</Text>
                        <Text style={{fontSize: 16}}> Peanut (Food)</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignContent: 'flex-start', paddingVertical: 12 }}>
                    <Text style={styles.head}><FontAwesome6 name="pills" size={16} color="black" />    Medical Conditions :</Text>
                    <View>
                        <Text style={{fontSize: 16, marginBottom: 4}}> Diabetic</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignContent: 'flex-start', paddingVertical: 12 }}>
                    <Text style={styles.head}><MaterialIcons name="bloodtype" size={16} color="black" />    Blood Group :</Text>
                    <View>
                        <Text style={{fontSize: 16, marginBottom: 4}}> A+</Text>
                    </View>
                </View>
                <Button style={{borderRadius: 12,
        marginTop: 12,
        padding: 10,
        elevation: 2,
        backgroundColor: '#3b7be8',}} title='Edit Profile'/>
            </View>
            <TouchableOpacity style={styles.history}>
                <Text style={{fontSize: 16}}>Prescription History</Text><MaterialCommunityIcons name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.history}>
                <Text style={{fontSize: 16, color:'blue'}}>Log Out</Text><MaterialCommunityIcons name="logout" size={20} color="blue" />
            </TouchableOpacity>
            <View style={{alignItems:'center', padding: 16}}>
                <Text style={{fontSize: 10}}>MedSafe 2024</Text>
                <Text style={{fontSize: 10, marginTop: 4}}>Made with ❤️ at LAHacks!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#a6c7ff'
    },
    profileContainer: {
        borderWidth: 2,
        width: 100,
        aspectRatio: 1,
        borderRadius: 50,
        borderColor: 'black',
    },
    profileSection: {
        width: "100%",
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 0.5,
    },
    image: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        borderRadius: 50,
    },
    name: {
        fontSize: 28,
        color: "black",
        paddingTop: 12,
    },
    profileBelow: {
        elevation: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        backgroundColor: '#dfe8f8',
    },
    genderDob: {
        fontSize: 12,
        padding: 4,
    },
    head: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    history: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#d3e3ff',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
