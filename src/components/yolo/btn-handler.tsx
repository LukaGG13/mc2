import { Webcam } from "../../utils/yolo/webcam";

const ButtonHandler = ({ points, _setPoints, setOpenYolo, cameraRef, streaming, setStreaming, isTorchSupported }) => {

    const webcam = new Webcam(); // webcam handler

    return (
        <div className="btn-container">
            {/* Webcam Handler */}
            <button
                onClick={() => {
                    if (streaming === "camera") {
                        isTorchSupported(false); // torch not supported
                        webcam.close(cameraRef.current);
                        cameraRef.current.style.display = "none";
                        setStreaming(null);
                        setOpenYolo(false); // close yolo
                        if (points > 0) {
                            _setPoints(points + 10);
                        }
                        else {
                            _setPoints(0);
                        }
                    }
                }}
            >
                Spremi, zadnji stih
            </button>
            <button
                onClick={() => {
                    if (streaming === "camera") {
                        isTorchSupported(false); // torch not supported
                        webcam.close(cameraRef.current);
                        cameraRef.current.style.display = "none";
                        setStreaming(null);
                        setOpenYolo(false); // close yolo
                        _setPoints(points);
                    }
                }}
            >
                Spremi, bez zadnjeg stiha
            </button>
        </div>
    );
};

export default ButtonHandler;
