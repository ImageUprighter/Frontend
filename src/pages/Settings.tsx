import { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles/app.style';
import PopupWithSelectOptions from '../components/PopupWithSelect';
import { sidebarStyle } from '../styles/Sidebar.style';
import { displayEffectData, displayTimeData, animationTimeData, TransitionEffectData, PhotoOrderData } from '../../consts/Key.const'

interface SettingsProps {
    navigation: any; // Replace 'any' with the appropriate navigation type
}

interface DataOption {
    display: string;
    value: any;
}

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
    const [modalData, setModalData] = useState<DataOption[] | null>(null);
    const [modalTitle, setModalTitle] = useState<string | null>(null);


    useEffect(() => {
    }, []);

    function updateData(title: string, data: DataOption[]) {
        setModalData(data);
        setModalTitle(title)
    }

    return (
        <SafeAreaView style={styles.HomePageContainer}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={sidebarStyle.timesButton}>
                <Image source={require('../../Icons/back.png')} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>

            <View style={sidebarStyle.line}></View>

            <TouchableOpacity onPress={() => updateData("Display Time", displayTimeData)} style={[styles.item, styles.sectionItem]}>
                <Text style={styles.textButtonStyle}>Display Time</Text>
                <Image source={require('../../Icons/clock.png')} style={styles.settingsIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => updateData("Animation Time", animationTimeData)} style={[styles.item, styles.sectionItem]}>
                <Text style={styles.textButtonStyle}>Animation Time</Text>
                <Image source={require('../../Icons/clock.png')} style={styles.settingsIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => updateData("Transition Effect", TransitionEffectData)} style={[styles.item, styles.sectionItem]}>
                <Text style={styles.textButtonStyle}>Transition Effect</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => updateData("Display Effect Data", displayEffectData)} style={[styles.item, styles.sectionItem]}>
                <Text style={styles.textButtonStyle}>Display Effect Data</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => updateData("Photo Order Data", PhotoOrderData)} style={[styles.item, styles.sectionItem]}>
                <Text style={styles.textButtonStyle}>Photo Order Data</Text>
            </TouchableOpacity>


            <PopupWithSelectOptions data={modalData} setModalData={setModalData}
                customData={true}
                setModalTitle={setModalTitle}
                title={modalTitle} />


            {/* <View>
                <Text>Choose </Text>
                <TouchableOpacity onPress={() => navigateTo("Settings")} style={styles.buttonStyle}>
                    <Text style={styles.textButtonStyle}>Go To Settings</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigateTo("ImageSlideShow")} style={styles.buttonStyle}>
                <Text style={styles.textButtonStyle}>Show Image Slide Show</Text>
            </TouchableOpacity> */}


        </SafeAreaView>
    );
};

export default Settings;
