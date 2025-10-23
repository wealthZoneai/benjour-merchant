import React, { useEffect, useRef, useState } from "react";

interface LinearProgressProps {
  percentage?: number; // Percentage value (0-100)
  width?: number; // Width of the progress bar
  height?: number; // Height of the progress bar
  title?: string; // Title displayed above the bar
  percentageStyle?: React.CSSProperties; // Styles for percentage text
  backgroundColor?: string; // Background color of the progress bar
  progressColor?: string; // Color of the progress
  animationDuration?: number; // Duration for the animation
  progresstitle?: string; // Additional title for progress
}

const ProgressBar: React.FC<LinearProgressProps> = ({
  percentage = 0,
  width = 300,
  height = 30,
  title,
  backgroundColor = "#D1D1D1",
  progressColor = "#367561",
  animationDuration = 1000,
  progresstitle = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawBar = (percentage: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background bar
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Draw progress bar
      ctx.fillStyle = progressColor;
      ctx.fillRect(0, 0, (percentage / 100) * width, height);
    };

    const animateProgress = () => {
      const start = performance.now();
      const initialPercentage = animatedPercentage;
      const targetPercentage = percentage;

      const update = (time: number) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / animationDuration, 1);
        const currentPercentage = initialPercentage + (targetPercentage - initialPercentage) * progress;

        setAnimatedPercentage(currentPercentage);
        drawBar(currentPercentage);

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    };

    animateProgress();
  }, [percentage, width, height, animatedPercentage, backgroundColor, progressColor, animationDuration]); // Recalculate when percentage/width/height change

  return (
    <div className="chart-container w-full" style={{ position: "relative" }}>
      <canvas ref={canvasRef} width={width} height={height} className={`${progresstitle}`}></canvas>
      {title && (
        <div
          className="chart-text"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#000"
          }}
        >
          <p className={`${progresstitle}`}>{`${Math.round(animatedPercentage)}%`}</p>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
