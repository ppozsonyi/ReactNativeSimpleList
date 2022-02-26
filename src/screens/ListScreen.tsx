import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Button } from "../components/Button";
import { TextElements } from "../components/TextElements";
import { Item } from "../models/Api";
import { navigateToDetails } from "../services/NavigationService";
import { API_ENDPOINTS } from "../const/Api";
import { getDataFromEndpoint } from "../services/ApiSerrvice";
import { LoadingModal, LoadingState } from "../components/LoadingModal";

export const ListScreen: React.FC = () => {
    const [list, setList] = useState<Item[]>([]);
    const [loadingModalVisible, setLoadingModalVisible] = useState(false);
    const [loadingStates, setLoadingStates] = useState(API_ENDPOINTS.map(() => LoadingState.loading));
    const [sortOrder, setSortOrder] = useState<"Ascending" | "Descending">("Ascending");

    const loadList = async () => {
        const newList = new Array(...list);

        const getData = async () => { 
            setLoadingStates(API_ENDPOINTS.map(() => LoadingState.loading));
            const newLoadingStates = new Array(...loadingStates);    

            setLoadingModalVisible(true);

            for (let index in API_ENDPOINTS) {
                try {
                    const apiData = await getDataFromEndpoint(API_ENDPOINTS[index]);
                    apiData.data.items.forEach((item) => {
                        if (!newList.find((value) => JSON.stringify(value) ===JSON.stringify(item))) {
                            newList.push(item);
                        }
                    })
                    newLoadingStates[index] = LoadingState.success; 
                } catch (error) {
                    newLoadingStates[index] = LoadingState.failed;
                } finally {
                    setLoadingStates(newLoadingStates);

                    if (newLoadingStates.every((value) => value !== LoadingState.loading)) {
                        setTimeout(() => {
                            setLoadingModalVisible(false);
                        }, 1000);
                    }
                }
            }
        };

        await getData();

        setList(newList.sort((a, b) => a.title > b.title ? 1 : -1));
    }

    const clearList = () => {
        setList([]);
    }

    const onSortPress = () => {
        const newList = new Array(...list);
        if (sortOrder === "Ascending") {
            setList(newList.sort((a, b) => a.title < b.title ? 1 : -1));
            setSortOrder("Descending");
        } else {
            setList(newList.sort((a, b) => a.title > b.title ? 1 : -1));
            setSortOrder("Ascending");
        }
    }

    const renderItem = ({ item }: ListRenderItemInfo<Item>) => (
        <ListItem onPress={() => navigateToDetails({ item })}>
            <TextElements.Info style={{ color: "grey" }}>Album title:</TextElements.Info>
            <TextElements.SubTitle>{item.title}</TextElements.SubTitle>
        </ListItem>
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <FlatList
                    data={list}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 20 }}
                    ListHeaderComponent={() => 
                        <Row>
                            <TextElements.Title>Sort order: </TextElements.Title>
                            <TouchableOpacity onPress={onSortPress}>
                                <TextElements.SubTitle style={{ color: "#3773d4" }}>{sortOrder}</TextElements.SubTitle>
                            </TouchableOpacity>
                        </Row>
                    }
                    ItemSeparatorComponent={() => <ItemSeparator /> }
                    ListEmptyComponent={() => <ListEmptyText>List is empty</ListEmptyText>}
                />
                <ButtonContainer>
                    <Button label="Load" onPress={loadList}/>
                    <Button label="Clear" onPress={clearList} />
                </ButtonContainer>
            </Container>

            <LoadingModal visible={loadingModalVisible} presentationStyle="overFullScreen" transparent loadingStates={loadingStates} />
        </SafeAreaView>
    );
}

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
`;

const ButtonContainer = styled.View`
    padding: 16px;
    flex-direction: row;
    justify-content: space-around;
    border-top-width: 0.2px;
    border-color: grey;
`;

const ListItem = styled.TouchableOpacity`
    background-color: white;
    border-radius: 10px;
    elevation: 10;
    box-shadow: 10px 5px 5px black;
    shadowOpacity: 0.4;
    padding: 16px;
`;

const ItemSeparator = styled.View`
    height: 14px;
`;

const ListEmptyText = styled(TextElements.SubTitle)`
    margin-top: 32px;
    text-align: center;
`;

const Row = styled.View`
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 24px;
    margin-top: 16px;
`;