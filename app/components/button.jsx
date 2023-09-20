import React from 'react'
import Link from 'next/link'
import styles from "../styles/button.module.css"
import clsx from 'clsx'
import { Brick } from '../layout'

export default function Button() {
    return (
        <div>
            <Link className={clsx(Brick.className, styles.button)} href="/contact">Get in Touch</Link>
        </div>
    )
}
