import { useEffect, useRef} from "react";

function Canvas() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const width = window.innerWidth + 200;
		const height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;

		const points = Array.from({length: 12}, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			vx: (Math.random() - 0.5) * 0.5,
			vy: (Math.random() - 0.5) * 0.5,
		}));

		function animate() {
			ctx.clearRect(0, 0, width, height);
			ctx.strokeStyle = '#4b4b4b';
			ctx.beginPath();
			for (let i = 0; i < points.length; i++) {
				for (let j = i + 1; j < points.length; j++) {
					ctx.moveTo(points[i].x, points[i].y);
					ctx.lineTo(points[j].x, points[j].y);
				}
			}
			ctx.stroke();
			for (const p of points) {
				ctx.beginPath();
				ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
				ctx.fillStyle = '#4b4b00';
				ctx.fill();
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0 || p.x > width) p.vx *= -1;
				if (p.y < 0 || p.y > height) p.vy *= -1;
			}
			requestAnimationFrame(animate);
		}
		animate();
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="fixed top-100 left-0 w-full z-5"
		/>
	)
}

export default Canvas;
