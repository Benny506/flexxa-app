export const PHONE_COUNTRY_CODES = [
    { title: '🇳🇬 Nigeria +234', value: '+234' }
]

export function getMimeType(ext) {
    const mimeTypes = {
        m4a: "audio/m4a",
        mp3: "audio/mpeg",
        wav: "audio/wav",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        gif: "image/gif",
        pdf: "application/pdf",
        txt: "text/plain",
        json: "application/json",
        // add more as needed
    };

    return mimeTypes[ext.toLowerCase()] || "application/octet-stream"; // fallback
}