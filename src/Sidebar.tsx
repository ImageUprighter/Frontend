// Sidebar.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { sidebarStyle } from '../styles/Sidebar.style'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { imageSliderStore } from '../stores/ImageSlider.store';

interface SidebarProps {
  navigation: any;
}


const Sidebar: React.FC<SidebarProps> = ({ navigation }) => {

  const ReloadData = async() => {

  }

  return (
    <View style={sidebarStyle.sidebarContainer}>

      <TouchableOpacity onPress={imageSliderStore.toggleSidebar} style={sidebarStyle.timesButton}>
        <Icon name="times" size={53} color="black" />
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

        <TouchableOpacity onPress={imageSliderStore.toggleSidebar} style={sidebarStyle.closeButtonContainer}>
          <Text style={sidebarStyle.closeButton}>Close</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Sidebar;
