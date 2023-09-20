import React, { useEffect, useState } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import RNFS from 'react-native-fs';
import { styles } from './my_style'

interface ImageListProps {
  directoryPath: string;
}

interface ImageFile {
  name: string;
  path: string;
}

const ImageList: React.FC<ImageListProps> = ({ directoryPath }) => {
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchImagesFromDirectory(directoryPath);
  }, [directoryPath]);


  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the image index or reset to 0 if it reaches the end
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, [shuffledImages]);

  useEffect(() => {
    if (currentImageIndex == -1) {
      shuffleArray(imagePaths)
    }
  }, [currentImageIndex]);

  const fetchImagesFromDirectory = async (path: string) => {
    try {
      const files = await RNFS.readDir(path);

      // Filter and select only image files (you can customize the filter criteria)
      const imageFiles = files.filter((file) =>
        file.name.match(/\.(jpg|jpeg|png|gif)$/i)
      );

      // Extract image file paths
      const imagePaths = imageFiles.map((file: ImageFile) => file.path);

      setImagePaths(imagePaths);
      shuffleArray(imagePaths)
    } catch (error) {
      console.error('Error reading directory:', error);
    }
  };

  const shuffleArray = (array: string[]) => {
    // Create a copy of the original array
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;
    let randomIndex, tempValue;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      tempValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = tempValue;
    }

    setShuffledImages(shuffledArray);
  };

  return (
    <View>
      <ImageBackground source={{ uri: 'file://' + shuffledImages[currentImageIndex] }} style={styles.backgroundImage} blurRadius={10} />
      <Image source={{ uri: 'file://' + shuffledImages[currentImageIndex] }} style={styles.topImage} />
    </View>
  );
};

export default ImageList;
