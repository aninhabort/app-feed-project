/* eslint-disable react/prop-types */
import styles from './style/Avatar.module.css'

export const Avatar = ({ hasBorder = true, src }) => {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src} />
  )
}
