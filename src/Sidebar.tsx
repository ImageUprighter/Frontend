// Sidebar.js

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { sidebarStyle } from '../styles/Sidebar.style'
import { imageSliderStore } from '../stores/ImageSlider.store';
import { observer } from 'mobx-react';
// import Close from '../Icons/close.png';

interface SidebarProps {
    navigation: any;
}


const Sidebar: React.FC<SidebarProps> = observer(({ navigation }) => {

    const ReloadData = async () => {
        await imageSliderStore.fetchImagesFromDirectory();
    }

    return (
        <View style={sidebarStyle.sidebarContainer}>

            <TouchableOpacity onPress={() => imageSliderStore.toggleSidebar()} style={sidebarStyle.timesButton}>
                <Image source={require('../Icons/close.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>

            <View style={sidebarStyle.buttonsContainer}>
                <TouchableOpacity style={sidebarStyle.categoryButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={sidebarStyle.closeButton}>Home</Text>
                </TouchableOpacity>

                <View style={sidebarStyle.line}></View>

                <TouchableOpacity style={sidebarStyle.categoryButton} onPress={() => navigation.navigate('Settings')}>
                    <Text style={sidebarStyle.closeButton}>Settings</Text>
                </TouchableOpacity>

                <View style={sidebarStyle.line}></View>

                <TouchableOpacity style={sidebarStyle.categoryButton} onPress={ReloadData}>
                    <Text style={sidebarStyle.closeButton}>Reload Data</Text>
                </TouchableOpacity>

                <View style={sidebarStyle.line}></View>

                <TouchableOpacity onPress={() => imageSliderStore.toggleSidebar()} style={sidebarStyle.closeButtonContainer}>
                    <Text style={sidebarStyle.closeButton}>Close</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
});

export default Sidebar;
