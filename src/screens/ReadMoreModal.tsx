import { useRoute, RouteProp } from "@react-navigation/native";
import React from "react";
import WebView from "react-native-webview";
import { Item } from "../models/Api";
import { MainStackNav } from "../navigation/MainStackNav";
import { RootParamList } from "../Router";

export interface ReadMoreModalProps {
    item: Item;
}

export const ReadMoreModal: React.FC = () => {
    const route = useRoute<RouteProp<RootParamList, MainStackNav.detailsScreen>>();
    const { item } = route.params;
    return (
        <WebView source={{ uri: `https://www.google.com/search?q=${item.artist.split(" ").join("+")}+${item.title.split(" ").join("+")}+album` }} />
    );
}