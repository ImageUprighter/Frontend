import React, { useEffect, useState } from 'react';
import { Modal, Text, FlatList, Pressable, View, TouchableOpacity, Image } from 'react-native';
import { popupStyle } from '../styles/popup.style';
import { currentTimerKey, AnimationTimerKey } from '../consts/Key.const'
import { useImageSliderContext } from '../common/context/ImageSliderContext';
import { useSettingsContext } from '../common/context/SettingsContext';

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
    const { retrieveData, storeData } = useImageSliderContext();
    const { setCurrentTimer, setAnimationTimer, setCurrentTransition, setDisplayEffect, setPhotoOrder } = useSettingsContext();


    useEffect(() => {
        (async () => {
            let given_data: string | null = null;
            if (title === "Display Time") {
                setCurrentKey(currentTimerKey)
                given_data = await retrieveData(currentTimerKey);
            }
            else if (title === "Animation Time") {
                setCurrentKey(AnimationTimerKey)
                given_data = await retrieveData(AnimationTimerKey);
            }
            if (given_data !== null && data !== null) {
                const my_data_index: number = data.findIndex((element: DataOption) => {
                    return element.value == given_data
                })
                if (my_data_index !== -1) {
                    setSelectedItem(data[my_data_index]);
                }
            }

        })();
    }, [title, data]);


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

            storeData(currentKey, selectedItem.value);
            if (title === "Display Time") {
                setCurrentTimer(selectedItem.value)
            }
            else if (title === "Animation Time") {
                setAnimationTimer(selectedItem.value)
            }
            // else if (title === "Transition Effect") {
            //     setCurrentTransition(selectedItem.value)
            // }
            // else if (title === "Display Effect") {
            //     setDisplayEffect(selectedItem.value)
            // }
            // else if (title === "Photo Order") {
            //     setPhotoOrder(selectedItem.value)
            // }
            closeModal()
            setChanged(false)
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
                        <TouchableOpacity onPress={closeModal} style={popupStyle.timesButton}>
                            <Image source={require('../../assets/my_close.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <Text style={popupStyle.modalText}>Change {title}</Text>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.value.toString()} // Use the 'value' property as the key
                            extraData={selectedItem} // Re-render the list when the selectedItem changes
                        />
                        <View style={{ width: '100%', alignItems: 'center' }}>

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
