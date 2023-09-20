import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions } from 'react-native';
import RNFS from 'react-native-fs';
const { height, width } = Dimensions.get('window')


interface ImageListProps {
  directoryPath: string;
}

interface ImageFile {
  name: string;
  path: string;
}

const ImageList: React.FC<ImageListProps> = ({ directoryPath }) => {
  const [imagePaths, setImagePaths] = useState<string[]>([]);

  useEffect(() => {
    fetchImagesFromDirectory(directoryPath);
  }, [directoryPath]);

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
    } catch (error) {
      console.error('Error reading directory:', error);
    }
  };

  return (
    <View>
      <FlatList
        data={imagePaths}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            {/* <Image
        source={{ uri: 'file://' + item.path }}
        style={{ height: 150, width: width / 4, borderRadius: 10, borderWidth: 1, borderColor: 'black', margin: 10 }}
        resizeMode='cover'
      /> */}
            <Image source={{ uri: 'file://' + item }} style={{ width, height }} />
          </View>
        )}
      />
    </View>
  );
};

export default ImageList;
