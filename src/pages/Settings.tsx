import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles/app.style';
import PopupWithSelectOptions from '../components/PopupWithSelect';
import { sidebarStyle } from '../styles/Sidebar.style';
import { displayEffectData, displayTimeData, animationTimeData, TransitionEffectData, PhotoOrderData } from '../consts/Key.const'
import { rotateImages } from '../api/service';
import { useImageSliderContext } from '../common/context/ImageSliderContext';

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
    const { pickFolder, selectedFolderUris } = useImageSliderContext();

    function updateData(title: string, data: DataOption[]) {
        setModalData(data);
        setModalTitle(title)
    }

    async function rotateImagesFunc() {
        try{
            let dir = selectedFolderUris;
            if (!dir) {
                dir = (await pickFolder()) ?? null;
            }
            const data = await rotateImages(dir);
            console.log(data)
            await pickFolder(data.url || null);
        } catch (error) {
            console.error("Error rotating images:", error);
        }


    }

    return (
        <ScrollView style={{
            height: '100%', width: "100%"
        }}>
            <View style={styles.HomePageContainer}>

                <Text style={styles.sectionTitle}>Settings</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={sidebarStyle.timesButton}>
                    <Image source={require('../../assets/my_back.png')} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>

                <View style={sidebarStyle.line}></View>

                <TouchableOpacity onPress={() => updateData("Display Time", displayTimeData)} style={[styles.item, styles.sectionItem]}>
                    <Text style={styles.textButtonStyle}>Display Time</Text>
                    <Image source={require('../../assets/my_clock.png')} style={styles.settingsIcon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => updateData("Animation Time", animationTimeData)} style={[styles.item, styles.sectionItem]}>
                    <Text style={styles.textButtonStyle}>Animation Time</Text>
                    <Image source={require('../../assets/my_clock.png')} style={styles.settingsIcon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => updateData("Transition Effect", TransitionEffectData)} style={[styles.item, styles.sectionItem]}>
                    <Text style={styles.textButtonStyle}>Transition Effect</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => rotateImagesFunc()} style={[styles.item, styles.sectionItem]}>
                    <Text style={styles.textButtonStyle}>Rotate Images</Text>
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
            </View>
        </ScrollView>
    );
};

export default Settings;
