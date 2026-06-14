const styles = {
  footer: {
    padding: '40px 0',
    borderTop: '1px solid #1a1a1a',
    textAlign: 'center',
  },
  text: {
    color: '#555',
    fontSize: '0.85rem',
  },
  heart: {
    color: '#666',
  },
}

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <p style={styles.text}>
          Built with <span style={styles.heart}>♥</span> by Justine Rhey © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
