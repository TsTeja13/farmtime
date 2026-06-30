import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Droplet, 
  ShieldAlert, 
  HelpCircle,
  FileText,
  Zap,
  Activity
} from 'lucide-react';

// Dynamically import canvas-confetti to prevent build errors
let confetti;
import('canvas-confetti').then(module => {
  confetti = module.default;
}).catch(err => console.log('Confetti failed to load'));

// Disease Database
const DISEASE_DATABASE = {
  tomato: [
    {
      id: 'tomato_early_blight',
      name: 'Early Blight (Alternaria solani)',
      trigger: (y, b, w) => y > 15 && b > 5,
      severity: 'Moderate',
      description: 'Caused by the fungus Alternaria solani. It produces dark spots with concentric rings (target-like) on older leaves. Leaves turn yellow and drop off.',
      organic: 'Spray Neem Oil solution (5ml/L of water with 2ml organic liquid soap) or use **Sour Buttermilk spray** (1L sour buttermilk mixed in 10L water). Prune lower leaves to improve airflow.',
      chemical: 'Apply Copper-based fungicides or Chlorothalonil.',
      prevention: 'Practice 3-year crop rotation. Water at the base of the plant to keep leaves dry. Mulch around the plant.'
    },
    {
      id: 'tomato_late_blight',
      name: 'Late Blight (Phytophthora infestans)',
      trigger: (y, b, w) => b > 15,
      severity: 'Critical',
      description: 'A devastating disease caused by Phytophthora infestans. Appears as water-soaked grey-green spots that quickly turn brown/black, with white fungal growth on the leaf undersides in humid conditions.',
      organic: 'Immediately destroy affected leaves. Spray **Agniastra** or **Neemastra** formulation. Apply copper hydroxide organic spray.',
      chemical: 'Use Mancozeb, Metalaxyl, or Azoxystrobin immediately before disease spreads.',
      prevention: 'Avoid overhead watering. Plant resistant varieties. Keep spacing wide.'
    },
    {
      id: 'tomato_powdery_mildew',
      name: 'Powdery Mildew (Oidium neolycopersici)',
      trigger: (y, b, w) => w > 10,
      severity: 'Low',
      description: 'A fungal disease resulting in white, powdery patches on the upper surface of leaves, causing them to curl, yellow, and wither.',
      organic: 'Mix 1 tablespoon of baking soda, 1 teaspoon of neem oil, and 1 teaspoon of liquid soap in 4 liters of water. Spray weekly. Sour buttermilk formulation is also excellent.',
      chemical: 'Spray Sulfur-based powders or Myclobutanil.',
      prevention: 'Plant in full sun. Space plants to ensure good air circulation.'
    }
  ],
  potato: [
    {
      id: 'potato_early_blight',
      name: 'Early Blight (Alternaria solani)',
      trigger: (y, b, w) => y > 15 && b > 5,
      severity: 'Moderate',
      description: 'Causes brown-black concentric spots on leaves. Can significantly reduce tuber yields.',
      organic: 'Apply wood ash around the plant base. Spray **Dashaparni Ark** or baking soda solution.',
      chemical: 'Apply Mancozeb or Chlorothalonil.',
      prevention: 'Plant certified disease-free seed tubers. Keep soil well fertilized.'
    },
    {
      id: 'potato_late_blight',
      name: 'Late Blight (Phytophthora infestans)',
      trigger: (y, b, w) => b > 15,
      severity: 'Critical',
      description: 'Same pathogen that caused the Irish Potato Famine. Dark spots spread rapidly, rotting leaves, stems, and tubers.',
      organic: 'Spray **Agniastra** immediately. Destroy infected foliage. Copper soap spray can help check mild infections.',
      chemical: 'Mancozeb or Ridomil Gold.',
      prevention: 'Avoid planting in fields with history of late blight. Earth up potatoes to protect tubers from spores washing down.'
    }
  ],
  apple: [
    {
      id: 'apple_scab',
      name: 'Apple Scab (Venturia inaequalis)',
      trigger: (y, b, w) => b > 10,
      severity: 'Moderate',
      description: 'Fungal infection forming olive-green to dark brown velvety spots on leaves and fruit. Leaves yellow and fall early.',
      organic: 'Spray compost tea or liquid seaweed. Apply wettable sulfur sprays during green tip stage.',
      chemical: 'Captan or Myclobutanil.',
      prevention: 'Rake and destroy fallen leaves in autumn to prevent overwintering spores.'
    },
    {
      id: 'apple_rust',
      name: 'Cedar Apple Rust (Gymnosporangium juniperi-virginianae)',
      trigger: (y, b, w) => y > 15 && b > 2,
      severity: 'Moderate',
      description: 'Forms bright orange-yellow spots on leaves. Spreads from nearby Juniper/Red Cedar trees.',
      organic: 'Spray copper fungicide early in the season. Prune nearby cedar galls.',
      chemical: 'Myclobutanil or Propiconazole.',
      prevention: 'Plant rust-resistant apple varieties. Remove juniper plants from the vicinity.'
    }
  ],
  rice: [
    {
      id: 'rice_blast',
      name: 'Rice Blast (Magnaporthe oryzae)',
      trigger: (y, b, w) => b > 12 || (y > 10 && b > 8),
      severity: 'Critical',
      description: 'Forms spindle-shaped (eye-shaped) spots on leaves with grey-whitish centers and brown borders. Can neck-rot the entire panicle.',
      organic: 'Spray **Neemastra** or **Dashaparni Ark**. Avoid excessive nitrogen fertilizers (urea) which trigger blast.',
      chemical: 'Tricyclazole or Isoprothiolane.',
      prevention: 'Use balanced fertilizer doses. Maintain correct water level. Burn infected straw.'
    },
    {
      id: 'rice_brown_spot',
      name: 'Brown Spot (Cochliobolus miyabeanus)',
      trigger: (y, b, w) => y > 10 && b > 5,
      severity: 'Moderate',
      description: 'Oval brown spots with yellow halos. Often associated with nutrient-deficient or water-stressed soil.',
      organic: 'Apply well-decomposed farmyard manure. Spray **Jeevamrutha** to restore soil nutrients.',
      chemical: 'Mancozeb or Carbendazim.',
      prevention: 'Improve soil fertility by adding compost. Avoid water deficit.'
    }
  ],
  grape: [
    {
      id: 'grape_black_rot',
      name: 'Black Rot (Guignardia bidwellii)',
      trigger: (y, b, w) => b > 10,
      severity: 'High',
      description: 'Fungus causing small brown circular lesions on leaves, which develop tiny black dots (fruiting bodies). Can completely rot the grape clusters into mummies.',
      organic: 'Remove all infected leaves. Apply copper or sulfur sprays. Keep vine canopy pruned for airflow.',
      chemical: 'Mancozeb or Ziram.',
      prevention: 'Keep vines trained off the ground. Prune mummified grapes in winter.'
    },
    {
      id: 'grape_downy_mildew',
      name: 'Downy Mildew (Plasmopara viticola)',
      trigger: (y, b, w) => w > 10 || (y > 10 && w > 5),
      severity: 'High',
      description: 'Yellowish oily spots on the upper leaf surface, and delicate white cottony growth on the underside.',
      organic: 'Spray copper-hydroxide or baking soda solution. Apply **Dashaparni Ark**.',
      chemical: 'Mefenoxam or Copper oxychloride.',
      prevention: 'Ensure excellent canopy aeration. Avoid high density planting.'
    }
  ],
  wheat: [
    {
      id: 'wheat_leaf_rust',
      name: 'Wheat Leaf Rust (Puccinia recondita)',
      trigger: (y, b, w) => y > 12 && b > 4,
      severity: 'High',
      description: 'Fungal infection forming small, round-to-oval orange-brown pustules on leaf blades and sheaths, reducing active chlorophyll surface.',
      organic: 'Spray diluted **Dashaparni Ark** or baking soda solution. Ensure crop spacing is balanced.',
      chemical: 'Apply Tebuconazole or Propiconazole fungicides.',
      prevention: 'Plant rust-resistant wheat seed varieties and practice balanced nitrogen application.'
    },
    {
      id: 'wheat_loose_smut',
      name: 'Loose Smut (Ustilago tritici)',
      trigger: (y, b, w) => b > 12,
      severity: 'Critical',
      description: 'Transforms grain heads into black, dusty spore masses. Spores spread rapidly with wind to neighboring wheat plants.',
      organic: 'Immediately destroy affected heads. Treat seeds with solar heat treatment before sowing.',
      chemical: 'Treat seeds with Carboxin or Carbendazim systemic fungicides.',
      prevention: 'Always sow certified pathogen-free seeds. Keep crop rotations active.'
    }
  ],
  corn: [
    {
      id: 'corn_common_rust',
      name: 'Common Rust (Puccinia sorghi)',
      trigger: (y, b, w) => b > 8 && y > 8,
      severity: 'Moderate',
      description: 'Golden-brown elongated spots appearing on both upper and lower leaf surfaces, reducing leaf efficiency.',
      organic: 'Spray Neem oil solution or **Sour Buttermilk spray**. Keep plant leaves dry.',
      chemical: 'Spray Pyraclostrobin or Azoxystrobin under severe outbreaks.',
      prevention: 'Destroy residue after harvest. Plant resistant corn hybrids.'
    },
    {
      id: 'corn_leaf_blight',
      name: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
      trigger: (y, b, w) => y > 15,
      severity: 'High',
      description: 'Produces long, elliptical, greyish-green lesions (cigar-shaped) parallel to leaf margins.',
      organic: 'Apply foliar spray of compost tea or **Jeevamrutha**. Prune lower infected leaves.',
      chemical: 'Spray Propiconazole or Mancozeb if lesions appear before silking stage.',
      prevention: 'Perform deep plowing to bury crop residue and rotate crops.'
    }
  ]
};

// Default generic result if no specific disease matches
const DEFAULT_HEALTHY = {
  id: 'healthy',
  name: 'Healthy Leaf Detected!',
  severity: 'None',
  description: 'The leaf shows a strong green color profile with minimal spots or yellowing. No serious fungal or necrotic disease detected.',
  organic: 'Keep doing what you are doing! Maintain soil nutrition by spraying diluted **Jeevamrutha** once every two weeks and ensuring correct irrigation levels.',
  chemical: 'None required. Avoid preventive chemical applications to protect helpful insects.',
  prevention: 'Use organic mulching and companion planting to prevent future pest arrivals.'
};

const DEFAULT_DISEASE = {
  id: 'generic_nutrient_deficiency',
  name: 'Nutrient Deficiency / Early Chlorosis',
  severity: 'Low',
  description: 'Yellowing detected on the leaf surface. This indicates early stages of chlorosis, which could be due to Nitrogen or Iron deficiency, waterlogging, or early pest attack.',
  organic: 'Apply a foliar spray of **Jeevamrutha** or compost tea. Boost soil organic carbon by applying compost or vermicompost.',
  chemical: 'Apply balanced NPK fertilizer or micronutrient spray if organic carbon levels are very low.',
  prevention: 'Test soil NPK levels. Avoid over-watering which drains nitrogen from root zones.'
};

export default function Scanner() {
  const [selectedCrop, setSelectedCrop] = useState('tomato');
  const [imageSrc, setImageSrc] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pixelStats, setPixelStats] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);

  // Stop camera stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Start Camera Stream
  const startCamera = async () => {
    setErrorMsg(null);
    setImageSrc(null);
    setScanResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not access camera. Please upload an image instead.');
      setCameraActive(false);
    }
  };

  // Capture Image from Video
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setImageSrc(dataUrl);
      stopCamera();
      analyzeImage(dataUrl);
    }
  };

  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        analyzeImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag & Drop
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        analyzeImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // RGB to HSL Converter for color analysis
  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  // Image analysis simulation with actual Canvas pixel calculations
  const analyzeImage = (src) => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);
    setPixelStats(null);

    // Load image onto hidden canvas for pixel data processing
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const overlayCanvas = overlayCanvasRef.current;
      
      // Safety guard against React async rendering race condition
      if (!canvas || !overlayCanvas) {
        console.warn('Canvas references not mounted yet, retrying analysis in 120ms...');
        setTimeout(() => {
          analyzeImage(src);
        }, 120);
        return;
      }

      const ctx = canvas.getContext('2d');
      
      // Standardize size for processing
      canvas.width = 400;
      canvas.height = 300;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Overlay canvas setup to draw spots
      const oCtx = overlayCanvas.getContext('2d');
      overlayCanvas.width = canvas.width;
      overlayCanvas.height = canvas.height;
      oCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      oCtx.drawImage(img, 0, 0, overlayCanvas.width, overlayCanvas.height);

      // Perform Pixel Sampling
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      let greenCount = 0;
      let yellowCount = 0; // chlorosis
      let brownCount = 0;  // necrosis
      let whiteCount = 0;  // powdery mildew
      let otherCount = 0;  // background or default
      let sampled = 0;

      // Scan every 4th pixel to make it fast
      for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        const alpha = data[i+3];

        if (alpha < 150) continue; // skip transparent

        sampled++;
        const [h, s, l] = rgbToHsl(r, g, b);

        // Classify color based on crop foliage context
        // White/Light Grey: High Lightness, Low Saturation
        if (l > 75 && s < 18) {
          whiteCount++;
          // Draw a small white highlight circle on overlay canvas
          const pixelIndex = i / 4;
          const px = pixelIndex % canvas.width;
          const py = Math.floor(pixelIndex / canvas.width);
          oCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          oCtx.strokeStyle = 'rgba(0, 200, 255, 0.9)';
          oCtx.lineWidth = 1;
          oCtx.beginPath();
          oCtx.arc(px, py, 3, 0, 2 * Math.PI);
          oCtx.fill();
          oCtx.stroke();
        } 
        // Yellow/Pale-Green (Chlorosis): HSL Hue 35 to 70
        else if (h >= 35 && h <= 70 && s > 15) {
          yellowCount++;
          const pixelIndex = i / 4;
          const px = pixelIndex % canvas.width;
          const py = Math.floor(pixelIndex / canvas.width);
          oCtx.fillStyle = 'rgba(255, 235, 50, 0.5)';
          oCtx.beginPath();
          oCtx.arc(px, py, 2, 0, 2 * Math.PI);
          oCtx.fill();
        } 
        // Brown/Dark Red/Black (Necrosis): HSL Hue < 35, or extremely dark
        else if ((h < 35 || h > 340) && s > 15 && l < 45) {
          brownCount++;
          const pixelIndex = i / 4;
          const px = pixelIndex % canvas.width;
          const py = Math.floor(pixelIndex / canvas.width);
          oCtx.fillStyle = 'rgba(230, 40, 40, 0.6)';
          oCtx.strokeStyle = 'rgba(230, 40, 40, 1)';
          oCtx.lineWidth = 1;
          oCtx.beginPath();
          oCtx.arc(px, py, 4, 0, 2 * Math.PI);
          oCtx.fill();
          oCtx.stroke();
        } 
        // Green Foliage (Healthy): HSL Hue 71 to 170
        else if (h > 70 && h <= 170 && s > 15) {
          greenCount++;
        } 
        // Background, dry soil or non-leaf items
        else {
          otherCount++;
        }
      }

      // Calculate percentages
      const totalLeafPixels = greenCount + yellowCount + brownCount + whiteCount;
      const gPct = totalLeafPixels > 0 ? Math.round((greenCount / totalLeafPixels) * 100) : 0;
      const yPct = totalLeafPixels > 0 ? Math.round((yellowCount / totalLeafPixels) * 100) : 0;
      const bPct = totalLeafPixels > 0 ? Math.round((brownCount / totalLeafPixels) * 100) : 0;
      const wPct = totalLeafPixels > 0 ? Math.round((whiteCount / totalLeafPixels) * 100) : 0;

      // Progress bar animation
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            
            // Perform diagnosis matching based on selected plant & stats
            const cropDiseases = DISEASE_DATABASE[selectedCrop] || [];
            let matchedResult = null;

            for (let disease of cropDiseases) {
              if (disease.trigger(yPct, bPct, wPct)) {
                matchedResult = disease;
                break;
              }
            }

            if (!matchedResult) {
              if (gPct >= 72) {
                matchedResult = DEFAULT_HEALTHY;
                // Celebrate with Confetti!
                if (confetti) {
                  confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#4caf50', '#81c784', '#a5d6a7', '#2e7d32']
                  });
                }
              } else {
                matchedResult = DEFAULT_DISEASE;
              }
            }

            setScanResult(matchedResult);
            setPixelStats({ green: gPct, yellow: yPct, brown: bPct, white: wPct });
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    };
    img.src = src;
  };

  const resetScanner = () => {
    setImageSrc(null);
    setScanResult(null);
    setPixelStats(null);
    setScanProgress(0);
    setErrorMsg(null);
    stopCamera();
  };

  useEffect(() => {
    return () => stopCamera(); // Cleanup on unmount
  }, []);

  return (
    <div className="fade-in max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="icon-wrapper bg-primary-10">
          <Camera className="text-primary icon-md" />
        </div>
        <div>
          <h1 className="h1">Plant Disease Detector</h1>
          <p className="text-sm text-muted">Upload a photo of an affected leaf or use your camera to scan and diagnose the plant pathology.</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-2-1">
        {/* Upload & Scan Panel */}
        <div className="glass-card p-6 flex-col items-center justify-center min-h-[350px] relative">
          
          {/* Plant Type Selector */}
          {!imageSrc && !cameraActive && (
            <div className="w-full mb-6 text-center">
              <label className="text-xs text-secondary font-semibold uppercase tracking-wider block mb-2">Select Plant Type</label>
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.keys(DISEASE_DATABASE).concat(['wheat', 'corn']).map((crop) => (
                  <button 
                    key={crop}
                    onClick={() => setSelectedCrop(crop)}
                    className={`btn btn-sm capitalize ${selectedCrop === crop ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="alert alert-danger flex gap-2 w-full mb-4">
              <AlertTriangle className="icon-sm shrink-0" />
              <span className="text-xs">{errorMsg}</span>
            </div>
          )}

          {/* Camera View */}
          {cameraActive && (
            <div className="w-full flex-col items-center">
              <video 
                ref={videoRef} 
                className="w-full max-h-[300px] object-cover rounded-lg border-2 border-primary-light"
                playsInline
              />
              <div className="flex gap-3 mt-4 justify-center">
                <button className="btn btn-primary" onClick={capturePhoto}>
                  <Camera className="btn-icon" /> Snap Leaf Photo
                </button>
                <button className="btn btn-outline" onClick={stopCamera}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Drag & Drop Area / Image Preview */}
          {!cameraActive && !imageSrc && (
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className="w-full border-2 border-dashed border-muted rounded-xl flex-col items-center justify-center p-8 cursor-pointer hover:border-primary transition group min-h-[220px]"
            >
              <div className="icon-wrapper bg-muted-10 group-hover:bg-primary-10 transition mb-3">
                <Upload className="text-muted group-hover:text-primary transition icon-md" />
              </div>
              <p className="font-semibold text-sm mb-1 text-center">Drag and drop leaf image, or click to browse</p>
              <p className="text-xs text-muted text-center mt-1">Supports PNG, JPG (maximum 10MB)</p>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          )}

          {/* Image Analyzing & Processed Preview */}
          {imageSrc && !cameraActive && (
            <div className="w-full flex-col items-center">
              <div className="relative border rounded-lg overflow-hidden max-h-[300px]">
                {/* Real canvas rendering for processing */}
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Interactive Overlay displaying analyzed spots */}
                <canvas 
                  ref={overlayCanvasRef} 
                  className={`w-full max-h-[300px] object-cover block transition ${isScanning ? 'opacity-40 animate-pulse' : 'opacity-100'}`} 
                />

                {isScanning && (
                  <div className="absolute inset-0 bg-dark-50 flex-col items-center justify-center p-6">
                    <Activity className="text-primary-light animate-spin icon-lg mb-3" />
                    <p className="font-semibold text-white text-sm mb-2">Analyzing Leaf Pigmentation...</p>
                    <div className="w-48 bg-white-20 rounded-full h-2 overflow-hidden">
                      <div className="bg-primary-light h-full rounded-full transition-all" style={{ width: `${scanProgress}%` }} />
                    </div>
                  </div>
                )}
              </div>

              {!isScanning && (
                <div className="flex gap-3 mt-4 justify-center">
                  <button className="btn btn-outline" onClick={resetScanner}>
                    <RefreshCw className="btn-icon" /> Scan Another Leaf
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick instructions or helper chips */}
          {!imageSrc && !cameraActive && (
            <div className="flex gap-4 mt-6 text-xs text-muted border-t pt-4 w-full justify-center">
              <button className="btn btn-outline btn-sm flex items-center gap-1" onClick={startCamera}>
                <Camera className="icon-xs" /> Use Live Camera
              </button>
            </div>
          )}
        </div>

        {/* Diagnosis & Curing Output */}
        <div className="flex-col gap-6">
          {/* Loading details placeholders */}
          {!scanResult && !isScanning && (
            <div className="glass-card p-6 text-center flex-col items-center justify-center min-h-[300px] text-muted">
              <HelpCircle className="icon-lg text-muted mb-3" />
              <h3 className="h4 text-secondary mb-1">Awaiting Diagnosis</h3>
              <p className="text-xs max-w-[200px]">Select plant type, then upload or capture a leaf photo to trigger the agro-pathology analysis.</p>
            </div>
          )}

          {isScanning && (
            <div className="glass-card p-6 flex-col gap-4 animate-pulse">
              <div className="h-6 bg-muted-20 rounded w-2/3"></div>
              <div className="h-4 bg-muted-10 rounded w-1/2"></div>
              <div className="border-t pt-4 flex gap-4">
                <div className="h-12 w-12 bg-muted-20 rounded-full"></div>
                <div className="flex-1 flex-col gap-2">
                  <div className="h-4 bg-muted-10 rounded w-full"></div>
                  <div className="h-3 bg-muted-10 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          )}

          {/* Diagnostic Results Card */}
          {scanResult && !isScanning && (
            <div className="glass-card p-6 fade-in flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${
                      scanResult.severity === 'Critical' ? 'badge-danger' : 
                      scanResult.severity === 'High' ? 'badge-warning' : 
                      scanResult.severity === 'Moderate' ? 'badge-info' : 'badge-success'
                    }`}>
                      {scanResult.severity === 'None' ? 'Healthy' : `${scanResult.severity} Severity`}
                    </span>
                    <span className="text-xs text-muted capitalize">• {selectedCrop}</span>
                  </div>
                  <h3 className="h3 mt-2 text-primary">{scanResult.name}</h3>
                </div>
                {scanResult.severity === 'None' ? (
                  <CheckCircle className="text-success icon-md shrink-0" />
                ) : (
                  <AlertTriangle className="text-warning icon-md shrink-0 animate-bounce" />
                )}
              </div>

              {/* Color metrics analysis chart */}
              {pixelStats && (
                <div className="bg-muted-5 p-3 rounded-lg border">
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Zap className="icon-xs text-warning" /> Spectrometry Pigment Analytics
                  </p>
                  <div className="flex gap-1.5 h-4 w-full bg-muted-10 rounded-full overflow-hidden mb-2">
                    <div style={{ width: `${pixelStats.green}%` }} className="bg-success" title="Healthy Chlorophyll" />
                    <div style={{ width: `${pixelStats.yellow}%` }} className="bg-warning" title="Chlorosis (Yellowing)" />
                    <div style={{ width: `${pixelStats.brown}%` }} className="bg-danger" title="Necrosis (Tissue Rot)" />
                    <div style={{ width: `${pixelStats.white}%` }} className="bg-info" title="Fungal Spores/Mildew" />
                  </div>
                  <div className="grid grid-4 gap-2 text-[10px] text-muted">
                    <div className="flex items-center gap-1">
                      <span className="dot bg-success shrink-0" /> Green (Chlorophyll): {pixelStats.green}%
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="dot bg-warning shrink-0" /> Yellow (Chlorosis): {pixelStats.yellow}%
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="dot bg-danger shrink-0" /> Brown (Necrosis): {pixelStats.brown}%
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="dot bg-info shrink-0" /> White (Mildew): {pixelStats.white}%
                    </div>
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Info className="icon-xs" /> Diagnosis & Symptoms
                </p>
                <p className="text-xs text-muted leading-relaxed">{scanResult.description}</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs font-semibold text-success uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Droplet className="icon-xs text-success" /> Organic Curing Techniques (Recommended)
                </p>
                <p className="text-xs text-muted-dark bg-success-5 p-3 rounded-lg border-l-4 border-success leading-relaxed">
                  {scanResult.organic}
                </p>
              </div>

              {scanResult.severity !== 'None' && (
                <div className="border-t pt-4">
                  <p className="text-xs font-semibold text-danger uppercase tracking-wider mb-2 flex items-center gap-1">
                    <ShieldAlert className="icon-xs text-danger" /> Chemical Remedy Fallback
                  </p>
                  <p className="text-xs text-muted leading-relaxed bg-danger-5 p-3 rounded-lg border-l-4 border-danger">
                    {scanResult.chemical}
                  </p>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1 flex items-center gap-1">
                  <FileText className="icon-xs" /> Preventative Management
                </p>
                <p className="text-xs text-muted leading-relaxed">{scanResult.prevention}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
