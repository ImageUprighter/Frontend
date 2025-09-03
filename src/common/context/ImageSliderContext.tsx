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
    // shuffledImages: number[];
    preloadedArray: string[];
    setPreLoadedArray: (value: string[]) => void;
    setSelectedFolderUris: (value: string | null) => void;
    setIsSidebarOpen: (value: boolean) => void;
    setImagePaths: (value: string[]) => void;
    // setShuffledImages: (value: number[]) => void;
    setShuffledImages: (value: string[]) => void;
    retrieveData: (storeKey: string) => Promise<string | null>;
    storeData: (storeKey: string, value: string) => void;
    // pickFolder: (url?: string) => string | null;
    pickFolder: (url?: string | null) => Promise<string | null | undefined> | string | null | undefined;
    fetchImagesFromDirectory: () => void;
    toggleSidebar: () => void;
}

// Create the context with an initial value
export const ImageSliderContext = createContext<ImageSliderContextValue | null>(null);
export const useImageSliderContext = () => useContext(ImageSliderContext)!;

export const ImageSliderProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedFolderUris, setSelectedFolderUris] = useState<string | null>(null);
    const [preloadedArray, setPreLoadedArray] = useState<string[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [imagePaths, setImagePaths] = useState<string[]>([]);
    // const [shuffledImages, setShuffledImages] = useState<number[]>([]);
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

    async function pickFolder(url: string | null = null) {
        try {
            const result = url ? { uri: url } : await DocumentPicker.pickDirectory({});
            // const result = await DocumentPicker.pickDirectory({});

            if (result != null) {
                const outputString = RNFS.ExternalStorageDirectoryPath + "/" + decodeURIComponent(result.uri).split("primary")[1].split(':')[1]
                // updateSelectedFolderUris(outputString);

                setSelectedFolderUris(outputString);
                storeData(directoryKey, outputString)
                fetchImagesFromDirectory();
                return outputString;
            }
            return null;
        } catch (error) {
            console.error('Error picking folder: ', error);
        }
    };


    async function fetchImagesFromDirectory() {
        try {
            const curr_data = await retrieveData(directoryKey)
            setSelectedFolderUris(curr_data);
            if (typeof curr_data === 'string') {

                const files = await RNFS.readDir(curr_data)
                    .then(result => {
                        result.filter((file) =>
                            file.name.match(/\.(jpg|jpeg|png|gif)$/i)
                        );
                        return result;
                    })

                // Extract image file paths
                const imagePaths = files.map((file: ImageFile) => 'file://' + file.path);
                setImagePaths(imagePaths);
                // setShuffledImages(Array.from(Array(imagePaths.length).keys()));
                setShuffledImages(imagePaths)

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
        preloadedArray,
        setPreLoadedArray,
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
