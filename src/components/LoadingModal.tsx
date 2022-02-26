import React from "react";
import { ActivityIndicator, Modal, ModalProps } from "react-native";
import styled from "styled-components/native";
import { TextElements } from "./TextElements";

export const enum LoadingState {
    loading,
    success,
    failed,
};

type Props = {
    loadingStates: LoadingState[];
} & ModalProps;

export const LoadingModal: React.FC<Props> = ({ loadingStates, ...modalProps }: Props) => {
    const renderStateComponent = (state: LoadingState) => {
        switch (state) {
            case LoadingState.loading:
                return <ActivityIndicator />;
            case LoadingState.success:
                return <TextElements.SubTitle>&#x2705;</TextElements.SubTitle>;
            case LoadingState.failed:
                return <TextElements.SubTitle>&#x274C;</TextElements.SubTitle>;    
        }
    }
    
    return (
        <Modal {...modalProps}>
            <Container>
                <InnerContainer>
                    {loadingStates.map((state, index) => (
                        <Row key={index}>
                            {renderStateComponent(state)}
                            <TextElements.SubTitle>{`API ${index + 1}`}</TextElements.SubTitle>
                        </Row>
                    ))}
                </InnerContainer>
            </Container>
        </Modal>
    );
}

const Container = styled.View`
    flex: 1;
    background-color: rgba(52, 52, 52, 0.8);
    align-items: center;
    justify-content: center;
`;

const InnerContainer = styled.View`
    background-color: white;
    align-items: center;
    justify-content: center;
    border-radius: 36px;
    width: 85%;
    padding-top: 32px;
    padding-bottom: 32px;
`;

const Row = styled.View`
    flex-direction: row;
    margin-bottom: 12px;
`;