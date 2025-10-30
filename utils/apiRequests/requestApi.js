import axios from "axios";
import * as FileSystem from "expo-file-system";
import { getMimeType } from "../../constants/constants";
import supabase, { SUPABASE_ANON_KEY } from "../../database/dbInit";

export const requestApi = async ({ url, method, data, token }) => {
    const headers =
    {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`

    } else {
        headers['Authorization'] = `Bearer ${SUPABASE_ANON_KEY}`
    }

    const config = {
        url: `${url}`,
        method,
        headers
    }

    if (data) {
        config.data = JSON.stringify(data)
    }

    console.log(config.url)

    return axios(config)
        .then(response => {
            return { result: response.data, responseStatus: true }
        })
        .catch((error) => {
            console.log(error)
            if (error.response) {
                //Request made and server responded
                return { responseStatus: false, errorMsg: error.response.data, statusCode: error.status }
            }


            else if (error.request) {
                //Request made but no server response
                return { responseStatus: false, errorMsg: { error: 'You have to be online for this to work' }, statusCode: error.status }
            }


            else {
                return { responseStatus: false, errorMsg: { error: 'You have to be online for this to work' }, statusCode: error.status }
            }
        })

}


export const onRequestApi = async ({ requestInfo, successCallBack, failureCallback }) => {
    try {

        if (!successCallBack || !failureCallback || !requestInfo) {
            return;
        }

        const request = await requestApi(requestInfo)

        const { result, responseStatus, errorMsg, statusCode } = request

        if (responseStatus) {
            return successCallBack({ requestInfo, result })

        } else {
            console.log(errorMsg)
            const _errorMsg = errorMsg?.message || errorMsg.error || 'Server error'
            return failureCallback({ requestInfo, errorMsg: _errorMsg, statusCode })
        }

    } catch (error) {
        console.log(error)
        return failureCallback({ requestInfo, errorMsg: 'Server error!' })
    }
}

export const cloudinaryUpload = async ({ files }) => {
    try {

        // if(!folderName){
        //     return
        // }

        const formData = new FormData();
        const url = `https://api.cloudinary.com/v1_1/dqcmfizfd/upload`

        const uploadedFiles = []

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            formData.append("file", file);
            formData.append("upload_preset", "testing");
            formData.append("folder", "testing");

            const uploadedFile = await fetch(url, { method: 'POST', body: formData, headers: { "content-type": "multipart/form-data" } })
            const uploadedFile_data = await uploadedFile.text()
            const parsedFile = JSON.parse(uploadedFile_data)

            uploadedFiles.push(parsedFile)
        }

        return { responseStatus: true, result: uploadedFiles, errorMsg: null }

    } catch (error) {
        console.log(error)
        return {
            responseStatus: false,
            result: null,
            errorMsg: {
                error: 'An unexpected error occured, try again later',
                actualError: error
            }
        }
    }
}

export async function getSignedUploadUrl({ id, bucket_name, ext }) {
    try {
        const { result, errorMsg } = await requestApi({
            url: "https://nknoqpcyjcxpoirzizgz.supabase.co/functions/v1/create-upload-url",
            method: "POST",
            data: {
                id,
                bucket_name,
                ext
            },
        });

        if (errorMsg) {
            console.log(errorMsg);
            throw new Error(errorMsg);
        }

        return result;

    } catch (error) {
        console.log(error);
        return { signedUrl: null };
    }
}

export const getPublicUrl = async ({ filePath, bucket_name }) => {

    try {
        const { data, error } = await supabase
            .storage
            .from(bucket_name)
            .getPublicUrl(filePath)

        if (error) {
            console.log(data, error)
            throw new Error()
        }

        // return data.signedUrl
        return {
            publicUrl: data.publicUrl,
            error: null
        }

    } catch (error) {
        console.log("GET URL ERROR!", error)
        return {
            publicUrl: null,
            error: 'Cant seem to load this at the time. Try again later'
        }
    }
}

export const getPublicUrls = async ({ filePaths, bucket_name }) => {
    try {
        // Ensure we have an array
        const paths = Array.isArray(filePaths) ? filePaths : [filePaths];

        // Map each filePath to a public URL fetch
        const results = await Promise.all(
            paths.map(async (filePath) => {
                const { data, error } = await supabase
                    .storage
                    .from(bucket_name)
                    .getPublicUrl(filePath);

                if (error) {
                    console.log(`Error fetching URL for ${filePath}:`, error);
                    return null;
                }

                return filePath;
            })
        );

        const filteredResults = results?.filter(Boolean)

        return {
            urls: filteredResults, error: null 
        };

    } catch (error) {
        console.log("GET URL ERROR!", error);
        // Return a generic failure for all paths
        return { urls: null, error }
    }
}


export async function uploadAsset({ uri, id, bucket_name, ext }) {
    try {
        const { signedUrl, filePath } = await getSignedUploadUrl({ id, bucket_name, ext });

        if (!signedUrl || !filePath) throw new Error("Error getting signed upload url");

        const uploadRes = await FileSystem.uploadAsync(signedUrl, uri, {
            httpMethod: "PUT",
            headers: { "Content-Type": "audio/m4a" },
            uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        });

        if (uploadRes.status !== 200) throw new Error("Upload failed");

        return {
            filePath,
            error: null
        };

    } catch (error) {
        console.log(error);
        return {
            filePath: null,
            error: 'Error uploading asset'
        }
    }
}

export async function uploadAssets({ uris, bucket_name, ext, id }) {
    try {
        // Ensure we have an array
        const uriArray = Array.isArray(uris) ? uris : [uris];

        // Map each URI to its upload promise
        const uploadPromises = uriArray.map(async (uri) => {
            const { signedUrl, filePath } = await getSignedUploadUrl({ id, bucket_name, ext });

            if (!signedUrl || !filePath) throw new Error("Error getting signed upload url");

            const response = await fetch(uri);
            const blob = await response.blob();        

            const uploadRes = await fetch(signedUrl, {
                method: "PUT",
                headers: { "Content-Type": getMimeType(ext) },
                body: blob,
            });

            if (uploadRes.status !== 200) throw new Error("Upload failed");

            return filePath;
        });

        // Wait for all uploads to finish
        const results = await Promise.all(uploadPromises);

        return { uris: results, error: null };

    } catch (error) {
        console.log(error);
        // If one fails
        return { uris: null, error }
    }
}
