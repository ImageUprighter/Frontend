// Sidebar.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Sidebar = () => {
  return (
    <View>
      <Text>Sidebar Content</Text>
      {/* Add your sidebar navigation items here */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Sidebar;
