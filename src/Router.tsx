import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackNav } from "./navigation/MainStackNav";
import { ListScreen } from "./screens/ListScreen";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { DetailsScreen, DetailsScreenProps } from "./screens/DetailsScreen";
import { ReadMoreModal, ReadMoreModalProps } from "./screens/ReadMoreModal";

export interface RootParamList extends ParamListBase {
    [MainStackNav.listScreen]: {};
    [MainStackNav.detailsScreen]: DetailsScreenProps;
    [MainStackNav.readMoreModal]: ReadMoreModalProps;
}

const MainNavigator = createStackNavigator<RootParamList>();

export const MainStack = () => (
    <MainNavigator.Navigator initialRouteName={MainStackNav.listScreen}>
        <MainNavigator.Screen component={ListScreen} name={MainStackNav.listScreen} options={{ headerTitle: "Albums" }} />
        <MainNavigator.Screen component={DetailsScreen} name={MainStackNav.detailsScreen} options={({ route }: { route: RouteProp<RootParamList, MainStackNav.detailsScreen>}) => ({ headerTitle: route.params.item.title })}/>
        <MainNavigator.Screen component={ReadMoreModal} name={MainStackNav.readMoreModal} options={{ presentation: "modal", headerBackTitleVisible: false, headerTitle: "More Info" }} />
    </MainNavigator.Navigator>
)