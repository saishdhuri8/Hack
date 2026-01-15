import React from 'react'
import CaptionGenerator from './CaptionGenerator'
import PosterGenerator from './Poster'
import AutoAudioAd from './AutoAudioAd'

export default function CreativePage() {
  return (
    <div className="max-w-7xl mx-auto">

      {/* Caption Generator Section */}
      <div className="mb-12">
        <CaptionGenerator />
      </div>

      {/* Poster Generator Section */}
      <div>
        <PosterGenerator />
      </div>

      <div>
        <AutoAudioAd />
      </div>
    </div>
  )
}