import { useAnimationControls, motion } from "motion/react";
import { useEffect, useState } from "react";

const ProgressMarker = ({ number, finished, progressBar = false }) => {

	const bgAnimationControls = useAnimationControls();
	const checkAnimationControls = useAnimationControls();
	const progressAnimationControls = useAnimationControls();

	const animate = () => {
		bgAnimationControls.start({
			height: "100%",
			transition: {
				ease: "easeInOut",
				duration: 1
			}
		});
		checkAnimationControls.start({
			pathLength: 1,
			opacity: 1,
			transition: {
				pathLength: { delay: 0.5, type: "spring", duration: 1.5, bounce: 0 },
				opacity: { delay: 0.5, duration: 0.01 },
			},
		});
		progressAnimationControls.start({
			width: "100%",
			transition: {
				ease: "easeInOut",
				duration: 1
			}
		});
	}

	const reverse = () => {
		bgAnimationControls.start({
			height: "0%",
			transition: {
				ease: "easeInOut",
				duration: 1,
				delay: 0.5
			}
		});
		checkAnimationControls.start({
			pathLength: 0,
			opacity: 0,
			transition: {
				pathLength: { delay: 0, type: "spring", duration: 1.5, bounce: 0 },
				opacity: { delay: 1.5, duration: 0.01 },
			},
		});
		progressAnimationControls.start({
			width: "0%",
			transition: {
				ease: "easeInOut",
				duration: 1,
				delay: 0.5
			}
		});
	}

	useEffect(() => {

		//Apply animation if section is finished or reverse if going back.
		if (finished) {
			animate();
		}
		else {
			reverse();
		}

	}, [finished]);

	return (
		<div className={`flex items-center ${progressBar ? "grow" : ""}`}>
			<div className='size-[60px] outline-4 border-black rounded-full relative overflow-hidden grid place-items-center'>
				<span className='text-xl font-semibold'>{number}</span>
				<motion.div animate={bgAnimationControls} className='absolute bottom-0 left-0 right-0 bg-black'></motion.div>
				<motion.svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" color="#fff" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-icon lucide-check absolute">
					<motion.path animate={checkAnimationControls} d="M4 12 L9 17 L20 6" initial={{ pathLength: 0, opacity: 0 }}></motion.path>
				</motion.svg> {/* Svg copied from Lucide-React */}
			</div>
			{progressBar &&

				<div className='h-[4px] grow bg-stone-400/80 mx-5 rounded-full relative'>
					<motion.div animate={progressAnimationControls} className='absolute bg-black bottom-0 top-0 left-0'></motion.div>
				</div>

			}
		</div>
	)
}

const ProgressTracker = ({ finished }) => {

	const steps = [1, 2, 3];

	return (
		<div className='w-full flex justify-center items-center'>

			{
				steps.map((item) => {
					return <ProgressMarker key={item} number={item} progressBar={item !== steps.length} finished={item <= finished} />
				})
			}

		</div>
	)
}

export default function App() {

	const [finished, setFinished] = useState(0);

	return <div className="min-w-screen min-h-screen flex justify-center items-center">
		<div className="w-1/3">
			<ProgressTracker finished={finished} />
			<div className="w-full flex justify-center items-center mt-3 gap-3">
				<button onClick={() => setFinished(prev => prev === 0 ? prev : prev - 1)} className="hover:cursor-pointer text-xl active:scale-80 transition-all duration-300 ease-in-out">Back</button>
				<button onClick={() => setFinished(prev => prev === 3 ? prev : prev + 1)} className="hover:cursor-pointer text-xl active:scale-80 transition-all duration-300 ease-in-out">Next</button>
			</div>
		</div>
	</div>
}


