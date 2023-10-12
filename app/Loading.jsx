import React from 'react'
import clsx from 'clsx'
import styles from "./styles/loading.module.css"

export default function Loading() {
  return (
    <main className="text-center">
      <div className={styles.cube}>
        <div className={clsx(styles.face, styles.front)} />
        <div className={clsx(styles.face, styles.back)} />
        <div className={clsx(styles.face, styles.right)} />
        <div className={clsx(styles.face, styles.left)} />
        <div className={clsx(styles.face, styles.top)} />
        <div className={clsx(styles.face, styles.bottom)} />
      </div>
    </main>
  )
}
