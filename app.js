import { trystero } from './trystero.js'

trystero.connect({appId: 'trytrysterovideo1', password: 'password'})

const selfStream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true
})

const myvideo = document.createElement('video')
myvideo.autoplay = true

myvideo.style = 'transform: rotateY(180deg);'

myvideo.muted = true;

myvideo.srcObject = selfStream


document.body.appendChild(myvideo)

trystero.addstream(selfStream)

trystero.join(peerId => trystero.addstream(selfStream, peerId))

trystero.leave(peerId => { 
  const get = document.getElementById(peerId)
  get.remove()
})

trystero.onstream((stream, peerId) => {
  const video = document.createElement('video')
  video.id = peerId
  video.autoplay = true
  video.srcObject = stream
  document.body.appendChild(video)
})
