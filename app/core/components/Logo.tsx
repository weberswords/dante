import styles from "./Logo.module.css"

export const Logo = () => {
  return (
    <div className="logo">
      <a href="/">
        <img
          className="{styles.logo-image}"
          src="/dante.png"
          alt="a bust of dante with caption digitally augmenting nevada's teaching ecosystem"
        />
      </a>
    </div>
  )
}

export default Logo
