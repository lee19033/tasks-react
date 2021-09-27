import React from 'react';
import { useState, useEffect } from 'react';
import ErrorDialog from "../../components/alerts/ErrorDialog";
import {useHttpClient} from "../../hooks/http-hook"; 
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageListData from './imageListData';

const apikey = "LIVDSRZULELA";
const limit = 20; 

const ImageBoard = (props) => {
    const [searchTerm, setSearchTerm]  = useState('cute bear');
    const [loadedImages, setLoadedImages] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const saveImageHandler = (imageSrc) => {
        console.log('board:' + imageSrc);
        props.onSaveImage(imageSrc);
    }

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const responseData = await sendRequest(

                    `https://g.tenor.com/v1/search?key=${apikey}&q=${searchTerm}&limit=${limit}`
                );
                setLoadedImages(responseData.results);               
            }
            catch (err) {
                console.log(err);
            }
        };
        fetchImages();
    }, [sendRequest]);

    return (

        <React.Fragment>
        { (error) && 
           <ErrorDialog open={true} error={error} onClose={clearError}/>
        }
        {isLoading && <CircularProgress color="primary"/>}

        {!isLoading && loadedImages &&  <ImageListData items={loadedImages} onClickImage={saveImageHandler}/>}
     </React.Fragment>       
    );
}

export default ImageBoard; 
