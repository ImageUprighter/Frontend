import React, { useEffect, useState } from 'react';
import { Modal, Text, FlatList, Pressable, View, TouchableOpacity } from 'react-native';
import { popupStyle } from '../styles/popup.style';
import { imageSliderStore } from '../stores/ImageSlider.store';
import { currentTimerKey, AnimationKey, keepScreenOnKey } from '../consts/Key.const'

interface DataOption {
    display: string;
    value: any;
}

interface SingleSelectFlatListProps {
    data: DataOption[] | null;
    title: string | null;
    customData: boolean;
    setModalData: any;
    setModalTitle: any;
}

const PopupWithSelectOptions: React.FC<SingleSelectFlatListProps> = ({ data, title, customData, setModalData, setModalTitle }) => {
    const [selectedItem, setSelectedItem] = useState<DataOption | null>(null);
    const [currentKey, setCurrentKey] = useState<string | null>(null);
    const [changed, setChanged] = useState<boolean>(false);


    useEffect(() => {
        (async () => {
            var given_data: string | null = null;
            if (title === "Display Time") {
                setCurrentKey(currentTimerKey)
                given_data = await imageSliderStore.retrieveData(currentTimerKey);
            }
            else if (title === "Animation Time") {
                setCurrentKey(AnimationKey)
                given_data = await imageSliderStore.retrieveData(AnimationKey);
            }

            if (typeof given_data !== null && data !== null) {
                const my_data_index: number = data.findIndex(element => element.value === given_data)
                if (my_data_index !== -1) {
                    setSelectedItem(data[my_data_index]);
                }
            }

        })();
    }, []);


    const handleItemPress = (item: DataOption) => {
        setSelectedItem(item);
        setChanged(true);
    };

    const renderItem = ({ item }: { item: DataOption }) => (
        <TouchableOpacity
            style={[
                popupStyle.item,
                item === selectedItem ? popupStyle.selectedItem : null,
            ]}
            onPress={() => handleItemPress(item)}>
            <Text>{item.display}</Text>
        </TouchableOpacity>
    );

    const closeModal = () => {
        setModalTitle(null)
        setModalData(null);
    };

    const saveModal = async () => {
        if (selectedItem !== null && currentKey !== null && changed) {
            await imageSliderStore.storeData(currentKey, selectedItem.value);
            closeModal()
        }
    }

    return (
        <View style={popupStyle.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={data !== null && title !== null}
                onRequestClose={closeModal}>
                <View style={popupStyle.modalBackground}>
                    <View style={popupStyle.modalContent}>
                        <Text style={popupStyle.modalText}>Change {title}</Text>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.value.toString()} // Use the 'value' property as the key
                            extraData={selectedItem} // Re-render the list when the selectedItem changes
                        />
                        <View style={{width:'100%', alignItems:'center'}}>

                            <Pressable disabled={!changed}
                                style={[popupStyle.closeModalButton, !changed ? popupStyle.disabledButton : null]} onPress={saveModal}>
                                <Text style={popupStyle.textStyle}>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default PopupWithSelectOptions;
