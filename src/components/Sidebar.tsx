// Sidebar.js

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { sidebarStyle } from '../styles/Sidebar.style'
import { useImageSliderContext } from '../common/context/ImageSliderContext';

interface SidebarProps {
    navigation: any;
}


const Sidebar: React.FC<SidebarProps> = ({ navigation }) => {

    const { fetchImagesFromDirectory, toggleSidebar, pickFolder } = useImageSliderContext();

    useEffect(() => {
        setTimeout(() => {
            toggleSidebar();
        }, 1000 * 60 * 1)
    }, []) // 3 minutes

    const ReloadData = async () => {
        await fetchImagesFromDirectory();
        
    }

    return (
        <View style={sidebarStyle.sidebarContainer}>

            <TouchableOpacity onPress={() => toggleSidebar()} style={sidebarStyle.timesButton}>
                <Image source={require('../../assets/my_close.png')} style={{ width: 30, height: 30 }} />
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

                <TouchableOpacity style={sidebarStyle.categoryButton} onPress={() => pickFolder()}>
                    <Text style={sidebarStyle.closeButton}>Choose a directory</Text>
                </TouchableOpacity>

                <View style={sidebarStyle.line}></View>

                <TouchableOpacity onPress={() => toggleSidebar()} style={sidebarStyle.closeButtonContainer}>
                    <Text style={sidebarStyle.closeButton}>Close</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default Sidebar;
