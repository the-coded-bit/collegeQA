import React from 'react'

function Card({children, classitems}) {
  return (
    <div className = {classitems}>{children}</div>
  )
}

export default Card