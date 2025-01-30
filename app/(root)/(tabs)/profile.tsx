import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from 'react';
import tw from 'twrnc';
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";
import { Alert } from "react-native";
import { Redirect } from "expo-router";

const Profile = () => {
    const { user, refetch } = useGlobalContext();
    const handleLogout = async () => {
        const result = await logout();
        if (result) {
            Alert.alert("success", "You have been logged out successfully")
            refetch();
            return <Redirect href="/" />
        } else {
            Alert.alert("Error", "Error in logout")
        }
    };
    return (
        <SafeAreaView style={tw`h-full bg-white`}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="tw`pb-32 px-7`"
            >
                <View style={tw`flex felx-row items-center justify-between mt-5`}>
                    <Image source={{ uri: user?.avatar }} style={tw`size-10 relative rounded-full`} />
                    <Text style={tw`text-2xl`}>{user?.name}</Text>
                    <Text style={tw`text-xl`}>{user?.email}</Text>
                    <View>
                        <TouchableOpacity onPress={handleLogout} style={tw`bg-white shadow-md shadow-primary-500 rounded-full w-full py-3 px-12 mt-5`}>
                            <View style={tw`items-center justify-center`}>
                                <Text style={tw`text-lg text-black-300 ml-1`}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile