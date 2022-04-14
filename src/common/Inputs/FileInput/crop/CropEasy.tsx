import { Dispatch, SetStateAction, useState } from "react";
import Cropper from "react-easy-crop";
import { Area, Point } from "react-easy-crop/types";
import { getCroppedImg } from "./utils/cropImage";
import styles from "./CropEasy.module.css";
import { OrangeButton } from "src/common/OrangeButton/OrangeButton";

export const CropEasy = ({
  photoURL,
  setOpenCrop,
  setPhotoURL,
  setFile
}: {
  photoURL: string;
  setOpenCrop: Dispatch<SetStateAction<boolean>>;
  setPhotoURL: Dispatch<SetStateAction<string>>;
  setFile: (file: File | Blob) => void;
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const cropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropClose = () => {
    setOpenCrop(false);
    setPhotoURL("");
  };

  const zoomPercent = (value: number) => {
    return `${Math.round(value * 100)}%`;
  };

  const cropImage = async () => {
    if (croppedAreaPixels) {
      const data = await getCroppedImg(photoURL, croppedAreaPixels, rotation);
      if (data) {
        setPhotoURL(data.url);
        setFile(data.file);
      }
      setOpenCrop(false);
    }
  };

  return (
    <div className={styles.cropContainer}>
      <div className={styles.crop}>
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </div>
      <div className={styles.cropManipulation}>
        <div>
          <label htmlFor="zoom">Zoom: {zoomPercent(zoom)}</label>
          <input
            name="zoom"
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotation">Rotation: {rotation + "°"}</label>
          <input
            type="range"
            name="rotation"
            min={0}
            max={360}
            value={rotation}
            onChange={e => setRotation(Number(e.target.value))}
          />
        </div>
      </div>
      <div className={styles.cropButtons}>
        <OrangeButton
          text="cancel"
          onClick={handleCropClose}
          size="small"
          variant="secondary"
        />
        <OrangeButton text="crop" onClick={cropImage} size="small" />
      </div>
    </div>
  );
};
