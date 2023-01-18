import React from 'react'

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-center" role="status">
        <span>Loading...</span>
        </div>
    </div>
  )
}
