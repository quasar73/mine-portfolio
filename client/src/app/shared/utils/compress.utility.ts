import imageCompression from 'browser-image-compression';

export async function compressUtility(
    file: File | null,
    maxSizeMB: number,
    maxWidthOrHeight: number | undefined = undefined
): Promise<File | null> {
    const options = {
        maxSizeMB,
        maxWidthOrHeight,
    };

    if (file) {
        const compressedBlob = await imageCompression(file, options);
        const compressedFile = new File([compressedBlob], file.name);

        return compressedFile;
    } else {
        return null;
    }
}
