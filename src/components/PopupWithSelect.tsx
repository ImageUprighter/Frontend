import React, { useEffect, useState } from 'react';
import { Text, FlatList, TouchableOpacity, View, Pressable } from 'react-native';
import { popupStyle } from '../styles/popup.style';
import { currentTimerKey, AnimationTimerKey, displayEffectKey } from '../consts/Key.const'
import { useImageSliderContext } from '../common/context/ImageSliderContext';
import { useSettingsContext } from '../common/context/SettingsContext';
import Popup from './Popup';

interface DataOption {
    display: string;
    value: any;
}

interface SingleSelectFlatListProps {
    data: DataOption[] | null;
    title: string | null;
    setModalData: any;
    setModalTitle: any;
}

const PopupWithSelectOptions: React.FC<SingleSelectFlatListProps> = ({ data, title, setModalData, setModalTitle }) => {
    const [selectedItem, setSelectedItem] = useState<DataOption | null>(null);
    const [currentKey, setCurrentKey] = useState<string | null>(null);
    const [changed, setChanged] = useState<boolean>(false);
    const { retrieveData, storeData } = useImageSliderContext();
    const { setCurrentTimer, setAnimationTimer, setCurrentTransition } = useSettingsContext();


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
            else if (title === "Transition Effect") {
                setCurrentKey(displayEffectKey)
                given_data = await retrieveData(displayEffectKey);
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
            else if (title === "Transition Effect") {
                setCurrentTransition(selectedItem.value)
            }
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
        <>
            <Popup visible={data !== null && title !== null} title={`Change ${title}`} children={

                <>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.value.toString()} // Use the 'value' property as the key
                        extraData={selectedItem} // Re-render the list when the selectedItem changes
                    />
                    {/* <View style={{ width: '100%', alignItems: 'center' }}>
                        <Pressable disabled={!changed}
                            style={[popupStyle.closeModalButton, !changed ? popupStyle.disabledButton : null]} onPress={saveModal}>
                            <Text style={popupStyle.textStyle}>{'Save'}</Text>
                        </Pressable>
                    </View> */}
                </>
            } closeModal={closeModal} saveModal={saveModal} changed={changed} buttonTitle="Save" />

        </>

    );
};

export default PopupWithSelectOptions;
