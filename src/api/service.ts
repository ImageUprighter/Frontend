import Axios from './axiosInstance';
import { width, height } from '../common/dimensions';

export const rotateImages = async (folder_path: string | null) => {
    console.log("Axios instance created with base URL:", process.env.REACT_APP_API_URL + "/api");

    try {

        const size = width && height ? `${width}x${height}` : undefined;

        if(!folder_path) {
            throw new Error("Folder path is required for rotating images.");
        }
        const body: any = { folder_path };
        if (size) {
            body.size = size;
        }

        console.log("Request body:", body);
        const response = await Axios.post('/rotate', body);
        return response.data;
    } catch (error) {
        console.error("Error rotating images:", error);
        throw error;
    }
}