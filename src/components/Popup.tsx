import React from 'react';
import { Modal, Text, Pressable, View, TouchableOpacity, Image } from 'react-native';
import { popupStyle } from '../styles/popup.style';


interface props {
    visible:boolean;
    title: string | null;
    children: React.ReactNode;
    closeModal: () => void;
    saveModal: () => void;
    changed: boolean;
    buttonTitle: string;
}

const Popup: React.FC<props> = ({ visible, title, children, changed, closeModal, saveModal, buttonTitle }) => {


    return (
        <View style={popupStyle.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={closeModal}>
                <View style={popupStyle.modalBackground}>
                    <View style={popupStyle.modalContent}>
                        <TouchableOpacity onPress={closeModal} style={popupStyle.timesButton}>
                            <Image source={require('../../assets/my_close.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <Text style={popupStyle.modalText}>{title}</Text>
                        {children }
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Pressable disabled={!changed}
                                style={[popupStyle.closeModalButton, !changed ? popupStyle.disabledButton : null]} onPress={saveModal}>
                                <Text style={popupStyle.textStyle}>{buttonTitle}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Popup;
