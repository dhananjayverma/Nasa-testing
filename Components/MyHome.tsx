import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenList_data } from '../App';


const HomePage: React.FC = () => {
  const [myAsteroidId, setmyAsteroidId] = React.useState<string>('');
  const URL_ID: string = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY`;
  const [Loading, setLoadingData] = React.useState<boolean>(false);
  const navlink = useNavigation<NativeStackNavigationProp<ScreenList_data,"Home">>();

  const fetch_data = async () => {
    try {
      setLoadingData(true)
      const res = await axios.get(URL_ID)
      setmyAsteroidId(await res.data.near_earth_objects[Math.floor(Math.random() * 10)].id)
      setLoadingData(false)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={s`h-full flex-col justify-center items-center`}>
      {
        !Loading ?
          <View>
            <TextInput style={styles.container} onChangeText={(e) =>setmyAsteroidId(e)}
              placeholder='Enter Asteroid Id here ' value={myAsteroidId ?myAsteroidId : undefined} />
            <View style={styles.Wrap_btn}>
            <TouchableOpacity style={styles.Btn}>
             <Text style={{ color: '#fff', fontSize: 19 }} onPress={fetch_data}>Random Asteriod</Text>
              </TouchableOpacity>

              <TouchableOpacity style={myAsteroidId? styles.Btn : styles.disabled_btn} disabled={!myAsteroidId? true : false}>
                <Text style={{ color: '#fff', fontSize: 19 }}
                  onPress={() => {
                    if (myAsteroidId) navlink.navigate('Asteroid', { AsteroidData:myAsteroidId })
                }}>Submit</Text>
              </TouchableOpacity>

        </View>
          </View>:<View style={s`h-full flex-col justify-center items-center`}>
            <Text style={{ fontSize: 19 }}>Loading....</Text></View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:322,
    height: 52,
    borderWidth:2,
    borderColor: 'blue',
    paddingLeft:15,
    margin:6,
    fontSize:20,
  },
  Wrap_btn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop:9,
  },
  Btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 322,
    height: 52,
    backgroundColor: 'blue',
    margin:6,
  },
  disabled_btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height:52,
    backgroundColor: 'grey',
    margin:6,
  },
})
export default HomePage;


