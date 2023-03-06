import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ScreenList_data } from '../App';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {s} from 'react-native-wind'
type Asteroid_Details = {
    id: string | number | undefined;
    name: string | undefined;
    nasa_jpl_url: string | undefined;
    is_potentially_hazardous_asteroid: boolean | string | undefined;
}
const Asteroid_Data: React.FC = () => {
    const [myAsteroidDetails, setMyAsteroidDetails] = React.useState<null | Asteroid_Details >(null)
    const nav = useNavigation<NativeStackNavigationProp<ScreenList_data,"Asteroid">>()
    const { params: { AsteroidData } } = useRoute<RouteProp<ScreenList_data, "Asteroid">>()
    const token_data: string = `LcVoGKtf8i9zOPs8IejcjR5IZgZO6XMQhMAeMaDl`
    const URL_ID: string = `https://api.nasa.gov/neo/rest/v1/neo/${AsteroidData}?api_key=${token_data}`
    const fetch_data= async () => {
        try {
            const { data } = await axios.get(URL_ID)
            setMyAsteroidDetails(data)
        } catch (err) {
         nav.navigate("Home")
    }}
    React.useEffect(() =>{
        fetch_data()
    }, [])

   return (
            <View style={s`h-full flex-col p-5`}>
                <Text style={styles.text}>ID: <Text style={styles.my_text}>{myAsteroidDetails?.id}</Text></Text>
                <Text style={styles.text}>Name: <Text style={styles.my_text}>{myAsteroidDetails?.name}</Text></Text>
                <Text style={styles.text}>NASA JPL URL: <Text style={styles.my_text}>{myAsteroidDetails?.nasa_jpl_url}</Text></Text>
                <Text style={styles.text}>Is Potentially Hazardous Asteroid: <Text style={styles.my_text}>{`${myAsteroidDetails?.is_potentially_hazardous_asteroid}`}</Text></Text>
            </View>
        )
    }
const styles = StyleSheet.create({
    text: {
        fontSize:20,
        margin:7,
        color: 'blue',
        lineHeight:28,
    },
    my_text: {
        fontSize:19,
        color: 'black'
    }
})
export default Asteroid_Data;