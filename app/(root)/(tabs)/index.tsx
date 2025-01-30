import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Fetchhouses } from "@/api/mockapi";
import House from "@/components/houselistitem";
import tw from "twrnc";


export default function Index() {
  const {data , isLoading , error} = useQuery({
    queryKey: ['mockapi'],
    queryFn: Fetchhouses,
  })

  if(isLoading){
    return <ActivityIndicator/>
  }

  if (error) return <Text>{error.message}</Text>;

  return (
    <View style = {tw`flex: 1`}>
      <FlatList
          data = {data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <House home={item}/>}
      />
    </View>
  );
}


