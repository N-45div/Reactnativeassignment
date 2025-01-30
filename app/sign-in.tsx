import { View , Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';
import { login } from "@/lib/appwrite";
import { Alert } from "react-native";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

const SignIn = () => {
    const {refetch , loading , isLoggedIn} = useGlobalContext();
    if(!loading && isLoggedIn) return <Redirect href="/"/>
    const handlelogin = async() => {
        const result = await login();
        if(result){
            refetch();
        }else{
          Alert.alert('Error','Failed to login')  
        }
    }
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="h-full">
            <View style={tw`px-10`}>
                <Text style={tw`text-3xl font-rubik text-black-300 text-center mt-2`}>Welcome !</Text>
                <Text style={tw`text-3xl font-rubik text-black-300 text-center mt-2`}>Lets get started !</Text>
                <Text style={tw`text-lg font-rubik text-black-200 text-center mt-12`}>Login to your account</Text>
                <TouchableOpacity onPress={handlelogin} style={tw`bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5`}>
                    <View style={tw`flex felx-row items-center justify-center`}>
                        <Text style={tw`text-lg font-rubik-medium text-black-300 ml-2`}>Coninue with Google</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

export default SignIn