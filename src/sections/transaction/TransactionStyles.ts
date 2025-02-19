// styles.js
export const buttonStyles = (elementSelected: number | '', color: string = 'black') => ({
    display: 'flex',
    cursor: 'pointer',
    backgroundColor: color,
    color: 'white',
    padding: '2px 3px',
    borderRadius: '5px',
    border: 'none',
    '&:hover': {
      backgroundColor: 'primary.light',
    },
    marginLeft: '5px',
    opacity: elementSelected === '' ? 0.3 : 1,
  });