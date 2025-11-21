/**
 * Steganography Library
 * Implements LSB (Least Significant Bit) algorithm for text hiding in images.
 */

// Helper: Convert string to binary string
export const textToBinary = (text: string): string => {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
};

// Helper: Convert binary string to text
export const binaryToText = (binary: string): string => {
    const bytes = binary.match(/.{1,8}/g) || [];
    return bytes.map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
};

// Helper: Get image data from File
const getImageData = (imageFile: File): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(imageFile);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }
            ctx.drawImage(img, 0, 0);
            resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
            URL.revokeObjectURL(url);
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = url;
    });
};

// Encode Message into Image
export const encodeLSB = async (image: File, message: string): Promise<Blob> => {
    const imageData = await getImageData(image);
    const data = imageData.data;

    // Add termination sequence to know when message ends
    // Using a null character + unique sequence: "00000000" (null) + "11111111" (marker)
    // A simpler approach is to store the length in the first 32 pixels, but let's use a delimiter for now.
    // Delimiter: END_OF_MESSAGE (null char)
    const fullMessage = message + '\0';
    const binaryMessage = textToBinary(fullMessage);

    if (binaryMessage.length > data.length / 4) {
        throw new Error('Message is too long for this image');
    }

    let binaryIndex = 0;

    // Iterate through pixels (RGBA)
    // We only modify RGB channels, skipping Alpha to avoid visual artifacts or transparency issues
    for (let i = 0; i < data.length; i += 4) {
        for (let j = 0; j < 3; j++) { // R, G, B
            if (binaryIndex < binaryMessage.length) {
                // Clear LSB and set it to the message bit
                data[i + j] = (data[i + j] & ~1) | parseInt(binaryMessage[binaryIndex]);
                binaryIndex++;
            } else {
                break;
            }
        }
        if (binaryIndex >= binaryMessage.length) break;
    }

    // Create new image from modified data
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    ctx.putImageData(imageData, 0, 0);

    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to create blob'));
        }, 'image/png'); // Always use PNG to avoid compression artifacts losing data
    });
};

// Decode Message from Image
export const decodeLSB = async (image: File): Promise<string> => {
    const imageData = await getImageData(image);
    const data = imageData.data;

    let binaryMessage = '';
    let charBuffer = '';

    for (let i = 0; i < data.length; i += 4) {
        for (let j = 0; j < 3; j++) { // R, G, B
            const bit = data[i + j] & 1;
            charBuffer += bit;

            if (charBuffer.length === 8) {
                const charCode = parseInt(charBuffer, 2);
                if (charCode === 0) {
                    // Null terminator found
                    return binaryToText(binaryMessage);
                }
                binaryMessage += charBuffer;
                charBuffer = '';
            }
        }
    }

    return binaryToText(binaryMessage);
};
