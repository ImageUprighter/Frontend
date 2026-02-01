import React, { useEffect, useState } from 'react';
import { Text, Pressable } from 'react-native';
import { useImageSliderContext } from '../common/context/ImageSliderContext';
import Popup from './Popup';
import { ProgressBar } from './ProgressBar';
import { Checkbox } from './Checkbox';

interface SingleSelectFlatListProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
}


//TODO: Progress bar to show how many images have been processed
//change library for images or add t
// button to choose with added background
//button to cancel the process


const PopupAI: React.FC<SingleSelectFlatListProps> = ({ openModal, setOpenModal }) => {
    const [changed, setChanged] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const [startAlgo, setStartAlgo] = useState<boolean>(false);
    // const { retrieveData, storeData } = useImageSliderContext();

    const { fetchImagesFromDirectoryCheck, imagePaths } = useImageSliderContext();

    useEffect(() => {
        (async () => {
            await fetchImagesFromDirectoryCheck();
        })();
    }, []);


    const closeModal = () => {
        setOpenModal(false);
    };

    const startModal = () => {
        setStartAlgo(true);
    };
    const stopModal = () => {
        setStartAlgo(false);
        setOpenModal(false);
    };


    return (
        <>
            <Popup visible={openModal} title={`Start Algorithm`} children={<>
                {!startAlgo ?
                    <Pressable
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => setChecked(!checked)}
                    >
                        <Checkbox checked={checked} onChange={setChecked} />
                        <Text style={{ marginLeft: 8 }}>Add Blurred Background to all the Photos</Text>
                    </Pressable> :
                    <ProgressBar progress={0.5} />}

            </>} closeModal={closeModal} changed={changed} saveModal={startAlgo ? stopModal : startModal} buttonTitle={startAlgo ? 'Stop Algorithm' : 'Start Algorithm'} />

        </>

    );
};

export default PopupAI;
