import { createNavigationContainerRef } from "@react-navigation/native";
import { MainStackNav } from "../navigation/MainStackNav";
import { RootParamList } from "../Router";

export type ScreenName = MainStackNav;

export const navigationRef = createNavigationContainerRef<RootParamList>();

export const navigateToDetails = (params: RootParamList[MainStackNav.detailsScreen]) => {
    navigate(MainStackNav.detailsScreen, params);
};

export const navigateToReadMoreModal = (params: RootParamList[MainStackNav.readMoreModal]) => {
    navigate(MainStackNav.readMoreModal, params);
};

export const goBack = () => {
    if (navigationRef) {
        navigationRef.current.goBack();
    } else {
        console.debug("NavigationService navigatorRef is missing");
    }
};

export const navigate = (screenName: ScreenName, params?: object) => {
    if (navigationRef) {
        navigationRef.current.navigate(screenName, params);
    } else {
        console.debug("NavigationService navigatorRef is missing");
    }
};