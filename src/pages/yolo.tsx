import { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "../components/yolo/loader";
import ButtonHandler from "../components/yolo/btn-handler";
import { detectVideo } from "../utils/yolo/detect";
import { flushSync } from "react-dom";
import "../styles/yolo/App.css";
import { values, valuesAdut } from "../utils/yolo/weights";

interface ModelState {
  net: tf.GraphModel | null;
  inputShape: number[];
}

interface LoadingState {
  loading: boolean;
  progress: number;
}

interface TorchConstraint extends MediaTrackConstraintSet {
  torch?: boolean;
}

const Yolo = ({ adut }) => {
  console.log("Adut value: ", adut);
  const [loading, setLoading] = useState<LoadingState>({ loading: true, progress: 0 }); // loading state
  const [model, setModel] = useState<ModelState>({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape

  const [points, setPoints] = useState(0); // points state
  const [seen, setSeen] = useState([]); // seen state
  const seenRef = useRef([]);

  useEffect(() => {
    seenRef.current = seen;
  }, [seen]);

  // references
  const cameraRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef(null);

  const [torch, setTorch] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);

  const isTorchSupported = (track: MediaStreamTrack) => {
      const capabilities = track.getCapabilities();
      return 'torch' in capabilities;
    };

  const toggleTorch = async () => {
    if (!cameraRef.current || !cameraRef.current.srcObject) return;
    
    try {
      const track = (cameraRef.current.srcObject as MediaStream)
        .getVideoTracks()[0];
      
      if (!track) return;

      await track.applyConstraints({
        advanced: [{ torch: !torch } as TorchConstraint]
      });
      
      setTorch(!torch);
    } catch (error) {
      console.error('Torch not supported on this device:', error);
    }
  };

  /// Replace the existing useEffect for torch support with this:
useEffect(() => {
  const videoElement = cameraRef.current;
  if (!videoElement) return;

  const handleStreamReady = () => {
    if (videoElement.srcObject) {
      const track = (videoElement.srcObject as MediaStream).getVideoTracks()[0];
      if (track) {
        const supported = isTorchSupported(track);
        setTorchSupported(supported);
      }
    }
  };

  videoElement.addEventListener('loadeddata', handleStreamReady);

  // Cleanup listener on unmount
  return () => {
    videoElement.removeEventListener('loadeddata', handleStreamReady);
  };
}, []);  // Empty dependency array since we only need to set this up once

  // model configs
  const modelName = "zlatko2";

  useEffect(() => {
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(
        `${window.location.origin}/${modelName}_web_model/model.json`,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions }); // set loading fractions
          },
        }
      ); // load model

      if (!yolov8 || !yolov8.inputs || yolov8.inputs.length === 0 || !yolov8.inputs[0].shape) {
        console.error("Model not loaded");
        return;
      }

      // warming up model
      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
      }); // set model & input shape

      tf.dispose([warmupResults, dummyInput]); // cleanup memory
    });
  }, []);

  function placeSeen(newIgnoredClasses) {
    const oldIgnoredSorted = [...seenRef.current].sort();
    const newIgnoredSorted = [...newIgnoredClasses].sort();

    const hasNewClasses = newIgnoredSorted.some(cls =>
      !oldIgnoredSorted.includes(cls as never)
    );

    if (!hasNewClasses) {
      return;
    }

    let points = 0;

    for (let i = 0; i < newIgnoredClasses.length; i++) {
      const cls = newIgnoredClasses[i];
      if (cls == (cls % 8) + (adut * 8)) {
        console.log("Adult detected, value: ", cls);
        points += valuesAdut[cls % 8];
      }
      else {
        console.log("Child detected, value: ", cls);
        points += values[cls % 8];
      }
    }

    setPoints(points);

    try {
      flushSync(() => {
        setSeen(prevSeen => {
          const merged = [...prevSeen, ...newIgnoredClasses];
          const uniqueMerged = [...new Set(merged)];
          return uniqueMerged as never[];
        });
      });
    } catch (error) {
      console.error("State update failed:", error);
    }
  }

  const debug = false;

  return (
    <div className="App">
      {loading.loading && <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>}
      <div className="content">
        <video
          autoPlay
          muted
          ref={cameraRef}
          onPlay={() => detectVideo(cameraRef.current, model, canvasRef.current, (newIgnoredClasses) => {
            placeSeen(newIgnoredClasses);
          }
          )}
        />
        <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
        
      </div>

      {/* Add torch toggle button */}
      <button 
          onClick={toggleTorch}
          style={{
            display: torchSupported ? 'block' : 'none',
            margin: '10px',
            padding: '8px 16px',
            backgroundColor: torch ? '#4CAF50' : '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {torch ? '🔦 Torch ON' : '🔦 Torch OFF'}
        </button>
      
      <div onClick={() => {
        if (seen.length > 0) {
          setSeen([]);
        }
        if (torchSupported && torch) {
          setTorch(false);
        }
        setPoints(0);
      }}>
      <ButtonHandler cameraRef={cameraRef} isTorchSupported={(value) => {setTorchSupported(value)}} />
      </div>
      <div style={{ display: debug ? "block" : "none" }}>
        <h3>Current Detections:</h3>
        <pre>{JSON.stringify(seen, null)}</pre>
      </div>
      <div>
        <h3>Points:</h3>
        <pre>{points}</pre>
      </div>
    </div>
  );
};

export default Yolo;
