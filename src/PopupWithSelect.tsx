import React, { useState } from 'react';
import { Modal, Text, FlatList, Pressable, View, TouchableOpacity } from 'react-native';
import { popupStyle } from '../styles/popup.style';

interface SingleSelectFlatListProps {
    data: string[];
}

const PopupWithSelectOptions: React.FC<SingleSelectFlatListProps> = ({ data }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleItemPress = (item: string) => {
        setSelectedItem(item);
    };

    const renderItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={[
                popupStyle.item,
                item === selectedItem ? popupStyle.selectedItem : null,
            ]}
            onPress={() => handleItemPress(item)}
        >
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={popupStyle.container}>
            <Pressable style={popupStyle.showModalButton} onPress={() => setModalVisible(true)}>
                <Text style={popupStyle.textStyle}>Show Modal</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={popupStyle.modalBackground}>
                    <View style={popupStyle.modalContent}>
                        <Text style={popupStyle.modalText}>Hello World!</Text>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.toString()}
                            extraData={selectedItem} // Re-render the list when the selectedItem changes
                        />
                        <Text>Selected Item: {selectedItem}</Text>
                        <Pressable style={popupStyle.closeModalButton} onPress={() => setModalVisible(false)}>
                            <Text style={popupStyle.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default PopupWithSelectOptions;

