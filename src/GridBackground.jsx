import React from 'react'
import { useEffect, useRef } from 'react';

export default function GridBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const gridSize = 100;
        let mouseX = -1000;
        let mouseY = -1000;
        let pulseValue = 0;
        let animationId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function drawGrid() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const highlightRadius = 150;
	    const pulse = (Math.sin(pulseValue) + 1) / 2; // Oscillates between 0 and 1
            
            // Draw vertical lines
            for (let x = 0; x <= canvas.width; x += gridSize) {
                ctx.beginPath();
                
                for (let y = 0; y <= canvas.height; y += 1) {
                    const dx = x - mouseX;
                    const dy = y - mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < highlightRadius) {
                        const intensity = 1 - (distance / highlightRadius);
			const pulsatingIntensity = intensity * (0.5 + pulse * 0.5); // Pulse between 50% and 100%
                        const alpha = 0.05 + (pulsatingIntensity * 0.5);

			//shadows 
			// ctx.shadowBlur = 15 * pulsatingIntensity;
			// ctx.shadowColor = `rgba(255, 255, 255)`;
			
                        ctx.strokeStyle = `rgba(164, 164, 164, ${alpha})`;
                    } else {
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
                    }
                    
                    if (y === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                    
                    // Draw in segments for color changes
                    if (y > 0 && y % 5 === 0) {
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                    }
                }
                ctx.stroke();
            }
            
            // Draw horizontal lines
            for (let y = 0; y <= canvas.height; y += gridSize) {
                ctx.beginPath();
                
                for (let x = 0; x <= canvas.width; x += 1) {
                    const dx = x - mouseX;
                    const dy = y - mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < highlightRadius) {
                        const intensity = 1 - (distance / highlightRadius);
			const pulsatingIntensity = intensity * (0.5 + pulse * 0.5); // Pulse between 50% and 100%
                        const alpha = 0.05 + (pulsatingIntensity * 0.5);

			//shadows 
			// ctx.shadowBlur = 15 * pulsatingIntensity;
			// ctx.shadowColor = `rgba(120, 120, 120)`;
			
                        ctx.strokeStyle = `rgba(164, 164, 164, ${alpha})`;
                    } else {
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
                    }
                    
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                    
                    // Draw in segments for color changes
                    if (x > 0 && x % 5 === 0) {
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                    }
                }
                ctx.stroke();
            }
	    pulseValue += 0.05; // Control pulse speed
        }

        function animate() {
            drawGrid();
            animationId = requestAnimationFrame(animate);
        }

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', resizeCanvas);

        resizeCanvas();
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
          <canvas 
            ref={canvasRef} 
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 1 }}
          />
    );
}
