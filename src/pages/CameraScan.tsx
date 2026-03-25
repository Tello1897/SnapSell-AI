import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, X, Zap } from 'lucide-react';

export function CameraScan() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [cameraError, setCameraError] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraError(true);
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    setIsScanning(true);
    
    let currentImage = capturedImage;
    if (videoRef.current && canvasRef.current && !cameraError) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        currentImage = canvas.toDataURL('image/jpeg');
        if (step === 1) {
          setCapturedImage(currentImage);
        }
      }
    } else if (cameraError && step === 1) {
       // Fallback image if camera fails
       const fallbackUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80";
       
       // Fetch and convert to base64
       fetch(fallbackUrl)
         .then(res => res.blob())
         .then(blob => {
           const reader = new FileReader();
           reader.onloadend = () => {
             setCapturedImage(reader.result as string);
           };
           reader.readAsDataURL(blob);
         })
         .catch(err => console.error("Failed to load fallback image", err));
    }
    
    if (step === 1) {
      // Simulate AI scanning process for the object
      setTimeout(() => {
        setIsScanning(false);
        setStep(2);
      }, 2000);
    } else {
      // Simulate AI scanning process for the label
      setTimeout(() => {
        navigate('/listing', { state: { image: capturedImage } });
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <X size={24} />
        </button>
        <div className="text-white font-headline font-bold tracking-widest uppercase text-sm">
          {isScanning 
            ? "Scansione IA..." 
            : step === 1 
              ? "Inquadra l'oggetto" 
              : "Inquadra l'etichetta"}
        </div>
        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white">
          <Zap size={20} />
        </div>
      </div>

      {/* Camera Viewfinder */}
      <div className="relative w-[85vw] max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/20">
        {/* Simulated or Real Camera Feed */}
        <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
          <canvas ref={canvasRef} className="hidden" />
          {!cameraError && (
            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              muted
              className="w-full h-full object-cover"
            />
          )}
          {/* Fallback image if camera fails or is loading */}
          <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" 
            alt="Simulated object" 
            className={`absolute inset-0 w-full h-full object-cover ${cameraError ? 'opacity-50' : 'opacity-30 blur-[2px] -z-10'}`}
          />
          {cameraError && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm p-4 rounded-xl text-center border border-white/10 z-20">
              <p className="text-white font-medium text-sm mb-1">Fotocamera non disponibile</p>
              <p className="text-white/70 text-xs">Utilizzando l'immagine di simulazione. Puoi comunque procedere.</p>
            </div>
          )}
        </div>

        {/* Flash Effect */}
        {isScanning && (
          <div className="absolute inset-0 bg-white z-50 animate-[flash_0.5s_ease-out_forwards]"></div>
        )}

        {/* Viewfinder Corners */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-3xl z-10"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-3xl z-10"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-3xl z-10"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-3xl z-10"></div>

        {/* Scanning Animation */}
        <div className="absolute left-0 w-full h-1 bg-primary shadow-[0_0_20px_5px_rgba(130,0,232,0.6)] z-20 animate-[scan_2s_ease-in-out_infinite]"></div>
        
        {/* Scanning Overlay Gradient */}
        <div className="absolute left-0 w-full h-full bg-gradient-to-b from-primary/20 to-transparent z-10 animate-[scan-overlay_2s_ease-in-out_infinite]"></div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-12 w-full flex flex-col items-center justify-center gap-6 z-20">
        {isScanning ? (
          <div className="text-white/80 font-medium animate-pulse">
            {step === 1 ? "Analisi dell'oggetto in corso..." : "Analisi dell'etichetta in corso..."}
          </div>
        ) : (
          <div className="text-white/80 font-medium text-center px-6">
            {step === 1 
              ? "Tocca per scansionare l'oggetto" 
              : "Scansiona l'etichetta per una maggiore precisione"}
          </div>
        )}
        
        <button 
          onClick={handleCapture}
          disabled={isScanning}
          className={`w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center transition-transform ${isScanning ? 'scale-90 opacity-50' : 'active:scale-90'}`}
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black">
            <Camera size={28} className="fill-current" />
          </div>
        </button>
      </div>
    </div>
  );
}
