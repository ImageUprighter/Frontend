// Sidebar.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Sidebar = ({ navigation }) => {
  return (
    <View>
      <Text>Settings</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      {/* Add more settings/options here */}
    </View>
  );
};

export default Sidebar;
