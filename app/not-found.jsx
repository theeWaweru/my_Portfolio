import Link from 'next/link'
import clsx from 'clsx'
import dots from "./styles/particles.module.css";
import { Diphy } from './layout'
import Particles from './components/particles'

export default function notFound() {
    return (
        <main className={clsx(Diphy.className, "text-m text-white-600 text-center")}>
            <Particles className={dots.particles_container} quantity={300} />
            <div className="h-full flex flex-col bg-gradient-to-tl">
                <h2 className="text-3x1">There was a problem.</h2>
                <p>We could not find the page you were looking for.</p>
                <p>Go back to the <Link href="/">Home</Link></p>
            </div>
        </main>
    )
}