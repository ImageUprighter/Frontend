// Sidebar.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { sidebarStyle } from './Sidebar.style'
import Icon from 'react-native-vector-icons/FontAwesome5';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: any;
  navigation: any;
}


const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen, navigation }) => {
  return (
    <View style={sidebarStyle.sidebarContainer}>

      <TouchableOpacity onPress={() => setIsSidebarOpen(false)} style={sidebarStyle.timesButton}>
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

        <TouchableOpacity style={sidebarStyle.categoryButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={sidebarStyle.closeButton}>Reload Data</Text>
        </TouchableOpacity>
        
        <View style={sidebarStyle.line}></View>

        <TouchableOpacity onPress={() => setIsSidebarOpen(false)} style={sidebarStyle.closeButtonContainer}>
          <Text style={sidebarStyle.closeButton}>Close</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Sidebar;
