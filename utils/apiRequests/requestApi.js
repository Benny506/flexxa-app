import axios from "axios";
import * as FileSystem from "expo-file-system";
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