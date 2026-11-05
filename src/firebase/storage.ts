import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './config';

export const uploadImageFile = async (
  file: File, 
  folder: 'menu' | 'gallery' | 'offers' = 'menu'
): Promise<string> => {
  if (isFirebaseConfigured && storage) {
    const filename = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const storageRef = ref(storage, filename);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  }

  // Fallback for offline / local mode: read as data URL so it can be previewed immediately
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to process file"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

