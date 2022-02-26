import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { Button } from "../components/Button";
import { TextElements } from "../components/TextElements";
import { Item } from "../models/Api";
import { MainStackNav } from "../navigation/MainStackNav";
import { RootParamList } from "../Router";
import { navigateToReadMoreModal } from "../services/NavigationService";

export interface DetailsScreenProps {
    item: Item;
}

export const DetailsScreen: React.FC = () => {
    const route = useRoute<RouteProp<RootParamList, MainStackNav.detailsScreen>>();
    const { item } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <Info>
                    <TextElements.Info style={{ color: "grey" }}>Artist:</TextElements.Info>
                    <TextElements.Title>{item.artist}</TextElements.Title>
                </Info>
                <Info>
                    <TextElements.Info style={{ color: "grey" }}>Label:</TextElements.Info>
                    <TextElements.Title>{item.label}</TextElements.Title>
                </Info>
                <Info>
                    <TextElements.Info style={{ color: "grey" }}>Year:</TextElements.Info>
                    <TextElements.Title>{item.year}</TextElements.Title>
                </Info>

                <Button label="Read More" onPress={() => navigateToReadMoreModal({ item })} style={{ marginTop: 48 }} />
            </Container>
        </SafeAreaView>
    );
}

const Container = styled.View`
    margin: 24px;
    align-items: center;
`;

const Info = styled.View`
    margin-bottom: 18px;
    align-items: center;
`;