import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Button, Alert} from 'react-native';
import { houses } from '@/entities/houses';
import * as Location from 'expo-location';

interface houseprop{
    home : houses;
}


const House = ({home} : houseprop) => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [distance, setDistance] = useState(0);
    const handlepress = () => {
        Alert.alert('Unlock Home', 'Success', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
    }
    useEffect(() => {
        async function getCurrentLocation() {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        }
    
        getCurrentLocation();
      }, []);

      
    useEffect(() => {
        if (location) {
          const lat1 = location.coords.latitude;
          const lon1 = location.coords.longitude;
          const lat2 = home.latitude;
          const lon2 = home.longitude;
          const toRad = (value : number) => (value * Math.PI) / 180;
          const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
                const r = 6371;
                const dLat = toRad(lat2 - lat1);
                const dLon = toRad(lon2 - lon1);
                const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const d = r * c;
                return d;
          };
          const newDistance = haversine(lat1, lon1, lat2, lon2);
          setDistance(newDistance);
        }
      }, [location]);
    return ( 
        <Pressable style = {{flex : 1}}>
        <View style={styles.postContainer}>
            <Image source={{uri: home.imagerUrl }} style={styles.image}/>
            <Text style={styles.postTitle}>{home.description}</Text>
            <Text style={styles.postBody}> Distance : {distance.toFixed(2)} km</Text>
            {distance > 0.3 ? (
                <Text style={styles.errorText}>You are too far to unlock the home</Text>
            ) : (
                <Button onPress={handlepress} title="Unlock Home" color="#841584" />
            )}
        </View>
        </Pressable>
    );
};
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    postContainer: {
        padding: 15, 
        marginVertical: 5, 
        backgroundColor: "#f9f9f9", 
        borderRadius: 5, 
        alignItems: "center" 
    },
    postTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    postBody: {
      fontSize: 14,
      marginTop: 8,
    },
    image:{
        borderRightWidth :350, 
        height: 150, 
        borderRadius: 20, 
        marginBottom: 10
    },
    errorText: {
        fontSize: 18,
        color: "red",
    },
  });

export default House;