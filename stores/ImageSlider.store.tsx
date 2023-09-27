import { observable, action, makeObservable } from 'mobx';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { directoryKey } from '../consts/Key.const'


interface ImageFile {
    name: string;
    path: string;
}


class ImageSliderStore {
    selectedFolderUris: string | null = null;
    isSidebarOpen: boolean = false;
    imagePaths: string[] = [];
    shuffledImages: string[] = [];

    constructor() {
        makeObservable(this, {
            selectedFolderUris: observable,
            isSidebarOpen: observable,
            imagePaths: observable,
            shuffledImages: observable,
            updateSelectedFolderUris: action,
            toggleSidebar: action,
            retrieveData: action,
            storeData: action,
            pickFolder: action,
            fetchImagesFromDirectory: action,
            updateImagePaths: action,
            updateShuffledImages: action,
        });
    }

    async retrieveData(storeKey: string) {
        try {
            const value = await AsyncStorage.getItem(storeKey);
            if (typeof value === 'string') {
                // We have data!!
                this.updateSelectedFolderUris(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    async storeData(storeKey: string, value: string) {
        try {
            await AsyncStorage.setItem(storeKey, value)
        } catch (e) {
            // saving error
        }
    }

    async pickFolder( setSelectedFolderUris: any) {
        try {
            const result = await DocumentPicker.pickDirectory({});
            if (result != null) {
                // /storage/emulated/0/DCIM/Camera
                const outputString = '/storage/emulated/0/' + decodeURIComponent(result.uri).split("primary")[1].split(':')[1]
                setSelectedFolderUris(outputString);
                this.storeData(directoryKey, outputString)
            }
        } catch (error) {
            console.error('Error picking folder: ', error);
        }
    };

    async fetchImagesFromDirectory() {
        try {
            if (typeof this.selectedFolderUris !== 'string') {
                await this.retrieveData(directoryKey);
            }
            if (typeof this.selectedFolderUris === 'string') {

                const files = await RNFS.readDir(this.selectedFolderUris);

                // Filter and select only image files (you can customize the filter criteria)
                const imageFiles = files.filter((file) =>
                    file.name.match(/\.(jpg|jpeg|png|gif)$/i)
                );

                // Extract image file paths
                const imagePaths = imageFiles.map((file: ImageFile) => file.path);
                this.updateImagePaths(imagePaths);
                this.updateShuffledImages(imagePaths);
            }
        } catch (error) {
            console.error('Error reading directory:', error);
        }
    };


    updateSelectedFolderUris(newData: string | null) {
        this.selectedFolderUris = newData;
    }

    updateShuffledImages(newData: string[]) {
        this.shuffledImages = newData;
    }

    updateImagePaths(newData: string[]) {
        this.imagePaths = newData;
    }

    toggleSidebar() {
        console.log("before---- this.isSidebarOpen:  ", this.isSidebarOpen)
        this.isSidebarOpen = !this.isSidebarOpen;
        console.log("after----- this.isSidebarOpen:  ", this.isSidebarOpen)
    }
}

export const imageSliderStore = new ImageSliderStore();
