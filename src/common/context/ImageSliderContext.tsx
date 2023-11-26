import { FC, useState, createContext, useContext, useEffect } from "react";
import { ImageFile } from "../interfaces/ImageFileInterface";
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { directoryKey } from '../../consts/Key.const'


interface ImageSliderContextValue {
    selectedFolderUris: string | null;
    isSidebarOpen: boolean;
    imagePaths: string[];
    shuffledImages: string[];
    setSelectedFolderUris: (value: string | null) => void;
    setIsSidebarOpen: (value: boolean) => void;
    setImagePaths: (value: string[]) => void;
    setShuffledImages: (value: string[]) => void;
    retrieveData: (storeKey: string) => Promise<string | null>;
    storeData: (storeKey: string, value: string) => void;
    pickFolder: (updateSelectedFolderUris: any) => void;
    fetchImagesFromDirectory: () => void;
    toggleSidebar: () => void;
}

// Create the context with an initial value
export const ImageSliderContext = createContext<ImageSliderContextValue | null>(null);
export const useImageSliderContext = () => useContext(ImageSliderContext)!;

export const ImageSliderProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedFolderUris, setSelectedFolderUris] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [imagePaths, setImagePaths] = useState<string[]>([]);
    const [shuffledImages, setShuffledImages] = useState<string[]>([]);


    async function retrieveData(storeKey: string): Promise<string | null> {
        try {
            const value = await AsyncStorage.getItem(storeKey);
            if (value !== null) {
                // We have data!!
                return JSON.parse(value);
            }
        } catch (error) {
            // Error retrieving data
        }
        return null;
    }

    async function storeData(storeKey: string, value: any) {
        try {
            await AsyncStorage.setItem(storeKey, JSON.stringify(value))
        } catch (e) {
            // saving error
        }
    }

    async function pickFolder(updateSelectedFolderUris: any) {
        try {
            const result = await DocumentPicker.pickDirectory({});

            if (result != null) {
                console.log('✌️result --->', result);
                const outputString = RNFS.ExternalStorageDirectoryPath + "/" + decodeURIComponent(result.uri).split("primary")[1].split(':')[1]
                console.log('✌️outputString --->', outputString);
                updateSelectedFolderUris(outputString);

                setSelectedFolderUris(outputString);
                storeData(directoryKey, outputString)
                fetchImagesFromDirectory();
            }
        } catch (error) {
            console.error('Error picking folder: ', error);
        }
    };


    async function fetchImagesFromDirectory() {
        try {

            if (typeof selectedFolderUris !== 'string') {
                setSelectedFolderUris(await retrieveData(directoryKey));
            }
            if (typeof selectedFolderUris === 'string') {

                const files = await RNFS.readDir(selectedFolderUris)
                    .then(result => {
                        console.log('✌️my   result --->', result);
                        result.filter((file) =>
                            file.name.match(/\.(jpg|jpeg|png|gif)$/i)
                        );
                        return result;
                    })

                console.log('✌️files --->', files);

                // Extract image file paths
                const imagePaths = files.map((file: ImageFile) => file.path);
                setImagePaths(imagePaths);
                setShuffledImages(imagePaths);
            }
        } catch (error) {
            console.error('Error reading directory:', error);
        }
    };

    function toggleSidebar() {
        setIsSidebarOpen((prev) => { return !prev; });
    }

    const ctxValue: ImageSliderContextValue = {
        selectedFolderUris,
        isSidebarOpen,
        imagePaths,
        shuffledImages,
        setSelectedFolderUris,
        setIsSidebarOpen,
        setImagePaths,
        setShuffledImages,
        retrieveData,
        storeData,
        pickFolder,
        fetchImagesFromDirectory,
        toggleSidebar
    };

    return (
        <ImageSliderContext.Provider value={ctxValue}>{children}</ImageSliderContext.Provider>
    );
};
