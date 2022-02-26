import React from "react";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { TextElements } from "./TextElements";

type Props = { label: string } & TouchableOpacityProps;

export const Button = ({ label, ...touchableProps }: Props) => {
    return (
        <ButtonComponent {...touchableProps}>
            <TextElements.Info style={{ color: "white" }}>{label}</TextElements.Info>
        </ButtonComponent>
    );
}

const ButtonComponent = styled(TouchableOpacity)`
    justify-content: center;
    align-items: center;
    padding: 8px;
    width: 112px;
    background-color: grey;
    border-radius: 24px;
`;