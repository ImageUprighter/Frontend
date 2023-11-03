import { FC, useState, createContext, useContext } from "react";
import { ImageFile } from "../interfaces/ImageFileInterface";
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { directoryKey } from '../../../consts/Key.const'


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
            if (typeof value !== null) {
                // We have data!!
                return value;
            }
        } catch (error) {
            // Error retrieving data
        }
        return null;
    }

    async function storeData(storeKey: string, value: any) {
        console.log("storeKey:  ", storeKey, typeof storeKey, typeof value)
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
                // /storage/emulated/0/DCIM/Camera
                const outputString = '/storage/emulated/0/' + decodeURIComponent(result.uri).split("primary")[1].split(':')[1]
                updateSelectedFolderUris(outputString);
                storeData(directoryKey, outputString)
            }
        } catch (error) {
            console.error('Error picking folder: ', error);
        }
    };

    async function fetchImagesFromDirectory() {
        try {
            if (typeof selectedFolderUris !== 'string') {
                await retrieveData(directoryKey);
            }
            if (typeof selectedFolderUris === 'string') {

                const files = await RNFS.readDir(selectedFolderUris);

                // Filter and select only image files (you can customize the filter criteria)
                const imageFiles = files.filter((file) =>
                    file.name.match(/\.(jpg|jpeg|png|gif)$/i)
                );

                // Extract image file paths
                const imagePaths = imageFiles.map((file: ImageFile) => file.path);
                setImagePaths(imagePaths);
                setShuffledImages(imagePaths);
            }
        } catch (error) {
            console.error('Error reading directory:', error);
        }
    };

    function toggleSidebar() {
        console.log("before---- isSidebarOpen:  ", isSidebarOpen)
        setIsSidebarOpen((prev) => { return !prev; });
        console.log("after----- isSidebarOpen:  ", isSidebarOpen)
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
